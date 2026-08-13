"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  parseBirthDateInput,
  requireBrazilPhone,
} from "@/lib/member-profile";
import {
  AuthField,
  PasswordInput,
  authInputClass,
} from "@/components/members/PasswordInput";
import { memberAuthButtonClass } from "@/components/members/memberStyles";

function signupErrorMessage(message: string | undefined) {
  if (!message) {
    return "Não foi possível criar a conta. Tente novamente.";
  }

  const lower = message.toLowerCase();
  if (lower.includes("exist") || lower.includes("already")) {
    return "Este e-mail já está cadastrado. Faça login.";
  }
  if (lower.includes("phone")) {
    return "Informe um telefone válido com DDD. Ex.: 11999999999";
  }
  if (lower.includes("birthdate") || lower.includes("birth date")) {
    return "Informe uma data de nascimento válida.";
  }
  if (lower.includes("muitas tentativas") || lower.includes("rate")) {
    return "Muitas tentativas. Aguarde alguns minutos e tente novamente.";
  }

  return message;
}

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
    const phoneRaw = String(form.get("phone") || "").trim();
    const birthDateRaw = String(form.get("birthDate") || "").trim();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    const phone = requireBrazilPhone(phoneRaw);
    if (!phone) {
      setError("Informe um telefone válido com DDD. Ex.: 11999999999");
      setLoading(false);
      return;
    }

    const birthDate = parseBirthDateInput(birthDateRaw);
    if (!birthDate) {
      setError("Informe uma data de nascimento válida.");
      setLoading(false);
      return;
    }

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
      phone,
      birthDate,
    });

    setLoading(false);

    if (signUpError) {
      setError(signupErrorMessage(signUpError.message));
      return;
    }

    router.push("/associados");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full space-y-5">
      <AuthField label="Nome completo">
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
          placeholder="seu@email.com"
          className={authInputClass}
        />
      </AuthField>
      <AuthField label="Telefone / WhatsApp">
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="11999999999"
          className={authInputClass}
        />
      </AuthField>
      <AuthField label="Data de nascimento">
        <input
          name="birthDate"
          type="date"
          required
          autoComplete="bday"
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

      {error ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={loading} className={memberAuthButtonClass}>
        {loading ? "Criando conta…" : "Criar conta gratuita"}
      </button>

      <p className="text-center text-sm text-[hsl(30_8%_45%)]">
        Já tem conta?{" "}
        <Link
          href="/associados/login"
          className="font-medium text-[hsl(40_40%_42%)] hover:underline"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}
