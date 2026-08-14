import { Suspense } from "react";
import { desc, eq } from "drizzle-orm";
import { AssociadosHub } from "@/components/members/AssociadosHub";
import { MembersShell } from "@/components/members/MembersShell";
import { getDb } from "@/db";
import { bibleStudies, partnerCoupons } from "@/db/schema";
import { requireMember } from "@/lib/session";

export const metadata = {
  title: "Associados",
};

export default async function AssociadosHomePage() {
  const session = await requireMember();
  const db = getDb();

  const [coupons, studies] = await Promise.all([
    db
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
      .orderBy(desc(partnerCoupons.createdAt)),
    db
      .select({
        id: bibleStudies.id,
        title: bibleStudies.title,
        slug: bibleStudies.slug,
        excerpt: bibleStudies.excerpt,
      })
      .from(bibleStudies)
      .where(eq(bibleStudies.published, true))
      .orderBy(desc(bibleStudies.publishedAt)),
  ]);

  return (
    <MembersShell name={session.user.name} role={session.user.role} hubLayout>
      <Suspense fallback={<p className="text-sm text-[hsl(24_8%_34%)]">Carregando…</p>}>
        <AssociadosHub coupons={coupons} studies={studies} />
      </Suspense>
    </MembersShell>
  );
}
