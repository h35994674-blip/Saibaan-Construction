/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saibaanconstruction.com',
  generateRobotsTxt: false, // Handled by app/robots.ts
  exclude: ['/admin', '/admin/*'],
  generateIndexSitemap: false,
};
