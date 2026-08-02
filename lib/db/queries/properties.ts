import { prisma } from '@/lib/db/client';
import { unstable_cache } from 'next/cache';
import { invalidateCache } from '@/lib/cache/redis';
import { CACHE_KEYS } from '@/lib/cache/keys';

export const getFeaturedProperties = unstable_cache(
  async () => prisma.property.findMany({
    where: { featured: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  }),
  ['properties-featured'],
  { revalidate: 300, tags: ['properties', 'properties-featured'] }
);

export interface PropertyFilters {
  type?: string;
  status?: string;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
}

export const getAllPropertiesBase = unstable_cache(
  async (type?: string, status?: string) => prisma.property.findMany({
    where: {
      ...(type && type !== 'all' ? { type } : {}),
      ...(status && status !== 'all' ? { status } : {}),
    },
    orderBy: { createdAt: 'desc' },
  }),
  ['properties-all'],
  { revalidate: 300, tags: ['properties'] }
);

export async function getAllProperties(filters: PropertyFilters = {}) {
  const { type, status, query, minPrice, maxPrice, beds, baths } = filters;
  const hasAdvancedFilters = !!(query || minPrice || maxPrice || beds || baths);

  if (!hasAdvancedFilters) {
    // Use cache for simple type/status filter
    const base = await getAllPropertiesBase(type, status);
    return base;
  }

  // Advanced filters bypass cache
  const whereClause: any = {
    ...(type && type !== 'all' ? { type } : {}),
    ...(status && status !== 'all' ? { status } : {}),
    ...(beds ? { beds: { gte: beds } } : {}),
    ...(baths ? { baths: { gte: baths } } : {}),
  };
  if (minPrice || maxPrice) {
    whereClause.priceNumeric = {};
    if (minPrice) whereClause.priceNumeric.gte = minPrice;
    if (maxPrice) whereClause.priceNumeric.lte = maxPrice;
  }
  if (query) {
    whereClause.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { location: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
    ];
  }
  return prisma.property.findMany({ where: whereClause, orderBy: { createdAt: 'desc' } });
}

export const getPropertyBySlug = unstable_cache(
  async (slug: string) => prisma.property.findUnique({ where: { slug } }),
  ['property-slug'],
  { revalidate: 600, tags: ['properties'] }
);

export const getRelatedProperties = unstable_cache(
  async (type: string, excludeId: string) => prisma.property.findMany({
    where: { type, id: { not: excludeId } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  }),
  ['properties-related'],
  { revalidate: 600, tags: ['properties'] }
);

/** Call this after creating/updating/deleting a property in the admin panel */
export async function invalidatePropertiesCache(slug?: string) {
  const keys: string[] = [
    CACHE_KEYS.FEATURED_PROPERTIES,
    CACHE_KEYS.ALL_PROPERTIES(),
  ];
  if (slug) keys.push(CACHE_KEYS.PROPERTY_SLUG(slug));
  await invalidateCache(...keys);
}
