import { ShieldCheck, Zap, Mic2, Languages, UserCheck, Sparkles, Sliders, AudioWaveform, Check } from 'lucide-react';
import Link from 'next/link';

export default function Features() {
  return (
    <section className="space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="badge-accent">
          Core Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink tracking-tight">
          Engineered for creators who demand studio quality.
        </h2>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          State-of-the-art neural acoustic models deliver expressive, artifact-free speech synthesis and instant voice cloning.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
        
        {/* Bento 1: Zero-Shot Voice Cloning (Wide) */}
        <div className="md:col-span-8 card p-7 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          <div className="space-y-3 max-w-lg">
            <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center">
              <Mic2 size={20} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-ink">
              Zero-Shot Voice Cloning in 15 Seconds
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Upload or record a clean 15-second voice sample. Our neural weights capture your timbre, cadence, and vocal quirks without requiring hours of studio training data.
            </p>
          </div>

          {/* Interactive preview mock */}
          <div className="p-4 rounded-2xl bg-surface-2 border border-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-xs">
                <p className="font-semibold text-ink">Zero-Shot Neural Pipeline</p>
                <p className="text-[11px] text-muted">15.0s audio input &rarr; Model compiled in 2.4s</p>
              </div>
            </div>
            <Link href="/voice-clone" className="btn-accent !px-3 !py-1.5 !text-xs !rounded-lg shrink-0">
              Try Clone
            </Link>
          </div>
        </div>

        {/* Bento 2: Commercial Rights */}
        <div className="md:col-span-4 card p-7 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-display text-ink">
              Commercial License Included
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Full copyright and monetization rights for YouTube, podcasts, corporate ads, audiobooks, and client projects without royalties.
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
            <Check size={14} className="stroke-[2.5]" />
            <span>100% Monetization Safe</span>
          </div>
        </div>

        {/* Bento 3: 75+ Languages Cloud */}
        <div className="md:col-span-4 card p-7 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center">
            <Languages size={20} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-display text-ink">
              75+ Global Languages & Accents
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              From English, Spanish, and French to Hindi, Arabic, Japanese, and Urdu with authentic regional inflection.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['EN', 'ES', 'HI', 'AR', 'FR', 'DE', 'JA', 'ZH', 'PT', '+65 more'].map((l) => (
              <span key={l} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-surface-2 text-ink border border-border">
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Bento 4: 44.1kHz Studio Quality */}
        <div className="md:col-span-4 card p-7 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="w-10 h-10 rounded-xl bg-surface-2 text-ink flex items-center justify-center">
            <AudioWaveform size={20} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-display text-ink">
              44.1kHz Studio Fidelity
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Crystal-clear 44.1kHz MP3 exports. Filter out unwanted artifacts and background hiss for broadcast-ready audio.
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-ink flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>Broadcast-Ready Output</span>
          </div>
        </div>

        {/* Bento 5: No Login & Privacy */}
        <div className="md:col-span-4 card p-7 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="w-10 h-10 rounded-xl bg-surface-2 text-ink flex items-center justify-center">
            <UserCheck size={20} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-display text-ink">
              No Login Barrier
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Generate speech right on the homepage without signup walls, mandatory credit cards, or hidden watermark lockouts.
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-muted">
            <span>Instant Anonymous Access</span>
          </div>
        </div>

      </div>
    </section>
  );
}
