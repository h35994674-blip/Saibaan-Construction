import { prisma } from '@/lib/db/client';
import { unstable_cache } from 'next/cache';

export const getAllSuppliers = unstable_cache(
  async () => prisma.supplier.findMany({ orderBy: { order: 'asc' } }),
  ['suppliers-all'],
  { revalidate: 3600, tags: ['suppliers'] }
);
