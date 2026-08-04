import Link from "next/link";
import { AuthCard } from "@/components/members/AuthCard";
import { LoginForm } from "@/components/members/LoginForm";

export const metadata = {
  title: "Entrar | Associados",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthCard
      title="Área de associados"
      description="Entre com seu e-mail e senha para acessar cupons, aulas Ruach e estudos."
      footer={
        <>
          <p>
            Ainda não tem acesso?{" "}
            <Link href="/associados/cadastro" className="text-gold hover:underline">
              Criar cadastro
            </Link>
          </p>
          <p>
            <Link href="/" className="hover:text-gold">
              Voltar ao site
            </Link>
          </p>
        </>
      }
    >
      {params.reset === "1" ? (
        <p className="mb-5 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-parchment">
          Senha atualizada. Faça login com a nova senha.
        </p>
      ) : null}
      <LoginForm />
    </AuthCard>
  );
}
