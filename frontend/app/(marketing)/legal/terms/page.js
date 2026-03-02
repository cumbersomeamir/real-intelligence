/**
 * @file Terms of service page.
 */

import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/common/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

/**
 * Metadata for terms page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: 'Terms of Service',
    description: 'Usage terms for LuckNow PropIntel products and services.',
    path: '/legal/terms'
  });
}

/**
 * Terms content page.
 * @returns {JSX.Element} Terms page.
 */
export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: 'https://lucknowpropintel.com/' },
          { name: 'Terms', item: 'https://lucknowpropintel.com/legal/terms' }
        ])}
      />
      <h1 className="text-4xl font-extrabold">Terms of Service</h1>
      <p className="mt-4 text-sm leading-7 text-surface-700">
        LuckNow PropIntel provides analytics and decision-support tools. We do not guarantee outcomes, transaction closure, or future price movement. Subscription features and API access are subject to plan limits. Misuse, scraping abuse, or reverse engineering may result in suspension. Payments are processed by authorized gateways. Disputes are subject to Lucknow jurisdiction.
      </p>
    </main>
  );
}
