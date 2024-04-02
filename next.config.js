/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/admin',
  reactStrictMode: false,
  swcMinify: true,
  env: {
    // For Local Server
    // API_PROD_URL: "http://localhost:8000/api/",
    API_PROD_URL: "https://142.93.64.125:8000/api/",
    // API_PROD_URL: "https://laravel.pixelstrap.net/fastkart/api/",
    OPENAI_API_KEY: "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",
    ANYSCALE_API_KEY: "esecret_4kqwivwxj38wwycqyuglg8ah9q"
  },
  images: {
    loader: "custom",
    loaderFile: "./src/Utils/ImageLoader/imageloader.js",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "142.93.64.125:8000",
        // hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "laravel.pixelstrap.net",
      },
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;
