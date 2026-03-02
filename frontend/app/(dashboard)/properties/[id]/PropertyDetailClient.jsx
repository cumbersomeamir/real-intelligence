'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import LineChart from '@/components/charts/LineChart';
import { formatINR } from '@/lib/formatters';
import { getProperty, getPropertyHistory, getSimilarProperties } from '@/lib/dataClient';

/**
 * Property detail client page.
 * @param {Object} props - Props.
 * @param {string} props.id - Property id.
 * @returns {JSX.Element}
 */
export default function PropertyDetailClient({ id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [property, setProperty] = useState(null);
  const [history, setHistory] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const [item, historyData, similarData] = await Promise.all([
          getProperty(id),
          getPropertyHistory(id),
          getSimilarProperties(id)
        ]);

        setProperty(item);
        setHistory(historyData || []);
        setSimilar(similarData || []);
      } catch (loadError) {
        setError(loadError?.message || 'Unable to load property');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <section className="space-y-4">
        <Skeleton className="h-7 w-80" />
        <Skeleton className="h-40 w-full" />
      </section>
    );
  }

  if (!property) {
    return (
      <section className="space-y-4">
        <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Properties', href: '/properties' }, { label: id }]} />
        <Card>
          <p className="text-sm text-risk-400">{error || 'Property not found.'}</p>
          <Link href="/properties" className="mt-3 inline-block text-sm font-semibold text-primary-300">
            Back to properties
          </Link>
        </Card>
      </section>
    );
  }

  const chartData = history.length
    ? history.map((row, index) => ({
        name: row.date ? new Date(row.date).toLocaleDateString('en-IN') : `P${index + 1}`,
        value: Number(row.price || 0)
      }))
    : [
        { name: 'Previous', value: Math.round(property.price * 1.03) },
        { name: 'Current', value: property.price }
      ];

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Properties', href: '/properties' }, { label: property.id }]} />
      <div>
        <h1 className="text-3xl font-extrabold">{property.title}</h1>
        <p className="mt-1 text-sm text-surface-400">{property.microLocation}</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="bg-surface-900/60 xl:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Listing price</p>
              <p className="mt-1 text-2xl font-bold text-white">{formatINR(property.price)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Estimated fair value</p>
              <p className="mt-1 text-2xl font-bold text-white">{formatINR(property.fairValue)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Area</p>
              <p className="mt-1 text-lg font-semibold text-white">{property.area} sqft</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Price / sqft</p>
              <p className="mt-1 text-lg font-semibold text-white">{formatINR(property.pricePerSqft || 0)}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={property.dealScore >= 85 ? 'success' : property.dealScore >= 70 ? 'warning' : 'danger'}>
              Deal score {property.dealScore}
            </Badge>
            <Badge variant="default">Growth {property.growthScore}</Badge>
            <Badge variant="default">Liquidity {property.liquidityScore}</Badge>
            <Badge variant="default">Risk {property.riskScore}</Badge>
          </div>

          <div className="mt-5 rounded-xl border border-surface-700 bg-surface-900 p-3">
            <p className="mb-2 text-sm font-semibold">Price trend</p>
            <LineChart data={chartData} />
          </div>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Actions</h2>
          <div className="mt-3 grid gap-2">
            <Button onClick={() => toast.success('Seller callback request queued')}>Request callback</Button>
            <Button variant="ghost" onClick={() => toast.success('Site visit request queued')}>
              Schedule site visit
            </Button>
            <Button variant="ghost" onClick={() => toast.success('WhatsApp intro queued')}>
              WhatsApp seller
            </Button>
          </div>
          <p className="mt-4 text-xs text-surface-400">
            Coordinates: {property.location.lat.toFixed(4)}, {property.location.lng.toFixed(4)}
          </p>
        </Card>
      </div>

      <Card className="bg-surface-900/60">
        <h2 className="text-lg font-semibold">Similar Properties</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {similar.slice(0, 6).map((item) => (
            <Link key={item.id} href={`/properties/${item.id}`} className="rounded-lg border border-surface-700 bg-surface-900 p-3 hover:border-primary-400">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="text-xs text-surface-400">{item.microLocation}</p>
              <p className="mt-1 text-sm text-white">{formatINR(item.price)}</p>
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
}
