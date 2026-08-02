import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Force connection_limit=1 and pgbouncer=true on serverless environments
let databaseUrl = process.env.DATABASE_URL || '';
if (process.env.NODE_ENV === 'production' && databaseUrl) {
  if (!databaseUrl.includes('pgbouncer=true')) {
    databaseUrl += databaseUrl.includes('?') ? '&pgbouncer=true' : '?pgbouncer=true';
  }
  if (!databaseUrl.includes('connection_limit=')) {
    databaseUrl += '&connection_limit=1';
  }
  if (!databaseUrl.includes('pool_timeout=')) {
    databaseUrl += '&pool_timeout=20';
  }
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
