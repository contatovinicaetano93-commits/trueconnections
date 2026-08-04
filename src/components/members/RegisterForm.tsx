"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  AuthField,
  PasswordInput,
  authInputClass,
} from "@/components/members/PasswordInput";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (password !== confirm) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.");
      setLoading(false);
      return;
    }

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (signUpError) {
      setError(
        signUpError.message?.includes("exist")
          ? "Este e-mail já está cadastrado. Faça login."
          : "Não foi possível criar a conta. Tente novamente.",
      );
      return;
    }

    router.push("/associados");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full space-y-5">
      <AuthField label="Nome">
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Seu nome"
          className={authInputClass}
        />
      </AuthField>
      <AuthField label="E-mail">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={authInputClass}
        />
      </AuthField>
      <PasswordInput
        name="password"
        label="Senha"
        autoComplete="new-password"
        placeholder="Mínimo 8 caracteres"
      />
      <PasswordInput
        name="confirm"
        label="Confirmar senha"
        autoComplete="new-password"
      />

      {error ? <p className="text-sm text-ember">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-deep transition hover:bg-gold-soft disabled:opacity-60"
      >
        {loading ? "Criando conta…" : "Criar acesso"}
      </button>
    </form>
  );
}
