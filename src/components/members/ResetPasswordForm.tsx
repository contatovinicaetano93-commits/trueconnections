"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { PasswordInput } from "@/components/members/PasswordInput";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const invalid = searchParams.get("error") === "INVALID_TOKEN";

  const [error, setError] = useState<string | null>(
    invalid ? "Link inválido ou expirado. Solicite um novo." : null,
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      setError("Link inválido. Solicite uma nova recuperação.");
      return;
    }

    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (password !== confirm) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    setLoading(false);

    if (resetError) {
      setError("Não foi possível redefinir a senha. O link pode ter expirado.");
      return;
    }

    router.push("/associados/login?reset=1");
    router.refresh();
  }

  if (!token && !invalid) {
    return (
      <p className="text-sm text-mute">
        Abra o link enviado por e-mail para definir uma nova senha.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full space-y-5">
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
        disabled={loading || !token}
        className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-deep transition hover:bg-gold-soft disabled:opacity-60"
      >
        {loading ? "Salvando…" : "Salvar nova senha"}
      </button>
    </form>
  );
}
