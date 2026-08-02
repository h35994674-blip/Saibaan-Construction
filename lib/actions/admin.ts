'use server';

import { updateQuotationStatus } from '@/lib/db/queries/quotations';
import { revalidatePath } from 'next/cache';

export async function changeQuotationStatus(id: string, status: string) {
  try {
    await updateQuotationStatus(id, status);
    revalidatePath('/admin/quotations');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error updating quotation status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}
