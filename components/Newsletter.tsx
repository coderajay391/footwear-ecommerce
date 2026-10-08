'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', undefined, 'error');
      return;
    }

    setIsSubscribed(true);
    showToast('Subscribed to Atelier Dispatch', '10% discount code WELCOME10 activated', 'success');
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-neutral-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="p-8 sm:p-12 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-light font-display text-neutral-950 tracking-tight">
            Get <span className="font-semibold">10% Off</span> Your First Order
          </h2>
          
          <p className="text-sm text-neutral-600 max-w-md mx-auto mt-2 leading-relaxed">
            Join our private guild of patrons. Receive seasonal private release notices, shoemaker care insights, and exclusive invitations.
          </p>

          {isSubscribed ? (
            <div className="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>You are subscribed. Use code <strong>WELCOME10</strong> at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-900 transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-neutral-950 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-neutral-400 mt-3">
            No spam. Unsubscribe anytime with one click.
          </p>
        </div>

      </div>
    </section>
  );
}
