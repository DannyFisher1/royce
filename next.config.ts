import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'static-00.iconduck.com',
      'images.seeklogo.com',
      'i0.wp.com',
      'crystalpng.com',
      'i.pinimg.com',
      'https://static-00.iconduck.com/assets.00/openai-icon-2021x2048-4rpe5x7n.png',
      'https://kura.pro/sebastienrousseau/images/logos/gemma.webp',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**', // Allow any path on this hostname
      },

      // Add other hostnames here if needed
    ],
  }
  /* config options here */
};

export default nextConfig;
