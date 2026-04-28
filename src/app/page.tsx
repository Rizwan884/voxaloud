"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { parseStream } from '@/lib/stream';
import { RefreshCw, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import EditorPanel from '@/components/EditorPanel';
import HistoryPanel from '@/components/HistoryPanel';
import VoicePanel from '@/components/VoicePanel';
import AdBanner from '@/components/AdBanner';

interface Voice { id: string; name: string; gender: string; language: string; country: string; previewAudioPath: string; }
interface AudioHistory { id: string; text: string; voiceName: string; date: string; audioUrl: string; }

const CHAR_LIMIT = 10000;

export default function Home() {
  const [view, setView] = useState<'home' | 'privacy' | 'terms'>('home');
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);

  // Voice filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<'All' | 'Male' | 'Female'>('All');

  // Editor state
  const [text, setText] = useState('');
  const [pitch, setPitch] = useState(0);
  const [rate, setRate] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{ current: number, total: number } | null>(null);

  // Audio state
  const [history, setHistory] = useState<AudioHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);
  const [expandedHistory, setExpandedHistory] = useState<Record<string, boolean>>({});
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Captcha state
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previewRef = useRef<HTMLAudioElement | null>(null);

  // Loaders
  useEffect(() => {
    axios.get('/api/voices').then(res => {
      if (res.data._data) {
        const str = parseStream(res.data._data, true) as string;
        const decryptedData = JSON.parse(str);
        setVoices(decryptedData);
        if (decryptedData.length > 0) setSelectedVoice(decryptedData[0]);
      } else {
        setVoices(res.data);
        if (res.data.length > 0) setSelectedVoice(res.data[0]);
      }
    }).catch(() => setError("Failed to load voices."));

    const saved = localStorage.getItem('voxaloud_history');
    if (saved) {
      // eslint-disable-next-line
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Audio Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => { setPlayingId(null); setCurrentTime(0); setIsAudioPlaying(false); };
    const onPlay = () => setIsAudioPlaying(true);
    const onPause = () => setIsAudioPlaying(false);

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  // Filtering
  const filteredVoices = voices.filter(v => {
    const matchS = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.language.toLowerCase().includes(searchTerm.toLowerCase());
    const matchG = selectedGender === 'All' || v.gender.toLowerCase() === selectedGender.toLowerCase();
    return matchS && matchG;
  });

  // Actions
  const handlePlayPreview = (voice: Voice) => {
    if (activePreview === voice.id) {
      previewRef.current?.pause();
      setActivePreview(null);
    } else {
      if (previewRef.current) {
        previewRef.current.src = parseStream(voice.previewAudioPath, true) as string;
        previewRef.current.play();
        setActivePreview(voice.id);
      }
    }
  };

  const handlePlayPauseHistory = (item: AudioHistory) => {
    if (!audioRef.current) return;
    if (playingId === item.id) {
      if (audioRef.current.paused) audioRef.current.play();
      else audioRef.current.pause();
    } else {
      audioRef.current.src = item.audioUrl;
      audioRef.current.play();
      setPlayingId(item.id);
    }
  };

  const saveToHistory = (blob: Blob, synthesisText: string, voiceName: string) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const b64 = reader.result as string;
      const newItem: AudioHistory = { id: crypto.randomUUID(), text: synthesisText, voiceName, date: new Date().toLocaleString(), audioUrl: b64 };
      const newHistory = [newItem, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('voxaloud_history', JSON.stringify(newHistory));
      setPlayingId(newItem.id);
      setLastCreatedId(newItem.id);
      setTimeout(() => setLastCreatedId(null), 3000);
    };
  };

  const handleGenerateClick = () => {
    if (!text.trim() || text.length > CHAR_LIMIT) return;
    
    // Trigger Adsterra Smartlink
    window.open('https://www.profitablecpmratenetwork.com/aukggsuay?key=080bddfb16a07a1ad242e94ddbdaafed', '_blank');

    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = '';
    for (let i = 0; i < 6; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setGeneratedCaptcha(res);
    setCaptchaValue('');
    setShowCaptcha(true);
  };

  const executeTTS = async () => {
    if (captchaValue.toUpperCase() !== generatedCaptcha) { setError("Invalid captcha."); return; }
    setShowCaptcha(false);
    setIsProcessing(true);
    setProgress({ current: 0, total: text.length });
    setError(null);

    try {
      const chunks: string[] = [];
      let rem = text;
      while (rem.length > 0) {
        if (rem.length <= 1950) { chunks.push(rem); break; }
        const size = Math.floor(Math.random() * (1950 - 1700 + 1)) + 1700;
        let split = size;
        const lastP = rem.lastIndexOf(". ", size);
        const lastS = rem.lastIndexOf(" ", size);
        if (lastP > 1600) split = lastP + 2; else if (lastS > 1600) split = lastS + 1;
        chunks.push(rem.substring(0, split).trim());
        rem = rem.substring(split).trim();
      }

      const audioChunks: Blob[] = [];
      let processed = 0;
      for (const chunk of chunks) {
        const res = await axios.post('/api/tts', { text: chunk, voice: selectedVoice?.id, pitch, rate });
        if (res.data._data) {
          const bytes = parseStream(res.data._data, false) as Uint8Array;
          audioChunks.push(new Blob([bytes as unknown as BlobPart], { type: 'audio/mpeg' }));
        } else {
          audioChunks.push(res.data);
        }
        processed += chunk.length;
        setProgress({ current: processed, total: text.length });
      }

      const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
      saveToHistory(audioBlob, text, selectedVoice?.name || 'Unknown');
      if (audioRef.current) { audioRef.current.src = URL.createObjectURL(audioBlob); audioRef.current.play(); }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Synthesis failed.");
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-ink/10 flex flex-col">
      <audio ref={previewRef} onEnded={() => setActivePreview(null)} />
      <audio ref={audioRef} />

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-paper/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setView('home'); window.scrollTo(0, 0); }}>
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center text-paper font-display font-bold text-lg group-hover:rotate-12 transition-transform">V</div>
            <div>
              <h1 className="text-base font-bold text-ink font-display leading-none">VoxaLoud</h1>
              <p className="text-[10px] text-muted uppercase tracking-widest font-semibold mt-0.5">Neural TTS</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[12px] font-semibold text-muted">
            <button onClick={() => setView('home')} className="hover:text-ink transition-colors">Studio</button>
            <button onClick={() => { setView('privacy'); window.scrollTo(0, 0); }} className="hover:text-ink transition-colors">Privacy</button>
            <button onClick={() => { setView('terms'); window.scrollTo(0, 0); }} className="hover:text-ink transition-colors">Terms</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 py-8 md:py-12 dot-grid">
        {error && (
          <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between border border-red-100">
            {error}
            <button onClick={() => setError(null)}><X size={16} /></button>
          </div>
        )}

        {view === 'home' && (
          <div className="space-y-24 md:space-y-32">
            <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

              {/* Left Col */}
              <div className="space-y-8 min-w-0">
                <header className="space-y-4">
                  <div className="hidden md:block">
                    <AdBanner type="728x90" />
                  </div>
                  <div className="md:hidden">
                    <AdBanner type="320x50" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-ink font-display tracking-tight leading-[1.1]">
                    Free AI <br className="hidden md:block" /><span className="text-muted">Voice Generator.</span>
                  </h2>
                  <p className="text-base text-muted max-w-xl leading-relaxed">
                    Turn text into realistic speech in seconds. Choose from 500+ human-sounding AI voices in 75 languages. 100% free to use anywhere.
                  </p>
                </header>

                <EditorPanel
                  text={text} setText={setText} pitch={pitch} setPitch={setPitch} rate={rate} setRate={setRate}
                  selectedVoice={selectedVoice} isProcessing={isProcessing} progress={progress} onGenerate={handleGenerateClick}
                  charLimit={CHAR_LIMIT}
                />

                <div className="hidden md:block">
                  <AdBanner type="468x60" />
                </div>
                <div className="md:hidden">
                  <AdBanner type="320x50" />
                </div>

                <div className="pt-4">
                  <HistoryPanel
                    history={history} playingId={playingId} lastCreatedId={lastCreatedId}
                    currentTime={currentTime} duration={duration} expandedHistory={expandedHistory}
                    isAudioPlaying={isAudioPlaying}
                    onToggleExpand={id => setExpandedHistory(p => ({ ...p, [id]: !p[id] }))}
                    onPlayPause={handlePlayPauseHistory} onStop={() => { audioRef.current?.pause(); setPlayingId(null); }}
                    onSeek={e => { if (audioRef.current) { const t = parseFloat(e.target.value); audioRef.current.currentTime = t; setCurrentTime(t); } }}
                    onDelete={id => { const n = history.filter(h => h.id !== id); setHistory(n); localStorage.setItem('voxaloud_history', JSON.stringify(n)); }}
                    onClear={() => { setHistory([]); localStorage.removeItem('voxaloud_history'); }}
                  />
                </div>
              </div>

              {/* Right Col */}
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="hidden lg:block">
                  <AdBanner type="300x250" />
                </div>
                
                <VoicePanel
                  voices={voices} filteredVoices={filteredVoices} selectedVoice={selectedVoice}
                  onSelectVoice={setSelectedVoice} activePreview={activePreview} onPreview={handlePlayPreview}
                  searchTerm={searchTerm} onSearch={setSearchTerm}
                  selectedGender={selectedGender} onGender={setSelectedGender}
                />

                {/* Promo Card w/ Lottie */}
                <div className="card-surface p-6 overflow-hidden relative group">
                  <div className="absolute right-[-40px] top-[-40px] w-48 h-48 opacity-10 group-hover:opacity-20 transition-opacity">
                    <DotLottieReact src="https://lottie.host/80e7d7db-e696-4835-93df-f40c7e52d6a7/2LhZ1t72X3.lottie" loop autoplay />
                  </div>
                  <ShieldCheck size={24} className="text-ink mb-4 relative z-10" />
                  <h4 className="text-lg font-bold text-ink font-display mb-2 relative z-10">Free for Creators</h4>
                  <p className="text-sm text-muted relative z-10 leading-relaxed">
                    You own the audio you make. Use it safely on YouTube, TikTok, or podcasts without any copyright strikes.
                  </p>
                </div>
                
                <div className="hidden lg:block">
                  <AdBanner type="160x600" />
                </div>
              </div>

            </div>

            {/* Stats */}
            <section className="py-12 md:py-24 border-y border-border relative overflow-hidden bg-surface/50 -mx-4 md:mx-0 px-4 md:px-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center">
                <div className="space-y-2">
                  <p className="text-4xl md:text-6xl font-bold tracking-tighter text-ink font-display">500+</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted">AI Voices</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl md:text-6xl font-bold tracking-tighter text-ink font-display">4K</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted">Character Limit</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl md:text-6xl font-bold tracking-tighter text-ink font-display">75+</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted">Languages</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl md:text-6xl font-bold tracking-tighter text-ink font-display">&lt;2s</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted">Generation Time</p>
                </div>
              </div>
            </section>

            {/* Info Block */}
            <section className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display text-ink leading-[1.2]">
                  Free Text-to-Speech <br /><span className="text-muted">for Creators</span>
                </h2>
                <p className="text-muted text-base leading-relaxed">
                  VoxaLoud is a free AI voice generator that sounds like a real human. Get access to over 500 premium voices across 75 languages to make your content stand out.
                  <br /><br />
                  You don&apos;t need to sign up or add a credit card. Just type your text, choose a voice, and download your audio. It&apos;s completely free for commercial use.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                {['No Registration', 'Commercial Use', '500+ AI Voices', '75+ Languages'].map((title, i) => (
                  <div key={i} className="p-6 card-surface flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="mb-3 text-ink" size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink">{title}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* How to Use */}
            <section>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight font-display mb-12 text-center text-ink">How to Use <span className="text-muted">VoxaLoud</span></h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: "01", title: "Type Your Text", desc: "Paste your script into the text box above." },
                  { step: "02", title: "Pick a Voice", desc: "Choose from 500+ human-sounding AI voices." },
                  { step: "03", title: "Download Audio", desc: "Click generate to download your MP3 file instantly." }
                ].map((item, i) => (
                  <div key={i} className="relative p-8 card-surface flex flex-col items-center text-center overflow-hidden group">
                    <span className="text-6xl md:text-8xl font-black text-ink/5 absolute -top-4 -left-4 font-display group-hover:scale-110 transition-transform">{item.step}</span>
                    <div className="relative z-10 pt-4">
                      <h4 className="text-lg font-bold mb-3 font-display text-ink">{item.title}</h4>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Platform Features */}
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Use Anywhere", desc: "No copyright strikes. Use your audio for commercial projects safely." },
                { title: "No Sign Up", desc: "Start generating right away. We don't ask for your email or credit card." },
                { title: "Custom Voices", desc: "Easily adjust the pitch and speed to get the exact tone you want." },
                { title: "High Quality Audio", desc: "Download clear, professional MP3 files ready for your video or podcast." },
                { title: "Global Accents", desc: "Create voiceovers in over 75 languages with natural local accents." },
                { title: "Human Sounding", desc: "Our AI voices breathe and pause just like real people do." }
              ].map((feature, i) => (
                <div key={i} className="p-6 md:p-8 card hover:border-ink/20 transition-colors flex flex-col gap-3">
                  <ShieldCheck size={20} className="text-ink" />
                  <h4 className="text-base font-bold font-display text-ink">{feature.title}</h4>
                  <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </section>

            {/* Marketing Section */}
            <div className="w-full">
              <AdBanner type="native" />
            </div>

            {/* Use Cases */}
            <section className="bg-ink text-paper p-12 md:p-20 rounded-3xl text-center mx-[-1rem] md:mx-0">
              <h3 className="text-3xl md:text-4xl font-bold font-display mb-12 tracking-tight">USE CASES</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
                {[
                  { title: "YouTube", desc: "Engaging voiceovers" },
                  { title: "TikTok", desc: "Viral voice content" },
                  { title: "Presentations", desc: "Professional narration" }
                ].map((caseItem, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <h4 className="text-xl md:text-2xl font-bold mb-2 font-display">{caseItem.title}</h4>
                    <p className="text-[11px] text-paper/60 uppercase tracking-widest font-semibold">{caseItem.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="pb-12">
              <header className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-4 font-display">Common Questions</h2>
                <p className="text-muted text-sm uppercase tracking-[0.2em] font-semibold">Everything you need to know</p>
              </header>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { q: "Is there a limit?", a: "You can type up to 10000 characters at once. Need more? Just generate multiple files." },
                  { q: "Do the voices sound robotic?", a: "Not at all. We use advanced AI to make sure our voices sound natural and human." },
                  { q: "Can I use this for YouTube or TikTok?", a: "Yes! You can use the audio for any commercial project without paying us." },
                  { q: "Can I change the speed?", a: "Yes, you can adjust the speed and pitch to make the voice match your content perfectly." },
                  { q: "Do you save my audio?", a: "Your last 10 audios are saved in your browser history so you don't lose them." },
                  { q: "Is my data private?", a: "Yes. We don't store your text or audio on our servers." }
                ].map((faq, i) => (
                  <div key={i} className="card-surface p-6 md:p-8 group hover:bg-surface-2 transition-colors">
                    <h4 className="font-bold text-ink mb-3 font-display text-base">{faq.q}</h4>
                    <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Ad Space */}
            <div className="hidden md:block py-4">
              <AdBanner type="728x90" />
            </div>
            <div className="md:hidden py-4">
              <AdBanner type="320x50" />
            </div>
          </div>
        )}

        {(view === 'privacy' || view === 'terms') && (
          <div className="max-w-3xl mx-auto card p-8 md:p-12">
            <h2 className="text-3xl font-bold text-ink font-display mb-8">
              {view === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h2>
            <div className="prose prose-sm md:prose-base prose-slate text-muted">
              {view === 'privacy' ? (
                <>
                  <p><strong>1. Data Processing:</strong> We do not store your text inputs or generated audio files on our servers after the generation is complete.</p>
                  <p><strong>2. Local Storage:</strong> Your history is saved entirely within your browser&apos;s local storage for your convenience.</p>
                  <p><strong>3. Analytics:</strong> We use basic anonymous analytics to improve the performance of our application.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Usage Rights:</strong> You are granted a commercial license for all audio generated through VoxaLoud. No attribution is required.</p>
                  <p><strong>2. Abuse:</strong> Do not use automated scripts to abuse the API. Rate limits are in place to ensure fair usage.</p>
                  <p><strong>3. Content:</strong> You are responsible for the text you synthesize. Do not use the service to generate illegal or harmful content.</p>
                </>
              )}
            </div>
            <button onClick={() => setView('home')} className="btn-outline mt-8">Back to Studio</button>
          </div>
        )}
        
        {/* Global Bottom Ad */}
        <div className="mt-12 hidden md:block">
          <AdBanner type="468x60" />
        </div>
        <div className="mt-12 md:hidden">
          <AdBanner type="320x50" />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-12 md:py-20 mt-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12 md:space-y-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center text-paper font-display font-bold text-lg">V</div>
              <span className="font-bold tracking-tight text-ink font-display text-lg">VoxaLoud Studio</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold text-muted uppercase tracking-widest">
              <button onClick={() => { setView('privacy'); window.scrollTo(0, 0); }} className="hover:text-ink transition-colors">Privacy</button>
              <button onClick={() => { setView('terms'); window.scrollTo(0, 0); }} className="hover:text-ink transition-colors">Terms</button>
              <a href="#" className="hover:text-ink transition-colors">Contact Support</a>
            </div>
            <p className="text-[11px] text-muted font-bold uppercase tracking-widest">&copy; 2026 VOXALOUD</p>
          </div>

          <div className="pt-8 border-t border-border">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-6 text-center">Supported languages</h5>
            <div className="flex flex-wrap justify-center gap-4 text-[11px] font-semibold text-muted">
              {[
                "English", "العربية", "中文", "Français",
                "Deutsch", "हिंदी", "Italiano", "日本語", "한국어",
                "Português", "Русский", "Español", "Türkçe", "اردو"
              ].map((lang) => (
                <span key={lang} className="hover:text-ink transition-colors cursor-default px-2 py-1 bg-paper rounded-md border border-border">{lang}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Captcha Modal */}
      <AnimatePresence>
        {showCaptcha && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={() => setShowCaptcha(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="card w-full max-w-sm relative z-10 p-6 shadow-2xl">
              <button onClick={() => setShowCaptcha(false)} className="absolute top-4 right-4 text-muted hover:text-ink"><X size={20} /></button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={24} className="text-ink" />
                </div>
                <h3 className="text-lg font-bold font-display text-ink">Verify Execution</h3>
                <p className="text-xs text-muted mt-1">Please enter the code to begin synthesis</p>
              </div>

              <div className="bg-surface rounded-xl p-4 mb-4 flex items-center justify-between">
                <div className="text-xl font-mono font-bold tracking-[0.3em] text-ink select-none flex-1 text-center">
                  {generatedCaptcha}
                </div>
                <button onClick={() => {
                  let res = ''; const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
                  for (let i = 0; i < 6; i++) res += c.charAt(Math.floor(Math.random() * c.length));
                  setGeneratedCaptcha(res);
                }} className="text-muted hover:text-ink p-1"><RefreshCw size={16} /></button>
              </div>

              <input autoFocus type="text" placeholder="Enter code" value={captchaValue} onChange={e => setCaptchaValue(e.target.value)}
                className="field !text-center !font-mono !text-lg !tracking-widest mb-4 uppercase"
                onKeyDown={e => e.key === 'Enter' && executeTTS()}
              />
              <button onClick={executeTTS} className="btn-primary w-full !py-3">Synthesize Audio</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
