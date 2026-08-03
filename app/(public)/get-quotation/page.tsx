import * as React from 'react';
import { Suspense } from 'react';
import { QuotationForm } from '@/components/forms/QuotationForm';
import { generateMetadata } from '@/lib/utils/seo';

export const metadata = generateMetadata({
  title: 'Get Quotation',
  description: 'Request a customized quotation for your construction, renovation, or design project with Saibaan Construction.',
});

export default function GetQuotationPage() {
  return (
    <>
      <div className="relative min-h-screen pt-32 pb-24 overflow-hidden flex items-center justify-center">
        {/* Full-Page Fixed Background */}
        <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center bg-fixed opacity-40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/90 via-[#121214]/60 to-[#121214] z-0" />

        <div className="container relative z-10 w-full max-w-4xl mx-auto">
          
          <div className="mb-12 text-center animate-fade-in-up">
            <span className="section-label justify-center mb-6">Start Your Project</span>
            <h1 className="font-heading text-white font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl mb-6">
              Request a <span className="text-gradient">Quotation</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Tell us about your vision. Fill out the form below to receive a customized quotation tailored to your specific needs and requirements.
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-[var(--bg-surface-1)]/80 backdrop-blur-xl border border-[var(--border)] rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-1 bg-gradient-to-l from-gold to-transparent opacity-50" />
              <div className="absolute bottom-0 left-0 w-64 h-1 bg-gradient-to-r from-gold to-transparent opacity-50" />
              
              {/* Ambient internal glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <Suspense fallback={<div className="text-white/50 text-center py-12">Loading form...</div>}>
                  <QuotationForm />
                </Suspense>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
