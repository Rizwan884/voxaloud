"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { parseStream, formatStream } from '@/lib/stream';
import { getApiUrl } from '@/lib/api';
import { RefreshCw, CheckCircle2, ShieldCheck, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import EditorPanel from '@/components/EditorPanel';
import HistoryPanel from '@/components/HistoryPanel';
import VoicePanel from '@/components/VoicePanel';
import AdBanner from '@/components/AdBanner';

interface Voice { id: string; name: string; gender: string; language: string; country: string; flag?: string; }
interface AudioHistory { id: string; text: string; voiceName: string; date: string; audioUrl: string; }

const CHAR_LIMIT = 10000;

export default function StudioClient({ initialVoices = [] }: { initialVoices?: Voice[] }) {
  const [voices, setVoices] = useState<Voice[]>(initialVoices);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(initialVoices[0] || null);
  const [isLoading, setIsLoading] = useState(initialVoices.length === 0);

  // Voice filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<'All' | 'Male' | 'Female'>('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');

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
  const [loadingPreviewId, setLoadingPreviewId] = useState<string | null>(null);

  // Captcha state
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showAdNotice, setShowAdNotice] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previewRef = useRef<HTMLAudioElement | null>(null);

  // Loaders
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await axios.get(getApiUrl('/api/voices'));
        let decryptedData: Voice[] = [];
        
        if (res.data._data) {
          const str = parseStream(res.data._data, true) as string;
          decryptedData = JSON.parse(str);
        } else {
          decryptedData = res.data;
        }

        if (Array.isArray(decryptedData)) {
          setVoices(decryptedData);
          
          const lastVoiceId = localStorage.getItem('fishaudio_last_voice');
          if (lastVoiceId) {
            const lastVoice = decryptedData.find((v: Voice) => v.id === lastVoiceId);
            if (lastVoice) setSelectedVoice(lastVoice);
            else if (!selectedVoice && decryptedData.length > 0) setSelectedVoice(decryptedData[0]);
          } else if (!selectedVoice && decryptedData.length > 0) {
            setSelectedVoice(decryptedData[0]);
          }
        } else {
          console.warn("Received invalid voices data format:", decryptedData);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load voices:", err);
        if (voices.length === 0) setError("Failed to load voices.");
        setIsLoading(false);
      }
    };

    fetchVoices();

    const saved = localStorage.getItem('fishaudio_history');
    if (saved) {
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
  const uniqueLanguages = Array.from(new Set(voices.map(v => v.language))).sort();
  const uniqueCountries = Array.from(new Set(voices.map(v => v.country))).sort();

  const filteredVoices = voices.filter(v => {
    const matchS = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.language.toLowerCase().includes(searchTerm.toLowerCase()) || v.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchG = selectedGender === 'All' || v.gender.toLowerCase() === selectedGender.toLowerCase();
    const matchL = selectedLanguage === 'All' || v.language === selectedLanguage;
    const matchC = selectedCountry === 'All' || v.country === selectedCountry;
    return matchS && matchG && matchL && matchC;
  }).sort((a, b) => {
    if (a.id === selectedVoice?.id) return -1;
    if (b.id === selectedVoice?.id) return 1;
    return 0;
  });

  // Actions
  const handlePlayPreview = (voice: Voice) => {
    if (activePreview === voice.id) {
      previewRef.current?.pause();
      setActivePreview(null);
      setLoadingPreviewId(null);
    } else {
      if (previewRef.current) {
        setLoadingPreviewId(voice.id);
        previewRef.current.src = getApiUrl(`/api/preview?id=${voice.id}`);
        previewRef.current.play();
        setActivePreview(voice.id);
      }
    }
  };

  const handleTimeUpdate = () => { if (audioRef.current) setCurrentTime(audioRef.current.currentTime); };
  const handleLoadedMetadata = () => { if (audioRef.current) setDuration(audioRef.current.duration); };

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
      localStorage.setItem('fishaudio_history', JSON.stringify(newHistory));
      setPlayingId(newItem.id);
      setLastCreatedId(newItem.id);
      setTimeout(() => setLastCreatedId(null), 3000);
    };
  };

  const handleGenerateClick = () => {
    if (!text.trim() || text.length > CHAR_LIMIT) return;

    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = '';
    for (let i = 0; i < 6; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setGeneratedCaptcha(res);
    setCaptchaValue('');
    setShowAdNotice(false);
    setShowCaptcha(true);
  };

  const executeTTS = () => {
    if (captchaValue.toUpperCase() !== generatedCaptcha) { setError("Invalid captcha."); return; }
    startProcessing();
  };

  const startProcessing = async () => {
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
        const rawPayload = JSON.stringify({ text: chunk, voice: selectedVoice?.id, pitch, rate });
        const obfuscatedPayload = formatStream(rawPayload);
        const res = await axios.post(getApiUrl('/api/tts'), { _payload: obfuscatedPayload });

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
      setShowCaptcha(false);
      setShowAdNotice(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Synthesis failed.");
      setShowCaptcha(false);
      setShowAdNotice(false);
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  return (
    <>
      <audio 
        ref={previewRef} 
        onEnded={() => { setActivePreview(null); setLoadingPreviewId(null); }} 
        onPlaying={() => setLoadingPreviewId(null)}
        onPause={() => setLoadingPreviewId(null)}
        onError={() => { setActivePreview(null); setLoadingPreviewId(null); }}
      />
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setPlayingId(null)} />

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between border border-red-100">
          {error}
          <button onClick={() => setError(null)}><X size={16} /></button>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Left Col */}
        <div className="space-y-8 min-w-0">
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
              onDelete={id => { const n = history.filter(h => h.id !== id); setHistory(n); localStorage.setItem('fishaudio_history', JSON.stringify(n)); }}
              onClear={() => { setHistory([]); localStorage.removeItem('fishaudio_history'); }}
            />
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="hidden lg:block">
            <AdBanner type="300x250" />
          </div>

          <VoicePanel
            voices={voices} filteredVoices={filteredVoices} selectedVoice={selectedVoice} isLoading={isLoading}
            onSelectVoice={(v) => { setSelectedVoice(v); localStorage.setItem('fishaudio_last_voice', v.id); }}
            activePreview={activePreview} loadingPreviewId={loadingPreviewId} onPreview={handlePlayPreview}
            searchTerm={searchTerm} onSearch={setSearchTerm}
            selectedGender={selectedGender} onGender={setSelectedGender}
            selectedLanguage={selectedLanguage} onLanguage={setSelectedLanguage}
            selectedCountry={selectedCountry} onCountry={setSelectedCountry}
            uniqueLanguages={uniqueLanguages} uniqueCountries={uniqueCountries}
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

      <AnimatePresence>
        {showCaptcha && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={() => setShowCaptcha(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="card w-full max-sm relative z-10 p-6 shadow-2xl">
              {!isProcessing && <button onClick={() => setShowCaptcha(false)} className="absolute top-4 right-4 text-muted hover:text-ink"><X size={20} /></button>}

              {!isProcessing && !showAdNotice ? (
                <>
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
                  <button onClick={executeTTS} className="btn-primary w-full !py-3">Verify Code</button>
                </>
              ) : showAdNotice && !isProcessing ? (
                <div className="text-center py-4 space-y-6">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-green-600">Verification Successful</h3>
                    <p className="text-[13px] text-muted mt-2 px-2 leading-relaxed">
                      While we are generating your audio, an ad will be shown in next tab.
                    </p>
                    <div className="mt-6 p-4 bg-red-50 rounded-2xl border border-red-100">
                      <p className="text-[11px] text-red-600 font-bold uppercase tracking-wider">Note</p>
                      <p className="text-[12px] text-red-700 font-bold mt-1 leading-relaxed">
                        Please don&apos;t close the new tab while we are generating your audio.
                      </p>
                    </div>
                  </div>
                  <button onClick={startProcessing} className="btn-primary w-full !py-3">OK, Proceed</button>
                </div>
              ) : (
                <div className="text-center py-4 space-y-6">
                  <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 text-ink animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-ink">Generating Audio...</h3>
                    <p className="text-[13px] text-muted mt-2 px-2 leading-relaxed">
                      Please stay on this page while we finish your synthesis.
                    </p>
                  </div>
                  {progress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-muted uppercase tracking-widest">
                        <span>Progress</span>
                        <span>{Math.round((progress.current / progress.total) * 100)}%</span>
                      </div>
                      <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-ink h-full transition-all duration-300" style={{ width: `${(progress.current / progress.total) * 100}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
