/**
 * @file Contact page.
 */

import JsonLd from '@/components/common/JsonLd';
import ContactForm from '@/app/(marketing)/contact/components/ContactForm';
import OfficeMap from '@/app/(marketing)/contact/components/OfficeMap';
import SocialLinks from '@/app/(marketing)/contact/components/SocialLinks';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

/**
 * Metadata for contact page.
 * @returns {Promise<import('next').Metadata>} Metadata object.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: "Let's Talk Property Intelligence",
    description:
      "Whether you're an investor, developer, or just curious — we'd love to hear from you.",
    path: '/contact'
  });
}

/**
 * Contact page content.
 * @returns {JSX.Element} Contact view.
 */
export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'LuckNow PropIntel by TensorBlue',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Lucknow',
              addressRegion: 'Uttar Pradesh',
              addressCountry: 'India'
            },
            telephone: '+91-XXXXXXXXXX',
            email: 'hello@lucknowpropintel.com'
          },
          breadcrumbJsonLd([
            { name: 'Home', item: 'https://lucknowpropintel.com/' },
            { name: 'Contact', item: 'https://lucknowpropintel.com/contact' }
          ])
        ]}
      />
      <h1 className="text-4xl font-extrabold">Let&apos;s Talk Property Intelligence</h1>
      <p className="mt-3 text-surface-600">Whether you&apos;re an investor, developer, or just curious — we&apos;d love to hear from you.</p>
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <ContactForm />
        <div className="space-y-6">
          <OfficeMap />
          <SocialLinks />
        </div>
      </section>
    </main>
  );
}
