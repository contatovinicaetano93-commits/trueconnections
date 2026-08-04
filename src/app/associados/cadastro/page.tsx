import Link from "next/link";
import { AuthCard } from "@/components/members/AuthCard";
import { RegisterForm } from "@/components/members/RegisterForm";

export const metadata = {
  title: "Cadastro | Associados",
};

export default function CadastroPage() {
  return (
    <AuthCard
      title="Criar seu acesso"
      description="Cadastre e-mail e senha para entrar na área de associados e consumir os conteúdos exclusivos."
      footer={
        <p>
          Já tem conta?{" "}
          <Link href="/associados/login" className="text-gold hover:underline">
            Entrar
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
