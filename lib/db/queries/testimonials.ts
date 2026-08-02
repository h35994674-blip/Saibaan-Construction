import { prisma } from '@/lib/db/client';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

export const getFeaturedTestimonials = cache(unstable_cache(
  async () => prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  }),
  ['testimonials-featured'],
  { revalidate: 3600, tags: ['testimonials'] }
));

export const getAllTestimonials = cache(unstable_cache(
  async () => prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } }),
  ['testimonials-all'],
  { revalidate: 3600, tags: ['testimonials'] }
));
