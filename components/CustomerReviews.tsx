'use client';

import React from 'react';
import { TESTIMONIALS } from '@/data/footwearData';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export default function CustomerReviews() {
  return (
    <section className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              <span>Verified Patron Experiences</span>
              <span aria-hidden="true">·</span>
              <span>4.9 / 5 Average Rating</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-950 font-display mt-1.5 tracking-tight">
              Customer <span className="font-semibold">Reviews</span>
            </h2>
          </div>
          <div className="flex items-center gap-1.5 mt-3 sm:mt-0 text-xs text-neutral-600">
            <span className="font-semibold text-neutral-900">1,400+ Patrons</span>
            <span>Worldwide Across 28 Countries</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => {
            const initials = t.name
              .split(' ')
              .map((n) => n[0])
              .join('');

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 sm:p-7 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars and Verified Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic mb-6">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
                      {initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-900">{t.name}</h4>
                      <p className="text-[11px] text-neutral-400">{t.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider">
                    {t.productName.split(' ')[0]}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
