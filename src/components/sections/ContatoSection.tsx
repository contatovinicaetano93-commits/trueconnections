import { contato } from "@/lib/content";

export function ContatoSection() {
  return (
    <section id="contato" className="border-t border-line">
      <div className="section-pad mx-auto max-w-4xl py-16 md:py-24">
        <p className="eyebrow mb-4">Contato</p>
        <h1 className="display text-[clamp(2.4rem,5vw,4.25rem)] text-parchment">
          {contato.title}
        </h1>
        <p className="body-prose mt-5 max-w-xl text-mute">{contato.subtitle}</p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {contato.channels.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                {...("external" in channel && channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="surface-editorial focus-ring block h-full p-5 transition-colors hover:border-gold/40"
              >
                <p className="eyebrow mb-3">{channel.label}</p>
                <p className="text-base leading-snug text-parchment">
                  {channel.value}
                </p>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-mute">
          <span className="tracking-[0.14em] text-gold uppercase">
            {contato.hoursLabel}
          </span>
          <span className="mx-2 text-mute/40">·</span>
          {contato.hours}
        </p>
      </div>
    </section>
  );
}
