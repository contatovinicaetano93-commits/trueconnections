import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { MembersShell } from "@/components/members/MembersShell";
import { getDb } from "@/db";
import { bibleStudies } from "@/db/schema";
import { requireMember } from "@/lib/session";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [study] = await getDb()
    .select()
    .from(bibleStudies)
    .where(eq(bibleStudies.slug, slug))
    .limit(1);

  return {
    title: study ? `${study.title} | Estudos` : "Estudo",
  };
}

export default async function EstudoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await requireMember();
  const { slug } = await params;
  const [study] = await getDb()
    .select()
    .from(bibleStudies)
    .where(and(eq(bibleStudies.slug, slug), eq(bibleStudies.published, true)))
    .limit(1);

  if (!study) notFound();

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <article className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3">Estudo bíblico</p>
        <h1 className="display text-[clamp(2.2rem,4vw,3.4rem)] text-parchment">
          {study.title}
        </h1>
        {study.excerpt ? (
          <p className="mt-4 text-lg text-mute">{study.excerpt}</p>
        ) : null}
        <div className="mt-10 whitespace-pre-wrap text-base leading-8 text-parchment/90">
          {study.body}
        </div>
      </article>
    </MembersShell>
  );
}
