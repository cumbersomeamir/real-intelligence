/**
 * @file Instagram webhook proxy route.
 */

import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/constants';

/**
 * Forwards Instagram webhook payload to backend.
 * @param {Request} request - Incoming request.
 * @returns {Promise<NextResponse>} API response.
 */
export async function POST(request) {
  try {
    const payload = await request.json();
    const response = await fetch(`${BACKEND_URL}/api/webhooks/instagram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
