/**
 * @file Map intelligence page.
 */

import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import MapContainer from '@/app/(dashboard)/map/components/MapContainer';
import HeatmapLayer from '@/app/(dashboard)/map/components/HeatmapLayer';
import PropertyMarker from '@/app/(dashboard)/map/components/PropertyMarker';
import PropertyPanel from '@/app/(dashboard)/map/components/PropertyPanel';
import FilterSidebar from '@/app/(dashboard)/map/components/FilterSidebar';
import MapControls from '@/app/(dashboard)/map/components/MapControls';
import ClusterView from '@/app/(dashboard)/map/components/ClusterView';
import { properties } from '@/lib/mockData';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for map page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Interactive Map', description: 'Property heatmap, filters, and marker intelligence.', path: '/map' });
}

/**
 * Map page view.
 * @returns {JSX.Element} Map page.
 */
export default function MapPage() {
  const mapItems = properties.slice(0, 8).map((item) => `${item.title} · ₹${item.price.toLocaleString('en-IN')}`);
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Map' }]} />
      <h1 className="text-3xl font-extrabold">Interactive Map View</h1>
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <FilterSidebar items={['Budget', 'Type', 'Growth score', 'Deal score']} />
        <MapContainer items={mapItems} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <HeatmapLayer items={['Undervaluation heat overlay enabled']} />
        <PropertyMarker items={mapItems.slice(0, 4)} />
        <ClusterView items={['34 listings near Shaheed Path', '22 listings near Gomti Nagar Extension']} />
        <MapControls items={['Zoom', 'Recenter', 'Toggle heatmap']} />
      </div>
      <PropertyPanel items={mapItems.slice(0, 3)} />
    </section>
  );
}
