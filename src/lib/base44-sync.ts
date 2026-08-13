import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { bibleStudies, partnerCoupons, ruachVideos } from "@/db/schema";
import {
  fetchBase44Estudos,
  fetchBase44PartnerBrands,
  type Base44EstudoBiblico,
  type Base44PartnerBrand,
} from "@/lib/base44-client";

export type Base44SyncResult = {
  coupons: { created: number; updated: number; total: number };
  studies: { created: number; updated: number; total: number };
  ruachVideos: { created: number; updated: number; total: number };
  skippedRuachFromStudies: number;
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function extractCouponCode(offer: string, partnerName: string) {
  const match = offer.match(/c[oó]digo:\s*([A-Za-z0-9_-]+)/i);
  if (match?.[1]) return match[1].toUpperCase();

  const compact = offer.replace(/\s+/g, "").toUpperCase();
  if (compact.length >= 3 && compact.length <= 24) return compact;

  return slugify(partnerName).replace(/-/g, "").toUpperCase().slice(0, 12) || "TRUE";
}

export function mapPartnerBrand(record: Base44PartnerBrand) {
  const parts = [
    record.offer?.trim(),
    record.description?.trim(),
    record.category ? `Categoria: ${record.category}` : null,
    record.website_url ? `Site: ${record.website_url}` : null,
  ].filter(Boolean);

  return {
    partnerName: record.name.trim(),
    code: extractCouponCode(record.offer || "", record.name),
    description: parts.join("\n"),
    active: true,
  };
}

function excerptFromStudy(record: Base44EstudoBiblico) {
  const meta = [record.livro, record.categoria].filter(Boolean).join(" · ");
  if (meta) return meta;

  const plain = record.conteudo.replace(/^#+\s+/gm, "").trim();
  return plain.slice(0, 180);
}

export function mapEstudo(record: Base44EstudoBiblico) {
  const title = record.titulo.trim();
  const slug = slugify(title);
  const publishedAt = record.created_date ? new Date(record.created_date) : new Date();

  return {
    title,
    slug,
    excerpt: excerptFromStudy(record),
    body: record.conteudo.trim(),
    published: true,
    publishedAt,
    videoUrl: record.video_url?.trim() || null,
  };
}

export async function syncBase44Content(): Promise<Base44SyncResult> {
  const db = getDb();
  const [brands, estudos] = await Promise.all([
    fetchBase44PartnerBrands(),
    fetchBase44Estudos(),
  ]);

  const result: Base44SyncResult = {
    coupons: { created: 0, updated: 0, total: brands.length },
    studies: { created: 0, updated: 0, total: estudos.length },
    ruachVideos: { created: 0, updated: 0, total: 0 },
    skippedRuachFromStudies: 0,
  };

  const existingCoupons = await db.select().from(partnerCoupons);
  const couponByName = new Map(
    existingCoupons.map((coupon) => [coupon.partnerName.toLowerCase(), coupon]),
  );

  for (const brand of brands) {
    const mapped = mapPartnerBrand(brand);
    const existing = couponByName.get(mapped.partnerName.toLowerCase());
    const now = new Date();

    if (existing) {
      await db
        .update(partnerCoupons)
        .set({
          code: mapped.code,
          description: mapped.description,
          active: true,
          updatedAt: now,
        })
        .where(eq(partnerCoupons.id, existing.id));
      result.coupons.updated += 1;
      continue;
    }

    await db.insert(partnerCoupons).values({
      ...mapped,
      createdAt: now,
      updatedAt: now,
    });
    result.coupons.created += 1;
  }

  const existingStudies = await db.select().from(bibleStudies);
  const studyBySlug = new Map(existingStudies.map((study) => [study.slug, study]));

  const existingVideos = await db.select().from(ruachVideos);
  const videoByTitle = new Map(
    existingVideos.map((video) => [video.title.toLowerCase(), video]),
  );

  for (const estudo of estudos) {
    const mapped = mapEstudo(estudo);
    const existing = studyBySlug.get(mapped.slug);
    const now = new Date();

    if (existing) {
      await db
        .update(bibleStudies)
        .set({
          title: mapped.title,
          excerpt: mapped.excerpt,
          body: mapped.body,
          published: true,
          publishedAt: mapped.publishedAt,
          updatedAt: now,
        })
        .where(eq(bibleStudies.id, existing.id));
      result.studies.updated += 1;
    } else {
      await db.insert(bibleStudies).values({
        title: mapped.title,
        slug: mapped.slug,
        excerpt: mapped.excerpt,
        body: mapped.body,
        published: true,
        publishedAt: mapped.publishedAt,
        createdAt: now,
        updatedAt: now,
      });
      result.studies.created += 1;
    }

    if (!mapped.videoUrl) {
      result.skippedRuachFromStudies += 1;
      continue;
    }

    result.ruachVideos.total += 1;
    const existingVideo = videoByTitle.get(mapped.title.toLowerCase());
    if (existingVideo) {
      await db
        .update(ruachVideos)
        .set({
          description: mapped.excerpt,
          videoUrl: mapped.videoUrl,
          published: true,
          updatedAt: now,
        })
        .where(eq(ruachVideos.id, existingVideo.id));
      result.ruachVideos.updated += 1;
      continue;
    }

    await db.insert(ruachVideos).values({
      title: mapped.title,
      description: mapped.excerpt,
      videoUrl: mapped.videoUrl,
      published: true,
      sortOrder: result.ruachVideos.created + result.ruachVideos.updated,
      createdAt: now,
      updatedAt: now,
    });
    result.ruachVideos.created += 1;
  }

  return result;
}
