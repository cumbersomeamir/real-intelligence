/**
 * @file Dynamic micro-location detail page.
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card from '@/components/ui/Card';
import JsonLd from '@/components/common/JsonLd';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import { getMicroLocationDetailPayload, getMicroLocations } from '@/lib/dataClient';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

/**
 * Dynamic page metadata.
 * @param {Object} props - Route props.
 * @param {Promise<{slug:string}>} props.params - Route params.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { location } = await getMicroLocationDetailPayload(slug);

  if (!location) {
    return buildMetadata({ title: 'Location not found', description: 'Requested location not found', path: '/micro-locations' });
  }

  return buildMetadata({
    title: `${location.name} Property Analysis | LuckNow PropIntel`,
    description: `Real-time property intelligence for ${location.name}, Lucknow. Price trends, growth score ${location.growthScore}/100, investment analysis, and undervalued deals.`,
    path: `/micro-locations/${slug}`
  });
}

/**
 * Generates static params for location pages.
 * @returns {Promise<Array<{slug:string}>>} Static route params.
 */
export async function generateStaticParams() {
  const locations = await getMicroLocations();
  return locations.map((location) => ({ slug: location.slug }));
}

/**
 * Renders location intelligence report page.
 * @param {Object} props - Route props.
 * @param {Promise<{slug:string}>} props.params - Params promise.
 * @returns {Promise<JSX.Element>} Detail page.
 */
export default async function MicroLocationDetailPage({ params }) {
  const { slug } = await params;
  const { location, related, topDeals } = await getMicroLocationDetailPayload(slug);

  if (!location) notFound();

  const trendSeries = [
    { name: '30D', value: Number(location.trend30d || 0) },
    { name: '90D', value: Number(location.trend90d || 0) },
    { name: '1Y', value: Number(location.trend1y || 0) }
  ];

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_280px]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: 'https://lucknowpropintel.com/' },
          { name: 'Micro-Locations', item: 'https://lucknowpropintel.com/micro-locations' },
          { name: location.name, item: `https://lucknowpropintel.com/micro-locations/${slug}` }
        ])}
      />
      <article>
        <h1 className="text-4xl font-extrabold">{location.name} — Property Intelligence Report</h1>
        <section className="mt-6 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {[
            ['Avg ₹/sqft', location.avgPricePerSqft],
            ['Growth Score', location.growthScore],
            ['Liquidity Score', location.liquidityScore],
            ['Risk Score', location.riskScore],
            ['Active Listings', location.activeListings],
            ['Circle Rate', `₹${location.circleRate}`]
          ].map(([label, value]) => (
            <Card key={label} className="p-4">
              <p className="text-xs uppercase tracking-wide text-surface-500">{label}</p>
              <p className="mt-1 font-mono text-xl font-bold">{value}</p>
            </Card>
          ))}
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-bold">Price Trend Velocity</h2>
            <LineChart data={trendSeries} />
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Deal Density</h2>
            <BarChart
              data={topDeals.map((deal, index) => ({
                name: `D${index + 1}`,
                value: Number(deal.dealScore || 0)
              }))}
            />
          </Card>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Infrastructure Timeline</h2>
          <div className="mt-4 grid gap-3">
            {(location.infrastructureTimeline || []).map((item) => (
              <Card key={`${item.year}-${item.item}`} className="p-4">
                <p className="text-xs uppercase tracking-wide text-primary-500">
                  {item.year} · {item.status}
                </p>
                <p className="mt-1 text-sm">{item.item}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Developer Presence</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-surface-200">
            <table className="min-w-full text-sm">
              <thead className="bg-surface-50">
                <tr>
                  <th className="px-4 py-3 text-left">Builder</th>
                  <th className="px-4 py-3 text-left">Projects</th>
                  <th className="px-4 py-3 text-left">Avg Rating</th>
                </tr>
              </thead>
              <tbody>
                {(location.developers || []).map((dev) => (
                  <tr key={dev.name} className="border-t border-surface-200">
                    <td className="px-4 py-3">{dev.name}</td>
                    <td className="px-4 py-3">{dev.projects}</td>
                    <td className="px-4 py-3">{dev.avgRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Top Current Deals</h2>
          <div className="mt-4 grid gap-3">
            {topDeals.map((deal) => (
              <Card key={deal.id} className="p-4">
                <h3 className="text-lg font-semibold">{deal.title}</h3>
                <p className="mt-1 text-sm text-surface-600">
                  Deal Score: {deal.dealScore} · Discount: {deal.discountPercent}% · Price: ₹{deal.price.toLocaleString('en-IN')}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Location Outlook</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-surface-700">{location.longDescription}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-4 grid gap-3">
            {(location.faq || []).map((item) => (
              <Card key={item.q} className="p-4">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-1 text-sm text-surface-600">{item.a}</p>
              </Card>
            ))}
          </div>
        </section>

        <Link href="/settings" className="mt-8 inline-flex rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-white">
          Set alert for deals in {location.name}
        </Link>
      </article>

      <aside>
        <Card>
          <h2 className="text-lg font-bold">Related Locations</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {(related || []).map((item) => (
              <li key={item.slug}>
                <Link href={`/micro-locations/${item.slug}`} className="text-primary-600">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </aside>
    </main>
  );
}
