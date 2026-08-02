import * as React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Client Feedbacks | Saiban Construction',
  description: 'Watch video reviews and read written feedback from satisfied Saiban Construction clients.',
};

const demoTestimonials = [
  { id: '1', clientName: 'Ahmed Raza', projectType: 'Luxury Villa Construction', feedback: "Saiban Construction turned our dream home into a reality. Their attention to detail and commitment to quality is unmatched. The grey structure and finishing were absolutely flawless.", rating: 5, photoUrl: null, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: '2', clientName: 'Sana Mirza', projectType: 'Bespoke Interior Design', feedback: "We hired Saiban for our entire home interior and they exceeded every expectation. The level of craftsmanship was exceptional. Our guests are always amazed.", rating: 5, photoUrl: null, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: '3', clientName: 'Fatima Ali', projectType: 'Commercial Office Interior', feedback: "The interior design team completely transformed our workspace. It is now modern, highly functional, and our employees love working here. An extremely professional team.", rating: 5, photoUrl: null, videoUrl: null },
  { id: '4', clientName: 'Usman Tariq', projectType: 'Full House Renovation', feedback: "Renovating an old house is always stressful, but Saiban made it completely seamless. They delivered on time and within budget without compromising on aesthetics.", rating: 5, photoUrl: null, videoUrl: null },
  { id: '5', clientName: 'Bilal Hassan', projectType: 'Grey Structure', feedback: "From foundation to roof, Saiban's grey structure work was rock solid. They used premium materials and their engineers were on-site every single day to ensure quality.", rating: 5, photoUrl: null, videoUrl: null },
  { id: '6', clientName: 'Rabia Khan', projectType: 'Landscaping & Outdoor', feedback: "Our garden and outdoor space now looks like something from a magazine. Saiban's landscaping team brought incredible creativity and executed it with perfection.", rating: 5, photoUrl: null, videoUrl: null },
];

async function getTestimonials() {
  try {
    const { getAllTestimonials } = await import('@/lib/db/queries/testimonials');
    const data = await getAllTestimonials();
    return data && data.length > 0 ? data : demoTestimonials;
  } catch {
    return demoTestimonials;
  }
}

export default async function FeedbacksPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      {/* ── Cinematic Hero Section ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[var(--bg-base)] overflow-hidden">
        {/* Background Image & Effects */}
        <div className="absolute inset-0 z-0">
          <Image src="/services-hero.jpg" alt="Client Feedbacks" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/80 to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/2 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-1/4 h-1/3 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">Testimonials</span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Hear From Our <span className="text-gold">Clients</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              Watch video reviews and read written feedback from families, businesses, and investors who trusted Saiban Construction to build their legacy.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-[var(--text-muted)] font-medium">Rated 5 Stars by our clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials Grid ── */}
      <TestimonialsSection testimonials={testimonials} sectionLabel="All Reviews" title="What Our Clients Say" />
      
      {/* ── CTA Banner ── */}
      <CTABanner />
    </>
  );
}
