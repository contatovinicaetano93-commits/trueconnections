import { asc } from "drizzle-orm";
import { deleteVideo, saveVideo } from "@/app/actions/members";
import { MembersShell } from "@/components/members/MembersShell";
import { getDb } from "@/db";
import { ruachVideos } from "@/db/schema";
import { requireAdmin } from "@/lib/session";

export const metadata = {
  title: "Admin · Ruach",
};

export default async function AdminRuachPage() {
  const session = await requireAdmin();
  const videos = await getDb()
    .select()
    .from(ruachVideos)
    .orderBy(asc(ruachVideos.sortOrder));

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <h1 className="display text-3xl text-parchment">Vídeos Ruach</h1>

      <form
        action={saveVideo}
        className="mt-8 grid max-w-2xl gap-3 rounded-2xl border border-line bg-card p-6"
      >
        <input
          name="title"
          placeholder="Título"
          required
          className="rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
        />
        <input
          name="videoUrl"
          placeholder="URL do vídeo (YouTube, Vimeo ou arquivo)"
          required
          className="rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
        />
        <input
          name="thumbnailUrl"
          placeholder="URL da thumbnail (opcional)"
          className="rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
        />
        <textarea
          name="description"
          placeholder="Descrição"
          rows={3}
          className="rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
        />
        <input
          name="sortOrder"
          type="number"
          defaultValue={0}
          placeholder="Ordem"
          className="rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
        />
        <label className="flex items-center gap-2 text-sm text-mute">
          <input name="published" type="checkbox" defaultChecked />
          Publicado
        </label>
        <button
          type="submit"
          className="justify-self-start rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-deep"
        >
          Publicar vídeo
        </button>
      </form>

      <div className="mt-10 space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-line bg-card p-5"
          >
            <div>
              <p className="display text-xl">{video.title}</p>
              <p className="mt-1 break-all text-sm text-mute">{video.videoUrl}</p>
              <p className="mt-2 text-xs text-mute">
                {video.published ? "Publicado" : "Rascunho"} · ordem{" "}
                {video.sortOrder}
              </p>
            </div>
            <form action={deleteVideo}>
              <input type="hidden" name="id" value={video.id} />
              <button type="submit" className="text-sm text-mute hover:text-ember">
                Remover
              </button>
            </form>
          </div>
        ))}
      </div>
    </MembersShell>
  );
}
