import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add the compiler option to remove console logs except errors
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
  
};

export default nextConfig;
