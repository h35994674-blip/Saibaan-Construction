'use client';

import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { siteConfig } from '@/config/site';
import { FolderOpen, CalendarDays, Users, MapPin } from 'lucide-react';

const icons = [FolderOpen, CalendarDays, Users, MapPin];

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="bg-[var(--bg-base)] border-b border-[#3A3A3E] py-0"
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {siteConfig.stats.map((stat, index) => {
            const Icon = icons[index];
            const isLast = index === siteConfig.stats.length - 1;

            return (
              <div
                key={stat.label}
                className={`
                  relative flex flex-col items-center justify-center text-center
                  py-14 px-8 gap-3
                  transition-all duration-700
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                  ${!isLast ? 'md:border-r border-[#3A3A3E]' : ''}
                  ${index < 2 ? 'border-b md:border-b-0 border-[#3A3A3E]' : ''}
                `}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Top gold line accent */}
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 h-[3px] bg-[var(--gold)] transition-all duration-700 ${inView ? 'w-12' : 'w-0'}`}
                  style={{ transitionDelay: `${index * 120 + 300}ms` }}
                />

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-[var(--gold-subtle)] border border-[var(--gold-border)] flex items-center justify-center text-[var(--gold)] mb-1">
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                {/* Number */}
                <div className="text-5xl md:text-6xl font-heading font-bold text-white leading-none">
                  <Counter value={stat.value} inView={inView} />
                  <span className="text-[var(--gold)]">{stat.suffix}</span>
                </div>

                {/* Label */}
                <p className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-[0.18em]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, inView]);

  return <span>{count}</span>;
}
