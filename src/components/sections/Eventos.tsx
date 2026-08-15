import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import type { EventoItem } from "@/lib/eventos";

type EventosProps = {
  items: EventoItem[];
};

export function Eventos({ items }: EventosProps) {
  return (
    <div className="py-2 md:py-6">
      <div className="mb-10">
        <h1 className="mb-3 font-[family-name:var(--font-display)] text-3xl text-[hsl(24_12%_12%)] md:text-4xl">
          Próximos Eventos
        </h1>
        <div className="mb-6 h-px w-10 bg-[hsl(40_40%_52%)]" />
        <p className="font-[family-name:var(--font-body)] text-sm text-[hsl(24_8%_34%)]">
          Encontros, shows e experiências da True Connections.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-8 text-center">
          <p className="font-[family-name:var(--font-body)] text-sm text-[hsl(24_8%_34%)]">
            Nenhum evento programado no momento. Volte em breve!
          </p>
        </div>
      ) : (
        <ul className="space-y-5">
          {items.map((item) => (
            <li key={item.id}>
              <article className="overflow-hidden rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)]">
                {item.imageUrl ? (
                  <div className="relative aspect-[16/9] overflow-hidden bg-[hsl(38_20%_91%/0.25)]">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                ) : null}
                <div className="p-5 md:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[hsl(38_20%_91%/0.5)] px-2.5 py-0.5 font-[family-name:var(--font-body)] text-[0.65rem] tracking-[0.12em] text-[hsl(24_14%_14%)] uppercase">
                      {item.status}
                    </span>
                    {item.price ? (
                      <span className="font-[family-name:var(--font-display)] text-sm text-[hsl(40_28%_42%)]">
                        {item.price}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl text-[hsl(24_12%_12%)] md:text-2xl">
                    {item.title}
                  </h2>
                  <div className="mt-3 space-y-1.5">
                    <p className="flex items-start gap-2 font-[family-name:var(--font-body)] text-sm text-[hsl(24_8%_34%)]">
                      <CalendarDays
                        className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(40_40%_52%)]"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span>
                        {item.dateLabel}
                        {item.timeLabel ? ` · ${item.timeLabel}` : ""}
                      </span>
                    </p>
                    <p className="flex items-start gap-2 font-[family-name:var(--font-body)] text-sm text-[hsl(24_8%_34%)]">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(40_40%_52%)]"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span>{item.place}</span>
                    </p>
                  </div>
                  {item.description ? (
                    <p className="mt-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
