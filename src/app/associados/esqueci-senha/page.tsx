import Link from "next/link";
import { AuthCard } from "@/components/members/AuthCard";
import { ForgotPasswordForm } from "@/components/members/ForgotPasswordForm";

export const metadata = {
  title: "Esqueci a senha | Associados",
};

export default function EsqueciSenhaPage() {
  return (
    <AuthCard
      title="Esqueci a minha senha"
      description="Informe o e-mail da conta. Se ele existir, enviaremos um link para criar uma nova senha."
      footer={
        <p>
          Lembrou a senha?{" "}
          <Link href="/associados/login" className="text-gold hover:underline">
            Voltar ao login
          </Link>
        </p>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
