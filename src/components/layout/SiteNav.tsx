"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, User, X } from "lucide-react";

const LOGO = "/images/logo-base44.jpeg";

const navItems = [
  { path: "/eventos", label: "Eventos" },
  { path: "/seja-associado", label: "Associados" },
  { path: "/impacto", label: "Impacto" },
  { path: "/loja", label: "Loja" },
  { path: "/quem-somos", label: "Manifesto" },
  { path: "/contato", label: "Contato" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.04] bg-[#F5F0E6]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex-shrink-0" onClick={() => setOpen(false)}>
          <Image
            src={LOGO}
            alt="True Connection"
            width={120}
            height={28}
            className="h-7 w-auto object-contain"
            style={{ mixBlendMode: "multiply" }}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative font-[family-name:var(--font-body)] text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                  active
                    ? "text-[hsl(24_12%_12%)]"
                    : "text-[hsl(24_12%_12%)]/60 hover:text-[hsl(24_12%_12%)]"
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[hsl(40_40%_52%)]"
                    aria-hidden
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/associados/login"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white/40 transition-colors hover:border-[hsl(40_40%_52%)]/30"
            aria-label="Perfil / área de membros"
          >
            <User className="h-4 w-4 text-[hsl(24_12%_12%)]/40" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-[hsl(24_12%_12%)] md:hidden"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="border-t border-black/[0.04] bg-[#F5F0E6] px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-[12px] tracking-[0.15em] uppercase ${
                    isActive(item.path)
                      ? "bg-[hsl(40_40%_52%)]/10 text-[hsl(40_40%_52%)]"
                      : "text-[hsl(24_12%_12%)]/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
