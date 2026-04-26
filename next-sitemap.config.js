/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://krellix.app",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  changefreq: "monthly",
  priority: 0.7,
  exclude: ["/api/*"],
};
