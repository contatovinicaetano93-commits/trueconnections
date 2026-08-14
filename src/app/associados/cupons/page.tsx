import { CopyCodeButton } from "@/components/members/CopyCodeButton";
import { MemberEmptyState } from "@/components/members/MemberEmptyState";
import { MemberPageIntro } from "@/components/members/MemberPageIntro";
import { MemberSectionLinks } from "@/components/members/MemberSectionLinks";
import { MembersShell } from "@/components/members/MembersShell";
import { Stagger } from "@/components/motion/Stagger";
import { getAssociadosCoupons } from "@/lib/associados-coupons";
import { requireMember } from "@/lib/session";

export const metadata = {
  title: "Cupons | Associados",
};

export default async function CuponsPage() {
  const session = await requireMember();
  const coupons = await getAssociadosCoupons();

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <MemberPageIntro
        eyebrow="Parceiros"
        title="Cupons conveniados"
        description="Copie o código e apresente no parceiro. Benefício exclusivo para associados True Connections."
        backHref="/associados"
        backLabel="Voltar ao início"
        meta={
          coupons.length > 0 ? (
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-[hsl(40_40%_52%)] uppercase">
              {coupons.length}{" "}
              {coupons.length === 1 ? "benefício ativo" : "benefícios ativos"}
            </p>
          ) : null
        }
      />

      <div className="mt-10">
        {coupons.length === 0 ? (
          <MemberEmptyState
            title="Nenhum cupom no momento"
            body="Quando a equipe publicar benefícios de parceiros, eles aparecem aqui com código para copiar."
            actionHref="/associados"
            actionLabel="Voltar ao início"
          />
        ) : (
          <Stagger className="grid gap-4 md:grid-cols-2">
            {coupons.map((coupon) => (
              <article key={coupon.id} className="members-coupon">
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-[hsl(40_40%_52%)] uppercase">
                    Parceiro
                  </p>
                  <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[hsl(24_12%_12%)]">
                    {coupon.partnerName}
                  </h2>
                  {coupon.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-[hsl(24_8%_34%)]">
                      {coupon.description}
                    </p>
                  ) : null}
                </div>

                <div>
                  <p className="mb-2 text-[0.65rem] font-semibold tracking-[0.16em] text-[hsl(24_8%_34%)] uppercase">
                    Seu código
                  </p>
                  <CopyCodeButton code={coupon.code} />
                </div>

                <div className="border-t border-[hsl(32_14%_78%/0.3)] pt-4 text-sm text-[hsl(24_8%_34%)]">
                  <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-[hsl(40_40%_52%)] uppercase">
                    Como usar
                  </p>
                  <ol className="mt-2 list-decimal space-y-1.5 pl-4 leading-relaxed">
                    <li>Copie o código acima.</li>
                    <li>Mostre no {coupon.partnerName} (caixa ou atendimento).</li>
                    <li>Informe que é benefício True Connections.</li>
                  </ol>
                </div>
              </article>
            ))}
          </Stagger>
        )}
      </div>

      <MemberSectionLinks current="cupons" />
    </MembersShell>
  );
}
