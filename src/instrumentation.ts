import * as Sentry from "@sentry/nextjs";
import { ensureDatabaseMigrations } from "@/lib/db-migrations";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
    try {
      await ensureDatabaseMigrations();
    } catch (error) {
      console.error("[instrumentation] database migration skipped:", error);
    }
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
