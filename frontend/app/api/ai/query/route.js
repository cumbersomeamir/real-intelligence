/**
 * @file AI natural language query proxy route.
 */

import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/constants';

/**
 * Sends natural language query to backend intelligence endpoint.
 * @param {Request} request - Incoming request.
 * @returns {Promise<NextResponse>} API response.
 */
export async function POST(request) {
  try {
    const payload = await request.json();
    const response = await fetch(`${BACKEND_URL}/api/ai/query`, {
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
