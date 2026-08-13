import "dotenv/config";
import { neon } from "@neondatabase/serverless";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const sql = neon(url);
  await sql`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "birth_date" date`;
  console.log("Migration 0001_user_birth_date applied.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
