import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/content";

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
    <div className="rounded-2xl border border-dashed border-[hsl(32_14%_78%/0.45)] bg-white/60 px-6 py-14 text-center md:px-10">
      <div className="mb-5 flex justify-center">
        <Image
          src={site.logo}
          alt=""
          width={140}
          height={44}
          className="h-10 w-auto object-contain opacity-80"
        />
      </div>
      <p className="font-[family-name:var(--font-display)] text-2xl text-[hsl(24_12%_12%)] md:text-3xl">
        {title}
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[hsl(24_8%_34%)] md:text-[0.95rem]">
        {body}
      </p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-7 inline-flex rounded-xl bg-[hsl(24_14%_14%)] px-6 py-3 text-sm font-semibold tracking-wide text-[hsl(38_28%_92%)] transition hover:bg-[hsl(24_14%_14%)]/90"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
