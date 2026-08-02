'use client'; // Client component for mount animations if needed, but we can do purely CSS

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Maximize, ShieldCheck, Ruler, Layers } from 'lucide-react';
import { CTABanner } from '@/components/sections/home/CTABanner';

export default function FinishingPage() {
  return (
    <div className="bg-[#050505] overflow-hidden">
      
      {/* Custom Keyframes for this specific page */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slowZoom 30s linear infinite alternate;
        }
      `}} />

      {/* 1. Macro Detail Hero */}
      <section className="relative h-screen min-h-[700px] flex flex-col items-center justify-center text-center pt-20 overflow-hidden">
        
        {/* Background Image with Slow Zoom */}
        <div className="absolute inset-0 z-0 bg-[#000]">
          <Image 
            src="/cta-bg.jpg" 
            alt="Macro Detail Finishing" 
            fill 
            className="object-cover opacity-50 grayscale animate-slow-zoom"
            priority
          />
        </div>
        
        {/* Strict Linear Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/80 z-10" />

        <div className="container relative z-20 animate-fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-white/30" />
            <span className="text-white/60 font-bold tracking-[0.3em] uppercase text-xs">Precision & Detail</span>
            <div className="h-[1px] w-8 bg-white/30" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-heading font-black text-white uppercase tracking-tight mb-8">
            The Final <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#555]">Touch</span>
          </h1>
          
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 font-medium">
            Where architecture meets reality. Zero-tolerance execution and flawless surfaces that define the Saiban Standard of excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 mt-8">
            <Link href="/get-quotation?service=finishing" className="group inline-flex items-center gap-4 text-white hover:text-gold transition-colors">
              <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-gold">Consult an Expert</span>
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-white transition-all duration-300">
                <ChevronRight size={16} />
              </div>
            </Link>
            
            <Link href="/portfolio?category=finishing" className="group inline-flex items-center gap-4 text-[var(--text-muted)] hover:text-white transition-colors">
              <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-transparent group-hover:border-white/30 transition-colors">View Excellence</span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
                <ChevronRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. The Craftsmanship Section (Strict Grid) */}
      <section className="py-24 border-y border-white/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 p-px">
            
            {/* Grid Cell 1 */}
            <div className="bg-[#080808] p-10 md:p-12 hover:bg-[#111] transition-colors">
              <Maximize className="text-gold mb-6" size={32} />
              <h3 className="text-xl font-heading font-bold text-white mb-4 uppercase tracking-wide">Zero Tolerance</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                We operate on a zero-tolerance policy for imperfections. Every joint, seam, and surface is measured and executed to millimeter precision.
              </p>
            </div>

            {/* Grid Cell 2 */}
            <div className="bg-[#080808] p-10 md:p-12 hover:bg-[#111] transition-colors">
              <Layers className="text-gold mb-6" size={32} />
              <h3 className="text-xl font-heading font-bold text-white mb-4 uppercase tracking-wide">Premium Materials</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                A flawless finish requires flawless materials. We source only the highest grade ceramics, paints, and woods to ensure lasting quality.
              </p>
            </div>

            {/* Grid Cell 3 */}
            <div className="bg-[#080808] p-10 md:p-12 hover:bg-[#111] transition-colors">
              <Ruler className="text-gold mb-6" size={32} />
              <h3 className="text-xl font-heading font-bold text-white mb-4 uppercase tracking-wide">Master Craftsmen</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Our finishing teams are specialized artisans. Tilers only tile, painters only paint. This hyper-specialization guarantees mastery.
              </p>
            </div>

            {/* Grid Cell 4 */}
            <div className="bg-[#080808] p-10 md:p-12 hover:bg-[#111] transition-colors">
              <ShieldCheck className="text-gold mb-6" size={32} />
              <h3 className="text-xl font-heading font-bold text-white mb-4 uppercase tracking-wide">Rigorous QA</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Multiple stages of quality assurance and sign-offs ensure the final handover exceeds your highest expectations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Core Finishing Disciplines (Alternating Layout) */}
      <section className="py-32">
        <div className="container max-w-6xl">
          
          <div className="mb-24 text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">Core Disciplines</h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-6" />
          </div>

          <div className="space-y-32">
            
            {/* Discipline 1: Flooring */}
            <div className="flex flex-col md:flex-row items-center gap-12 group">
              <div className="w-full md:w-1/2 relative h-[400px] overflow-hidden rounded-sm">
                <Image src="/services-hero.jpg" alt="Flooring & Tiling" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                {/* Structural frame */}
                <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none" />
              </div>
              <div className="w-full md:w-1/2">
                <div className="text-gold font-bold tracking-widest text-sm mb-4">01</div>
                <h3 className="text-3xl font-heading font-bold text-white mb-6 uppercase tracking-wide">Flooring & Tiling</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  From expansive marble slabs to intricate porcelain mosaics and warm hardwood, our flooring installation is characterized by perfect leveling, imperceptible grout lines, and flawless transitions between spaces.
                </p>
              </div>
            </div>

            {/* Discipline 2: Walls & Paint */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 group">
              <div className="w-full md:w-1/2 relative h-[400px] overflow-hidden rounded-sm">
                <Image src="/properties-hero.jpg" alt="Paint & Wall Finishes" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none" />
              </div>
              <div className="w-full md:w-1/2 md:text-right">
                <div className="text-gold font-bold tracking-widest text-sm mb-4">02</div>
                <h3 className="text-3xl font-heading font-bold text-white mb-6 uppercase tracking-wide">Paint & Textures</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Extensive wall preparation, base-coating, and meticulous sanding precede any final coat. Whether it's a smooth matte finish, a Venetian plaster, or custom wall paneling, we ensure a pristine, blemish-free surface.
                </p>
              </div>
            </div>

            {/* Discipline 3: Ceiling & Lighting */}
            <div className="flex flex-col md:flex-row items-center gap-12 group">
              <div className="w-full md:w-1/2 relative h-[400px] overflow-hidden rounded-sm">
                <Image src="/portfolio-hero.jpg" alt="Ceiling & Lighting" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none" />
              </div>
              <div className="w-full md:w-1/2">
                <div className="text-gold font-bold tracking-widest text-sm mb-4">03</div>
                <h3 className="text-3xl font-heading font-bold text-white mb-6 uppercase tracking-wide">Ceilings & Integration</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Architectural drop ceilings, cove lighting, and seamless HVAC integration. We design and execute overhead elements that define the geometry of a room while hiding all utilitarian infrastructure.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. The Saiban Standard */}
      <section className="py-24 bg-[#080808] relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        
        <div className="container relative z-10 max-w-4xl text-center">
          <ShieldCheck size={48} className="text-gold mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-8">The Saiban Standard</h2>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed font-light">
            Before we hand over the keys, a dedicated quality control inspector audits the property. Using specialized lighting to check for wall imperfections, levels to verify flooring, and multi-point checklists for woodwork, we guarantee the finish meets our uncompromising standard.
          </p>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <CTABanner />

    </div>
  );
}
