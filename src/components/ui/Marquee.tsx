"use client";

import { marqueeItems } from "@/lib/content";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section
      className="marquee-hover relative overflow-hidden border-y border-line bg-smoke/35 py-4"
      aria-label="Pilares da comunidade"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent md:w-24" />

      <div className="animate-marquee-slow flex w-max items-center gap-10 will-change-transform">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 whitespace-nowrap text-[0.72rem] tracking-[0.22em] text-mute/70 uppercase"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-gold/70" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
