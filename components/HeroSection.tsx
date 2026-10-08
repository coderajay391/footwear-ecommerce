'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Shield, Compass } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function HeroSection() {
  const { setActiveView, navigateToShopCategory } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-neutral-200/60 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Content & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 sm:space-y-8"
          >
            {/* Quiet Editorial Kicker (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-neutral-500">
              <span>Atelier Collection 2026</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span>Civitanova Marche, Italy</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span className="text-amber-800 font-semibold">Artisan Hand-Lasted</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-950 font-display leading-[1.08] text-balance">
                Step Into <span className="font-semibold italic">Your Style</span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed">
                Premium footwear designed for modern men. Sculpted from full-grain Tuscan calfskin, built with authentic Goodyear welts, and refined for effortless daily elegance.
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
              <button
                onClick={() => {
                  setActiveView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-neutral-950 text-white rounded-lg text-sm font-medium tracking-wide hover:bg-neutral-800 transition-all cursor-pointer shadow-xs hover:shadow-md flex items-center gap-2 group whitespace-nowrap"
              >
                <span>Shop Collection</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  navigateToShopCategory('Sneakers');
                }}
                className="px-6 py-3.5 bg-white text-neutral-900 border border-neutral-300 rounded-lg text-sm font-medium tracking-wide hover:bg-neutral-50 hover:border-neutral-400 transition-all cursor-pointer whitespace-nowrap"
              >
                Explore New Arrivals
              </button>
            </div>

            {/* Subtle editorial trust proof */}
            <div className="pt-4 border-t border-neutral-200/70 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Upper</p>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">French Calfskin</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Build</p>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">Goodyear Welt</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Guarantee</p>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">Lifetime Recraft</p>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Image Showcase with Zero-Broken-Image fallback */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 w-full rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-200/80 shadow-md group">
              <Image
                src="/images/hero_mens_luxury_footwear_1791378869941.jpg"
                alt="Editorial luxury men's footwear collection"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Float caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between text-white pointer-events-none">
                <div>
                  <p className="text-xs tracking-widest uppercase font-mono text-neutral-200">The 2026 Atelier Drop</p>
                  <p className="text-sm sm:text-base font-medium tracking-tight mt-0.5">Handcrafted in Civitanova Marche</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-medium tracking-wider">
                  Full-Grain Leather
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
