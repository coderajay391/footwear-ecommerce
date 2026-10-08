'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/footwearData';
import Navbar from './Navbar';
import Footer from './Footer';
import HomePage from './HomePage';
import ShopPage from './ShopPage';
import ProductDetailView from './ProductDetailView';
import CartPage from './CartPage';
import CheckoutView from './CheckoutView';
import WishlistView from './WishlistView';
import CartDrawer from './CartDrawer';
import SearchModal from './SearchModal';
import QuickViewModal from './QuickViewModal';
import SizeGuideModal from './SizeGuideModal';
import ToastNotification from './ToastNotification';

export default function MainApp() {
  const { activeView, selectedProduct } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && <HomePage />}
        {activeView === 'shop' && <ShopPage />}
        {activeView === 'product' && (
          <ProductDetailView product={selectedProduct || PRODUCTS[0]} />
        )}
        {activeView === 'cart' && <CartPage />}
        {activeView === 'checkout' && <CheckoutView />}
        {activeView === 'wishlist' && <WishlistView />}
      </main>

      <Footer />

      {/* Global Modals, Drawers & Notifications */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <SizeGuideModal />
      <ToastNotification />
    </div>
  );
}
