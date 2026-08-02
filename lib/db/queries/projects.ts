import { prisma } from '@/lib/db/client';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { invalidateCache } from '@/lib/cache/redis';
import { CACHE_KEYS } from '@/lib/cache/keys';

export const getFeaturedProjects = cache(unstable_cache(
  async () => prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  }),
  ['projects-featured'],
  { revalidate: 300, tags: ['projects', 'projects-featured'] }
));

export const getAllProjects = cache(unstable_cache(
  async (category?: string, status?: string) => prisma.project.findMany({
    where: {
      ...(category && category !== 'all' ? { category } : {}),
      ...(status && status !== 'all' ? { status } : {}),
    },
    orderBy: { createdAt: 'desc' },
  }),
  ['projects-all'],
  { revalidate: 300, tags: ['projects'] }
));

export const getProjectBySlug = cache(unstable_cache(
  async (slug: string) => prisma.project.findUnique({ where: { slug } }),
  ['project-slug'],
  { revalidate: 600, tags: ['projects'] }
));

export const getRelatedProjects = cache(unstable_cache(
  async (category: string, excludeId: string) => prisma.project.findMany({
    where: { category, id: { not: excludeId } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  }),
  ['projects-related'],
  { revalidate: 600, tags: ['projects'] }
));

/** Call this after creating/updating/deleting a project in the admin panel */
export async function invalidateProjectsCache(slug?: string) {
  const keys: string[] = [
    CACHE_KEYS.FEATURED_PROJECTS,
    CACHE_KEYS.ALL_PROJECTS(),
  ];
  if (slug) keys.push(CACHE_KEYS.PROJECT_SLUG(slug));
  await invalidateCache(...keys);
}
