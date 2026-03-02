/**
 * @file Global providers for frontend app.
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Toast from '@/components/ui/Toast';
import ServiceWorkerRegister from '@/components/common/ServiceWorkerRegister';

/**
 * Provides query cache and global UI providers.
 * @param {Object} props - Props.
 * @param {React.ReactNode} props.children - Children tree.
 * @returns {JSX.Element} Providers wrapper.
 */
export default function Providers({ children }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 1000 * 30, retry: 1 }
        }
      })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ServiceWorkerRegister />
      <Toast />
    </QueryClientProvider>
  );
}
