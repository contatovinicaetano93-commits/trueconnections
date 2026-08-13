import Link from "next/link";
import { site } from "@/lib/content";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.06] bg-[#F5F0E6] px-6 py-12 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <BrandLogo variant="mark" size="lg" className="-mb-1" />
          <p className="mt-2 text-[0.65rem] tracking-[0.2em] text-[hsl(40_40%_52%)] uppercase">
            True Connection
          </p>
          <p className="mt-4 max-w-sm font-[family-name:var(--font-display)] text-xl italic text-[hsl(24_12%_12%)]/70 md:text-2xl">
            {site.tagline}
          </p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex text-sm text-[hsl(24_12%_12%)]/50 transition-colors hover:text-[hsl(40_40%_52%)]"
          >
            WhatsApp →
          </a>
        </div>

        <div>
          <p className="mb-4 text-[0.65rem] tracking-[0.2em] text-[hsl(24_12%_12%)]/45 uppercase">
            Navegar
          </p>
          <ul className="space-y-2 text-sm text-[hsl(24_12%_12%)]/60">
            <li>
              <Link href="/quem-somos" className="hover:text-[hsl(24_12%_12%)]">
                Manifesto
              </Link>
            </li>
            <li>
              <Link href="/seja-associado" className="hover:text-[hsl(24_12%_12%)]">
                Associados
              </Link>
            </li>
            <li>
              <Link href="/encontros" className="hover:text-[hsl(24_12%_12%)]">
                Encontros
              </Link>
            </li>
            <li>
              <Link href="/ciencia-fe" className="hover:text-[hsl(24_12%_12%)]">
                Ciência & Fé
              </Link>
            </li>
            <li>
              <Link href="/eventos" className="hover:text-[hsl(24_12%_12%)]">
                Eventos
              </Link>
            </li>
            <li>
              <Link href="/impacto" className="hover:text-[hsl(24_12%_12%)]">
                Impacto
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-[hsl(24_12%_12%)]">
                Contato
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[0.65rem] tracking-[0.2em] text-[hsl(24_12%_12%)]/45 uppercase">
            Nossos QGs
          </p>
          <ul className="space-y-4 text-sm">
            <li>
              <p className="text-[hsl(24_12%_12%)]">Amém Café</p>
              <p className="text-[hsl(24_12%_12%)]/50">Rua Nebraska, 868</p>
            </li>
            <li>
              <p className="text-[hsl(24_12%_12%)]">Praça Pôr do Sol</p>
              <p className="text-[hsl(24_12%_12%)]/50">Praça Pôr do Sol — Pinheiros</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-black/[0.06] pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-[0.65rem] tracking-[0.18em] text-[hsl(24_12%_12%)]/40 uppercase">
          © {new Date().getFullYear()} True Connection
        </p>
        <p className="font-[family-name:var(--font-display)] text-xs italic tracking-widest text-[hsl(24_12%_12%)]/25">
          Mais do que uma plataforma. Um movimento.
        </p>
      </div>
    </footer>
  );
}
