"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/members/SignOutButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

const memberLinks = [
  { href: "/associados", label: "Início", exact: true },
  { href: "/associados/cupons", label: "Cupons" },
  { href: "/associados/ruach", label: "Ruach" },
  { href: "/associados/estudos", label: "Estudos" },
];

function firstName(fullName: string) {
  const part = fullName.trim().split(/\s+/)[0];
  return part || fullName;
}

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
  const greeting = firstName(name);

  return (
    <MotionProvider>
      <div className="members-shell bg-ink text-parchment">
        <div className="members-shell__glow" aria-hidden>
          <div className="mesh" />
        </div>

        <header className="members-header">
          <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8 md:py-4">
            <Link
              href="/associados"
              className="shrink-0 transition hover:opacity-90"
              aria-label="True Connections — início da área de membros"
            >
              <BrandLogo variant="lockup" size="md" priority />
            </Link>

            <div className="flex min-w-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p className="hidden truncate text-sm text-mute sm:block md:text-[0.95rem]">
                Olá,{" "}
                <span className="font-medium text-parchment">{greeting}</span>
              </p>
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="hidden rounded-full border border-gold/45 bg-gold/12 px-3.5 py-1.5 text-xs font-medium tracking-wide text-gold transition hover:border-gold/75 sm:inline-flex"
                >
                  Painel admin
                </Link>
              ) : null}
              <SignOutButton />
            </div>
          </div>

          <nav
            aria-label="Área de membros"
            className="relative border-t border-line/70"
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
              <div className="flex gap-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden">
                {memberLinks.map((link) => {
                  const active = link.exact
                    ? pathname === link.href
                    : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="members-nav-link"
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {isAdmin ? (
                  <Link href="/admin" className="members-nav-link sm:hidden">
                    Admin
                  </Link>
                ) : null}
              </div>
              <p className="shrink-0 text-sm text-mute sm:hidden">
                Olá, <span className="text-parchment">{greeting}</span>
              </p>
            </div>
          </nav>
        </header>

        <main className="relative z-[1] mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
          <FadeIn key={pathname}>{children}</FadeIn>
        </main>

        <footer className="relative z-[1] border-t border-line/70">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 md:px-8">
            <BrandLogo variant="lockup" size="sm" />
            <p className="text-[0.65rem] tracking-[0.2em] text-mute uppercase">
              Área de membros
            </p>
          </div>
        </footer>
      </div>
    </MotionProvider>
  );
}
