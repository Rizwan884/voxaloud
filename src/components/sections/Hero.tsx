import Link from 'next/link';
import { Sparkles, ShieldCheck, Zap, ArrowRight, Play } from 'lucide-react';
import AppBadges from '@/components/AppBadges';

export default function Hero() {
  return (
    <div className="space-y-6 text-left">
      
      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold w-fit shadow-xs">
        <Sparkles size={13} className="text-accent" />
        <span>Next-Gen Neural TTS &bull; Zero-Shot Voice Cloning</span>
      </div>

      {/* Main Heading */}
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.1]">
          Clone any voice <br />
          <span className="text-muted font-normal">in 15 seconds.</span>
        </h1>

        <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed max-w-xl">
          Free AI voice cloning and natural text-to-speech studio. Record a 15-second sample to create a private voice clone, or select from <strong className="font-semibold text-ink">500+ studio voices</strong> across <strong className="font-semibold text-ink">75+ languages</strong>.
        </p>
      </div>

      {/* Quick Benefit Tags */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
          <ShieldCheck size={13} className="text-emerald-600" />
          Full Commercial Rights
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
          <Zap size={13} className="text-accent" />
          No Signup Required
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          44.1kHz Studio Master
        </span>
      </div>

      {/* Hero CTAs */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link 
          href="/voice-clone" 
          className="btn-accent !px-6 !py-3 !text-sm !font-semibold group"
        >
          <span>Clone Your Voice Now</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <a 
          href="#voice-showcase" 
          className="btn-outline !px-5 !py-3 !text-sm group"
        >
          <Play size={13} className="text-muted group-hover:text-ink transition-colors" />
          <span>Listen to Samples</span>
        </a>
      </div>

      {/* Mobile App Download Teaser */}
      <div className="pt-2">
        <AppBadges className="justify-start" />
      </div>

    </div>
  );
}
