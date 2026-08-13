import Link from "next/link";
import { UserPlus } from "lucide-react";
import { AuthCard } from "@/components/members/AuthCard";
import { RegisterForm } from "@/components/members/RegisterForm";

export const metadata = {
  title: "Cadastro | Associados",
};

export default function CadastroPage() {
  return (
    <AuthCard
      icon={UserPlus}
      title="Criar conta gratuita"
      description="Cadastre-se para acessar estudos bíblicos, Método Ruach, cupons de parceiros e benefícios da comunidade True Connection — sem mensalidade."
      footer={
        <>
          <p>
            Já tem conta?{" "}
            <Link
              href="/associados/login"
              className="font-medium text-[hsl(40_40%_42%)] hover:underline"
            >
              Entrar
            </Link>
          </p>
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
