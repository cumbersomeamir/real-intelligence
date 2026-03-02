/**
 * @file SEO metadata helper functions.
 */

import { APP_URL } from '@/lib/constants';

/**
 * Creates metadata payload with canonical URL.
 * @param {Object} payload - Metadata overrides.
 * @returns {import('next').Metadata} Metadata object.
 */
export function buildMetadata(payload) {
  const { title, description, path = '/', keywords = [], openGraph = {}, twitter = {} } = payload;
  const canonical = `${APP_URL}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'LuckNow PropIntel',
      locale: 'en_IN',
      type: 'website',
      images: ['/og/default.png'],
      ...openGraph
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...twitter
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

/**
 * Creates a basic breadcrumb JSON-LD entity.
 * @param {Array<{name:string,item:string}>} items - Breadcrumb entries.
 * @returns {Object} BreadcrumbList schema object.
 */
export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
}
