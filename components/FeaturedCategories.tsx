'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { CATEGORIES } from '@/data/footwearData';
import { useStore } from '@/context/StoreContext';
import { ArrowRight } from 'lucide-react';

export default function FeaturedCategories() {
  const { navigateToShopCategory } = useStore();

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              <span>Curated Disciplines</span>
              <span aria-hidden="true">·</span>
              <span>7 Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-950 font-display mt-1.5 tracking-tight">
              Featured <span className="font-semibold">Categories</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md mt-2 sm:mt-0 font-normal">
            From relaxed summer Riviera loafers to Goodyear-welted formal oxfords, engineered for every sartorial occasion.
          </p>
        </div>

        {/* Categories Grid (Responsive) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, index) => {
            // First item spans 2 cols on lg for visual interest
            const isFeatured = index === 0;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => navigateToShopCategory(cat.id)}
                className={`group relative rounded-xl overflow-hidden bg-neutral-100 cursor-pointer border border-neutral-200/80 shadow-2xs hover:shadow-md transition-all duration-300 ${
                  isFeatured ? 'col-span-2 sm:col-span-1 lg:col-span-2 aspect-16/10' : 'aspect-4/3'
                }`}
              >
                {/* Product Image */}
                <div className="absolute inset-0">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Scrim for 100% legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent group-hover:from-black/80 transition-colors" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-neutral-300 font-mono">
                        {cat.itemCount} Designs
                      </p>
                      <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white mt-0.5">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5 hidden sm:block">
                        {cat.tagline}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-neutral-900 transition-all shrink-0 ml-2">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
