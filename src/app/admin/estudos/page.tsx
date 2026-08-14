import { desc } from "drizzle-orm";
import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import { StudyForm } from "@/components/admin/StudyForm";
import { StudyListItem } from "@/components/admin/StudyListItem";
import { EmptyGuide, PageIntro } from "@/components/admin/ui";
import { getDb } from "@/db";
import { bibleStudies } from "@/db/schema";

export const metadata = {
  title: "Admin · Estudos",
};

export default async function AdminEstudosPage() {
  const studies = await getDb()
    .select()
    .from(bibleStudies)
    .orderBy(desc(bibleStudies.createdAt));

  const published = studies.filter((s) => s.published).length;
  const withAudio = studies.filter((s) => s.audioUrl).length;

  return (
    <>
      <PageIntro
        eyebrow="Estudos"
        title="Estudos bíblicos"
        description="Publique textos para a aba Estudos do hub /associados. Estudos de Romanos aparecem no Novo Testamento."
      />

      <p className="mb-6 text-sm text-mute">
        Prévia:{" "}
        <a
          href="/associados?tab=estudos"
          className="text-gold underline-offset-2 hover:underline"
        >
          /associados?tab=estudos
        </a>
      </p>

      <div className="space-y-4">
        <CollapsibleCard
          eyebrow="Publicar"
          title="Novo estudo"
          subtitle="Título + texto. Áudio é opcional (MP3/M4A/WAV)."
          summary="Abrir para escrever um estudo"
          defaultOpen={studies.length === 0}
        >
          <StudyForm />
        </CollapsibleCard>

        <CollapsibleCard
          eyebrow="Biblioteca"
          title="Estudos cadastrados"
          summary={
            studies.length
              ? `${studies.length} no total · ${published} publicados · ${withAudio} com áudio`
              : "Nenhum estudo ainda"
          }
          defaultOpen
        >
          {studies.length === 0 ? (
            <EmptyGuide
              title="Nenhum estudo publicado"
              body="Abra o card de novo estudo e escreva o primeiro texto. Você também pode anexar um áudio."
            />
          ) : (
            <div className="space-y-3">
              {studies.map((study) => (
                <StudyListItem
                  key={study.id}
                  study={{
                    id: study.id,
                    title: study.title,
                    slug: study.slug,
                    excerpt: study.excerpt,
                    body: study.body,
                    audioUrl: study.audioUrl,
                    published: study.published,
                  }}
                />
              ))}
            </div>
          )}
        </CollapsibleCard>
      </div>
    </>
  );
}
