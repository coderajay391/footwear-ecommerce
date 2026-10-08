'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/footwear';
import { useStore } from '@/context/StoreContext';
import { formatINR } from '@/lib/utils';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const {
    navigateToProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  // Quick add to cart with first available size and color
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)] || product.sizes[0];
    const defaultColor = product.colors[0];
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => navigateToProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-xl border border-neutral-200/80 overflow-hidden cursor-pointer hover:border-neutral-300 hover:shadow-sm transition-all duration-300"
    >
      {/* Visual Image Container (takes 65-75% visual weight) */}
      <div className="relative aspect-4/3 w-full bg-[#F5F4F0] overflow-hidden">
        {/* Primary Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center transition-all duration-500 ease-out ${
            isHovered && product.hoverImage ? 'opacity-0 scale-102' : 'opacity-100 scale-100'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Secondary Hover Image */}
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-all duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-102' : 'opacity-0 scale-100'
            }`}
            referrerPolicy="no-referrer"
          />
        )}

        {/* Minimalist Badge (Anti-slop: zero pill capsule) */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm ${
                product.badge === 'SALE'
                  ? 'bg-rose-900 text-rose-50'
                  : product.badge === 'NEW'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-amber-900 text-amber-50'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-neutral-700 hover:text-black hover:bg-white shadow-xs transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-neutral-700'
            }`}
          />
        </button>

        {/* Floating Action Overlay on Desktop Hover */}
        <div className="hidden sm:flex absolute bottom-3 inset-x-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-neutral-950/90 hover:bg-neutral-950 text-white text-xs font-medium py-2 px-3 rounded-lg backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Bag</span>
          </button>

          <button
            onClick={handleQuickView}
            className="bg-white/90 hover:bg-white text-neutral-800 text-xs font-medium py-2 px-2.5 rounded-lg backdrop-blur-xs flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            aria-label="Quick view"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span className="uppercase tracking-wider font-mono text-[11px]">{product.category}</span>
            <div className="flex items-center gap-1 text-neutral-700">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="font-medium tabular-nums text-[11px]">{product.rating}</span>
              <span className="text-neutral-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Available color swatches preview */}
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-neutral-400 ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-neutral-950 tabular-nums">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {product.discountPercentage && (
            <span className="text-[11px] font-semibold text-emerald-800">
              Save {product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Mobile Quick Add bar */}
        <div className="sm:hidden mt-3 pt-2 border-t border-neutral-100 flex gap-2">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-neutral-900 text-white text-xs font-medium py-2 rounded-md flex items-center justify-center gap-1.5 active:bg-neutral-800"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
