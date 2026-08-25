import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: false,
    localPatterns: [
      {
        pathname: '/api/gallery/file',
        search: '?pathname=*',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 's3.hi168.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com',
      },
    ],
  },
  allowedDevOrigins: [
    '127.0.0.1',
    'http://127.0.0.1',
    '127.0.0.1:59521',
    'http://127.0.0.1:59521',
    'localhost',
    'http://localhost',
    'localhost:3000',
    'http://localhost:3000',
  ],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig);
