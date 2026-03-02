/**
 * @file Investment disclaimer page.
 */

import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/common/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

/**
 * Metadata for disclaimer page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: 'Investment Disclaimer',
    description: 'Important risk and advisory disclaimer for property investment intelligence.',
    path: '/legal/disclaimer'
  });
}

/**
 * Disclaimer content page.
 * @returns {JSX.Element} Disclaimer page.
 */
export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: 'https://lucknowpropintel.com/' },
          { name: 'Disclaimer', item: 'https://lucknowpropintel.com/legal/disclaimer' }
        ])}
      />
      <h1 className="text-4xl font-extrabold">Investment Disclaimer</h1>
      <p className="mt-4 text-sm leading-7 text-surface-700">
        LuckNow PropIntel provides data analysis and investment intelligence. We are not registered real estate agents. All property investments carry risk. Past performance is not indicative of future results. AI-generated insights are probabilistic and must be validated independently before making financial decisions.
      </p>
    </main>
  );
}
