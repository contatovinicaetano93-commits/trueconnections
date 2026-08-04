"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SignOutButton } from "@/components/members/SignOutButton";
import { adminPrimaryNav, adminSecondaryNav } from "@/components/admin/nav";

function NavLinks({
  onNavigate,
  compact = false,
}: {
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      <p className="px-3 pb-2 text-[0.62rem] uppercase tracking-[0.22em] text-mute/70">
        Conteúdo
      </p>
      <nav className="flex flex-col gap-1">
        {adminPrimaryNav.map(({ href, label, icon: Icon, hint }) => {
          const active =
            href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "border border-gold/40 bg-gold/10 text-gold"
                  : "border border-transparent text-parchment/85 hover:bg-smoke/70"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
              <span className="min-w-0">
                <span className="block font-medium">{label}</span>
                {!compact && hint ? (
                  <span className="block truncate text-[0.7rem] text-mute">
                    {hint}
                  </span>
                ) : null}
              </span>
            </Link>
          );
        })}
      </nav>

      <p className="mt-6 px-3 pb-2 text-[0.62rem] uppercase tracking-[0.22em] text-mute/70">
        Pessoas
      </p>
      <nav className="flex flex-col gap-1">
        {adminSecondaryNav.map(({ href, label, icon: Icon, hint }) => {
          const active =
            href !== "/associados" && pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "border border-gold/40 bg-gold/10 text-gold"
                  : "border border-transparent text-parchment/85 hover:bg-smoke/70"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
              <span className="min-w-0">
                <span className="block font-medium">{label}</span>
                {hint ? (
                  <span className="block truncate text-[0.7rem] text-mute">
                    {hint}
                  </span>
                ) : null}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export function AdminShell({
  name,
  email,
  children,
}: {
  name: string;
  email?: string | null;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink text-parchment">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="mesh mesh--strong" aria-hidden />
      </div>

      <div className="relative flex min-h-screen">
        <aside className="sticky top-0 hidden h-dvh w-[16.5rem] shrink-0 flex-col border-r border-line bg-smoke/55 backdrop-blur-xl lg:flex">
          <div className="border-b border-line px-5 py-6">
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-gold">
              True Connection
            </p>
            <p className="display mt-1 text-xl text-parchment">Painel admin</p>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-5">
            <NavLinks />
          </div>

          <div className="border-t border-line px-4 py-4">
            <p className="truncate text-sm font-medium text-parchment">{name}</p>
            {email ? (
              <p className="truncate text-xs text-mute">{email}</p>
            ) : null}
            <div className="mt-3">
              <SignOutButton />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-ink/90 px-4 py-3 backdrop-blur-xl lg:hidden">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">
                Admin
              </p>
              <p className="text-sm font-medium text-parchment">{name}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line"
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </header>

          {open ? (
            <div className="border-b border-line bg-smoke/80 px-3 py-4 lg:hidden">
              <NavLinks compact onNavigate={() => setOpen(false)} />
              <div className="mt-4 border-t border-line pt-3">
                <SignOutButton />
              </div>
            </div>
          ) : null}

          <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 md:px-8 md:py-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
