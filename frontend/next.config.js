/**
 * @file Next.js configuration for LuckNow PropIntel frontend.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' }
    ]
  },
  experimental: {
    typedRoutes: false
  },
  i18n: {
    locales: ['en', 'hi'],
    defaultLocale: 'en'
  }
};

module.exports = nextConfig;
