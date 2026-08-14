import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { partnerCoupons } from "@/db/schema";
import { fetchBase44PartnerBrands } from "@/lib/base44-client";
import { mapPartnerBrand, syncBase44Coupons } from "@/lib/base44-sync";

export type AssociadosCoupon = {
  id: string;
  partnerName: string;
  code: string;
  offer: string | null;
  description: string | null;
  websiteUrl: string | null;
};

async function getCouponsFromDatabase(): Promise<AssociadosCoupon[]> {
  return getDb()
    .select({
      id: partnerCoupons.id,
      partnerName: partnerCoupons.partnerName,
      code: partnerCoupons.code,
      offer: partnerCoupons.offer,
      description: partnerCoupons.description,
      websiteUrl: partnerCoupons.websiteUrl,
    })
    .from(partnerCoupons)
    .where(eq(partnerCoupons.active, true))
    .orderBy(desc(partnerCoupons.createdAt));
}

export async function getAssociadosCoupons(): Promise<AssociadosCoupon[]> {
  const dbCoupons = await getCouponsFromDatabase();
  if (dbCoupons.length > 0) {
    return dbCoupons;
  }

  try {
    const brands = await fetchBase44PartnerBrands();
    if (brands.length > 0) {
      void syncBase44Coupons(brands).catch((error) => {
        console.error("[associados-coupons] background seed failed:", error);
      });

      return brands.map((brand) => {
        const mapped = mapPartnerBrand(brand);
        return {
          id: brand.id,
          partnerName: mapped.partnerName,
          code: mapped.code,
          offer: mapped.offer,
          description: mapped.description,
          websiteUrl: mapped.websiteUrl,
        };
      });
    }
  } catch (error) {
    console.error("[associados-coupons] Base44 fetch failed:", error);
  }

  return [];
}

export async function getAdminCoupons() {
  return getDb()
    .select()
    .from(partnerCoupons)
    .orderBy(desc(partnerCoupons.createdAt));
}
