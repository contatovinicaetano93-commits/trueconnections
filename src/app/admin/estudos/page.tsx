import { desc } from "drizzle-orm";
import { deleteStudy, saveStudy } from "@/app/actions/members";
import { MembersShell } from "@/components/members/MembersShell";
import { getDb } from "@/db";
import { bibleStudies } from "@/db/schema";
import { requireAdmin } from "@/lib/session";

export const metadata = {
  title: "Admin · Estudos",
};

export default async function AdminEstudosPage() {
  const session = await requireAdmin();
  const studies = await getDb()
    .select()
    .from(bibleStudies)
    .orderBy(desc(bibleStudies.createdAt));

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <h1 className="display text-3xl text-parchment">Estudos bíblicos</h1>

      <form
        action={saveStudy}
        className="mt-8 grid max-w-3xl gap-3 rounded-2xl border border-line bg-card p-6"
      >
        <input
          name="title"
          placeholder="Título"
          required
          className="rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
        />
        <input
          name="slug"
          placeholder="Slug (opcional)"
          className="rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
        />
        <input
          name="excerpt"
          placeholder="Resumo"
          className="rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
        />
        <textarea
          name="body"
          placeholder="Texto completo"
          required
          rows={12}
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
          Publicar estudo
        </button>
      </form>

      <div className="mt-10 space-y-4">
        {studies.map((study) => (
          <div
            key={study.id}
            className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-line bg-card p-5"
          >
            <div>
              <p className="display text-xl">{study.title}</p>
              <p className="mt-1 text-sm text-mute">/{study.slug}</p>
              <p className="mt-2 text-xs text-mute">
                {study.published ? "Publicado" : "Rascunho"}
              </p>
            </div>
            <form action={deleteStudy}>
              <input type="hidden" name="id" value={study.id} />
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
