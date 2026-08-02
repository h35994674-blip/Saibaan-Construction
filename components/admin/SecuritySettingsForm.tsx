'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { updateAdminCredentials } from '@/lib/actions/admin-account';
import { Loader2, Save, ShieldCheck, Mail, Lock } from 'lucide-react';

export function SecuritySettingsForm({ currentEmail }: { currentEmail?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const form = e.currentTarget;
    const passwordInput = form.elements.namedItem('password') as HTMLInputElement;
    const formData = new FormData(form);
    
    const result = await updateAdminCredentials(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Admin credentials updated successfully! You can use these to log in next time.' });
      if (passwordInput) passwordInput.value = '';
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update credentials.' });
    }
    
    setIsSubmitting(false);
    
    if (result.success) {
      setTimeout(() => setMessage(null), 5000);
    }
  }

  const inputClasses = "w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-xl focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] outline-none transition-all text-white placeholder-[#555]";
  const labelClasses = "flex items-center gap-2 text-sm font-medium text-[#aaa] mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-12">
      {message && (
        <div className={`p-4 rounded-xl border text-sm backdrop-blur-sm ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="p-6 md:p-8 relative z-10">
          <div className="flex items-center gap-3 mb-8 border-b border-[#222] pb-4">
            <div className="w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center text-gold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-white">Security Settings</h2>
              <p className="text-xs text-[#888]">Update your admin login credentials</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>
                <Mail size={16} /> Login Email
              </label>
              <input 
                type="text" 
                name="email" 
                defaultValue={currentEmail || ''} 
                className={inputClasses} 
                placeholder="admin@saibaanconstruction.com" 
                required 
              />
              <p className="text-xs text-[#666] mt-2 ml-1">This email will be used to log in.</p>
            </div>
            
            <div>
              <label className={labelClasses}>
                <Lock size={16} /> New Password
              </label>
              <input 
                type="password" 
                name="password" 
                className={inputClasses} 
                placeholder="Leave blank to keep current" 
              />
              <p className="text-xs text-[#666] mt-2 ml-1">Only enter a password if you want to change it.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" disabled={isSubmitting} className="btn btn-outline flex items-center gap-2 px-8 py-4 rounded-xl transition-all text-white border-[#333] hover:border-gold hover:text-gold">
          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isSubmitting ? 'Updating...' : 'Update Credentials'}
        </button>
      </div>
    </form>
  );
}
