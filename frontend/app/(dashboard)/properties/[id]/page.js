/**
 * @file Property detail page.
 */

import PropertyDetailClient from '@/app/(dashboard)/properties/[id]/PropertyDetailClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for property detail.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  return buildMetadata({ title: `Property ${id}`, description: 'Property detail with valuation and history.', path: `/properties/${id}` });
}

/**
 * Property detail wrapper.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<JSX.Element>} Detail page.
 */
export default async function PropertyDetailPage({ params }) {
  const { id } = await params;
  return <PropertyDetailClient id={id} />;
}
