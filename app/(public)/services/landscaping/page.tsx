import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Leaf, Droplets, Sun, TreePine, Wind, Sprout } from 'lucide-react';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { generateMetadata as getSeoMetadata } from '@/lib/utils/seo';

export const metadata = getSeoMetadata({
  title: 'Landscape Services',
  description: 'Beautiful outdoor landscaping design creating serene, functional, and visually stunning garden and outdoor spaces in Peshawar.',
});

export default function LandscapingPage() {
  return (
    <div className="overflow-hidden bg-[#080e08]" style={{ backgroundColor: '#0a0a0a' }}>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg) scale(1.02); }
          50% { transform: rotate(2deg) scale(1.05); }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .animate-sway { animation: sway 8s ease-in-out infinite; }
        .animate-ripple { animation: ripple 2.5s ease-out infinite; }
        .animate-ripple-delay { animation: ripple 2.5s ease-out infinite 1.2s; }
      `}} />

      {/* 1. Immersive Nature Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

        {/* Living Background with sway */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/portfolio-hero.jpg"
            alt="Landscape Design"
            fill
            className="object-cover opacity-35 animate-sway"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
        </div>

        {/* Ambient gold glow */}
        <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full blur-[150px] pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)' }} />

        <div className="container relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            {/* Nature badge */}
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-[var(--gold-border)] bg-[var(--gold-subtle)] backdrop-blur-sm">
              <Leaf size={14} className="text-gold" />
              <span className="text-gold text-xs font-bold tracking-widest uppercase">Outdoor Living</span>
            </div>

            <h1 className="font-heading font-black text-white leading-[0.9] mb-8 text-6xl md:text-8xl">
              Where Nature <br/>
              <span className="text-gradient">Meets Design.</span>
            </h1>

            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-12 font-light max-w-2xl">
              We sculpt the outdoors into living, breathing extensions of your home. Serene gardens, striking hardscapes, and lush sanctuaries — all designed to thrive for decades.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              <Link href="/get-quotation?service=landscaping" className="group inline-flex items-center gap-4 text-white hover:text-gold transition-colors">
                <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-gold">Design My Garden</span>
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                  <ChevronRight size={16} />
                </div>
              </Link>
              <Link href="/portfolio?category=landscaping" className="group inline-flex items-center gap-4 text-[var(--text-muted)] hover:text-white transition-colors">
                <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-transparent group-hover:border-white/30 transition-colors">View Our Gardens</span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                  <ChevronRight size={16} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom organic SVG wave */}
        <div className="absolute bottom-0 inset-x-0 z-10">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20 fill-[#0a0a0a]">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-surface-1)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]">
            {[
              { value: '200+', label: 'Gardens Designed', icon: Leaf },
              { value: '35+', label: 'Plant Species Expertise', icon: Sprout },
              { value: '100%', label: 'Quality Materials', icon: Sun },
              { value: '5★', label: 'Client Satisfaction', icon: Wind },
            ].map((stat, idx) => (
              <div key={idx} className="py-12 px-8 hover:bg-white/[0.02] transition-colors group">
                <stat.icon size={22} className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-4xl font-heading font-black text-white mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-[var(--text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What We Create (Alternating panorama cards) */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container">
          <div className="text-center mb-20">
            <span className="text-gold font-bold tracking-widest uppercase text-xs block mb-4">Outdoor Expertise</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">What We Create</h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
              From intimate urban gardens to expansive estate grounds, every outdoor space is a canvas we treat with reverence.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { title: 'Garden Design & Planting', icon: Leaf, desc: 'Curated plant palettes for year-round beauty, combining seasonal blooms, evergreens, and structural planting for a garden that evolves with time.', img: '/portfolio-hero.jpg', tag: 'Residential' },
              { title: 'Hardscaping & Paving', icon: TreePine, desc: 'Stone pathways, pergolas, retaining walls, and outdoor patios crafted from premium natural stone and timber to define structure in the garden.', img: '/services-hero.jpg', tag: 'Structural' },
              { title: 'Water Features & Pools', icon: Droplets, desc: 'Serene ponds, cascading water walls, and custom swimming pools that bring movement, sound, and life to your outdoor sanctuary.', img: '/properties-hero.jpg', tag: 'Feature' },
            ].map((service, idx) => (
              <div key={idx} className={`group flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--gold-border)] transition-all duration-500 bg-[var(--bg-surface-1)]`}>
                {/* Image */}
                <div className="relative w-full md:w-1/2 h-72 md:h-auto min-h-[280px] overflow-hidden">
                  <Image src={service.img} alt={service.title} fill className="object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700" />
                  <div className={`absolute inset-0 ${idx % 2 === 0 ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-transparent to-[var(--bg-surface-1)]`} />
                  <div className="absolute top-6 left-6 px-3 py-1 rounded-full text-xs font-bold border border-[var(--gold-border)] bg-[var(--gold-subtle)] text-gold">
                    {service.tag}
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                  <service.icon size={28} className="text-gold mb-6" />
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-5 group-hover:text-gold transition-colors">{service.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-base">{service.desc}</p>
                  <div className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest">
                    Explore Service <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Biophilic Philosophy */}
      <section className="py-32 bg-[var(--bg-surface-1)] border-t border-[var(--border)] relative overflow-hidden">
        {/* Organic blob shape */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
          <svg viewBox="0 0 800 600" className="absolute -bottom-20 -right-20 w-[600px] h-[600px] text-gold" fill="currentColor">
            <path d="M400,50 Q500,100 550,200 Q600,300 550,400 Q500,500 400,550 Q300,600 200,550 Q100,500 50,400 Q0,300 50,200 Q100,100 200,50 Q300,0 400,50Z" />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Left: Ripple visual metaphor */}
            <div className="relative flex items-center justify-center h-72">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-gold/20 animate-ripple" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-gold/20 animate-ripple-delay" />
                </div>
                <div className="relative w-32 h-32 rounded-full bg-[var(--gold-subtle)] border border-[var(--gold-border)] flex items-center justify-center shadow-[0_0_60px_rgba(201,168,76,0.15)]">
                  <Leaf size={40} className="text-gold" />
                </div>
              </div>
            </div>

            {/* Right: Philosophy */}
            <div>
              <span className="text-gold font-bold tracking-widest uppercase text-xs block mb-6">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-8 leading-tight">Biophilic Design.<br/>Human-Centered Nature.</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6 text-lg">
                Biophilic design is the belief that human beings thrive in environments connected to nature. We bring this principle to every garden — not just planting shrubs, but engineering ecosystems.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed mb-10">
                From choosing plants native to the Khyber Pakhtunkhwa climate to designing irrigation systems that minimize water waste, our approach is both beautiful and sustainable.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Native Plant Selection', 'Climate-Smart Irrigation', 'Year-Round Color Planning', 'Sustainable Materials'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CTABanner />

    </div>
  );
}
