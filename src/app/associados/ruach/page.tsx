import { asc, eq } from "drizzle-orm";
import { MemberEmptyState } from "@/components/members/MemberEmptyState";
import { MemberPageIntro } from "@/components/members/MemberPageIntro";
import { MemberSectionLinks } from "@/components/members/MemberSectionLinks";
import { MembersShell } from "@/components/members/MembersShell";
import { Stagger } from "@/components/motion/Stagger";
import { getDb } from "@/db";
import { ruachVideos } from "@/db/schema";
import { requireMember } from "@/lib/session";
import { embedUrl, isDirectVideo } from "@/lib/video-embed";

export const metadata = {
  title: "Ruach | Associados",
};

export default async function RuachPage() {
  const session = await requireMember();
  const videos = await getDb()
    .select()
    .from(ruachVideos)
    .where(eq(ruachVideos.published, true))
    .orderBy(asc(ruachVideos.sortOrder));

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <MemberPageIntro
        eyebrow="Aulas"
        title="Ruach"
        description="Biblioteca de vídeos exclusivos para associados. Assista no seu tempo."
        backHref="/associados"
        backLabel="Voltar ao início"
        meta={
          videos.length > 0 ? (
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-[hsl(40_40%_52%)] uppercase">
              {videos.length} {videos.length === 1 ? "aula" : "aulas"}
            </p>
          ) : null
        }
      />

      <div className="mt-10 space-y-8">
        {videos.length === 0 ? (
          <MemberEmptyState
            title="Nenhuma aula publicada"
            body="Quando a equipe publicar vídeos do Ruach, a biblioteca aparece aqui para você assistir."
            actionHref="/associados"
            actionLabel="Voltar ao início"
          />
        ) : (
          <Stagger className="space-y-8">
            {videos.map((video, index) => {
              const embed = embedUrl(video.videoUrl);
              const direct = isDirectVideo(video.videoUrl);
              return (
                <article key={video.id} className="members-media">
                  <div className="aspect-video bg-[hsl(24_12%_12%)]/5">
                    {embed ? (
                      <iframe
                        src={embed}
                        title={video.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : direct ? (
                      <video
                        src={video.videoUrl}
                        controls
                        playsInline
                        preload="metadata"
                        poster={video.thumbnailUrl || undefined}
                        className="h-full w-full bg-[hsl(24_12%_12%)]/5 object-contain"
                      >
                        Seu navegador não reproduz este vídeo.
                      </video>
                    ) : (
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-full items-center justify-center text-sm text-[hsl(40_40%_52%)] transition hover:text-[hsl(40_40%_42%)]"
                      >
                        Abrir vídeo →
                      </a>
                    )}
                  </div>
                  <div className="px-5 py-5 md:px-6 md:py-6">
                    <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-[hsl(40_40%_52%)] uppercase">
                      Aula {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[hsl(24_12%_12%)] md:text-[1.75rem]">
                      {video.title}
                    </h2>
                    {video.description ? (
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[hsl(24_8%_34%)]">
                        {video.description}
                      </p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </Stagger>
        )}
      </div>

      <MemberSectionLinks current="ruach" />
    </MembersShell>
  );
}
