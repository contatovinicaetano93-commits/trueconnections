/**
 * Seed first admin. Usage:
 * npx tsx scripts/seed-admin.ts
 *
 * Reads DATABASE_URL from .env.local
 */
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";

config({ path: ".env.local" });

async function main() {
  const { getDb } = await import("../src/db");
  const { account, user } = await import("../src/db/schema");

  const email = process.env.ADMIN_EMAIL || "admin@trueconnections.com.br";
  const password = process.env.ADMIN_PASSWORD || "TrueConn2026!";
  const name = process.env.ADMIN_NAME || "Admin True Connection";

  const db = getDb();
  const [existing] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existing) {
    await db
      .update(user)
      .set({ role: "admin", active: true, updatedAt: new Date() })
      .where(eq(user.id, existing.id));
    console.log(`Admin already exists, role ensured: ${email}`);
    return;
  }

  const userId = crypto.randomUUID();
  const now = new Date();
  const hashed = await hashPassword(password);

  await db.insert(user).values({
    id: userId,
    name,
    email,
    emailVerified: false,
    role: "admin",
    active: true,
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

  console.log(`Admin ready: ${email}`);
  console.log("Change the default password after first login.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
