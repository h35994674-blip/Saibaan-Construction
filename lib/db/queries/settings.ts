import { prisma } from '../client';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

export interface SiteSettingsInput {
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  mapUrl?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  linkedin?: string | null;
}

const DEFAULT_SETTINGS = {
  id: 'global',
  email: 'info@saibanconstruction.com',
  phone: '+92 300 1234567',
  address: '123 Construction Avenue, DHA, Lahore',
  mapUrl: '',
  facebook: '',
  instagram: '',
  youtube: '',
  linkedin: '',
  updatedAt: new Date(),
};

// Cached for 1 hour — revalidated when admin saves settings
const fetchSettingsCached = cache(unstable_cache(
  async () => {
    try {
      const settings = await prisma.siteSettings.findUnique({
        where: { id: 'global' },
      });
      return settings ?? DEFAULT_SETTINGS;
    } catch (error) {
      console.error('Error fetching site settings:', error);
      return DEFAULT_SETTINGS;
    }
  },
  ['site-settings'],
  { revalidate: 3600, tags: ['site-settings'] }
));

export const getSiteSettings = async () => {
  try {
    // If database/cache takes longer than 800ms, fallback to defaults immediately
    // to unblock navigation. The cache will still populate in the background.
    const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(DEFAULT_SETTINGS), 800));
    const result = await Promise.race([fetchSettingsCached(), timeoutPromise]);
    return result as typeof DEFAULT_SETTINGS;
  } catch (error) {
    return DEFAULT_SETTINGS;
  }
};

export async function updateSiteSettings(data: SiteSettingsInput) {
  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'global' },
      update: {
        ...data,
      },
      create: {
        id: 'global',
        ...data,
      },
    });

    return settings;
  } catch (error) {
    console.error('Error updating site settings:', error);
    throw error;
  }
}
