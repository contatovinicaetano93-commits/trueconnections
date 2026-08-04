import { desc } from "drizzle-orm";
import { deleteStudy, saveStudy } from "@/app/actions/members";
import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import {
  EmptyGuide,
  Field,
  PageIntro,
  adminGhostBtnClass,
  adminInputClass,
  adminPrimaryBtnClass,
} from "@/components/admin/ui";
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

  return (
    <>
      <PageIntro
        eyebrow="Leitura"
        title="Estudos bíblicos"
        description="Textos em formato blog. Publicados aparecem na lista do associado e abrem em página própria."
      />

      <div className="space-y-4">
        <CollapsibleCard
          eyebrow="Publicar"
          title="Novo estudo"
          subtitle="Título + texto. O slug é gerado do título se você deixar em branco."
          summary="Abrir para escrever um estudo"
          defaultOpen={studies.length === 0}
        >
          <form action={saveStudy} className="grid max-w-3xl gap-4">
            <Field label="Título">
              <input
                name="title"
                required
                placeholder="Fé que conecta"
                className={adminInputClass}
              />
            </Field>
            <Field label="Slug" hint="Opcional. Ex.: fe-que-conecta">
              <input
                name="slug"
                placeholder="gerado automaticamente"
                className={adminInputClass}
              />
            </Field>
            <Field label="Resumo">
              <input
                name="excerpt"
                placeholder="Uma linha que aparece na listagem"
                className={adminInputClass}
              />
            </Field>
            <Field label="Texto completo">
              <textarea
                name="body"
                required
                rows={12}
                placeholder="Escreva o estudo aqui…"
                className={adminInputClass}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm text-mute">
              <input name="published" type="checkbox" defaultChecked />
              Publicado para associados
            </label>
            <button type="submit" className={adminPrimaryBtnClass}>
              Publicar estudo
            </button>
          </form>
        </CollapsibleCard>

        <CollapsibleCard
          eyebrow="Biblioteca"
          title="Estudos cadastrados"
          summary={
            studies.length
              ? `${studies.length} no total · ${published} publicados`
              : "Nenhum estudo ainda"
          }
          defaultOpen
        >
          {studies.length === 0 ? (
            <EmptyGuide
              title="Nenhum estudo publicado"
              body="Abra o card de novo estudo e escreva o primeiro texto. Rascunhos ficam só no admin."
            />
          ) : (
            <div className="space-y-3">
              {studies.map((study) => (
                <div
                  key={study.id}
                  className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-line bg-ink/25 p-4"
                >
                  <div>
                    <p className="display text-xl text-parchment">
                      {study.title}
                    </p>
                    <p className="mt-1 text-sm text-mute">/{study.slug}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-mute">
                      {study.published ? "Publicado" : "Rascunho"}
                    </p>
                  </div>
                  <form action={deleteStudy}>
                    <input type="hidden" name="id" value={study.id} />
                    <button type="submit" className={adminGhostBtnClass}>
                      Remover
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </CollapsibleCard>
      </div>
    </>
  );
}
