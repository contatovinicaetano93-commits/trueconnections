import { Briefcase, Search } from "lucide-react";
import { trueAction } from "@/lib/content";

export function TrueActionSection() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(24_12%_12%)]/[0.06]">
          <Briefcase className="h-5 w-5 text-[hsl(24_12%_12%)]" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl text-[hsl(24_12%_12%)]">
            {trueAction.title}
          </h1>
          <p className="font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
            {trueAction.subtitle}
          </p>
        </div>
      </div>

      <p className="mb-6 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]/70">
        {trueAction.body}
      </p>

      <div className="relative mb-6">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[hsl(24_8%_34%)]" />
        <input
          type="search"
          placeholder="Buscar por nome, profissão, área ou cidade..."
          className="w-full rounded-2xl border border-[hsl(32_14%_78%/0.4)] bg-[hsl(38_28%_96%/0.15)] py-3 pr-4 pl-10 font-[family-name:var(--font-body)] text-sm text-[hsl(24_12%_12%)] placeholder:text-[hsl(24_8%_34%)]/50 focus:border-[hsl(24_14%_14%)]/20 focus:ring-1 focus:ring-[hsl(24_14%_14%)]/10 focus:outline-none"
          disabled
          aria-label="Buscar profissionais"
        />
      </div>

      <div className="py-16 text-center">
        <Briefcase
          className="mx-auto mb-4 h-10 w-10 text-[hsl(24_8%_34%)]/20"
          strokeWidth={1.2}
        />
        <p className="font-[family-name:var(--font-body)] text-sm text-[hsl(24_8%_34%)]">
          {trueAction.empty}
        </p>
      </div>
    </div>
  );
}
