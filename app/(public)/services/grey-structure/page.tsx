import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, HardHat, Hammer, Mountain, Columns, Layers, ShieldCheck } from 'lucide-react';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { generateMetadata as getSeoMetadata } from '@/lib/utils/seo';

export const metadata = getSeoMetadata({
  title: 'Grey Structure Services',
  description: 'Solid and reliable grey structure construction ensuring structural integrity and durability for every project in Peshawar.',
});

export default function GreyStructurePage() {
  return (
    <div className="bg-[#0c0c0c] overflow-hidden">
      
      {/* Custom keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes revealLine {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes scanDown {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-scan {
          animation: scanDown 4s ease-in-out infinite;
        }
      `}} />

      {/* 1. Brutalist Hero — Raw, Bold, Industrial */}
      <section className="relative min-h-screen flex items-end pb-24 pt-20 overflow-hidden">
        
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/services-hero.jpg" 
            alt="Grey Structure Construction" 
            fill 
            className="object-cover opacity-25 grayscale contrast-125"
            priority
          />
          {/* Heavy dark concrete-like overlay */}
          <div className="absolute inset-0 bg-[#0c0c0c]/70" />
        </div>
        
        {/* Vertical rule accent */}
        <div className="absolute left-8 md:left-20 top-0 bottom-0 z-10 flex flex-col items-center gap-0">
          <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
        </div>

        {/* Horizontal scan line */}
        <div className="absolute inset-x-0 h-[1px] bg-gold/20 top-1/3 z-10 animate-scan" />

        <div className="container relative z-20">
          {/* Large structural numbering */}
          <div className="text-[12vw] font-heading font-black text-white/5 select-none leading-none absolute -top-8 right-0 pointer-events-none">GS</div>
          
          <p className="text-[var(--text-muted)] tracking-[0.4em] uppercase text-xs font-bold mb-6 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-gold inline-block" />
            Grey Structure
          </p>
          
          <h1 className="text-6xl md:text-8xl xl:text-[120px] font-heading font-black text-white leading-[0.9] uppercase tracking-tighter mb-10">
            The <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(201,168,76,0.6)' }}>Bones</span> <br/>
            That Last.
          </h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 mt-4">
            <p className="text-[var(--text-secondary)] text-lg max-w-md leading-relaxed">
              A structure is only as strong as its foundation. We build the unyielding skeleton that will stand for generations.
            </p>
            <Link href="/get-quotation?service=grey-structure" className="group inline-flex items-center gap-4 text-white hover:text-gold transition-colors shrink-0">
              <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-gold">Start Building</span>
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                <ChevronRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Structural Stats Bar */}
      <section className="border-y border-white/10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: '500+', label: 'Structures Built' },
              { value: '35+', label: 'Years of Experience' },
              { value: '100%', label: 'Code Compliant' },
              { value: '0', label: 'Structural Failures' },
            ].map((stat, idx) => (
              <div key={idx} className="py-12 px-10 hover:bg-white/5 transition-colors">
                <div className="text-4xl md:text-5xl font-heading font-black text-gold mb-3">{stat.value}</div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What We Build (Raw split section) */}
      <section className="py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Large Architectural Image with raw overlay */}
            <div className="relative h-[600px] overflow-hidden">
              <Image src="/portfolio-hero.jpg" alt="Grey Structure" fill className="object-cover grayscale contrast-110" />
              {/* Structural overlay lines */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0c0c] z-10" />
              {/* Corner marks */}
              <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-gold z-20" />
              <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-gold z-20" />
              <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-gold z-20" />
              <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-gold z-20" />
            </div>

            {/* Right: Text content */}
            <div className="bg-[#0a0a0a] border-l border-white/5 p-12 md:p-16 flex flex-col justify-center">
              <div className="w-12 h-1 bg-gold mb-10" />
              <h2 className="text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-tight mb-8">
                The Art of Invisible Engineering
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Grey structure is the hidden heroism of construction. Long before any tile is laid or paint applied, we build the load-bearing columns, concrete slabs, brick masonry, and steel reinforcements that determine whether a building stands for 30 years or 300.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-12">
                At Saiban Construction, we treat every foundation pour and every RCC column with the same care a sculptor gives to stone. This is where excellence is born or buried.
              </p>
              <div className="space-y-4">
                {['RCC Columns & Beams', 'Reinforced Slab Work', 'Load-Bearing Masonry', 'Basement & Foundation Work'].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-white">
                    <div className="w-2 h-2 bg-gold rotate-45 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Construction Timeline */}
      <section className="py-32 bg-[#080808] relative overflow-hidden">
        {/* Background Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="container relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter mb-4">How We Build</h2>
            <p className="text-[var(--text-muted)] max-w-lg mx-auto">A systematic, phase-by-phase process from groundbreaking to final handover of the raw structure.</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical connecting line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold via-gold/30 to-transparent" />
            
            <div className="space-y-12">
              {[
                { icon: Mountain, phase: '01', title: 'Ground Preparation & Foundation', desc: 'Soil testing, excavation, and precise foundation laying with reinforced concrete to create an unshakable base for the entire structure.' },
                { icon: Columns, phase: '02', title: 'Columns & Retaining Walls', desc: 'Erecting load-bearing RCC columns at precise intervals, followed by retaining walls to secure the site and define the structural skeleton.' },
                { icon: Layers, phase: '03', title: 'Slab & Beam Work', desc: 'Formwork construction, steel bar placement (Rebar), and precision concrete pouring for horizontal slabs and connecting beams that distribute weight evenly.' },
                { icon: HardHat, phase: '04', title: 'Brick Masonry & Roofing', desc: 'High-quality brick laying for walls and partitions, followed by the roof structure — completing the enclosed grey shell of the building.' },
                { icon: ShieldCheck, phase: '05', title: 'Structural Inspection & Handover', desc: 'A final engineering inspection and load-bearing verification before the grey structure is formally handed over, ready for finishing work.' },
              ].map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-8 md:gap-12 pl-20 md:pl-28 group">
                  {/* Icon Node on the line */}
                  <div className="absolute left-0 top-0 w-16 md:w-24 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-none bg-[#0c0c0c] border-2 border-gold/30 group-hover:border-gold flex items-center justify-center transition-colors duration-300">
                      <step.icon size={22} className="text-gold" />
                    </div>
                  </div>
                  
                  <div className="flex-1 pb-4">
                    <div className="text-gold/50 text-xs font-bold tracking-widest mb-2">{step.phase}</div>
                    <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-gold transition-colors uppercase tracking-wide">{step.title}</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <CTABanner />

    </div>
  );
}
