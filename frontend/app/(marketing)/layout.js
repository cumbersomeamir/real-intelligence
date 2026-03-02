/**
 * @file Marketing route-group layout.
 */

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
import CookieConsent from '@/components/common/CookieConsent';

/**
 * Marketing pages layout (light mode).
 * @param {Object} props - Layout props.
 * @param {React.ReactNode} props.children - Child content.
 * @returns {JSX.Element} Layout element.
 */
export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-surface-900">
      <Navbar />
      {children}
      <Footer />
      <CookieConsent />
      <ScrollToTop />
    </div>
  );
}
