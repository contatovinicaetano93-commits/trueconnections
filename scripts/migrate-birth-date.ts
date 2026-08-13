import "dotenv/config";
import { ensureDatabaseMigrations } from "../src/lib/db-migrations";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set — skipping birth_date migration.");
    return;
  }

  await ensureDatabaseMigrations();
  console.log("Migration 0001_user_birth_date applied.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
