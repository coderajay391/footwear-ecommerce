'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '@/data/footwearData';
import { FilterState } from '@/types/footwear';
import { formatINR } from '@/lib/utils';
import ProductCard from './ProductCard';
import { useStore } from '@/context/StoreContext';
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  RotateCcw, 
  Search,
  Check,
  Star,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ShopPage() {
  const { filters, setFilters, resetFilters, setActiveView } = useStore();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(8);

  const availableSizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
  const availableColors = [
    { label: 'White / Chalk', hex: '#F8F8F6' },
    { label: 'Black / Onyx', hex: '#1C1C1E' },
    { label: 'Cognac / Tan', hex: '#8B4513' },
    { label: 'Espresso / Brown', hex: '#3E2723' },
    { label: 'Sand / Beige', hex: '#D2C1AC' },
  ];

  // Filter products interactively
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }
      // Price range
      if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
        return false;
      }
      // Sizes filter
      if (filters.sizes.length > 0) {
        const hasSize = filters.sizes.some((s) => item.sizes.includes(s));
        if (!hasSize) return false;
      }
      // Colors filter
      if (filters.colors.length > 0) {
        const hasColor = filters.colors.some((colorName) =>
          item.colors.some((c) => c.name.toLowerCase().includes(colorName.toLowerCase()))
        );
        if (!hasColor) return false;
      }
      // Rating filter
      if (filters.minRating > 0 && item.rating < filters.minRating) {
        return false;
      }
      // Availability
      if (filters.availability === 'in_stock' && !item.inStock) {
        return false;
      }
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'best_rated') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default order
    });
  }, [filters]);

  const visibleProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  const toggleSize = (size: number) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleColor = (colorName: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(colorName)
        ? prev.colors.filter((c) => c !== colorName)
        : [...prev.colors, colorName],
    }));
  };

  const handleCategorySelect = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === cat ? 'all' : cat,
    }));
  };

  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) +
    filters.sizes.length +
    filters.colors.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.availability !== 'all' ? 1 : 0) +
    (filters.priceRange[1] < 35000 || filters.priceRange[0] > 10000 ? 1 : 0);

  const filterSidebarContent = (
    <div className="space-y-6 text-sm">
      {/* Active Filter Clear */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <span className="font-semibold text-neutral-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-neutral-900 text-white rounded-full text-[11px] font-bold flex items-center justify-center tabular-nums">
              {activeFilterCount}
            </span>
          )}
        </span>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-neutral-500 hover:text-neutral-950 flex items-center gap-1 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
          Category
        </h3>
        <div className="space-y-1.5">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors ${
              filters.category === 'all'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <span>All Footwear</span>
            <span className="tabular-nums opacity-70">{PRODUCTS.length}</span>
          </button>
          {CATEGORIES.map((cat) => {
            const count = PRODUCTS.filter((p) => p.category === cat.id).length;
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <span>{cat.name}</span>
                <span className="tabular-nums opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-neutral-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Price Range
          </h3>
          <span className="text-xs font-semibold text-neutral-900 tabular-nums">
            {formatINR(filters.priceRange[0])} – {formatINR(filters.priceRange[1])}
          </span>
        </div>
        <input
          type="range"
          min="10000"
          max="35000"
          step="500"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], parseInt(e.target.value)],
            }))
          }
          className="w-full accent-neutral-900 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
          <span>₹10,000</span>
          <span>₹35,000</span>
        </div>
      </div>

      {/* Shoe Sizes */}
      <div className="pt-4 border-t border-neutral-100">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
          Men&apos;s US Size
        </h3>
        <div className="grid grid-cols-4 gap-1.5">
          {availableSizes.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs font-bold'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Leather & Color Hues */}
      <div className="pt-4 border-t border-neutral-100">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
          Color Family
        </h3>
        <div className="space-y-2">
          {availableColors.map((color) => {
            const isSelected = filters.colors.includes(color.label.split(' / ')[0]);
            return (
              <button
                key={color.label}
                onClick={() => toggleColor(color.label.split(' / ')[0])}
                className="w-full flex items-center justify-between text-xs py-1 px-1.5 rounded-md hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-neutral-300 shadow-2xs"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-neutral-700">{color.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-neutral-900 font-bold" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="pt-4 border-t border-neutral-100">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
          Customer Rating
        </h3>
        <div className="space-y-1">
          {[4.8, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  minRating: prev.minRating === rating ? 0 : rating,
                }))
              }
              className={`w-full text-left px-2 py-1.5 rounded-md text-xs flex items-center justify-between transition-colors ${
                filters.minRating === rating ? 'bg-neutral-100 font-semibold' : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{rating} Stars & Above</span>
              </div>
              {filters.minRating === rating && <Check className="w-3.5 h-3.5 text-neutral-900" />}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="pt-4 border-t border-neutral-100">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
          Stock Status
        </h3>
        <button
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              availability: prev.availability === 'in_stock' ? 'all' : 'in_stock',
            }))
          }
          className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer"
        >
          <div
            className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
              filters.availability === 'in_stock'
                ? 'bg-neutral-900 border-neutral-900 text-white'
                : 'border-neutral-300 bg-white'
            }`}
          >
            {filters.availability === 'in_stock' && <Check className="w-3 h-3" />}
          </div>
          <span>In Stock Ready to Ship</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20">
      {/* Breadcrumb Header */}
      <div className="border-b border-neutral-200/80 bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <button
              onClick={() => setActiveView('home')}
              className="hover:text-neutral-900 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-neutral-900 font-medium">Catalog</span>
            {filters.category !== 'all' && (
              <>
                <span>/</span>
                <span className="text-neutral-900 font-semibold">{filters.category}</span>
              </>
            )}
          </div>

          <div className="text-xs text-neutral-500">
            Showing <strong className="text-neutral-900 tabular-nums">{visibleProducts.length}</strong> of{' '}
            <strong className="text-neutral-900 tabular-nums">{filteredProducts.length}</strong> styles
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white p-6 rounded-xl border border-neutral-200/80 sticky top-24 shadow-2xs">
              {filterSidebarContent}
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-3">
            
            {/* Top Controls Bar: Mobile filter trigger & Sort dropdown */}
            <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4 mb-6">
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-xs font-semibold text-neutral-900 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              {/* Active Filter Pills (Interactive removal buttons) */}
              <div className="hidden sm:flex flex-wrap items-center gap-1.5 flex-1 max-w-lg">
                {filters.category !== 'all' && (
                  <button
                    onClick={() => handleCategorySelect(filters.category)}
                    className="flex items-center gap-1 text-[11px] font-medium bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-md hover:bg-neutral-200 transition-colors"
                  >
                    <span>{filters.category}</span>
                    <X className="w-3 h-3 text-neutral-500" />
                  </button>
                )}
                {filters.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className="flex items-center gap-1 text-[11px] font-medium bg-neutral-100 text-neutral-800 px-2 py-1 rounded-md hover:bg-neutral-200 transition-colors"
                  >
                    <span>US {s}</span>
                    <X className="w-3 h-3 text-neutral-500" />
                  </button>
                ))}
              </div>

              {/* Sorting Options Selector */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-neutral-400 font-medium hidden sm:inline">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as FilterState['sortBy'],
                    }))
                  }
                  className="text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 focus:outline-hidden focus:ring-1 focus:ring-neutral-900 cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest Releases</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="best_rated">Best Rated</option>
                </select>
              </div>
            </div>

            {/* Product Grid: 4 cols on desktop, 3 cols on tablet, 2 cols on mobile */}
            {visibleProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button or Pagination */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setDisplayCount((prev) => prev + 4)}
                      className="px-8 py-3.5 bg-white border border-neutral-300 rounded-lg text-sm font-semibold text-neutral-900 hover:bg-neutral-50 hover:border-neutral-400 shadow-2xs transition-all cursor-pointer"
                    >
                      Load More Footwear ({filteredProducts.length - displayCount} remaining)
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* No Products Found Empty State */
              <div className="text-center py-16 bg-white rounded-xl border border-neutral-200 p-8">
                <div className="w-12 h-12 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">No matching footwear found</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
                  We could not find styles matching all selected filters. Try broadening your size, color, or price criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 px-5 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Mobile Filters Slide-Over Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden bg-neutral-900/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="w-full max-w-xs h-full bg-white ml-auto shadow-2xl flex flex-col p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
                <span className="font-semibold text-neutral-950">Refine Collection</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-neutral-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1">
                {filterSidebarContent}
              </div>

              <div className="pt-4 border-t border-neutral-100 mt-6">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-neutral-900 text-white rounded-lg font-semibold text-xs text-center"
                >
                  View {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
