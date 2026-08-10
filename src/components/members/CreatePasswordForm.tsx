"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clearMustSetPassword } from "@/app/actions/members";
import { authClient } from "@/lib/auth-client";
import { PasswordInput } from "@/components/members/PasswordInput";

export function CreatePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email") || "";
  const invalid = searchParams.get("error") === "INVALID_TOKEN";

  const [error, setError] = useState<string | null>(
    invalid ? "Link inválido ou expirado. Peça um novo convite à equipe." : null,
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      setError("Abra o link enviado por e-mail para criar sua senha.");
      return;
    }

    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    const loginEmail = String(form.get("email") || email).trim().toLowerCase();

    if (password !== confirm) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (!loginEmail) {
      setError("Informe o e-mail do convite.");
      setLoading(false);
      return;
    }

    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    if (resetError) {
      setLoading(false);
      setError("Não foi possível criar a senha. O link pode ter expirado.");
      return;
    }

    const { error: signInError } = await authClient.signIn.email({
      email: loginEmail,
      password,
    });

    if (signInError) {
      setLoading(false);
      router.push("/associados/login?reset=1");
      return;
    }

    await clearMustSetPassword();
    setLoading(false);
    router.push("/associados/destino");
    router.refresh();
  }

  if (!token && !invalid) {
    return (
      <p className="text-sm text-mute">
        Abra o link do e-mail de boas-vindas para criar sua senha antes de entrar
        no painel.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full space-y-5">
      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.18em] text-mute">
          E-mail do convite
        </span>
        <input
          name="email"
          type="email"
          required
          defaultValue={email}
          autoComplete="email"
          className="w-full rounded-xl border border-line bg-ink/30 px-4 py-3.5 text-parchment outline-none transition placeholder:text-mute/50 focus:border-gold/50 focus:ring-2 focus:ring-gold/25"
        />
      </label>

      <PasswordInput
        name="password"
        label="Sua nova senha"
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
        {loading ? "Salvando…" : "Criar senha e entrar"}
      </button>
    </form>
  );
}
