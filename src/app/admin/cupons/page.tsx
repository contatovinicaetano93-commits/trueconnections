import { desc } from "drizzle-orm";
import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import { CouponForm, CouponListItem } from "@/components/admin/CouponForm";
import { EmptyGuide, PageIntro } from "@/components/admin/ui";
import { getDb } from "@/db";
import { partnerCoupons } from "@/db/schema";

export const metadata = {
  title: "Admin · Cupons",
};

export default async function AdminCuponsPage() {
  const coupons = await getDb()
    .select()
    .from(partnerCoupons)
    .orderBy(desc(partnerCoupons.createdAt));

  const active = coupons.filter((c) => c.active).length;

  return (
    <>
      <PageIntro
        eyebrow="Parceiros"
        title="Cupons conveniados"
        description="Cadastre códigos que os associados veem em /associados/cupons. Só itens ativos aparecem para eles."
      />

      <div className="space-y-4">
        <CollapsibleCard
          eyebrow="Publicar"
          title="Novo cupom"
          subtitle="Parceiro + código. Descrição ajuda o associado a saber onde usar."
          summary="Abrir para cadastrar um código de parceiro"
          defaultOpen={coupons.length === 0}
        >
          <CouponForm />
        </CollapsibleCard>

        <CollapsibleCard
          eyebrow="Biblioteca"
          title="Cupons cadastrados"
          summary={
            coupons.length
              ? `${coupons.length} no total · ${active} ativos`
              : "Nenhum cupom ainda"
          }
          defaultOpen
        >
          {coupons.length === 0 ? (
            <EmptyGuide
              title="Nenhum cupom publicado"
              body="Abra o card acima e cadastre o primeiro parceiro. Assim que marcar ativo, ele aparece para os associados."
            />
          ) : (
            <div className="space-y-3">
              {coupons.map((coupon) => (
                <CouponListItem
                  key={coupon.id}
                  coupon={{
                    id: coupon.id,
                    partnerName: coupon.partnerName,
                    code: coupon.code,
                    description: coupon.description,
                    active: coupon.active,
                  }}
                />
              ))}
            </div>
          )}
        </CollapsibleCard>
      </div>
    </>
  );
}
