import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.base44.com",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/manifesto", destination: "/quem-somos", permanent: false },
      {
        source: "/eventos-gratuitos",
        destination: "/encontros",
        permanent: false,
      },
      { source: "/concierge", destination: "/contato", permanent: false },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "imobi-hl",
  project: "javascript-nextjs-7u",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  silent: !process.env.CI,
});
