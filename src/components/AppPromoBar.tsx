"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import AppBadges from './AppBadges';
import { useAuth } from './auth/AuthProvider';

const DISMISS_KEY_LOGGED_OUT = 'fishaudio_signup_promo_dismissed';
const DISMISS_KEY_LOGGED_IN = 'fishaudio_app_promo_dismissed';

export default function AppPromoBar() {
  const { user, loading: authLoading } = useAuth();
  const [dismissTick, setDismissTick] = useState(0);
  const dismissKey = user ? DISMISS_KEY_LOGGED_IN : DISMISS_KEY_LOGGED_OUT;

  if (authLoading) return null;

  let dismissed = false;
  try {
    dismissed = typeof window !== 'undefined' && localStorage.getItem(dismissKey) === 'true';
  } catch {
    dismissed = false;
  }
  void dismissTick;

  if (dismissed) return null;

  const handleDismiss = () => {
    try {
      localStorage.setItem(dismissKey, 'true');
    } catch {
      // ignore
    }
    setDismissTick((t) => t + 1);
  };

  return (
    <div className="relative z-40 bg-ink text-paper text-xs border-b border-paper/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-11 flex items-center justify-between gap-3">
        {user ? (
          <>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-5 h-5 relative rounded overflow-hidden shrink-0">
                <Image src="/branding/app-icon.png" alt="" fill sizes="20px" className="object-contain" />
              </div>
              <p className="text-xs font-medium truncate text-paper/90">
                <span className="hidden sm:inline">Fish Audio is on mobile &bull; </span>
                Download the free app for voice cloning on the go.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <AppBadges size="compact" onDark className="!gap-1.5" />
              <button 
                onClick={handleDismiss} 
                aria-label="Dismiss Announcement" 
                className="p-1 text-paper/60 hover:text-paper hover:bg-paper/10 rounded-full transition-all cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles size={14} className="shrink-0 text-accent" />
              <p className="text-xs font-medium truncate text-paper/90">
                <span className="font-semibold text-white">100% Free Voice Cloning</span> &bull; 500+ natural voices, commercial rights, zero credit card.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link
                href="/login"
                className="hidden sm:inline text-xs font-medium text-paper/70 hover:text-paper transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1 bg-white text-ink text-xs font-semibold px-3 py-1 rounded-full hover:bg-paper/90 active:scale-[0.98] transition-all"
              >
                <span>Try Free</span>
                <ArrowRight size={11} />
              </Link>
              <button 
                onClick={handleDismiss} 
                aria-label="Dismiss Announcement" 
                className="p-1 text-paper/60 hover:text-paper hover:bg-paper/10 rounded-full transition-all cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
