/**
 * @file next-sitemap configuration.
 */

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://lucknowpropintel.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/']
      }
    ]
  }
};

export default config;
