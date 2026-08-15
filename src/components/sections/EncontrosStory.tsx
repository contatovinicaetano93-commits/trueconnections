"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { encontros } from "@/lib/content";
import { ExperienceCta } from "@/components/ui/ExperienceCta";

function FreeAccessBadge({ note }: { note: string }) {
  return (
    <p className="mb-4 inline-flex items-center rounded-full border border-[hsl(40_40%_52%)]/25 bg-[hsl(40_40%_52%)]/10 px-3 py-1.5 font-[family-name:var(--font-body)] text-[11px] font-medium text-[hsl(40_40%_42%)]">
      {note}
    </p>
  );
}

function ImageCarousel({
  images,
  altPrefix,
}: {
  images: readonly string[];
  altPrefix: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      4000,
    );
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(38_20%_91%/0.25)]">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${altPrefix} — foto ${i + 1}`}
          fill
          className={`object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 640px"
          priority={i === 0}
        />
      ))}
      {images.length > 1 ? (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Foto ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-4 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ExclusiveExperience({
  tag,
  title,
  subtitle,
  paragraphs,
  schedule,
  place,
  cta,
  ctaMessage,
  media,
}: {
  tag: string;
  title: string;
  subtitle: string;
  paragraphs: readonly string[];
  schedule: string;
  place: string;
  cta: string;
  ctaMessage: string;
  media: React.ReactNode;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] shadow-sm">
      {media}
      <div className="p-5 md:p-6">
        <div className="mb-3">
          <span className="rounded-full bg-[hsl(24_12%_12%/0.04)] px-3 py-1 font-[family-name:var(--font-body)] text-[10px] font-medium tracking-wider text-[hsl(24_12%_12%)]/60 uppercase">
            {tag}
          </span>
        </div>
        <h2 className="mb-1 font-[family-name:var(--font-display)] text-2xl text-[hsl(24_12%_12%)]">
          {title}
        </h2>
        <p className="mb-4 font-[family-name:var(--font-body)] text-[11px] tracking-wider text-[hsl(24_8%_34%)] uppercase">
          {subtitle}
        </p>
        <div className="mb-5 space-y-3 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <div className="mb-5 space-y-2">
          <p className="flex items-center gap-2 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
            <Calendar className="h-3.5 w-3.5 text-[hsl(24_14%_14%)]" />
            {schedule}
          </p>
          <p className="flex items-center gap-2 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
            <MapPin className="h-3.5 w-3.5 text-[hsl(24_14%_14%)]" />
            {place}
          </p>
        </div>
        <ExperienceCta label={cta} message={ctaMessage} />
      </div>
    </article>
  );
}

export function EncontrosStory() {
  const [naMesa, clube] = encontros.items;
  const { spinPraise, ruach } = encontros;

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 font-[family-name:var(--font-display)] text-2xl text-[hsl(24_12%_12%)]">
          {encontros.title}
        </h1>
        <p className="font-[family-name:var(--font-body)] text-sm text-[hsl(24_8%_34%)]">
          {encontros.subtitle}
        </p>
      </div>

      <div className="space-y-8">
        <article className="overflow-hidden rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] shadow-sm">
          <ImageCarousel images={encontros.naMesaImages} altPrefix="Na Mesa" />
          <div className="p-5 md:p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-[hsl(40_40%_52%/0.08)] px-3 py-1 font-[family-name:var(--font-body)] text-[10px] font-medium tracking-wider text-[hsl(40_40%_52%)] uppercase">
                {naMesa.tag}
              </span>
            </div>
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl text-[hsl(24_12%_12%)]">
              {naMesa.title}
            </h2>
            {"accessNote" in naMesa && naMesa.accessNote ? (
              <FreeAccessBadge note={naMesa.accessNote} />
            ) : null}
            <div className="mb-6 space-y-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]">
              {naMesa.paragraphs.map((p, i) => (
                <p key={p.slice(0, 40)}>
                  {i === 0 ? (
                    <>
                      O{" "}
                      <strong className="text-[hsl(24_12%_12%)]/80">
                        &quot;Na Mesa&quot;
                      </strong>
                      {p.replace(/^O "Na Mesa"/, "")}
                    </>
                  ) : (
                    p
                  )}
                </p>
              ))}
              <p className="pt-2 font-[family-name:var(--font-display)] italic text-[hsl(24_12%_12%)]/60">
                {naMesa.italic}
              </p>
            </div>
            <div className="mb-5 space-y-2">
              <p className="flex items-center gap-2 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
                <Calendar className="h-3.5 w-3.5 text-[hsl(24_14%_14%)]" />
                <span>{naMesa.schedule}</span>
                <span className="text-[hsl(40_40%_52%)]">•</span>
                <span>{naMesa.time}</span>
              </p>
              <p className="flex items-center gap-2 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
                <MapPin className="h-3.5 w-3.5 text-[hsl(24_14%_14%)]" />
                <span>{naMesa.place}</span>
              </p>
            </div>
            <Link
              href={naMesa.ctaHref}
              className="cta-primary"
            >
              {naMesa.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-[hsl(32_14%_78%/0.3)] bg-[hsl(38_28%_96%/0.15)] shadow-sm">
          <div className="p-5 md:p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-[hsl(40_40%_52%/0.08)] px-3 py-1 font-[family-name:var(--font-body)] text-[10px] font-medium tracking-wider text-[hsl(40_40%_52%)] uppercase">
                {clube.tag}
              </span>
            </div>
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl text-[hsl(24_12%_12%)]">
              {clube.title}
            </h2>
            {"accessNote" in clube && clube.accessNote ? (
              <FreeAccessBadge note={clube.accessNote} />
            ) : null}
            <p className="mb-6 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_8%_34%)]">
              {clube.body}
            </p>

            <div className="mb-5">
              <h3 className="mb-3 font-[family-name:var(--font-body)] text-xs tracking-wider text-[hsl(24_8%_34%)] uppercase">
                {encontros.booksHeadline}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {encontros.books.map((book) => (
                  <a
                    key={book.title}
                    href={book.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="relative mb-2 aspect-[2/3] overflow-hidden rounded-lg bg-[hsl(38_20%_91%/0.25)] shadow-sm transition-all group-hover:shadow-md">
                      <Image
                        src={book.cover}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </div>
                    <p className="text-center font-[family-name:var(--font-body)] text-[10px] leading-tight text-[hsl(24_12%_12%)]/70 transition-colors group-hover:text-[hsl(24_12%_12%)]">
                      {book.title}
                    </p>
                    <p className="text-center font-[family-name:var(--font-body)] text-[9px] text-[hsl(24_8%_34%)]">
                      {book.author}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            <div className="mb-5 rounded-xl bg-[hsl(38_20%_91%/0.25)] p-4">
              <h3 className="mb-2 font-[family-name:var(--font-body)] text-xs tracking-wider text-[hsl(40_40%_52%)] uppercase">
                {encontros.nextBook.title}
              </h3>
              <p className="font-[family-name:var(--font-body)] text-sm italic text-[hsl(24_12%_12%)]/60">
                {encontros.nextBook.body}
              </p>
            </div>

            <p className="flex items-center gap-2 font-[family-name:var(--font-body)] text-xs text-[hsl(24_8%_34%)]">
              <Calendar className="h-3.5 w-3.5 text-[hsl(24_14%_14%)]" />
              <span>{clube.schedule}</span>
              <span className="text-[hsl(40_40%_52%)]">•</span>
              <span>{clube.time}</span>
            </p>
          </div>
        </article>

        <div className="flex items-center gap-3 pt-2">
          <div className="h-px flex-1 bg-[hsl(32_14%_78%/0.3)]" />
          <p className="font-[family-name:var(--font-body)] text-[10px] tracking-wider text-[hsl(24_8%_34%)] uppercase">
            {encontros.exclusiveSection}
          </p>
          <div className="h-px flex-1 bg-[hsl(32_14%_78%/0.3)]" />
        </div>

        <ExclusiveExperience
          tag={ruach.tag}
          title={ruach.title}
          subtitle={ruach.subtitle}
          paragraphs={ruach.paragraphs}
          schedule={ruach.schedule}
          place={ruach.place}
          cta={ruach.cta}
          ctaMessage={ruach.ctaMessage}
          media={
            <ImageCarousel images={ruach.images} altPrefix={ruach.title} />
          }
        />

        <ExclusiveExperience
          tag={spinPraise.tag}
          title={spinPraise.title}
          subtitle={spinPraise.subtitle}
          paragraphs={spinPraise.paragraphs}
          schedule={spinPraise.schedule}
          place={spinPraise.place}
          cta={spinPraise.cta}
          ctaMessage={spinPraise.ctaMessage}
          media={
            <ImageCarousel
              images={spinPraise.images}
              altPrefix={spinPraise.title}
            />
          }
        />
      </div>
    </div>
  );
}
