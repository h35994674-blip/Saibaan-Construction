import * as React from 'react';
import Image from 'next/image';
import { Target, Lightbulb, Users, Award, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { generateMetadata } from '@/lib/utils/seo';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata = generateMetadata({
  title: 'Who We Are',
  description: 'Learn about Saiban Construction, our mission, vision, and the expert team behind our success in the real estate and construction industry.',
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Who We Are"
        description="Building a legacy of excellence, one project at a time."
      />
      
      {/* ── Our Story (Redesigned) ── */}
      <section className="section bg-[var(--bg-base)] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gold/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <span className="section-label">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight">
                Redefining <span className="text-gold">Construction Standards</span> in Pakistan
              </h2>
              <div className="space-y-6 text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
                <p>
                  Saiban Construction was founded with a singular vision: to elevate the standard of real estate and construction across the nation. Over the years, we have grown from a modest team into a powerhouse of architectural innovation and structural integrity.
                </p>
                <p>
                  We believe that every structure has a soul, and every project is an opportunity to craft something enduring. Our commitment to uncompromising quality, transparent processes, and client-centric solutions has positioned us as trusted leaders in the industry.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle size={24} className="text-gold" />
                  <span className="text-white font-medium">Uncompromising Quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={24} className="text-gold" />
                  <span className="text-white font-medium">Transparent Processes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={24} className="text-gold" />
                  <span className="text-white font-medium">Client-Centric Solutions</span>
                </div>
              </div>
            </div>
            
            {/* Image Grid */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-4 md:gap-6 relative z-10">
                <div className="space-y-4 md:space-y-6 mt-12 md:mt-24">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[var(--border)] group">
                    <Image src="/services-hero.jpg" alt="Construction Site" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[var(--border)] group">
                    <Image src="/portfolio-hero.jpg" alt="Finished Project" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  </div>
                  {/* Floating Stats Card */}
                  <div className="bg-[var(--bg-surface-2)] border border-[var(--gold-border)] rounded-2xl p-6 md:p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-bl-[100px] transition-transform duration-500 group-hover:scale-110" />
                    <h3 className="text-4xl md:text-5xl font-heading font-bold text-gold mb-2">10+</h3>
                    <p className="text-white font-medium text-sm md:text-base uppercase tracking-wider">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Mission & Vision (Redesigned) ── */}
      <section className="section relative bg-[var(--bg-surface-1)] border-y border-[var(--border)] overflow-hidden">
        {/* Background Accents */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Mission Card */}
            <div className="group relative bg-[var(--bg-surface-2)]/50 backdrop-blur-md border border-[var(--border)] hover:border-gold/50 rounded-3xl p-10 md:p-14 overflow-hidden transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Target size={200} className="absolute -bottom-16 -right-16 text-gold/5 group-hover:text-gold/10 group-hover:scale-110 transition-all duration-700 rotate-12" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Target size={32} />
                </div>
                <h3 className="text-3xl font-heading font-bold text-white mb-6">Our Mission</h3>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed group-hover:text-white transition-colors duration-500">
                  To deliver exceptional construction and design services by fostering innovation, maintaining unwavering quality, and building lasting relationships with our clients based on trust and transparency. We aim to exceed expectations in every detail.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-[var(--bg-surface-2)]/50 backdrop-blur-md border border-[var(--border)] hover:border-gold/50 rounded-3xl p-10 md:p-14 overflow-hidden transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-bl from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Lightbulb size={200} className="absolute -bottom-16 -right-16 text-gold/5 group-hover:text-gold/10 group-hover:scale-110 transition-all duration-700 -rotate-12" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Lightbulb size={32} />
                </div>
                <h3 className="text-3xl font-heading font-bold text-white mb-6">Our Vision</h3>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed group-hover:text-white transition-colors duration-500">
                  To be the undisputed leader in Pakistan's real estate and construction landscape, renowned for crafting sustainable, luxurious, and iconic spaces that inspire generations. We build not just structures, but legacies.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Core Values (Redesigned) ── */}
      <section className="section bg-[var(--bg-base)]">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="section-label justify-center">Core Values</span>
            <h2 className="section-title text-white">What Drives Us Forward</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="group bg-[var(--bg-surface-2)] border border-[var(--border)] hover:border-gold/30 rounded-3xl p-10 hover:-translate-y-2 transition-all duration-500 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gold/5 border border-gold/10 group-hover:bg-gold/10 group-hover:border-gold/30 flex items-center justify-center text-gold mb-8 transition-all duration-500">
                <Award size={36} className="group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="text-2xl font-heading font-semibold text-white mb-4">Excellence</h4>
              <p className="text-[var(--text-muted)] text-base leading-relaxed">
                We accept nothing less than the highest standard in everything we do, from materials to craftsmanship.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="group bg-[var(--bg-surface-2)] border border-[var(--border)] hover:border-gold/30 rounded-3xl p-10 hover:-translate-y-2 transition-all duration-500 text-center delay-100">
              <div className="w-20 h-20 mx-auto rounded-full bg-gold/5 border border-gold/10 group-hover:bg-gold/10 group-hover:border-gold/30 flex items-center justify-center text-gold mb-8 transition-all duration-500">
                <Users size={36} className="group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="text-2xl font-heading font-semibold text-white mb-4">Collaboration</h4>
              <p className="text-[var(--text-muted)] text-base leading-relaxed">
                Working closely with clients, architects, and suppliers to ensure complete synergy and flawless execution.
              </p>
            </div>

            {/* Value 3 */}
            <div className="group bg-[var(--bg-surface-2)] border border-[var(--border)] hover:border-gold/30 rounded-3xl p-10 hover:-translate-y-2 transition-all duration-500 text-center delay-200">
              <div className="w-20 h-20 mx-auto rounded-full bg-gold/5 border border-gold/10 group-hover:bg-gold/10 group-hover:border-gold/30 flex items-center justify-center text-gold mb-8 transition-all duration-500">
                <Shield size={36} className="group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="text-2xl font-heading font-semibold text-white mb-4">Integrity</h4>
              <p className="text-[var(--text-muted)] text-base leading-relaxed">
                Transparent pricing, honest communication, and steadfast reliability throughout the entire project lifecycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team Teaser (Optional addition to make it feel premium) */}
      <section className="py-24 bg-[var(--bg-surface-1)] border-y border-[var(--border)]">
        <div className="container">
          <div className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
             <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent opacity-50 pointer-events-none" />
             <div className="max-w-2xl relative z-10">
               <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Meet The Experts Behind Saiban</h3>
               <p className="text-lg text-[var(--text-secondary)]">Discover the passionate team of architects, engineers, and designers who make every project a masterpiece.</p>
             </div>
             <Link href="/contact" className="relative z-10 whitespace-nowrap btn-primary group flex items-center gap-3 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
               Contact Our Team
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
