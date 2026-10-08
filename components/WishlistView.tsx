'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/footwearData';
import { formatINR } from '@/lib/utils';
import { Heart, Trash2, ShoppingBag, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WishlistView() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    setActiveView,
    navigateToProduct,
  } = useStore();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product: (typeof PRODUCTS)[0]) => {
    const defaultSize = product.sizes[2] || product.sizes[0];
    const defaultColor = product.colors[0];
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-neutral-200/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <button onClick={() => setActiveView('home')} className="hover:text-black">
              Home
            </button>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">Saved Wishlist</span>
          </div>

          <button
            onClick={() => setActiveView('shop')}
            className="text-xs text-neutral-600 hover:text-black flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-light text-neutral-950 font-display tracking-tight">
              My Saved <span className="font-semibold">Footwear</span>
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Your curated wishlist ({wishlistedProducts.length} styles saved for later)
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => handleMoveToCart(p));
              }}
              className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add All to Bag</span>
            </button>
          )}
        </div>

        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {wishlistedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area */}
                    <div
                      onClick={() => navigateToProduct(product)}
                      className="relative aspect-4/3 w-full bg-neutral-100 cursor-pointer overflow-hidden group"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full text-rose-600 shadow-xs cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="p-4">
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                        <span className="font-mono uppercase text-[11px]">{product.category}</span>
                        <div className="flex items-center gap-1 text-neutral-800">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span className="font-semibold tabular-nums">{product.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => navigateToProduct(product)}
                        className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer truncate"
                      >
                        {product.name}
                      </h3>

                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-base font-bold text-neutral-950 tabular-nums">
                          {formatINR(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through tabular-nums">
                            {formatINR(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="w-full bg-neutral-950 text-white py-2.5 rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200 p-8 max-w-lg mx-auto shadow-2xs">
            <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900 font-display">
              Your wishlist is empty
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto mt-2 leading-relaxed">
              Explore our footwear catalog and click the heart icon on any style to save it to your private collection.
            </p>
            <button
              onClick={() => setActiveView('shop')}
              className="mt-6 px-6 py-3 bg-neutral-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Discover Footwear
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
