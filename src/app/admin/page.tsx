import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import { ArrowRight, BookOpen, Ticket, Video } from "lucide-react";
import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import { PageIntro } from "@/components/admin/ui";
import { getDb } from "@/db";
import { bibleStudies, partnerCoupons, ruachVideos } from "@/db/schema";

export const metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const db = getDb();
  const [[couponCount], [videoCount], [studyCount], recentCoupons, recentVideos] =
    await Promise.all([
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
      db
        .select()
        .from(partnerCoupons)
        .orderBy(desc(partnerCoupons.createdAt))
        .limit(3),
      db
        .select()
        .from(ruachVideos)
        .orderBy(desc(ruachVideos.createdAt))
        .limit(3),
    ]);

  const modules = [
    {
      href: "/admin/cupons",
      icon: Ticket,
      label: "Cupons",
      count: couponCount?.n ?? 0,
      unit: "ativos",
      guide: "Cadastre códigos de parceiros para os associados usarem.",
    },
    {
      href: "/admin/ruach",
      icon: Video,
      label: "Ruach",
      count: videoCount?.n ?? 0,
      unit: "publicados",
      guide: "Publique aulas em vídeo (YouTube ou Vimeo).",
    },
    {
      href: "/admin/estudos",
      icon: BookOpen,
      label: "Estudos",
      count: studyCount?.n ?? 0,
      unit: "publicados",
      guide: "Escreva textos bíblicos em formato de leitura.",
    },
  ];

  return (
    <>
      <PageIntro
        eyebrow="Painel"
        title="O que os associados vão encontrar"
        description="Publique cupons, aulas Ruach e estudos. O conteúdo ativo aparece na área de membros. Usuários e login avançado entram no próximo ciclo."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {modules.map(({ href, icon: Icon, label, count, unit, guide }) => (
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
            <p className="display mt-4 text-2xl text-parchment">{label}</p>
            <p className="mt-1 text-sm text-gold">
              {count} {unit}
            </p>
            <p className="mt-3 text-sm text-mute">{guide}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <CollapsibleCard
          eyebrow="Guia rápido"
          title="Como publicar sem erro"
          summary="3 passos: escolher módulo → preencher → marcar ativo/publicado"
          defaultOpen
        >
          <ol className="space-y-3 text-sm text-mute">
            <li>
              <span className="font-medium text-parchment">1. Escolha o módulo</span>{" "}
              na sidebar (Cupons, Ruach ou Estudos).
            </li>
            <li>
              <span className="font-medium text-parchment">2. Abra o card</span>{" "}
              “Novo …” e preencha os campos guiados.
            </li>
            <li>
              <span className="font-medium text-parchment">3. Marque ativo/publicado</span>{" "}
              e salve — o associado vê na hora na área de membros.
            </li>
          </ol>
        </CollapsibleCard>

        <CollapsibleCard
          eyebrow="Recente"
          title="Últimos conteúdos"
          summary={
            recentCoupons.length || recentVideos.length
              ? `${recentCoupons.length} cupons · ${recentVideos.length} vídeos`
              : "Nada publicado ainda — comece pelos cupons"
          }
          defaultOpen={false}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.16em] text-mute">
                Cupons
              </p>
              <ul className="mt-3 space-y-2">
                {recentCoupons.length === 0 ? (
                  <li className="text-sm text-mute">Nenhum ainda.</li>
                ) : (
                  recentCoupons.map((c) => (
                    <li
                      key={c.id}
                      className="rounded-xl border border-line bg-ink/25 px-3 py-2 text-sm"
                    >
                      <span className="text-parchment">{c.partnerName}</span>
                      <span className="ml-2 font-mono text-gold">{c.code}</span>
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
                {recentVideos.length === 0 ? (
                  <li className="text-sm text-mute">Nenhum ainda.</li>
                ) : (
                  recentVideos.map((v) => (
                    <li
                      key={v.id}
                      className="rounded-xl border border-line bg-ink/25 px-3 py-2 text-sm text-parchment"
                    >
                      {v.title}
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
