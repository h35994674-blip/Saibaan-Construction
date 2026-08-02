'use client';

import * as React from 'react';
import { useState } from 'react';
import { createTestimonial, deleteTestimonial } from '@/lib/actions/testimonials';
import { Loader2, Plus, Save, Trash2, User, Star, MessageSquare, CheckCircle2, PenLine, Youtube } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { ImageUpload } from '@/components/ui/ImageUpload';

export function AddTestimonialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [type, setType] = useState<'written' | 'video'>('written');

  function handleClose() {
    setIsOpen(false);
    setPhotoUrl(null);
    setType('written');
    setError('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      clientName: formData.get('clientName') as string,
      projectType: formData.get('projectType') as string,
      rating: parseInt(formData.get('rating') as string),
      feedback: (formData.get('feedback') as string) || '',
      photoUrl: photoUrl,
      videoUrl: type === 'video' ? (formData.get('videoUrl') as string) || null : null,
      featured: formData.get('featured') === 'on',
    };

    const result = await createTestimonial(data);

    if (result.success) {
      handleClose();
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
        Add Testimonial
      </button>

      <Modal isOpen={isOpen} onClose={handleClose} title="Add New Testimonial">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm backdrop-blur-sm">
              {error}
            </div>
          )}

          {/* ── Type Selector ── */}
          <div className="flex rounded-xl overflow-hidden border border-[#222] bg-[#0a0a0a] p-1 gap-1">
            <button
              type="button"
              onClick={() => setType('written')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                type === 'written'
                  ? 'bg-[var(--gold)] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-[#aaa] hover:text-white'
              }`}
            >
              <PenLine size={15} /> Written Review
            </button>
            <button
              type="button"
              onClick={() => setType('video')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                type === 'video'
                  ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'text-[#aaa] hover:text-white'
              }`}
            >
              <Youtube size={15} /> Video Review
            </button>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

              <div>
                <label className={labelClasses}>
                  <User size={16} /> Client Name *
                </label>
                <input type="text" name="clientName" required className={inputClasses} placeholder="e.g., Ali Khan" />
              </div>

              <div>
                <label className={labelClasses}>
                  <CheckCircle2 size={16} /> Project Type
                </label>
                <input type="text" name="projectType" className={inputClasses} placeholder="e.g., Modern Villa Design" />
              </div>

              <div>
                <label className={labelClasses}>
                  <Star size={16} /> Rating (1-5) *
                </label>
                <input type="number" name="rating" min="1" max="5" defaultValue="5" required className={inputClasses} />
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>Client Photo (Optional)</label>
                <div className="bg-[#0a0a0a] p-1 rounded-xl border border-[#222]">
                  <ImageUpload
                    value={photoUrl}
                    onChange={setPhotoUrl}
                    onRemove={() => setPhotoUrl(null)}
                    label="Upload Client Photo"
                  />
                </div>
              </div>

              {/* Video URL — only shown for video type */}
              {type === 'video' && (
                <div className="md:col-span-2">
                  <label className={labelClasses}>
                    <Youtube size={16} className="text-red-400" /> YouTube Video URL *
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    required
                    className={`${inputClasses} border-red-500/30 focus:border-red-400`}
                    placeholder="e.g., https://youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-[#666] mt-1.5 ml-1">Paste the full YouTube video URL of the client&apos;s video review.</p>
                </div>
              )}

              <div className="md:col-span-2">
                <label className={labelClasses}>
                  <MessageSquare size={16} />
                  {type === 'video' ? 'Written Feedback (Optional)' : 'Feedback *'}
                </label>
                <textarea
                  name="feedback"
                  required={type === 'written'}
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  placeholder={type === 'video' ? 'Add a brief written summary (optional)...' : 'The team did an amazing job...'}
                ></textarea>
              </div>

              <div className="flex items-center gap-3 md:col-span-2 p-4 bg-[#0a0a0a] rounded-xl border border-[#222]">
                <input type="checkbox" name="featured" id="featured" defaultChecked className="w-5 h-5 accent-gold rounded focus:ring-gold" />
                <label htmlFor="featured" className="text-sm font-medium text-white cursor-pointer select-none">
                  Show on Homepage Slider
                </label>
              </div>

            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary flex items-center gap-2 px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSubmitting ? 'Saving...' : 'Save Testimonial'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function DeleteTestimonialModal({ testimonialId }: { testimonialId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setIsDeleting(true);
      await deleteTestimonial(testimonialId);
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
