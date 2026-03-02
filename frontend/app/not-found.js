/**
 * @file Custom 404 page.
 */

import Link from 'next/link';

/**
 * Renders not-found route content.
 * @returns {JSX.Element} 404 page.
 */
export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-5xl font-black text-primary-500">404</h1>
      <p className="mt-3 text-surface-600 dark:text-surface-300">The page you requested could not be found.</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white">
        Back to Home
      </Link>
    </main>
  );
}
