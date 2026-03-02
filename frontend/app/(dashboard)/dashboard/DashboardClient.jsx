'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import Badge from '@/components/ui/Badge';
import { formatINR } from '@/lib/formatters';
import { getDashboardSnapshot } from '@/lib/dataClient';

/**
 * Dashboard overview client page.
 * @returns {JSX.Element}
 */
export default function DashboardClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const payload = await getDashboardSnapshot();
      setData(payload);
    } catch (loadError) {
      setError(loadError?.message || 'Unable to load dashboard');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const kpis = data
    ? [
        { label: 'Tracked Properties', value: Number(data.trackedProperties || 0).toLocaleString('en-IN') },
        { label: 'Micro-locations', value: Number(data.microLocations || 0).toLocaleString('en-IN') },
        { label: 'High Conviction Deals', value: Number(data.highConvictionDeals || 0).toLocaleString('en-IN') },
        { label: 'Active Buyers', value: Number(data.activeBuyers || 0).toLocaleString('en-IN') },
        { label: 'Average Deal Score', value: `${data.avgDealScore || '0'}/100` },
        {
          label: 'Top Deal Ticket Size',
          value: data.topDeals?.[0] ? formatINR(data.topDeals[0].price) : formatINR(0)
        }
      ]
    : [];

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard' }]} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">Overview Dashboard</h1>
          <p className="mt-1 text-sm text-surface-400">Live intelligence snapshot across deals, buyers, and market momentum.</p>
        </div>
        <Button variant="ghost" onClick={load} className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {error ? (
        <Card>
          <p className="text-sm text-risk-400">{error}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {(loading ? Array.from({ length: 6 }) : kpis).map((item, index) => (
          <Card key={item?.label || index} className="bg-surface-900/60">
            {loading ? (
              <>
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-3 h-8 w-40" />
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

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2 bg-surface-900/60">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Top Deals</h2>
            <Link href="/deals" className="text-sm font-semibold text-primary-300">
              Open board
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {(loading ? Array.from({ length: 5 }) : data?.topDeals || []).map((deal, index) =>
              loading ? (
                <Skeleton key={index} className="h-12 w-full" />
              ) : (
                <div key={deal.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-surface-700 bg-surface-900 p-3">
                  <div>
                    <Link href={`/deals/${deal.id}`} className="text-sm font-semibold text-white hover:text-primary-300">
                      {deal.title}
                    </Link>
                    <p className="text-xs text-surface-400">{deal.microLocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{formatINR(deal.price)}</p>
                    <Badge variant={deal.dealScore >= 85 ? 'success' : 'warning'}>Score {deal.dealScore}</Badge>
                  </div>
                </div>
              )
            )}
          </div>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Alerts Feed</h2>
          <ul className="mt-4 space-y-3 text-sm text-surface-300">
            {(loading ? ['Loading...', 'Loading...', 'Loading...'] : data?.recentAlerts || []).map((alert) => (
              <li key={alert} className="rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">
                {alert}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2">
            <Link href="/buyers" className="rounded-lg border border-surface-700 px-3 py-2 text-sm hover:border-primary-400">
              Add buyer profile
            </Link>
            <Link href="/scraper" className="rounded-lg border border-surface-700 px-3 py-2 text-sm hover:border-primary-400">
              Trigger scrape source
            </Link>
            <Link href="/reports" className="rounded-lg border border-surface-700 px-3 py-2 text-sm hover:border-primary-400">
              Review premium reports
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
