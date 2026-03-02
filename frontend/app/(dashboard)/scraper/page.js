/**
 * @file Scraper management page.
 */

import ScraperClient from '@/app/(dashboard)/scraper/ScraperClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for scraper page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Scraper Management', description: 'Source health, crawl history, and data quality.', path: '/scraper' });
}

/**
 * Scraper page wrapper.
 * @returns {JSX.Element}
 */
export default function ScraperPage() {
  return <ScraperClient />;
}
