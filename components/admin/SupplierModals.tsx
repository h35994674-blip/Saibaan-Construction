'use client';

import * as React from 'react';
import { useState } from 'react';
import { createSupplier, deleteSupplier } from '@/lib/actions/suppliers';
import { Loader2, Plus, Save, Trash2, Building2, Globe, Hash, ImageIcon, AlignLeft } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { ImageUpload } from '@/components/ui/ImageUpload';

export function AddSupplierModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      website: formData.get('website') as string,
      order: parseInt(formData.get('order') as string) || 0,
      description: formData.get('description') as string,
      logoUrl: logoUrl,
    };

    const result = await createSupplier(data);

    if (result.success) {
      setIsOpen(false);
      setLogoUrl(null);
    } else {
      setError(result.error || 'Something went wrong');
    }
    setIsSubmitting(false);
  }

  const inputClasses = "w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-xl focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] outline-none transition-all text-white placeholder-[#555]";
  const labelClasses = "flex items-center gap-2 text-sm font-medium text-[#aaa] mb-2";

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn btn-primary flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
        <Plus size={18} />
        Add Supplier
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Supplier">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm backdrop-blur-sm">
              {error}
            </div>
          )}

          <div className="bg-[#111] border border-[#222] rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              
              <div>
                <label className={labelClasses}>
                  <Building2 size={16} /> Supplier Name *
                </label>
                <input type="text" name="name" required className={inputClasses} placeholder="e.g., Master Tiles" />
              </div>

              <div>
                <label className={labelClasses}>
                  <Globe size={16} /> Website URL
                </label>
                <input type="url" name="website" className={inputClasses} placeholder="https://..." />
              </div>

              <div>
                <label className={labelClasses}>
                  <Hash size={16} /> Display Order
                </label>
                <input type="number" name="order" defaultValue="0" className={inputClasses} placeholder="0 = highest priority" />
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>
                  <ImageIcon size={16} /> Company Logo
                </label>
                <div className="bg-[#0a0a0a] p-1 rounded-xl border border-[#222]">
                  <ImageUpload 
                    value={logoUrl} 
                    onChange={setLogoUrl} 
                    onRemove={() => setLogoUrl(null)} 
                    label="Upload Supplier Logo"
                  />
                </div>
                <p className="text-xs text-[#777] mt-2 ml-1">Recommended: Transparent PNG, square or wide format.</p>
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>
                  <AlignLeft size={16} /> Brief Description
                </label>
                <textarea name="description" rows={3} className={`${inputClasses} resize-none`} placeholder="Premium ceramics and tiles provider..."></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary flex items-center gap-2 px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSubmitting ? 'Saving...' : 'Save Supplier'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function DeleteSupplierModal({ supplierId }: { supplierId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (confirm('Are you sure you want to delete this supplier?')) {
      setIsDeleting(true);
      await deleteSupplier(supplierId);
      setIsDeleting(false);
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] rounded-lg transition-all text-red-500 disabled:opacity-50"
      title="Delete"
    >
      {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}
