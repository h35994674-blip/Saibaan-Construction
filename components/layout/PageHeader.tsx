import * as React from 'react';
import { cn } from '@/lib/utils/formatting';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <section className={cn("pt-32 pb-16 md:pt-40 md:pb-24 bg-[#0A0A0A] border-b border-[var(--border)]", className)}>
      <div className="container">
        <div className="max-w-3xl">
          <h1 className="text-h1 mb-4 text-white animate-fade-in-up">{title}</h1>
          {description && (
            <p className="text-body-lg text-[var(--text-secondary)] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
