import { sql } from "drizzle-orm";
import { getDb } from "@/db";

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
};

/**
 * Fixed-window rate limit backed by Neon.
 * Safe across serverless instances (unlike in-memory maps).
 */
export async function rateLimit({
  key,
  limit,
  windowSec,
}: {
  key: string;
  limit: number;
  windowSec: number;
}): Promise<RateLimitResult> {
  const db = getDb();
  const now = new Date();
  const resetAt = new Date(now.getTime() + windowSec * 1000);

  const result = await db.execute(sql`
    INSERT INTO rate_limit (key, count, reset_at)
    VALUES (${key}, 1, ${resetAt.toISOString()})
    ON CONFLICT (key) DO UPDATE SET
      count = CASE
        WHEN rate_limit.reset_at <= ${now.toISOString()}::timestamptz THEN 1
        ELSE rate_limit.count + 1
      END,
      reset_at = CASE
        WHEN rate_limit.reset_at <= ${now.toISOString()}::timestamptz
          THEN ${resetAt.toISOString()}::timestamptz
        ELSE rate_limit.reset_at
      END
    RETURNING key, count, reset_at
  `);

  const rows = (result as unknown as { rows: Array<Record<string, unknown>> })
    .rows;
  const row = rows?.[0];
  if (!row) {
    return { allowed: true, remaining: limit - 1, retryAfterSec: windowSec };
  }

  const count = Number(row.count);
  const reset = new Date(String(row.reset_at));
  const retryAfterSec = Math.max(
    1,
    Math.ceil((reset.getTime() - now.getTime()) / 1000),
  );

  if (count > limit) {
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  return {
    allowed: true,
    remaining: Math.max(0, limit - count),
    retryAfterSec,
  };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export function authRateLimitKey(pathname: string, ip: string): string | null {
  const path = pathname.toLowerCase();
  if (path.includes("/sign-in") || path.includes("/signin")) {
    return `auth:signin:${ip}`;
  }
  if (path.includes("/sign-up") || path.includes("/signup")) {
    return `auth:signup:${ip}`;
  }
  if (
    path.includes("forget-password") ||
    path.includes("forgot-password") ||
    path.includes("request-password") ||
    path.includes("reset-password") ||
    path.includes("send-verification")
  ) {
    return `auth:reset:${ip}`;
  }
  return null;
}
