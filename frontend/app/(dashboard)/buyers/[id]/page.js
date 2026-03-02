/**
 * @file Buyer profile page.
 */

import { notFound } from 'next/navigation';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import { buyers } from '@/lib/mockData';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for buyer profile page.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const buyer = buyers.find((item) => item.id === id);
  if (!buyer) return buildMetadata({ title: 'Buyer not found', description: 'Buyer record not found.', path: '/buyers' });
  return buildMetadata({ title: `${buyer.name} | Buyer Profile`, description: `Buyer stage ${buyer.stage}`, path: `/buyers/${id}` });
}

/**
 * Static params for buyer profile routes.
 * @returns {Array<{id:string}>} Params.
 */
export async function generateStaticParams() {
  return buyers.map((buyer) => ({ id: buyer.id }));
}

/**
 * Buyer profile page.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<JSX.Element>} Buyer profile.
 */
export default async function BuyerDetailPage({ params }) {
  const { id } = await params;
  const buyer = buyers.find((item) => item.id === id);
  if (!buyer) notFound();

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Buyers', href: '/buyers' }, { label: buyer.name }]} />
      <h1 className="text-3xl font-extrabold">{buyer.name}</h1>
      <Card>
        <p>Source: {buyer.source}</p>
        <p>Stage: {buyer.stage}</p>
        <p>Lead score: {buyer.score}</p>
        <p>Budget: ₹{buyer.budgetMin.toLocaleString('en-IN')} to ₹{buyer.budgetMax.toLocaleString('en-IN')}</p>
        <p>Preferred locations: {buyer.preferredLocations.join(', ')}</p>
      </Card>
    </section>
  );
}
