import { PageIntro } from "@/components/admin/ui";
import { CollapsibleCard } from "@/components/admin/CollapsibleCard";

export const metadata = {
  title: "Admin · Usuários",
};

export default function AdminUsuariosPage() {
  return (
    <>
      <PageIntro
        eyebrow="Pessoas"
        title="Usuários"
        description="Próximo ciclo: gestão de associados, convites e papéis. Por enquanto o acesso inicial segue no seed/admin."
      />

      <CollapsibleCard
        eyebrow="Em breve"
        title="O que vai entrar aqui"
        summary="Lista de associados · criar acesso · papéis"
        defaultOpen
      >
        <ul className="space-y-2 text-sm text-mute">
          <li>· Listar associados e admins</li>
          <li>· Criar / desativar acessos</li>
          <li>· Definir papel (membro ou admin)</li>
          <li>· Reset de senha guiado</li>
        </ul>
      </CollapsibleCard>
    </>
  );
}
