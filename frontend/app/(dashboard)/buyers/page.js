/**
 * @file Buyers dashboard page.
 */

import Link from 'next/link';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import BuyerTable from '@/app/(dashboard)/buyers/components/BuyerTable';
import BuyerFilters from '@/app/(dashboard)/buyers/components/BuyerFilters';
import DemandHeatmap from '@/app/(dashboard)/buyers/components/DemandHeatmap';
import BuyerMatchCard from '@/app/(dashboard)/buyers/components/BuyerMatchCard';
import ConversionPipeline from '@/app/(dashboard)/buyers/components/ConversionPipeline';
import BuyerForm from '@/app/(dashboard)/buyers/components/BuyerForm';
import { buyers } from '@/lib/mockData';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for buyers page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Buyers', description: 'Buyer demand dashboard and conversion pipeline.', path: '/buyers' });
}

/**
 * Buyers page.
 * @returns {JSX.Element} Buyers dashboard.
 */
export default function BuyersPage() {
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Buyers' }]} />
      <h1 className="text-3xl font-extrabold">Buyer Demand Dashboard</h1>
      <BuyerFilters items={['Budget', 'Stage', 'Source', 'Location']} />
      <div className="grid gap-4 xl:grid-cols-3">
        <BuyerTable items={buyers.map((buyer) => `${buyer.name} · ${buyer.stage}`)} />
        <DemandHeatmap items={buyers.map((buyer) => `${buyer.preferredLocations[0]}: score ${buyer.score}`)} />
        <BuyerMatchCard items={buyers.slice(0, 4).map((buyer) => `${buyer.name} ↔ matching deals available`)} />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <ConversionPipeline items={['new: 122', 'qualified: 67', 'site_visit: 29', 'negotiation: 12', 'closed: 5']} />
        <BuyerForm />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {buyers.map((buyer) => (
          <Link key={buyer.id} href={`/buyers/${buyer.id}`} className="rounded-lg border border-surface-700 p-3 text-sm hover:border-primary-500">
            {buyer.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
