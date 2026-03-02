'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { formatINR } from '@/lib/formatters';
import { getProperties } from '@/lib/dataClient';

/**
 * Properties listing client page.
 * @returns {JSX.Element}
 */
export default function PropertiesClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [properties, setProperties] = useState([]);
  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const [location, setLocation] = useState('');

  const loadProperties = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const items = await getProperties({ q, type, location });
      setProperties(items);
    } catch (loadError) {
      setError(loadError?.message || 'Unable to load properties');
    } finally {
      setLoading(false);
    }
  }, [location, q, type]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Properties' }]} />
      <div>
        <h1 className="text-3xl font-extrabold">Properties</h1>
        <p className="mt-1 text-sm text-surface-400">Search live inventory and inspect scoring, pricing, and location confidence.</p>
      </div>

      <Card className="bg-surface-900/60">
        <div className="grid gap-3 md:grid-cols-4">
          <Input label="Search" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Title or location" />
          <Select
            label="Type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Apartment', value: 'apartment' },
              { label: 'Plot', value: 'plot' },
              { label: 'Villa', value: 'villa' },
              { label: 'Commercial', value: 'commercial' }
            ]}
          />
          <Input label="Location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="e.g. Gomti Nagar" />
          <div className="flex items-end">
            <Button className="w-full" onClick={loadProperties}>
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {error ? (
        <Card>
          <p className="text-sm text-risk-400">{error}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {(loading ? Array.from({ length: 9 }) : properties).map((item, index) =>
          loading ? (
            <Card key={index} className="bg-surface-900/60">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/2" />
              <Skeleton className="mt-4 h-10 w-full" />
            </Card>
          ) : (
            <Card key={item.id} className="bg-surface-900/60">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link href={`/properties/${item.id}`} className="text-base font-semibold text-white hover:text-primary-300">
                    {item.title}
                  </Link>
                  <p className="text-xs text-surface-400">{item.microLocation}</p>
                </div>
                <Badge variant={item.dealScore >= 85 ? 'success' : item.dealScore >= 70 ? 'warning' : 'danger'}>
                  {item.dealScore}
                </Badge>
              </div>
              <p className="mt-3 text-sm font-semibold text-white">{formatINR(item.price)}</p>
              <p className="text-xs text-surface-400">
                {item.area} sqft · {item.subType} · {item.source}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-surface-800 px-2 py-1">Growth {item.growthScore}</span>
                <span className="rounded-full bg-surface-800 px-2 py-1">Liquidity {item.liquidityScore}</span>
                <span className="rounded-full bg-surface-800 px-2 py-1">Risk {item.riskScore}</span>
              </div>
              <Link href={`/properties/${item.id}`} className="mt-4 inline-block text-sm font-semibold text-primary-300">
                View detail
              </Link>
            </Card>
          )
        )}
      </div>
    </section>
  );
}
