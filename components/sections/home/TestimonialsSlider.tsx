'use client';

import * as React from 'react';
import Image from 'next/image';
import { Star, Quote, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoModal } from '@/components/ui/VideoModal';

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

export function TestimonialsSlider({ testimonials = [] }: { testimonials?: any[] }) {
  const videoTestimonials = testimonials.filter(t => t.videoUrl);
  const textTestimonials = testimonials.filter(t => !t.videoUrl);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);

  const total = textTestimonials.length;

  const next = () => {
    if (isAnimating || total === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating || total === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label justify-center">Client Feedbacks</span>
          <h2 className="section-title text-white">Words From Our Clients</h2>
        </div>

        <div className="space-y-16">

          {/* ── Video Reviews ── */}
          {videoTestimonials.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Youtube size={18} className="text-red-400" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white">Video Reviews</h3>
                </div>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div className="p-5">
                        <div className="flex gap-1 text-gold mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < t.rating ? "currentColor" : "none"} className={i >= t.rating ? "text-gray-600" : ""} />
                          ))}
                        </div>
                        <p className="text-[var(--text-primary)] leading-relaxed italic mb-4 text-sm">"{t.feedback}"</p>
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

          {/* ── Text Reviews Slider ── */}
          {textTestimonials.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/10 border border-[var(--gold-border)] flex items-center justify-center">
                    <Quote size={16} className="text-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white">Written Reviews</h3>
                </div>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>

              <div className="max-w-4xl mx-auto relative px-4 md:px-12">
                {/* Prev/Next Buttons */}
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border)] text-[var(--text-muted)] hidden md:flex items-center justify-center hover:text-gold hover:border-[var(--gold-border)] transition-colors z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border)] text-[var(--text-muted)] hidden md:flex items-center justify-center hover:text-gold hover:border-[var(--gold-border)] transition-colors z-10"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Slider Track */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {textTestimonials.map((t) => (
                      <div key={t.id} className="w-full flex-shrink-0 px-2 md:px-4">
                        <div className="bg-[var(--bg-surface-2)] border border-[var(--gold-border)] rounded-2xl p-8 md:p-10 text-center relative">
                          <Quote size={80} className="absolute top-6 right-6 text-[var(--gold)] opacity-[0.05]" />
                          <div className="flex gap-1 text-gold justify-center mb-6">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={18} fill={i < t.rating ? "currentColor" : "none"} className={i >= t.rating ? "text-gray-600" : ""} />
                            ))}
                          </div>
                          <p className="text-lg md:text-xl text-[var(--text-primary)] font-medium leading-relaxed mb-8 italic">
                            "{t.feedback}"
                          </p>
                          <div className="flex flex-col items-center">
                            <ClientAvatar name={t.clientName} photoUrl={t.photoUrl} />
                            <h4 className="font-heading font-bold text-white text-lg mt-4">{t.clientName}</h4>
                            <span className="text-sm text-[var(--text-muted)]">{t.projectType}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {textTestimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-gold w-8' : 'bg-[var(--border)] w-2.5 hover:bg-[var(--text-muted)]'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <VideoModal isOpen={!!activeVideo} onClose={() => setActiveVideo(null)} videoUrl={activeVideo || ''} />
    </section>
  );
}
