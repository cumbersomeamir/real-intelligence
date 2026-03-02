/**
 * @file Properties listing page.
 */

import PropertiesClient from '@/app/(dashboard)/properties/PropertiesClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for properties page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Properties', description: 'All properties with filters and valuation intelligence.', path: '/properties' });
}

/**
 * Properties page wrapper.
 * @returns {JSX.Element}
 */
export default function PropertiesPage() {
  return <PropertiesClient />;
}
