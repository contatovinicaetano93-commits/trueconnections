"use client";

import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AuthField, authInputClass } from "@/components/members/PasswordInput";

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim().toLowerCase();

    const { error: resetError } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/associados/redefinir-senha",
    });

    setLoading(false);

    if (resetError) {
      setError(
        resetError.message === "Reset password isn't enabled"
          ? "Recuperação de senha ainda não está configurada. Fale com o admin."
          : "Não foi possível enviar o e-mail. Tente novamente.",
      );
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/10 px-5 py-6 text-sm text-parchment">
        Se este e-mail estiver cadastrado, você receberá um link para redefinir a
        senha. Confira também a caixa de spam.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full space-y-5">
      <AuthField label="E-mail da conta">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={authInputClass}
        />
      </AuthField>

      {error ? <p className="text-sm text-ember">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-deep transition hover:bg-gold-soft disabled:opacity-60"
      >
        {loading ? "Enviando…" : "Enviar link de recuperação"}
      </button>
    </form>
  );
}
