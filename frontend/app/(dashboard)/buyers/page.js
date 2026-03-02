/**
 * @file Buyers dashboard page.
 */

import BuyersClient from '@/app/(dashboard)/buyers/BuyersClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for buyers page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Buyers', description: 'Buyer demand dashboard and conversion pipeline.', path: '/buyers' });
}

/**
 * Buyers page wrapper.
 * @returns {JSX.Element}
 */
export default function BuyersPage() {
  return <BuyersClient />;
}
