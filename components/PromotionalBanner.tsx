'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Tag } from 'lucide-react';

export default function PromotionalBanner() {
  const { setActiveView, setFilters } = useStore();

  const handleShopSale = () => {
    setFilters((prev) => ({
      ...prev,
      category: 'all',
      priceRange: [10000, 25000],
    }));
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-neutral-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white min-h-[380px] sm:min-h-[440px] flex items-center shadow-lg border border-neutral-800"
        >
          {/* Background Photography */}
          <div className="absolute inset-0">
            <Image
              src="/images/promo_mens_chelsea_boot_1791378892234.jpg"
              alt="Artisan men's Chelsea boots promo"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center scale-102"
              referrerPolicy="no-referrer"
            />
            {/* Scrim overlay for high contrast legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 sm:to-transparent" />
          </div>

          {/* Banner Editorial Copy */}
          <div className="relative z-10 max-w-xl p-6 sm:p-12 lg:p-16 space-y-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold">
              <Tag className="w-3.5 h-3.5" />
              <span>Mid-Season Archival Event</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display tracking-tight text-white leading-tight">
              Up to <span className="font-bold text-amber-200">40% Off</span> Selected Styles
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
              Explore limited seasonal batches of Goodyear boots, hand-burnished oxfords, and raw-cut court sneakers crafted from Italian calfskin.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleShopSale}
                className="px-6 py-3.5 bg-white text-neutral-950 rounded-lg text-sm font-semibold tracking-wide hover:bg-neutral-100 transition-colors cursor-pointer flex items-center gap-2 shadow-sm group"
              >
                <span>Shop the Sale</span>
                <ArrowRight className="w-4 h-4 text-neutral-900 group-hover:translate-x-1 transition-transform" />
              </button>

              <span className="text-xs text-neutral-400 font-mono tracking-wider">
                Promo code WELCOME10 stacks at checkout
              </span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
