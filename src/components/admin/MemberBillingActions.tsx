"use client";

import { useState } from "react";
import { updateMemberProfile } from "@/app/actions/members";
import {
  adminEditBtnClass,
  adminInputClass,
  adminPrimaryBtnClass,
  Field,
} from "@/components/admin/ui";

export function MemberBillingActions({
  member,
}: {
  member: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    profileNotes: string | null;
    createdAt: Date | string;
  };
}) {
  const [editing, setEditing] = useState(false);
  const signedUp = new Date(member.createdAt).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });

  return (
    <div className="mt-4 w-full space-y-3 border-t border-line pt-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-gold/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-gold">
          Acesso gratuito
        </span>
        <span className="text-xs text-mute">Cadastro em {signedUp}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className={adminEditBtnClass}
        >
          {editing ? "Fechar perfil" : "Editar perfil"}
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
            Perfil do associado
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
          <Field label="WhatsApp" hint="Opcional. Com DDD. Ex.: 11999999999">
            <input
              name="phone"
              defaultValue={member.phone ?? ""}
              placeholder="11999999999"
              className={adminInputClass}
            />
          </Field>
          <Field label="Observações" hint="Opcional — só para o admin.">
            <textarea
              name="profileNotes"
              rows={3}
              defaultValue={member.profileNotes ?? ""}
              placeholder="Ex.: horário de contato…"
              className={adminInputClass}
            />
          </Field>
          <button type="submit" className={adminPrimaryBtnClass}>
            Salvar perfil
          </button>
        </form>
      ) : null}
    </div>
  );
}
