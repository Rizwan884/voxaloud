import { Sparkles, ShieldCheck, Users } from 'lucide-react';

export default function Hero() {
  return (
    <div className="space-y-6">
      {/* Release Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ink/5 border border-ink/10 text-[9px] font-black uppercase tracking-[0.15em] text-ink w-fit">
        <Sparkles size={11} className="text-muted" />
        <span>Neural Model v2.0 Released</span>
      </div>

      {/* Main Heading */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display text-ink uppercase tracking-tight leading-[0.95] text-left">
          Voices That <br /> 
          <span className="text-muted">Feel Human.</span>
        </h1>

        {/* Trust Badge repositioned right beneath main headline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 text-[10px] font-black uppercase tracking-widest w-fit">
          <Users size={12} />
          Trusted by 50,000+ Creators
        </div>

        <h2 className="text-lg md:text-xl font-black font-display text-ink uppercase tracking-tight text-left">
          The #1 Free AI Text to Speech Generator — 500+ Natural Voices, 75+ Languages
        </h2>
      </div>

      {/* Subtext description */}
      <p className="text-sm md:text-base text-muted/80 max-w-xl font-medium leading-relaxed text-left">
        Experience the most advanced natural text to speech platform. Our realistic voice generator 
        delivers high-fidelity human-like voice AI with absolute ease. Use our AI voice online free 
        with text to speech, no signup required. <span className="text-ink underline decoration-ink/10 underline-offset-4">100% Free for Commercial Use.</span>
      </p>

      {/* Trust Indicators */}
      <div className="flex items-center gap-6 pt-2 text-[9px] font-black uppercase tracking-widest text-muted/40">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={14} />
          <span>Commercial License</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-border" />
        <span>No Login Required</span>
      </div>
    </div>
  );
}
