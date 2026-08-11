import { quote } from "@/lib/content";

const ACCENT_WORD = "pertencimento";

function isAccentToken(token: string) {
  return token.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() === ACCENT_WORD;
}

export function Quote() {
  const parts = quote.text.split(/(\s+)/);

  return (
    <section
      className="quote-signature section-pad relative overflow-hidden border-y border-line bg-smoke/40"
      aria-label="Citação das fundadoras"
    >
      <div className="mesh opacity-40" aria-hidden />
      <div className="quote-signature__inner relative z-10 mx-auto max-w-5xl text-center">
        <span className="quote-knot ornament-knot mx-auto mb-8 block" aria-hidden />

        <blockquote className="display text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.12] tracking-[-0.03em] text-parchment italic">
          <span className="quote-mark" aria-hidden>
            “
          </span>
          {parts.map((part, i) =>
            /^\s+$/.test(part) ? (
              <span key={i}>{part}</span>
            ) : (
              <span
                key={i}
                className={`inline-block${
                  isAccentToken(part) ? " quote-word--accent" : ""
                }`}
              >
                {part}
              </span>
            ),
          )}
          <span className="quote-mark" aria-hidden>
            ”
          </span>
        </blockquote>

        <div
          className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
          aria-hidden
        />

        <p className="mt-8 text-[0.7rem] tracking-[0.22em] text-ember uppercase">
          {quote.attribution}
        </p>
      </div>
    </section>
  );
}
