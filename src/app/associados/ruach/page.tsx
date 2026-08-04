import { asc, eq } from "drizzle-orm";
import { MembersShell } from "@/components/members/MembersShell";
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

export default async function RuachPage() {
  const session = await requireMember();
  const videos = await getDb()
    .select()
    .from(ruachVideos)
    .where(eq(ruachVideos.published, true))
    .orderBy(asc(ruachVideos.sortOrder));

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <p className="eyebrow mb-3">Aulas</p>
      <h1 className="display text-[clamp(2rem,4vw,3rem)] text-parchment">
        Ruach
      </h1>
      <p className="mt-3 max-w-2xl text-mute">
        Biblioteca de vídeos para os associados.
      </p>

      <div className="mt-10 space-y-10">
        {videos.length === 0 ? (
          <p className="text-sm text-mute">Nenhuma aula publicada ainda.</p>
        ) : (
          videos.map((video) => {
            const embed = embedUrl(video.videoUrl);
            return (
              <article
                key={video.id}
                className="overflow-hidden rounded-2xl border border-line bg-card"
              >
                <div className="aspect-video bg-deep/10">
                  {embed ? (
                    <iframe
                      src={embed}
                      title={video.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-full items-center justify-center text-sm text-gold"
                    >
                      Abrir vídeo
                    </a>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="display text-2xl text-parchment">
                    {video.title}
                  </h2>
                  {video.description ? (
                    <p className="mt-2 text-sm text-mute">{video.description}</p>
                  ) : null}
                </div>
              </article>
            );
          })
        )}
      </div>
    </MembersShell>
  );
}
