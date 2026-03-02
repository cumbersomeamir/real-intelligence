/**
 * @file Root layout with global metadata and providers.
 */

import '@/app/globals.css';
import Providers from '@/app/providers';
import { bodyFont, displayFont, monoFont } from '@/styles/fonts';

/**
 * Root metadata for the entire application.
 */
export const metadata = {
  metadataBase: new URL('https://lucknowpropintel.com'),
  title: {
    default: 'LuckNow PropIntel — Lucknow Property Intelligence & Deal Engine',
    template: '%s | LuckNow PropIntel'
  },
  description:
    'Data-driven property intelligence platform for Lucknow. ML-powered valuations, deal scoring, micro-location analysis, and investment opportunities.',
  keywords: [
    'Lucknow real estate',
    'property intelligence',
    'Lucknow property investment',
    'real estate analytics',
    'property valuation Lucknow',
    'undervalued properties Lucknow'
  ],
  authors: [{ name: 'LuckNow PropIntel' }],
  creator: 'TensorBlue',
  openGraph: {
    title: 'LuckNow PropIntel',
    description:
      'Data-driven property intelligence platform for Lucknow. ML-powered valuations, deal scoring, and micro-location intelligence.',
    siteName: 'LuckNow PropIntel',
    locale: 'en_IN',
    type: 'website',
    images: ['/og/default.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuckNow PropIntel',
    description: 'Lucknow Property Intelligence & Deal Engine'
  },
  verification: {
    google: 'GOOGLE_SEARCH_CONSOLE_ID'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

/**
 * Root layout component.
 * @param {Object} props - Layout props.
 * @param {React.ReactNode} props.children - Child routes.
 * @returns {JSX.Element} HTML scaffold.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
