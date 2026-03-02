/**
 * @file Scraper management page.
 */

import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import ScraperStatus from '@/app/(dashboard)/scraper/components/ScraperStatus';
import SourceManager from '@/app/(dashboard)/scraper/components/SourceManager';
import CrawlHistory from '@/app/(dashboard)/scraper/components/CrawlHistory';
import DataQuality from '@/app/(dashboard)/scraper/components/DataQuality';
import ProxyHealth from '@/app/(dashboard)/scraper/components/ProxyHealth';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for scraper page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Scraper Management', description: 'Source health, crawl history, and data quality.', path: '/scraper' });
}

/**
 * Scraper page.
 * @returns {JSX.Element} Scraper dashboard.
 */
export default function ScraperPage() {
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Scraper' }]} />
      <h1 className="text-3xl font-extrabold">Scraper Management</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ScraperStatus items={['99acres: healthy', 'MagicBricks: healthy', 'Housing: warning latency']} />
        <SourceManager items={['Enable source', 'Throttle source', 'Retry source']} />
        <CrawlHistory items={['Run #1402 completed', 'Run #1401 completed', 'Run #1400 partial']} />
        <DataQuality items={['Dedup ratio: 91%', 'Field completeness: 96%']} />
        <ProxyHealth items={['Proxy pool healthy 94%', 'Error spike detected on node-3']} />
      </div>
    </section>
  );
}
