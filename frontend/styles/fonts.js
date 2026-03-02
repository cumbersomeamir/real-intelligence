/**
 * @file Central font declarations for LuckNow PropIntel.
 */

import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google';

/** Display typography font. */
export const displayFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900']
});

/** Body/UI typography font. */
export const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
});

/** Monospace font for data-heavy widgets. */
export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600']
});
