const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withImages = require("next-images");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

require("dotenv").config({ path: ".env.local" });

module.exports = withPlugins([withPWA, withImages, withBundleAnalyzer], {
  env: {
    API_URL: process.env.API_URL,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
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
