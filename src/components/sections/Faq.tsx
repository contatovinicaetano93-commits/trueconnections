"use client";

import { useState } from "react";
import { faq } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section-pad border-t border-line py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-4">Dúvidas</p>
          <h2 className="display text-[clamp(2.2rem,4vw,3.4rem)] text-parchment">
            Perguntas que chegam no WhatsApp
          </h2>
        </Reveal>

        <div className="divide-y divide-line border-y border-line">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <button
                  type="button"
                  className="focus-ring flex w-full items-start justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>
                    <span className="display block text-xl text-parchment md:text-2xl">
                      {item.q}
                    </span>
                    <span
                      className={`mt-3 block overflow-hidden text-sm leading-relaxed text-mute transition-[max-height,opacity] duration-300 ${
                        isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.a}
                    </span>
                  </span>
                  <span
                    className={`mt-1 shrink-0 text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
