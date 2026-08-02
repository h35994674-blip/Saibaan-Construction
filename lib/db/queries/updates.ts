import { prisma } from '@/lib/db/client';
import { unstable_cache } from 'next/cache';

export const getAllUpdates = unstable_cache(
  async () => prisma.update.findMany({ orderBy: { publishedAt: 'desc' } }),
  ['updates-all'],
  { revalidate: 600, tags: ['updates'] }
);

export const getUpdateBySlug = unstable_cache(
  async (slug: string) => prisma.update.findUnique({ where: { slug } }),
  ['update-slug'],
  { revalidate: 600, tags: ['updates'] }
);

export const getRecentUpdates = unstable_cache(
  async (take = 3) => prisma.update.findMany({ orderBy: { publishedAt: 'desc' }, take }),
  ['updates-recent'],
  { revalidate: 600, tags: ['updates'] }
);
