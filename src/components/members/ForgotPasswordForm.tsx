"use client";

import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AuthField, authInputClass } from "@/components/members/PasswordInput";
import { memberAuthButtonClass } from "@/components/members/memberStyles";

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
      <div className="rounded-xl border border-[hsl(40_40%_52%)]/30 bg-[hsl(40_40%_52%)]/10 px-5 py-6 text-sm text-[hsl(24_12%_12%)]">
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

      {error ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={loading} className={memberAuthButtonClass}>
        {loading ? "Enviando…" : "Enviar link de recuperação"}
      </button>
    </form>
  );
}
