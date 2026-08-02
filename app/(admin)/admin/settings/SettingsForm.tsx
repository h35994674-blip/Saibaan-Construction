'use client';

import * as React from 'react';
import { useState } from 'react';
import { saveSiteSettings } from '@/lib/actions/settings';
import { Loader2, Save, Globe, MapPin, Phone, Mail, Link as LinkIcon } from 'lucide-react';

export function SettingsForm({ initialData }: { initialData: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await saveSiteSettings(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Settings saved successfully! The changes are now live.' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to save settings.' });
    }
    
    setIsSubmitting(false);
    
    // Clear success message after 5 seconds
    if (result.success) {
      setTimeout(() => setMessage(null), 5000);
    }
  }

  const inputClasses = "w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-xl focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] outline-none transition-all text-white placeholder-[#555]";
  const labelClasses = "flex items-center gap-2 text-sm font-medium text-[#aaa] mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {message && (
        <div className={`p-4 rounded-xl border text-sm backdrop-blur-sm ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {message.text}
        </div>
      )}

      {/* Contact Information Card */}
      <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="p-6 md:p-8 relative z-10">
          <div className="flex items-center gap-3 mb-8 border-b border-[#222] pb-4">
            <div className="w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center text-gold">
              <Phone size={20} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-white">Contact Details</h2>
              <p className="text-xs text-[#888]">Primary communication channels</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>
                <Mail size={16} /> Email Address
              </label>
              <input type="email" name="email" defaultValue={initialData?.email || ''} className={inputClasses} placeholder="info@saibanconstruction.com" />
            </div>
            
            <div>
              <label className={labelClasses}>
                <Phone size={16} /> Phone Number
              </label>
              <input type="text" name="phone" defaultValue={initialData?.phone || ''} className={inputClasses} placeholder="+92 300 1234567" />
            </div>
            
            <div className="md:col-span-2">
              <label className={labelClasses}>
                <MapPin size={16} /> Physical Address
              </label>
              <input type="text" name="address" defaultValue={initialData?.address || ''} className={inputClasses} placeholder="123 Construction Avenue, Lahore" />
            </div>
            
            <div className="md:col-span-2">
              <label className={labelClasses}>
                <Globe size={16} /> Google Maps Embed URL
              </label>
              <input type="text" name="mapUrl" defaultValue={initialData?.mapUrl || ''} className={inputClasses} placeholder="https://www.google.com/maps/embed?pb=..." />
              <p className="text-xs text-[#666] mt-2 ml-1">Go to Google Maps &rarr; Share &rarr; Embed a map &rarr; Copy the &quot;src&quot; URL only.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links Card */}
      <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="p-6 md:p-8 relative z-10">
          <div className="flex items-center gap-3 mb-8 border-b border-[#222] pb-4">
            <div className="w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center text-gold">
              <LinkIcon size={20} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-white">Social Media</h2>
              <p className="text-xs text-[#888]">Connect with your audience</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Facebook URL</label>
              <input type="url" name="facebook" defaultValue={initialData?.facebook || ''} className={inputClasses} placeholder="https://facebook.com/..." />
            </div>
            
            <div>
              <label className={labelClasses}>Instagram URL</label>
              <input type="url" name="instagram" defaultValue={initialData?.instagram || ''} className={inputClasses} placeholder="https://instagram.com/..." />
            </div>
            
            <div>
              <label className={labelClasses}>YouTube URL</label>
              <input type="url" name="youtube" defaultValue={initialData?.youtube || ''} className={inputClasses} placeholder="https://youtube.com/..." />
            </div>
            
            <div>
              <label className={labelClasses}>LinkedIn URL</label>
              <input type="url" name="linkedin" defaultValue={initialData?.linkedin || ''} className={inputClasses} placeholder="https://linkedin.com/..." />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" disabled={isSubmitting} className="btn btn-primary flex items-center gap-2 px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isSubmitting ? 'Saving Changes...' : 'Save All Settings'}
        </button>
      </div>
    </form>
  );
}
