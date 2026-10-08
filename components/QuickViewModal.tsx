'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { ProductColor } from '@/types/footwear';
import { formatINR } from '@/lib/utils';
import { X, Star, ShoppingBag, ArrowRight, Ruler, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    navigateToProduct,
    setIsSizeGuideOpen,
  } = useStore();

  const [colorOverride, setColorOverride] = useState<ProductColor | null>(null);
  const [sizeOverride, setSizeOverride] = useState<number | null>(null);
  const [imageOverride, setImageOverride] = useState<string>('');

  if (!quickViewProduct) return null;

  const selectedColor = colorOverride ?? quickViewProduct.colors[0];
  const selectedSize = sizeOverride ?? (quickViewProduct.sizes[2] || quickViewProduct.sizes[0]);
  const selectedImage = imageOverride || quickViewProduct.image;

  const handleClose = () => {
    setColorOverride(null);
    setSizeOverride(null);
    setImageOverride('');
    setQuickViewProduct(null);
  };

  const handleAdd = () => {
    if (selectedSize && selectedColor) {
      addToCart(quickViewProduct, selectedSize, selectedColor, 1);
      handleClose();
    }
  };

  const handleViewFull = () => {
    const p = quickViewProduct;
    handleClose();
    navigateToProduct(p);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
          onClick={handleClose}
        />

        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all border border-neutral-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-black rounded-full bg-white/80 hover:bg-white shadow-xs transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Visual */}
              <div className="relative aspect-4/3 md:aspect-auto h-72 md:h-full bg-neutral-100 min-h-[340px]">
                <Image
                  src={selectedImage || quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {quickViewProduct.badge && (
                  <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-neutral-900 text-white rounded-sm">
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              {/* Product Info & Options */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    {quickViewProduct.brand} · {quickViewProduct.category}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-950 font-display mt-1">
                    {quickViewProduct.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-1.5 text-xs">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="font-semibold tabular-nums text-neutral-900">{quickViewProduct.rating}</span>
                    <span className="text-neutral-400">({quickViewProduct.reviewCount} reviews)</span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-neutral-950 tabular-nums">
                      {formatINR(quickViewProduct.price)}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through tabular-nums">
                        {formatINR(quickViewProduct.originalPrice)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-600 mt-3 line-clamp-2 leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  {/* Colors */}
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-neutral-900 mb-1.5">
                      Color: <span className="font-normal text-neutral-600">{selectedColor?.name}</span>
                    </p>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setColorOverride(c)}
                          className={`p-0.5 rounded-full border-2 transition-all cursor-pointer ${
                            selectedColor?.name === c.name ? 'border-neutral-900' : 'border-transparent'
                          }`}
                        >
                          <span
                            className="block w-5 h-5 rounded-full border border-neutral-300"
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-neutral-900">
                        Size: <span className="font-bold">{selectedSize}</span>
                      </span>
                      <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="text-[11px] text-neutral-500 hover:text-black flex items-center gap-1 underline"
                      >
                        <Ruler className="w-3 h-3" />
                        <span>Size Guide</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {quickViewProduct.sizes.slice(0, 10).map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSizeOverride(sz)}
                          className={`py-1.5 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <button
                    onClick={handleAdd}
                    className="w-full bg-neutral-950 text-white py-3 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  <button
                    onClick={handleViewFull}
                    className="w-full text-center text-xs text-neutral-600 hover:text-black font-semibold py-1.5 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Complete Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
