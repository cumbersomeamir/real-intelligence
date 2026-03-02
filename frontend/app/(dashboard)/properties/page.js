/**
 * @file Properties listing page.
 */

import Link from 'next/link';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import PropertyGrid from '@/app/(dashboard)/properties/components/PropertyGrid';
import ValuationCard from '@/app/(dashboard)/properties/components/ValuationCard';
import PriceHistory from '@/app/(dashboard)/properties/components/PriceHistory';
import SimilarProperties from '@/app/(dashboard)/properties/components/SimilarProperties';
import { properties } from '@/lib/mockData';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for properties page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Properties', description: 'All properties with filters and valuation intelligence.', path: '/properties' });
}

/**
 * Properties page.
 * @returns {JSX.Element} Property listing.
 */
export default function PropertiesPage() {
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Properties' }]} />
      <h1 className="text-3xl font-extrabold">All Properties</h1>
      <PropertyGrid items={properties.slice(0, 9).map((item) => `${item.title} · ₹${item.price.toLocaleString('en-IN')}`)} />
      <div className="grid gap-4 lg:grid-cols-3">
        <ValuationCard items={properties.slice(0, 3).map((item) => `${item.title} fair value model ready`)} />
        <PriceHistory items={properties.slice(0, 3).map((item) => `${item.title} price changes tracked`)} />
        <SimilarProperties items={properties.slice(0, 3).map((item) => `${item.microLocation} comparable set`)} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {properties.slice(0, 9).map((item) => (
          <Link key={item.id} href={`/properties/${item.id}`} className="rounded-lg border border-surface-700 p-3 text-sm hover:border-primary-500">
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
