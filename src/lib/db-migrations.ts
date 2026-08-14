import { neon } from "@neondatabase/serverless";

let migrationsPromise: Promise<void> | null = null;

export async function ensureDatabaseMigrations() {
  if (migrationsPromise) return migrationsPromise;

  migrationsPromise = (async () => {
    const url = process.env.DATABASE_URL;
    if (!url) return;

    const sql = neon(url);
    await sql`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "birth_date" date`;
    await sql`ALTER TABLE "partner_coupons" ADD COLUMN IF NOT EXISTS "offer" text`;
    await sql`ALTER TABLE "partner_coupons" ADD COLUMN IF NOT EXISTS "website_url" text`;
  })().catch((error) => {
    migrationsPromise = null;
    console.error("[db-migrations] failed:", error);
    throw error;
  });

  return migrationsPromise;
}
