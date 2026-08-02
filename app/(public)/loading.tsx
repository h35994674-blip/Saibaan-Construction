import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-base)]">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--gold)]/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Loader Container */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated Rings */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--gold-border)]" />
          <div className="absolute inset-0 rounded-full border-2 border-[var(--gold)] border-t-transparent animate-spin" />
        </div>
        
        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <span className="text-[var(--gold)] text-xs font-bold tracking-[0.3em] uppercase">
            Loading
          </span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-light)] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-dark)] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
