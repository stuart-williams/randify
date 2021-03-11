const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  env: {
    API_URL: `//$${process.env.VERCEL_URL}/api`,
    REPO_URL: process.env.REPO_URL,
  },
  i18n: {
    locales: ["en-GB"],
    defaultLocale: "en-GB",
  },
  images: {
    domains: ["mosaic.scdn.co", "i.scdn.co", "daily-mix.scdn.co"],
  },
});
