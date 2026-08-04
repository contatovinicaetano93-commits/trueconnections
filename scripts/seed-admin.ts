/**
 * Seed first admin. Usage:
 * npx tsx scripts/seed-admin.ts
 *
 * Reads DATABASE_URL + BETTER_AUTH_* from .env.local
 */
import { config } from "dotenv";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

async function main() {
  const { auth } = await import("../src/lib/auth");
  const { getDb } = await import("../src/db");
  const { user } = await import("../src/db/schema");

  const email = process.env.ADMIN_EMAIL || "admin@trueconnections.com.br";
  const password = process.env.ADMIN_PASSWORD || "TrueConn2026!";
  const name = process.env.ADMIN_NAME || "Admin True Connection";

  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
    });
  } catch (error) {
    console.log("Sign-up note (may already exist):", error);
  }

  await getDb().update(user).set({ role: "admin" }).where(eq(user.email, email));
  console.log(`Admin ready: ${email}`);
  console.log("Change the default password after first login.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
