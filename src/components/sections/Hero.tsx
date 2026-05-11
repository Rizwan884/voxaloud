import AdBanner from '@/components/AdBanner';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <header className="space-y-12 pb-8">
      {/* Ad Section */}
      <div className="space-y-4">
        <div className="hidden md:block">
          <AdBanner type="728x90" />
        </div>
        <div className="md:hidden">
          <AdBanner type="320x50" />
        </div>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 text-[10px] font-black uppercase tracking-[0.15em] text-ink animate-fade-in">
          <Sparkles size={12} className="text-muted" />
          <span>New: Neural Model v2.0 Released</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-8xl font-black font-display text-ink uppercase tracking-tight leading-[0.95]">
          Voices That <br /> 
          <span className="text-muted">Feel Human.</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted/80 max-w-2xl font-medium leading-relaxed">
          The industry standard for professional neural speech. 
          Unlimited generations in 75+ languages. <span className="text-ink underline decoration-ink/10 underline-offset-4">100% Free for Commercial Use.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="#studio" className="btn-primary w-full sm:w-auto px-10 py-5 text-base rounded-2xl shadow-2xl shadow-ink/10 hover:scale-[1.02] transition-all">
            Start Generating
            <ArrowRight size={20} />
          </Link>
          <Link href="/ai-voice-generator" className="btn-outline w-full sm:w-auto px-10 py-5 text-base rounded-2xl">
            Explore 500+ Voices
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center gap-6 pt-2 text-[10px] font-black uppercase tracking-widest text-muted/40">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} />
            <span>Commercial License</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-border" />
          <span>No Login Required</span>
        </div>
      </div>
    </header>
  );
}
