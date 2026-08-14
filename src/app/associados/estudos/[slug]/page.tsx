import { notFound } from "next/navigation";
import Image from "next/image";
import { and, eq } from "drizzle-orm";
import { Headphones } from "lucide-react";
import { MemberBackLink } from "@/components/members/MemberBackLink";
import { MemberSectionLinks } from "@/components/members/MemberSectionLinks";
import { MembersShell } from "@/components/members/MembersShell";
import { getDb } from "@/db";
import { bibleStudies } from "@/db/schema";
import { site } from "@/lib/content";
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
          <MemberBackLink href="/associados?tab=estudos" label="Voltar aos estudos" />
          <MemberBackLink href="/associados" label="Voltar à área premium" />
        </div>

        <Image
          src={site.logo}
          alt=""
          width={120}
          height={38}
          className="mb-4 h-8 w-auto object-contain opacity-90"
        />
        <p className="mb-3 font-[family-name:var(--font-body)] text-[0.68rem] font-semibold tracking-[0.18em] text-[hsl(40_40%_52%)] uppercase">
          Estudo bíblico
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] text-[hsl(24_12%_12%)]">
          {study.title}
        </h1>
        {study.excerpt ? (
          <p className="mt-5 text-lg leading-relaxed text-[hsl(24_8%_34%)]">
            {study.excerpt}
          </p>
        ) : null}

        {study.audioUrl ? (
          <div className="mt-8 rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-white/60 px-5 py-5">
            <div className="mb-3 flex items-center gap-2 text-[hsl(40_40%_52%)]">
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

        <div className="mt-10 border-t border-[hsl(32_14%_78%/0.3)] pt-8">
          <div className="body-prose whitespace-pre-wrap text-[hsl(24_12%_12%)]/90">
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
