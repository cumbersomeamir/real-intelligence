/**
 * @file Property detail page.
 */

import { notFound } from 'next/navigation';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import PropertyDetail from '@/app/(dashboard)/properties/components/PropertyDetail';
import ProximityMap from '@/app/(dashboard)/properties/components/ProximityMap';
import ImageGallery from '@/app/(dashboard)/properties/components/ImageGallery';
import ContactSeller from '@/app/(dashboard)/properties/components/ContactSeller';
import { properties } from '@/lib/mockData';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for property detail.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = properties.find((item) => item.id === id);
  if (!property) return buildMetadata({ title: 'Property not found', description: 'Requested property does not exist.', path: '/properties' });
  return buildMetadata({ title: `${property.title} | Property Detail`, description: `${property.microLocation} · ₹${property.price.toLocaleString('en-IN')}`, path: `/properties/${id}` });
}

/**
 * Static params for property routes.
 * @returns {Array<{id:string}>} Params.
 */
export async function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

/**
 * Property detail view.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<JSX.Element>} Detail page.
 */
export default async function PropertyDetailPage({ params }) {
  const { id } = await params;
  const property = properties.find((item) => item.id === id);
  if (!property) notFound();

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Properties', href: '/properties' }, { label: property.id }]} />
      <h1 className="text-3xl font-extrabold">{property.title}</h1>
      <PropertyDetail items={[`Price: ₹${property.price.toLocaleString('en-IN')}`, `Area: ${property.area} sqft`, `Deal Score: ${property.dealScore}`]} />
      <div className="grid gap-4 lg:grid-cols-3">
        <ImageGallery items={property.images} />
        <ProximityMap items={[`Micro-location: ${property.microLocation}`, 'Metro: 2.4 km', 'Hospital: 1.8 km']} />
        <ContactSeller items={['Request callback', 'Schedule site visit', 'WhatsApp seller']} />
      </div>
    </section>
  );
}
