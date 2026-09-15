"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Globe, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
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
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const sections = [
    {
      title: 'Product',
      links: [
        { label: 'Studio', href: '/' },
        { label: 'Voice Cloning', href: '/voice-clone' },
        { label: 'AI Voice Generator', href: '/ai-voice-generator' },
        { label: 'Free Text to Speech', href: '/free-text-to-speech' },
        { label: 'Text to Voice', href: '/text-to-voice' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Blog', href: '/blog' },
        { label: 'FAQ', href: '/faq' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Commercial Use', href: '/commercial-use' },
      ]
    }
  ];

  return (
    <footer className="bg-paper border-t border-border pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Image 
                src="/branding/app-icon.png" 
                alt="Fish Audio Online — free AI text to speech generator with natural voices" 
                width={40} 
                height={40} 
                className="object-contain" 
              />
              <span className="text-xl font-bold font-display text-ink">Fish Audio Online</span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-sm font-medium">
              The world&apos;s most advanced neural text-to-speech platform. Empowering creators with natural, emotive AI voices for every project.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://twitter.com/fishaudio" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted hover:text-ink hover:bg-paper transition-all border border-border shadow-sm group">
                <Globe size={16} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="mailto:contact@fishaudio.online" className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted hover:text-ink hover:bg-paper transition-all border border-border shadow-sm group">
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-ink">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted hover:text-ink transition-colors font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Big, prominent mobile app CTA — shown on every page via this footer */}
        <div className="rounded-3xl bg-ink text-paper p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-4">
          <div className="text-center md:text-left space-y-1.5">
            <h4 className="text-xl md:text-2xl font-black font-display uppercase tracking-tight">Take Fish Audio Anywhere</h4>
            <p className="text-sm text-paper/70 font-medium">Clone your voice and generate speech on the go — download the free app.</p>
          </div>
          <AppBadges size="large" onDark className="justify-center" />
        </div>

        <div className="border-t border-border/60 pt-8 pb-4">
          <p className="text-xs text-muted/70 leading-relaxed font-medium">
            Fish Audio Online is the world&apos;s leading free text to speech platform.
            Convert text to speech online using 500+ AI voices in 75+ languages. 
            Our natural voice generator offers realistic AI narration, voice cloning, 
            and commercial-use audio — all completely free. No registration required.
          </p>
        </div>

        {/* Inline Email Capture Form */}
        <div className="border-t border-border/60 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-md">
            <h4 className="text-sm font-black uppercase tracking-wider text-ink">Subscribe to updates</h4>
            <p className="text-xs text-muted font-medium">Get notified when we release new voice models and features.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <div className="relative flex-1">
              <input 
                type="email" 
                required
                placeholder="Your email address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="field !py-3 !px-4 !rounded-xl text-xs"
                disabled={status === 'loading'}
              />
              {status === 'success' && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase tracking-wider bg-paper pl-2">
                  <CheckCircle2 size={12} />
                  Subscribed!
                </div>
              )}
            </div>
            <button 
              type="submit" 
              className="btn-primary !px-5 !py-3 !rounded-xl text-xs uppercase tracking-wider shrink-0 flex items-center justify-center gap-2"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-medium">
            &copy; {currentYear} Fish Audio Online. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <Link href="/privacy" className="text-[10px] uppercase tracking-wider font-bold text-muted hover:text-ink">Privacy</Link>
             <Link href="/terms" className="text-[10px] uppercase tracking-wider font-bold text-muted hover:text-ink">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
