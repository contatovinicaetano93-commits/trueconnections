import { BrandLogo } from "@/components/ui/BrandLogo";
import { MemberBackLink } from "@/components/members/MemberBackLink";

export function MemberPageIntro({
  eyebrow,
  title,
  description,
  meta,
  backHref,
  backLabel = "Voltar",
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="max-w-2xl">
      {backHref ? (
        <div className="mb-6">
          <MemberBackLink href={backHref} label={backLabel} />
        </div>
      ) : null}
      <BrandLogo variant="mark" size="xs" className="mb-3 md:mb-4 md:!h-14 md:!w-14" />
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="display text-[clamp(1.85rem,5.5vw,3.35rem)] leading-[1.08] text-parchment">
        {title}
      </h1>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-mute md:mt-4 md:text-[1.05rem]">
        {description}
      </p>
      {meta ? <div className="mt-5">{meta}</div> : null}
    </header>
  );
}
