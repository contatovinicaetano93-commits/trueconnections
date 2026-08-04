"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((item) => item.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled || open
          ? "border-b border-line bg-ink/92 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="section-pad mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 md:h-20">
        <a href="#topo" className="focus-ring group flex items-center gap-3" onClick={close}>
          <span className="text-[0.7rem] font-medium tracking-[0.22em] uppercase text-parchment/90">
            True Connection
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`focus-ring group relative text-[0.68rem] tracking-[0.22em] uppercase transition-colors ${
                  isActive ? "text-parchment" : "text-mute/60 hover:text-parchment"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  aria-hidden
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <MagneticButton
            href="/associados/login"
            className="hidden rounded-full border border-line px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase text-parchment/80 hover:border-gold/50 hover:text-gold sm:inline-flex"
          >
            Entrar
          </MagneticButton>
          <MagneticButton
            href="/associados/cadastro"
            className="hidden rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase text-gold hover:border-gold/70 hover:bg-gold/15 md:inline-flex"
          >
            Cadastrar
          </MagneticButton>
          <MagneticButton
            href={site.whatsapp}
            external
            className="hidden rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase text-gold hover:border-gold/70 hover:bg-gold/15 md:inline-flex"
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
        <nav className="section-pad mx-auto flex max-w-7xl flex-col gap-1 py-5" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className={`focus-ring rounded-xl px-4 py-3 text-[0.75rem] tracking-[0.2em] uppercase transition-colors ${
                active === item.href
                  ? "bg-gold/10 text-gold"
                  : "text-parchment/80 hover:bg-smoke"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/associados/login"
            onClick={close}
            className="focus-ring mt-3 rounded-full border border-gold/40 px-5 py-3 text-center text-[0.72rem] font-medium tracking-[0.16em] uppercase text-gold"
          >
            Entrar
          </a>
          <a
            href="/associados/cadastro"
            onClick={close}
            className="focus-ring mt-2 rounded-full bg-gold px-5 py-3 text-center text-[0.72rem] font-medium tracking-[0.16em] uppercase text-ink"
          >
            Criar cadastro
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="focus-ring mt-2 rounded-full border border-line px-5 py-3 text-center text-[0.72rem] font-medium tracking-[0.16em] uppercase text-parchment/85"
          >
            Falar no WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
