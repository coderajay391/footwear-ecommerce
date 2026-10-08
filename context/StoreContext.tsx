'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductColor, FilterState, OrderDetails } from '@/types/footwear';
import { PRODUCTS } from '@/data/footwearData';

interface Toast {
  id: number;
  title: string;
  subtitle?: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation View
  activeView: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'wishlist';
  setActiveView: (view: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'wishlist') => void;
  selectedProduct: Product | null;
  setSelectedProductId: (id: string | null) => void;
  navigateToProduct: (product: Product) => void;
  navigateToShopCategory: (category: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: number, color: ProductColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  promoCode: string;
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Drawers
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  // Shop Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Toast
  toast: Toast | null;
  showToast: (title: string, subtitle?: string, type?: 'success' | 'info' | 'error') => void;

  // Checkout & Orders
  lastOrder: OrderDetails | null;
  placeOrder: (orderDetails: Omit<OrderDetails, 'orderId' | 'date'>) => Promise<string>;
}

const defaultFilters: FilterState = {
  category: 'all',
  sizes: [],
  colors: [],
  priceRange: [10000, 35000],
  brand: [],
  minRating: 0,
  availability: 'all',
  searchQuery: '',
  sortBy: 'featured',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'wishlist'>('home');
  const [selectedProductId, setSelectedProductIdState] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedCart = localStorage.getItem('aurelius_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedWishlist = localStorage.getItem('aurelius_wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [toast, setToast] = useState<Toast | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  // Sync back to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('aurelius_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aurelius_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Selected Product resolution
  const selectedProduct = selectedProductId
    ? PRODUCTS.find((p) => p.id === selectedProductId) || null
    : null;

  const showToast = (title: string, subtitle?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setToast({ id, title, subtitle, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3200);
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProductIdState(product.id);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShopCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      category,
    }));
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size: number, color: ProductColor, quantity = 1) => {
    const cartItemId = `${product.id}-${size}-${color.name}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: cartItemId, product, size, color, quantity }];
    });
    showToast(
      'Added to Shopping Bag',
      `${product.name} (US ${size} · ${color.name})`,
      'success'
    );
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === cartItemId);
      if (item) {
        showToast('Removed from Bag', item.product.name, 'info');
      }
      return prev.filter((i) => i.id !== cartItemId);
    });
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const product = PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        showToast('Removed from Wishlist', product?.name, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', product?.name, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setAppliedPromo({ code: 'WELCOME10', discountPercent: 10 });
      showToast('Promo Code Applied', '10% off your order', 'success');
      return true;
    } else if (clean === 'AURELIUS20') {
      setAppliedPromo({ code: 'AURELIUS20', discountPercent: 20 });
      showToast('VIP Promo Code Applied', '20% off your order', 'success');
      return true;
    } else {
      showToast('Invalid Promo Code', 'Try WELCOME10 or AURELIUS20', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    showToast('Promo Code Removed', undefined, 'info');
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartDiscount = appliedPromo ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100) : 0;
  const cartShipping = cartSubtotal > 15000 || cartSubtotal === 0 ? 0 : 999;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const placeOrder = async (orderData: Omit<OrderDetails, 'orderId' | 'date'>): Promise<string> => {
    const orderId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    const fullOrder: OrderDetails = {
      ...orderData,
      orderId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    setLastOrder(fullOrder);
    clearCart();
    setActiveView('checkout');
    showToast('Order Placed Successfully', `Order Reference #${orderId}`, 'success');
    return orderId;
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProduct,
        setSelectedProductId: setSelectedProductIdState,
        navigateToProduct,
        navigateToShopCategory,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        promoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        filters,
        setFilters,
        resetFilters,
        toast,
        showToast,
        lastOrder,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
