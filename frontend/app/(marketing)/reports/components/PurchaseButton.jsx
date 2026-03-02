'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import { purchaseReport } from '@/lib/dataClient';

/**
 * Purchases report from preview page.
 * @param {Object} props - Props.
 * @param {string} props.reportId - Report id.
 * @returns {JSX.Element}
 */
export default function PurchaseButton({ reportId }) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <Button
      className="mt-4"
      disabled={submitting}
      onClick={async () => {
        setSubmitting(true);
        try {
          const result = await purchaseReport(reportId);
          toast.success(result.message || 'Report purchased successfully');
        } catch (error) {
          toast.error(error?.message || 'Unable to purchase report');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {submitting ? 'Processing...' : 'Purchase Report'}
    </Button>
  );
}
