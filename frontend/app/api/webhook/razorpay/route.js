/**
 * @file Razorpay webhook proxy route.
 */

import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/constants';

/**
 * Forwards Razorpay webhook payload to backend.
 * @param {Request} request - Incoming request.
 * @returns {Promise<NextResponse>} API response.
 */
export async function POST(request) {
  try {
    const payload = await request.text();
    const response = await fetch(`${BACKEND_URL}/api/webhooks/razorpay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
