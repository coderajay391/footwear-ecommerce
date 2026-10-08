'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ToastNotification() {
  const { toast } = useStore();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm bg-neutral-950 text-white rounded-xl p-4 shadow-xl border border-neutral-800 flex items-start gap-3 pointer-events-auto"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-sky-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-white tracking-wide">{toast.title}</h4>
            {toast.subtitle && (
              <p className="text-[11px] text-neutral-400 mt-0.5 truncate">{toast.subtitle}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
