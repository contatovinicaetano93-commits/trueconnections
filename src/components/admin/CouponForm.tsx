"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCoupon, saveCoupon } from "@/app/actions/members";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import {
  Field,
  adminEditBtnClass,
  adminInputClass,
  adminPrimaryBtnClass,
} from "@/components/admin/ui";

export type CouponFormValues = {
  id?: string;
  partnerName: string;
  code: string;
  description: string | null;
  active: boolean;
};

export function CouponForm({
  initial,
  onSaved,
}: {
  initial?: CouponFormValues;
  onSaved?: () => void;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [busy, setBusy] = useState(false);

  return (
    <form
      action={async (formData) => {
        setBusy(true);
        try {
          await saveCoupon(formData);
          onSaved?.();
          router.refresh();
        } finally {
          setBusy(false);
        }
      }}
      className="grid max-w-2xl gap-4"
    >
      {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      <Field label="Parceiro" hint="Ex.: Amém Café, livraria, clínica…">
        <input
          name="partnerName"
          required
          defaultValue={initial?.partnerName ?? ""}
          placeholder="Nome do parceiro"
          className={adminInputClass}
        />
      </Field>
      <Field label="Código" hint="O que o associado mostra no caixa.">
        <input
          name="code"
          required
          defaultValue={initial?.code ?? ""}
          placeholder="TRUE10"
          className={`${adminInputClass} font-mono uppercase`}
        />
      </Field>
      <Field label="Descrição">
        <textarea
          name="description"
          rows={3}
          defaultValue={initial?.description ?? ""}
          placeholder="10% em bebidas · válido até…"
          className={adminInputClass}
        />
      </Field>
      <label className="flex items-center gap-2 text-sm text-mute">
        <input
          name="active"
          type="checkbox"
          defaultChecked={initial?.active ?? true}
        />
        Ativo para associados
      </label>
      <button
        type="submit"
        disabled={busy}
        className={`${adminPrimaryBtnClass} disabled:opacity-60`}
      >
        {busy
          ? "Salvando…"
          : isEdit
            ? "Salvar alterações"
            : "Publicar cupom"}
      </button>
    </form>
  );
}

export function CouponListItem({
  coupon,
}: {
  coupon: CouponFormValues & { id: string };
}) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="rounded-2xl border border-line bg-ink/25 p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="display text-xl text-parchment">{coupon.partnerName}</p>
          <p className="mt-1 font-mono text-sm tracking-wide text-gold">
            {coupon.code}
          </p>
          {coupon.description ? (
            <p className="mt-2 text-sm text-mute">{coupon.description}</p>
          ) : null}
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-mute">
            {coupon.active ? "Ativo" : "Inativo"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className={adminEditBtnClass}
            aria-expanded={editing}
          >
            {editing ? "Fechar" : "Editar"}
          </button>
          <ConfirmDeleteButton
            action={deleteCoupon}
            id={coupon.id}
            label={coupon.partnerName}
          />
        </div>
      </div>

      {editing ? (
        <div className="mt-5 border-t border-line pt-5">
          <p className="mb-4 text-[0.68rem] uppercase tracking-[0.16em] text-gold">
            Editar cupom
          </p>
          <CouponForm initial={coupon} onSaved={() => setEditing(false)} />
        </div>
      ) : null}
    </div>
  );
}
