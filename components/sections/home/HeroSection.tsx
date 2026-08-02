'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function HeroSection() {
  const [year, setYear] = React.useState(1900);
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);

  React.useEffect(() => {
    // Prevent 90MB video download on mobile devices
    if (window.innerWidth >= 768) {
      setShouldLoadVideo(true);
    }

    let start = 1900;
    const end = 1988;
    const duration = 2000;
    const increment = (end - start) / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setYear(end);
        clearInterval(timer);
      } else {
        setYear(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-[#080808]">
        {/* On mobile, only the poster shows. On desktop, the video mounts and plays. */}
        {shouldLoadVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 transition-opacity duration-1000"
            poster="/og-image.jpg"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center opacity-60" 
            style={{ backgroundImage: 'url(/og-image.jpg)' }} 
          />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-black/20" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl pt-20">
          {/* Top Badge & Tagline Row */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--gold-border)] bg-[var(--gold-subtle)] backdrop-blur-md shadow-[0_0_15px_rgba(201,168,76,0.15)] w-fit">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-ping opacity-75" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-[var(--gold)] inline-block" />
              </div>
              <span className="text-[var(--gold)] text-xs font-bold uppercase tracking-[0.25em]">Since {year}</span>
            </div>
            
            {/* Tagline */}
            <span className="text-[var(--text-secondary)] font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
              {siteConfig.tagline}
            </span>
          </div>

          {/* Modern Headline */}
          <h1 
            className="font-heading text-6xl md:text-7xl lg:text-[5.5rem] text-white mb-6 tracking-tight leading-[1.05] animate-fade-in-up" 
            style={{ animationDelay: '150ms' }}
          >
            Crafting <span className="font-light text-[var(--text-muted)]">Legacy,</span><br />
            Building Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] via-[#F4D068] to-[var(--gold)] italic">Dream</span>
          </h1>
          <p 
            className="text-body-lg text-[var(--text-secondary)] mb-10 max-w-2xl animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            From stunning architecture to flawless finishing. Saiban Construction delivers premium real estate and construction services across Pakistan.
          </p>

          <div 
            className="flex flex-wrap items-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <Link href="/portfolio" className="btn btn-primary btn-lg group">
              View Portfolio
              <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/get-quotation" className="btn btn-outline btn-lg">
              Get Quotation
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in" style={{ animationDelay: '1000ms' }}>
        <div className="w-[1px] h-[60px] bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[30%] bg-white blur-[1px] animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </section>
  );
}
