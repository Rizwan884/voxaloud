"use client";

import { useState } from 'react';
import { GLOBAL_FAQS } from '@/lib/faqs';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQProps {
  limit?: number;
}

export default function FAQ({ limit }: FAQProps) {
  const faqs = limit ? GLOBAL_FAQS.slice(0, limit) : GLOBAL_FAQS;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="space-y-12 scroll-mt-20">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="badge-accent">
          Common Questions
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink tracking-tight">
          Everything you need to know about Fish Audio.
        </h2>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          Clear answers regarding AI voice cloning, commercial licensing, language coverage, and privacy.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div 
              key={faq.q}
              className={`card transition-all duration-200 overflow-hidden ${
                isOpen ? 'border-accent/40 shadow-sm' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => toggleIndex(i)}
                aria-expanded={isOpen}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="text-sm sm:text-base font-semibold text-ink font-display leading-snug">
                  {faq.q}
                </span>
                <span className={`w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-muted shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-ink bg-surface-3' : ''
                }`}>
                  <ChevronDown size={16} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-muted leading-relaxed border-t border-border/50 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
