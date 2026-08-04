"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { getDb } from "@/db";
import {
  bibleStudies,
  partnerCoupons,
  ruachVideos,
  user,
} from "@/db/schema";
import { auth } from "@/lib/auth";
import { requireAdmin } from "@/lib/session";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createMember(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const role = formData.get("role") === "admin" ? "admin" : "member";

  if (!name || !email || password.length < 8) {
    return;
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });

    if (role === "admin") {
      const db = getDb();
      await db.update(user).set({ role: "admin" }).where(eq(user.email, email));
    }

    revalidatePath("/admin");
  } catch {
    // E-mail already exists or auth provider rejected signup
  }
}

export async function saveCoupon(formData: FormData) {
  await requireAdmin();
  const db = getDb();
  const id = String(formData.get("id") || "");
  const partnerName = String(formData.get("partnerName") || "").trim();
  const code = String(formData.get("code") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const active = formData.get("active") === "on";

  if (!partnerName || !code) {
    return;
  }

  if (id) {
    await db
      .update(partnerCoupons)
      .set({
        partnerName,
        code,
        description: description || null,
        active,
        updatedAt: new Date(),
      })
      .where(eq(partnerCoupons.id, id));
  } else {
    await db.insert(partnerCoupons).values({
      partnerName,
      code,
      description: description || null,
      active,
    });
  }

  revalidatePath("/admin/cupons");
  revalidatePath("/associados/cupons");
}

export async function deleteCoupon(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await getDb().delete(partnerCoupons).where(eq(partnerCoupons.id, id));
  revalidatePath("/admin/cupons");
  revalidatePath("/associados/cupons");
}

export async function saveVideo(formData: FormData) {
  await requireAdmin();
  const db = getDb();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const videoUrl = String(formData.get("videoUrl") || "").trim();
  const thumbnailUrl = String(formData.get("thumbnailUrl") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const published = formData.get("published") === "on";

  if (!title || !videoUrl) {
    return;
  }

  if (id) {
    await db
      .update(ruachVideos)
      .set({
        title,
        description: description || null,
        videoUrl,
        thumbnailUrl: thumbnailUrl || null,
        sortOrder,
        published,
        updatedAt: new Date(),
      })
      .where(eq(ruachVideos.id, id));
  } else {
    await db.insert(ruachVideos).values({
      title,
      description: description || null,
      videoUrl,
      thumbnailUrl: thumbnailUrl || null,
      sortOrder,
      published,
    });
  }

  revalidatePath("/admin/ruach");
  revalidatePath("/associados/ruach");
}

export async function deleteVideo(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;

  const db = getDb();
  const [existing] = await db
    .select()
    .from(ruachVideos)
    .where(eq(ruachVideos.id, id))
    .limit(1);

  if (existing?.videoUrl?.includes("blob.vercel-storage.com")) {
    try {
      await del(existing.videoUrl);
    } catch {
      // Continua a remoção do registro mesmo se o blob já não existir
    }
  }

  await db.delete(ruachVideos).where(eq(ruachVideos.id, id));
  revalidatePath("/admin/ruach");
  revalidatePath("/associados/ruach");
}

export async function saveStudy(formData: FormData) {
  await requireAdmin();
  const db = getDb();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const published = formData.get("published") === "on";
  const slug = String(formData.get("slug") || "").trim() || slugify(title);

  if (!title || !body) {
    return;
  }

  if (id) {
    await db
      .update(bibleStudies)
      .set({
        title,
        slug,
        excerpt: excerpt || null,
        body,
        published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(bibleStudies.id, id));
  } else {
    await db.insert(bibleStudies).values({
      title,
      slug,
      excerpt: excerpt || null,
      body,
      published,
      publishedAt: published ? new Date() : null,
    });
  }

  revalidatePath("/admin/estudos");
  revalidatePath("/associados/estudos");
  revalidatePath(`/associados/estudos/${slug}`);
}

export async function deleteStudy(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await getDb().delete(bibleStudies).where(eq(bibleStudies.id, id));
  revalidatePath("/admin/estudos");
  revalidatePath("/associados/estudos");
}
