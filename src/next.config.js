/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Solo si usas la carpeta "app"
    incrementalCacheHandlerPath: false
  },
};

module.exports = nextConfig;
  