"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import AdBanner from './AdBanner';

export default function StickyAdBanner() {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show dismiss button after 8 seconds
    const timer = setTimeout(() => {
      setShowCloseButton(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-t border-border shadow-2xl flex items-center justify-center transition-all duration-300">
      
      {/* Dismiss button - only visible after 8s */}
      {showCloseButton && (
        <button 
          onClick={() => setIsDismissed(true)}
          className="absolute -top-3.5 right-4 z-50 bg-ink text-paper hover:bg-muted p-1 rounded-full border border-border shadow-md transition-all active:scale-95"
          aria-label="Dismiss Advertisement"
        >
          <X size={12} />
        </button>
      )}

      {/* Responsive Ad Units */}
      <div className="h-[60px] md:h-[90px] flex items-center justify-center overflow-hidden py-1">
        <div className="hidden md:block">
          <AdBanner type="728x90" />
        </div>
        <div className="md:hidden">
          <AdBanner type="320x50" />
        </div>
      </div>
    </div>
  );
}
