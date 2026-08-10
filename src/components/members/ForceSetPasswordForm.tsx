"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { clearMustSetPassword } from "@/app/actions/members";
import { authClient } from "@/lib/auth-client";
import { PasswordInput } from "@/components/members/PasswordInput";

/** Já autenticado com senha inicial — troca obrigatória antes do painel. */
export function ForceSetPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const currentPassword = String(form.get("currentPassword") || "");
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (password !== confirm) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    const { error: changeError } = await authClient.changePassword({
      currentPassword,
      newPassword: password,
      revokeOtherSessions: true,
    });

    if (changeError) {
      setLoading(false);
      setError("Não foi possível alterar. Confira a senha inicial do e-mail.");
      return;
    }

    await clearMustSetPassword();
    setLoading(false);
    router.push("/associados/destino");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full space-y-5">
      <PasswordInput
        name="currentPassword"
        label="Senha inicial (do e-mail)"
        autoComplete="current-password"
      />
      <PasswordInput
        name="password"
        label="Nova senha"
        autoComplete="new-password"
        placeholder="Mínimo 8 caracteres"
      />
      <PasswordInput
        name="confirm"
        label="Confirmar nova senha"
        autoComplete="new-password"
      />

      {error ? <p className="text-sm text-ember">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-deep transition hover:bg-gold-soft disabled:opacity-60"
      >
        {loading ? "Salvando…" : "Salvar e continuar"}
      </button>
    </form>
  );
}
