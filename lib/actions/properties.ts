'use server';

import { prisma } from '@/lib/db/client';
import { revalidatePath, revalidateTag } from 'next/cache';
import { invalidatePropertiesCache } from '@/lib/db/queries/properties';

export async function createProperty(data: any) {
  try {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    await prisma.property.create({
      data: {
        ...data,
        slug,
      },
    });

    await invalidatePropertiesCache();
    revalidateTag('properties');
    revalidatePath('/admin/properties');
    revalidatePath('/properties');
    return { success: true };
  } catch (error) {
    console.error('Error creating property:', error);
    return { success: false, error: 'Failed to create property' };
  }
}

export async function updateProperty(id: string, data: any) {
  try {
    const property = await prisma.property.update({
      where: { id },
      data,
    });

    await invalidatePropertiesCache(property.slug);
    revalidateTag('properties');
    revalidatePath('/admin/properties');
    revalidatePath('/properties');
    revalidatePath(`/properties/${property.slug}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating property:', error);
    return { success: false, error: 'Failed to update property' };
  }
}

export async function deleteProperty(id: string) {
  try {
    const property = await prisma.property.delete({ where: { id } });
    await invalidatePropertiesCache(property.slug);
    revalidateTag('properties');
    revalidatePath('/admin/properties');
    revalidatePath('/properties');
    return { success: true };
  } catch (error) {
    console.error('Error deleting property:', error);
    return { success: false, error: 'Failed to delete property' };
  }
}
