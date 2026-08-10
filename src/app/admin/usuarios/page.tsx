import { desc } from "drizzle-orm";
import {
  createMember,
  setUserActive,
  setUserRole,
  syncSubscriptionStatuses,
} from "@/app/actions/members";
import { MemberBillingActions } from "@/components/admin/MemberBillingActions";
import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import {
  EmptyGuide,
  Field,
  PageIntro,
  adminInputClass,
  adminPrimaryBtnClass,
} from "@/components/admin/ui";
import { getDb } from "@/db";
import { user } from "@/db/schema";
import {
  DEFAULT_MEMBERSHIP_AMOUNT_CENTS,
  buildChargeWhatsAppUrl,
  formatBRL,
  resolveSubscriptionStatus,
} from "@/lib/billing";
import { requireAdmin } from "@/lib/session";

export const metadata = {
  title: "Admin · Usuários",
};

export default async function AdminUsuariosPage() {
  const session = await requireAdmin();
  await syncSubscriptionStatuses();

  const users = await getDb()
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
      createdAt: user.createdAt,
      phone: user.phone,
      billingDay: user.billingDay,
      subscriptionStatus: user.subscriptionStatus,
      lastPaidAt: user.lastPaidAt,
      nextDueAt: user.nextDueAt,
      monthlyAmountCents: user.monthlyAmountCents,
      profileNotes: user.profileNotes,
    })
    .from(user)
    .orderBy(desc(user.createdAt));

  const admins = users.filter((u) => u.role === "admin").length;
  const activeCount = users.filter((u) => u.active).length;
  const members = users.filter((u) => u.role === "member" && u.active);
  const pendingBilling = members.filter((u) => {
    const status = resolveSubscriptionStatus({
      role: u.role,
      active: u.active,
      status: u.subscriptionStatus,
      nextDueAt: u.nextDueAt,
    });
    return status === "pending" || status === "overdue";
  }).length;

  return (
    <>
      <PageIntro
        eyebrow="Pessoas"
        title="Usuários"
        description="Crie acessos, complete o perfil de cobrança e cobre no WhatsApp. A mensalidade vence a cada 30 dias a partir do cadastro (data não editável)."
      />

      <div className="space-y-4">
        <CollapsibleCard
          eyebrow="Convidar"
          title="Novo acesso"
          subtitle="Cadastro público está fechado. O associado recebe e-mail com login, senha inicial e link para criar a própria senha."
          summary="Abrir para criar um associado ou admin"
          defaultOpen={users.length <= 1}
        >
          <form action={createMember} className="grid max-w-xl gap-4">
            <Field label="Nome">
              <input
                name="name"
                required
                placeholder="Nome completo"
                className={adminInputClass}
              />
            </Field>
            <Field label="E-mail">
              <input
                name="email"
                type="email"
                required
                placeholder="email@exemplo.com"
                className={adminInputClass}
              />
            </Field>
            <Field
              label="WhatsApp"
              hint="Obrigatório para associado. Usado no botão Cobrar no WhatsApp."
            >
              <input
                name="phone"
                placeholder="11999999999"
                className={adminInputClass}
              />
            </Field>
            <Field
              label="Mensalidade (R$)"
              hint={`Padrão ${formatBRL(DEFAULT_MEMBERSHIP_AMOUNT_CENTS)}. Só vale para associados.`}
            >
              <input
                name="monthlyAmount"
                type="text"
                inputMode="decimal"
                defaultValue={(DEFAULT_MEMBERSHIP_AMOUNT_CENTS / 100).toFixed(2)}
                placeholder="50.00"
                className={adminInputClass}
              />
            </Field>
            <Field label="Senha inicial" hint="Mínimo 8 caracteres. Peça para trocar depois.">
              <input
                name="password"
                type="password"
                required
                minLength={8}
                className={adminInputClass}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm text-mute">
              <input name="role" type="checkbox" value="admin" />
              Criar como admin (sem cobrança)
            </label>
            <button type="submit" className={adminPrimaryBtnClass}>
              Criar acesso
            </button>
          </form>
        </CollapsibleCard>

        <CollapsibleCard
          eyebrow="Lista"
          title="Contas cadastradas"
          summary={`${users.length} no total · ${activeCount} ativos · ${admins} admins · ${pendingBilling} cobranças pendentes`}
          defaultOpen
        >
          {users.length === 0 ? (
            <EmptyGuide
              title="Nenhuma conta ainda"
              body="Crie o primeiro acesso no card acima."
            />
          ) : (
            <div className="space-y-3">
              {users.map((item) => {
                const isSelf = item.id === session.user.id;
                const resolvedStatus = resolveSubscriptionStatus({
                  role: item.role,
                  active: item.active,
                  status: item.subscriptionStatus,
                  nextDueAt: item.nextDueAt,
                });
                const chargeUrl =
                  item.role === "member" && item.phone
                    ? buildChargeWhatsAppUrl({
                        phone: item.phone,
                        name: item.name,
                        amountCents:
                          item.monthlyAmountCents ??
                          DEFAULT_MEMBERSHIP_AMOUNT_CENTS,
                        dueDate: item.nextDueAt,
                      })
                    : null;

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-line bg-ink/25 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="display text-xl text-parchment">
                          {item.name}
                          {isSelf ? (
                            <span className="ml-2 text-xs uppercase tracking-[0.14em] text-gold">
                              você
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-1 truncate text-sm text-mute">
                          {item.email}
                          {item.phone ? ` · ${item.phone}` : ""}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] ${
                              item.role === "admin"
                                ? "bg-gold/20 text-deep"
                                : "bg-smoke text-mute"
                            }`}
                          >
                            {item.role === "admin" ? "Admin" : "Associado"}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] ${
                              item.active
                                ? "bg-gold/10 text-gold"
                                : "bg-ember/15 text-ember"
                            }`}
                          >
                            {item.active ? "Acesso ativo" : "Desativado"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {!isSelf ? (
                          <>
                            <form action={setUserRole}>
                              <input type="hidden" name="id" value={item.id} />
                              <input
                                type="hidden"
                                name="role"
                                value={
                                  item.role === "admin" ? "member" : "admin"
                                }
                              />
                              <button
                                type="submit"
                                className="rounded-full border border-line px-3 py-1.5 text-xs text-mute transition hover:border-gold/40 hover:text-gold"
                              >
                                {item.role === "admin"
                                  ? "Tornar associado"
                                  : "Tornar admin"}
                              </button>
                            </form>
                            <form action={setUserActive}>
                              <input type="hidden" name="id" value={item.id} />
                              <input
                                type="hidden"
                                name="active"
                                value={item.active ? "false" : "true"}
                              />
                              <button
                                type="submit"
                                className="rounded-full border border-line px-3 py-1.5 text-xs text-mute transition hover:border-ember/50 hover:text-ember"
                              >
                                {item.active ? "Desativar" : "Reativar"}
                              </button>
                            </form>
                          </>
                        ) : (
                          <p className="text-xs text-mute">
                            Sua conta não pode ser desativada daqui.
                          </p>
                        )}
                      </div>
                    </div>

                    {item.role === "member" ? (
                      <MemberBillingActions
                        member={{
                          id: item.id,
                          name: item.name,
                          email: item.email,
                          phone: item.phone,
                          profileNotes: item.profileNotes,
                          monthlyAmountCents: item.monthlyAmountCents,
                          subscriptionStatus: item.subscriptionStatus,
                          nextDueAt: item.nextDueAt,
                          lastPaidAt: item.lastPaidAt,
                          createdAt: item.createdAt,
                          chargeUrl,
                          resolvedStatus,
                        }}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </CollapsibleCard>
      </div>
    </>
  );
}
