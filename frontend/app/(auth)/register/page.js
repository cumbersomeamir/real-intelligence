/**
 * @file Register page.
 */

import Link from 'next/link';
import Card from '@/components/ui/Card';
import RegisterForm from '@/app/(auth)/register/components/RegisterForm';
import OnboardingSteps from '@/app/(auth)/register/components/OnboardingSteps';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for register page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({
    title: 'Register',
    description: 'Create your LuckNow PropIntel account and configure your investor profile.',
    path: '/register'
  });
}

/**
 * Renders register page.
 * @returns {JSX.Element} Register page.
 */
export default function RegisterPage() {
  return (
    <main>
      <h1 className="text-3xl font-extrabold">Register</h1>
      <p className="mt-2 text-sm text-surface-600">Create an account and start receiving data-led investment signals.</p>
      <Card className="mt-6 space-y-5">
        <RegisterForm />
        <OnboardingSteps />
      </Card>
      <p className="mt-4 text-sm text-surface-600">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary-600">
          Login
        </Link>
      </p>
    </main>
  );
}
