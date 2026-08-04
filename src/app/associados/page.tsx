import Link from "next/link";
import { MembersShell } from "@/components/members/MembersShell";
import { requireMember } from "@/lib/session";

const products = [
  {
    href: "/associados/cupons",
    title: "Cupons de parceiros",
    copy: "Códigos e benefícios dos conveniados True Connection.",
  },
  {
    href: "/associados/ruach",
    title: "Aulas Ruach",
    copy: "Vídeos das aulas para assistir quando quiser.",
  },
  {
    href: "/associados/estudos",
    title: "Estudos bíblicos",
    copy: "Textos publicados pela equipe, em formato de leitura.",
  },
];

export const metadata = {
  title: "Associados",
};

export default async function AssociadosHomePage() {
  const session = await requireMember();

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <p className="eyebrow mb-3">Seus benefícios</p>
      <h1 className="display text-[clamp(2rem,4vw,3.2rem)] text-parchment">
        Área de membros
      </h1>
      <p className="mt-3 max-w-2xl text-mute">
        Aqui ficam os produtos exclusivos da comunidade: cupons, Ruach e
        estudos.
      </p>

      {session.user.role === "admin" ? (
        <Link
          href="/admin"
          className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-4 transition hover:border-gold/70"
        >
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-gold">
              Administração
            </p>
            <p className="mt-1 text-sm text-parchment">
              Abrir o painel com sidebar para publicar cupons, Ruach e estudos.
            </p>
          </div>
          <span className="text-sm font-medium text-gold">Ir para /admin →</span>
        </Link>
      ) : null}

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {products.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-line bg-card p-6 transition hover:border-gold/50"
          >
            <h2 className="display text-2xl text-parchment">{item.title}</h2>
            <p className="mt-3 text-sm text-mute">{item.copy}</p>
          </Link>
        ))}
      </div>
    </MembersShell>
  );
}
