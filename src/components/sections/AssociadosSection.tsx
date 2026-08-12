import Image from "next/image";
import Link from "next/link";
import { associados } from "@/lib/content";

export function AssociadosSection() {
  return (
    <div className="px-2 py-8 text-center md:py-12">
      <Image
        src={associados.mark}
        alt="True Connection"
        width={56}
        height={56}
        className="mx-auto mb-4 h-14 w-14 object-contain"
      />
      <h1 className="mb-3 font-[family-name:var(--font-display)] text-2xl text-parchment">
        {associados.exclusiveTitle}
      </h1>
      <p className="mx-auto mb-6 max-w-sm text-sm text-mute">{associados.body}</p>

      <div className="mx-auto mb-6 max-w-xs rounded-2xl bg-smoke/80 p-6">
        <p className="mb-1 text-xs text-mute">{associados.planLabel}</p>
        <p className="font-[family-name:var(--font-display)] text-3xl text-parchment">
          {associados.planPrice}
          <span className="text-sm text-mute">{associados.planPeriod}</span>
        </p>
        <p className="mt-2 text-[10px] text-mute">{associados.planNote}</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Link
          href={associados.ctaHref}
          className="inline-flex items-center gap-2 rounded-full bg-parchment px-8 py-3.5 text-sm font-medium text-ink transition-all hover:bg-parchment/80"
        >
          <Image
            src={associados.mark}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
          {associados.cta}
        </Link>

        <Link
          href={associados.membersHref}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-8 py-3.5 text-sm font-medium text-parchment transition-all hover:border-gold/40 hover:bg-smoke"
        >
          {associados.membersCta}
        </Link>
      </div>

      <p className="mt-4 text-[10px] text-mute">{associados.cancelNote}</p>
    </div>
  );
}
