import { quote } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Quote() {
  return (
    <section className="section-pad relative overflow-hidden border-y border-line bg-smoke/40 py-20 md:py-28">
      <div className="mesh opacity-40" aria-hidden />
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="ornament-knot mx-auto mb-8 block" aria-hidden />
          <blockquote className="display text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.1] tracking-[-0.03em] text-parchment italic">
            “{quote.text}”
          </blockquote>
          <p className="mt-8 text-[0.7rem] tracking-[0.22em] text-ember uppercase">
            {quote.attribution}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
