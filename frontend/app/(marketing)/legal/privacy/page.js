/**
 * @file Privacy policy page.
 */

import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/common/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

/**
 * Metadata for privacy page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: 'Privacy Policy',
    description: 'How LuckNow PropIntel collects, uses, and protects user data.',
    path: '/legal/privacy'
  });
}

/**
 * Privacy policy content.
 * @returns {JSX.Element} Policy page.
 */
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: 'https://lucknowpropintel.com/' },
          { name: 'Privacy', item: 'https://lucknowpropintel.com/legal/privacy' }
        ])}
      />
      <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
      <p className="mt-4 text-sm leading-7 text-surface-700">
        We collect account details, interaction logs, and configured preferences to deliver property intelligence features such as deal alerts, buyer matching, and portfolio tracking. Data is encrypted at rest and in transit. We do not sell personal data. Access is role-restricted and audited. You can request data export or deletion by contacting hello@lucknowpropintel.com.
      </p>
    </main>
  );
}
