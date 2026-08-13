import Link from "next/link";
import Image from "next/image";
import { BookOpen, Ticket, Video } from "lucide-react";
import { eq, sql } from "drizzle-orm";
import { MembersShell } from "@/components/members/MembersShell";
import { memberPortalCardClass } from "@/components/members/memberStyles";
import { Stagger } from "@/components/motion/Stagger";
import { getDb } from "@/db";
import { bibleStudies, partnerCoupons, ruachVideos } from "@/db/schema";
import { site } from "@/lib/content";
import { requireMember } from "@/lib/session";

export const metadata = {
  title: "Área de membros",
};

const products = [
  {
    href: "/associados/cupons",
    title: "Cupons",
    desc: "Códigos e benefícios dos parceiros",
    icon: Ticket,
    countKey: "coupons" as const,
    empty: "Em breve",
    singular: "benefício",
    plural: "benefícios",
  },
  {
    href: "/associados/ruach",
    title: "Ruach",
    desc: "Aulas em vídeo no seu ritmo",
    icon: Video,
    countKey: "videos" as const,
    empty: "Em breve",
    singular: "aula",
    plural: "aulas",
  },
  {
    href: "/associados/estudos",
    title: "Estudos",
    desc: "Leituras bíblicas da comunidade",
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
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 flex flex-col items-center px-4 py-2 md:mb-10 md:rounded-3xl md:bg-[hsl(38_28%_94%/0.55)] md:px-10 md:py-8 md:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_28px_rgba(0,0,0,0.04)] md:ring-1 md:ring-black/[0.04]">
          <Image
            src={site.logo}
            alt="True Connection"
            width={320}
            height={100}
            className="h-auto w-[min(72vw,16rem)] object-contain md:w-[18rem]"
          />
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.1] text-[hsl(24_12%_12%)]">
          Bem-vindo, {greeting}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[hsl(24_12%_12%)]/55 md:text-base">
          Seu espaço exclusivo: cupons de parceiros, aulas Ruach e estudos bíblicos — tudo em um só lugar.
        </p>
        <div className="mx-auto mt-5 h-px w-12 bg-[hsl(40_40%_52%)]/40" />
      </div>

      {session.user.role === "admin" ? (
        <Link
          href="/admin"
          className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[hsl(40_40%_52%)]/35 bg-[hsl(40_40%_52%)]/10 px-5 py-4 transition hover:border-[hsl(40_40%_52%)]/60"
        >
          <div className="text-left">
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[hsl(40_40%_52%)] uppercase">
              Administração
            </p>
            <p className="mt-1 text-sm text-[hsl(24_8%_34%)]">
              Publicar cupons, Ruach, estudos e gerenciar associados.
            </p>
          </div>
          <span className="text-sm font-medium text-[hsl(40_40%_52%)]">Abrir painel →</span>
        </Link>
      ) : null}

      <Stagger className="mt-10 grid w-full grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3">
        {products.map((item) => {
          const Icon = item.icon;
          const count = counts[item.countKey];
          const meta =
            count === 0
              ? item.empty
              : `${count} ${count === 1 ? item.singular : item.plural}`;

          return (
            <Link key={item.href} href={item.href} className={memberPortalCardClass}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(24_12%_12%)]/[0.03] transition-all duration-500 group-hover:bg-[hsl(40_40%_52%)]/[0.12] md:h-11 md:w-11">
                <Icon
                  className="h-[18px] w-[18px] text-[hsl(24_12%_12%)]/45 transition-colors duration-500 group-hover:text-[hsl(24_12%_12%)]/70"
                  strokeWidth={1.4}
                />
              </div>
              <p className="font-[family-name:var(--font-body)] text-[11px] font-medium tracking-wide text-[hsl(24_12%_12%)]/75 transition-colors duration-500 group-hover:text-[hsl(24_12%_12%)] md:text-[13px]">
                {item.title}
              </p>
              <p className="mt-0.5 hidden font-[family-name:var(--font-body)] text-[9px] leading-tight text-[hsl(24_12%_12%)]/45 sm:block md:text-[10px]">
                {item.desc}
              </p>
              <p className="mt-2 font-[family-name:var(--font-body)] text-[9px] font-semibold tracking-[0.12em] text-[hsl(40_40%_52%)] uppercase md:text-[10px]">
                {meta}
              </p>
            </Link>
          );
        })}
      </Stagger>
    </MembersShell>
  );
}
