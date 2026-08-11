import { fullBleed } from "@/lib/content";
import { SoftImage } from "@/components/ui/SoftImage";

export function FullBleed() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden md:min-h-[85vh]">
      <div className="absolute inset-0">
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
        <div className="mx-auto w-full max-w-7xl text-ink">
          <p className="text-[0.7rem] font-medium tracking-[0.28em] text-gold-soft uppercase">
            {fullBleed.eyebrow}
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
            {fullBleed.body}
          </p>
          <a
            href={fullBleed.href}
            className="focus-ring link-arrow mt-8 inline-flex rounded-full border border-ink/30 bg-ink/10 px-6 py-3 text-[0.72rem] tracking-[0.16em] text-ink uppercase backdrop-blur-sm transition-colors hover:bg-ink/20"
          >
            {fullBleed.cta}
            <span className="link-arrow__glyph" aria-hidden>
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
