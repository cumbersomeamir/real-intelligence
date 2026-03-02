/**
 * @file Reports listing page.
 */

import Link from 'next/link';
import Card from '@/components/ui/Card';
import JsonLd from '@/components/common/JsonLd';
import { reports } from '@/lib/mockData';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

/**
 * Metadata for reports listing.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: 'Premium Investment Reports',
    description: 'Institutional-grade reports for Lucknow micro-locations and investment corridors.',
    path: '/reports'
  });
}

/**
 * Renders report catalog.
 * @returns {JSX.Element} Reports page.
 */
export default function ReportsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'LuckNow PropIntel Premium Reports'
          },
          breadcrumbJsonLd([
            { name: 'Home', item: 'https://lucknowpropintel.com/' },
            { name: 'Reports', item: 'https://lucknowpropintel.com/reports' }
          ])
        ]}
      />
      <h1 className="text-4xl font-extrabold">Premium Reports</h1>
      <p className="mt-3 text-surface-600">Institutional-grade investment intelligence for decisive investors.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id}>
            <h2 className="text-xl font-bold">{report.title}</h2>
            <p className="mt-2 text-sm text-surface-600">{report.summary}</p>
            <p className="mt-2 text-sm font-semibold">{report.pages} pages · ₹{report.price.toLocaleString('en-IN')}</p>
            <Link href={`/reports/${report.id}`} className="mt-4 inline-block text-sm font-semibold text-primary-600">
              Preview report
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
