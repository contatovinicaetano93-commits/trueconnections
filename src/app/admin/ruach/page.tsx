import { asc } from "drizzle-orm";
import { deleteVideo, saveVideo } from "@/app/actions/members";
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
import { ruachVideos } from "@/db/schema";

export const metadata = {
  title: "Admin · Ruach",
};

export default async function AdminRuachPage() {
  const videos = await getDb()
    .select()
    .from(ruachVideos)
    .orderBy(asc(ruachVideos.sortOrder));

  const published = videos.filter((v) => v.published).length;

  return (
    <>
      <PageIntro
        eyebrow="Aulas"
        title="Biblioteca Ruach"
        description="Cole a URL do YouTube ou Vimeo. Itens publicados aparecem em /associados/ruach para os membros assistirem."
      />

      <div className="space-y-4">
        <CollapsibleCard
          eyebrow="Publicar"
          title="Novo vídeo"
          subtitle="Título claro + link. Ordem controla a sequência na lista do associado."
          summary="Abrir para adicionar uma aula"
          defaultOpen={videos.length === 0}
        >
          <form action={saveVideo} className="grid max-w-2xl gap-4">
            <Field label="Título">
              <input
                name="title"
                required
                placeholder="Aula 01 — Introdução"
                className={adminInputClass}
              />
            </Field>
            <Field
              label="URL do vídeo"
              hint="YouTube ou Vimeo — o player embute automaticamente."
            >
              <input
                name="videoUrl"
                required
                placeholder="https://www.youtube.com/watch?v=…"
                className={adminInputClass}
              />
            </Field>
            <Field label="Thumbnail (opcional)">
              <input
                name="thumbnailUrl"
                placeholder="https://…"
                className={adminInputClass}
              />
            </Field>
            <Field label="Descrição">
              <textarea
                name="description"
                rows={3}
                placeholder="Resumo da aula para o associado"
                className={adminInputClass}
              />
            </Field>
            <Field label="Ordem" hint="Menor número aparece primeiro.">
              <input
                name="sortOrder"
                type="number"
                defaultValue={0}
                className={adminInputClass}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm text-mute">
              <input name="published" type="checkbox" defaultChecked />
              Publicado para associados
            </label>
            <button type="submit" className={adminPrimaryBtnClass}>
              Publicar vídeo
            </button>
          </form>
        </CollapsibleCard>

        <CollapsibleCard
          eyebrow="Biblioteca"
          title="Vídeos cadastrados"
          summary={
            videos.length
              ? `${videos.length} no total · ${published} publicados`
              : "Nenhuma aula ainda"
          }
          defaultOpen
        >
          {videos.length === 0 ? (
            <EmptyGuide
              title="Biblioteca vazia"
              body="Publique a primeira aula no card acima. Enquanto estiver em rascunho, só o admin vê aqui."
            />
          ) : (
            <div className="space-y-3">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-line bg-ink/25 p-4"
                >
                  <div className="min-w-0">
                    <p className="display text-xl text-parchment">
                      {video.title}
                    </p>
                    <p className="mt-1 break-all text-sm text-mute">
                      {video.videoUrl}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-mute">
                      {video.published ? "Publicado" : "Rascunho"} · ordem{" "}
                      {video.sortOrder}
                    </p>
                  </div>
                  <form action={deleteVideo}>
                    <input type="hidden" name="id" value={video.id} />
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
