import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

const serviceLinks = siteConfig.services.map((s) => ({
  label: s.shortTitle,
  href: `/services/${s.slug}`,
}));

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Properties', href: '/properties' },
  { label: 'Updates', href: '/updates' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Get Quotation', href: '/get-quotation' },
];

const WhatsappIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 448 512" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

export default async function Footer() {
  const settings = await getSiteSettings();
  
  // Use DB settings, fallback to siteConfig if empty
  const email = settings?.email || siteConfig.email;
  const phone = settings?.phone || siteConfig.phone;
  const address = settings?.address || siteConfig.address;
  const fb = settings?.facebook || siteConfig.socials.facebook;
  const inst = settings?.instagram || siteConfig.socials.instagram;
  const yt = settings?.youtube || '';
  const ln = settings?.linkedin || '';

  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;

  return (
    <footer className="relative bg-[#080808] overflow-hidden">

      {/* Top Gold Rule */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Footer Body */}
      <div className="container relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* 1. Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Saibaan Construction"
                width={100}
                height={100}
                className="rounded-full object-cover shadow-lg"
              />
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 max-w-sm">
              Delivering premium construction, design, and renovation services across Pakistan since 1988. Your vision, our expertise.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {fb && (
                <a href={fb} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[var(--text-muted)] hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300">
                  <Facebook size={16} />
                </a>
              )}
              {inst && (
                <a href={inst} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[var(--text-muted)] hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300">
                  <Instagram size={16} />
                </a>
              )}
              {yt && (
                <a href={yt} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[var(--text-muted)] hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300">
                  <Youtube size={16} />
                </a>
              )}
              {ln && (
                <a href={ln} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[var(--text-muted)] hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300">
                  <Linkedin size={16} />
                </a>
              )}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-gold transition-colors">
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Services */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Our Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-gold transition-colors">
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Contact Us</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span className="leading-relaxed">{address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <WhatsappIcon size={16} className="text-[#25D366] shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[#25D366] transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-gold shrink-0" />
                <a href={`mailto:${email}`} className="text-[var(--text-muted)] hover:text-gold transition-colors">{email}</a>
              </li>
            </ul>
            <div className="pt-5 border-t border-white/5">
              <p className="text-xs text-[var(--text-muted)] mb-1 uppercase tracking-widest font-bold">Working Hours</p>
              <p className="text-sm text-white font-medium">Mon – Sat: 9:00 AM – 6:00 PM</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06] relative z-10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} Saibaan Construction. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="text-xs text-[var(--text-muted)] hover:text-gold transition-colors">Privacy Policy</Link>
              <Link href="/contact" className="text-xs text-[var(--text-muted)] hover:text-gold transition-colors">Terms of Service</Link>
              <p className="text-xs text-[var(--text-muted)]">
                Designed with <span className="text-gold">♥</span> in Pakistan
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
