"use client";

import Link from 'next/link';
import { Lock, ArrowRight } from 'lucide-react';

export default function AuthGate({ variant = 'full', configured = true }: { variant?: 'full' | 'compact'; configured?: boolean }) {
  return (
    <div className={`card-surface flex flex-col items-center text-center gap-4 border-dashed border-2 border-border ${variant === 'full' ? 'p-12' : 'p-8'}`}>
      <div className="w-14 h-14 rounded-full bg-ink/5 flex items-center justify-center">
        <Lock size={22} className="text-ink" />
      </div>
      <div className="space-y-1.5">
        <p className="text-sm font-black uppercase tracking-wider text-ink">Sign in to clone voices</p>
        <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
          Create a free account to record or upload a sample, clone a voice, and generate speech with it.
        </p>
        {!configured && (
          <p className="text-[10px] text-amber-600 max-w-xs mx-auto leading-relaxed pt-1">
            Site setup note: authentication isn&apos;t configured yet — add Supabase credentials to enable sign-in.
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Link href="/login" className="btn-outline !text-[11px] !py-2.5 !px-5 uppercase tracking-wider">
          Log In
        </Link>
        <Link href="/signup" className="btn-primary !text-[11px] !py-2.5 !px-5 uppercase tracking-wider flex items-center gap-1.5">
          Sign Up Free <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
