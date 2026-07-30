"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fullBleed } from "@/lib/content";
import { SoftImage } from "@/components/ui/SoftImage";

gsap.registerPlugin(ScrollTrigger);

export function FullBleed() {
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !img.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img.current,
        { scale: 1.12, y: 0 },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.from(".fullbleed-copy", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 65%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[70vh] overflow-hidden md:min-h-[85vh]">
      <div ref={img} className="absolute inset-0 will-change-transform">
        <SoftImage
          src={fullBleed.image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/80 via-deep/45 to-deep/20" />
      </div>

      <div className="section-pad relative z-10 flex min-h-[70vh] items-end py-16 md:min-h-[85vh] md:py-24">
        <div className="fullbleed-copy mx-auto w-full max-w-7xl text-ink">
          <p className="text-[0.7rem] font-medium tracking-[0.28em] text-gold-soft uppercase">
            {fullBleed.eyebrow}
          </p>
          <h2 className="display mt-4 max-w-3xl text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] text-ink">
            {fullBleed.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
            {fullBleed.body}
          </p>
          <a
            href={fullBleed.href}
            className="focus-ring mt-8 inline-flex rounded-full border border-ink/30 bg-ink/10 px-6 py-3 text-[0.72rem] tracking-[0.16em] text-ink uppercase backdrop-blur-sm transition-colors hover:bg-ink/20"
          >
            {fullBleed.cta} →
          </a>
        </div>
      </div>
    </section>
  );
}
