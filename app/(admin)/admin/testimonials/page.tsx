import * as React from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Star, Video } from 'lucide-react';
import { getAllTestimonials } from '@/lib/db/queries/testimonials';
import { Badge } from '@/components/ui/Badge';
import { AddTestimonialModal, DeleteTestimonialModal } from '@/components/admin/TestimonialModals';

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Testimonials</h1>
          <p className="text-[var(--text-muted)]">Manage client feedback and reviews</p>
        </div>
        <AddTestimonialModal />
      </div>

      <div className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-surface-1)] border-b border-[var(--border)] text-[var(--text-muted)] text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Project Type</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium">Media</th>
                <th className="p-4 font-medium">Featured</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm text-[var(--text-secondary)]">
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[var(--text-muted)]">
                    No testimonials found. Add one to get started!
                  </td>
                </tr>
              ) : (
                testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-[var(--bg-surface-1)]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-white">{t.clientName}</div>
                      <div className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1">{t.feedback}</div>
                    </td>
                    <td className="p-4">{t.projectType || '-'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-gold">
                        {t.rating} <Star size={14} className="fill-gold" />
                      </div>
                    </td>
                    <td className="p-4">
                      {t.videoUrl ? <Video size={16} className="text-blue-400" /> : <span className="text-[var(--text-muted)]">-</span>}
                    </td>
                    <td className="p-4">
                      {t.featured ? (
                        <Badge variant="gold">Featured</Badge>
                      ) : (
                        <span className="text-[var(--text-muted)]">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/testimonials/${t.id}/edit`} className="p-2 hover:bg-[var(--bg-surface-1)] rounded transition-colors text-[var(--text-muted)] hover:text-white">
                          <Pencil size={16} />
                        </Link>
                        <DeleteTestimonialModal testimonialId={t.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
