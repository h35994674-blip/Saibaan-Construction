/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Cache optimized images for 31 days on Vercel's edge — massive speed boost
    minimumCacheTTL: 60 * 60 * 24 * 31,
    // Serve modern formats: AVIF first, then WebP fallback
    formats: ['image/avif', 'image/webp'],
    // Limit the sizes generated to reduce overhead
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384, 512],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'saiban-design-and-construction.vercel.app'],
      bodySizeLimit: '40mb',
    },
  },
};

module.exports = nextConfig;
