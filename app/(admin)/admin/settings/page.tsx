import * as React from 'react';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { SettingsForm } from './SettingsForm';
import { SecuritySettingsForm } from '@/components/admin/SecuritySettingsForm';
import { prisma } from '@/lib/db/client';
import { Globe, MapPin, Phone, Mail } from 'lucide-react';

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  const adminAccount = await prisma.adminAccount.findUnique({
    where: { id: 'admin' }
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Site Settings</h1>
        <p className="text-[var(--text-muted)]">Manage your contact details and social media links across the website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Settings Form */}
        <div className="lg:col-span-2">
          <SettingsForm initialData={settings} />
          
          {/* Security Settings Form */}
          <SecuritySettingsForm currentEmail={adminAccount?.email || process.env.ADMIN_USERNAME} />
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-2xl p-6">
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Why update these?</h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
              The details you provide here will dynamically update across your entire website, including the header, footer, contact page, and call-to-action banners. This ensures your clients always have the right way to reach you.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <Mail size={16} className="text-gold" /> Updates Email Links
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <Phone size={16} className="text-gold" /> Updates Phone Numbers
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <MapPin size={16} className="text-gold" /> Updates Office Addresses
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <Globe size={16} className="text-gold" /> Updates Social Media Icons
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
