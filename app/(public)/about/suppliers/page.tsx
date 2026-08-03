import * as React from 'react';
import Image from 'next/image';
import { ExternalLink, Link as LinkIcon, Building2 } from 'lucide-react';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { getAllSuppliers } from '@/lib/db/queries/suppliers';
import { generateMetadata } from '@/lib/utils/seo';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Our Suppliers',
  description: 'We partner with the finest suppliers and premium brands to ensure the highest quality materials for every Saibaan Construction project.',
});

export default async function SuppliersPage() {
  const suppliers = await getAllSuppliers();

  return (
    <>
      {/* ── Custom Cinematic Hero Section ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[var(--bg-base)] overflow-hidden">
        {/* Background Image & Gradients */}
        <div className="absolute inset-0 z-0">
          <Image src="/properties-hero.jpg" alt="Premium Materials" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/80 to-transparent" />
          <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-1/4 h-1/3 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">Our Partners</span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Premium <span className="text-gold">Suppliers</span> & Brands
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              Quality begins with the right materials. We partner with industry-leading global and local brands to ensure excellence in every detail of your project.
            </p>
            
            <div className="flex items-center gap-4">
               <div className="flex -space-x-4">
                 {[...Array(4)].map((_, i) => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--bg-base)] bg-[var(--bg-surface-2)] flex items-center justify-center">
                     <Building2 size={16} className="text-gold/50" />
                   </div>
                 ))}
               </div>
               <p className="text-sm text-[var(--text-muted)] font-medium">Trusted by top industry brands</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ── Suppliers Grid ── */}
      <section className="section relative bg-[var(--bg-base)] min-h-[50vh]">
        <div className="container relative z-10">
          {suppliers.length === 0 ? (
            <div className="text-center py-32 bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-3xl">
              <Building2 size={64} className="mx-auto text-[var(--border)] mb-6" />
              <h3 className="text-2xl font-heading text-white mb-3">Suppliers list is currently being updated.</h3>
              <p className="text-[var(--text-muted)]">Please check back soon to see our premium partners.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {suppliers.map((supplier) => (
                <div 
                  key={supplier.id} 
                  className="group relative bg-[var(--bg-surface-2)]/50 backdrop-blur-sm border border-[var(--border)] hover:border-[var(--gold-border)] rounded-3xl p-8 flex flex-col h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(212,175,55,0.08)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Logo Container */}
                    <div className="h-32 relative mb-8 bg-black/40 rounded-2xl flex items-center justify-center overflow-hidden border border-[var(--border)] group-hover:border-gold/30 transition-colors">
                      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {supplier.logoUrl ? (
                        <Image
                          src={supplier.logoUrl}
                          alt={supplier.name}
                          fill
                          className="object-contain p-6 filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                      ) : (
                        <span className="font-heading font-bold text-2xl tracking-wider text-[var(--text-muted)] group-hover:text-gold transition-colors">
                          {supplier.name}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-heading font-semibold text-white mb-3 group-hover:text-gold transition-colors">
                      {supplier.name}
                    </h3>
                    
                    <p className="text-[var(--text-secondary)] text-base leading-relaxed flex-grow mb-8">
                      {supplier.description || "Premium construction materials and fixtures supplier."}
                    </p>
                    
                    {supplier.website ? (
                      <a 
                        href={supplier.website.startsWith('http') ? supplier.website : `https://${supplier.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold hover:text-white transition-colors mt-auto w-fit"
                      >
                        Visit Website <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <div className="mt-auto pt-4 border-t border-[var(--border)]">
                         <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                           <LinkIcon size={14} /> Official Partner
                         </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Become a Supplier Teaser */}
      <section className="py-24 bg-[var(--bg-surface-1)] border-y border-[var(--border)]">
        <div className="container">
          <div className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
             <div className="relative z-10 max-w-2xl mx-auto">
               <Building2 size={48} className="mx-auto text-gold mb-6" />
               <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Become a Supplier</h3>
               <p className="text-lg text-[var(--text-secondary)] mb-10">We are always looking for reliable partners who share our commitment to exceptional quality and innovative materials.</p>
               <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                 Partner With Us
               </Link>
             </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
