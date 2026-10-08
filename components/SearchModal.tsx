'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/footwearData';
import { formatINR } from '@/lib/utils';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    navigateToProduct,
    navigateToShopCategory,
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const handleClose = () => {
    setQuery('');
    setIsSearchOpen(false);
  };

  const searchResults = PRODUCTS.filter((item) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.materials.toLowerCase().includes(q)
    );
  });

  const popularSearches = ['Sneakers', 'Chelsea Boots', 'Loafers', 'Wholecut Oxford', 'Calfskin', 'Sandals'];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
            onClick={handleClose}
          />

          <div className="flex min-h-full items-start justify-center p-4 pt-16 sm:pt-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all border border-neutral-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Bar Input */}
              <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center gap-3">
                <Search className="w-5 h-5 text-neutral-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search footwear (e.g. sneakers, calfskin, loafer, oxford)..."
                  className="w-full bg-transparent text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 text-neutral-400 hover:text-black rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="px-2.5 py-1 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 rounded-md text-neutral-700 transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Quick Tags / Search Suggestions */}
              {!query && (
                <div className="p-6 space-y-4">
                  <p className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                    Popular Atelier Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-700 transition-colors cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-neutral-100">
                    <p className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-3">
                      Featured Recommendations
                    </p>
                    <div className="space-y-2">
                      {PRODUCTS.slice(0, 3).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            handleClose();
                            navigateToProduct(p);
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-md overflow-hidden bg-neutral-100 shrink-0">
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-neutral-900">{p.name}</p>
                              <p className="text-[11px] text-neutral-400">{p.category}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-neutral-900 tabular-nums">{formatINR(p.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Search Results */}
              {query && (
                <div className="max-h-96 overflow-y-auto p-4 sm:p-6">
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-3 pb-2 border-b border-neutral-100">
                    <span>Search Results ({searchResults.length} found)</span>
                    <button
                      onClick={() => {
                        handleClose();
                        navigateToShopCategory('all');
                      }}
                      className="text-neutral-900 font-semibold hover:underline"
                    >
                      View in full catalog
                    </button>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-neutral-100 space-y-1">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            handleClose();
                            navigateToProduct(product);
                          }}
                          className="py-3 flex items-center justify-between rounded-lg px-2 hover:bg-neutral-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="56px"
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <p className="text-xs uppercase font-mono tracking-wider text-neutral-400">
                                {product.category}
                              </p>
                              <h4 className="text-sm font-semibold text-neutral-900">
                                {product.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <div className="flex items-center gap-1 text-[11px] text-amber-600">
                                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                  <span className="font-semibold tabular-nums">{product.rating}</span>
                                </div>
                                <span className="text-[11px] text-neutral-400">·</span>
                                <span className="text-[11px] text-neutral-500">{product.colors.length} colors</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-bold text-neutral-950 tabular-nums">
                              {formatINR(product.price)}
                            </span>
                            <ArrowRight className="w-4 h-4 text-neutral-400 ml-auto mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-sm font-semibold text-neutral-900">
                        No footwear matched &ldquo;{query}&rdquo;
                      </p>
                      <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                        Check your spelling or browse our handcrafted categories.
                      </p>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
