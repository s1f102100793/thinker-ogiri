/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    FIRE_BASE_API_KEY: process.env.FIRE_BASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  },
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  basePath:
    process.env.GITHUB_REPOSITORY !== undefined
      ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
      : '',
  output: 'export',
  trailingSlash: true,
  transpilePackages: ['api', 'commonConstantsWithClient'],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
