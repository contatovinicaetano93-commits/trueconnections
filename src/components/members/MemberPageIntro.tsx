import Image from "next/image";
import { MemberBackLink } from "@/components/members/MemberBackLink";
import { site } from "@/lib/content";

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
      <Image
        src={site.logo}
        alt=""
        width={120}
        height={38}
        className="mb-4 h-8 w-auto object-contain opacity-90 md:h-10"
      />
      <p className="mb-3 font-[family-name:var(--font-body)] text-[0.68rem] font-semibold tracking-[0.18em] text-[hsl(40_40%_52%)] uppercase">
        {eyebrow}
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,5.5vw,3rem)] leading-[1.08] text-[hsl(24_12%_12%)]">
        {title}
      </h1>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-[hsl(24_8%_34%)] md:mt-4 md:text-[1.05rem]">
        {description}
      </p>
      {meta ? <div className="mt-5">{meta}</div> : null}
    </header>
  );
}
