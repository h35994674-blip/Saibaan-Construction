import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PenTool, Ruler, Building2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { generateMetadata as getSeoMetadata } from '@/lib/utils/seo';

export const metadata = getSeoMetadata({
  title: 'Architecture Services',
  description: 'Mastering structural elegance. Innovative architectural design blending functionality with aesthetic brilliance for residential and commercial projects.',
});

export default function ArchitectureServicePage() {
  return (
    <div className="bg-[#0a0a0c] overflow-hidden">
      
      {/* 1. Blueprint Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/properties-hero.jpg" 
            alt="Architecture Background" 
            fill 
            className="object-cover opacity-30 mix-blend-luminosity filter grayscale"
            priority
          />
        </div>
        
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/80 via-transparent to-[#0a0a0c] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/50 to-transparent z-10" />

        {/* Blueprint Grid Overlay Effect */}
        <div className="absolute inset-0 z-10 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(201, 168, 76, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 168, 76, 0.5) 1px, transparent 1px)',
               backgroundSize: '40px 40px' 
             }} 
        />

        <div className="container relative z-20">
          <div className="max-w-4xl animate-fade-in-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gold" />
              <span className="text-gold font-bold tracking-widest uppercase text-sm">Saibaan Core Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-tight mb-8">
              Mastering <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#f0d68b]">
                Structural Elegance
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed font-light">
              We transform ambitious visions into monumental reality through innovative design, precision engineering, and uncompromising aesthetic brilliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mt-8">
              <Link href="/get-quotation?service=architecture" className="group inline-flex items-center gap-4 text-white hover:text-gold transition-colors">
                <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-gold">Consult with an Architect</span>
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-white transition-all duration-300">
                  <ChevronRight size={16} />
                </div>
              </Link>
              
              <Link href="/portfolio?category=architecture" className="group inline-flex items-center gap-4 text-[var(--text-muted)] hover:text-white transition-colors">
                <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-transparent group-hover:border-white/30 transition-colors">View Portfolio</span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
                  <ChevronRight size={16} />
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce opacity-70">
          <span className="text-[10px] uppercase tracking-widest text-white mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* 2. Vision & Precision Section (Asymmetrical) */}
      <section className="py-24 md:py-32 relative z-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left: Philosophy */}
            <div className="lg:col-span-7 lg:pr-12">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight">
                Form meets function in perfect harmony.
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-[var(--text-secondary)]">
                <p>
                  At Saibaan Construction, architecture is more than just drafting blueprints—it is the delicate balance of environment, purpose, and art. We approach every residential and commercial project with a holistic mindset, ensuring that the structures we design not only look breathtaking but perform flawlessly.
                </p>
                <p>
                  Our team of visionary architects and meticulous engineers work in lockstep to push boundaries, resulting in spaces that inspire their inhabitants and stand the test of time.
                </p>
              </div>
            </div>

            {/* Right: Glassmorphism Stats Cards */}
            <div className="lg:col-span-5 relative h-[400px] w-full flex items-center justify-center">
              {/* Ambient Glow behind cards */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/20 blur-[100px] rounded-full" />
              
              {/* Card 1 */}
              <div className="absolute top-10 left-0 md:left-10 w-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:-translate-y-2 transition-transform duration-500 z-20">
                <div className="text-4xl font-heading font-bold text-gold mb-2">150+</div>
                <div className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider">Projects Completed</div>
              </div>

              {/* Card 2 */}
              <div className="absolute bottom-10 right-0 md:right-10 w-64 bg-[#111]/80 backdrop-blur-xl border border-gold/30 rounded-2xl p-6 shadow-2xl hover:-translate-y-2 transition-transform duration-500 z-30">
                <div className="text-4xl font-heading font-bold text-white mb-2">35+</div>
                <div className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider">Years Experience</div>
              </div>
              
              {/* Connecting element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent -rotate-45 opacity-50 z-10" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. The 3 Pillars */}
      <section className="py-24 relative z-20 bg-[#0d0d10] border-y border-white/5">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">The Three Pillars</h2>
            <p className="text-lg text-[var(--text-muted)]">
              Our architectural process is built on a foundation of three uncompromising principles that guide every line we draw.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="group bg-white/[0.02] border border-white/10 p-10 rounded-3xl hover:bg-white/[0.04] hover:border-gold/30 transition-all duration-500 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-500">
                <PenTool size={32} className="text-gold" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Conceptualization</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                It starts with a vision. We collaborate closely with you to understand your lifestyle or business needs, translating abstract ideas into comprehensive spatial concepts and stunning 3D visualizations.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="group bg-white/[0.02] border border-white/10 p-10 rounded-3xl hover:bg-white/[0.04] hover:border-gold/30 transition-all duration-500 flex flex-col h-full transform md:-translate-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-500">
                <Ruler size={32} className="text-gold" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Structural Integrity</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                Beauty requires a solid foundation. Our rigorous engineering and precise blueprinting ensure that every design is structurally optimized, code-compliant, and built to endure for generations.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="group bg-white/[0.02] border border-white/10 p-10 rounded-3xl hover:bg-white/[0.04] hover:border-gold/30 transition-all duration-500 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-500">
                <Building2 size={32} className="text-gold" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Aesthetic Brilliance</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                The final touch of mastery. We carefully select materials, optimize natural light, and refine architectural details to create striking façades and breathtaking interior volumes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Comprehensive Features list in a Grid */}
      <section className="py-24">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-white mb-12 text-center">Comprehensive Architecture Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {[
              "Custom Residential Design",
              "Commercial & Corporate Complexes",
              "3D Rendering & Visualization",
              "Master Planning & Urban Design",
              "Permit & Zoning Acquisition",
              "Sustainable & Green Architecture",
              "Structural Engineering Consultation",
              "Project Feasibility Studies"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-gold/20 transition-colors">
                <CheckCircle2 size={24} className="text-gold shrink-0" />
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-gold hover:text-white font-bold tracking-wide uppercase transition-colors">
              Explore Our Architectural Portfolio <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <CTABanner />

    </div>
  );
}
