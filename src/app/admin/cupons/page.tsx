import { desc } from "drizzle-orm";
import { deleteCoupon, saveCoupon } from "@/app/actions/members";
import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import {
  EmptyGuide,
  Field,
  PageIntro,
  adminGhostBtnClass,
  adminInputClass,
  adminPrimaryBtnClass,
} from "@/components/admin/ui";
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
          <form action={saveCoupon} className="grid max-w-2xl gap-4">
            <Field label="Parceiro" hint="Ex.: Amém Café, livraria, clínica…">
              <input
                name="partnerName"
                required
                placeholder="Nome do parceiro"
                className={adminInputClass}
              />
            </Field>
            <Field label="Código" hint="O que o associado mostra no caixa.">
              <input
                name="code"
                required
                placeholder="TRUE10"
                className={`${adminInputClass} font-mono uppercase`}
              />
            </Field>
            <Field label="Descrição">
              <textarea
                name="description"
                rows={3}
                placeholder="10% em bebidas · válido até…"
                className={adminInputClass}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm text-mute">
              <input name="active" type="checkbox" defaultChecked />
              Ativo para associados
            </label>
            <button type="submit" className={adminPrimaryBtnClass}>
              Publicar cupom
            </button>
          </form>
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
                <div
                  key={coupon.id}
                  className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-line bg-ink/25 p-4"
                >
                  <div>
                    <p className="display text-xl text-parchment">
                      {coupon.partnerName}
                    </p>
                    <p className="mt-1 font-mono text-sm tracking-wide text-gold">
                      {coupon.code}
                    </p>
                    {coupon.description ? (
                      <p className="mt-2 text-sm text-mute">
                        {coupon.description}
                      </p>
                    ) : null}
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-mute">
                      {coupon.active ? "Ativo" : "Inativo"}
                    </p>
                  </div>
                  <form action={deleteCoupon}>
                    <input type="hidden" name="id" value={coupon.id} />
                    <button type="submit" className={adminGhostBtnClass}>
                      Remover
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </CollapsibleCard>
      </div>
    </>
  );
}
