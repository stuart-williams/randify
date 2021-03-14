const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([withPWA, withBundleAnalyzer], {
  env: {
    API_URL: process.env.API_URL,
    REPO_URL: process.env.REPO_URL,
  },
  i18n: {
    locales: ["en-GB"],
    defaultLocale: "en-GB",
  },
  images: {
    domains: ["mosaic.scdn.co", "i.scdn.co", "daily-mix.scdn.co"],
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
  },
});
