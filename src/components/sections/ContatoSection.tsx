import { Mail, MessageCircle, Phone } from "lucide-react";
import { contato } from "@/lib/content";

const icons = [Phone, Mail, MessageCircle] as const;

export function ContatoSection() {
  return (
    <div className="py-2 md:py-6">
      <div className="mb-10">
        <h1 className="mb-3 font-[family-name:var(--font-display)] text-3xl text-[hsl(24_12%_12%)] md:text-4xl">
          {contato.title}
        </h1>
        <div className="mb-6 h-px w-10 bg-[hsl(40_40%_52%)]" />
        <p className="font-[family-name:var(--font-body)] text-sm text-[hsl(24_8%_34%)]">
          {contato.subtitle}
        </p>
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
                className="group flex items-center gap-5 rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-5 transition-all hover:border-[hsl(24_14%_14%)]/15 hover:shadow-sm"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(38_20%_91%/0.25)] transition-colors group-hover:bg-[hsl(24_14%_14%/0.04)]">
                  <Icon
                    className="h-5 w-5 text-[hsl(24_14%_14%)]"
                    strokeWidth={1.5}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="mb-0.5 block font-[family-name:var(--font-display)] text-base text-[hsl(24_12%_12%)]">
                    {channel.label}
                  </span>
                  <span className="block font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
                    {channel.value}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-center font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
        {contato.hoursLabel}: {contato.hours}
      </p>
    </div>
  );
}
