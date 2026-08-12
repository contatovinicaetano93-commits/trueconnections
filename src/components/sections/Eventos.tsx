import { Calendar, MapPin } from "lucide-react";
import { eventos } from "@/lib/content";

export function Eventos() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 font-[family-name:var(--font-display)] text-2xl text-[hsl(24_12%_12%)]">
          {eventos.title}
        </h1>
        <p className="font-[family-name:var(--font-body)] text-sm text-[hsl(24_8%_34%)]">
          {eventos.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {eventos.items.map((item) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-5 transition-all hover:border-[hsl(40_40%_52%)]/15 hover:shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-[hsl(38_20%_91%/0.25)] text-center">
                <Calendar
                  className="h-5 w-5 text-[hsl(24_8%_34%)]/30"
                  strokeWidth={1.4}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 font-[family-name:var(--font-body)] text-[10px] tracking-wider text-[hsl(40_40%_52%)] uppercase">
                  {item.status}
                </p>
                <h3 className="mb-1 font-[family-name:var(--font-display)] text-base text-[hsl(24_12%_12%)]">
                  {item.title}
                </h3>
                <p className="flex items-center gap-1 font-[family-name:var(--font-body)] text-[10px] text-[hsl(24_8%_34%)]">
                  <MapPin className="h-3 w-3" />
                  {item.place}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
