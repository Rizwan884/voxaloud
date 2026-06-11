"use client";

import { useState, useEffect } from 'react';
import { X, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Check localStorage to see if user already subscribed/dismissed
    const hasInteracted = 
      localStorage.getItem('exit_intent_subscribed') === 'true' || 
      localStorage.getItem('exit_intent_dismissed') === 'true';

    if (hasInteracted) return;

    // Desktop: Track mouse exit (moving up out of viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 15) {
        setIsOpen(true);
      }
    };

    // Mobile: Trigger timer after 45 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 45000);

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
        }, 2500);
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to subscribe.');
      }
    } catch (err: unknown) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-ink/30 backdrop-blur-sm" 
          onClick={handleDismiss} 
        />
        
        {/* Content Card */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.95, opacity: 0 }} 
          className="card bg-paper w-full max-w-md relative z-10 p-8 shadow-2xl rounded-[2.5rem] border border-border"
        >
          {status !== 'loading' && (
            <button 
              onClick={handleDismiss} 
              className="absolute top-5 right-5 text-muted hover:text-ink p-1 rounded-full hover:bg-surface-2 transition-all"
            >
              <X size={18} />
            </button>
          )}

          {status === 'success' ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-black font-display text-ink uppercase tracking-tight">You&apos;re Subscribed!</h3>
              <p className="text-sm text-muted">We will keep you updated when we release new neural voices.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center">
                <Mail size={22} className="text-ink" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-display text-ink uppercase tracking-tight leading-tight">
                  Get notified when we <br /><span className="text-muted">add new voices.</span>
                </h3>
                <p className="text-sm text-muted font-medium">
                  Stay updated on our latest high-fidelity neural model releases and featured speakers.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="field !py-3.5 !px-4 !rounded-xl"
                  disabled={status === 'loading'}
                />

                {status === 'error' && (
                  <p className="text-xs font-semibold text-red-500">{errorMsg}</p>
                )}

                <button 
                  type="submit" 
                  className="btn-primary w-full !py-3.5 shadow-lg shadow-ink/10 hover:shadow-xl transition-all"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    'Notify Me'
                  )}
                </button>
              </form>

              <p className="text-[10px] text-center text-muted/60 font-semibold uppercase tracking-wider">
                No spam. Unsubscribe at any time.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
