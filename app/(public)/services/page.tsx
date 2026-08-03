import * as React from 'react';
import { ServicesSection } from '@/components/sections/home/ServicesSection';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { generateMetadata } from '@/lib/utils/seo';
import { ArrowDown } from 'lucide-react';

export const metadata = generateMetadata({
  title: 'Our Services',
  description: 'Explore our comprehensive range of real estate and construction services, from architecture and interior design to landscaping and finishing.',
});

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/services-hero.jpg"
            alt="Saibaan Construction Services"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay — gradient from bottom to ensure text is always readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#121214]/95 via-[#121214]/70 to-[#121214]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-[#121214]/40" />
        </div>

        {/* Content */}
        <div className="container relative z-10 pt-32">
          <div className="max-w-2xl">
            <span className="section-label mb-6">What We Offer</span>
            <h1 className="font-heading text-white font-bold leading-[1.1] text-5xl md:text-6xl lg:text-7xl mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Comprehensive solutions for all your real estate and construction needs. We bring expertise, innovation, and uncompromising quality to every project.
            </p>

            {/* Scroll indicator */}
            <div className="flex items-center gap-3 text-[var(--text-secondary)] text-sm">
              <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center animate-bounce">
                <ArrowDown size={14} />
              </div>
              <span className="uppercase tracking-widest text-xs">Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesSection />

      <CTABanner />
    </>
  );
}
