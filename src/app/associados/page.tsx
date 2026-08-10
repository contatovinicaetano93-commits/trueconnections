import Link from "next/link";
import { BookOpen, Ticket, Video } from "lucide-react";
import { eq, sql } from "drizzle-orm";
import { MemberPageIntro } from "@/components/members/MemberPageIntro";
import { MembersShell } from "@/components/members/MembersShell";
import { Stagger } from "@/components/motion/Stagger";
import { getDb } from "@/db";
import { bibleStudies, partnerCoupons, ruachVideos } from "@/db/schema";
import { requireMember } from "@/lib/session";

export const metadata = {
  title: "Área de membros",
};

const products = [
  {
    href: "/associados/cupons",
    title: "Cupons",
    copy: "Códigos e benefícios dos parceiros conveniados.",
    icon: Ticket,
    countKey: "coupons" as const,
    empty: "Em breve",
    singular: "benefício",
    plural: "benefícios",
  },
  {
    href: "/associados/ruach",
    title: "Ruach",
    copy: "Aulas em vídeo para assistir no seu ritmo.",
    icon: Video,
    countKey: "videos" as const,
    empty: "Em breve",
    singular: "aula",
    plural: "aulas",
  },
  {
    href: "/associados/estudos",
    title: "Estudos",
    copy: "Leituras bíblicas publicadas para a comunidade.",
    icon: BookOpen,
    countKey: "studies" as const,
    empty: "Em breve",
    singular: "estudo",
    plural: "estudos",
  },
];

function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

export default async function AssociadosHomePage() {
  const session = await requireMember();
  const db = getDb();

  const [[couponCount], [videoCount], [studyCount]] = await Promise.all([
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(partnerCoupons)
      .where(eq(partnerCoupons.active, true)),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(ruachVideos)
      .where(eq(ruachVideos.published, true)),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(bibleStudies)
      .where(eq(bibleStudies.published, true)),
  ]);

  const counts = {
    coupons: couponCount?.n ?? 0,
    videos: videoCount?.n ?? 0,
    studies: studyCount?.n ?? 0,
  };

  const greeting = firstName(session.user.name);

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <MemberPageIntro
        eyebrow="Comunidade True"
        title={`Bem-vindo, ${greeting}`}
        description="Este é o seu espaço exclusivo: cupons de parceiros, aulas Ruach e estudos bíblicos — tudo em um só lugar."
        backHref="/"
        backLabel="Voltar ao site"
      />

      {session.user.role === "admin" ? (
        <Link
          href="/admin"
          className="mt-8 flex flex-wrap items-center justify-between gap-3 border border-gold/40 bg-gold/10 px-5 py-4 transition hover:border-gold/70"
        >
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-gold uppercase">
              Administração
            </p>
            <p className="mt-1 text-sm text-parchment">
              Publicar cupons, Ruach, estudos e gerenciar associados.
            </p>
          </div>
          <span className="text-sm font-medium text-gold">Abrir painel →</span>
        </Link>
      ) : null}

      <Stagger className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
        {products.map((item) => {
          const Icon = item.icon;
          const count = counts[item.countKey];
          const meta =
            count === 0
              ? item.empty
              : `${count} ${count === 1 ? item.singular : item.plural}`;

          return (
            <Link key={item.href} href={item.href} className="members-benefit">
              <div>
                <span className="members-benefit__icon" aria-hidden>
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <h2 className="display mt-5 text-2xl text-parchment md:text-[1.7rem]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {item.copy}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[0.68rem] font-semibold tracking-[0.16em] text-gold uppercase">
                  {meta}
                </span>
                <span className="text-sm text-parchment">
                  Abrir <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </Stagger>
    </MembersShell>
  );
}
