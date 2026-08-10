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
      <BrandLogo variant="mark" size="sm" className="mb-4" />
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="display text-[clamp(2.1rem,4.5vw,3.35rem)] leading-[1.05] text-parchment">
        {title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-mute md:text-[1.05rem]">
        {description}
      </p>
      {meta ? <div className="mt-5">{meta}</div> : null}
    </header>
  );
}
