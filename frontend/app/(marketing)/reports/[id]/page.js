/**
 * @file Dynamic premium report preview page.
 */

import { notFound } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/common/JsonLd';
import { reports } from '@/lib/mockData';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

/**
 * Generates metadata for report detail.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Route params.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const report = reports.find((item) => item.id === id);
  if (!report) return buildMetadata({ title: 'Report not found', description: 'Report was not found.', path: '/reports' });
  return buildMetadata({
    title: `${report.title} | Report Preview`,
    description: report.summary,
    path: `/reports/${report.id}`
  });
}

/**
 * Generates static params for report pages.
 * @returns {Array<{id:string}>} Params.
 */
export async function generateStaticParams() {
  return reports.map((report) => ({ id: report.id }));
}

/**
 * Renders report detail page.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params promise.
 * @returns {Promise<JSX.Element>} Detail page.
 */
export default async function ReportDetailPage({ params }) {
  const { id } = await params;
  const report = reports.find((item) => item.id === id);
  if (!report) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: report.title,
            description: report.summary,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: report.price
            }
          },
          breadcrumbJsonLd([
            { name: 'Home', item: 'https://lucknowpropintel.com/' },
            { name: 'Reports', item: 'https://lucknowpropintel.com/reports' },
            { name: report.title, item: `https://lucknowpropintel.com/reports/${report.id}` }
          ])
        ]}
      />
      <h1 className="text-4xl font-extrabold">{report.title}</h1>
      <p className="mt-3 text-surface-600">{report.summary}</p>
      <Card className="mt-6">
        <h2 className="text-xl font-bold">Sample Preview</h2>
        <p className="mt-2 text-sm text-surface-600">
          This preview includes methodology, scenario assumptions, and high-level micro-location ranking. Full version includes valuation spreads, downside-risk map, and deal watchlist.
        </p>
        <p className="mt-4 text-sm font-semibold">Price: ₹{report.price.toLocaleString('en-IN')}</p>
        <Button className="mt-4">Purchase Report</Button>
      </Card>
    </main>
  );
}
