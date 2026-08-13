import { ensureDatabaseMigrations } from "@/lib/db-migrations";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  authRateLimitKey,
  clientIp,
  rateLimit,
} from "@/lib/rate-limit";

const handler = toNextJsHandler(auth);

const LIMITS: Record<string, { limit: number; windowSec: number }> = {
  "auth:signin": { limit: 20, windowSec: 15 * 60 },
  "auth:signup": { limit: 5, windowSec: 60 * 60 },
  "auth:reset": { limit: 8, windowSec: 60 * 60 },
};

async function withRateLimit(
  request: NextRequest,
  method: "GET" | "POST",
) {
  if (method === "POST") {
    const ip = clientIp(request);
    const key = authRateLimitKey(request.nextUrl.pathname, ip);
    if (key) {
      const bucket = key.startsWith("auth:signin")
        ? "auth:signin"
        : key.startsWith("auth:signup")
          ? "auth:signup"
          : "auth:reset";
      const config = LIMITS[bucket];
      try {
        const result = await rateLimit({
          key,
          limit: config.limit,
          windowSec: config.windowSec,
        });
        if (!result.allowed) {
          return NextResponse.json(
            {
              message:
                "Muitas tentativas. Aguarde um pouco e tente novamente.",
            },
            {
              status: 429,
              headers: {
                "Retry-After": String(result.retryAfterSec),
              },
            },
          );
        }
      } catch (error) {
        console.error("[rate-limit]", error);
      }
    }
  }

  return method === "GET" ? handler.GET(request) : handler.POST(request);
}

export async function GET(request: NextRequest) {
  return withRateLimit(request, "GET");
}

export async function POST(request: NextRequest) {
  try {
    await ensureDatabaseMigrations();
  } catch (error) {
    console.error("[auth] migration before signup failed:", error);
  }

  return withRateLimit(request, "POST");
}
