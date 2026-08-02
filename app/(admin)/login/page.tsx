'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, User, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError('Invalid username or password');
      setIsLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#080808]">
      
      {/* Left Panel - Premium Imagery (Hidden on smaller screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="/portfolio-hero.jpg"
          alt="Saiban Construction Architecture"
          fill
          priority
          className="object-cover scale-105 animate-[slow-zoom_20s_ease-in-out_infinite_alternate]"
        />
        {/* Gradients and Overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-[var(--gold)] mix-blend-overlay opacity-20 z-10" />
        
        <div className="absolute bottom-16 left-16 right-16 z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-xl">
            <ShieldCheck size={14} className="text-gold" />
            Secure Access
          </div>
          <h2 className="text-5xl font-heading font-bold text-white mb-6 leading-[1.1]">
            Manage your <br/>
            <span className="text-gold">digital presence.</span>
          </h2>
          <p className="text-white/70 text-lg max-w-md leading-relaxed font-light">
            Sign in to the Saiban Construction command center to oversee properties, portfolio projects, and client updates.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Back to Home Link */}
        <Link 
          href="/" 
          className="absolute top-8 right-8 text-sm text-[var(--text-muted)] hover:text-white flex items-center gap-2 transition-colors z-20 group"
        >
          Back to website
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="w-full max-w-[420px] relative z-10">
          <div className="mb-10">
            <Image src="/logo.png" alt="Saiban Construction" width={100} height={100} className="rounded-full object-cover mb-8 shadow-xl border border-white/10" />
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome back</h1>
            <p className="text-[var(--text-muted)] text-sm">Please enter your admin credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] ml-1" htmlFor="username">
                Email or Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)] group-focus-within:text-gold transition-colors">
                  <User size={18} />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[var(--bg-surface-1)] border border-[var(--border)] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-gold/50 transition-all shadow-sm"
                  placeholder="admin@saibaanconstruction.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] ml-1" htmlFor="password">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)] group-focus-within:text-gold transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[var(--bg-surface-1)] border border-[var(--border)] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-gold/50 transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <ShieldCheck size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full relative group overflow-hidden rounded-xl bg-[var(--gold)] text-white font-bold text-sm py-4 px-6 flex items-center justify-center gap-2 hover:bg-[var(--gold-light)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs text-[var(--text-muted)]">
              &copy; {new Date().getFullYear()} Saiban Construction. Secure Admin Portal.
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}} />
    </div>
  );
}
