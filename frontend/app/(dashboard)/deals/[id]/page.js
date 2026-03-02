/**
 * @file Deal detail page.
 */

import { notFound } from 'next/navigation';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import { deals } from '@/lib/mockData';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for deal detail.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const deal = deals.find((item) => item.id === id);
  if (!deal) return buildMetadata({ title: 'Deal not found', description: 'Requested deal does not exist.', path: '/deals' });
  return buildMetadata({ title: `${deal.title} | Deal Detail`, description: `Deal score ${deal.dealScore}`, path: `/deals/${id}` });
}

/**
 * Static params for deal pages.
 * @returns {Array<{id:string}>} Params.
 */
export async function generateStaticParams() {
  return deals.map((deal) => ({ id: deal.id }));
}

/**
 * Deal detail page.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<JSX.Element>} Deal detail.
 */
export default async function DealDetailPage({ params }) {
  const { id } = await params;
  const deal = deals.find((item) => item.id === id);
  if (!deal) notFound();

  return (
    <section className="space-y-5">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Deals', href: '/deals' }, { label: deal.id }]} />
      <h1 className="text-3xl font-extrabold">{deal.title}</h1>
      <Card>
        <p>Deal Score: {deal.dealScore}</p>
        <p>Conviction: {deal.conviction}</p>
        <p>Discount: {deal.discountPercent}%</p>
        <p>Price: ₹{deal.price.toLocaleString('en-IN')}</p>
        <p>Fair Value: ₹{deal.fairValue.toLocaleString('en-IN')}</p>
        <p>Status: {deal.status}</p>
      </Card>
    </section>
  );
}
