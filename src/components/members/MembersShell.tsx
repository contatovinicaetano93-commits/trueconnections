import Link from "next/link";
import { SignOutButton } from "@/components/members/SignOutButton";

const memberLinks = [
  { href: "/associados", label: "Início" },
  { href: "/associados/cupons", label: "Cupons" },
  { href: "/associados/ruach", label: "Ruach" },
  { href: "/associados/estudos", label: "Estudos" },
];

const adminLinks = [
  { href: "/admin", label: "Admin" },
  { href: "/admin/cupons", label: "Cupons" },
  { href: "/admin/ruach", label: "Ruach" },
  { href: "/admin/estudos", label: "Estudos" },
];

export function MembersShell({
  name,
  role,
  children,
}: {
  name: string;
  role?: string | null;
  children: React.ReactNode;
}) {
  const links = role === "admin" ? [...memberLinks, ...adminLinks] : memberLinks;

  return (
    <div className="min-h-screen bg-ink text-parchment">
      <header className="border-b border-line bg-smoke/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div>
            <p className="eyebrow">Área de associados</p>
            <p className="display text-xl text-parchment">Olá, {name}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-mute transition hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <SignOutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        {children}
      </main>
    </div>
  );
}
