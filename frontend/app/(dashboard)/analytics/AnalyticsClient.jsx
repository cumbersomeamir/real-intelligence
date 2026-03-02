'use client';

import { useEffect, useState } from 'react';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import AreaChart from '@/components/charts/AreaChart';
import { getMarketOverview, getTrendData, getSupplyDemand, getForecasts, getMicroLocations } from '@/lib/dataClient';

/**
 * Analytics client page.
 * @returns {JSX.Element}
 */
export default function AnalyticsClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [overview, setOverview] = useState(null);
  const [trends, setTrends] = useState([]);
  const [supplyDemand, setSupplyDemand] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');

      try {
        const [overviewData, trendData, supplyData, forecastData, locationData] = await Promise.all([
          getMarketOverview(),
          getTrendData(),
          getSupplyDemand(),
          getForecasts(),
          getMicroLocations()
        ]);

        setOverview(overviewData);
        setTrends(trendData);
        setSupplyDemand(supplyData);
        setForecast(forecastData);
        setLocations(locationData);
      } catch (loadError) {
        setError(loadError?.message || 'Unable to load analytics');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Analytics' }]} />
      <div>
        <h1 className="text-3xl font-extrabold">Analytics</h1>
        <p className="mt-1 text-sm text-surface-400">Macro market pulse with trend, supply-demand, and forecast visibility.</p>
      </div>

      {error ? (
        <Card>
          <p className="text-sm text-risk-400">{error}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(loading ? Array.from({ length: 4 }) : [
          { label: 'Tracked Properties', value: overview?.trackedProperties || 0 },
          { label: 'Micro-locations', value: overview?.microLocations || 0 },
          { label: 'Average Deal Score', value: overview?.avgDealScore || 0 },
          { label: 'Supply-Demand Ratio', value: supplyDemand?.ratio || 0 }
        ]).map((item, index) => (
          <Card key={item?.label || index} className="bg-surface-900/60">
            {loading ? (
              <>
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-3 h-8 w-24" />
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-wide text-surface-400">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
              </>
            )}
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Price Trend (30d)</h2>
          <div className="mt-3">
            <LineChart data={trends.slice(0, 10).map((item) => ({ name: item.name, value: item.trend30d }))} />
          </div>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Price Trend (1y)</h2>
          <div className="mt-3">
            <AreaChart data={trends.slice(0, 10).map((item) => ({ name: item.name, value: item.trend1y }))} />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="bg-surface-900/60 xl:col-span-2">
          <h2 className="text-lg font-semibold">Top Growth Micro-locations</h2>
          <div className="mt-3">
            <BarChart data={locations.slice(0, 12).map((item) => ({ name: item.slug.split('-')[0], value: item.growthScore }))} />
          </div>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Forecast</h2>
          <p className="mt-2 text-sm text-surface-300">
            Window: {forecast?.forecastWindow || 'next_90_days'}
          </p>
          <p className="text-sm text-surface-300">
            Expected move: +{forecast?.expectedPriceRangeChange?.min || 0}% to +{forecast?.expectedPriceRangeChange?.max || 0}%
          </p>
          <div className="mt-3">
            <Badge variant="success">Confidence {forecast?.confidence || 0}%</Badge>
          </div>
          <div className="mt-4 rounded-lg border border-surface-700 bg-surface-900 px-3 py-2 text-sm text-surface-300">
            Supply: {supplyDemand?.supply || 0}
            <br />
            Demand: {supplyDemand?.demand || 0}
          </div>
        </Card>
      </div>
    </section>
  );
}
