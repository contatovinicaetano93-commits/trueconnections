"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-line bg-ink/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="section-pad mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 md:h-20">
        <a href="#topo" className="focus-ring group flex items-center gap-3">
          <Image
            src={site.logo}
            alt={site.name}
            width={40}
            height={40}
            className="h-9 w-9 object-contain opacity-90 transition-opacity group-hover:opacity-100 md:h-10 md:w-10"
            priority
          />
          <span className="hidden text-[0.7rem] font-medium tracking-[0.22em] uppercase text-parchment/85 sm:block">
            True Connection
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring group relative text-[0.68rem] tracking-[0.22em] uppercase text-mute/60 transition-colors hover:text-parchment"
            >
              {item.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100"
                aria-hidden
              />
            </a>
          ))}
        </nav>

        <MagneticButton
          href={site.whatsapp}
          external
          className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase text-gold hover:border-gold/70 hover:bg-gold/15"
        >
          Contato
        </MagneticButton>
      </div>
    </header>
  );
}
