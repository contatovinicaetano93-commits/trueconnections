import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function MemberEmptyState({
  title,
  body,
  actionHref,
  actionLabel,
}: {
  title: string;
  body: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="border border-dashed border-line bg-smoke/40 px-6 py-14 text-center md:px-10">
      <div className="mb-5 flex justify-center">
        <BrandLogo variant="mark" size="md" />
      </div>
      <p className="display text-2xl text-parchment md:text-3xl">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mute md:text-[0.95rem]">
        {body}
      </p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-7 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-deep transition hover:bg-gold-soft"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
