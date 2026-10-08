'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { formatINR } from '@/lib/utils';
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Smartphone, 
  Banknote, 
  Building,
  Lock,
  ChevronRight,
  Package
} from 'lucide-react';
import { motion } from 'motion/react';

export default function CheckoutView() {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedPromo,
    placeOrder,
    lastOrder,
    setActiveView,
  } = useStore();

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod' | 'netbanking'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: 'Julian Sterling',
    email: 'j.sterling@heritage.com',
    phone: '+1 (555) 382-9012',
    address: '450 West 14th Street, Suite 8B',
    city: 'New York',
    state: 'NY',
    postalCode: '10014',
    country: 'United States',
    // Card inputs
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    // UPI
    upiId: 'julian@oksbi',
    // Net banking
    bankName: 'JPMorgan Chase',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const shippingCost = deliveryMethod === 'express' ? 1499 : cartSubtotal > 15000 ? 0 : 999;
  const finalTotal = cartTotal + (deliveryMethod === 'express' ? 1499 : 0);

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.address.trim()) errs.address = 'Shipping street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';

    if (paymentMethod === 'card' && !formData.cardNumber) {
      errs.cardNumber = 'Card number required';
    }
    if (paymentMethod === 'upi' && !formData.upiId) {
      errs.upiId = 'UPI Virtual Payment Address required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (cart.length === 0 && !lastOrder) return;

    setIsSubmitting(true);
    // Simulate payment gateway settlement
    setTimeout(async () => {
      await placeOrder({
        items: cart,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shipping: shippingCost,
        total: finalTotal,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        deliveryMethod,
        paymentMethod,
      });
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // If order was just placed, display high-end confirmation state
  if (lastOrder) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-neutral-200/80 p-8 sm:p-12 shadow-sm text-center"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
              Order Confirmed & Logged
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-950 font-display mt-1">
              Thank You, {lastOrder.customer.fullName}
            </h1>
            <p className="text-sm text-neutral-600 max-w-md mx-auto mt-2 leading-relaxed">
              Your artisanal footwear has entered our Civitanova Marche fulfillment atelier. A confirmation receipt has been dispatched to <strong>{lastOrder.customer.email}</strong>.
            </p>

            {/* Receipt Summary Card */}
            <div className="mt-8 p-6 bg-neutral-50 rounded-xl border border-neutral-200 text-left space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3 text-xs">
                <div>
                  <span className="text-neutral-400">Order Reference: </span>
                  <strong className="text-neutral-900 font-mono">{lastOrder.orderId}</strong>
                </div>
                <div>
                  <span className="text-neutral-400">Order Date: </span>
                  <span className="text-neutral-800">{lastOrder.date}</span>
                </div>
              </div>

              {/* Items Purchased */}
              <div className="space-y-3 pt-1">
                {lastOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-neutral-200 shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{item.product.name}</p>
                        <p className="text-neutral-500">
                          Qty: {item.quantity} · Size US {item.size} · {item.color.name}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-900 tabular-nums">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="pt-4 border-t border-neutral-200 text-xs space-y-1.5 text-neutral-600">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="uppercase font-semibold text-neutral-900">{lastOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Address:</span>
                  <span className="text-neutral-800 text-right">
                    {lastOrder.customer.address}, {lastOrder.customer.city}, {lastOrder.customer.postalCode}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Amount Paid:</span>
                  <span className="tabular-nums">{formatINR(lastOrder.total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  setActiveView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Continue Browsing Footwear
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Active Checkout Form
  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-neutral-200/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <button onClick={() => setActiveView('cart')} className="hover:text-black flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Shopping Bag</span>
            </button>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">Secure Checkout</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
            <Lock className="w-3.5 h-3.5 text-neutral-700" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-2xl sm:text-3xl font-light text-neutral-950 font-display tracking-tight mb-8">
          Express Atelier <span className="font-semibold">Checkout</span>
        </h1>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (8 cols): Checkout Input Sections */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* SECTION 1: Contact Information */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h2 className="text-base font-semibold text-neutral-950 font-display flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-mono flex items-center justify-center">1</span>
                  <span>Contact Information</span>
                </h2>
                <span className="text-xs text-neutral-400">Order Updates</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Mobile Phone (for delivery courier SMS)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: Shipping Address */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h2 className="text-base font-semibold text-neutral-950 font-display flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-mono flex items-center justify-center">2</span>
                  <span>Shipping Address</span>
                </h2>
                <span className="text-xs text-neutral-400">Physical Delivery</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Street Address & Apartment/Suite *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                  />
                  {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                    />
                    {errors.city && <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Postal / ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                    />
                    {errors.postalCode && <p className="text-[11px] text-rose-600 mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Country / Region
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Italy">Italy</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 3: Delivery Method */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h2 className="text-base font-semibold text-neutral-950 font-display flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-mono flex items-center justify-center">3</span>
                  <span>Delivery Method</span>
                </h2>
                <span className="text-xs text-neutral-400">Insured Courier</span>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-neutral-900 bg-neutral-50/80 shadow-2xs'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="accent-neutral-900"
                    />
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        Atelier Standard Insured Shipping (3–5 Business Days)
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        Signature required on delivery
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 tabular-nums">
                    {cartSubtotal > 15000 ? 'Complimentary' : '₹999'}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-neutral-900 bg-neutral-50/80 shadow-2xs'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="accent-neutral-900"
                    />
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        DHL Express Priority Air (1–2 Business Days)
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        Guaranteed next-morning dispatch from workshop
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 tabular-nums">
                    +₹1,499
                  </span>
                </label>
              </div>
            </div>

            {/* SECTION 4: Payment Method */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h2 className="text-base font-semibold text-neutral-950 font-display flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-mono flex items-center justify-center">4</span>
                  <span>Payment Method</span>
                </h2>
                <span className="text-xs text-neutral-400">Encrypted</span>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'card' as const, label: 'Credit Card', icon: CreditCard },
                  { id: 'upi' as const, label: 'UPI Instant', icon: Smartphone },
                  { id: 'cod' as const, label: 'Cash on Delivery', icon: Banknote },
                  { id: 'netbanking' as const, label: 'Net Banking', icon: Building },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = paymentMethod === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPaymentMethod(opt.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-2xs'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-semibold whitespace-nowrap">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Conditional Payment Details Inputs */}
              <div className="pt-4 border-t border-neutral-100">
                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          placeholder="4532 •••• •••• 8912"
                          className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                        />
                        <CreditCard className="w-4 h-4 absolute right-3.5 top-3 text-neutral-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                          placeholder="08/29"
                          className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Security CVC
                        </label>
                        <input
                          type="text"
                          value={formData.cardCvc}
                          onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                          placeholder="382"
                          className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-neutral-700">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={formData.upiId}
                      onChange={(e) => handleInputChange('upiId', e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                    />
                    <p className="text-[11px] text-neutral-500">
                      A payment request notification will be sent to Google Pay / PhonePe / Paytm.
                    </p>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
                    <p className="font-semibold mb-1">Cash on Delivery Terms:</p>
                    <p>
                      Inspect your footwear upon delivery. Pay via cash or contactless courier QR scan. Please have exact change ({formatINR(finalTotal)}) ready.
                    </p>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-neutral-700">
                      Select Financial Institution
                    </label>
                    <select
                      value={formData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                    >
                      <option value="JPMorgan Chase">JPMorgan Chase</option>
                      <option value="Bank of America">Bank of America</option>
                      <option value="Barclays Private Bank">Barclays Private Bank</option>
                      <option value="HSBC Premier">HSBC Premier</option>
                      <option value="Citibank">Citibank</option>
                    </select>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Right Column (4 cols): Sticky Order Summary & Submit Button */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-2xs space-y-6 sticky top-24">
            <h2 className="text-base font-semibold text-neutral-950 font-display pb-3 border-b border-neutral-100">
              Order Manifest ({cart.length} footwear styles)
            </h2>

            {/* Cart Preview Items */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-neutral-100">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-semibold text-neutral-900 truncate">{item.product.name}</p>
                    <p className="text-neutral-500">
                      Qty: {item.quantity} · Size US {item.size}
                    </p>
                    <p className="font-bold text-neutral-950 mt-0.5 tabular-nums">
                      {formatINR(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-2.5 text-xs text-neutral-600 pt-3 border-t border-neutral-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900 tabular-nums">{formatINR(cartSubtotal)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Promotional Savings</span>
                  <span className="tabular-nums">-{formatINR(cartDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Courier Service</span>
                <span className="tabular-nums">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700 font-medium">Complimentary</span>
                  ) : (
                    formatINR(shippingCost)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-between text-base font-bold text-neutral-950">
                <span>Total Amount Due</span>
                <span className="tabular-nums">{formatINR(finalTotal)}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full bg-neutral-950 text-white py-4 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {isSubmitting ? (
                <span>Securing Payment & Placing Order...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Place Order · {formatINR(finalTotal)}</span>
                </>
              )}
            </button>

            <div className="text-center space-y-1.5 pt-1">
              <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-neutral-700" />
                <span>30-Day Guaranteed Returns & Exchanges</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Handcrafted under bespoke shoemaker standards in Civitanova Marche, Italy.
              </p>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
}
