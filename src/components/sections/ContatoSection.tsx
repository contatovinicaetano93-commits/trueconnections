import { contato } from "@/lib/content";
import { Mail, MessageCircle, Phone } from "lucide-react";

const icons = [Phone, Mail, MessageCircle] as const;

export function ContatoSection() {
  return (
    <div>
      <h1 className="mb-3 font-[family-name:var(--font-display)] text-3xl text-parchment md:text-4xl">
        {contato.title}
      </h1>
      <div className="mb-6 h-px w-10 bg-gold" />
      <p className="mb-10 text-sm text-mute">{contato.subtitle}</p>

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
                className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5 shadow-sm transition-all hover:border-gold/30 hover:shadow-md"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-[0.65rem] tracking-[0.16em] text-mute uppercase">
                    {channel.label}
                  </span>
                  <span className="mt-1 block text-base text-parchment">
                    {channel.value}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-sm text-mute">
        <span className="tracking-[0.14em] text-gold uppercase">
          {contato.hoursLabel}
        </span>
        <span className="mx-2 text-mute/40">·</span>
        {contato.hours}
      </p>
    </div>
  );
}
