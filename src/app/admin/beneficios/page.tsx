import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import { CouponForm, CouponListItem } from "@/components/admin/CouponForm";
import { SyncBase44Button } from "@/components/admin/SyncBase44Button";
import { EmptyGuide, PageIntro } from "@/components/admin/ui";
import { getAdminCoupons } from "@/lib/associados-coupons";

export const metadata = {
  title: "Admin · Benefícios",
};

export default async function AdminBeneficiosPage() {
  const coupons = await getAdminCoupons();
  const active = coupons.filter((coupon) => coupon.active).length;

  return (
    <>
      <PageIntro
        eyebrow="Benefícios"
        title="Cupons e parceiros"
        description="Gerencia a aba Benefícios do hub /associados — oferta, código, descrição e link do parceiro."
      />

      <p className="mb-6 text-sm text-mute">
        Prévia:{" "}
        <a
          href="/associados?tab=beneficios"
          className="text-gold underline-offset-2 hover:underline"
        >
          /associados?tab=beneficios
        </a>
      </p>

      <div className="mb-6 rounded-2xl border border-line bg-card/90 p-5">
        <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-gold uppercase">
          Importar do Base44
        </p>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Copia os parceiros já cadastrados no Base44 para o banco local. Edições feitas
          aqui têm prioridade na área de associados.
        </p>
        <div className="mt-4">
          <SyncBase44Button />
        </div>
      </div>

      <div className="space-y-4">
        <CollapsibleCard
          eyebrow="Publicar"
          title="Novo benefício"
          subtitle="Parceiro, oferta, código e site — como no card do hub."
          summary="Abrir para cadastrar um benefício"
          defaultOpen={coupons.length === 0}
        >
          <CouponForm />
        </CollapsibleCard>

        <CollapsibleCard
          eyebrow="Biblioteca"
          title="Benefícios cadastrados"
          summary={
            coupons.length
              ? `${coupons.length} no total · ${active} ativos`
              : "Nenhum benefício ainda"
          }
          defaultOpen
        >
          {coupons.length === 0 ? (
            <EmptyGuide
              title="Nenhum benefício publicado"
              body="Cadastre manualmente ou importe do Base44. Itens ativos aparecem na aba Benefícios."
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
                    offer: coupon.offer,
                    description: coupon.description,
                    websiteUrl: coupon.websiteUrl,
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
