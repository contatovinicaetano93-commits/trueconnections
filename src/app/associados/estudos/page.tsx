import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { MembersShell } from "@/components/members/MembersShell";
import { getDb } from "@/db";
import { bibleStudies } from "@/db/schema";
import { requireMember } from "@/lib/session";

export const metadata = {
  title: "Estudos | Associados",
};

export default async function EstudosPage() {
  const session = await requireMember();
  const studies = await getDb()
    .select()
    .from(bibleStudies)
    .where(eq(bibleStudies.published, true))
    .orderBy(desc(bibleStudies.publishedAt));

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <p className="eyebrow mb-3">Leitura</p>
      <h1 className="display text-[clamp(2rem,4vw,3rem)] text-parchment">
        Estudos bíblicos
      </h1>
      <p className="mt-3 max-w-2xl text-mute">
        Textos publicados pela administração para a comunidade.
      </p>

      <div className="mt-10 space-y-4">
        {studies.length === 0 ? (
          <p className="text-sm text-mute">Nenhum estudo publicado ainda.</p>
        ) : (
          studies.map((study) => (
            <Link
              key={study.id}
              href={`/associados/estudos/${study.slug}`}
              className="block rounded-2xl border border-line bg-card p-6 transition hover:border-gold/50"
            >
              <h2 className="display text-2xl text-parchment">{study.title}</h2>
              {study.excerpt ? (
                <p className="mt-2 text-sm text-mute">{study.excerpt}</p>
              ) : null}
            </Link>
          ))
        )}
      </div>
    </MembersShell>
  );
}
