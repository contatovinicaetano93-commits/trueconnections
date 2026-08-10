import * as Sentry from "@sentry/nextjs";

const dsn =
  process.env.SENTRY_DSN ??
  process.env.NEXT_PUBLIC_SENTRY_DSN ??
  "https://1be22f688fcbc847e4c5a256a4cc181d@o4511474932514816.ingest.us.sentry.io/4511858456985600";

Sentry.init({
  dsn,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  includeLocalVariables: true,
  enableLogs: true,
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
});
