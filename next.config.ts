import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1', // or your Strapi domain in production
        port: '1337',
        pathname: '/uploads/**',
      }
    ],
  },
};

export default nextConfig;
