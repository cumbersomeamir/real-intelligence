'use client';

import { useEffect, useMemo, useState } from 'react';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Skeleton from '@/components/ui/Skeleton';
import BaseMap from '@/components/maps/BaseMap';
import Heatmap from '@/components/maps/Heatmap';
import MarkerCluster from '@/components/maps/MarkerCluster';
import { formatINR } from '@/lib/formatters';
import { getMapDataset } from '@/lib/dataClient';

/**
 * Map client page.
 * @returns {JSX.Element}
 */
export default function MapClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [minScore, setMinScore] = useState('0');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await getMapDataset();
        setItems(data);
      } catch (loadError) {
        setError(loadError?.message || 'Unable to load map data');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const min = Number(minScore || 0);
    return items.filter((item) => {
      if (term && !`${item.title}`.toLowerCase().includes(term)) return false;
      if (Number(item.dealScore || 0) < min) return false;
      return true;
    });
  }, [items, q, minScore]);

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Map' }]} />
      <div>
        <h1 className="text-3xl font-extrabold">Map Intelligence</h1>
        <p className="mt-1 text-sm text-surface-400">Geo-indexed inventory with score-driven filtering and heat overlays.</p>
      </div>

      <Card className="bg-surface-900/60">
        <div className="grid gap-3 md:grid-cols-3">
          <Input label="Search marker" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Listing title" />
          <Input
            label="Minimum deal score"
            type="number"
            min={0}
            max={100}
            value={minScore}
            onChange={(event) => setMinScore(event.target.value)}
          />
          <Select
            label="Render mode"
            value="heat"
            options={[
              { label: 'Heat overlay', value: 'heat' },
              { label: 'Marker focus', value: 'markers' }
            ]}
            readOnly
          />
        </div>
      </Card>

      {error ? (
        <Card>
          <p className="text-sm text-risk-400">{error}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <BaseMap>
          <Heatmap />
          <div className="absolute left-4 top-4">
            <MarkerCluster count={filtered.length} />
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-surface-700 bg-surface-950/90 p-3 text-xs text-surface-300">
            Using fallback vector map shell. Add `NEXT_PUBLIC_MAPBOX_TOKEN` to render live tiles.
          </div>
        </BaseMap>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Visible Markers</h2>
          <div className="mt-3 space-y-2">
            {(loading ? Array.from({ length: 6 }) : filtered.slice(0, 20)).map((item, index) =>
              loading ? (
                <Skeleton key={index} className="h-12 w-full" />
              ) : (
                <article key={item.id} className="rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-surface-400">
                    {formatINR(item.price)} · Score {item.dealScore}
                  </p>
                  <p className="text-[11px] text-surface-500">
                    {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
                  </p>
                </article>
              )
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
