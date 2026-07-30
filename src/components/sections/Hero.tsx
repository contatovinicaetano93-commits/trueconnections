"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { hero, site } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SoftImage } from "@/components/ui/SoftImage";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const accent = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = accent.current?.querySelectorAll(".letter");
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const velocity = gsap.utils.clamp(-18, 18, (y - lastY) * 0.35);
      lastY = y;
      if (letters) {
        gsap.to(letters, {
          y: velocity,
          skewX: velocity * 0.15,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });
      tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.7 })
        .from(".hero-before", { opacity: 0, y: 28, duration: 0.85 }, "-=0.35")
        .from(
          letters ?? [],
          {
            opacity: 0,
            y: 48,
            rotateX: -55,
            stagger: 0.045,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.55",
        )
        .from(".hero-body", { opacity: 0, y: 24, duration: 0.9 }, "-=0.45")
        .from(".hero-cta", { opacity: 0, y: 18, duration: 0.7 }, "-=0.55")
        .from(".hero-visual", { opacity: 0, y: 28, duration: 1 }, "-=0.85");
    }, el);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  const accentLetters = hero.headlineAccent.split("");

  return (
    <section
      id="topo"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-28 md:pb-20 md:pt-32"
    >
      <div className="mesh" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--ink)_80%)]"
        aria-hidden
      />

      <div className="section-pad relative z-10 mx-auto grid w-full max-w-7xl items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="text-center md:text-left">
          <p className="hero-eyebrow eyebrow mb-6">{hero.eyebrow}</p>
          <h1 className="display mx-auto max-w-4xl text-[clamp(2.6rem,7.5vw,5.8rem)] leading-[0.95] text-parchment md:mx-0">
            <span className="hero-before block font-light text-parchment/90">
              {hero.headlineBefore}
            </span>
            <span
              ref={accent}
              className="mt-1 inline-flex flex-wrap justify-center font-medium text-gold md:justify-start"
              aria-label={hero.headlineAccent}
            >
              {accentLetters.map((char, i) => (
                <span
                  key={`${char}-${i}`}
                  className="letter inline-block origin-bottom will-change-transform"
                  style={{ perspective: 600 }}
                >
                  {char}
                </span>
              ))}
              <span className="text-parchment">.</span>
            </span>
          </h1>

          <p className="hero-body mx-auto mt-7 max-w-xl text-base leading-relaxed text-mute/80 md:mx-0 md:text-lg">
            {hero.body}
          </p>

          <div className="hero-cta mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <MagneticButton
              href="#manifesto"
              className="rounded-full bg-gold px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase text-ink hover:bg-gold-soft"
            >
              Quem somos
            </MagneticButton>
            <MagneticButton
              href={site.whatsapp}
              external
              className="group rounded-full border border-parchment/15 px-7 py-3.5 text-[0.72rem] tracking-[0.16em] uppercase text-parchment/70 hover:border-gold/45 hover:text-gold"
            >
              Fale conosco
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </MagneticButton>
          </div>

          <a
            href="#portais"
            className="hero-cta mt-12 inline-flex flex-col items-center gap-2 text-[0.65rem] tracking-[0.24em] text-mute/55 uppercase md:items-start"
          >
            Scroll
            <span className="animate-nudge text-gold" aria-hidden>
              ↓
            </span>
          </a>
        </div>

        <div className="hero-visual relative mx-auto hidden w-full max-w-md lg:mx-0 lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ash">
            <SoftImage
              src={site.foundersImage}
              alt="Fundadoras da True Connection"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 0px, 420px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/55 via-transparent to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-5 text-sm text-ink/95">
              Gabriella, Beta e Aline — o chamado por trás da True
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
