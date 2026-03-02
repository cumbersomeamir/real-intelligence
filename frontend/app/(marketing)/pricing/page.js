/**
 * @file Pricing page.
 */

import Card from '@/components/ui/Card';
import JsonLd from '@/components/common/JsonLd';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import Link from 'next/link';

/**
 * Metadata for pricing page.
 * @returns {Promise<import('next').Metadata>} Metadata object.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: 'Intelligence for Every Investor',
    description:
      'From casual homebuyers to serious investors, choose the plan that matches your ambition.',
    path: '/pricing'
  });
}

/**
 * Pricing page UI.
 * @returns {JSX.Element} Pricing content.
 */
export default function PricingPage() {
  const faq = [
    [
      'Is this a brokerage?',
      'No. We are a data intelligence platform. We provide analysis, not intermediary services. When a deal closes through our platform, we may earn a commission from the seller/developer, not the buyer.'
    ],
    [
      'How accurate is the AI valuation?',
      'Our fair value model has a median error of ±8% based on backtesting against actual transaction prices. We always show the confidence score alongside the estimate.'
    ],
    [
      'What data sources do you use?',
      'We aggregate from 99acres, MagicBricks, Housing.com, OLX, Facebook Marketplace, local builder sites, UP RERA, municipal records, circle rate data, Google Maps, and infrastructure tender documents.'
    ],
    ['Can I cancel anytime?', 'Yes. All subscriptions are annual but come with a 30-day money-back guarantee.'],
    ['Is my data secure?', "Yes. We use industry-standard encryption, don't store payment information, and never share your data with third parties."],
    [
      'Do you cover areas outside Lucknow?',
      'Currently, we focus exclusively on Lucknow and surrounding areas (Kanpur Road, Sultanpur Road, Raebareli Road corridors). City expansion is on our roadmap.'
    ],
    [
      "What is a 'High Conviction Deal'?",
      'A property where our Deal Score exceeds 85/100, indicating strong discount vs. fair value, high growth potential, good liquidity, and low legal risk. These are auto-flagged daily.'
    ],
    [
      'How do I get WhatsApp alerts?',
      'Subscribe to Pro or Elite, verify your WhatsApp number in settings, and configure your alert preferences (budget, locations, property types). Our system will send matched deals directly.'
    ]
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'LuckNow PropIntel Subscription',
            category: 'Property Intelligence SaaS'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(([q, a]) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a }
            }))
          },
          breadcrumbJsonLd([
            { name: 'Home', item: 'https://lucknowpropintel.com/' },
            { name: 'Pricing', item: 'https://lucknowpropintel.com/pricing' }
          ])
        ]}
      />
      <h1 className="text-4xl font-extrabold">Intelligence for Every Investor</h1>
      <p className="mt-3 text-surface-600">From casual homebuyers to serious investors, choose the plan that matches your ambition.</p>

      <section className="mt-8 overflow-x-auto">
        <table className="min-w-full rounded-xl border border-surface-200 text-left text-sm">
          <thead className="bg-surface-50">
            <tr>
              {['Feature', 'Free', 'Pro (₹10,000/yr)', 'Elite (₹50,000/yr)'].map((head) => (
                <th key={head} className="px-4 py-3 font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Map view', 'Basic (limited filters)', 'Full access', 'Full access'],
              ['Deal board', 'Top 3 daily', 'Unlimited', 'Unlimited + early access (30 min)'],
              ['Micro-location pages', '5 free', 'All 50+', 'All 50+ with deep analytics'],
              ['AI deal alerts (WhatsApp)', 'None', '5/week', 'Unlimited + instant'],
              ['Property comparisons', '2/day', 'Unlimited', 'Unlimited'],
              ['Premium reports', 'Purchase individually', '2 free/year', '6 free/year'],
              ['AI chat assistant', 'None', 'Basic queries', 'Unlimited + portfolio advice'],
              ['API access', 'None', 'None', '1,000 calls/month'],
              ['Data export', 'None', 'CSV', 'CSV + PDF + API'],
              ['Priority support', 'None', 'Email (48h)', 'WhatsApp + dedicated (4h)'],
              ['Weekly intelligence brief', 'None', 'Email', 'Email + WhatsApp'],
              ['Portfolio tracker', 'None', 'Yes', 'Yes + ROI alerts']
            ].map((row) => (
              <tr key={row[0]} className="border-t border-surface-200">
                {row.map((cell) => (
                  <td key={cell} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {faq.map(([question, answer]) => (
            <Card key={question}>
              <h3 className="text-lg font-semibold">{question}</h3>
              <p className="mt-2 text-sm text-surface-600">{answer}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-xl bg-primary-500 p-8 text-white">
        <h2 className="text-3xl font-bold">Start today</h2>
        <p className="mt-2 text-sm text-primary-100">Choose a plan and activate your data edge.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/register" className="rounded-lg bg-accent-400 px-4 py-2 text-sm font-semibold text-surface-900">
            Start Free
          </Link>
          <Link href="/register" className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold">
            Go Pro
          </Link>
          <Link href="/contact" className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold">
            Contact Sales for Enterprise
          </Link>
        </div>
      </section>
    </main>
  );
}
