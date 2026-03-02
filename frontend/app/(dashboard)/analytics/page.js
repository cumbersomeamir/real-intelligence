/**
 * @file Analytics page.
 */

import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import MarketOverview from '@/app/(dashboard)/analytics/components/MarketOverview';
import PriceHeatmap from '@/app/(dashboard)/analytics/components/PriceHeatmap';
import TrendCharts from '@/app/(dashboard)/analytics/components/TrendCharts';
import SupplyDemandGraph from '@/app/(dashboard)/analytics/components/SupplyDemandGraph';
import TopMicroLocations from '@/app/(dashboard)/analytics/components/TopMicroLocations';
import AIForecast from '@/app/(dashboard)/analytics/components/AIForecast';
import { microLocations } from '@/lib/mockData';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for analytics page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Analytics', description: 'Market analytics, trends, heatmaps, and forecasts.', path: '/analytics' });
}

/**
 * Analytics dashboard page.
 * @returns {JSX.Element} Analytics page.
 */
export default function AnalyticsPage() {
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Analytics' }]} />
      <h1 className="text-3xl font-extrabold">Market Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MarketOverview items={['Median Price/Sqft: ₹4,280', 'Liquidity: 74', 'Risk spread: moderate']} />
        <PriceHeatmap items={microLocations.slice(0, 6).map((item) => `${item.name}: ${item.avgPricePerSqft}`)} />
        <TrendCharts items={['30d growth +3.6%', '90d growth +8.9%', '1y growth +17.4%']} />
        <SupplyDemandGraph items={['Supply index 66', 'Demand index 79']} />
        <TopMicroLocations items={microLocations.slice(0, 5).map((item) => `${item.name} (${item.growthScore})`)} />
        <AIForecast items={['Expected next-quarter price range: +2.3% to +4.9%', 'Satellite/change detection interface stubbed for phase 2']} />
      </div>
    </section>
  );
}
