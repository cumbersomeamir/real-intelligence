/**
 * @file Middleware for basic dashboard route protection.
 */

import { NextResponse } from 'next/server';

/**
 * Handles route-level auth guard based on a simple token cookie.
 * @param {import('next/server').NextRequest} request - Incoming request.
 * @returns {import('next/server').NextResponse} Middleware response.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isProtected = pathname.startsWith('/dashboard') ||
    pathname.startsWith('/map') ||
    pathname.startsWith('/deals') ||
    pathname.startsWith('/properties') ||
    pathname.startsWith('/analytics') ||
    pathname.startsWith('/buyers') ||
    pathname.startsWith('/revenue') ||
    pathname.startsWith('/ai-agents') ||
    pathname.startsWith('/scraper') ||
    pathname.startsWith('/social') ||
    pathname.startsWith('/whatsapp') ||
    pathname.startsWith('/settings');

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/map/:path*',
    '/deals/:path*',
    '/properties/:path*',
    '/analytics/:path*',
    '/buyers/:path*',
    '/revenue/:path*',
    '/ai-agents/:path*',
    '/scraper/:path*',
    '/social/:path*',
    '/whatsapp/:path*',
    '/settings/:path*'
  ]
};
