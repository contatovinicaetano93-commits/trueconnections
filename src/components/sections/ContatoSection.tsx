import { Mail, MessageCircle, Phone } from "lucide-react";
import { contato } from "@/lib/content";

const icons = [Phone, Mail, MessageCircle] as const;

export function ContatoSection() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-3 font-[family-name:var(--font-display)] text-3xl text-parchment md:text-4xl">
          {contato.title}
        </h1>
        <div className="mb-6 h-px w-10 bg-gold" />
        <p className="text-sm text-mute">{contato.subtitle}</p>
      </div>

      <ul className="space-y-4">
        {contato.channels.map((channel, i) => {
          const Icon = icons[i] ?? MessageCircle;
          return (
            <li key={channel.label}>
              <a
                href={channel.href}
                {...("external" in channel && channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-5 rounded-2xl border border-line bg-card p-5 transition-all hover:border-gold/15 hover:shadow-sm"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-smoke transition-colors group-hover:bg-parchment/[0.04]">
                  <Icon className="h-5 w-5 text-parchment" strokeWidth={1.5} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] tracking-wider text-mute uppercase">
                    {channel.label}
                  </span>
                  <span className="mt-0.5 block text-sm text-parchment">
                    {channel.value}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-center text-xs text-mute">
        <span className="tracking-[0.14em] text-gold uppercase">
          {contato.hoursLabel}
        </span>
        <span className="mx-2 text-mute/40">·</span>
        {contato.hours}
      </p>
    </div>
  );
}
