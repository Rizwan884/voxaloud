"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight, Loader2, CheckCircle2, ShieldCheck, Sparkles, Globe } from 'lucide-react';
import AppBadges from './AppBadges';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer_form' }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const navGroups = [
    {
      title: 'Product',
      links: [
        { label: 'Voice Cloning Studio', href: '/voice-clone', badge: 'New' },
        { label: 'AI Voice Generator', href: '/ai-voice-generator' },
        { label: 'Free Text to Speech', href: '/free-text-to-speech' },
        { label: 'Text to Voice Converter', href: '/text-to-voice' },
        { label: '75+ Languages Library', href: '/languages' },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'YouTube & Video Creators', href: '/commercial-use' },
        { label: 'Audiobooks & Podcasts', href: '/text-to-voice' },
        { label: 'Commercial & Advertising', href: '/commercial-use' },
        { label: 'Game & Indie Dev Audio', href: '/voice-clone' },
        { label: 'Multilingual Dubbing', href: '/languages' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog & Tutorials', href: '/blog' },
        { label: 'Frequently Asked Questions', href: '/faq' },
        { label: 'How to Clone a Voice', href: '/blog/how-to-clone-your-voice-with-ai' },
        { label: 'Best Free TTS (2026)', href: '/blog/best-free-text-to-speech-2026' },
      ]
    },
    {
      title: 'Company & Legal',
      links: [
        { label: 'About Fish Audio', href: '/about' },
        { label: 'Contact Support', href: '/contact' },
        { label: 'Commercial License', href: '/commercial-use' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ]
    }
  ];

  return (
    <footer className="bg-surface border-t border-border mt-auto pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-12 pb-14 border-b border-border/70">
          
          {/* Brand & Mission Column */}
          <div className="col-span-2 md:col-span-6 lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-sm border border-border">
                <Image 
                  src="/branding/app-icon.png" 
                  alt="Fish Audio Online Logo" 
                  fill
                  sizes="32px"
                  className="object-contain" 
                />
              </div>
              <span className="text-lg font-bold font-display text-ink">Fish Audio Online</span>
            </Link>

            <p className="text-muted text-sm leading-relaxed font-normal max-w-sm">
              The high-fidelity neural voice cloning and text-to-speech platform. Empowering creators with natural, emotive AI narration in 75+ languages.
            </p>

            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-medium text-ink-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Neural Synthesis Engine: 99.98% Online</span>
            </div>

            {/* Social & Contact */}
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://twitter.com/fishaudio" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center text-muted hover:text-ink hover:bg-surface-3 transition-colors border border-border"
                aria-label="Follow Fish Audio on Twitter"
              >
                <Globe size={15} />
              </a>
              <a 
                href="mailto:contact@fishaudio.online" 
                className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center text-muted hover:text-ink hover:bg-surface-3 transition-colors border border-border"
                aria-label="Email Fish Audio Support"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          {navGroups.map((group) => (
            <div key={group.title} className="col-span-1 md:col-span-3 lg:col-span-2 space-y-4">
              <h3 className="text-xs font-semibold text-ink uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-xs text-muted hover:text-ink transition-colors font-normal inline-flex items-center gap-1.5"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="bg-accent-light text-accent-text text-[9px] font-semibold px-1.5 py-0.2 rounded-full border border-accent-subtle">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Mid-Row: App CTA & Newsletter */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-border/70">
          
          {/* App download teaser */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-2 border border-border">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                <Sparkles size={13} className="text-accent" />
                <span>Fish Audio for Mobile</span>
              </div>
              <p className="text-xs text-muted">Clone voices and generate audio on iOS & Android.</p>
            </div>
            <AppBadges size="compact" className="shrink-0" />
          </div>

          {/* Newsletter / Updates Form */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xs">
              <h4 className="text-xs font-semibold text-ink uppercase tracking-wider">Stay Updated</h4>
              <p className="text-xs text-muted">Get notified when new neural voice models are released.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto flex-1 sm:max-w-xs">
              <input 
                type="email" 
                required
                placeholder="Enter email..." 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="field !py-2 !px-3.5 !rounded-xl !text-xs flex-1"
                disabled={status === 'loading'}
              />
              <button 
                type="submit" 
                className="btn-primary !py-2 !px-4 !rounded-xl !text-xs shrink-0"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : status === 'success' ? (
                  <CheckCircle2 size={13} className="text-emerald-400" />
                ) : (
                  <ArrowRight size={13} />
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Metadata & Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>100% Commercial Rights Included on All Generations.</span>
          </div>
          <p>
            &copy; {currentYear} Fish Audio Online. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
