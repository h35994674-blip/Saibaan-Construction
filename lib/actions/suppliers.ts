'use server';

import { prisma } from '@/lib/db/client';
import { revalidatePath, revalidateTag } from 'next/cache';
import { invalidateCache } from '@/lib/cache/redis';
import { CACHE_KEYS } from '@/lib/cache/keys';

export async function createSupplier(data: any) {
  try {
    await prisma.supplier.create({ data });

    await invalidateCache(CACHE_KEYS.ALL_SUPPLIERS);
    revalidateTag('suppliers');
    revalidatePath('/admin/suppliers');
    revalidatePath('/about/suppliers');
    return { success: true };
  } catch (error) {
    console.error('Error creating supplier:', error);
    return { success: false, error: 'Failed to create supplier' };
  }
}

export async function deleteSupplier(id: string) {
  try {
    await prisma.supplier.delete({ where: { id } });
    await invalidateCache(CACHE_KEYS.ALL_SUPPLIERS);
    revalidateTag('suppliers');
    revalidatePath('/admin/suppliers');
    revalidatePath('/about/suppliers');
    return { success: true };
  } catch (error) {
    console.error('Error deleting supplier:', error);
    return { success: false, error: 'Failed to delete supplier' };
  }
}
