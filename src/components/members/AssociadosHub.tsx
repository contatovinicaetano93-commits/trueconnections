"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  ExternalLink,
  Gift,
  Play,
  Sparkles,
} from "lucide-react";
import {
  ASSOCIADOS_TABS,
  LUME_HERO_IMAGE,
  LUME_WEBSITE,
  NEW_TESTAMENT_BOOKS,
  OLD_TESTAMENT_BOOKS,
  RUACH_HERO_IMAGE,
  type AssociadosTab,
} from "@/lib/associados-content";
import { type AssociadosCoupon } from "@/lib/associados-coupons";
import { type AssociadosHubVideo } from "@/lib/associados-videos";
import { site } from "@/lib/content";
import { embedUrl, isDirectVideo } from "@/lib/video-embed";

export type { AssociadosCoupon };

export type AssociadosStudy = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
};

const TAB_ICONS = {
  beneficios: Gift,
  ruach: Play,
  estudos: BookOpen,
  leme: Sparkles,
} as const;

function isAssociadosTab(value: string | null): value is AssociadosTab {
  return ASSOCIADOS_TABS.some((tab) => tab.id === value);
}

function VideoPlayer({
  videoUrl,
  title,
  poster,
}: {
  videoUrl: string;
  title: string;
  poster?: string | null;
}) {
  const embed = embedUrl(videoUrl);
  const direct = isDirectVideo(videoUrl);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-[hsl(24_12%_12%)]/5">
      {embed ? (
        <iframe
          src={embed}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : direct ? (
        <video
          src={videoUrl}
          controls
          playsInline
          preload="metadata"
          poster={poster || undefined}
          className="h-full w-full bg-[hsl(24_12%_12%)]/5 object-contain"
        >
          Seu navegador não reproduz este vídeo.
        </video>
      ) : (
        <a
          href={videoUrl}
          target="_blank"
          rel="noreferrer"
          className="flex h-full items-center justify-center text-sm text-[hsl(40_40%_52%)] transition hover:text-[hsl(40_40%_42%)]"
        >
          Abrir vídeo →
        </a>
      )}
    </div>
  );
}

