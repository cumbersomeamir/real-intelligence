'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { getScraperSummary, triggerScraper } from '@/lib/dataClient';

/**
 * Scraper dashboard client page.
 * @returns {JSX.Element}
 */
export default function ScraperClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState({ status: [], history: [], quality: { total: 0, deduped: 0, dedupRatio: 0 } });

  async function load() {
    setLoading(true);
    setError('');
    try {
      const payload = await getScraperSummary();
      setSummary(payload);
    } catch (loadError) {
      setError(loadError?.message || 'Unable to load scraper status');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Scraper' }]} />
      <div>
        <h1 className="text-3xl font-extrabold">Scraper Management</h1>
        <p className="mt-1 text-sm text-surface-400">Source health, dedup metrics, and manual crawl triggers.</p>
      </div>

      {error ? (
        <Card>
          <p className="text-sm text-risk-400">{error}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="bg-surface-900/60 xl:col-span-2">
          <h2 className="text-lg font-semibold">Source Health</h2>
          <div className="mt-3 space-y-2">
            {(loading ? Array.from({ length: 5 }) : summary.status).map((item, index) =>
              loading ? (
                <Skeleton key={index} className="h-12 w-full" />
              ) : (
                <div key={item.source} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">
                  <div>
                    <p className="font-semibold text-white">{item.source}</p>
                    <p className="text-xs text-surface-400">Last run status</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.status === 'healthy' ? 'success' : item.status === 'degraded' ? 'warning' : 'danger'}>
                      {item.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      onClick={async () => {
                        try {
                          await triggerScraper(item.source);
                          toast.success(`${item.source} trigger queued`);
                        } catch (triggerError) {
                          toast.error(triggerError?.message || 'Unable to trigger source');
                        }
                      }}
                    >
                      Trigger
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Data Quality</h2>
          <p className="mt-3 text-sm text-surface-300">Total records: {summary.quality.total || 0}</p>
          <p className="text-sm text-surface-300">Deduplicated: {summary.quality.deduped || 0}</p>
          <p className="text-sm text-surface-300">Dedup ratio: {summary.quality.dedupRatio || 0}</p>
          <Button className="mt-4" onClick={load}>
            Refresh Summary
          </Button>
        </Card>
      </div>

      <Card className="bg-surface-900/60">
        <h2 className="text-lg font-semibold">Recent Crawl History</h2>
        <div className="mt-3 space-y-2 text-sm text-surface-300">
          {(summary.history || []).length ? (
            summary.history.slice(0, 10).map((row) => (
              <div key={row._id || row.sourceId} className="rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">
                {row.source || 'source'} · {row.sourceId || row._id}
              </div>
            ))
          ) : (
            <p className="text-surface-400">No crawl records available yet.</p>
          )}
        </div>
      </Card>
    </section>
  );
}
