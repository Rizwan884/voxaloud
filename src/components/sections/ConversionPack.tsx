"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Play, Pause, Mic2, Sparkles, Search, Globe, Filter, Type, Download } from 'lucide-react';

interface FeaturedSample {
  id: string;
  name: string;
  style: 'Narrator' | 'Conversational' | 'Ads' | 'Character';
  gender: 'Male' | 'Female';
  language: 'English' | 'Multilingual';
  flag: string;
  audio: string;
}

const FEATURED_DEMOS: FeaturedSample[] = [
  { id: 'voice-107', name: 'James', style: 'Narrator', gender: 'Male', language: 'Multilingual', flag: '🇺🇸', audio: '/samples/james.mp3' },
  { id: 'voice-110', name: 'Mary', style: 'Conversational', gender: 'Female', language: 'Multilingual', flag: '🇺🇸', audio: '/samples/mary.mp3' },
  { id: 'voice-108', name: 'Liam', style: 'Ads', gender: 'Male', language: 'English', flag: '🇺🇸', audio: '/samples/liam.mp3' },
  { id: 'voice-106', name: 'Emma', style: 'Character', gender: 'Female', language: 'English', flag: '🇺🇸', audio: '/samples/emma.mp3' },
  { id: 'voice-115', name: 'Patricia', style: 'Narrator', gender: 'Female', language: 'Multilingual', flag: '🇺🇸', audio: '/samples/patricia.mp3' },
  { id: 'voice-112', name: 'Michael', style: 'Conversational', gender: 'Male', language: 'Multilingual', flag: '🇺🇸', audio: '/samples/michael.mp3' },
  { id: 'voice-84', name: 'Harry', style: 'Ads', gender: 'Male', language: 'English', flag: '🇬🇧', audio: '/samples/harry.mp3' },
  { id: 'voice-82', name: 'Poppy', style: 'Character', gender: 'Female', language: 'English', flag: '🇬🇧', audio: '/samples/poppy.mp3' },
];

