/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

const nextConfig = {
  i18n: {
    locales: ["en", "ko"],
    defaultLocale: "ko",
    localeDetection: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextTranslate(nextConfig);
