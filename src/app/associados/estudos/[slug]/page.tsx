import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { Headphones } from "lucide-react";
import { MemberBackLink } from "@/components/members/MemberBackLink";
import { MemberSectionLinks } from "@/components/members/MemberSectionLinks";
import { MembersShell } from "@/components/members/MembersShell";
import { BrandLogo } from "@/components/ui/BrandLogo";
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
        <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <MemberBackLink
            href="/associados/estudos"
            label="Voltar aos estudos"
          />
          <MemberBackLink href="/associados" label="Voltar ao início" />
        </div>

        <BrandLogo variant="mark" size="sm" className="mb-4" />
        <p className="eyebrow mb-3">Estudo bíblico</p>
        <h1 className="display text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.05] text-parchment">
          {study.title}
        </h1>
        {study.excerpt ? (
          <p className="mt-5 text-lg leading-relaxed text-mute">{study.excerpt}</p>
        ) : null}

        {study.audioUrl ? (
          <div className="mt-8 border border-line bg-smoke/40 px-5 py-5">
            <div className="mb-3 flex items-center gap-2 text-gold">
              <Headphones size={18} aria-hidden />
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase">
                Ouvir o estudo
              </p>
            </div>
            <audio
              controls
              preload="metadata"
              src={study.audioUrl}
              className="w-full"
            >
              Seu navegador não reproduz áudio.
            </audio>
          </div>
        ) : null}

        <div className="mt-10 border-t border-line pt-8">
          <div className="body-prose whitespace-pre-wrap text-parchment/90">
            {study.body}
          </div>
        </div>
      </article>

      <div className="mx-auto max-w-3xl">
        <MemberSectionLinks current="estudos" />
      </div>
    </MembersShell>
  );
}
