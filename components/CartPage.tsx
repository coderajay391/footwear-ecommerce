'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { formatINR } from '@/lib/utils';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Tag, 
  Truck, 
  HelpCircle,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CartPage() {
  const {
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

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
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
            <span className="text-neutral-900 font-semibold">Shopping Bag</span>
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
        <h1 className="text-2xl sm:text-3xl font-light text-neutral-950 font-display tracking-tight mb-8">
          Your Shopping <span className="font-semibold">Bag</span> ({cart.reduce((t, i) => t + i.quantity, 0)} items)
        </h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 8 Cols: Itemized List */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-2xs">
              
              {/* Header row on desktop */}
              <div className="hidden sm:grid grid-cols-12 pb-4 border-b border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <div className="col-span-6">Footwear Item</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-neutral-100">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
                    >
                      {/* Product details */}
                      <div className="sm:col-span-6 flex gap-4 w-full">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="96px"
                            className="object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex flex-col justify-center min-w-0">
                          <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                            {item.product.category}
                          </p>
                          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Size US <strong>{item.size}</strong> · {item.color.name}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1 mt-2 text-left cursor-pointer font-medium w-fit"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="sm:col-span-2 text-center text-sm font-medium text-neutral-700 tabular-nums hidden sm:block">
                        {formatINR(item.product.price)}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="sm:col-span-2 flex justify-center w-full sm:w-auto">
                        <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-xs text-neutral-600 hover:bg-neutral-200 font-bold"
                          >
                            -
                          </button>
                          <span className="px-3.5 text-xs font-semibold tabular-nums text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-xs text-neutral-600 hover:bg-neutral-200 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Line Subtotal */}
                      <div className="sm:col-span-2 text-right w-full sm:w-auto flex justify-between sm:block">
                        <span className="sm:hidden text-xs text-neutral-400">Total:</span>
                        <span className="text-sm font-bold text-neutral-950 tabular-nums">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Free delivery indicator progress */}
              <div className="mt-8 pt-6 border-t border-neutral-100 bg-neutral-50/70 p-4 rounded-xl">
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1.5 font-medium text-neutral-800">
                    <Truck className="w-4 h-4 text-neutral-700" />
                    <span>
                      {cartSubtotal >= 15000
                        ? 'Complimentary Express Delivery unlocked!'
                        : `Add ${formatINR(15000 - cartSubtotal)} more for complimentary delivery`}
                    </span>
                  </div>
                  <span className="font-semibold tabular-nums">{Math.min(100, Math.round((cartSubtotal / 15000) * 100))}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotal / 15000) * 100)}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Order Summary Module */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-2xs space-y-6 sticky top-24">
              <h2 className="text-lg font-semibold text-neutral-950 font-display">
                Order Summary
              </h2>

              {/* Promo code form */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    <div className="flex items-center gap-2 font-medium">
                      <Tag className="w-4 h-4 text-emerald-700" />
                      <span>Code <strong>{appliedPromo.code}</strong> (-{appliedPromo.discountPercent}%)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-emerald-900 underline hover:font-bold"
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
                      placeholder="Promotional Code"
                      className="flex-1 px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs uppercase placeholder:normal-case focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">{formatINR(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedPromo?.discountPercent}%)</span>
                    <span className="tabular-nums">-{formatINR(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="tabular-nums">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-700 font-medium">Free Delivery</span>
                    ) : (
                      formatINR(cartShipping)
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex justify-between text-base font-bold text-neutral-950">
                  <span>Total Due</span>
                  <span className="tabular-nums">{formatINR(cartTotal)}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => {
                  setActiveView('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-neutral-950 text-white py-4 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
                  <ShieldCheck className="w-4 h-4 text-neutral-700" />
                  <span>Complimentary Returns & Exchanges</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Taxes and customs duties calculated based on delivery destination.
                </p>
              </div>

            </div>

          </div>
        ) : (
          /* Empty Cart State */
          <div className="text-center py-24 bg-white rounded-2xl border border-neutral-200 p-8 max-w-xl mx-auto shadow-2xs">
            <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900 font-display">
              Your bag is currently unoccupied
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto mt-2 leading-relaxed">
              Discover our latest drop of Italian calfskin sneakers, Wholecut Oxfords, and unlined summer suede loafers.
            </p>
            <button
              onClick={() => setActiveView('shop')}
              className="mt-6 px-8 py-3.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-2xs"
            >
              Explore Collection
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
