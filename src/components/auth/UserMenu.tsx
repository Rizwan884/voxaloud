"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { useAuth } from './AuthProvider';

export default function UserMenu({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const { user, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-surface-2 animate-pulse" />;
  }

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    router.refresh();
  };

  if (variant === 'mobile') {
    return user ? (
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted hover:text-ink transition-colors py-1"
      >
        <LogOut size={15} /> Log Out
      </button>
    ) : (
      <div className="flex flex-col gap-3">
        <Link href="/login" className="btn-outline w-full !py-3 justify-center text-xs uppercase tracking-wider">Log In</Link>
        <Link href="/signup" className="btn-primary w-full !py-3 justify-center text-xs uppercase tracking-wider">Sign Up Free</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className="text-[11px] font-bold uppercase tracking-wider text-muted hover:text-ink transition-colors px-2">
          Log In
        </Link>
        <Link href="/signup" className="btn-primary !px-4 !py-2 !rounded-full !text-[11px] uppercase tracking-wider">
          Sign Up
        </Link>
      </div>
    );
  }

  const initial = (user.email || 'U').charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-border hover:border-ink/20 transition-all bg-paper"
      >
        <span className="w-7 h-7 rounded-full bg-ink text-paper flex items-center justify-center text-[11px] font-black">
          {initial}
        </span>
        <ChevronDown size={12} className="text-muted" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 card p-2 shadow-xl z-50 bg-paper">
          <div className="px-3 py-2.5 border-b border-border/60 mb-1">
            <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-0.5">Signed in as</p>
            <p className="text-xs font-black text-ink truncate">{user.email}</p>
          </div>
          <Link
            href="/voice-clone"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-ink hover:bg-surface-2 transition-colors"
          >
            <UserIcon size={14} /> My Voice Clones
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-muted hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      )}
    </div>
  );
}
