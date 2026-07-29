import type { NextConfig } from "next";

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
};

export default nextConfig;
