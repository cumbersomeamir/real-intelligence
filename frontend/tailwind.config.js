/**
 * @file Tailwind CSS configuration with LuckNow PropIntel design tokens.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#dce4ff',
          200: '#b9c9ff',
          300: '#85a3ff',
          400: '#4a72ff',
          500: '#1a3a8f',
          600: '#142d70',
          700: '#0f2152',
          800: '#0a1636',
          900: '#050b1a',
          950: '#020510'
        },
        accent: {
          50: '#fff9eb',
          100: '#fff0c6',
          200: '#ffe088',
          300: '#ffcb3d',
          400: '#f5b800',
          500: '#d99e00',
          600: '#b37d00',
          700: '#8c5e00',
          800: '#664200',
          900: '#3d2800'
        },
        profit: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669'
        },
        risk: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626'
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        conviction: {
          from: '#ff6b35',
          via: '#f7931e',
          to: '#ffcc02'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      animation: {
        'conviction-pulse': 'conviction-pulse 1.8s ease-in-out infinite',
        'fade-up': 'fade-up .2s ease-out'
      },
      keyframes: {
        'conviction-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(245, 184, 0, 0.2)' },
          '50%': { boxShadow: '0 0 0 12px rgba(245, 184, 0, 0)' }
        },
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};
