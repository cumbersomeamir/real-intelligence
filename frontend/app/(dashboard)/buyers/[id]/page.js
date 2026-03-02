/**
 * @file Buyer profile page.
 */

import BuyerDetailClient from '@/app/(dashboard)/buyers/[id]/BuyerDetailClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for buyer profile page.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  return buildMetadata({ title: `Buyer ${id}`, description: 'Buyer profile and deal matches.', path: `/buyers/${id}` });
}

/**
 * Buyer detail wrapper.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<JSX.Element>} Detail view.
 */
export default async function BuyerDetailPage({ params }) {
  const { id } = await params;
  return <BuyerDetailClient id={id} />;
}
