'use client';

import * as React from 'react';
import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const accreditations = [
  { abbr: 'PEC', name: 'Pakistan Engineering Council', file: 'pec.png' },
  { abbr: 'FBR', name: 'Federal Board of Revenue', file: 'fbr.png' },
  { abbr: 'SECP', name: 'Securities & Exchange Commission of Pakistan', file: 'secp.png' },
  { abbr: 'KPRA', name: 'Khyber Pakhtunkhwa Revenue Authority', file: 'kpra.png' },
  { abbr: 'PCATP', name: 'Pakistan Council of Architects & Town Planners', file: 'pcatp.png' },
];

export function AccreditationsStrip() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (abbr: string) => {
    setFailedImages((prev) => ({ ...prev, [abbr]: true }));
  };

  return (
    <section className="py-20 bg-[var(--bg-base)] border-b border-[var(--border)]">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-[var(--gold)]" />
            <ShieldCheck className="text-[var(--gold)]" size={18} />
            <div className="h-px w-10 bg-[var(--gold)]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text-secondary)] mb-2">
            Registered &amp; Certified By
          </p>
          <h2 className="font-heading text-white text-3xl md:text-4xl font-bold">
            Trusted by Pakistan's Leading Authorities
          </h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-lg text-sm leading-relaxed">
            Our work is backed by official registrations and certifications from every major regulatory body in Pakistan.
          </p>
        </div>

        {/* Logo Row */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {accreditations.map((item) => (
            <div
              key={item.abbr}
              className="group flex flex-col items-center gap-4"
            >
              {/* Round logo circle */}
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-[var(--border)] group-hover:border-[var(--gold)] transition-all duration-300 shadow-md">
                {!failedImages[item.abbr] ? (
                  <img
                    src={`/${item.file}`}
                    alt={`${item.abbr} Logo`}
                    className="w-14 h-14 object-contain"
                    onError={() => handleImageError(item.abbr)}
                  />
                ) : (
                  <span className="text-xl font-heading font-black text-[#121214] tracking-widest">
                    {item.abbr}
                  </span>
                )}
              </div>

              {/* Name below */}
              <p className="text-[11px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--gold)] uppercase tracking-widest text-center max-w-[110px] leading-snug transition-colors duration-300">
                {item.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
