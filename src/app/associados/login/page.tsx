import Link from "next/link";
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
      title="Bem-vindo de volta"
      description="Entre com seu e-mail e senha para acessar cupons, aulas Ruach e estudos bíblicos."
      footer={
        <>
          <p>
            Ainda não tem conta?{" "}
            <Link
              href="/associados/cadastro"
              className="font-medium text-gold hover:underline"
            >
              Criar conta gratuita
            </Link>
          </p>
          <p>
            <Link href="/" className="transition hover:text-gold">
              Voltar ao site
            </Link>
          </p>
        </>
      }
    >
      {params.disabled === "1" ? (
        <p className="mb-5 border border-ember/40 bg-ember/10 px-4 py-3 text-sm leading-relaxed text-parchment">
          Sua conta está desativada. Fale com a administração True Connections.
        </p>
      ) : null}
      {params.reset === "1" ? (
        <p className="mb-5 border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-parchment">
          Senha atualizada. Faça login com a nova senha.
        </p>
      ) : null}
      <LoginForm />
    </AuthCard>
  );
}
