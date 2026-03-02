'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { compactNumber, formatINR } from '@/lib/formatters';
import { generateSocialDraft, getSocialOverview } from '@/lib/dataClient';

/**
 * Social dashboard client page.
 * @returns {JSX.Element}
 */
export default function SocialClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [overview, setOverview] = useState(null);
  const [format, setFormat] = useState('Reel script');
  const [location, setLocation] = useState('Gomti Nagar Extension');
  const [draft, setDraft] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        setOverview(await getSocialOverview());
      } catch (loadError) {
        setError(loadError?.message || 'Unable to load social metrics');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Social' }]} />
      <div>
        <h1 className="text-3xl font-extrabold">Social / Instagram Dashboard</h1>
        <p className="mt-1 text-sm text-surface-400">Engagement trends and AI-assisted content generation.</p>
      </div>

      {error ? (
        <Card>
          <p className="text-sm text-risk-400">{error}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {(loading
          ? Array.from({ length: 4 })
          : [
              { label: 'Reach', value: compactNumber(overview?.engagement?.reach || 0) },
              { label: 'Saves', value: compactNumber(overview?.engagement?.saves || 0) },
              { label: 'Shares', value: compactNumber(overview?.engagement?.shares || 0) },
              { label: 'ROAS', value: `${overview?.ads?.roas || 0}x` }
            ]
        ).map((item, index) => (
          <Card key={item?.label || index} className="bg-surface-900/60">
            {loading ? (
              <>
                <Skeleton className="h-4 w-20" />
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

      <Card className="bg-surface-900/60">
        <h2 className="text-lg font-semibold">Ad Spend Summary</h2>
        <p className="mt-2 text-sm text-surface-300">Current spend: {formatINR(overview?.ads?.spend || 0)}</p>
      </Card>

      <Card className="bg-surface-900/60">
        <h2 className="text-lg font-semibold">AI Content Generator</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Input label="Format" value={format} onChange={(event) => setFormat(event.target.value)} />
          <Input label="Location" value={location} onChange={(event) => setLocation(event.target.value)} />
          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={async () => {
                try {
                  const result = await generateSocialDraft({ format, location });
                  setDraft(result);
                  toast.success('Draft generated');
                } catch (generateError) {
                  toast.error(generateError?.message || 'Unable to generate content');
                }
              }}
            >
              Generate
            </Button>
          </div>
        </div>
        <div className="mt-3 rounded-lg border border-surface-700 bg-surface-900 p-3 text-sm text-surface-200">
          {draft || 'Generate a draft to populate this panel.'}
        </div>
      </Card>
    </section>
  );
}
