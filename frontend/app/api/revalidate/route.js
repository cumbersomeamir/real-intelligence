/**
 * @file Revalidation route for ISR content.
 */

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Handles on-demand revalidation.
 * @param {Request} request - Incoming request.
 * @returns {Promise<NextResponse>} API response.
 */
export async function POST(request) {
  try {
    const { secret, path = '/' } = await request.json();

    if (!secret || secret !== process.env.NEXTAUTH_SECRET) {
      return NextResponse.json({ message: 'Invalid secret.' }, { status: 401 });
    }

    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
