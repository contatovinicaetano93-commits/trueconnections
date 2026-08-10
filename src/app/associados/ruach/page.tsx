import { asc, eq } from "drizzle-orm";
import { MemberEmptyState } from "@/components/members/MemberEmptyState";
import { MemberPageIntro } from "@/components/members/MemberPageIntro";
import { MemberSectionLinks } from "@/components/members/MemberSectionLinks";
import { MembersShell } from "@/components/members/MembersShell";
import { Stagger } from "@/components/motion/Stagger";
import { getDb } from "@/db";
import { ruachVideos } from "@/db/schema";
import { requireMember } from "@/lib/session";

export const metadata = {
  title: "Ruach | Associados",
};

function embedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

function isDirectVideo(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("blob.vercel-storage.com")) return true;
    return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(parsed.pathname);
  } catch {
    return false;
  }
}

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
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-gold uppercase">
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
                  <div className="aspect-video bg-deep/15">
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
                        className="h-full w-full bg-deep object-contain"
                      >
                        Seu navegador não reproduz este vídeo.
                      </video>
                    ) : (
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-full items-center justify-center text-sm text-gold transition hover:text-gold-soft"
                      >
                        Abrir vídeo →
                      </a>
                    )}
                  </div>
                  <div className="px-5 py-5 md:px-6 md:py-6">
                    <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-gold uppercase">
                      Aula {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="display mt-2 text-2xl text-parchment md:text-[1.75rem]">
                      {video.title}
                    </h2>
                    {video.description ? (
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-mute">
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
