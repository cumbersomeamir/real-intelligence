/**
 * @file Landing page for LuckNow PropIntel.
 */

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import JsonLd from '@/components/common/JsonLd';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { getHomePayload } from '@/lib/dataClient';

/**
 * Dynamic metadata for landing page.
 * @returns {Promise<import('next').Metadata>} Page metadata.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: "Lucknow's First AI-Powered Property Intelligence Engine",
    description:
      'Stop guessing. Start investing with data. Our ML algorithms analyze 10,000+ properties daily to surface undervalued deals, growth hotspots, and investment-grade opportunities across Lucknow.',
    keywords: ['Lucknow property intelligence', 'AI property deals', 'Lucknow real estate analytics'],
    path: '/'
  });
}

/**
 * Renders landing page.
 * @returns {Promise<JSX.Element>} Homepage content.
 */
export default async function HomePage() {
  const payload = await getHomePayload();
  const topLocations = payload.topLocations || [];

  return (
    <main className="light-mesh">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'LuckNow PropIntel',
            url: 'https://lucknowpropintel.com',
            slogan: "Lucknow's Data Moat for Smart Property Investors"
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'LuckNow PropIntel',
            url: 'https://lucknowpropintel.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://lucknowpropintel.com/micro-locations?search={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          },
          breadcrumbJsonLd([{ name: 'Home', item: 'https://lucknowpropintel.com/' }])
        ]}
      />

      <section className="mesh-bg text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-20 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Lucknow&apos;s First AI-Powered Property Intelligence Engine
            </h1>
            <p className="mt-4 max-w-2xl text-base text-surface-100 md:text-lg">
              Stop guessing. Start investing with data. Track pricing momentum, detect undervaluation, and capture high-conviction opportunities before the broader market reacts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/map" className="rounded-lg bg-accent-400 px-5 py-3 text-sm font-semibold text-surface-900">
                Explore the Map
              </Link>
              <Link href="/deals" className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold">
                Open Deal Board
              </Link>
            </div>
          </div>

          <Card className="border-white/20 bg-white/10 text-white">
            <p className="text-sm uppercase tracking-widest text-accent-200">Live Intelligence Snapshot</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white/10 px-3 py-2">
                <p className="text-xs text-surface-200">Tracked Properties</p>
                <p className="mt-1 text-xl font-bold">{Number(payload.trackedProperties || 0).toLocaleString('en-IN')}</p>
              </div>
              <div className="rounded-lg bg-white/10 px-3 py-2">
                <p className="text-xs text-surface-200">High Conviction Deals</p>
                <p className="mt-1 text-xl font-bold">{Number(payload.activeDeals || 0).toLocaleString('en-IN')}</p>
              </div>
              <div className="rounded-lg bg-white/10 px-3 py-2">
                <p className="text-xs text-surface-200">Active Buyers</p>
                <p className="mt-1 text-xl font-bold">{Number(payload.activeBuyers || 0).toLocaleString('en-IN')}</p>
              </div>
              <div className="rounded-lg bg-white/10 px-3 py-2">
                <p className="text-xs text-surface-200">Avg Deal Score</p>
                <p className="mt-1 text-xl font-bold">{payload.avgDealScore}/100</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-3 rounded-2xl border border-surface-200 bg-white p-4 md:grid-cols-4">
          {(payload.trustStats || []).map((item) => (
            <p key={item} className="text-center text-sm font-semibold text-surface-700">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Trending Locations in Lucknow</h2>
            <p className="mt-2 text-sm text-surface-600">Ranked by growth, liquidity, and active listing momentum.</p>
          </div>
          <Link href="/micro-locations" className="text-sm font-semibold text-primary-600">View all locations</Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topLocations.map((location) => (
            <Card key={location.slug}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{location.name}</h3>
                <Badge variant={location.growthScore > 80 ? 'success' : 'warning'}>{location.growthScore}/100</Badge>
              </div>
              <p className="mt-2 text-sm text-surface-600">Avg price: ₹{location.avgPricePerSqft}/sqft</p>
              <p className="mt-1 text-sm text-profit-600">30d trend: +{location.trend30d}%</p>
              <p className="mt-1 text-sm text-surface-600">Active listings: {location.activeListings}</p>
              <Link href={`/micro-locations/${location.slug}`} className="mt-4 inline-block text-sm font-semibold text-primary-600">
                Explore
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8">
        <Card className="bg-primary-500 text-white">
          <h2 className="text-3xl font-bold">Ready to Invest Smarter?</h2>
          <p className="mt-2 text-sm text-primary-100">Join data-led investors and build your edge with live market intelligence.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-lg bg-accent-400 px-5 py-3 text-sm font-semibold text-surface-900">
              Get Started
            </Link>
            <Link href="/contact" className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold">
              Talk to Team
            </Link>
          </div>
        </Card>
      </section>
    </main>
  );
}
