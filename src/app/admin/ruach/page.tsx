import { asc } from "drizzle-orm";
import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import { RuachVideoForm } from "@/components/admin/RuachVideoForm";
import { VideoListItem } from "@/components/admin/VideoListItem";
import { EmptyGuide, PageIntro } from "@/components/admin/ui";
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
                <VideoListItem
                  key={video.id}
                  video={{
                    id: video.id,
                    title: video.title,
                    description: video.description,
                    videoUrl: video.videoUrl,
                    thumbnailUrl: video.thumbnailUrl,
                    sortOrder: video.sortOrder,
                    published: video.published,
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
