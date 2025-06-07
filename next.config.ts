import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "profile-image124.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "national-health.s3.us-east-1.amazonaws.com",
      },
    ]
  },
};

export default nextConfig;
