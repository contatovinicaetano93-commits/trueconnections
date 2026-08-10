"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  AuthField,
  PasswordInput,
  authInputClass,
} from "@/components/members/PasswordInput";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    // Server decide: admin → /admin, associado → /associados
    router.push("/associados/destino");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full space-y-5">
      <AuthField label="E-mail">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={authInputClass}
        />
      </AuthField>

      <div className="space-y-2">
        <PasswordInput name="password" label="Senha" autoComplete="current-password" />
        <div className="text-right">
          <Link
            href="/associados/esqueci-senha"
            className="text-xs text-mute transition hover:text-gold"
          >
            Esqueci a minha senha
          </Link>
        </div>
      </div>

      {error ? <p className="text-sm text-ember">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-deep transition hover:bg-gold-soft disabled:opacity-60"
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
