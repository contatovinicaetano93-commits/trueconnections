import { asc } from "drizzle-orm";
import { deleteVideo } from "@/app/actions/members";
import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import { RuachVideoForm } from "@/components/admin/RuachVideoForm";
import {
  EmptyGuide,
  PageIntro,
  adminGhostBtnClass,
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
        description="Faça upload do arquivo (MP4/WebM/MOV) ou cole um link do YouTube/Vimeo. Publicados aparecem em /associados/ruach."
      />

      <div className="space-y-4">
        <CollapsibleCard
          eyebrow="Publicar"
          title="Novo vídeo"
          subtitle="Prefira upload direto do arquivo. Link externo continua disponível."
          summary="Abrir para adicionar uma aula"
          defaultOpen={videos.length === 0}
        >
          <RuachVideoForm />
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
