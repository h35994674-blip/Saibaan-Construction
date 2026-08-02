import * as React from 'react';
import Link from 'next/link';

export function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Full-width Section Background */}
      <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-50 bg-fixed" />
      <div className="absolute inset-0 bg-[#121214]/80" /> {/* Dark overlay */}
      
      {/* Ambient glow behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--gold)]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Glassmorphism Card */}
          <div className="relative rounded-3xl border border-white/10 bg-[#121214]/40 backdrop-blur-md p-10 md:p-16 lg:p-24 text-center overflow-hidden flex flex-col items-center shadow-2xl">
            
            {/* Corner gold accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[var(--gold)]/40 rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[var(--gold)]/40 rounded-br-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
              <span className="w-12 h-[2px] bg-[var(--gold)] mb-8" />
              
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                Ready to Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] via-[#F4D068] to-[var(--gold)] italic">Dream</span>?
              </h2>
              
              <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
                Let's discuss your project. Get a customized quotation and discover how Saiban Construction can bring your vision to life with uncompromising quality.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
                <Link href="/get-quotation" className="btn btn-primary btn-lg w-full sm:w-auto px-10 shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] transition-shadow">
                  Get Quotation
                </Link>
                <Link href="/contact" className="btn btn-outline btn-lg w-full sm:w-auto px-10 border-[var(--border)] hover:border-white text-white">
                  Contact Us
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
