"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Gift, ArrowRight } from 'lucide-react';
import AppBadges from './AppBadges';
import { useAuth } from './auth/AuthProvider';

const DISMISS_KEY_LOGGED_OUT = 'fishaudio_signup_promo_dismissed';
const DISMISS_KEY_LOGGED_IN = 'fishaudio_app_promo_dismissed';

export default function AppPromoBar() {
  const { user, loading: authLoading } = useAuth();
  // Bumped after a dismiss click to force a re-read of localStorage below —
  // avoids syncing localStorage into state via an effect entirely.
  const [dismissTick, setDismissTick] = useState(0);
  const dismissKey = user ? DISMISS_KEY_LOGGED_IN : DISMISS_KEY_LOGGED_OUT;

  if (authLoading) return null;

  let dismissed = false;
  try {
    dismissed = typeof window !== 'undefined' && localStorage.getItem(dismissKey) === 'true';
  } catch {
    dismissed = false;
  }
  void dismissTick; // referenced only to trigger a re-render after handleDismiss

  if (dismissed) return null;

  const handleDismiss = () => {
    try {
      localStorage.setItem(dismissKey, 'true');
    } catch {
      // storage unavailable — dismissal just won't persist, non-critical
    }
    setDismissTick((t) => t + 1);
  };

  return (
    <div className="relative z-40 bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-3 md:px-6 h-12 flex items-center justify-between gap-3">
        {user ? (
          <>
            <div className="flex items-center gap-2.5 min-w-0">
              <Image src="/branding/app-icon.png" alt="" width={26} height={26} className="rounded-md shrink-0" />
              <p className="text-[11px] sm:text-xs font-bold truncate">
                <span className="hidden sm:inline">Fish Audio is now on mobile — </span>
                Get the app for faster voice cloning on the go.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <AppBadges size="compact" onDark className="!gap-2" />
              <button onClick={handleDismiss} aria-label="Dismiss" className="p-1 text-paper/60 hover:text-paper hover:bg-paper/10 rounded-full transition-all">
                <X size={15} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2.5 min-w-0">
              <Gift size={18} className="shrink-0 text-paper" />
              <p className="text-[11px] sm:text-xs font-bold truncate">
                100% Free — no cost, no credit card. Sign up and start cloning your voice today.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link
                href="/login"
                className="hidden sm:inline text-[11px] font-bold text-paper/70 hover:text-paper uppercase tracking-wider transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1 bg-paper text-ink text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Sign Up Free <ArrowRight size={12} />
              </Link>
              <button onClick={handleDismiss} aria-label="Dismiss" className="p-1 text-paper/60 hover:text-paper hover:bg-paper/10 rounded-full transition-all">
                <X size={15} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
