"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Copy,
  Heart,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { impacto } from "@/lib/content";

function FrenteItem({
  frente,
  index,
}: {
  frente: (typeof impacto.frentes)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="w-full rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-4 text-left transition-all hover:border-[hsl(40_40%_52%)]/20"
      style={{ animationDelay: `${0.08 * index}s` }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${frente.color}`}
        >
          <Heart className={`h-4 w-4 ${frente.accent}`} strokeWidth={1.5} />
        </div>
        <span className="flex-1 font-[family-name:var(--font-display)] text-sm text-[hsl(24_12%_12%)]">
          {frente.title}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-[hsl(24_8%_34%)]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[hsl(24_8%_34%)]" />
        )}
      </div>
      {open ? (
        <div className="mt-4 border-t border-[hsl(32_14%_78%/0.3)] pt-4">
          <p className="font-[family-name:var(--font-body)] text-xs leading-relaxed text-[hsl(24_8%_34%)]">
            {frente.desc}
          </p>
        </div>
      ) : null}
    </button>
  );
}

function CopyPixButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex items-center gap-1.5 font-[family-name:var(--font-body)] text-xs font-medium text-[hsl(24_14%_14%)]"
    >
      <Copy className="h-3 w-3" />
      {copied ? "Copiado!" : "Copiar chave PIX"}
    </button>
  );
}

export function Impacto() {
  const [projeto1, projeto2] = impacto.projects;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-[hsl(24_12%_12%)]">
          {impacto.title}
        </h1>
        <p className="font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
          {impacto.subtitle}
        </p>
      </div>

      <article className="mb-8 overflow-hidden rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)]">
        <div className="relative aspect-[16/9] overflow-hidden bg-[hsl(38_20%_91%/0.25)]">
          <Image
            src={projeto1.image}
            alt="Seja o Milagre"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="p-5 md:p-6">
          <span className="mb-3 inline-flex rounded-full bg-[hsl(40_40%_52%/0.08)] px-3 py-1 font-[family-name:var(--font-body)] text-[10px] font-medium tracking-wider text-[hsl(40_40%_52%)] uppercase">
            {projeto1.tag}
          </span>
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl text-[hsl(24_12%_12%)]">
            Instituto <span className="italic">Seja o Milagre</span>
          </h2>
          <p className="mb-6 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]">
            {projeto1.body}
          </p>
          <p className="mb-6 flex items-center gap-2 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
            <MapPin className="h-3.5 w-3.5 text-[hsl(24_14%_14%)]" />
            {projeto1.address}
          </p>

          <h3 className="mb-3 font-[family-name:var(--font-body)] text-xs tracking-wider text-[hsl(24_8%_34%)] uppercase">
            Nossas frentes de atuação
          </h3>
          <div className="mb-6 space-y-2">
            {impacto.frentes.map((frente, i) => (
              <FrenteItem key={frente.id} frente={frente} index={i} />
            ))}
          </div>

          <div className="mb-5 rounded-2xl bg-[hsl(38_20%_91%/0.25)] p-5">
            <h3 className="mb-1 font-[family-name:var(--font-display)] text-base text-[hsl(24_12%_12%)]">
              Seja o Milagre você também!
            </h3>
            <p className="mb-4 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
              Entre em contato e faça parte dessa transformação.
            </p>
            <div className="space-y-2.5">
              <a
                href={projeto1.phoneHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-3 transition-all hover:border-[hsl(40_40%_52%)]/20"
              >
                <Phone className="h-4 w-4 text-[hsl(24_14%_14%)]" />
                <span>
                  <span className="block font-[family-name:var(--font-body)] text-sm text-[hsl(24_12%_12%)]">
                    {projeto1.phone}
                  </span>
                  <span className="block font-[family-name:var(--font-body)] text-[10px] text-[hsl(24_8%_34%)]">
                    {projeto1.contact}
                  </span>
                </span>
              </a>
              <a
                href={projeto1.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-3 transition-all hover:border-[hsl(40_40%_52%)]/20"
              >
                <span className="flex h-4 w-4 items-center justify-center text-[10px] font-medium text-[hsl(24_14%_14%)]">
                  IG
                </span>
                <span className="font-[family-name:var(--font-body)] text-sm text-[hsl(24_12%_12%)]">
                  {projeto1.instagram}
                </span>
              </a>
              <a
                href={projeto1.emailHref}
                className="flex items-center gap-3 rounded-xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-3 transition-all hover:border-[hsl(40_40%_52%)]/20"
              >
                <Mail className="h-4 w-4 text-[hsl(24_14%_14%)]" />
                <span className="font-[family-name:var(--font-body)] text-sm text-[hsl(24_12%_12%)]">
                  {projeto1.email}
                </span>
              </a>
            </div>
          </div>
          <p className="text-center font-[family-name:var(--font-body)] text-[10px] text-[hsl(24_8%_34%)]">
            {projeto1.cnpj}
          </p>
        </div>
      </article>

      <article className="mb-8 overflow-hidden rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)]">
        <div className="flex aspect-[16/9] items-center justify-center bg-[hsl(38_20%_91%/0.25)]">
          <div className="p-8 text-center">
            <Heart className="mx-auto mb-3 h-12 w-12 text-[hsl(40_40%_52%)]/30" />
            <p className="font-[family-name:var(--font-display)] text-sm italic text-[hsl(24_8%_34%)]/40">
              Base Missionária Itatinga
            </p>
          </div>
        </div>
        <div className="p-5 md:p-6">
          <span className="mb-3 inline-flex rounded-full bg-[hsl(40_40%_52%/0.08)] px-3 py-1 font-[family-name:var(--font-body)] text-[10px] font-medium tracking-wider text-[hsl(40_40%_52%)] uppercase">
            {projeto2.tag}
          </span>
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl text-[hsl(24_12%_12%)]">
            {projeto2.title}
          </h2>
          {projeto2.paragraphs.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="mb-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]"
            >
              {p}
            </p>
          ))}
          <p className="mb-6 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]">
            Além da atuação em Itatinga, este braço missionário também estende
            sua missão à{" "}
            <strong className="text-[hsl(24_12%_12%)]/80">Ilha de Marajó</strong>
            , levando esperança e assistência às comunidades ribeirinhas do Pará.
          </p>
          <p className="mb-5 flex items-center gap-2 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
            <MapPin className="h-3.5 w-3.5 text-[hsl(24_14%_14%)]" />
            {projeto2.address}
          </p>
          <div className="rounded-2xl bg-[hsl(38_20%_91%/0.25)] p-5">
            <h3 className="mb-1 font-[family-name:var(--font-display)] text-base text-[hsl(24_12%_12%)]">
              Fale com o líder da missão
            </h3>
            <p className="mb-1 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
              {projeto2.contact}
            </p>
            <p className="mb-4 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
              {projeto2.leaderNote}
            </p>
            <a
              href={projeto2.leaderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(24_14%_14%)] py-3 font-[family-name:var(--font-body)] text-sm font-medium text-[hsl(38_28%_92%)] transition-all hover:bg-[hsl(24_14%_14%)]/80"
            >
              {projeto2.leaderCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </article>

      <div className="mb-8 rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-6 text-center">
        <Heart className="mx-auto mb-3 h-8 w-8 text-[hsl(40_40%_52%)]" />
        <h3 className="mb-2 font-[family-name:var(--font-display)] text-lg text-[hsl(24_12%_12%)]">
          {impacto.donation.title}
        </h3>
        <p className="mb-4 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
          {impacto.donation.body}
        </p>
        <div className="mb-3 rounded-xl bg-[hsl(38_20%_91%/0.25)] p-4">
          <p className="mb-2 break-all font-mono text-xs text-[hsl(24_12%_12%)]">
            {impacto.donation.pixKey}
          </p>
          <CopyPixButton value={impacto.donation.pixKey} />
        </div>
        <p className="font-[family-name:var(--font-body)] text-[10px] text-[hsl(24_8%_34%)]">
          {impacto.donation.footer}
        </p>
      </div>

      <div className="rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] p-5 md:p-6">
        <h3 className="mb-4 font-[family-name:var(--font-display)] text-lg text-[hsl(24_12%_12%)]">
          {impacto.howToHelp.title}
        </h3>
        <div className="space-y-3">
          {impacto.howToHelp.items.map((item) => {
            const inner = (
              <>
                <Users className="h-5 w-5 flex-shrink-0 text-[hsl(24_14%_14%)]" />
                <span>
                  <span className="block font-[family-name:var(--font-body)] text-sm font-medium text-[hsl(24_12%_12%)]">
                    {item.title}
                  </span>
                  <span className="block font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
                    {item.body}
                  </span>
                </span>
              </>
            );
            const className =
              "flex items-center gap-3 rounded-2xl bg-[hsl(38_20%_91%/0.25)] p-4 transition-all hover:bg-[hsl(38_20%_91%/0.4)]";
            if ("external" in item && item.external) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              );
            }
            return (
              <Link key={item.title} href={item.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
