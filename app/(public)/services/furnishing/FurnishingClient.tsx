'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Package, Truck, Headphones } from 'lucide-react';
import { CTABanner } from '@/components/sections/home/CTABanner';

const ROOMS = [
  { id: 'living', title: 'Living Room', label: 'Social & Central', img: '/portfolio-hero.jpg', desc: 'Sofas, armchairs, coffee tables, and entertainment units curated for social living.' },
  { id: 'bedroom', title: 'Bedroom', label: 'Sanctuary', img: '/properties-hero.jpg', desc: 'Luxury bed sets, plush textiles, and calming aesthetics for your ultimate retreat.' },
  { id: 'dining', title: 'Dining Room', label: 'Gathering', img: '/services-hero.jpg', desc: 'Statement tables and elegant seating that turn every meal into a celebration.' },
  { id: 'outdoor', title: 'Outdoor', label: 'Al Fresco', img: '/cta-bg.jpg', desc: 'Weather-resistant, resort-style lounging and dining for your exterior spaces.' },
];

export function FurnishingClient() {
  const [activeRoom, setActiveRoom] = useState(ROOMS[0]);

  return (
    <div className="overflow-hidden" style={{ backgroundColor: '#0e0b08' }}>
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background with subtle parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <Image
            src="/portfolio-hero.jpg"
            alt="Luxury Furnishing"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0b08] via-[#0e0b08]/85 to-[#0e0b08]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b08] via-transparent to-[#0e0b08]/50" />
        </motion.div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Typography */}
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-3 border border-gold/20 rounded-full px-5 py-2 mb-8 bg-gold/5 backdrop-blur-sm"
              >
                <Star size={12} className="text-gold fill-gold" />
                <span className="text-gold text-xs font-bold tracking-widest uppercase">Curated Luxury</span>
                <Star size={12} className="text-gold fill-gold" />
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-heading font-black text-white leading-[0.95] mb-8 text-5xl md:text-7xl lg:text-8xl"
              >
                Live in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#f0d68b] to-[#8a7333]">
                  Absolute
                </span> <br />
                Comfort.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-white/60 text-xl leading-relaxed mb-12 max-w-lg font-light"
              >
                Every piece of furniture tells a story. We curate bespoke collections that marry the artisan's craft with your personal aesthetic — transforming a house into a home.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-8 sm:gap-12"
              >
                <Link href="/get-quotation?service=furnishing" className="group inline-flex items-center gap-4 text-white hover:text-gold transition-colors">
                  <span className="text-sm font-bold tracking-widest uppercase pb-1 border-b border-gold">Curate My Space</span>
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all duration-300">
                    <ChevronRight size={18} />
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Right Interactive Cards */}
            <div className="relative h-[600px] hidden lg:block">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] bg-gold/10 pointer-events-none" 
              />

              {/* Card 1 */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute top-10 left-12 w-64 rounded-3xl overflow-hidden border border-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md bg-black/40"
              >
                <div className="relative h-48">
                  <Image src="/properties-hero.jpg" alt="Living Room" fill className="object-cover opacity-80" />
                </div>
                <div className="p-6">
                  <div className="text-xs text-gold font-bold tracking-widest uppercase mb-2">Living Room</div>
                  <div className="text-white font-bold text-lg">Bespoke Sofas</div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                className="absolute top-48 right-0 w-64 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md bg-black/40"
              >
                <div className="relative h-48">
                  <Image src="/portfolio-hero.jpg" alt="Bedroom" fill className="object-cover opacity-80" />
                </div>
                <div className="p-6">
                  <div className="text-xs text-gold font-bold tracking-widest uppercase mb-2">Bedroom</div>
                  <div className="text-white font-bold text-lg">Luxury Bed Sets</div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Promise Bar */}
      <section className="relative z-20 -mt-16 mb-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: Package, title: 'Bespoke & Custom', desc: 'Customized to your exact dimensions and materials.' },
              { icon: Star, title: 'Premium Sourcing', desc: 'Furniture from top-tier craftsmen.' },
              { icon: Truck, title: 'White-Glove Delivery', desc: 'Professional assembly & placement included.' },
              { icon: Headphones, title: 'Design Consultancy', desc: 'Free consultations with our expert stylists.' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-[#15120f] border border-white/5 rounded-2xl p-8 hover:border-gold/30 hover:bg-[#1a1612] transition-all duration-300 shadow-2xl"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={24} className="text-gold" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Dynamic Room-by-Room Gallery */}
      <section className="py-32 bg-[#0a0806]">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-widest uppercase text-xs block mb-3">Curated Spaces</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white">Room by Room</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Tabs */}
            <div className="lg:col-span-4 space-y-4">
              {ROOMS.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    activeRoom.id === room.id 
                      ? 'bg-gold/10 border-gold/30 shadow-[0_0_30px_rgba(201,168,76,0.1)]' 
                      : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  <div>
                    <div className="text-gold text-[10px] font-bold uppercase tracking-widest mb-1">{room.label}</div>
                    <div className={`font-heading font-bold text-xl ${activeRoom.id === room.id ? 'text-white' : 'text-white/60'}`}>
                      {room.title}
                    </div>
                  </div>
                  {activeRoom.id === room.id && (
                    <motion.div layoutId="activeTabIndicator">
                      <ChevronRight className="text-gold" size={20} />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            {/* Gallery Display */}
            <div className="lg:col-span-8 relative h-[500px] md:h-[700px] rounded-3xl overflow-hidden bg-[#15120f] border border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoom.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image src={activeRoom.img} alt={activeRoom.title} fill className="object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-2xl">
                    <motion.h3 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
                    >
                      {activeRoom.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/70 text-lg"
                    >
                      {activeRoom.desc}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sticky Scroll Philosophy */}
      <section className="relative bg-[#0e0b08]">
        {/* Subtle background grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-32">
            
            {/* Sticky Left Column */}
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="text-[12rem] font-heading font-black text-gold/10 leading-[0.5] mb-8">"</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-8">
                A room without furniture is just a box. <br/>
                <span className="text-gold text-3xl md:text-4xl">We turn boxes into stories.</span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-[2px] bg-gold" />
                <span className="text-gold text-sm font-bold tracking-widest uppercase">The Saibaan Standard</span>
              </div>
            </div>

            {/* Scrolling Right Column */}
            <div className="space-y-12 lg:space-y-32 lg:py-32">
              {[
                { title: 'Timeless over Trendy', desc: 'We source pieces built to endure decades of use, resisting the fleeting nature of seasonal fast-fashion furniture.' },
                { title: 'Comfort is Non-Negotiable', desc: 'True luxury lies in the experience. Every piece must be as exceptionally comfortable as it is beautiful to look at.' },
                { title: 'Cohesion in Every Room', desc: 'We design each space as a cohesive, breathing collection — ensuring harmony between every texture, color, and silhouette.' },
              ].map((pillar, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-100px", once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex gap-8 group"
                >
                  <div className="text-transparent bg-clip-text bg-gradient-to-b from-gold to-transparent font-black text-6xl font-heading shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                    0{idx + 1}
                  </div>
                  <div className="pt-4">
                    <h4 className="text-white text-2xl font-bold mb-4">{pillar.title}</h4>
                    <p className="text-lg text-white/60 leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CTABanner />

    </div>
  );
}
