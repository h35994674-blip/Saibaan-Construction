import * as React from 'react';
import { ShieldCheck, Target, Clock, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

const features = [
  {
    icon: ShieldCheck,
    title: 'Uncompromising Quality',
    desc: 'We use premium materials and rigorous quality control to ensure your project stands the test of time.',
  },
  {
    icon: Target,
    title: 'Tailored Solutions',
    desc: 'Every client is unique. We provide customized designs and construction plans that align perfectly with your vision.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    desc: 'We respect your time. Our streamlined project management guarantees timely completion without cutting corners.',
  },
  {
    icon: Award,
    title: 'Expert Team',
    desc: 'Our team of seasoned architects, engineers, and craftsmen bring decades of combined experience to every site.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="section bg-[var(--bg-base)]">
      <div className="container relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="max-w-xl">
            <span className="font-heading italic text-[var(--gold)] text-2xl mb-4 block">The Saibaan Advantage</span>
            <h2 className="text-display text-white mb-6 leading-[1.1] text-5xl md:text-6xl">
              Why Choose<br/>Saibaan Construction?
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              We don't just build structures; we build trust. Discover what sets us apart as Pakistan's premier construction and design firm.
            </p>
          </div>

          {/* Right Column: 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#3A3A3E] border border-[#3A3A3E]">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              
              // Alternating backgrounds based on the screenshot pattern (Light, Dark, Dark, Light)
              const isLight = idx === 0 || idx === 3;
              const bgClass = isLight ? 'bg-[#3b3c36]' : 'bg-[#151517]';
              
              // Custom inner border radiuses
              const radiusClass = 
                idx === 0 ? 'rounded-br-[3rem]' :
                idx === 1 ? 'rounded-bl-[3rem]' :
                idx === 2 ? 'rounded-tr-[3rem]' :
                'rounded-tl-[3rem]';

              return (
                <div key={idx} className={`p-8 md:p-12 flex flex-col items-center text-center ${bgClass} ${radiusClass}`}>
                  <div className="w-14 h-14 bg-[#9c7225] flex items-center justify-center text-white mb-6">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-heading text-white mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
