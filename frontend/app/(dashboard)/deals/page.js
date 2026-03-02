/**
 * @file Deals board page.
 */

import Link from 'next/link';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import DealCard from '@/app/(dashboard)/deals/components/DealCard';
import DealScoreGauge from '@/app/(dashboard)/deals/components/DealScoreGauge';
import DealFilters from '@/app/(dashboard)/deals/components/DealFilters';
import DealComparison from '@/app/(dashboard)/deals/components/DealComparison';
import DealTimeline from '@/app/(dashboard)/deals/components/DealTimeline';
import HighConvictionBadge from '@/app/(dashboard)/deals/components/HighConvictionBadge';
import { deals } from '@/lib/mockData';
import { buildMetadata } from '@/lib/seo';
import { toSlug } from '@/lib/utils';

/**
 * Metadata for deals page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Deals Board', description: 'Ranked high-conviction deal board.', path: '/deals' });
}

/**
 * Deals board view.
 * @returns {JSX.Element} Deals page.
 */
export default function DealsPage() {
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Deals' }]} />
      <h1 className="text-3xl font-extrabold">Deal Board</h1>
      <DealFilters items={['Budget', 'Conviction', 'Location', 'Risk']} />
      <div className="grid gap-4 lg:grid-cols-3">
        <DealCard items={deals.slice(0, 6).map((deal) => `${deal.title} · Score ${deal.dealScore}`)} />
        <DealScoreGauge items={deals.slice(0, 4).map((deal) => `${deal.id}: ${deal.dealScore}`)} />
        <HighConvictionBadge items={deals.filter((deal) => deal.dealScore > 85).map((deal) => deal.title)} />
      </div>
      <DealComparison items={deals.slice(0, 5).map((deal) => `${deal.title} vs fair value ₹${deal.fairValue.toLocaleString('en-IN')}`)} />
      <DealTimeline items={deals.slice(0, 5).map((deal) => `${new Date(deal.detectedAt).toLocaleDateString('en-IN')} - ${deal.title}`)} />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {deals.slice(0, 9).map((deal) => (
          <div key={deal.id} className="rounded-lg border border-surface-700 p-3 text-sm">
            <Link href={`/deals/${deal.id}`} className="font-semibold hover:text-primary-400">
              {deal.title}
            </Link>
            <Link href={`/micro-locations/${toSlug(deal.microLocation)}`} className="mt-2 block text-xs text-primary-400">
              {deal.microLocation}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
