'use client';

import * as React from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight, PlayCircle, Youtube } from 'lucide-react';
import { VideoModal } from '@/components/ui/VideoModal';

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

export function TestimonialsSection({
  testimonials,
  sectionLabel = 'Client Feedbacks',
  title = 'Words From Our Clients',
}: {
  testimonials: Testimonial[];
  sectionLabel?: string;
  title?: string;
}) {
  const textTestimonials = testimonials.filter(t => !t.videoUrl);
  const videoTestimonials = testimonials.filter(t => t.videoUrl);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);
  const total = textTestimonials.length;

  const next = () => {
    if (isAnimating || total === 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating || total === 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 500);
  };

  React.useEffect(() => {
    if (activeVideo || total === 0) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnimating, activeVideo, total]);

  return (
    <section className="section bg-[var(--bg-base)]">
      <div className="container">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label justify-center">{sectionLabel}</span>
          <h2 className="section-title text-white">{title}</h2>
        </div>

        <div className="space-y-20">

          {/* ── WRITTEN REVIEWS SLIDER (TOP) ── */}
          {textTestimonials.length > 0 && (
            <div>
              {/* Sub-heading */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/10 border border-[var(--gold-border)] flex items-center justify-center">
                    <Quote size={16} className="text-gold" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white">Written Reviews</h3>
                </div>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>

              {/* Slider */}
              <div className="max-w-4xl mx-auto relative px-0 md:px-14">
                {/* Prev */}
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border)] text-[var(--text-muted)] hidden md:flex items-center justify-center hover:text-gold hover:border-[var(--gold-border)] transition-colors z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                {/* Next */}
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border)] text-[var(--text-muted)] hidden md:flex items-center justify-center hover:text-gold hover:border-[var(--gold-border)] transition-colors z-10"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Track */}
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {textTestimonials.map(t => (
                      <div key={t.id} className="w-full flex-shrink-0">
                        <div className="bg-[var(--bg-surface-2)] border border-[var(--gold-border)] rounded-2xl px-8 md:px-16 py-12 text-center relative overflow-hidden">
                          {/* Decorative quote */}
                          <Quote size={120} className="absolute -top-4 -right-4 text-[var(--gold)] opacity-[0.04]" />

                          {/* Stars */}
                          <div className="flex gap-1 text-gold justify-center mb-6">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={20} fill={i < t.rating ? 'currentColor' : 'none'} className={i >= t.rating ? 'text-gray-600' : ''} />
                            ))}
                          </div>

                          {/* Review Text */}
                          <p className="text-xl md:text-2xl text-[var(--text-primary)] font-light leading-relaxed mb-10 italic">
                            &ldquo;{t.feedback}&rdquo;
                          </p>

                          {/* Author */}
                          <div className="flex flex-col items-center gap-3">
                            <ClientAvatar name={t.clientName} photoUrl={t.photoUrl} />
                            <div>
                              <h4 className="font-heading font-bold text-white text-lg">{t.clientName}</h4>
                              {t.projectType && <span className="text-sm text-[var(--text-muted)]">{t.projectType}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {textTestimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-gold w-8' : 'bg-[var(--border)] w-2 hover:bg-[var(--text-muted)]'}`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── VIDEO REVIEWS (BELOW) ── */}
          {videoTestimonials.length > 0 && (
            <div>
              {/* Sub-heading */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Youtube size={18} className="text-red-400" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white">Video Reviews</h3>
                </div>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>

              {/* Video Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {videoTestimonials.map(t => {
                  const videoId = getYouTubeId(t.videoUrl!);
                  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveVideo(t.videoUrl!)}
                      className="group text-left bg-[var(--bg-surface-2)] border border-[var(--border)] hover:border-[var(--gold-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(212,175,55,0.12)]"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-full pb-[56.25%] bg-black overflow-hidden">
                        <Image
                          src={thumb}
                          alt={`${t.clientName} video review`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-gold/90 group-hover:bg-gold group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.5)]">
                            <PlayCircle size={28} className="text-white ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="p-5">
                        <div className="flex gap-1 text-gold mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={13} fill={i < t.rating ? 'currentColor' : 'none'} className={i >= t.rating ? 'text-gray-600' : ''} />
                          ))}
                        </div>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic line-clamp-2 mb-4">
                          &ldquo;{t.feedback}&rdquo;
                        </p>
                        <div className="flex items-center gap-2.5">
                          <ClientAvatar name={t.clientName} photoUrl={t.photoUrl} />
                          <div>
                            <p className="font-heading font-bold text-white text-sm">{t.clientName}</p>
                            {t.projectType && <p className="text-xs text-[var(--text-muted)]">{t.projectType}</p>}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={!!activeVideo} onClose={() => setActiveVideo(null)} videoUrl={activeVideo || ''} />
    </section>
  );
}
