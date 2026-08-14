"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MembersBottomNav } from "@/components/members/MembersBottomNav";
import { isMemberNavActive, memberNav } from "@/components/members/nav";
import { SignOutButton } from "@/components/members/SignOutButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/lib/content";

function firstName(fullName: string) {
  const part = fullName.trim().split(/\s+/)[0];
  return part || fullName;
}

export function MembersShell({
  name,
  role,
  children,
  hubLayout = false,
}: {
  name: string;
  role?: string | null;
  children: React.ReactNode;
  hubLayout?: boolean;
}) {
  const pathname = usePathname();
  const isAdmin = role === "admin";
  const greeting = firstName(name);

  return (
    <MotionProvider>
      <div className="flex min-h-screen flex-col bg-[hsl(38_28%_90%)] text-[hsl(24_12%_12%)]">
        <header className="sticky top-0 z-40 border-b border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_90%)]/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 md:px-8">
            <Link
              href="/associados"
              className="flex-shrink-0 transition hover:opacity-90"
              aria-label="True Connection — área de membros"
            >
              <Image
                src={site.logo}
                alt="True Connection"
                width={200}
                height={63}
                className="h-10 w-auto object-contain md:h-12"
                priority
              />
            </Link>

            <nav
              aria-label="Área de membros"
              className="hidden items-center gap-6 lg:flex"
            >
              {!hubLayout
                ? memberNav.map((link) => {
                    const active = isMemberNavActive(pathname, link);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`relative font-[family-name:var(--font-body)] text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                          active
                            ? "text-[hsl(24_12%_12%)]"
                            : "text-[hsl(24_8%_34%)]/60 hover:text-[hsl(24_12%_12%)]"
                        }`}
                      >
                        {link.label}
                        {active ? (
                          <span
                            className="absolute -bottom-1 right-0 left-0 h-px bg-[hsl(40_40%_52%)]"
                            aria-hidden
                          />
                        ) : null}
                      </Link>
                    );
                  })
                : null}
            </nav>

            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <p className="hidden truncate text-sm text-[hsl(24_8%_34%)] sm:block">
                Olá,{" "}
                <span className="font-medium text-[hsl(24_12%_12%)]">
                  {greeting}
                </span>
              </p>
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="rounded-full border border-[hsl(40_40%_52%)]/35 bg-[hsl(40_40%_52%)]/10 px-3 py-1.5 text-[0.65rem] font-medium tracking-wide text-[hsl(40_40%_52%)] transition hover:border-[hsl(40_40%_52%)]/60"
                >
                  Admin
                </Link>
              ) : null}
              <SignOutButton />
            </div>
          </div>
        </header>

        <main
          className={`mx-auto w-full flex-1 px-4 py-8 md:px-6 md:py-10 ${
            hubLayout
              ? "max-w-2xl pb-10"
              : "max-w-3xl pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] lg:max-w-4xl lg:pb-10"
          }`}
        >
          <FadeIn key={pathname}>{children}</FadeIn>
        </main>

        {!hubLayout ? (
          <footer className="hidden border-t border-[hsl(32_14%_78%/0.3)] pb-8 pt-6 text-center lg:block">
            <Image
              src={site.logo}
              alt=""
              width={160}
              height={50}
              className="mx-auto h-10 w-auto object-contain opacity-80"
            />
            <p className="mt-2 font-[family-name:var(--font-body)] text-[0.65rem] tracking-[0.2em] text-[hsl(24_8%_34%)] uppercase">
              Área de membros
            </p>
          </footer>
        ) : null}

        {!hubLayout ? <MembersBottomNav /> : null}
      </div>
    </MotionProvider>
  );
}
