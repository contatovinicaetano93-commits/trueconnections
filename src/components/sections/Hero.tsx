"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero, site } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const accent = useRef<HTMLSpanElement>(null);
  const mark = useRef<HTMLDivElement>(null);

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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
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
        .from(".hero-mark", { opacity: 0, scale: 0.92, duration: 1.2 }, 0.2);

      gsap.to(mark.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
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
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32"
    >
      <div className="mesh" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--ink)_75%)]"
        aria-hidden
      />

      <div
        ref={mark}
        className="hero-mark pointer-events-none absolute top-[12%] left-1/2 w-[min(52vw,420px)] -translate-x-1/2 opacity-25 md:top-[8%] md:opacity-30"
      >
        <Image
          src={site.mark}
          alt=""
          width={840}
          height={840}
          className="h-auto w-full object-contain mix-blend-screen"
          priority
        />
      </div>

      <div className="section-pad relative z-10 mx-auto w-full max-w-5xl">
        <p className="hero-eyebrow eyebrow mb-6">{hero.eyebrow}</p>
        <h1 className="display max-w-4xl text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95] text-parchment">
          <span className="hero-before block font-light text-parchment/85">
            {hero.headlineBefore}
          </span>
          <span
            ref={accent}
            className="mt-1 inline-flex flex-wrap font-medium text-gold-soft"
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

        <p className="hero-body mt-8 max-w-xl text-base leading-relaxed text-mute md:text-lg">
          {hero.body}
        </p>

        <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton
            href="#manifesto"
            className="rounded-full bg-parchment px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.16em] uppercase text-ink hover:bg-gold-soft"
          >
            Quem somos
          </MagneticButton>
          <MagneticButton
            href={site.whatsapp}
            external
            className="group rounded-full border border-parchment/20 px-7 py-3.5 text-[0.72rem] tracking-[0.16em] uppercase text-parchment/90 hover:border-gold/50 hover:text-gold-soft"
          >
            Fale conosco
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
