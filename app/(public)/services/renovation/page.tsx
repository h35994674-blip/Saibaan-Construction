import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Clock, Wrench, Home, Building, UtensilsCrossed, Bath } from 'lucide-react';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { generateMetadata as getSeoMetadata } from '@/lib/utils/seo';

export const metadata = getSeoMetadata({
  title: 'Renovation Services',
  description: 'Complete renovation solutions that breathe new life into existing spaces with modern design and quality execution in Peshawar.',
});

export default function RenovationPage() {
  return (
    <div className="bg-[#111114] overflow-hidden">

      {/* Custom animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideFromLeft {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideFromRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes growBar {
          0% { width: 0%; }
          100% { width: var(--bar-width); }
        }
        .slide-left { animation: slideFromLeft 1s ease-out forwards; }
        .slide-right { animation: slideFromRight 1s ease-out forwards; }
      `}} />

      {/* 1. Before/After Split Hero */}
      <section className="relative min-h-screen flex items-stretch pt-20 overflow-hidden">

        {/* LEFT: "Before" — Dark, worn, desaturated */}
        <div className="w-1/2 relative overflow-hidden">
          <Image
            src="/services-hero.jpg"
            alt="Before Renovation"
            fill
            className="object-cover grayscale opacity-40 scale-110"
            priority
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
          {/* BEFORE label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <div className="text-[8vw] font-heading font-black text-white/10 select-none uppercase leading-none">Before</div>
          </div>
        </div>

        {/* RIGHT: "After" — Vibrant, warm, alive */}
        <div className="w-1/2 relative overflow-hidden">
          <Image
            src="/portfolio-hero.jpg"
            alt="After Renovation"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#111114]/60 to-transparent" />
          {/* AFTER label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <div className="text-[8vw] font-heading font-black text-gold/10 select-none uppercase leading-none">After</div>
          </div>
        </div>

        {/* CENTER DIVIDER — The transformation line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold to-transparent z-20" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30">
          <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.6)]">
            <ArrowRight size={20} className="text-white" />
          </div>
        </div>

        {/* OVERLAY: Main content centered */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 pointer-events-none">
          <div className="text-center px-6 pointer-events-auto animate-fade-in-up">
            <p className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-6">Total Transformation</p>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              Reimagine<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#f0d68b] to-gold">Every Space</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              We don't just renovate — we reimagine. Breathing new life, new purpose, and new energy into spaces that have lost their spark.
            </p>
            <Link href="/get-quotation?service=renovation" className="group inline-flex items-center gap-4 text-white hover:text-gold transition-colors">
              <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-gold">Plan Your Renovation</span>
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                <ChevronRight size={16} />
              </div>
            </Link>
          </div>
        </div>

      </section>

      {/* 2. Transformation Promise */}
      <section className="py-24 border-b border-white/5">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { icon: Clock, stat: '4–12 Weeks', label: 'Typical Timeline', desc: 'Fast, efficient execution with minimal disruption to your daily life.' },
              { icon: Home, stat: '30–70%', label: 'Value Uplift', desc: 'A well-executed renovation dramatically increases your property\'s market value.' },
              { icon: Wrench, stat: '10-Year', label: 'Workmanship Guarantee', desc: 'We stand behind every renovation with a comprehensive quality guarantee.' },
            ].map((item, idx) => (
              <div key={idx} className="py-12 px-10 hover:bg-white/[0.03] transition-colors group">
                <item.icon size={28} className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-heading font-black text-white mb-2">{item.stat}</div>
                <div className="text-xs uppercase tracking-widest text-gold font-bold mb-4">{item.label}</div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Renovation Specializations */}
      <section className="py-32">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">What We Renovate</h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
              From a single bathroom to an entire commercial complex — our renovation expertise is comprehensive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Home,
                title: 'Full Home Renovation',
                desc: 'Complete residential transformations — from structural changes to a new aesthetic identity for your entire home.',
                tags: ['Layout Changes', 'New Flooring', 'Kitchen & Baths', 'Painting & Finishing'],
                image: '/properties-hero.jpg',
              },
              {
                icon: UtensilsCrossed,
                title: 'Kitchen Remodeling',
                desc: 'Modernizing your kitchen with premium cabinetry, stone countertops, upgraded appliances, and new lighting design.',
                tags: ['Custom Cabinets', 'Stone Countertops', 'Appliance Integration', 'Island Design'],
                image: '/portfolio-hero.jpg',
              },
              {
                icon: Bath,
                title: 'Bathroom Upgrades',
                desc: 'Transforming bathrooms into spa-like sanctuaries with premium tiles, fixtures, and ambient lighting.',
                tags: ['Wet Room Design', 'Premium Fixtures', 'Heated Flooring', 'Bespoke Vanities'],
                image: '/services-hero.jpg',
              },
              {
                icon: Building,
                title: 'Commercial Renovation',
                desc: 'Revitalizing offices, restaurants, and retail spaces to reflect your brand and improve operational efficiency.',
                tags: ['Office Fit-Out', 'Brand Integration', 'F&B Spaces', 'Retail Design'],
                image: '/cta-bg.jpg',
              },
            ].map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-3xl border border-white/10 hover:border-gold/30 transition-all duration-500 bg-[#0d0d10]">
                {/* Background Image Preview on Hover */}
                <div className="relative h-52 overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/30 to-transparent" />
                  <item.icon size={28} className="absolute top-6 left-6 text-gold z-10" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed text-sm">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full border border-white/10 text-[var(--text-muted)] group-hover:border-gold/20 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Renovation Process */}
      <section className="py-32 bg-[#0d0d10] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <div className="container relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">Our Renovation Process</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg mb-8">
                A transparent, milestone-driven approach ensures you are always in control and the project never stalls.
              </p>
              <Link href="/portfolio?category=renovation" className="group inline-flex items-center gap-4 text-[var(--text-muted)] hover:text-white transition-colors">
                <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-transparent group-hover:border-white/30 transition-colors">View Renovation Portfolio</span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                  <ChevronRight size={16} />
                </div>
              </Link>
            </div>

            <div className="space-y-8">
              {[
                { num: '01', title: 'Consultation & Vision', desc: 'We visit your space, understand your goals, and draft a clear renovation brief.' },
                { num: '02', title: 'Design & Quotation', desc: 'Our team produces detailed design concepts and a transparent, itemized quote.' },
                { num: '03', title: 'Demolition & Prep', desc: 'Careful, controlled demolition protecting what stays and clearing what goes.' },
                { num: '04', title: 'Execution & Build', desc: 'Phase-by-phase construction with weekly progress updates and site reviews.' },
                { num: '05', title: 'Handover & Aftercare', desc: 'A thorough walkthrough, final punch list, and our 10-year workmanship guarantee.' },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="text-gold font-black text-lg font-heading shrink-0 w-8 pt-1 opacity-60 group-hover:opacity-100 transition-opacity">{step.num}</div>
                  <div className="border-b border-white/5 pb-8 flex-1 group-hover:border-gold/20 transition-colors">
                    <h4 className="text-white font-bold mb-2 group-hover:text-gold transition-colors">{step.title}</h4>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CTABanner />

    </div>
  );
}
