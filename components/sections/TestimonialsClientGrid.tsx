'use client';

import * as React from 'react';
import Image from 'next/image';
import { Quote, Star, Youtube } from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  projectType?: string | null;
  rating: number;
  feedback: string;
  photoUrl?: string | null;
  videoUrl?: string | null;
}

function getYouTubeId(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v') || '';
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
  } catch {}
  return '';
}

function ClientAvatar({ name, photoUrl }: { name: string; photoUrl?: string | null }) {
  return (
    <div className="w-12 h-12 rounded-full bg-[var(--bg-surface-3)] overflow-hidden border-2 border-[var(--gold-border)] flex items-center justify-center shrink-0">
      {photoUrl ? (
        <Image src={photoUrl} alt={name} width={48} height={48} className="object-cover w-full h-full" />
      ) : (
        <span className="text-lg font-bold text-gold">{name.charAt(0)}</span>
      )}
    </div>
  );
}

export function TestimonialsClientGrid({ testimonials }: { testimonials: Testimonial[] }) {
  const videoTestimonials = testimonials.filter(t => t.videoUrl);
  const textTestimonials = testimonials.filter(t => !t.videoUrl);

  return (
    <div className="space-y-20">

      {/* ── Video Reviews ── */}
      {videoTestimonials.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Youtube size={20} className="text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">Video Reviews</h2>
                <p className="text-sm text-[var(--text-muted)]">Watch what our clients have to say</p>
              </div>
            </div>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoTestimonials.map((t) => {
              const videoId = getYouTubeId(t.videoUrl!);
              return (
                <div key={t.id} className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--gold-border)] transition-colors">
                  <div className="relative w-full pb-[56.25%] bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`${t.clientName} video review`}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex gap-1 text-gold mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill={i < t.rating ? "currentColor" : "none"} className={i >= t.rating ? "text-gray-600" : ""} />
                      ))}
                    </div>
                    <p className="text-[var(--text-primary)] leading-relaxed italic mb-5 text-sm">"{t.feedback}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                      <ClientAvatar name={t.clientName} photoUrl={t.photoUrl} />
                      <div>
                        <h4 className="font-heading font-bold text-white text-sm">{t.clientName}</h4>
                        {t.projectType && <span className="text-xs text-[var(--text-muted)]">{t.projectType}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Written Reviews ── */}
      {textTestimonials.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-[var(--gold-border)] flex items-center justify-center">
                <Quote size={18} className="text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">Written Reviews</h2>
                <p className="text-sm text-[var(--text-muted)]">Words from our satisfied clients</p>
              </div>
            </div>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {textTestimonials.map((t) => (
              <div key={t.id} className="bg-[var(--bg-surface-2)] border border-[var(--border)] hover:border-[var(--gold-border)] transition-colors rounded-2xl p-7 flex flex-col">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex gap-1 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill={i < t.rating ? "currentColor" : "none"} className={i >= t.rating ? "text-gray-600" : ""} />
                    ))}
                  </div>
                  <Quote size={28} className="text-[var(--gold)] opacity-20" />
                </div>
                <p className="text-[var(--text-primary)] leading-relaxed italic mb-6 flex-grow">"{t.feedback}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-[rgba(255,255,255,0.05)]">
                  <ClientAvatar name={t.clientName} photoUrl={t.photoUrl} />
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">{t.clientName}</h4>
                    {t.projectType && <span className="text-xs text-[var(--text-muted)]">{t.projectType}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
