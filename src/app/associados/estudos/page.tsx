import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { ArrowRight, Headphones } from "lucide-react";
import { MemberEmptyState } from "@/components/members/MemberEmptyState";
import { MemberPageIntro } from "@/components/members/MemberPageIntro";
import { MemberSectionLinks } from "@/components/members/MemberSectionLinks";
import { MembersShell } from "@/components/members/MembersShell";
import { Stagger } from "@/components/motion/Stagger";
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
      <MemberPageIntro
        eyebrow="Leitura"
        title="Estudos bíblicos"
        description="Textos e áudios publicados pela equipe para a comunidade meditar e crescer juntas."
        backHref="/associados"
        backLabel="Voltar ao início"
        meta={
          studies.length > 0 ? (
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-[hsl(40_40%_52%)] uppercase">
              {studies.length} {studies.length === 1 ? "estudo" : "estudos"}
            </p>
          ) : null
        }
      />

      <div className="mt-10">
        {studies.length === 0 ? (
          <MemberEmptyState
            title="Nenhum estudo publicado"
            body="Os estudos bíblicos da comunidade vão aparecer aqui assim que forem liberados pela administração."
            actionHref="/associados"
            actionLabel="Voltar ao início"
          />
        ) : (
          <Stagger>
            {studies.map((study) => (
              <Link
                key={study.id}
                href={`/associados/estudos/${study.slug}`}
                className="members-study-row group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-[family-name:var(--font-display)] text-xl text-[hsl(24_12%_12%)] transition group-hover:text-[hsl(40_40%_52%)] md:text-2xl">
                        {study.title}
                      </h2>
                      {study.audioUrl ? (
                        <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold tracking-[0.14em] text-[hsl(40_40%_52%)] uppercase">
                          <Headphones size={12} aria-hidden />
                          Áudio
                        </span>
                      ) : null}
                    </div>
                    {study.excerpt ? (
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[hsl(24_8%_34%)]">
                        {study.excerpt}
                      </p>
                    ) : null}
                  </div>
                  <ArrowRight
                    size={18}
                    className="mt-1.5 shrink-0 text-[hsl(24_8%_34%)] transition group-hover:translate-x-1 group-hover:text-[hsl(40_40%_52%)]"
                    aria-hidden
                  />
                </div>
              </Link>
            ))}
          </Stagger>
        )}
      </div>

      <MemberSectionLinks current="estudos" />
    </MembersShell>
  );
}
