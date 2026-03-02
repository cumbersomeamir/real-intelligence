/**
 * @file Deals board page.
 */

import DealsClient from '@/app/(dashboard)/deals/DealsClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for deals page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Deals Board', description: 'Ranked high-conviction deal board.', path: '/deals' });
}

/**
 * Deals page wrapper.
 * @returns {JSX.Element}
 */
export default function DealsPage() {
  return <DealsClient />;
}
