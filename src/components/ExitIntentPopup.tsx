"use client";

import { useState, useEffect } from 'react';
import { X, Mail, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Check localStorage
    const hasInteracted = 
      localStorage.getItem('exit_intent_subscribed') === 'true' || 
      localStorage.getItem('exit_intent_dismissed') === 'true';

    if (hasInteracted) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 15) {
        setIsOpen(true);
      }
    };

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000); // 60s delay

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('exit_intent_dismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'exit_intent' }),
      });

      if (res.ok) {
        setStatus('success');
        localStorage.setItem('exit_intent_subscribed', 'true');
        setTimeout(() => {
          setIsOpen(false);
        }, 2200);
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to subscribe.');
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-ink/40 backdrop-blur-sm" 
          onClick={handleDismiss} 
        />
        
        {/* Card */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.95, opacity: 0 }} 
          className="card bg-surface w-full max-w-md relative z-10 p-8 shadow-2xl rounded-3xl border border-border"
        >
          {status !== 'loading' && (
            <button 
              onClick={handleDismiss} 
              className="absolute top-5 right-5 text-muted hover:text-ink p-1.5 rounded-full hover:bg-surface-2 transition-all cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          )}

          {status === 'success' ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 size={28} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold font-display text-ink tracking-tight">You&apos;re Subscribed!</h3>
              <p className="text-xs text-muted">We&apos;ll notify you when new neural models are released.</p>
            </div>
          ) : (
            <div className="space-y-5 text-left">
              <div className="w-11 h-11 rounded-2xl bg-accent-light text-accent flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              
              <div className="space-y-1.5">
                <h3 className="text-2xl font-bold font-display text-ink tracking-tight leading-snug">
                  Get notified when we <br /><span className="text-muted font-normal">release new neural voices.</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Stay updated on our latest high-fidelity voice models, emotion controls, and creator tutorials.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="field !py-2.5 !px-3.5 !text-xs !rounded-xl"
                  disabled={status === 'loading'}
                />

                {status === 'error' && (
                  <p className="text-xs font-medium text-rose-600">{errorMsg}</p>
                )}

                <button 
                  type="submit" 
                  className="btn-accent w-full !py-3 !text-xs !font-semibold shadow-md shadow-accent/20 cursor-pointer"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={15} className="animate-spin" />
                      Subscribing...
                    </span>
                  ) : (
                    'Get Early Access & Updates'
                  )}
                </button>
              </form>

              <p className="text-[10px] text-center text-muted font-normal">
                Zero spam. Unsubscribe at any time with a single click.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
