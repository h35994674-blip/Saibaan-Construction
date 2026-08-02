import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db/client';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const usernameOrEmail = credentials?.username as string;
        const password = credentials?.password as string;

        if (!usernameOrEmail || !password) return null;

        // 1. Try to find admin in DB
        const adminAccount = await prisma.adminAccount.findUnique({
          where: { id: 'admin' },
        });

        // 2. If no admin account exists yet, use fallback and CREATE it
        if (!adminAccount) {
          const isValidFallbackUsername = usernameOrEmail === process.env.ADMIN_USERNAME;
          const isValidFallbackPassword = await bcrypt.compare(
            password,
            process.env.ADMIN_PASSWORD_HASH || ''
          );

          if (isValidFallbackUsername && isValidFallbackPassword) {
            // Seed the database with the default admin
            await prisma.adminAccount.create({
              data: {
                id: 'admin',
                email: usernameOrEmail, // initially uses the username as email
                passwordHash: process.env.ADMIN_PASSWORD_HASH || '',
              }
            });
            return { id: 'admin', name: 'Admin', email: usernameOrEmail };
          }
          return null;
        }

        // 3. Admin account exists, verify against DB (allow login with email OR fallback username)
        const isDbEmailMatch = adminAccount.email === usernameOrEmail;
        const isFallbackUsernameMatch = process.env.ADMIN_USERNAME === usernameOrEmail;
        
        if (!isDbEmailMatch && !isFallbackUsernameMatch) {
            return null;
        }

        const isValidPassword = await bcrypt.compare(password, adminAccount.passwordHash);

        if (isValidPassword) {
          return { id: 'admin', name: 'Admin', email: adminAccount.email };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      if (isAdminRoute) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
  },
});
