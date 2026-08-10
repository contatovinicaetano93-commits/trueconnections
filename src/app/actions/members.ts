"use server";

import { randomBytes } from "node:crypto";
import { del } from "@vercel/blob";
import { hashPassword } from "better-auth/crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import {
  account,
  bibleStudies,
  partnerCoupons,
  ruachVideos,
  user,
  verification,
} from "@/db/schema";
import { getSession, requireAdmin } from "@/lib/session";
import {
  DEFAULT_MEMBERSHIP_AMOUNT_CENTS,
  firstDueFromSignup,
  nextDueAfterPayment,
  normalizeBrazilPhone,
  resolveSubscriptionStatus,
  startOfUtcDay,
} from "@/lib/billing";
import { buildSetPasswordUrl, sendWelcomeInviteEmail } from "@/lib/email";

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
  const phone = normalizeBrazilPhone(String(formData.get("phone") || ""));
  const amountRaw = String(formData.get("monthlyAmount") || "").trim();
  const amountCents = amountRaw
    ? Math.round(Number(amountRaw.replace(",", ".")) * 100)
    : DEFAULT_MEMBERSHIP_AMOUNT_CENTS;

  if (!name || !email || password.length < 8) {
    return;
  }
  if (role === "member" && !phone) {
    return;
  }

  const db = getDb();
  const [existing] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);
  if (existing) return;

  const userId = crypto.randomUUID();
  const now = new Date();
  const hashed = await hashPassword(password);

  await db.insert(user).values({
    id: userId,
    name,
    email,
    emailVerified: false,
    role,
    active: true,
    phone: role === "member" ? phone : null,
    subscriptionStatus: role === "member" ? "active" : "none",
    // Ciclo fixo: primeiro vencimento = cadastro + 30 dias (não editável)
    nextDueAt: role === "member" ? firstDueFromSignup(now) : null,
    monthlyAmountCents:
      role === "member" && amountCents > 0 ? amountCents : null,
    mustSetPassword: true,
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(account).values({
    id: crypto.randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId,
    password: hashed,
    createdAt: now,
    updatedAt: now,
  });

  // Token Better Auth (7 dias) para criar senha própria antes do painel
  const inviteToken = randomBytes(12).toString("hex");
  await db.insert(verification).values({
    id: crypto.randomUUID(),
    identifier: `reset-password:${inviteToken}`,
    value: userId,
    expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
    createdAt: now,
    updatedAt: now,
  });

  try {
    await sendWelcomeInviteEmail({
      to: email,
      name,
      email,
      temporaryPassword: password,
      setPasswordUrl: buildSetPasswordUrl(inviteToken, email),
    });
  } catch (error) {
    console.error("[createMember] falha ao enviar e-mail de boas-vindas:", error);
    // Conta já criada — admin pode reenviar depois; não desfaz o cadastro
  }

  revalidatePath("/admin");
  revalidatePath("/admin/usuarios");
}

export async function markSubscriptionPaid(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;

  const db = getDb();
  const [member] = await db
    .select({
      id: user.id,
      role: user.role,
      nextDueAt: user.nextDueAt,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(eq(user.id, id))
    .limit(1);

  if (!member || member.role !== "member") return;

  const now = new Date();
  const paidThrough = member.nextDueAt
    ? startOfUtcDay(member.nextDueAt)
    : firstDueFromSignup(member.createdAt);
  const nextDueAt = nextDueAfterPayment(paidThrough);

  await db
    .update(user)
    .set({
      subscriptionStatus: "active",
      lastPaidAt: now,
      nextDueAt,
      updatedAt: now,
    })
    .where(eq(user.id, id));

  revalidatePath("/admin");
  revalidatePath("/admin/usuarios");
}

export async function updateMemberProfile(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;

  const name = String(formData.get("name") || "").trim();
  const phone = normalizeBrazilPhone(String(formData.get("phone") || ""));
  const notes = String(formData.get("profileNotes") || "").trim();
  const amountRaw = String(formData.get("monthlyAmount") || "").trim();
  const amountCents = amountRaw
    ? Math.round(Number(amountRaw.replace(",", ".")) * 100)
    : null;
  const paused = formData.get("paused") === "on";

  if (!name || !phone) return;

  const db = getDb();
  const [member] = await db
    .select()
    .from(user)
    .where(eq(user.id, id))
    .limit(1);
  if (!member || member.role !== "member") return;

  const now = new Date();
  // Data de vencimento nunca é editada manualmente — só inicia ciclo se ainda não houver.
  let nextDueAt = member.nextDueAt;
  if (!nextDueAt) {
    nextDueAt = firstDueFromSignup(member.createdAt);
  }

  const status = paused
    ? "paused"
    : resolveSubscriptionStatus({
        role: member.role,
        active: member.active,
        status: "active",
        nextDueAt,
        now,
      });

  await db
    .update(user)
    .set({
      name,
      phone,
      profileNotes: notes || null,
      monthlyAmountCents:
        amountCents && amountCents > 0
          ? amountCents
          : member.monthlyAmountCents ?? DEFAULT_MEMBERSHIP_AMOUNT_CENTS,
      nextDueAt,
      subscriptionStatus: status,
      updatedAt: now,
    })
    .where(eq(user.id, id));

  revalidatePath("/admin");
  revalidatePath("/admin/usuarios");
}

export async function syncSubscriptionStatuses() {
  await requireAdmin();
  const db = getDb();
  const members = await db
    .select({
      id: user.id,
      role: user.role,
      active: user.active,
      subscriptionStatus: user.subscriptionStatus,
      nextDueAt: user.nextDueAt,
    })
    .from(user)
    .where(eq(user.role, "member"));

  const now = new Date();
  await Promise.all(
    members.map(async (member) => {
      const next = resolveSubscriptionStatus({
        role: member.role,
        active: member.active,
        status: member.subscriptionStatus,
        nextDueAt: member.nextDueAt,
        now,
      });
      if (next === member.subscriptionStatus) return;
      await db
        .update(user)
        .set({ subscriptionStatus: next, updatedAt: now })
        .where(eq(user.id, member.id));
    }),
  );
}

export async function clearMustSetPassword() {
  const session = await getSession();
  if (!session) return;

  await getDb()
    .update(user)
    .set({ mustSetPassword: false, updatedAt: new Date() })
    .where(eq(user.id, session.user.id));

  revalidatePath("/associados");
  revalidatePath("/associados/destino");
  revalidatePath("/admin");
}

export async function setUserRole(formData: FormData) {
  const session = await requireAdmin();
  const id = String(formData.get("id") || "");
  const role = String(formData.get("role") || "member");
  if (!id || (role !== "admin" && role !== "member")) return;
  if (id === session.user.id && role !== "admin") return;

  await getDb()
    .update(user)
    .set({ role, updatedAt: new Date() })
    .where(eq(user.id, id));
  revalidatePath("/admin/usuarios");
}

export async function setUserActive(formData: FormData) {
  const session = await requireAdmin();
  const id = String(formData.get("id") || "");
  const active = formData.get("active") === "true";
  if (!id) return;
  if (id === session.user.id && !active) return;

  await getDb()
    .update(user)
    .set({ active, updatedAt: new Date() })
    .where(eq(user.id, id));
  revalidatePath("/admin/usuarios");
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
    const [existing] = await db
      .select({ videoUrl: ruachVideos.videoUrl })
      .from(ruachVideos)
      .where(eq(ruachVideos.id, id))
      .limit(1);

    if (
      existing?.videoUrl &&
      existing.videoUrl !== videoUrl &&
      existing.videoUrl.includes("blob.vercel-storage.com")
    ) {
      try {
        await del(existing.videoUrl);
      } catch {
        // Continua mesmo se o blob antigo já não existir
      }
    }

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
  const audioUrl = String(formData.get("audioUrl") || "").trim();
  const removeAudio = formData.get("removeAudio") === "on";
  const published = formData.get("published") === "on";
  const slug = String(formData.get("slug") || "").trim() || slugify(title);

  if (!title || !body) {
    return;
  }

  if (id) {
    const [existing] = await db
      .select({ audioUrl: bibleStudies.audioUrl })
      .from(bibleStudies)
      .where(eq(bibleStudies.id, id))
      .limit(1);

    let nextAudioUrl = existing?.audioUrl || null;

    if (removeAudio) {
      if (existing?.audioUrl?.includes("blob.vercel-storage.com")) {
        try {
          await del(existing.audioUrl);
        } catch {
          // Continua mesmo se o blob já não existir
        }
      }
      nextAudioUrl = null;
    } else if (audioUrl) {
      if (
        existing?.audioUrl &&
        existing.audioUrl !== audioUrl &&
        existing.audioUrl.includes("blob.vercel-storage.com")
      ) {
        try {
          await del(existing.audioUrl);
        } catch {
          // Continua mesmo se o blob antigo já não existir
        }
      }
      nextAudioUrl = audioUrl;
    }

    await db
      .update(bibleStudies)
      .set({
        title,
        slug,
        excerpt: excerpt || null,
        body,
        audioUrl: nextAudioUrl,
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
      audioUrl: audioUrl || null,
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

  const db = getDb();
  const [existing] = await db
    .select({ audioUrl: bibleStudies.audioUrl })
    .from(bibleStudies)
    .where(eq(bibleStudies.id, id))
    .limit(1);

  if (existing?.audioUrl?.includes("blob.vercel-storage.com")) {
    try {
      await del(existing.audioUrl);
    } catch {
      // Continua a remoção do registro mesmo se o blob já não existir
    }
  }

  await db.delete(bibleStudies).where(eq(bibleStudies.id, id));
  revalidatePath("/admin/estudos");
  revalidatePath("/associados/estudos");
}
