import { Suspense } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/members/AuthCard";
import { ResetPasswordForm } from "@/components/members/ResetPasswordForm";

export const metadata = {
  title: "Redefinir senha | Associados",
};

export default function RedefinirSenhaPage() {
  return (
    <AuthCard
      title="Nova senha"
      description="Defina uma nova senha para voltar a acessar a área de associados."
      footer={
        <p>
          <Link
            href="/associados/login"
            className="font-medium text-[hsl(40_40%_42%)] hover:underline"
          >
            Voltar ao login
          </Link>
        </p>
      }
    >
      <Suspense fallback={<p className="text-sm text-[hsl(24_8%_34%)]">Carregando…</p>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  );
}
