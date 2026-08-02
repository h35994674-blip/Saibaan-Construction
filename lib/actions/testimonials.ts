'use server';

import { prisma } from '@/lib/db/client';
import { revalidatePath, revalidateTag } from 'next/cache';
import { invalidateCache } from '@/lib/cache/redis';
import { CACHE_KEYS } from '@/lib/cache/keys';

export async function createTestimonial(data: any) {
  try {
    await prisma.testimonial.create({ data });

    await invalidateCache(CACHE_KEYS.FEATURED_TESTIMONIALS, CACHE_KEYS.ALL_TESTIMONIALS);
    revalidateTag('testimonials');
    revalidatePath('/admin/testimonials');
    revalidatePath('/about/testimonials');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return { success: false, error: 'Failed to create testimonial' };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } });
    await invalidateCache(CACHE_KEYS.FEATURED_TESTIMONIALS, CACHE_KEYS.ALL_TESTIMONIALS);
    revalidateTag('testimonials');
    revalidatePath('/admin/testimonials');
    revalidatePath('/about/testimonials');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return { success: false, error: 'Failed to delete testimonial' };
  }
}
