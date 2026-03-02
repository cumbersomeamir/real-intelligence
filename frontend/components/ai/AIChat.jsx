/**
 * @file Floating AI chat interface.
 */

'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { runNaturalLanguageQuery } from '@/lib/dataClient';

/**
 * Floating AI assistant widget for dashboard pages.
 * @returns {JSX.Element} AI chat widget.
 */
export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('Ask: Show me deals under ₹50L in Gomti Nagar with growth score > 70');
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {open ? (
        <Card className="w-[320px] space-y-3 bg-white dark:bg-surface-900">
          <h3 className="text-sm font-semibold">AI Query Assistant</h3>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Describe your property query"
          />
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                const result = await runNaturalLanguageQuery(query);
                const first = result.items?.[0];
                if (first) {
                  setResponse(`Top result: ${first.title || first.name} (${first.microLocation || 'Lucknow'}) score ${first.dealScore || first.scores?.dealScore || '-'} `);
                } else {
                  setResponse('No matching opportunities found for that query.');
                }
              } catch (error) {
                toast.error(error?.message || 'Unable to run AI query');
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Running...' : 'Run Query'}
          </Button>
          <p className="text-xs text-surface-600 dark:text-surface-300">{response}</p>
        </Card>
      ) : null}
      <button
        type="button"
        aria-label="Open AI assistant"
        className="ml-auto mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg"
        onClick={() => setOpen((value) => !value)}
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}
