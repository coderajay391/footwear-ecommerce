'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    navigateToShopCategory,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPromoDismissed, setIsPromoDismissed] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'shop' | 'wishlist') => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', view: 'home' as const },
    { label: 'Shop All', view: 'shop' as const },
    { label: 'Sneakers', category: 'Sneakers' },
    { label: 'Boots & Oxfords', category: 'Boots' },
    { label: 'New Arrivals', view: 'shop' as const, isNew: true },
    { label: 'Offers', view: 'shop' as const, isPromo: true },
  ];

  return (
    <>
      {/* Top Notification Bar (slim, dismissible, WCAG AA compliant) */}
      {!isPromoDismissed && (
        <div className="bg-[#141414] text-neutral-200 text-xs py-2 px-4 flex items-center justify-between tracking-wide transition-colors">
          <div className="flex-1 text-center font-medium">
            <span>Complimentary Express Delivery on Orders Over ₹15,000</span>
            <span className="hidden sm:inline text-neutral-400 mx-2">·</span>
            <span className="hidden sm:inline text-neutral-300">
              Use code <strong className="text-white tracking-widest font-semibold">WELCOME10</strong> for 10% off
            </span>
          </div>
          <button
            onClick={() => setIsPromoDismissed(true)}
            className="text-neutral-400 hover:text-white p-1 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Sticky Navbar (Strict Top Bar Contract: 3 Zones) */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-200/80 py-3.5'
            : 'bg-[#FAF9F6] border-b border-neutral-200/60 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* ZONE 1: Single Text Element Brand Wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-hidden"
            >
              <span className="text-xl sm:text-2xl font-semibold tracking-widest uppercase font-display text-neutral-900 group-hover:text-neutral-600 transition-colors">
                AURELIUS
              </span>
              <span className="hidden sm:inline text-xs tracking-widest text-neutral-400 ml-1.5 font-light">
                ATELIER
              </span>
            </button>
          </div>

          {/* ZONE 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-wider uppercase font-medium text-neutral-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-neutral-950 transition-colors cursor-pointer py-1 border-b ${
                activeView === 'home' ? 'border-neutral-900 text-neutral-950 font-semibold' : 'border-transparent'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-neutral-950 transition-colors cursor-pointer py-1 border-b ${
                activeView === 'shop' ? 'border-neutral-900 text-neutral-950 font-semibold' : 'border-transparent'
              }`}
            >
              Shop
            </button>

            <button
              onClick={() => {
                navigateToShopCategory('Sneakers');
              }}
              className="hover:text-neutral-950 transition-colors cursor-pointer py-1 border-b border-transparent"
            >
              Sneakers
            </button>

            <button
              onClick={() => {
                navigateToShopCategory('Loafers');
              }}
              className="hover:text-neutral-950 transition-colors cursor-pointer py-1 border-b border-transparent"
            >
              Loafers
            </button>

            <button
              onClick={() => {
                navigateToShopCategory('Boots');
              }}
              className="hover:text-neutral-950 transition-colors cursor-pointer py-1 border-b border-transparent"
            >
              Boots
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className="hover:text-neutral-950 transition-colors cursor-pointer py-1 text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offers</span>
            </button>
          </nav>

          {/* ZONE 3: 1-2 Primary Actions & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-700 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Search footwear collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="p-2 text-neutral-700 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors relative cursor-pointer"
              aria-label="View wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-neutral-900 text-neutral-900' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="p-2 text-neutral-700 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="User account"
              >
                <User className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {isAccountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-white border border-neutral-200 rounded-xl shadow-lg p-4 z-50 text-left"
                  >
                    <div className="border-b border-neutral-100 pb-3 mb-3">
                      <p className="text-xs text-neutral-400 uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-semibold text-neutral-900 truncate">patron@aurelius.com</p>
                    </div>
                    <div className="space-y-1.5 text-xs text-neutral-600">
                      <button
                        onClick={() => {
                          setActiveView('checkout');
                          setIsAccountOpen(false);
                        }}
                        className="w-full text-left py-1.5 px-2 hover:bg-neutral-50 rounded-md transition-colors"
                      >
                        Order History & Tracking
                      </button>
                      <button
                        onClick={() => {
                          setActiveView('wishlist');
                          setIsAccountOpen(false);
                        }}
                        className="w-full text-left py-1.5 px-2 hover:bg-neutral-50 rounded-md transition-colors"
                      >
                        Saved Wishlist ({wishlist.length})
                      </button>
                      <button
                        onClick={() => setIsAccountOpen(false)}
                        className="w-full text-left py-1.5 px-2 hover:bg-neutral-50 rounded-md transition-colors"
                      >
                        Shoemaker Sizing Profile
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-neutral-900 text-white px-3.5 py-2 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer relative"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-medium tracking-wide">Bag</span>
              <span className="w-5 h-5 bg-white text-neutral-900 rounded-full text-[11px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-800 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors ml-1"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden bg-neutral-900/50 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="w-4/5 max-w-sm h-full bg-white shadow-xl flex flex-col justify-between p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                  <span className="text-xl font-bold tracking-widest uppercase font-display text-neutral-950">
                    AURELIUS
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-neutral-500 hover:text-neutral-950"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-6 space-y-4">
                  <button
                    onClick={() => handleNavClick('home')}
                    className="w-full flex items-center justify-between text-base font-medium text-neutral-900 py-2"
                  >
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => handleNavClick('shop')}
                    className="w-full flex items-center justify-between text-base font-medium text-neutral-900 py-2"
                  >
                    <span>Full Catalog</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => {
                      navigateToShopCategory('Sneakers');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between text-base font-medium text-neutral-900 py-2"
                  >
                    <span>Sneakers</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => {
                      navigateToShopCategory('Formal Shoes');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between text-base font-medium text-neutral-900 py-2"
                  >
                    <span>Formal Oxfords</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => {
                      navigateToShopCategory('Loafers');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between text-base font-medium text-neutral-900 py-2"
                  >
                    <span>Loafers</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => {
                      navigateToShopCategory('Boots');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between text-base font-medium text-neutral-900 py-2"
                  >
                    <span>Boots</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => handleNavClick('wishlist')}
                    className="w-full flex items-center justify-between text-base font-medium text-neutral-900 py-2"
                  >
                    <span>My Wishlist ({wishlist.length})</span>
                    <Heart className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100 text-xs text-neutral-500 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-700" />
                  <span>Handcrafted in Civitanova Marche, Italy</span>
                </div>
                <p>Customer Concierge: support@aurelius.com</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
