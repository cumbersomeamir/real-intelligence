/**
 * @file App-wide constants for LuckNow PropIntel frontend.
 */

export const APP_NAME = 'LuckNow PropIntel';
export const APP_TAGLINE = "Lucknow's Data Moat for Smart Property Investors";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:5000';

export const ROLE_OPTIONS = ['admin', 'investor', 'buyer', 'viewer'];

export const PRICE_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    period: '/year'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹10,000',
    period: '/year'
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '₹50,000',
    period: '/year'
  }
];

export const DASHBOARD_NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/map', label: 'Map' },
  { href: '/deals', label: 'Deals' },
  { href: '/properties', label: 'Properties' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/buyers', label: 'Buyers' },
  { href: '/revenue', label: 'Revenue' },
  { href: '/ai-agents', label: 'AI Agents' },
  { href: '/scraper', label: 'Scraper' },
  { href: '/social', label: 'Social' },
  { href: '/whatsapp', label: 'WhatsApp' },
  { href: '/settings', label: 'Settings' }
];

export const MARKETING_NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/micro-locations', label: 'Micro-Locations' },
  { href: '/reports', label: 'Reports' },
  { href: '/contact', label: 'Contact' }
];
