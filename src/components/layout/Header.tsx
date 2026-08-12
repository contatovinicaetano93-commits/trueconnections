"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/content";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const isActive = (href: string) =>
    !href.startsWith("http") &&
    (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled || open
          ? "border-b border-line bg-ink/92 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="section-pad mx-auto flex h-[5.5rem] max-w-7xl items-center justify-between gap-6 md:h-28">
        <Link
          href="/"
          className="focus-ring group flex flex-col items-start gap-0 leading-none"
          onClick={close}
        >
          <BrandLogo variant="mark" size="md" priority className="-mb-1" />
          <span className="relative z-[1] text-[0.6rem] font-medium tracking-[0.22em] uppercase text-parchment/90 md:text-[0.65rem]">
            {site.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Principal"
        >
          {nav.map((item) => {
            const active = isActive(item.href);
            const className = `focus-ring group relative text-[0.68rem] tracking-[0.22em] uppercase transition-colors ${
              active ? "text-parchment" : "text-mute/60 hover:text-parchment"
            }`;
            const underline = (
              <span
                className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ease-out ${
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
                aria-hidden
              />
            );

            if ("external" in item && item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {item.label}
                  {underline}
                </a>
              );
            }

            return (
              <Link key={item.href} href={item.href} className={className}>
                {item.label}
                {underline}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <MagneticButton
            href="/associados/login"
            className="hidden rounded-full bg-gold px-4 py-2.5 text-[0.68rem] font-medium tracking-[0.16em] uppercase text-ink hover:bg-gold-soft sm:inline-flex"
          >
            Área de membros
          </MagneticButton>
          <MagneticButton
            href="/contato"
            className="hidden rounded-full border border-line px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase text-parchment/80 hover:border-gold/50 hover:text-gold md:inline-flex"
          >
            Contato
          </MagneticButton>

          <button
            type="button"
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Fechar" : "Menu"}</span>
            <span className="relative block h-3.5 w-4" aria-hidden>
              <span
                className={`absolute left-0 h-px w-full bg-parchment transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 h-px w-full bg-parchment transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-parchment transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-line bg-ink transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="section-pad mx-auto flex max-w-7xl flex-col gap-1 py-5"
          aria-label="Mobile"
        >
          {nav.map((item) => {
            const active = isActive(item.href);
            const className = `focus-ring rounded-xl px-4 py-3 text-[0.75rem] tracking-[0.2em] uppercase transition-colors ${
              active
                ? "bg-gold/10 text-gold"
                : "text-parchment/80 hover:bg-smoke"
            }`;

            if ("external" in item && item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={className}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/associados/login"
            onClick={close}
            className="focus-ring mt-3 rounded-full bg-gold px-5 py-3 text-center text-[0.72rem] font-medium tracking-[0.16em] uppercase text-ink"
          >
            Área de membros
          </Link>
          <Link
            href="/contato"
            onClick={close}
            className="focus-ring mt-2 rounded-full border border-line px-5 py-3 text-center text-[0.72rem] font-medium tracking-[0.16em] uppercase text-parchment"
          >
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}
