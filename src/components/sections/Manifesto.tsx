import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { manifesto } from "@/lib/content";

export function Manifesto() {
  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="mb-3 font-[family-name:var(--font-display)] text-3xl text-[hsl(24_12%_12%)] md:text-4xl">
          {manifesto.title}
        </h1>
        <div className="mx-auto mb-6 h-px w-12 bg-[hsl(40_40%_52%)]" />
      </div>

      <div className="mb-10 rounded-2xl bg-[hsl(38_20%_91%/0.25)] p-6 md:p-8">
        <p className="mb-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_12%_12%)]/70">
          {manifesto.lead}
        </p>
        <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_12%_12%)]/70">
          {manifesto.body}
        </p>
      </div>

      <div className="mb-10 rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-6 md:p-8">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl text-[hsl(24_12%_12%)]">
          {manifesto.missionTitle}
        </h2>
        <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_12%_12%)]/70">
          {manifesto.mission}
        </p>
      </div>

      <div className="mb-10 overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={manifesto.foundersImage}
          alt="Gabriella, Beta e Aline — fundadoras da True Connection"
          width={768}
          height={576}
          className="aspect-[4/3] w-full object-cover"
          priority
        />
      </div>

      <div className="mb-10">
        <h2 className="mb-5 text-center font-[family-name:var(--font-display)] text-xl text-[hsl(24_12%_12%)]">
          {manifesto.foundersLabel}
        </h2>
        <div className="space-y-4">
          {manifesto.founders.map((founder) => (
            <article
              key={founder.name}
              className="rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-5"
            >
              <h3 className="mb-2 font-[family-name:var(--font-display)] text-base text-[hsl(24_12%_12%)]">
                {founder.name}
              </h3>
              <p className="font-[family-name:var(--font-body)] text-xs leading-relaxed text-[hsl(24_8%_34%)]">
                {founder.bio}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[hsl(38_20%_91%/0.25)] p-8 text-center md:p-12">
        <p className="mx-auto mb-6 max-w-md font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-[hsl(24_12%_12%)]/60">
          {manifesto.closing}
        </p>
        <div className="flex flex-col justify-center gap-3 md:flex-row">
          <Link
            href={manifesto.ctaPrimaryHref}
            className="cta-primary cta-primary--pill"
          >
            {manifesto.ctaPrimary} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={manifesto.ctaSecondaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[hsl(32_14%_78%/0.3)] px-6 py-3 font-[family-name:var(--font-body)] text-sm font-medium text-[hsl(24_12%_12%)] transition-all hover:bg-[hsl(38_20%_91%/0.25)]"
          >
            {manifesto.ctaSecondary}
          </Link>
        </div>
      </div>
    </div>
  );
}