function CountUp({ end, suffix = '', duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const current = Math.min(Math.floor((progress / duration) * end), end);
      setCount(current);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function ConversionPack() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Showcase Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<'All' | 'Male' | 'Female'>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<'All' | 'English' | 'Multilingual'>('All');
  const [selectedStyle, setSelectedStyle] = useState<'All' | 'Narrator' | 'Conversational' | 'Ads' | 'Character'>('All');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync player updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => { setPlaying(null); setCurrentTime(0); };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

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

  const handleTryVoice = (voiceId: string) => {
    // Dispatch cross-component event to fill StudioClient state
    window.dispatchEvent(new CustomEvent('fishaudio_try_voice', { detail: { id: voiceId } }));
  };

  // Filter showcased voices dynamically in JS
  const filteredSamples = useMemo(() => {
    return FEATURED_DEMOS.filter(sample => {
      const matchSearch = sample.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sample.style.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchGender = selectedGender === 'All' || sample.gender === selectedGender;
      const matchLang = selectedLanguage === 'All' || sample.language === selectedLanguage;
      const matchStyle = selectedStyle === 'All' || sample.style === selectedStyle;

      return matchSearch && matchGender && matchLang && matchStyle;
    });
  }, [searchTerm, selectedGender, selectedLanguage, selectedStyle]);

  return (
    <div className="space-y-20">
      <audio ref={audioRef} />

      {/* How it works Section - 3 Steps below Hero */}
      <section className="space-y-10 pt-4 border-t border-border/40">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Workflow</span>
          <h2 className="text-2xl md:text-4xl font-black font-display text-ink uppercase tracking-tight">How it works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="card-surface p-6 flex flex-col items-center text-center space-y-4 hover:border-ink/10 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-ink/5 border border-border flex items-center justify-center text-ink shrink-0">
              <Type size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-muted">Step 1</span>
              <h4 className="text-base font-bold text-ink uppercase tracking-tight">Input Script</h4>
              <p className="text-xs text-muted/80 leading-relaxed font-medium">Type or paste your content in the editor panel above.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card-surface p-6 flex flex-col items-center text-center space-y-4 hover:border-ink/10 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-ink/5 border border-border flex items-center justify-center text-ink shrink-0">
              <Mic2 size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-muted">Step 2</span>
              <h4 className="text-base font-bold text-ink uppercase tracking-tight">Choose AI Voice</h4>
              <p className="text-xs text-muted/80 leading-relaxed font-medium">Browse our premium library and select a speaker profile.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card-surface p-6 flex flex-col items-center text-center space-y-4 hover:border-ink/10 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-ink/5 border border-border flex items-center justify-center text-ink shrink-0">
              <Download size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-muted">Step 3</span>
              <h4 className="text-base font-bold text-ink uppercase tracking-tight">Download & Use</h4>
              <p className="text-xs text-muted/80 leading-relaxed font-medium">Click generate, review the audio player, and export your MP3.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Showcase with player track and try voice trigger */}
      <section className="space-y-10" id="hear-difference">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black font-display text-ink uppercase tracking-tight">
            Hear the <span className="text-muted">Difference.</span>
          </h2>
          <p className="text-muted/80 font-medium max-w-xl mx-auto uppercase text-[10px] tracking-[0.2em]">
            Crystal clear, human-like neural synthesis samples
          </p>
        </div>

        {/* Dynamic Filters for Showcase */}
        <div className="card-surface p-6 space-y-4 max-w-4xl mx-auto">
          <div className="relative group">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-ink transition-colors pointer-events-none" />
            <input
              className="field !pl-10 !py-3 !text-xs !rounded-xl !bg-paper shadow-inner-sm border-border/40"
              placeholder="Search showcased voices..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="relative">
              <Globe size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <select 
                className="field !pl-8 !py-2.5 !text-[10px] !font-black !uppercase !tracking-wider !bg-paper border-border/40"
                value={selectedLanguage}
                onChange={e => setSelectedLanguage(e.target.value as 'All' | 'English' | 'Multilingual')}
              >
                <option value="All">Languages</option>
                <option value="English">English</option>
                <option value="Multilingual">Multilingual</option>
              </select>
            </div>

            <div className="relative">
              <Filter size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <select 
                className="field !pl-8 !py-2.5 !text-[10px] !font-black !uppercase !tracking-wider !bg-paper border-border/40"
                value={selectedGender}
                onChange={e => setSelectedGender(e.target.value as 'All' | 'Male' | 'Female')}
              >
                <option value="All">Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="relative">
              <Sparkles size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <select 
                className="field !pl-8 !py-2.5 !text-[10px] !font-black !uppercase !tracking-wider !bg-paper border-border/40"
                value={selectedStyle}
                onChange={e => setSelectedStyle(e.target.value as 'All' | 'Narrator' | 'Conversational' | 'Ads' | 'Character')}
              >
                <option value="All">Styles</option>
                <option value="Narrator">Narrator</option>
                <option value="Conversational">Conversational</option>
                <option value="Ads">Ads</option>
                <option value="Character">Character</option>
              </select>
            </div>
          </div>
        </div>

        {/* Voices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredSamples.map((sample) => {
            const isCurrentPlaying = playing === sample.audio;
            const progressPct = isCurrentPlaying && duration ? (currentTime / duration) * 100 : 0;

            return (
              <div 
                key={sample.id} 
                className="card-surface p-6 flex flex-col justify-between group hover:border-ink/20 transition-all gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1 min-w-0 pr-4">
                    <p className="text-sm font-black text-ink uppercase tracking-tight truncate flex items-center gap-1.5">
                      <span className="text-base">{sample.flag}</span>
                      {sample.name}
                    </p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest truncate">
                      {sample.style} · {sample.language}
                    </p>
                  </div>
                  
                  {/* HTML5 play controls */}
                  <button 
                    onClick={() => togglePlay(sample.audio)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md transition-all group-hover:scale-105 active:scale-95 ${isCurrentPlaying ? 'bg-ink text-paper' : 'bg-surface hover:bg-surface-2 text-ink border border-border'}`}
                  >
                    {isCurrentPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} className="ml-0.5" fill="currentColor" />}
                  </button>
                </div>

                {/* Working progress timeline inside voice card */}
                {isCurrentPlaying && (
                  <div className="space-y-1">
                    <div className="w-full bg-surface-2 h-1 rounded-full overflow-hidden">
                      <div className="bg-ink h-full rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-muted">
                      <span>{Math.floor(currentTime)}s</span>
                      <span>{Math.floor(duration)}s</span>
                    </div>
                  </div>
                )}

                {/* Try voice action */}
                <button
                  onClick={() => handleTryVoice(sample.id)}
                  className="btn-outline !py-2 !px-3 !rounded-xl !text-[10px] uppercase tracking-wider text-center font-bold"
                >
                  Try this voice
                </button>
              </div>
            );
          })}
        </div>

        {filteredSamples.length === 0 && (
          <div className="text-center py-10 font-bold text-muted uppercase text-xs">
            No showcase samples match your filters.
          </div>
        )}
      </section>

      {/* Stats bar with count-ups on scroll-into-view */}
      <section className="bg-ink rounded-[2rem] p-8 md:p-12 text-paper overflow-hidden relative shadow-2xl max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-2xl md:text-4xl font-black font-display">
              <CountUp end={500} suffix="+" />
            </div>
            <div className="text-[10px] font-black uppercase tracking-wider text-paper/40">Premium Voices</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-4xl font-black font-display">
              <CountUp end={75} suffix="+" />
            </div>
            <div className="text-[10px] font-black uppercase tracking-wider text-paper/40">Supported Languages</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-4xl font-black font-display">
              <CountUp end={10000} />
            </div>
            <div className="text-[10px] font-black uppercase tracking-wider text-paper/40">Character Limit</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-4xl font-black font-display">
              &lt; <CountUp end={2} suffix="s" />
            </div>
            <div className="text-[10px] font-black uppercase tracking-wider text-paper/40">Generation Speed</div>
          </div>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="bg-ink rounded-[3rem] p-12 md:p-16 text-center space-y-6 relative overflow-hidden max-w-5xl mx-auto">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 space-y-3">
          <h2 className="text-3xl md:text-5xl font-black font-display text-paper uppercase tracking-tight leading-none">
            Ready to Speak <br /> <span className="text-muted/60">to the World?</span>
          </h2>
          <p className="text-paper/60 text-sm max-w-md mx-auto font-medium leading-relaxed">
            Join thousands of creators who use Fish Audio Online to bring their scripts to life. No signup required.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button 
            onClick={() => {
              const element = document.getElementById('studio');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary !bg-paper !text-ink !px-10 !py-4 !text-sm !rounded-xl shadow-2xl hover:scale-105 transition-all w-full sm:w-auto uppercase font-black tracking-widest"
          >
            Generate Voice Free
          </button>
          <Link href="/languages" className="btn-outline !bg-transparent !border-paper/20 !text-paper !px-10 !py-4 !text-sm !rounded-xl hover:bg-paper/10 w-full sm:w-auto uppercase font-black tracking-widest text-center">
            View All Languages
          </Link>
        </div>
      </section>
    </div>
  );
}
