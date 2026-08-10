import { Suspense } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/members/AuthCard";
import { CreatePasswordForm } from "@/components/members/CreatePasswordForm";

export const metadata = {
  title: "Criar senha | Associados",
};

export default function CriarSenhaPage() {
  return (
    <AuthCard
      title="Crie sua senha"
      description="Defina uma senha sua antes de acessar a área de associados. Use o e-mail do convite."
      footer={
        <p>
          Já criou a senha?{" "}
          <Link href="/associados/login" className="text-gold hover:underline">
            Entrar
          </Link>
        </p>
      }
    >
      <Suspense fallback={<p className="text-sm text-mute">Carregando…</p>}>
        <CreatePasswordForm />
      </Suspense>
    </AuthCard>
  );
}
