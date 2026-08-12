import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { associados } from "@/lib/content";

export function AssociadosSection() {
  return (
    <div className="px-2 py-16 text-center">
      <Image
        src={associados.mark}
        alt="True Connection"
        width={56}
        height={56}
        className="mx-auto mb-4 h-14 w-14 object-contain"
      />
      <h1 className="mb-3 font-[family-name:var(--font-display)] text-2xl text-[hsl(24_12%_12%)]">
        {associados.exclusiveTitle}
      </h1>
      <p className="mx-auto mb-6 max-w-sm font-[family-name:var(--font-body)] text-sm text-[hsl(24_8%_34%)]">
        {associados.body}
      </p>

      <div className="mx-auto mb-6 max-w-xs rounded-2xl bg-[hsl(38_20%_91%/0.25)] p-6">
        <p className="mb-1 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
          {associados.planLabel}
        </p>
        <p className="font-[family-name:var(--font-display)] text-3xl text-[hsl(24_12%_12%)]">
          {associados.planPrice}
          <span className="font-[family-name:var(--font-body)] text-sm text-[hsl(24_8%_34%)]">
            {associados.planPeriod}
          </span>
        </p>
        <p className="mt-2 font-[family-name:var(--font-body)] text-[10px] text-[hsl(24_8%_34%)]">
          {associados.planNote}
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Link
          href={associados.ctaHref}
          className="inline-flex items-center gap-2 rounded-full bg-[hsl(24_14%_14%)] px-8 py-3.5 font-[family-name:var(--font-body)] text-sm font-medium text-[hsl(38_28%_92%)] transition-all hover:bg-[hsl(24_14%_14%)]/80"
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
          className="inline-flex items-center gap-2 rounded-full border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] px-8 py-3.5 font-[family-name:var(--font-body)] text-sm font-medium text-[hsl(24_12%_12%)] transition-all hover:border-[hsl(40_40%_52%)]/40 hover:bg-[hsl(38_20%_91%/0.25)]"
        >
          {associados.membersCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-4 font-[family-name:var(--font-body)] text-[10px] text-[hsl(24_8%_34%)]">
        {associados.cancelNote}
      </p>
    </div>
  );
}
