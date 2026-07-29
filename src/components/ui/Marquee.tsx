"use client";

import { marqueeItems } from "@/lib/content";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div
      className="marquee-hover relative overflow-hidden border-b border-line bg-smoke/40 py-3.5"
      aria-label="Pilares da comunidade"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[color-mix(in_srgb,var(--smoke)_90%,white)] to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[color-mix(in_srgb,var(--smoke)_90%,white)] to-transparent md:w-20" />

      <div className="animate-marquee-slow flex w-max items-center gap-10 will-change-transform">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 whitespace-nowrap text-[0.68rem] tracking-[0.22em] text-mute/65 uppercase"
          >
            {item}
            <span className="h-1 w-1 shrink-0 rounded-full bg-gold/70" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
