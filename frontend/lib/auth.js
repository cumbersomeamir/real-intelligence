/**
 * @file NextAuth configuration.
 */

import Credentials from 'next-auth/providers/credentials';

/**
 * Provides NextAuth options used by route handler.
 * @returns {import('next-auth').NextAuthConfig} NextAuth config.
 */
export function getAuthConfig() {
  return {
    providers: [
      Credentials({
        name: 'Credentials',
        credentials: {
          identifier: { label: 'Email/Phone', type: 'text' },
          password: { label: 'Password', type: 'password' }
        },
        async authorize(credentials) {
          if (!credentials?.identifier || !credentials?.password) return null;
          return {
            id: 'demo-user',
            name: 'Demo User',
            email: 'demo@lucknowpropintel.com',
            role: 'investor'
          };
        }
      })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
      async jwt({ token, user }) {
        if (user) token.role = user.role;
        return token;
      },
      async session({ session, token }) {
        session.user.role = token.role;
        return session;
      }
    },
    pages: {
      signIn: '/login'
    }
  };
}
