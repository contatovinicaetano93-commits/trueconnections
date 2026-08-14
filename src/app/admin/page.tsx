import Link from "next/link";
import { and, desc, eq, sql } from "drizzle-orm";
import {
  ArrowRight,
  Gift,
  Users,
} from "lucide-react";
import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import { SyncBase44Button } from "@/components/admin/SyncBase44Button";
import { associadosHubModules } from "@/components/admin/nav";
import { PageIntro } from "@/components/admin/ui";
import { getDb } from "@/db";
import { bibleStudies, partnerCoupons, ruachVideos, user } from "@/db/schema";

export const metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const db = getDb();
  const [
    [couponCount],
    [ruachCount],
    [lemeCount],
    [studyCount],
    [memberCount],
    recentCoupons,
    recentRuach,
    recentLeme,
  ] = await Promise.all([
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(partnerCoupons)
      .where(eq(partnerCoupons.active, true)),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(ruachVideos)
      .where(and(eq(ruachVideos.section, "ruach"), eq(ruachVideos.published, true))),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(ruachVideos)
      .where(and(eq(ruachVideos.section, "leme"), eq(ruachVideos.published, true))),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(bibleStudies)
      .where(eq(bibleStudies.published, true)),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(user)
      .where(and(eq(user.role, "member"), eq(user.active, true))),
    db
      .select()
      .from(partnerCoupons)
      .orderBy(desc(partnerCoupons.createdAt))
      .limit(3),
    db
      .select()
      .from(ruachVideos)
      .where(eq(ruachVideos.section, "ruach"))
      .orderBy(desc(ruachVideos.createdAt))
      .limit(2),
    db
      .select()
      .from(ruachVideos)
      .where(eq(ruachVideos.section, "leme"))
      .orderBy(desc(ruachVideos.createdAt))
      .limit(2),
  ]);

  const counts: Record<string, number> = {
    beneficios: couponCount?.n ?? 0,
    ruach: ruachCount?.n ?? 0,
    estudos: studyCount?.n ?? 0,
    leme: lemeCount?.n ?? 0,
  };

  const members = memberCount?.n ?? 0;

  return (
    <>
      <PageIntro
        eyebrow="Painel"
        title="Área de associados"
        description="Edite as quatro abas do hub /associados — Benefícios, Ruach, Estudos e Instituto Lume."
      />

      <div className="mb-8 rounded-2xl border border-line bg-card/90 p-5 md:p-6">
        <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-gold uppercase">
          Base44
        </p>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Importe cupons e estudos já publicados no Base44. Vídeos Ruach e Lume são
          editados diretamente aqui no painel.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <SyncBase44Button />
          <Link
            href="/associados"
            className="text-sm text-gold underline-offset-2 hover:underline"
          >
            Ver hub como associado →
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {associadosHubModules.map(({ href, tab, label, icon, guide }) => {
          const Icon = icon;
          const count = counts[tab] ?? 0;
          return (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl border border-line bg-card/90 p-5 transition hover:border-gold/45"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <Icon size={18} />
                </span>
                <ArrowRight
                  size={16}
                  className="text-mute transition group-hover:translate-x-0.5 group-hover:text-gold"
                />
              </div>
              <p className="display mt-4 text-xl text-parchment">{label}</p>
              <p className="mt-1 text-sm text-gold">
                {count} publicado{count === 1 ? "" : "s"}
              </p>
              <p className="mt-3 text-sm text-mute">{guide}</p>
              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.14em] text-mute/80">
                /associados?tab={tab}
              </p>
            </Link>
          );
        })}
      </div>

      <Link
        href="/admin/usuarios"
        className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-line bg-card/90 p-5 transition hover:border-gold/45"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
            <Users size={18} />
          </span>
          <div>
            <p className="display text-xl text-parchment">Usuários</p>
            <p className="text-sm text-gold">
              {members} associado{members === 1 ? "" : "s"} ativo{members === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <ArrowRight size={16} className="text-mute" />
      </Link>

      <div className="mt-6 space-y-4">
        <CollapsibleCard
          eyebrow="Guia rápido"
          title="Como alimentar o hub"
          summary="Quatro abas · uma seção no admin para cada"
          defaultOpen
        >
          <ol className="space-y-3 text-sm text-mute">
            <li>
              <span className="font-medium text-parchment">Benefícios</span> — parceiro,
              oferta, código e site. Importe do Base44 ou cadastre manualmente.
            </li>
            <li>
              <span className="font-medium text-parchment">Método Ruach</span> — aulas em
              vídeo (YouTube/Vimeo ou upload). Ordem e duração aparecem no hub.
            </li>
            <li>
              <span className="font-medium text-parchment">Estudos</span> — textos
              bíblicos; estudos de Romanos aparecem no Novo Testamento.
            </li>
            <li>
              <span className="font-medium text-parchment">Instituto Lume</span> — vídeos
              de ciência e fé, editáveis como as aulas Ruach.
            </li>
          </ol>
        </CollapsibleCard>

        <CollapsibleCard
          eyebrow="Recente"
          title="Últimos conteúdos"
          summary={
            recentCoupons.length || recentRuach.length || recentLeme.length
              ? `${recentCoupons.length} benefícios · ${recentRuach.length + recentLeme.length} vídeos`
              : "Nada publicado ainda"
          }
          defaultOpen={false}
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.16em] text-mute">
                Benefícios
              </p>
              <ul className="mt-3 space-y-2">
                {recentCoupons.length === 0 ? (
                  <li className="text-sm text-mute">Nenhum ainda.</li>
                ) : (
                  recentCoupons.map((coupon) => (
                    <li
                      key={coupon.id}
                      className="rounded-xl border border-line bg-ink/25 px-3 py-2 text-sm"
                    >
                      <span className="text-parchment">{coupon.partnerName}</span>
                      {coupon.offer ? (
                        <span className="mt-1 block text-xs text-gold">{coupon.offer}</span>
                      ) : null}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.16em] text-mute">
                Ruach
              </p>
              <ul className="mt-3 space-y-2">
                {recentRuach.length === 0 ? (
                  <li className="text-sm text-mute">Nenhum ainda.</li>
                ) : (
                  recentRuach.map((video) => (
                    <li
                      key={video.id}
                      className="rounded-xl border border-line bg-ink/25 px-3 py-2 text-sm text-parchment"
                    >
                      {video.title}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.16em] text-mute">
                Lume
              </p>
              <ul className="mt-3 space-y-2">
                {recentLeme.length === 0 ? (
                  <li className="text-sm text-mute">Nenhum ainda.</li>
                ) : (
                  recentLeme.map((video) => (
                    <li
                      key={video.id}
                      className="rounded-xl border border-line bg-ink/25 px-3 py-2 text-sm text-parchment"
                    >
                      {video.title}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </CollapsibleCard>
      </div>
    </>
  );
}
