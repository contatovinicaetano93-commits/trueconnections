import { Briefcase, Search } from "lucide-react";
import { trueAction } from "@/lib/content";

export function TrueActionSection() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-parchment/[0.06]">
          <Briefcase className="h-5 w-5 text-parchment" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl text-parchment">
            {trueAction.title}
          </h1>
          <p className="text-xs text-mute">{trueAction.subtitle}</p>
        </div>
      </div>

      <p className="mb-6 text-sm leading-relaxed text-mute/80">{trueAction.body}</p>

      <div className="relative mb-6">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-mute" />
        <input
          type="search"
          placeholder="Buscar por nome, profissão, área ou cidade..."
          className="w-full rounded-2xl border border-line bg-card py-3 pr-4 pl-10 text-sm text-parchment placeholder:text-mute/50 focus:border-gold/30 focus:ring-1 focus:ring-gold/10 focus:outline-none"
          disabled
          aria-label="Buscar profissionais"
        />
      </div>

      <div className="py-16 text-center">
        <Briefcase className="mx-auto mb-4 h-10 w-10 text-mute/20" strokeWidth={1.2} />
        <p className="mb-6 text-sm text-mute">Nenhum profissional encontrado.</p>
        <a
          href={trueAction.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-parchment px-6 py-3 text-sm font-medium text-ink transition-all hover:bg-parchment/80"
        >
          {trueAction.cta}
        </a>
      </div>
    </div>
  );
}
