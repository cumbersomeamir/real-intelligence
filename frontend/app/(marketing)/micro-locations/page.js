/**
 * @file Micro-locations listing page.
 */

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import JsonLd from '@/components/common/JsonLd';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { getMicroLocations } from '@/lib/dataClient';

/**
 * Metadata for micro-locations index.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: '50+ Lucknow Micro-Locations, Analyzed',
    description: 'Every neighborhood scored for growth, liquidity, and investment potential. Updated daily.',
    path: '/micro-locations'
  });
}

/**
 * Renders micro-location listing.
 * @returns {Promise<JSX.Element>} Listing page.
 */
export default async function MicroLocationsPage() {
  const microLocations = await getMicroLocations();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: 'https://lucknowpropintel.com/' },
          { name: 'Micro-Locations', item: 'https://lucknowpropintel.com/micro-locations' }
        ])}
      />
      <h1 className="text-4xl font-extrabold">50+ Lucknow Micro-Locations, Analyzed</h1>
      <p className="mt-3 text-surface-600">Every neighborhood scored for growth, liquidity, and investment potential. Updated daily.</p>
      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {microLocations.map((location) => (
          <Card key={location.slug}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{location.name}</h2>
              <Badge variant={location.growthScore >= 80 ? 'success' : 'warning'}>{location.growthScore}</Badge>
            </div>
            <p className="mt-2 text-sm text-surface-600">Avg ₹/sqft: {location.avgPricePerSqft}</p>
            <p className="text-sm text-profit-600">30d trend: +{location.trend30d}%</p>
            <p className="text-sm text-surface-600">Active listings: {location.activeListings}</p>
            <p className="text-sm text-surface-600">Key infra: {location.keyInfra}</p>
            <Link href={`/micro-locations/${location.slug}`} className="mt-4 inline-block text-sm font-semibold text-primary-600">
              Explore →
            </Link>
          </Card>
        ))}
      </section>
    </main>
  );
}
