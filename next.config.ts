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
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
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
      { source: "/associados/cupons", destination: "/associados?tab=beneficios", permanent: false },
      { source: "/associados/ruach", destination: "/associados?tab=ruach", permanent: false },
      { source: "/associados/estudos", destination: "/associados?tab=estudos", permanent: false },
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
