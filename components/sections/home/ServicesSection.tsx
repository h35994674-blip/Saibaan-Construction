import * as React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

// Defines the alternating grid pattern (wider, narrower, narrower, wider, etc.)
const gridPatterns = [
  "md:col-span-7", // Row 1: Left (Wider)
  "md:col-span-5", // Row 1: Right (Narrower)
  "md:col-span-5", // Row 2: Left (Narrower)
  "md:col-span-7", // Row 2: Right (Wider)
  "md:col-span-7", // Row 3: Left (Wider)
  "md:col-span-5", // Row 3: Right (Narrower)
  "md:col-span-12" // Fallback for a 7th item
];

const serviceImages: Record<string, string> = {
  'architecture': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
  'interior-design': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
  'finishing': 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=1200',
  'grey-structure': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
  'renovation': 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200',
  'furnishing': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
  'landscaping': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1200',
};

export function ServicesSection() {
  return (
    <section className="section bg-[var(--bg-base)]">
      <div className="container">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="section-label justify-center">Our Expertise</span>
          <h2 className="section-title text-white">Comprehensive Real Estate & Construction Services</h2>
          <p className="section-subtitle mx-auto">
            We provide end-to-end solutions, from conceptual architecture to the final stroke of paint, ensuring unparalleled quality at every step.
          </p>
        </div>

        {/* 12-column grid to handle the asymmetric bento-box layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          {siteConfig.services.map((service, index) => {
            const spanClass = gridPatterns[index % gridPatterns.length];
            
            return (
              <Link 
                key={service.slug} 
                href={`/services/${service.slug}`} 
                className={`group relative overflow-hidden flex flex-col justify-end p-6 md:p-8 lg:p-10 min-h-[350px] md:min-h-[400px] ${spanClass}`}
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0 bg-[#111]">
                  <img 
                    src={serviceImages[service.slug] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80" 
                  />
                </div>
                
                {/* Dark Gradient Overlay for text readability (matches the image's vignette) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                
                {/* Text Content */}
                <div className="relative z-20 max-w-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl lg:text-4xl font-heading font-medium text-white mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-[#e2e2e2] text-sm lg:text-base mb-6 line-clamp-2 md:line-clamp-3 leading-relaxed font-light">
                    {service.description}
                  </p>
                  
                  {/* Distinctive Solid Gold Button matching the mockup */}
                  <div className="inline-flex px-6 py-2.5 bg-[#a0832e] group-hover:bg-[#c9a84c] text-white font-bold text-[13px] tracking-wider uppercase transition-colors">
                    Learn More
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
