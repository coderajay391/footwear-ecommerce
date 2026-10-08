'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/footwearData';
import ProductCard from './ProductCard';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Flame } from 'lucide-react';

export default function TrendingProducts() {
  const { setActiveView } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Sneakers' | 'Formal Shoes' | 'Loafers' | 'Boots'>('all');

  // Filter 8 trending products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  }).slice(0, 8);

  return (
    <section className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Segmented Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Trending Styles</span>
              <span aria-hidden="true">·</span>
              <span>Handpicked</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-950 font-display mt-1.5 tracking-tight">
              Most Coveted <span className="font-semibold">Footwear</span>
            </h2>
          </div>

          {/* Interactive Filter Controls (Functional Button Elements) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/60 rounded-lg">
            {(['all', 'Sneakers', 'Formal Shoes', 'Loafers', 'Boots'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFilter === tab
                    ? 'bg-white text-neutral-950 shadow-2xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {tab === 'all' ? 'All Trending' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Product Grid: 4 cols on desktop, 3 cols on tablet, 2 cols on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>

        {/* Bottom CTA to view full catalog */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-300 rounded-lg text-sm font-medium text-neutral-900 hover:bg-neutral-50 hover:border-neutral-400 transition-colors shadow-2xs cursor-pointer group"
          >
            <span>Explore All 12+ Footwear Designs</span>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
