import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import { RuachVideoForm } from "@/components/admin/RuachVideoForm";
import { VideoListItem } from "@/components/admin/VideoListItem";
import { EmptyGuide, PageIntro } from "@/components/admin/ui";
import { getAdminVideos, type MemberVideoSection } from "@/lib/associados-videos";

const SECTION_COPY: Record<
  MemberVideoSection,
  {
    eyebrow: string;
    title: string;
    description: string;
    previewTab: string;
    emptyTitle: string;
    emptyBody: string;
  }
> = {
  ruach: {
    eyebrow: "Método Ruach",
    title: "Aulas Ruach",
    description:
      "Vídeos da aba Método Ruach em /associados. Upload, YouTube ou Vimeo — publicados aparecem no hub.",
    previewTab: "ruach",
    emptyTitle: "Nenhuma aula cadastrada",
    emptyBody:
      "Publique a primeira aula acima. Enquanto estiver em rascunho, só o admin vê aqui.",
  },
  leme: {
    eyebrow: "Instituto Lume",
    title: "Vídeos Lume",
    description:
      "Conteúdos da aba Instituto Lume em /associados. Ciência, neuroplasticidade e fé para associados.",
    previewTab: "leme",
    emptyTitle: "Nenhum vídeo cadastrado",
    emptyBody:
      "Publique o primeiro vídeo do Instituto Lume. Associados veem na aba correspondente do hub.",
  },
};

export async function AdminVideoSectionPage({
  section,
}: {
  section: MemberVideoSection;
}) {
  const copy = SECTION_COPY[section];
  const videos = await getAdminVideos(section);
  const published = videos.filter((video) => video.published).length;

  return (
    <>
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <p className="mb-6 text-sm text-mute">
        Prévia:{" "}
        <a
          href={`/associados?tab=${copy.previewTab}`}
          className="text-gold underline-offset-2 hover:underline"
        >
          /associados?tab={copy.previewTab}
        </a>
      </p>

      <div className="space-y-4">
        <CollapsibleCard
          eyebrow="Publicar"
          title="Novo vídeo"
          subtitle="Upload de arquivo ou link YouTube/Vimeo."
          summary="Abrir para adicionar um vídeo"
          defaultOpen={videos.length === 0}
        >
          <RuachVideoForm section={section} />
        </CollapsibleCard>

        <CollapsibleCard
          eyebrow="Biblioteca"
          title="Vídeos cadastrados"
          summary={
            videos.length
              ? `${videos.length} no total · ${published} publicados`
              : "Nenhum vídeo ainda"
          }
          defaultOpen
        >
          {videos.length === 0 ? (
            <EmptyGuide title={copy.emptyTitle} body={copy.emptyBody} />
          ) : (
            <div className="space-y-3">
              {videos.map((video) => (
                <VideoListItem
                  key={video.id}
                  section={section}
                  video={{
                    id: video.id,
                    title: video.title,
                    description: video.description,
                    videoUrl: video.videoUrl,
                    thumbnailUrl: video.thumbnailUrl,
                    duration: video.duration,
                    section: video.section === "leme" ? "leme" : "ruach",
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
