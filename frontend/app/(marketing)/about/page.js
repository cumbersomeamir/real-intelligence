/**
 * @file About page.
 */

import Card from '@/components/ui/Card';
import JsonLd from '@/components/common/JsonLd';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

/**
 * Metadata for about page.
 * @returns {Promise<import('next').Metadata>} Metadata payload.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: "We're Building Lucknow's Data Moat",
    description:
      "Property investment in Lucknow has always been opaque, fragmented, and driven by insider relationships. We're changing that with AI, data science, and radical transparency.",
    path: '/about'
  });
}

/**
 * Renders about page.
 * @returns {JSX.Element} About content.
 */
export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: 'https://lucknowpropintel.com/' },
          { name: 'About', item: 'https://lucknowpropintel.com/about' }
        ])}
      />
      <h1 className="text-4xl font-extrabold">We&apos;re Building Lucknow&apos;s Data Moat</h1>
      <p className="mt-4 max-w-3xl text-surface-600">
        Property investment in Lucknow has always been opaque, fragmented, and driven by insider relationships. We&apos;re changing that with AI, data science, and radical transparency.
      </p>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-bold">Mission</h2>
          <p className="mt-2 text-sm text-surface-600">
            Our mission is to democratize property intelligence. To give every investor — whether investing ₹20L or ₹20Cr — access to the same caliber of analysis that institutional real estate funds use.
          </p>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold">Vision</h2>
          <p className="mt-2 text-sm text-surface-600">
            To become India&apos;s most trusted property intelligence platform, starting with Lucknow and expanding to every Tier-2 and Tier-3 city where data can create investment alpha.
          </p>
        </Card>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">What Makes Us Different</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="text-xl font-semibold">Data, Not Opinions</h3>
            <p className="mt-2 text-sm text-surface-600">Every recommendation is backed by ML models trained on 100,000+ data points. We show you the math.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold">Always On</h3>
            <p className="mt-2 text-sm text-surface-600">8 AI agents work 24/7. Properties are scored within hours of being listed. Deals are detected in real-time.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold">Full Stack Intelligence</h3>
            <p className="mt-2 text-sm text-surface-600">We don&apos;t just aggregate listings. We compute fair values, predict growth, assess risk, check legal compliance, and match you with opportunities.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold">Lucknow Native</h3>
            <p className="mt-2 text-sm text-surface-600">Built by people who understand Lucknow&apos;s micro-markets, builder landscape, and infrastructure trajectory. Not a generic platform with a Lucknow filter.</p>
          </Card>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">Team</h2>
        <p className="mt-2 text-sm text-surface-600">
          Founded by real estate investors and AI engineers who were frustrated with the lack of data in Lucknow&apos;s property market.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {['Sample Founder', 'Sample Data Scientist', 'Sample Market Lead'].map((name) => (
            <Card key={name}>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-surface-500">Role placeholder with LinkedIn profile.</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="text-lg font-semibold">Phase 1: Data Foundation</h3>
          <p className="mt-1 text-sm text-surface-600">Scraping, ML models, map view</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Phase 2: Intelligence Layer</h3>
          <p className="mt-1 text-sm text-surface-600">Deal scoring, buyer matching, automation</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Phase 3: Platform Scale</h3>
          <p className="mt-1 text-sm text-surface-600">Membership, reports, API access, city expansion</p>
        </Card>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-5">
        {['10,000+ Properties Tracked', '50+ Micro-Locations', '8 AI Agents', '6h Data Refresh', '₹500Cr+ Deals Identified'].map((item) => (
          <Card key={item} className="text-center">
            <p className="text-sm font-semibold">{item}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
