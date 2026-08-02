'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { updateSiteSettings, SiteSettingsInput } from '../db/queries/settings';

export async function saveSiteSettings(formData: FormData) {
  try {
    const data: SiteSettingsInput = {
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      mapUrl: formData.get('mapUrl') as string,
      facebook: formData.get('facebook') as string,
      instagram: formData.get('instagram') as string,
      youtube: formData.get('youtube') as string,
      linkedin: formData.get('linkedin') as string,
    };

    await updateSiteSettings(data);

    // Bust the Next.js settings cache so Navbar/Footer refresh immediately
    revalidateTag('site-settings');

    // Revalidate paths that use these settings
    revalidatePath('/', 'layout');
    revalidatePath('/contact');
    revalidatePath('/admin/settings');

    return { success: true };
  } catch (error) {
    console.error('Failed to save settings:', error);
    return { success: false, error: 'Failed to save settings' };
  }
}
