'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  ArrowUp, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function Footer() {
  const { setActiveView, navigateToShopCategory, setIsSizeGuideOpen } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141414] text-neutral-300 border-t border-neutral-800 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Multi-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-14 border-b border-neutral-800">
          
          {/* Brand Column (spans 2 cols on mobile/tablet) */}
          <div className="col-span-2 space-y-4">
            <div className="space-y-1">
              <span className="text-xl font-bold tracking-widest uppercase font-display text-white">
                AURELIUS
              </span>
              <p className="text-xs text-neutral-400 tracking-wider font-light">
                ATELIER · CIVITANOVA MARCHE
              </p>
            </div>
            
            <p className="text-neutral-400 max-w-sm leading-relaxed font-normal">
              Purveyors of handcrafted luxury men&apos;s footwear. Designed with modern restraint, hand-lasted by master Italian artisans from full-grain French calfskin.
            </p>

            <div className="flex items-center gap-3 pt-2 text-neutral-400">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 hover:text-white flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Shop Footwear
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => navigateToShopCategory('Sneakers')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sneakers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToShopCategory('Formal Shoes')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Formal Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToShopCategory('Casual Shoes')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Casual Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToShopCategory('Boots')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Boots
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToShopCategory('Loafers')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Loafers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => setActiveView('checkout')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shoemaker Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('shop')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Complimentary Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('shop')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <span className="text-neutral-500 cursor-default">
                  Concierge: care@aurelius.com
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              The Atelier
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => setActiveView('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Our Craft
                </button>
              </li>
              <li>
                <span className="text-neutral-500 cursor-default">
                  Goodyear Welting Heritage
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-default">
                  Sustainability & Leathers
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-default">
                  Private Patron Guild
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-default">
                  Terms & Conditions
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-neutral-500 text-[11px] gap-4">
          <p>© {new Date().getFullYear()} AURELIUS & CO. Handcrafted in Civitanova Marche. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>ISO 9001 Artisan Audited</span>
            <span>·</span>
            <span>LWG Gold Certified Tanning</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
