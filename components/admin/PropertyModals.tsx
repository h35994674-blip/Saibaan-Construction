'use client';

import * as React from 'react';
import { useState } from 'react';
import { createProperty, deleteProperty } from '@/lib/actions/properties';
import { Loader2, Plus, Save, Trash2, Home, Activity, CheckCircle2, DollarSign, MapPin, Square, Bed, Bath, List, ImageIcon, AlignLeft, Star } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { ImageUpload } from '@/components/ui/ImageUpload';

export function AddPropertyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      status: formData.get('status') as string,
      type: formData.get('type') as string,
      price: formData.get('price') as string,
      priceNumeric: formData.get('priceNumeric') ? parseFloat(formData.get('priceNumeric') as string) : null,
      location: formData.get('location') as string,
      marla: formData.get('marla') ? parseFloat(formData.get('marla') as string) : null,
      areaSqft: formData.get('areaSqft') ? parseInt(formData.get('areaSqft') as string) : null,
      beds: formData.get('beds') ? parseInt(formData.get('beds') as string) : null,
      baths: formData.get('baths') ? parseInt(formData.get('baths') as string) : null,
      description: formData.get('description') as string,
      coverImage: coverImage,
      featured: formData.get('featured') === 'on',
      features: (formData.get('features') as string).split(',').map(f => f.trim()).filter(Boolean),
    };

    const result = await createProperty(data);

    if (result.success) {
      setIsOpen(false);
      setCoverImage(null);
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
        Add Property
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Property">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm backdrop-blur-sm">
              {error}
            </div>
          )}

          <div className="bg-[#111] border border-[#222] rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              
              <div className="md:col-span-2">
                <label className={labelClasses}>
                  <Home size={16} /> Property Title *
                </label>
                <input type="text" name="title" required className={inputClasses} placeholder="e.g., 1 Kanal Luxury House" />
              </div>

              <div>
                <label className={labelClasses}>
                  <Activity size={16} /> Status *
                </label>
                <select name="status" required className={inputClasses}>
                  <option value="for-sale">For Sale</option>
                  <option value="for-rent">For Rent</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>
                  <CheckCircle2 size={16} /> Property Type *
                </label>
                <select name="type" required className={inputClasses}>
                  <option value="house">House</option>
                  <option value="plot">Plot</option>
                  <option value="commercial">Commercial</option>
                  <option value="apartment">Apartment</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>
                  <DollarSign size={16} /> Price (Display Text)
                </label>
                <input type="text" name="price" className={inputClasses} placeholder="e.g., 5.5 Crore" />
              </div>

              <div>
                <label className={labelClasses}>
                  <DollarSign size={16} /> Numeric Price (For Filtering)
                </label>
                <input type="number" name="priceNumeric" className={inputClasses} placeholder="e.g., 55000000" />
              </div>

              <div>
                <label className={labelClasses}>
                  <MapPin size={16} /> Location
                </label>
                <input type="text" name="location" className={inputClasses} placeholder="e.g., DHA Phase 6" />
              </div>

              <div>
                <label className={labelClasses}>
                  <Square size={16} /> Area (in Marla)
                </label>
                <input type="number" step="0.1" name="marla" className={inputClasses} placeholder="e.g., 10" />
              </div>

              <div>
                <label className={labelClasses}>
                  <Square size={16} /> Area (in SqFt)
                </label>
                <input type="number" name="areaSqft" className={inputClasses} placeholder="e.g., 4500" />
              </div>

              <div>
                <label className={labelClasses}>
                  <Bed size={16} /> Bedrooms
                </label>
                <input type="number" name="beds" className={inputClasses} placeholder="e.g., 5" />
              </div>

              <div>
                <label className={labelClasses}>
                  <Bath size={16} /> Bathrooms
                </label>
                <input type="number" name="baths" className={inputClasses} placeholder="e.g., 6" />
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>
                  <List size={16} /> Features (Comma separated)
                </label>
                <input type="text" name="features" className={inputClasses} placeholder="e.g., Swimming Pool, Servant Quarter" />
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>
                  <ImageIcon size={16} /> Cover Image
                </label>
                <div className="bg-[#0a0a0a] p-1 rounded-xl border border-[#222]">
                  <ImageUpload 
                    value={coverImage} 
                    onChange={setCoverImage} 
                    onRemove={() => setCoverImage(null)} 
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>
                  <AlignLeft size={16} /> Description
                </label>
                <textarea name="description" rows={3} className={`${inputClasses} resize-none`} placeholder="Detailed description..."></textarea>
              </div>

              <div className="flex items-center gap-3 md:col-span-2 p-4 bg-[#0a0a0a] rounded-xl border border-[#222]">
                <input type="checkbox" name="featured" id="featured" className="w-5 h-5 accent-gold rounded focus:ring-gold" />
                <label htmlFor="featured" className="text-sm font-medium text-white cursor-pointer select-none flex items-center gap-2">
                  <Star size={16} className="text-gold" /> Show on Homepage (Featured Property)
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary flex items-center gap-2 px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSubmitting ? 'Saving...' : 'Save Property'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function DeletePropertyModal({ propertyId }: { propertyId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (confirm('Are you sure you want to delete this property?')) {
      setIsDeleting(true);
      await deleteProperty(propertyId);
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
