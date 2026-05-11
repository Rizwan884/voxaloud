'use client';

import { Play, Pause, Quote, Star, Users, CheckCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import Link from 'next/link';

const SAMPLES = [
  { name: 'Adam', style: 'Professional Narrator', audio: 'https://cdn.fish.audio/samples/adam.mp3' },
  { name: 'Bella', style: 'Soft Storytelling', audio: 'https://cdn.fish.audio/samples/bella.mp3' },
  { name: 'Charlie', style: 'Energetic Ad Voice', audio: 'https://cdn.fish.audio/samples/charlie.mp3' },
];

const TESTIMONIALS = [
  { 
    name: 'Sarah J.', role: 'YouTube Creator', 
    content: 'Fish Audio has cut my production time in half. The voices sound so natural that my audience actually thinks I hired a pro narrator.' 
  },
  { 
    name: 'Mark T.', role: 'App Developer', 
    content: 'The 75+ language support is incredible. We localized our entire tutorial series in a single afternoon. Pure magic.' 
  },
];

export default function ConversionPack() {
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (url: string) => {
    if (playing === url) {
      audioRef.current?.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
        setPlaying(url);
      }
    }
  };

  return (
    <div className="space-y-32">
      <audio ref={audioRef} onEnded={() => setPlaying(null)} />

      {/* Voice Showcase */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black font-display text-ink uppercase tracking-tight">Hear the <span className="text-muted">Difference.</span></h2>
          <p className="text-muted/80 font-medium max-w-xl mx-auto uppercase text-[10px] tracking-[0.2em]">Crystal clear, human-like neural synthesis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLES.map((sample) => (
            <div key={sample.name} className="card-surface p-6 flex items-center justify-between group hover:border-ink/20 transition-all">
              <div className="space-y-1">
                <p className="text-sm font-black text-ink uppercase tracking-tight">{sample.name}</p>
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{sample.style}</p>
              </div>
              <button 
                onClick={() => togglePlay(sample.audio)}
                className="w-10 h-10 rounded-full bg-ink flex items-center justify-center text-paper shadow-lg shadow-ink/10 group-hover:scale-110 transition-all"
              >
                {playing === sample.audio ? <Pause size={16} fill="currentColor" /> : <Play size={16} className="ml-0.5" fill="currentColor" />}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 text-[10px] font-black uppercase tracking-widest">
            <Users size={12} />
            Trusted by 50,000+ Creators
          </div>
          <h2 className="text-3xl md:text-6xl font-black font-display text-ink uppercase tracking-tight leading-none">
            Built for <br /> <span className="text-muted">High-Stakes</span> Content.
          </h2>
          <p className="text-lg text-muted/80 font-medium leading-relaxed">
            From viral TikToks to high-end corporate training, our voices deliver the emotional resonance your audience demands.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-bold text-ink">
              <CheckCircle size={18} className="text-green-500" />
              100% Commercial Usage Rights
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-ink">
              <CheckCircle size={18} className="text-green-500" />
              High-Fidelity Neural Output (44kHz)
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card p-8 space-y-6 relative">
              <Quote className="absolute top-6 right-6 text-ink/5" size={48} />
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-base text-ink/80 font-medium leading-relaxed italic">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center font-black text-xs uppercase text-muted">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-xs font-black text-ink uppercase tracking-tight">{t.name}</p>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="bg-ink rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 space-y-4">
          <h2 className="text-4xl md:text-7xl font-black font-display text-paper uppercase tracking-tight leading-none">
            Ready to Speak <br /> <span className="text-muted/60">to the World?</span>
          </h2>
          <p className="text-paper/60 text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Join thousands of creators who use Fish Audio Online to bring their scripts to life. No login, no limits, just pure vocal excellence.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/#studio" className="btn-primary !bg-paper !text-ink !px-12 !py-5 !text-lg !rounded-2xl shadow-2xl hover:scale-105 transition-all">
            Generate Voice Free
          </Link>
          <Link href="/languages" className="btn-outline !border-paper/20 !text-paper !px-12 !py-5 !text-lg !rounded-2xl hover:bg-paper/10">
            View All Languages
          </Link>
        </div>
      </section>
    </div>
  );
}
