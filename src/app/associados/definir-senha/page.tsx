import { AuthCard } from "@/components/members/AuthCard";
import { ForceSetPasswordForm } from "@/components/members/ForceSetPasswordForm";
import { requireMember } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Definir senha | Associados",
};

export default async function DefinirSenhaPage() {
  const session = await requireMember({ allowPasswordSetup: true });

  if (!session.user.mustSetPassword) {
    redirect("/associados/destino");
  }

  return (
    <AuthCard
      title="Defina sua senha"
      description="Por segurança, troque a senha inicial do e-mail antes de entrar no painel."
    >
      <ForceSetPasswordForm />
    </AuthCard>
  );
}
