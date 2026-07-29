"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function PathTimeline() {
  const root = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = root.current;
    const line = path.current;
    if (!el || !line) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.strokeDashoffset = "0";
      return;
    }

    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });

      gsap.from(".journey-node", {
        opacity: 0,
        y: 18,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="section-pad border-t border-line py-20 md:py-28"
      aria-label="Caminho na True"
    >
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow mb-4">Caminho</p>
        <h2 className="display max-w-2xl text-[clamp(2rem,4vw,3.2rem)] text-parchment">
          Do encontro ao pertencimento
        </h2>

        <div className="relative mt-14">
          <svg
            className="pointer-events-none absolute top-[1.15rem] left-0 hidden h-8 w-full md:block"
            viewBox="0 0 1000 32"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              ref={path}
              d="M 40 16 C 220 16, 280 16, 360 16 S 560 16, 640 16 S 820 16, 960 16"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>

          <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
            {journey.map((step, i) => (
              <li key={step.href} className="journey-node relative">
                <a href={step.href} className="focus-ring group block">
                  <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-ink text-[0.65rem] tracking-[0.12em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display block text-2xl text-parchment transition-colors group-hover:text-gold">
                    {step.label}
                  </span>
                  <span className="mt-2 inline-block text-sm text-mute/70 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
