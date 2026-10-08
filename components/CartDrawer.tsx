'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { formatINR } from '@/lib/utils';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setActiveView,
  } = useStore();

  const [inputCode, setInputCode] = useState('');

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-neutral-900" />
                  <h2 className="text-lg font-semibold text-neutral-950 font-display">
                    Shopping Bag ({cart.reduce((t, i) => t + i.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-100">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="py-4 flex gap-4 items-center"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info & Controls */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-neutral-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          Size US {item.size} · {item.color.name}
                        </p>
                        <p className="text-xs font-bold text-neutral-950 mt-1 tabular-nums">
                          {formatINR(item.product.price)}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          {/* Stepper */}
                          <div className="flex items-center border border-neutral-200 rounded-md bg-neutral-50 overflow-hidden">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-200 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2.5 text-xs font-semibold tabular-nums text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-200 font-bold"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3 text-neutral-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <p className="text-base font-semibold text-neutral-900">Your shopping bag is empty</p>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                      Explore our handcrafted calfskin court shoes, wholecut oxfords, or loafers.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setActiveView('shop');
                      }}
                      className="mt-5 px-5 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
                    >
                      Explore Footwear
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-neutral-200 bg-neutral-50/80 space-y-4">
                  {/* Promo Input */}
                  <div className="space-y-1.5">
                    {appliedPromo ? (
                      <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-200">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Code {appliedPromo.code} ({appliedPromo.discountPercent}% Off)</span>
                        </div>
                        <button
                          onClick={removePromoCode}
                          className="text-xs text-emerald-900 hover:underline font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handlePromoSubmit} className="flex gap-2">
                        <input
                          type="text"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          placeholder="Promo Code (e.g. WELCOME10)"
                          className="flex-1 px-3 py-1.5 bg-white border border-neutral-300 rounded-md text-xs uppercase placeholder:normal-case focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-neutral-900 text-white rounded-md text-xs font-semibold hover:bg-neutral-800 transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-neutral-900 tabular-nums">{formatINR(cartSubtotal)}</span>
                    </div>

                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Promotional Discount</span>
                        <span className="tabular-nums">-{formatINR(cartDiscount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Expedited Delivery</span>
                      <span className="tabular-nums">
                        {cartShipping === 0 ? (
                          <strong className="text-emerald-700 font-medium">Complimentary</strong>
                        ) : (
                          formatINR(cartShipping)
                        )}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-neutral-950">
                      <span>Estimated Total</span>
                      <span className="tabular-nums">{formatINR(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={handleProceedToCheckout}
                      className="w-full bg-neutral-950 text-white py-3.5 rounded-lg text-xs font-semibold tracking-wide uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setActiveView('cart');
                      }}
                      className="w-full py-2 text-xs text-neutral-600 hover:text-black font-medium transition-colors"
                    >
                      View Full Bag Details
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
                    <span>256-Bit Encrypted Secure Checkout</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
