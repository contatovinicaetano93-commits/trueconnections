import Link from "next/link";
import { AuthCard } from "@/components/members/AuthCard";
import { RegisterForm } from "@/components/members/RegisterForm";

export const metadata = {
  title: "Cadastro | Associados",
};

export default function CadastroPage() {
  return (
    <AuthCard
      title="Criar conta gratuita"
      description="Cadastre-se para acessar estudos bíblicos, Método Ruach, cupons de parceiros e benefícios da comunidade True Connection — sem mensalidade."
      footer={
        <>
          <p>
            Já tem conta?{" "}
            <Link href="/associados/login" className="font-medium text-gold hover:underline">
              Entrar
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
      <RegisterForm />
    </AuthCard>
  );
}
