"use client";

import { useState } from "react";
import {
  markSubscriptionPaid,
  updateMemberProfile,
} from "@/app/actions/members";
import {
  adminEditBtnClass,
  adminInputClass,
  adminPrimaryBtnClass,
  Field,
} from "@/components/admin/ui";
import {
  formatBRL,
  isBillingProfileComplete,
  subscriptionLabel,
  type SubscriptionStatus,
} from "@/lib/billing";

export function MemberBillingActions({
  member,
}: {
  member: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    profileNotes: string | null;
    monthlyAmountCents: number | null;
    subscriptionStatus: string;
    nextDueAt: Date | string | null;
    lastPaidAt: Date | string | null;
    createdAt: Date | string;
    chargeUrl: string | null;
    resolvedStatus: SubscriptionStatus;
  };
}) {
  const [editing, setEditing] = useState(false);
  const amount =
    member.monthlyAmountCents != null
      ? formatBRL(member.monthlyAmountCents)
      : "—";
  const due = member.nextDueAt
    ? new Date(member.nextDueAt).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      })
    : "—";
  const signedUp = new Date(member.createdAt).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
  const complete = isBillingProfileComplete({
    name: member.name,
    phone: member.phone,
  });

  return (
    <div className="mt-4 w-full space-y-3 border-t border-line pt-4">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] ${
            member.resolvedStatus === "active"
              ? "bg-gold/10 text-gold"
              : member.resolvedStatus === "overdue"
                ? "bg-ember/15 text-ember"
                : member.resolvedStatus === "pending"
                  ? "bg-gold/15 text-deep"
                  : "bg-smoke text-mute"
          }`}
        >
          {subscriptionLabel(member.resolvedStatus)}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] ${
            complete
              ? "bg-gold/10 text-gold"
              : "bg-ember/15 text-ember"
          }`}
        >
          {complete ? "Perfil completo" : "Perfil incompleto"}
        </span>
        <span className="text-xs text-mute">
          {amount} · cadastro {signedUp} · vence {due}
        </span>
      </div>

      <p className="text-xs text-mute">
        Vencimento automático a cada 30 dias a partir do cadastro — não é
        editável.
      </p>

      <div className="flex flex-wrap gap-2">
        {member.chargeUrl ? (
          <a
            href={member.chargeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-3.5 py-1.5 text-xs font-semibold text-deep transition hover:bg-gold-soft"
          >
            Cobrar no WhatsApp
          </a>
        ) : (
          <span className="rounded-full border border-line px-3.5 py-1.5 text-xs text-mute">
            Preencha o WhatsApp no perfil
          </span>
        )}

        {(member.resolvedStatus === "pending" ||
          member.resolvedStatus === "overdue") && (
          <form action={markSubscriptionPaid}>
            <input type="hidden" name="id" value={member.id} />
            <button
              type="submit"
              className="rounded-full border border-gold/40 px-3.5 py-1.5 text-xs text-gold transition hover:border-gold/70"
            >
              Marcar como pago
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className={adminEditBtnClass}
        >
          {editing ? "Fechar perfil" : "Perfil"}
        </button>
      </div>

      {editing ? (
        <form
          action={async (formData) => {
            await updateMemberProfile(formData);
            setEditing(false);
          }}
          className="grid max-w-lg gap-3 rounded-xl border border-line bg-ink/20 p-4"
        >
          <input type="hidden" name="id" value={member.id} />
          <p className="text-[0.68rem] uppercase tracking-[0.16em] text-gold">
            Cadastro para cobrança
          </p>
          <Field label="Nome completo">
            <input
              name="name"
              required
              defaultValue={member.name}
              className={adminInputClass}
            />
          </Field>
          <Field label="E-mail" hint="Somente leitura — usado no login.">
            <input
              value={member.email}
              readOnly
              className={`${adminInputClass} opacity-70`}
            />
          </Field>
          <Field
            label="WhatsApp"
            hint="Obrigatório. Com DDD. Ex.: 11999999999"
          >
            <input
              name="phone"
              required
              defaultValue={member.phone ?? ""}
              placeholder="11999999999"
              className={adminInputClass}
            />
          </Field>
          <Field label="Mensalidade (R$)" hint="Padrão R$ 50,00.">
            <input
              name="monthlyAmount"
              type="text"
              inputMode="decimal"
              defaultValue={
                member.monthlyAmountCents != null
                  ? (member.monthlyAmountCents / 100).toFixed(2)
                  : "50.00"
              }
              className={adminInputClass}
            />
          </Field>
          <Field
            label="Próximo vencimento"
            hint="Calculado automaticamente (+30 dias do cadastro / ciclo)."
          >
            <input
              value={due}
              readOnly
              className={`${adminInputClass} opacity-70`}
            />
          </Field>
          <Field label="Observações" hint="Opcional — só para o admin.">
            <textarea
              name="profileNotes"
              rows={3}
              defaultValue={member.profileNotes ?? ""}
              placeholder="Ex.: prefere Pix, horário de contato…"
              className={adminInputClass}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm text-mute">
            <input
              name="paused"
              type="checkbox"
              defaultChecked={member.resolvedStatus === "paused"}
            />
            Pausar cobrança
          </label>
          <button type="submit" className={adminPrimaryBtnClass}>
            Salvar perfil
          </button>
        </form>
      ) : null}
    </div>
  );
}
