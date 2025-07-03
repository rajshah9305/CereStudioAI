/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CEREBRAS_API_KEY: process.env.CEREBRAS_API_KEY,
  },
};

module.exports = nextConfig;
