import Image from "next/image";
import Link from "next/link";
import { manifesto } from "@/lib/content";

export function Manifesto() {
  return (
    <div className="text-center">
      <h1 className="mb-3 font-[family-name:var(--font-display)] text-3xl text-parchment md:text-4xl">
        {manifesto.title}
      </h1>
      <div className="mx-auto mb-6 h-px w-12 bg-gold" />

      <div className="mb-8 rounded-2xl bg-smoke/80 p-6 text-left md:p-8">
        <p className="mb-4 text-sm leading-relaxed text-parchment/70">
          {manifesto.lead}
        </p>
        <p className="text-sm leading-relaxed text-parchment/70">
          {manifesto.body}
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-line bg-card p-6 text-left md:p-8">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl text-parchment">
          {manifesto.missionTitle}
        </h2>
        <p className="text-sm leading-relaxed text-parchment/70">
          {manifesto.mission}
        </p>
      </div>

      <div className="mb-8 overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={manifesto.foundersImage}
          alt="Gabriella, Beta e Aline — fundadoras da True Connection"
          width={768}
          height={1024}
          className="aspect-[4/3] w-full object-cover"
          priority
        />
      </div>

      <h2 className="mb-5 font-[family-name:var(--font-display)] text-xl text-parchment">
        {manifesto.foundersLabel}
      </h2>
      <div className="mb-8 space-y-4 text-left">
        {manifesto.founders.map((founder) => (
          <article
            key={founder.name}
            className="rounded-2xl border border-line bg-card p-5"
          >
            <h3 className="mb-2 font-[family-name:var(--font-display)] text-base text-parchment">
              {founder.name}
            </h3>
            <p className="text-xs leading-relaxed text-mute">{founder.bio}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl bg-smoke/80 p-8 md:p-12">
        <p className="mx-auto mb-6 max-w-md font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-parchment/60">
          {manifesto.closing}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
          <Link
            href={manifesto.ctaPrimaryHref}
            className="inline-flex items-center gap-2 rounded-full bg-parchment px-6 py-3 text-sm font-medium text-ink transition-all hover:bg-parchment/80"
          >
            {manifesto.ctaPrimary} →
          </Link>
          <Link
            href={manifesto.ctaSecondaryHref}
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-parchment transition-all hover:bg-smoke"
          >
            {manifesto.ctaSecondary}
          </Link>
        </div>
      </div>
    </div>
  );
}
