"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { getBrowserSupabase } from '@/lib/supabaseBrowser';

interface Props {
  mode: 'login' | 'signup';
}

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const supabase = getBrowserSupabase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  const isSignup = mode === 'signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!supabase) {
      setError('Sign-in is not configured yet. Please check back soon.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (isSignup) {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;

        if (!data.session) {
          setCheckEmail(true);
        } else {
          router.push('/voice-clone');
          router.refresh();
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        router.push('/voice-clone');
        router.refresh();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (checkEmail) {
    return (
      <div className="card p-8 text-center space-y-4 max-w-md w-full bg-surface shadow-xl">
        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle2 size={28} className="text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold font-display text-ink tracking-tight">Check your email</h2>
        <p className="text-sm text-muted leading-relaxed">
          We sent a verification link to <strong className="text-ink">{email}</strong>. Click the link to activate your account, then return to sign in.
        </p>
        <Link href="/login" className="btn-outline w-full !py-2.5 justify-center text-xs">
          Back to Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="card p-8 sm:p-10 max-w-md w-full space-y-6 bg-surface shadow-xl border-border/80">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center mx-auto">
          <Sparkles size={18} />
        </div>
        <h1 className="text-2xl font-bold font-display text-ink tracking-tight">
          {isSignup ? 'Create your free account' : 'Welcome back'}
        </h1>
        <p className="text-xs text-muted">
          {isSignup 
            ? 'Sign up to access instant voice cloning and save your audio history.' 
            : 'Sign in to access your cloned voices and studio projects.'}
        </p>
      </div>

      {error && (
        <p className="text-xs font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2.5 text-center">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-ink-2">Email address</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field !pl-10 !py-2.5 !text-xs"
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-ink-2">Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="password"
              required
              minLength={6}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field !pl-10 !py-2.5 !text-xs"
              disabled={loading}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="btn-accent w-full !py-3 !text-xs !font-semibold shadow-md shadow-accent/20 cursor-pointer"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              {isSignup ? 'Create Free Account' : 'Sign In'} 
              <ArrowRight size={14} />
            </span>
          )}
        </button>
      </form>

      <p className="text-xs text-center text-muted font-normal">
        {isSignup ? (
          <>Already have an account? <Link href="/login" className="text-accent font-semibold hover:underline">Log in</Link></>
        ) : (
          <>New to Fish Audio? <Link href="/signup" className="text-accent font-semibold hover:underline">Create a free account</Link></>
        )}
      </p>
    </div>
  );
}
