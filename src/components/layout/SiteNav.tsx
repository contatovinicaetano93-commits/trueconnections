"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, User, X } from "lucide-react";

import { site } from "@/lib/content";

const navItems = [
  { path: "/eventos", label: "Eventos" },
  { path: "/seja-associado", label: "Associados", match: ["/seja-associado"] },
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
    <header className="sticky top-0 z-50 border-b border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_90%)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex-shrink-0" onClick={() => setOpen(false)}>
          <Image
            src={site.logo}
            alt="True Connection"
            width={200}
            height={63}
            className="h-10 w-auto object-contain md:h-11"
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
                    : "text-[hsl(24_8%_34%)]/60 hover:text-[hsl(24_12%_12%)]"
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    className="absolute -bottom-1 right-0 left-0 h-px bg-[hsl(40_40%_52%)]"
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
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_20%_91%/0.25)] transition-colors hover:border-[hsl(40_40%_52%)]/30"
            aria-label="Área de membros"
          >
            <User
              className="h-4 w-4 text-[hsl(24_12%_12%)]/40"
              strokeWidth={1.5}
            />
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
          className="overflow-hidden border-t border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_90%)]/95 md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)}
                className="border-b border-[hsl(32_14%_78%/0.2)] py-2.5 font-[family-name:var(--font-body)] text-sm tracking-wide text-[hsl(24_12%_12%)]/70 transition-colors last:border-0 hover:text-[hsl(24_12%_12%)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
