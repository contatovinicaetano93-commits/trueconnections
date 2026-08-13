import Link from "next/link";
import { LogIn } from "lucide-react";
import { AuthCard } from "@/components/members/AuthCard";
import { LoginForm } from "@/components/members/LoginForm";

export const metadata = {
  title: "Entrar | Associados",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string; disabled?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthCard
      icon={LogIn}
      title="Bem-vindo de volta"
      description="Entre com seu e-mail e senha para acessar cupons, aulas Ruach e estudos bíblicos."
      footer={
        <>
          <p>
            Ainda não tem conta?{" "}
            <Link
              href="/associados/cadastro"
              className="font-medium text-[hsl(40_40%_42%)] hover:underline"
            >
              Criar conta gratuita
            </Link>
          </p>
        </>
      }
    >
      {params.disabled === "1" ? (
        <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">
          Sua conta está desativada. Fale com a administração True Connections.
        </p>
      ) : null}
      {params.reset === "1" ? (
        <p className="mb-5 rounded-xl border border-[hsl(40_40%_52%)]/30 bg-[hsl(40_40%_52%)]/10 px-4 py-3 text-sm leading-relaxed text-[hsl(24_12%_12%)]">
          Senha atualizada. Faça login com a nova senha.
        </p>
      ) : null}
      <LoginForm />
    </AuthCard>
  );
}
