import Link from "next/link";
import { MembersShell } from "@/components/members/MembersShell";
import { createMember } from "@/app/actions/members";
import { requireAdmin } from "@/lib/session";

export const metadata = {
  title: "Admin",
};

const links = [
  { href: "/admin/cupons", label: "Gerenciar cupons" },
  { href: "/admin/ruach", label: "Gerenciar Ruach" },
  { href: "/admin/estudos", label: "Gerenciar estudos" },
];

export default async function AdminPage() {
  const session = await requireAdmin();

  return (
    <MembersShell name={session.user.name} role={session.user.role}>
      <p className="eyebrow mb-3">Painel</p>
      <h1 className="display text-[clamp(2rem,4vw,3rem)] text-parchment">
        Administração
      </h1>
      <p className="mt-3 max-w-2xl text-mute">
        Publique cupons, vídeos Ruach e estudos para os associados.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl border border-line bg-card p-5 transition hover:border-gold/50"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <section className="mt-12 max-w-xl rounded-2xl border border-line bg-card p-6">
        <h2 className="display text-2xl text-parchment">Novo associado</h2>
        <form action={createMember} className="mt-5 space-y-4">
          <input
            name="name"
            placeholder="Nome"
            required
            className="w-full rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            required
            className="w-full rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Senha (mín. 8)"
            required
            minLength={8}
            className="w-full rounded-xl border border-line bg-ink/40 px-4 py-3 outline-none"
          />
          <label className="flex items-center gap-2 text-sm text-mute">
            <input name="role" type="checkbox" value="admin" />
            Criar como admin
          </label>
          <button
            type="submit"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-deep"
          >
            Criar acesso
          </button>
        </form>
      </section>
    </MembersShell>
  );
}
