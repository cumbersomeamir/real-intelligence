/**
 * @file Site footer component.
 */

import Link from 'next/link';

/**
 * Footer with quick links and disclaimer content.
 * @returns {JSX.Element} Footer element.
 */
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="font-display text-xl font-bold text-primary-600">LuckNow PropIntel</h3>
          <p className="mt-2 text-sm text-surface-600 dark:text-surface-300">
            Lucknow&apos;s Data Moat for Smart Property Investors
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-surface-600 dark:text-surface-300">
            {['/map', '/deals', '/micro-locations', '/blog', '/pricing', '/contact'].map((href) => (
              <li key={href}>
                <Link href={href}>{href.replace('/', '') || 'home'}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-surface-600 dark:text-surface-300">
            <li>
              <Link href="/legal/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/legal/terms">Terms</Link>
            </li>
            <li>
              <Link href="/legal/disclaimer">Disclaimer</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide">Built by TensorBlue</h4>
          <p className="mt-3 text-xs text-surface-500 dark:text-surface-400">
            Disclaimer: LuckNow PropIntel provides data analysis and investment intelligence. We are not registered real estate agents. All property investments carry risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
