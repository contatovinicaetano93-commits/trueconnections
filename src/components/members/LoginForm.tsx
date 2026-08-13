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
import { memberAuthButtonClass } from "@/components/members/memberStyles";

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
          placeholder="seu@email.com"
          className={authInputClass}
        />
      </AuthField>

      <div className="space-y-2">
        <PasswordInput
          name="password"
          label="Senha"
          autoComplete="current-password"
          placeholder="••••••••"
        />
        <div className="text-right">
          <Link
            href="/associados/esqueci-senha"
            className="text-xs text-[hsl(24_8%_34%)] transition hover:text-[hsl(40_40%_52%)]"
          >
            Esqueci a minha senha
          </Link>
        </div>
      </div>

      {error ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={loading} className={memberAuthButtonClass}>
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
