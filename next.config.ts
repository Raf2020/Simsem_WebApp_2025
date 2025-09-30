import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'simsem-app-dev.b-cdn.net',
        port: '',
        pathname: '/**',
      },
      // Keep existing Parse files domain if you're still using it
      {
        protocol: 'https',
        hostname: 'parsefiles.back4app.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
