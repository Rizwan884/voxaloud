"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, ArrowRight, CheckCircle2, Mic2 } from 'lucide-react';
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
      <div className="card p-8 text-center space-y-4 max-w-sm w-full">
        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={28} className="text-green-600" />
        </div>
        <h2 className="text-xl font-black font-display text-ink uppercase tracking-tight">Check your email</h2>
        <p className="text-sm text-muted leading-relaxed">
          We sent a confirmation link to <strong className="text-ink">{email}</strong>. Click it to activate your account, then come back and log in.
        </p>
        <Link href="/login" className="btn-outline w-full !py-3 justify-center text-xs uppercase tracking-wider">
          Back to Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="card p-8 max-w-sm w-full space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-ink flex items-center justify-center mx-auto shadow-lg shadow-ink/10">
          <Mic2 size={20} className="text-paper" />
        </div>
        <h1 className="text-xl font-black font-display text-ink uppercase tracking-tight">
          {isSignup ? 'Create Your Account' : 'Welcome Back'}
        </h1>
        <p className="text-xs text-muted font-medium">
          {isSignup ? 'Sign up free to start cloning voices.' : 'Log in to access your cloned voices.'}
        </p>
      </div>

      {error && (
        <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field !pl-10 !py-3"
            disabled={loading}
          />
        </div>
        <div className="relative">
          <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <input
            type="password"
            required
            minLength={6}
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field !pl-10 !py-3"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 uppercase tracking-wider text-xs font-black">
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <span className="flex items-center gap-2">{isSignup ? 'Create Account' : 'Log In'} <ArrowRight size={14} /></span>
          )}
        </button>
      </form>

      <p className="text-[11px] text-center text-muted font-medium">
        {isSignup ? (
          <>Already have an account? <Link href="/login" className="text-ink font-bold underline underline-offset-2">Log in</Link></>
        ) : (
          <>New here? <Link href="/signup" className="text-ink font-bold underline underline-offset-2">Create a free account</Link></>
        )}
      </p>
    </div>
  );
}
