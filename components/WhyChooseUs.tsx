'use client';

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Truck,
      title: 'Free Worldwide Shipping',
      description: 'Complimentary expedited shipping on all footwear orders exceeding ₹15,000. Fully insured transit.',
    },
    {
      icon: RotateCcw,
      title: '30-Day Easy Returns',
      description: 'Try in the comfort of your home. Complimentary return shipping and seamless exchanges within 30 days.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: 'Encrypted 256-bit payment gateways supporting Cards, UPI, Net Banking, and Cash on Delivery.',
    },
    {
      icon: Award,
      title: 'Handcrafted Heritage',
      description: 'Every pair is hand-lasted by master cobblers in Civitanova Marche with Goodyear-welted durability.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            The Aurelius Standard
          </p>
          <h2 className="text-2xl sm:text-3xl font-light text-neutral-950 font-display mt-1.5 tracking-tight">
            Why Discerning Gentlemen <span className="font-semibold">Choose Us</span>
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            Direct-from-workshop transparency, eliminating middleman markups while preserving generational Italian craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-neutral-50/70 border border-neutral-200/80 hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-neutral-900 text-white flex items-center justify-center mb-5 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-neutral-950 tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
