import Link from "next/link";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import {
  ArrowRight,
  BookOpen,
  Ticket,
  Users,
  Video,
  Wallet,
} from "lucide-react";
import { syncSubscriptionStatuses } from "@/app/actions/members";
import { CollapsibleCard } from "@/components/admin/CollapsibleCard";
import { PageIntro } from "@/components/admin/ui";
import { getDb } from "@/db";
import { bibleStudies, partnerCoupons, ruachVideos, user } from "@/db/schema";
import { formatBRL } from "@/lib/billing";

export const metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  await syncSubscriptionStatuses();

  const db = getDb();
  const [
    [couponCount],
    [videoCount],
    [studyCount],
    [memberCount],
    [pendingCount],
    [overdueCount],
    recentCoupons,
    recentVideos,
    pendingMembers,
  ] = await Promise.all([
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
      .select({ n: sql<number>`count(*)::int` })
      .from(user)
      .where(and(eq(user.role, "member"), eq(user.active, true))),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(user)
      .where(
        and(
          eq(user.role, "member"),
          eq(user.active, true),
          eq(user.subscriptionStatus, "pending"),
        ),
      ),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(user)
      .where(
        and(
          eq(user.role, "member"),
          eq(user.active, true),
          eq(user.subscriptionStatus, "overdue"),
        ),
      ),
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
    db
      .select({
        id: user.id,
        name: user.name,
        monthlyAmountCents: user.monthlyAmountCents,
        subscriptionStatus: user.subscriptionStatus,
        nextDueAt: user.nextDueAt,
      })
      .from(user)
      .where(
        and(
          eq(user.role, "member"),
          eq(user.active, true),
          inArray(user.subscriptionStatus, ["pending", "overdue"]),
        ),
      )
      .orderBy(user.nextDueAt)
      .limit(6),
  ]);

  const members = memberCount?.n ?? 0;
  const pending = (pendingCount?.n ?? 0) + (overdueCount?.n ?? 0);

  const peopleModules = [
    {
      href: "/admin/usuarios",
      icon: Users,
      label: "Associados",
      count: members,
      unit: members === 1 ? "ativo" : "ativos",
      guide: "Contas com papel de associado e acesso liberado.",
    },
    {
      href: "/admin/usuarios",
      icon: Wallet,
      label: "Pagamentos pendentes",
      count: pending,
      unit: pending === 1 ? "cobrança" : "cobranças",
      guide: "Vencidos ou à cobrar — abra Usuários e cobre no WhatsApp.",
    },
  ];

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
      guide: "Publique aulas em vídeo (upload ou YouTube/Vimeo).",
    },
    {
      href: "/admin/estudos",
      icon: BookOpen,
      label: "Estudos",
      count: studyCount?.n ?? 0,
      unit: "publicados",
      guide: "Textos e áudios bíblicos para a comunidade.",
    },
  ];

  return (
    <>
      <PageIntro
        eyebrow="Painel"
        title="Visão geral"
        description="Acompanhe associados, cobranças e o conteúdo publicado na área de membros."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {peopleModules.map(({ href, icon: Icon, label, count, unit, guide }) => (
          <Link
            key={label}
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

      <div className="mt-4 grid gap-4 md:grid-cols-3">
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
          eyebrow="Cobrança"
          title="Pendências do mês"
          summary={
            pendingMembers.length
              ? `${pendingMembers.length} para cobrar agora`
              : "Nenhuma pendência no momento"
          }
          defaultOpen={pendingMembers.length > 0}
        >
          {pendingMembers.length === 0 ? (
            <p className="text-sm text-mute">
              Quando um associado vencer a mensalidade, ele aparece aqui. Em
              Usuários você cobra pelo WhatsApp e marca como pago.
            </p>
          ) : (
            <ul className="space-y-2">
              {pendingMembers.map((m) => (
                <li
                  key={m.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-ink/25 px-3 py-2.5 text-sm"
                >
                  <div>
                    <p className="text-parchment">{m.name}</p>
                    <p className="text-xs text-mute">
                      {m.subscriptionStatus === "overdue" ? "Em atraso" : "Pendente"}
                      {m.nextDueAt
                        ? ` · venceu ${new Date(m.nextDueAt).toLocaleDateString("pt-BR", { timeZone: "UTC" })}`
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gold">
                      {m.monthlyAmountCents != null
                        ? formatBRL(m.monthlyAmountCents)
                        : "—"}
                    </span>
                    <Link
                      href="/admin/usuarios"
                      className="text-xs font-medium text-gold hover:underline"
                    >
                      Cobrar →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CollapsibleCard>

        <CollapsibleCard
          eyebrow="Guia rápido"
          title="Fluxo de mensalidade"
          summary="Cadastro → cobrança WhatsApp → marcar pago → próximo vencimento"
          defaultOpen
        >
          <ol className="space-y-3 text-sm text-mute">
            <li>
              <span className="font-medium text-parchment">1. Crie o associado</span>{" "}
              em Usuários com WhatsApp. A 1ª mensalidade (R$ 50) vence 30 dias após
              o cadastro — a data não se altera.
            </li>
            <li>
              <span className="font-medium text-parchment">2. Complete o perfil</span>{" "}
              (nome + WhatsApp). Sem telefone, o botão de cobrança não abre.
            </li>
            <li>
              <span className="font-medium text-parchment">3. Cobrar no WhatsApp</span>{" "}
              no vencimento e{" "}
              <span className="font-medium text-parchment">marcar como pago</span> —
              o próximo ciclo avança +30 dias.
            </li>
          </ol>
        </CollapsibleCard>

        <CollapsibleCard
          eyebrow="Recente"
          title="Últimos conteúdos"
          summary={
            recentCoupons.length || recentVideos.length
              ? `${recentCoupons.length} cupons · ${recentVideos.length} vídeos`
              : "Nada publicado ainda"
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
