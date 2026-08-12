import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { impacto } from "@/lib/content";

function BodyParagraphs({ text }: { text: string }) {
  return (
    <div className="mb-6 space-y-3 text-sm leading-relaxed text-mute">
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}

export function Impacto() {
  const [projeto1, projeto2] = impacto.projects;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-parchment">
          {impacto.title}
        </h1>
        <p className="text-xs text-mute">{impacto.subtitle}</p>
      </div>

      <article className="mb-8 overflow-hidden rounded-2xl border border-line bg-card">
        {"image" in projeto1 && projeto1.image ? (
          <div className="relative aspect-[16/9] overflow-hidden bg-smoke">
            <Image
              src={projeto1.image}
              alt={projeto1.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 640px"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ) : null}
        <div className="p-5 md:p-6">
          <span className="mb-3 inline-flex rounded-full bg-gold/[0.08] px-3 py-1 text-[10px] font-medium tracking-wider text-gold uppercase">
            {projeto1.tag}
          </span>
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl text-parchment">
            Instituto <span className="italic">Seja o Milagre</span>
          </h2>
          <BodyParagraphs text={projeto1.body} />
          <p className="mb-6 flex items-center gap-2 text-xs text-mute">
            <MapPin className="h-3.5 w-3.5 text-parchment" />
            {projeto1.address}
          </p>
          {"frentes" in projeto1 && projeto1.frentes ? (
            <>
              <h3 className="mb-3 text-xs tracking-wider text-mute uppercase">
                {"frentesTitle" in projeto1
                  ? projeto1.frentesTitle
                  : "Nossas frentes"}
              </h3>
              <ul className="mb-6 space-y-2">
                {projeto1.frentes.map((frente) => (
                  <li
                    key={frente}
                    className="rounded-xl border border-line bg-smoke/50 px-3 py-2 text-xs text-parchment"
                  >
                    {frente}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {"invite" in projeto1 && projeto1.invite ? (
            <div className="mb-5 rounded-2xl bg-smoke/80 p-5">
              <h3 className="mb-1 font-[family-name:var(--font-display)] text-base text-parchment">
                Seja o Milagre você também!
              </h3>
              <p className="mb-4 text-xs text-mute">
                Entre em contato e faça parte dessa transformação.
              </p>
              <div className="space-y-2.5">
                {"phone" in projeto1 && projeto1.phone ? (
                  <a
                    href={projeto1.phoneHref}
                    className="flex items-center gap-3 rounded-xl border border-line bg-card p-3 transition-all hover:border-gold/20"
                  >
                    <Phone className="h-4 w-4 text-parchment" />
                    <span>
                      <span className="block text-sm text-parchment">
                        {projeto1.phone}
                      </span>
                      <span className="block text-[10px] text-mute">
                        {projeto1.contact}
                      </span>
                    </span>
                  </a>
                ) : null}
                {"instagram" in projeto1 && projeto1.instagram ? (
                  <a
                    href={projeto1.instagramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-line bg-card p-3 transition-all hover:border-gold/20"
                  >
                    <span className="flex h-4 w-4 items-center justify-center text-[10px] font-medium text-parchment">
                      IG
                    </span>
                    <span className="text-sm text-parchment">
                      {projeto1.instagram}
                    </span>
                  </a>
                ) : null}
                {"email" in projeto1 && projeto1.email ? (
                  <a
                    href={projeto1.emailHref}
                    className="flex items-center gap-3 rounded-xl border border-line bg-card p-3 transition-all hover:border-gold/20"
                  >
                    <Mail className="h-4 w-4 text-parchment" />
                    <span className="text-sm text-parchment">{projeto1.email}</span>
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
          {"cnpj" in projeto1 && projeto1.cnpj ? (
            <p className="text-center text-[10px] text-mute">{projeto1.cnpj}</p>
          ) : null}
        </div>
      </article>

      <article className="mb-8 overflow-hidden rounded-2xl border border-line bg-card">
        <div className="flex aspect-[16/9] items-center justify-center bg-smoke">
          <p className="font-[family-name:var(--font-display)] text-sm italic text-mute/40">
            Base Missionária Itatinga
          </p>
        </div>
        <div className="p-5 md:p-6">
          <span className="mb-3 inline-flex rounded-full bg-gold/[0.08] px-3 py-1 text-[10px] font-medium tracking-wider text-gold uppercase">
            {projeto2.tag}
          </span>
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl text-parchment">
            Itatinga
          </h2>
          <BodyParagraphs text={projeto2.body} />
          <p className="mb-4 flex items-center gap-2 text-xs text-mute">
            <MapPin className="h-3.5 w-3.5" />
            {projeto2.address}
          </p>
          <p className="mb-4 text-xs text-mute">{projeto2.contact}</p>
          {"leaderCta" in projeto2 && projeto2.leaderCta ? (
            <a
              href={projeto2.leaderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 inline-flex rounded-full bg-parchment px-5 py-2.5 text-xs tracking-wide text-ink uppercase"
            >
              {projeto2.leaderCta}
            </a>
          ) : null}
          {"reportUrl" in projeto2 && projeto2.reportUrl ? (
            <a
              href={projeto2.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-gold"
            >
              {projeto2.reportLabel} →
            </a>
          ) : null}
        </div>
      </article>

      <div className="mb-8 rounded-2xl border border-line bg-card p-5 md:p-6">
        <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl text-parchment">
          {impacto.donation.title}
        </h3>
        <p className="mb-4 text-sm text-mute">{impacto.donation.body}</p>
        <p className="text-sm text-parchment">{impacto.donation.org}</p>
        <p className="text-xs text-mute">CNPJ {impacto.donation.cnpj}</p>
        <a
          href={impacto.donation.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-full bg-gold px-5 py-2.5 text-xs tracking-wide text-ink uppercase"
        >
          {impacto.donation.cta}
        </a>
      </div>

      <div>
        <h3 className="mb-4 text-xs tracking-wider text-mute uppercase">
          {impacto.howToHelp.title}
        </h3>
        <ul className="space-y-3">
          {impacto.howToHelp.items.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-line bg-card p-4"
            >
              <p className="font-[family-name:var(--font-display)] text-base text-parchment">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-mute">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
