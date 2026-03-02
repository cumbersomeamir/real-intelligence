/**
 * @file NextAuth route handler.
 */

import NextAuth from 'next-auth';
import { getAuthConfig } from '@/lib/auth';

const handler = NextAuth(getAuthConfig());

export { handler as GET, handler as POST };