function HeroVideo({
  image,
  alt,
  video,
  onPlay,
}: {
  image: string;
  alt: string;
  video?: AssociadosHubVideo | null;
  onPlay?: () => void;
}) {
  if (video?.videoUrl) {
    return (
      <div className="mb-4">
        <VideoPlayer
          videoUrl={video.videoUrl}
          title={video.title}
          poster={"thumbnailUrl" in video ? video.thumbnailUrl : undefined}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      className="relative mb-4 block w-full aspect-video overflow-hidden rounded-2xl bg-[hsl(38_20%_88%)]"
    >
      <Image src={image} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 672px" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-sm">
          <Play className="ml-0.5 h-5 w-5 text-[hsl(24_12%_12%)]" strokeWidth={1.8} />
        </span>
      </div>
    </button>
  );
}

function VideoListItem({
  video,
  active,
  onSelect,
}: {
  video: AssociadosHubVideo;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
        active
          ? "border-[hsl(40_40%_52%)]/40 bg-[hsl(40_40%_52%)]/5"
          : "border-[hsl(32_14%_78%/0.35)] bg-white hover:border-[hsl(40_40%_52%)]/25"
      }`}
    >
      <Play className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(40_40%_52%)]" strokeWidth={1.8} />
      <div className="min-w-0 flex-1">
        <p className="font-[family-name:var(--font-body)] text-sm text-[hsl(24_12%_12%)]">
          {video.title}
        </p>
        {video.description ? (
          <p className="mt-0.5 font-[family-name:var(--font-body)] text-[11px] leading-relaxed text-[hsl(24_8%_34%)]">
            {video.description}
          </p>
        ) : null}
      </div>
      {video.duration ? (
        <span className="shrink-0 font-[family-name:var(--font-body)] text-[10px] text-[hsl(24_8%_34%)]">
          {video.duration}
        </span>
      ) : null}
    </button>
  );
}

function BeneficiosPanel({ coupons }: { coupons: AssociadosCoupon[] }) {
  if (coupons.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-[hsl(24_8%_34%)]">
        Nenhum benefício publicado no momento.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {coupons.map((coupon) => (
        <article
          key={coupon.id}
          className="flex min-h-[180px] flex-col rounded-2xl border border-[hsl(32_14%_78%/0.45)] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          <Gift className="mb-3 h-4 w-4 text-[hsl(40_40%_52%)]" strokeWidth={1.6} />
          <h3 className="font-[family-name:var(--font-display)] text-lg leading-tight text-[hsl(24_12%_12%)]">
            {coupon.partnerName}
          </h3>
          {coupon.offer ? (
            <p className="mt-2 font-[family-name:var(--font-body)] text-[11px] font-medium text-[hsl(40_40%_52%)]/90">
              {coupon.offer}
            </p>
          ) : null}
          {coupon.description ? (
            <p className="mt-2 font-[family-name:var(--font-body)] text-[11px] leading-relaxed text-[hsl(24_8%_34%)]">
              {coupon.description}
            </p>
          ) : null}
          {coupon.websiteUrl ? (
            <a
              href={coupon.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-[hsl(24_14%_14%)] px-3 py-2 text-[11px] font-medium text-[hsl(38_28%_92%)] transition hover:bg-[hsl(24_14%_14%)]/90"
            >
              <ExternalLink className="h-3 w-3" />
              Acessar benefício
            </a>
          ) : (
            <p className="mt-auto pt-3 font-mono text-[10px] tracking-wider text-[hsl(24_8%_34%)] uppercase">
              Código: {coupon.code}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

function VideoSectionPanel({
  videos,
  heroImage,
  heroAlt,
  title,
  description,
  footerLink,
}: {
  videos: AssociadosHubVideo[];
  heroImage: string;
  heroAlt: string;
  title: string;
  description: string;
  footerLink?: { href: string; label: string };
}) {
  const [activeId, setActiveId] = useState(videos[0]?.id ?? "");
  const activeVideo = videos.find((video) => video.id === activeId) ?? videos[0] ?? null;

  return (
    <div>
      {title === "Instituto Lume" ? (
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(40_40%_52%)]/10">
            <Sparkles className="h-5 w-5 text-[hsl(40_40%_52%)]" strokeWidth={1.5} />
          </span>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg leading-tight text-[hsl(24_12%_12%)]">
              {title}
            </h3>
            <p className="font-[family-name:var(--font-body)] text-[10px] tracking-wider text-[hsl(24_8%_34%)] uppercase">
              Ciência &amp; Fé · Vídeos
            </p>
          </div>
        </div>
      ) : null}

      <HeroVideo
        image={heroImage}
        alt={heroAlt}
        video={activeVideo}
        onPlay={() => {
          if (videos[0]) setActiveId(videos[0].id);
        }}
      />

      {title !== "Instituto Lume" ? (
        <h3 className="font-[family-name:var(--font-display)] text-lg text-[hsl(24_12%_12%)]">
          {title}
        </h3>
      ) : null}
      <p className="mt-1 mb-4 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
        {description}
      </p>

      <div className={`space-y-2 ${footerLink ? "mb-5" : ""}`}>
        {videos.map((video) => (
          <VideoListItem
            key={video.id}
            video={video}
            active={video.id === activeVideo?.id}
            onSelect={() => setActiveId(video.id)}
          />
        ))}
      </div>

      {footerLink ? (
        <a
          href={footerLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(24_14%_14%)] px-4 py-2.5 text-xs font-medium text-[hsl(38_28%_92%)] transition hover:bg-[hsl(24_14%_14%)]/90"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {footerLink.label}
        </a>
      ) : null}
    </div>
  );
}

function EstudosPanel({ studies }: { studies: AssociadosStudy[] }) {
  const [testament, setTestament] = useState<"ot" | "nt">("ot");
  const romansStudies = studies.filter(
    (study) =>
      study.title.toLowerCase().includes("romanos") ||
      study.excerpt?.toLowerCase().includes("romanos"),
  );

  const books = testament === "ot" ? OLD_TESTAMENT_BOOKS : NEW_TESTAMENT_BOOKS;
  const label = testament === "ot" ? "Antigo Testamento" : "Novo Testamento";

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-[hsl(40_40%_52%)]" strokeWidth={1.5} />
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg text-[hsl(24_12%_12%)]">
            Estudos Bíblicos
          </h3>
          <p className="font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
            Biblioteca de estudos por livro
          </p>
        </div>
      </div>

      <div className="mb-5 inline-flex rounded-full bg-[hsl(38_20%_88%/0.8)] p-1 ring-1 ring-[hsl(32_14%_78%/0.35)]">
        <button
          type="button"
          onClick={() => setTestament("ot")}
          className={`rounded-full px-3 py-1.5 font-[family-name:var(--font-body)] text-[11px] transition ${
            testament === "ot"
              ? "bg-white text-[hsl(24_12%_12%)] shadow-sm"
              : "text-[hsl(24_8%_34%)]"
          }`}
        >
          Antigo Testamento
        </button>
        <button
          type="button"
          onClick={() => setTestament("nt")}
          className={`rounded-full px-3 py-1.5 font-[family-name:var(--font-body)] text-[11px] transition ${
            testament === "nt"
              ? "bg-white text-[hsl(24_12%_12%)] shadow-sm"
              : "text-[hsl(24_8%_34%)]"
          }`}
        >
          Novo Testamento
        </button>
      </div>

      <TestamentBooks
        label={label}
        books={books}
        studies={testament === "nt" ? romansStudies : []}
        bookWithStudies={testament === "nt" ? "Romanos" : undefined}
      />
    </div>
  );
}

function TestamentBooks({
  label,
  books,
  studies,
  bookWithStudies,
}: {
  label: string;
  books: readonly string[];
  studies: AssociadosStudy[];
  bookWithStudies?: string;
}) {
  return (
    <div>
      <p className="mb-3 inline-flex rounded-full bg-white px-3 py-1.5 font-[family-name:var(--font-body)] text-[11px] font-medium text-[hsl(24_12%_12%)] shadow-sm ring-1 ring-[hsl(32_14%_78%/0.35)]">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {books.map((book) => {
          const hasStudies = bookWithStudies === book && studies.length > 0;
          if (hasStudies) {
            return (
              <div key={book} className="space-y-1">
                <p className="font-[family-name:var(--font-display)] text-base text-[hsl(24_12%_12%)]">
                  {book}
                </p>
                {studies.map((study) => (
                  <Link
                    key={study.id}
                    href={`/associados/estudos/${study.slug}`}
                    className="block font-[family-name:var(--font-body)] text-[10px] text-[hsl(40_40%_52%)] hover:underline"
                  >
                    {study.title}
                  </Link>
                ))}
              </div>
            );
          }

          return (
            <div key={book}>
              <p className="font-[family-name:var(--font-display)] text-base text-[hsl(24_12%_12%)]">
                {book}
              </p>
              <p className="font-[family-name:var(--font-body)] text-[10px] text-[hsl(24_8%_34%)]">
                Em breve
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LumePanel({ videos }: { videos: AssociadosHubVideo[] }) {
  return (
    <VideoSectionPanel
      videos={videos}
      heroImage={LUME_HERO_IMAGE}
      heroAlt="Instituto Lume"
      title="Instituto Lume"
      description="Conteúdos selecionados do Instituto Lume sobre neurociência, padrões emocionais e a interseção entre ciência e fé."
      footerLink={{ href: LUME_WEBSITE, label: "Visitar Instituto Lume" }}
    />
  );
}

function RuachPanel({ videos }: { videos: AssociadosHubVideo[] }) {
  return (
    <VideoSectionPanel
      videos={videos}
      heroImage={RUACH_HERO_IMAGE}
      heroAlt="Método Ruach"
      title="Método Ruach"
      description="Aulas gravadas de bem-estar, respiração e espiritualidade aplicada."
    />
  );
}

export function AssociadosHub({
  coupons,
  studies,
  ruachVideos,
  lumeVideos,
}: {
  coupons: AssociadosCoupon[];
  studies: AssociadosStudy[];
  ruachVideos: AssociadosHubVideo[];
  lumeVideos: AssociadosHubVideo[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab: AssociadosTab = isAssociadosTab(tabParam) ? tabParam : "beneficios";

  function setTab(tab: AssociadosTab) {
    router.replace(`/associados?tab=${tab}`, { scroll: false });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center gap-4">
        <Image
          src={site.logo}
          alt="True Connection"
          width={120}
          height={38}
          className="h-10 w-auto object-contain"
        />
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-xl text-[hsl(24_12%_12%)] md:text-2xl">
            Associados
          </h1>
          <p className="font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
            Bem-vindo(a) à área premium
          </p>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Seções da área de associados"
        className="mb-8 flex flex-wrap gap-2"
      >
        {ASSOCIADOS_TABS.map((tab) => {
          const Icon = TAB_ICONS[tab.id];
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(tab.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-[family-name:var(--font-body)] text-[11px] transition ${
                active
                  ? "bg-white text-[hsl(24_12%_12%)] shadow-sm ring-1 ring-[hsl(32_14%_78%/0.45)]"
                  : "text-[hsl(24_8%_34%)] hover:text-[hsl(24_12%_12%)]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel">
        {activeTab === "beneficios" ? <BeneficiosPanel coupons={coupons} /> : null}
        {activeTab === "ruach" ? <RuachPanel videos={ruachVideos} /> : null}
        {activeTab === "estudos" ? <EstudosPanel studies={studies} /> : null}
        {activeTab === "leme" ? <LumePanel videos={lumeVideos} /> : null}
      </div>
    </div>
  );
}
