'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, ProductColor } from '@/types/footwear';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/footwearData';
import { formatINR } from '@/lib/utils';
import ProductCard from './ProductCard';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  ChevronRight,
  Check,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsSizeGuideOpen, 
    setActiveView 
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'features' | 'materials' | 'care'>('details');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const isWishlisted = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Related products from same category or brand
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-neutral-200/80 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-neutral-500">
          <button onClick={() => setActiveView('home')} className="hover:text-black">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => setActiveView('shop')} className="hover:text-black">
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-semibold truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-2xl border border-neutral-200/80 shadow-2xs">
          
          {/* Left Column: Image Gallery & Zoom (Lg: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnail Strip */}
            <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-y-auto">
              {[product.image, ...(product.hoverImage ? [product.hoverImage] : []), ...(product.additionalImages || [])]
                .filter((url, idx, self) => self.indexOf(url) === idx)
                .map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-neutral-100 shrink-0 ${
                      selectedImage === img ? 'border-neutral-900 shadow-xs' : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
            </div>

            {/* Large Interactive Main Image with Zoom */}
            <div
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              className="relative aspect-4/3 sm:aspect-1/1 w-full rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/80 cursor-crosshair group flex-1"
            >
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
                }}
                className="object-cover object-center transition-transform duration-200 ease-out"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 bg-neutral-900 text-white rounded-sm shadow-xs">
                    {product.badge}
                  </span>
                </div>
              )}

              <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-xs text-[11px] text-neutral-600 px-2 py-1 rounded-sm pointer-events-none hidden sm:block">
                Hover to magnify leather grain
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (Lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-widest font-mono">
                <span>{product.brand}</span>
                <span className="text-amber-800 font-semibold">{product.category}</span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-950 font-display mt-2 tracking-tight">
                {product.name}
              </h1>

              {/* Star Rating & Review Count */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-500 text-amber-500'
                          : 'fill-neutral-200 text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-neutral-900 tabular-nums">{product.rating}</span>
                <span className="text-xs text-neutral-400">·</span>
                <span className="text-xs text-neutral-500 font-medium underline cursor-pointer">
                  {product.reviewCount} Patron Reviews
                </span>
              </div>

              {/* Price Block */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-neutral-950 tabular-nums">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-400 line-through tabular-nums">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-neutral-600 mt-4 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mt-6 pt-5 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-semibold text-neutral-900">Color Variant</span>
                  <span className="text-neutral-500 font-medium">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative p-1 rounded-full border-2 transition-all cursor-pointer ${
                          isSelected ? 'border-neutral-900 scale-105' : 'border-transparent hover:border-neutral-300'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="block w-6 h-6 rounded-full border border-neutral-200 shadow-2xs"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector + Size Guide Trigger */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-semibold text-neutral-900">
                    Men&apos;s US Size: <strong className="text-neutral-950">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-neutral-600 hover:text-black font-medium flex items-center gap-1 cursor-pointer underline text-[11px]"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Shoemaker Sizing Chart</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                            : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs font-semibold text-neutral-900">Quantity</span>
                <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 text-sm font-semibold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-neutral-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 text-sm font-semibold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Purchase Buttons */}
              <div className="mt-8 space-y-2.5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-neutral-950 text-white py-3.5 px-6 rounded-lg font-semibold text-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-99"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Wishlist"
                    className="p-3.5 border border-neutral-300 rounded-lg hover:border-neutral-400 transition-colors cursor-pointer bg-white"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-neutral-700'
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-amber-900 text-white py-3 px-6 rounded-lg font-semibold text-xs tracking-wider uppercase hover:bg-amber-800 transition-colors cursor-pointer shadow-2xs"
                >
                  Instant Buy Now — Direct Checkout
                </button>
              </div>

            </div>

            {/* Workshop & Service Perks */}
            <div className="pt-6 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center text-[11px] text-neutral-600">
              <div className="p-2 bg-neutral-50 rounded-lg">
                <Truck className="w-4 h-4 mx-auto mb-1 text-neutral-700" />
                <span>Complimentary Shipping</span>
              </div>
              <div className="p-2 bg-neutral-50 rounded-lg">
                <RotateCcw className="w-4 h-4 mx-auto mb-1 text-neutral-700" />
                <span>30-Day Returns</span>
              </div>
              <div className="p-2 bg-neutral-50 rounded-lg">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-neutral-700" />
                <span>Lifetime Recrafting</span>
              </div>
            </div>

          </div>

        </div>

        {/* Below Product: Information Tabs (Description, Features, Materials, Care) */}
        <div className="mt-12 bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-10 shadow-2xs">
          
          <div className="flex items-center gap-2 sm:gap-6 border-b border-neutral-200 pb-3 overflow-x-auto">
            {(['details', 'features', 'materials', 'care'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-3 text-xs sm:text-sm font-semibold capitalize whitespace-nowrap border-b-2 -mb-3 transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'border-neutral-900 text-neutral-950 font-bold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {tab === 'details' ? 'Overview' : tab === 'features' ? 'Specifications' : tab === 'materials' ? 'Leather & Origin' : 'Shoe Care'}
              </button>
            ))}
          </div>

          <div className="pt-8">
            {activeTab === 'details' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-lg font-semibold text-neutral-900 font-display">Craftsmanship Story</h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {product.description}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Every hide is carefully audited for tensile uniformity and grain density before lasting. Using age-old wooden lasts calibrated specifically for modern foot ergonomics, our craftsmen spend up to 14 hours completing every pair.
                </p>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="max-w-3xl">
                <h3 className="text-lg font-semibold text-neutral-900 font-display mb-4">Key Architectural Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-lg font-semibold text-neutral-900 font-display">Materials & Tanning</h3>
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <p className="text-sm font-semibold text-neutral-900">{product.materials}</p>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Sourced from Gold-Rated tanneries by the Leather Working Group (LWG). Vegetable extracts including chestnut and mimosa bark are used in lieu of harsh chemical chrome baths.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-lg font-semibold text-neutral-900 font-display">Atelier Care Instructions</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {product.careInstructions}
                </p>
                <div className="text-xs text-neutral-500 bg-amber-50/80 border border-amber-200/80 p-4 rounded-xl leading-relaxed">
                  <strong>Pro Shoemaker Advice:</strong> Always use cedar shoe trees immediately after taking your shoes off. The unvarnished cedar wood naturally draws away perspiration moisture and preserves the lasted silhouette for decades.
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Customer Reviews Section */}
        <div className="mt-12 bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-10 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-neutral-950 font-display">
                Patron Reviews & Ratings
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Authentic reviews from verified footwear purchasers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-neutral-950 tabular-nums">{product.rating}</span>
              <div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs text-neutral-400 tabular-nums">Based on {product.reviewCount} reviews</span>
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="divide-y divide-neutral-100 pt-4">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="py-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-900">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-neutral-400">{rev.date}</span>
                </div>

                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500" />
                  ))}
                </div>

                <h4 className="text-sm font-semibold text-neutral-900">{rev.title}</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {rev.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                You May Also Admire
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-950 font-display mt-1">
                Related Footwear
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
