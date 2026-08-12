import { Calendar, MapPin } from "lucide-react";
import { eventos, site } from "@/lib/content";

export function Eventos() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 font-[family-name:var(--font-display)] text-2xl text-parchment">
          {eventos.title}
        </h1>
        <p className="text-sm text-mute">{eventos.subtitle}</p>
      </div>

      <div className="space-y-4">
        {eventos.items.map((item) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-line bg-card p-5 transition-all hover:border-gold/15 hover:shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-smoke text-center">
                <Calendar className="h-5 w-5 text-mute/40" strokeWidth={1.4} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] tracking-wider text-gold uppercase">
                  {item.status}
                </p>
                <h3 className="mb-1 font-[family-name:var(--font-display)] text-base text-parchment">
                  {item.title}
                </h3>
                <p className="mb-3 flex items-center gap-1 text-[10px] text-mute">
                  <MapPin className="h-3 w-3" />
                  {item.place}
                </p>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-wide text-mute uppercase transition-colors group-hover:text-gold"
                >
                  Quero ser avisado →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
