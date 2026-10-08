'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { SIZE_CHART } from '@/data/footwearData';
import { X, Ruler, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [activeUnit, setActiveUnit] = useState<'us' | 'uk' | 'eu'>('us');

  if (!isSizeGuideOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsSizeGuideOpen(false)}
        />

        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all border border-neutral-200 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-neutral-900" />
                <h3 className="text-lg font-semibold text-neutral-950 font-display">
                  Men&apos;s Footwear Sizing Chart
                </h3>
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-black rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shoemaker Fit Note */}
            <div className="my-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-neutral-900">
                <Info className="w-4 h-4 text-neutral-700" />
                <span>How Aurelius Shoes Fit:</span>
              </div>
              <p className="leading-relaxed">
                • <strong>Sneakers & Casual Shoes:</strong> True to US athletic sizing. If between sizes, order the next half-size up.
              </p>
              <p className="leading-relaxed">
                • <strong>Goodyear Oxfords & Chelsea Boots:</strong> Built on traditional British and Italian lasts. We recommend taking a half-size down from standard sneaker sizes for a bespoke fit.
              </p>
            </div>

            {/* Sizing Table (Strict tabular-nums discipline) */}
            <div className="overflow-x-auto my-4 border border-neutral-200 rounded-xl">
              <table className="w-full text-xs text-center">
                <thead className="bg-neutral-100/80 text-neutral-700 font-semibold uppercase tracking-wider text-[11px] border-b border-neutral-200">
                  <tr>
                    <th className="py-2.5 px-3 text-left">US Men</th>
                    <th className="py-2.5 px-3">UK</th>
                    <th className="py-2.5 px-3">EU</th>
                    <th className="py-2.5 px-3 text-right pr-4">Foot Length (CM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-medium tabular-nums text-neutral-800">
                  {SIZE_CHART.map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-2.5 px-3 text-left font-bold text-neutral-950">{row.us}</td>
                      <td className="py-2.5 px-3">{row.uk}</td>
                      <td className="py-2.5 px-3">{row.eu}</td>
                      <td className="py-2.5 px-3 text-right pr-4 font-mono">{row.cm} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Instructions on measuring */}
            <div className="pt-2 text-xs text-neutral-500 flex items-center justify-between">
              <span>Free returns & size exchanges on all orders.</span>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg font-semibold text-xs hover:bg-neutral-800"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
