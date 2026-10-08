'use client';

import React from 'react';
import { PRODUCTS } from '@/data/footwearData';
import ProductCard from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function NewArrivals() {
  const { setActiveView } = useStore();

  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.badge === 'NEW').slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Autumn/Winter Atelier Drop</span>
              <span aria-hidden="true">·</span>
              <span>Just Arrived</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-950 font-display mt-1.5 tracking-tight">
              New <span className="font-semibold">Arrivals</span>
            </h2>
          </div>

          <button
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-3 sm:mt-0 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View All New Releases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
