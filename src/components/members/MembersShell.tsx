"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/members/SignOutButton";

const memberLinks = [
  { href: "/associados", label: "Início", exact: true },
  { href: "/associados/cupons", label: "Cupons" },
  { href: "/associados/ruach", label: "Ruach" },
  { href: "/associados/estudos", label: "Estudos" },
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
  const pathname = usePathname();
  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen bg-ink text-parchment">
      <header className="border-b border-line bg-smoke/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div>
            <p className="eyebrow">Área de associados</p>
            <p className="display text-xl text-parchment">Olá, {name}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            {memberLinks.map((link) => {
              const active = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition ${
                    active ? "text-gold" : "text-mute hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {isAdmin ? (
              <Link
                href="/admin"
                className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-gold transition hover:border-gold/70"
              >
                Painel admin
              </Link>
            ) : null}
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
