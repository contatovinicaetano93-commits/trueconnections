import { ArrowUpRight, BookOpen, Heart, Users } from "lucide-react";
import { cienciaFe } from "@/lib/content";
import { ExperienceCta } from "@/components/ui/ExperienceCta";

const pathIcons = [BookOpen, Heart, Users] as const;

export function CienciaFeStory() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 font-[family-name:var(--font-display)] text-2xl text-[hsl(24_12%_12%)]">
          {cienciaFe.title}
        </h1>
        <p className="font-[family-name:var(--font-body)] text-sm text-[hsl(24_8%_34%)]">
          {cienciaFe.subtitle}
        </p>
      </div>

      <div className="space-y-6">
        <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]">
          {cienciaFe.intro}
        </p>

        <div className="space-y-4 rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-5 md:p-6">
          {cienciaFe.story.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]"
            >
              {paragraph}
            </p>
          ))}
          <p className="font-[family-name:var(--font-display)] text-base text-[hsl(40_40%_52%)]">
            {cienciaFe.instituteLabel}
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-[family-name:var(--font-display)] text-lg text-[hsl(24_12%_12%)]">
            {cienciaFe.journeyTitle}
          </h2>
          <p className="mb-5 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
            {cienciaFe.journeySubtitle}
          </p>

          <div className="space-y-4">
            {cienciaFe.paths.map((path, index) => {
              const Icon = pathIcons[index] ?? BookOpen;
              return (
                <article
                  key={path.step}
                  className="rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-5"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(40_40%_52%/0.08)]">
                      <Icon
                        className="h-5 w-5 text-[hsl(40_40%_52%)]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[hsl(40_40%_52%)]/60">
                          {path.step}
                        </span>
                        <p className="font-[family-name:var(--font-body)] text-[10px] tracking-wider text-[hsl(24_8%_34%)] uppercase">
                          {path.subtitle}
                        </p>
                      </div>
                      <h3 className="mt-0.5 font-[family-name:var(--font-display)] text-base text-[hsl(24_12%_12%)]">
                        {path.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mb-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]">
                    {path.body}
                  </p>
                  {"href" in path && path.external ? (
                    <a
                      href={path.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-primary"
                    >
                      {path.cta}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <ExperienceCta
                      label={path.cta}
                      message={"message" in path ? path.message : undefined}
                      phone={"phone" in path ? path.phone : undefined}
                    />
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-[hsl(38_20%_91%/0.35)] p-5">
          <h3 className="mb-4 text-center font-[family-name:var(--font-body)] text-xs tracking-wider text-[hsl(40_40%_52%)] uppercase">
            {cienciaFe.protocolTitle}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {cienciaFe.protocolSteps.map((step) => (
              <div key={step.n} className="text-center">
                <p className="mb-1 font-mono text-lg text-[hsl(40_40%_52%)]/50">
                  {step.n}
                </p>
                <p className="mb-1 font-[family-name:var(--font-display)] text-sm text-[hsl(24_12%_12%)]">
                  {step.title}
                </p>
                <p className="font-[family-name:var(--font-body)] text-[10px] leading-tight text-[hsl(24_8%_34%)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
