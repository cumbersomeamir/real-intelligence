/**
 * @file Landing page for LuckNow PropIntel.
 */

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import JsonLd from '@/components/common/JsonLd';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { microLocations, trustStats } from '@/lib/mockData';

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
 * @returns {JSX.Element} Homepage content.
 */
export default function HomePage() {
  const topLocations = microLocations.slice(0, 6);

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
          breadcrumbJsonLd([
            { name: 'Home', item: 'https://lucknowpropintel.com/' }
          ])
        ]}
      />

      <section className="mesh-bg text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-20 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Lucknow&apos;s First AI-Powered Property Intelligence Engine
            </h1>
            <p className="mt-4 max-w-2xl text-base text-surface-100 md:text-lg">
              Stop guessing. Start investing with data. Our ML algorithms analyze 10,000+ properties daily to surface undervalued deals, growth hotspots, and investment-grade opportunities across Lucknow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/map" className="rounded-lg bg-accent-400 px-5 py-3 text-sm font-semibold text-surface-900">
                Explore the Map
              </Link>
              <Link href="/deals" className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold">
                View Today&apos;s Top Deals
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-widest text-accent-200">Live Intelligence Preview</p>
            <div className="mt-4 grid gap-3">
              {[
                'AI Deal Scoring: Active',
                'ScraperAgent Status: Running',
                'New listings ingested: 1,284',
                'High conviction alerts sent: 42'
              ].map((line) => (
                <div key={line} className="rounded-lg bg-white/10 px-3 py-2 text-sm">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-3 rounded-2xl border border-surface-200 bg-white p-4 md:grid-cols-4">
          {trustStats.map((item) => (
            <p key={item} className="text-center text-sm font-semibold text-surface-700">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <h3 className="text-lg font-semibold">We Aggregate</h3>
            <p className="mt-2 text-sm text-surface-600">Our AI scrapes 6+ property platforms, government records, and infrastructure data every 6 hours. No listing escapes our radar.</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">We Analyze</h3>
            <p className="mt-2 text-sm text-surface-600">Machine learning models compute fair value, growth potential, liquidity, and risk for every property. Each listing gets a composite Deal Score.</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">We Alert</h3>
            <p className="mt-2 text-sm text-surface-600">High-conviction deals are flagged instantly. Matched to buyer preferences. Delivered via WhatsApp within minutes of detection.</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">You Profit</h3>
            <p className="mt-2 text-sm text-surface-600">Make data-backed investment decisions. Access micro-location intelligence that was previously available only to institutional investors.</p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-3xl font-bold">Feature Highlights</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ['AI Deal Scoring', 'Every property gets a composite score based on discount vs. fair value, growth potential, liquidity, and legal safety. Only the top deals make our board.'],
            ['Interactive Intelligence Map', 'Visualize undervaluation heatmaps, filter by budget, property type, or growth score. Click any marker for full analytics.'],
            ['Micro-Location Intelligence', 'Deep analysis of 50+ Lucknow neighborhoods. Price trends, infrastructure pipeline, developer presence, rental yields — all in one view.'],
            ['Autonomous AI Agents', '8 specialized agents work 24/7: scraping, valuing, detecting deals, matching buyers, generating content, and monitoring system health.'],
            ['WhatsApp Deal Alerts', 'Get high-conviction deals delivered to your WhatsApp the moment they’re detected. Include site visit scheduling and automated follow-up.'],
            ['Premium Reports', 'Institutional-grade Investment Thesis Reports for any micro-location. Perfect for HNI investors and NRI decision-making.']
          ].map(([title, text]) => (
            <Card key={title}>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm text-surface-600">{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Trending Locations in Lucknow</h2>
            <p className="mt-2 text-sm text-surface-600">Growth score, pricing and momentum across top zones.</p>
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
              <Link href={`/micro-locations/${location.slug}`} className="mt-4 inline-block text-sm font-semibold text-primary-600">
                Explore
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            'I was about to overpay by ₹15L on a flat in Gomti Nagar. PropIntel showed me the fair value and I negotiated a 12% discount. — Sample Investor',
            'The micro-location reports are gold. I identified Shaheed Path as a growth zone 6 months before prices jumped 22%. — Sample NRI Investor',
            'Getting WhatsApp alerts for deals matching my criteria saves me hours of browsing. Closed 2 deals in 3 months. — Sample Buyer'
          ].map((quote) => (
            <Card key={quote}>
              <p className="text-sm text-surface-700">{quote}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8">
        <Card className="bg-primary-500 text-white">
          <h2 className="text-3xl font-bold">Ready to Invest Smarter?</h2>
          <p className="mt-2 text-sm text-primary-100">Join 500+ Lucknow investors who rely on data, not gut feeling.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-lg bg-accent-400 px-5 py-3 text-sm font-semibold text-surface-900">
              Get Started Free
            </Link>
            <Link href="/contact" className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold">
              Talk to an Expert
            </Link>
          </div>
        </Card>
      </section>
    </main>
  );
}
