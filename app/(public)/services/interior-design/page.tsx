import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sofa, Sparkles, Paintbrush, ChevronRight } from 'lucide-react';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { generateMetadata as getSeoMetadata } from '@/lib/utils/seo';

export const metadata = getSeoMetadata({
  title: 'Interior Design Services',
  description: 'Transforming spaces into inspiring environments. Bespoke interior design solutions tailored to your lifestyle and aesthetic vision.',
});

export default function InteriorDesignPage() {
  return (
    <div className="bg-[#121214] overflow-hidden">
      
      {/* 1. Split-Screen "Soft Light" Hero */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row pt-20">
        
        {/* Left Side: Typography & Soft Ambient */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 relative z-10 bg-[#121214]">
          {/* Soft ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-xl animate-fade-in-up relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs">Bespoke Interiors</span>
              <div className="h-[1px] w-16 bg-gold/50" />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-light text-white leading-[1.1] mb-8">
              Spaces that <br/>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#f0d68b]">breathe life.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 leading-relaxed font-light">
              We curate environments that reflect your personality, combining timeless elegance with modern comfort to create spaces you never want to leave.
            </p>
            
            <Link href="/get-quotation?service=interior-design" className="group inline-flex items-center gap-4 text-white hover:text-gold transition-colors">
              <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-gold">Consult with a Designer</span>
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-white transition-all duration-300">
                <ChevronRight size={16} />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Side: Editorial Image */}
        <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-full">
          <Image 
            src="/portfolio-hero.jpg" 
            alt="Luxurious Interior Design" 
            fill 
            className="object-cover animate-fade-in"
            priority
          />
          {/* Subtle vignette for editorial feel */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#121214] lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent lg:hidden block" />
        </div>
      </section>

      {/* 2. Textural Philosophy (Editorial Reading Experience) */}
      <section className="py-32 relative">
        <div className="container max-w-4xl text-center">
          <Sparkles className="w-8 h-8 text-gold mx-auto mb-8 opacity-50" />
          <h2 className="text-3xl md:text-5xl font-heading font-light text-white leading-tight mb-10">
            "Design is not just what it looks like and feels like. Design is how it works harmoniously with the human spirit."
          </h2>
          <div className="w-24 h-[1px] bg-gold/30 mx-auto mb-10" />
          <p className="text-xl text-[var(--text-secondary)] leading-loose font-light">
            Our interior design philosophy revolves around sensory experiences. We believe that true luxury lies in the details—the tactile feel of custom upholstery, the precise warmth of ambient lighting, and the seamless flow from one room to the next. We don't just decorate rooms; we orchestrate atmospheres.
          </p>
        </div>
      </section>

      {/* 3. Spaces We Transform (Visual Image Bands) */}
      <section className="py-24 bg-[#0d0d10]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-gold font-bold tracking-widest uppercase text-xs block mb-3">Portfolio Focus</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">Spaces We Transform</h2>
            </div>
            <Link href="/portfolio?category=interior-design" className="btn btn-outline border-white/10 hover:border-gold text-sm rounded-full px-6">
              View Interior Gallery
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[800px] lg:h-[600px]">
            {/* Band 1 */}
            <div className="group relative rounded-3xl overflow-hidden overflow-hidden h-full">
              <Image src="/services-hero.jpg" alt="Living Spaces" fill className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="text-3xl font-heading font-bold text-white mb-2">Living Spaces</h3>
                <p className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-y-4 group-hover:translate-y-0 transform">
                  Warm, inviting, and flawlessly curated for comfort.
                </p>
              </div>
            </div>

            {/* Band 2 */}
            <div className="group relative rounded-3xl overflow-hidden h-full">
              <Image src="/properties-hero.jpg" alt="Commercial Interiors" fill className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="text-3xl font-heading font-bold text-white mb-2">Commercial</h3>
                <p className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-y-4 group-hover:translate-y-0 transform">
                  Inspiring workspaces that elevate brand identity.
                </p>
              </div>
            </div>

            {/* Band 3 */}
            <div className="group relative rounded-3xl overflow-hidden h-full">
              <Image src="/portfolio-hero.jpg" alt="Bespoke Kitchens & Baths" fill className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="text-3xl font-heading font-bold text-white mb-2">Kitchen & Bath</h3>
                <p className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-y-4 group-hover:translate-y-0 transform">
                  Highly functional, ultra-luxurious utility spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Material Palette */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <span className="text-gold font-bold tracking-widest uppercase text-xs block mb-4">Attention to Detail</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">The Material Palette</h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                We source only the finest materials globally. From the cool touch of imported Calacatta marble to the warm acoustics of bespoke walnut paneling, our material selections form the rich tapestry of your finished space.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-white"><Sofa className="text-gold" size={20} /> Custom Upholstery & Textiles</li>
                <li className="flex items-center gap-4 text-white"><Paintbrush className="text-gold" size={20} /> Curated Color Consultancy</li>
                <li className="flex items-center gap-4 text-white"><Sparkles className="text-gold" size={20} /> Architectural Lighting Design</li>
              </ul>
            </div>

            {/* Abstract Material Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Marble Representation */}
              <div className="aspect-square rounded-full bg-gradient-to-tr from-[#e5e5e5] via-white to-[#d4d4d4] shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                   <span className="text-white font-medium tracking-wider text-sm">MARBLE</span>
                 </div>
              </div>
              {/* Wood Representation */}
              <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-[#8b5a2b] to-[#5c3a21] shadow-2xl transform translate-y-8 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                   <span className="text-white font-medium tracking-wider text-sm">WALNUT</span>
                 </div>
              </div>
              {/* Velvet/Textile Representation */}
              <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-[#2a3b45] to-[#1a252b] shadow-2xl transform -translate-y-4 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                   <span className="text-white font-medium tracking-wider text-sm">VELVET</span>
                 </div>
              </div>
              {/* Gold/Metal Representation */}
              <div className="aspect-square rounded-full bg-gradient-to-br from-[#f0d68b] via-[#c9a84c] to-[#8a7333] shadow-2xl transform translate-y-4 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                   <span className="text-white font-medium tracking-wider text-sm">BRASS</span>
                 </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <CTABanner />

    </div>
  );
}
