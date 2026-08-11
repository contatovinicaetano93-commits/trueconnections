"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MembersBottomNav } from "@/components/members/MembersBottomNav";
import { isMemberNavActive, memberNav } from "@/components/members/nav";
import { SignOutButton } from "@/components/members/SignOutButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

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
          <div className="members-header__inner">
            <Link
              href="/associados"
              className="shrink-0 transition hover:opacity-90"
              aria-label="True Connections — início da área de membros"
            >
              <BrandLogo variant="lockup" size="xs" priority />
            </Link>

            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <p className="hidden truncate text-sm text-mute sm:block">
                Olá,{" "}
                <span className="font-medium text-parchment">{greeting}</span>
              </p>
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="rounded-full border border-gold/45 bg-gold/12 px-3 py-1.5 text-[0.65rem] font-medium tracking-wide text-gold transition hover:border-gold/75 sm:text-xs sm:px-3.5"
                >
                  Admin
                </Link>
              ) : null}
              <SignOutButton />
            </div>
          </div>

          {/* Desktop: links no topo. Mobile: bottom tabs. */}
          <nav
            aria-label="Área de membros"
            className="relative hidden border-t border-line/70 lg:block"
          >
            <div className="mx-auto flex max-w-6xl items-center gap-8 px-8 py-3">
              {memberNav.map((link) => {
                const active = isMemberNavActive(pathname, link);
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
            </div>
          </nav>
        </header>

        <main className="members-main">
          <FadeIn key={pathname}>{children}</FadeIn>
        </main>

        <footer className="members-footer">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-6 md:px-8 lg:py-8">
            <BrandLogo variant="lockup" size="sm" />
            <p className="text-[0.65rem] tracking-[0.2em] text-mute uppercase">
              Área de membros
            </p>
          </div>
        </footer>

        <MembersBottomNav />
      </div>
    </MotionProvider>
  );
}
