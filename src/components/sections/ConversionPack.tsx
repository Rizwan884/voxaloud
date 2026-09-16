"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, Search, Globe, Filter, Sparkles, Volume2, ArrowRight } from 'lucide-react';

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
        audioRef.current.play().catch(() => {});
        setPlaying(url);
      }
    }
  };

  const handleTryVoice = (voiceId: string) => {
    window.dispatchEvent(new CustomEvent('fishaudio_try_voice', { detail: { id: voiceId } }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <section id="voice-showcase" className="space-y-10 scroll-mt-20">
      <audio ref={audioRef} />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-semibold text-muted">
          <Volume2 size={13} className="text-accent" />
          <span>Interactive Voice Demos</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink tracking-tight">
          Hear the human difference.
        </h2>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          Listen to sample generations synthesized by our neural engine. Zero robotics, natural breath cadence, and studio-grade clarity.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="card p-4 sm:p-5 max-w-4xl mx-auto space-y-3">
        <div className="relative group">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-ink transition-colors pointer-events-none" />
          <input
            className="field !pl-10 !py-2.5 !text-xs !bg-surface-2/60 border-border/80"
            placeholder="Search by speaker name or tone (e.g., James, Narrator)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="relative">
            <Globe size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none hidden sm:block" />
            <select 
              className="field sm:!pl-8 !py-2 !text-xs !bg-surface-2/60 border-border/80 font-medium"
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value as 'All' | 'English' | 'Multilingual')}
            >
              <option value="All">All Languages</option>
              <option value="English">English</option>
              <option value="Multilingual">Multilingual</option>
            </select>
          </div>

          <div className="relative">
            <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none hidden sm:block" />
            <select 
              className="field sm:!pl-8 !py-2 !text-xs !bg-surface-2/60 border-border/80 font-medium"
              value={selectedGender}
              onChange={e => setSelectedGender(e.target.value as 'All' | 'Male' | 'Female')}
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="relative">
            <Sparkles size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none hidden sm:block" />
            <select 
              className="field sm:!pl-8 !py-2 !text-xs !bg-surface-2/60 border-border/80 font-medium"
              value={selectedStyle}
              onChange={e => setSelectedStyle(e.target.value as 'All' | 'Narrator' | 'Conversational' | 'Ads' | 'Character')}
            >
              <option value="All">All Styles</option>
              <option value="Narrator">Narrator</option>
              <option value="Conversational">Conversational</option>
              <option value="Ads">Ads & Commercial</option>
              <option value="Character">Character</option>
            </select>
          </div>
        </div>
      </div>

      {/* Voices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {filteredSamples.map((sample) => {
          const isCurrentPlaying = playing === sample.audio;
          const progressPct = isCurrentPlaying && duration ? (currentTime / duration) * 100 : 0;

          return (
            <div 
              key={sample.id} 
              className={`card p-5 flex flex-col justify-between group transition-all duration-200 ${
                isCurrentPlaying ? 'border-accent shadow-md shadow-accent/5 ring-2 ring-accent/10' : ''
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">{sample.flag}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink truncate leading-tight">
                      {sample.name}
                    </p>
                    <span className="text-[11px] text-muted font-medium">
                      {sample.gender} &bull; {sample.style}
                    </span>
                  </div>
                </div>

                {/* Animated wave bars when playing */}
                {isCurrentPlaying ? (
                  <div className="flex items-center gap-0.5 h-4 shrink-0">
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                  </div>
                ) : (
                  <span className="text-[10px] font-medium text-muted bg-surface-2 px-2 py-0.5 rounded-full border border-border shrink-0">
                    44kHz
                  </span>
                )}
              </div>

              {/* Player Scrubber & Actions */}
              <div className="pt-4 space-y-3">
                <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-accent h-full transition-all duration-100" 
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => togglePlay(sample.audio)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isCurrentPlaying 
                        ? 'bg-accent text-white shadow-xs' 
                        : 'bg-surface-2 text-ink hover:bg-surface-3'
                    }`}
                  >
                    {isCurrentPlaying ? <Pause size={13} /> : <Play size={13} />}
                    <span>{isCurrentPlaying ? 'Pause' : 'Listen'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTryVoice(sample.id)}
                    className="text-xs font-semibold text-muted hover:text-accent flex items-center gap-1 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-accent-light"
                  >
                    <span>Use Voice</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
