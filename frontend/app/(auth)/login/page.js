/**
 * @file Login page.
 */

import Link from 'next/link';
import Card from '@/components/ui/Card';
import LoginForm from '@/app/(auth)/login/components/LoginForm';
import SocialLogin from '@/app/(auth)/login/components/SocialLogin';
import OtpVerify from '@/app/(auth)/login/components/OtpVerify';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for login page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: 'Login',
    description: 'Access your LuckNow PropIntel account.',
    path: '/login'
  });
}

/**
 * Renders login UI.
 * @returns {JSX.Element} Login page.
 */
export default function LoginPage() {
  return (
    <main>
      <h1 className="text-3xl font-extrabold">Login</h1>
      <p className="mt-2 text-sm text-surface-600">Sign in with credentials or OTP.</p>
      <Card className="mt-6 space-y-5">
        <LoginForm />
        <SocialLogin />
        <OtpVerify />
      </Card>
      <p className="mt-4 text-sm text-surface-600">
        New here?{' '}
        <Link href="/register" className="font-semibold text-primary-600">
          Create an account
        </Link>
      </p>
    </main>
  );
}
