import * as React from 'react';
import { ContactForm } from '@/components/forms/ContactForm';
import { siteConfig } from '@/config/site';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { generateMetadata } from '@/lib/utils/seo';
import { getSiteSettings } from '@/lib/db/queries/settings';

export const metadata = generateMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Saibaan Construction in Peshawar. We are ready to answer your questions and start building your dream project.',
});

export default async function ContactPage() {
  const settings = await getSiteSettings();
  
  // Use DB settings, fallback to siteConfig if empty
  const email = settings?.email || siteConfig.email;
  const phone = settings?.phone || siteConfig.phone;
  const address = settings?.address || siteConfig.address;
  const mapUrl = settings?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105809.91494879796!2d71.46988267252033!3d34.00346395349695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d917b90f0e79cf%3A0xa816b2637f8ce148!2sPeshawar%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s";
  const fb = settings?.facebook || siteConfig.socials.facebook;
  const inst = settings?.instagram || siteConfig.socials.instagram;
  const yt = settings?.youtube || '';
  const ln = settings?.linkedin || '';

  return (
    <>
      <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
        {/* Full-Page Fixed Background */}
        <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center bg-fixed opacity-40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/90 via-[#121214]/60 to-[#121214] z-0" />

        <div className="container relative z-10">
          
          <div className="max-w-3xl mb-16 text-center mx-auto animate-fade-in-up">
            <span className="section-label justify-center mb-6">Get in Touch</span>
            <h1 className="font-heading text-white font-bold leading-[1.1] text-5xl md:text-6xl mb-6">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed">
              Whether you have a question about our services, pricing, or want to discuss a new project in Peshawar, our team is ready to answer all your questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-5 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              
              <div className="bg-[var(--bg-surface-1)]/60 backdrop-blur-md border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-gold/10 transition-colors duration-700" />
                
                <h3 className="text-2xl font-heading font-bold text-white mb-8 relative z-10">
                  Contact Details
                </h3>

                <div className="space-y-8 relative z-10">
                  <div className="flex gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface-2)]/80 backdrop-blur-sm flex items-center justify-center text-gold border border-[var(--gold-border)] shrink-0 group-hover/item:scale-110 transition-transform duration-500">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Office Address</h4>
                      <p className="text-white text-lg font-medium">{address}</p>
                    </div>
                  </div>

                  <div className="flex gap-5 group/item">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20 text-green-500">
                      <svg width={24} height={24} viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">WhatsApp Chat</h4>
                      <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-white text-lg font-medium hover:text-[#25D366] transition-colors block">
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface-2)]/80 backdrop-blur-sm flex items-center justify-center text-gold border border-[var(--gold-border)] shrink-0 group-hover/item:scale-110 transition-transform duration-500">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Email Address</h4>
                      <a href={`mailto:${email}`} className="text-white text-lg font-medium hover:text-gold transition-colors block">
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface-2)]/80 backdrop-blur-sm flex items-center justify-center text-gold border border-[var(--gold-border)] shrink-0 group-hover/item:scale-110 transition-transform duration-500">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Working Hours</h4>
                      <p className="text-white text-lg font-medium">Mon - Sat: 9:00 AM - 6:00 PM<br/><span className="text-[var(--text-secondary)] text-sm">Sun: Closed</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-[300px] rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl relative group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent pointer-events-none transition-colors duration-500 z-10" />
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Saibaan Construction Location"
                  className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                />
              </div>

            </div>

            {/* Form */}
            <div className="lg:col-span-7 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-[var(--bg-surface-1)]/80 backdrop-blur-xl border border-[var(--border)] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col h-full">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-1 bg-gradient-to-l from-gold to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 w-64 h-1 bg-gradient-to-r from-gold to-transparent opacity-50" />
                
                <div className="flex-grow">
                  <h3 className="text-3xl font-heading font-bold text-white mb-3">Send us a Message</h3>
                  <p className="text-[var(--text-muted)] mb-10 text-lg">Fill out the form below and our team will get back to you within 24 hours.</p>
                  
                  <ContactForm />
                </div>

                {/* Social Icons Footer */}
                <div className="mt-12 pt-8 border-t border-[var(--border)]">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[var(--text-secondary)] font-medium">Follow us on social media</span>
                    <div className="flex items-center gap-4">
                      {fb && (
                        <a href={fb} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--bg-surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-gold hover:border-gold border border-[var(--border)] transition-all duration-300">
                          <Facebook size={18} />
                        </a>
                      )}
                      {inst && (
                        <a href={inst} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--bg-surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-gold hover:border-gold border border-[var(--border)] transition-all duration-300">
                          <Instagram size={18} />
                        </a>
                      )}
                      {yt && (
                        <a href={yt} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--bg-surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-gold hover:border-gold border border-[var(--border)] transition-all duration-300">
                          <Youtube size={18} />
                        </a>
                      )}
                      {ln && (
                        <a href={ln} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--bg-surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-gold hover:border-gold border border-[var(--border)] transition-all duration-300">
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
