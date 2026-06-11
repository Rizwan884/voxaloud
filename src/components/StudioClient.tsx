"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { parseStream, formatStream } from '@/lib/stream';
import { getApiUrl } from '@/lib/api';
import { X, Loader2, Play, Pause, Download, RefreshCw, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EditorPanel from '@/components/EditorPanel';
import VoicePanel from '@/components/VoicePanel';
import AdBanner from '@/components/AdBanner';

interface Voice { id: string; name: string; gender: string; language: string; country: string; flag?: string; }
interface AudioHistory { id: string; text: string; voiceId: string; voiceName: string; date: string; audioUrl: string; }

const CHAR_LIMIT = 10000;

function fmtTime(t: number) {
  if (isNaN(t)) return '0:00';
  return `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, '0')}`;
}

export default function StudioClient({ initialVoices = [] }: { initialVoices?: Voice[] }) {
  const [voices, setVoices] = useState<Voice[]>(initialVoices);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Editor state
  const [text, setText] = useState('');
  const [pitch, setPitch] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fishaudio_last_pitch');
      return saved ? parseFloat(saved) : 0;
    }
    return 0;
  });
  const [rate, setRate] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fishaudio_last_rate');
      return saved ? parseFloat(saved) : 0;
    }
    return 0;
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{ current: number, total: number } | null>(null);

  // Audio / History state
  const [history, setHistory] = useState<AudioHistory[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fishaudio_history');
      try {
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [latestAudio, setLatestAudio] = useState<{ url: string; text: string; voiceName: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  
  // Custom Player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadingPreviewId, setLoadingPreviewId] = useState<string | null>(null);

  // Toast / Captcha State
  const [showDownloadToast, setShowDownloadToast] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previewRef = useRef<HTMLAudioElement | null>(null);

  // On page load, restore settings and history
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
          
          // Restore last selected voice
          const lastVoiceId = localStorage.getItem('fishaudio_last_voice');
          if (lastVoiceId) {
            const lastVoice = decryptedData.find((v: Voice) => v.id === lastVoiceId);
            if (lastVoice) setSelectedVoice(lastVoice);
            else if (decryptedData.length > 0) setSelectedVoice(decryptedData[0]);
          } else if (decryptedData.length > 0) {
            setSelectedVoice(decryptedData[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load voices:", err);
      }
    };

    fetchVoices();
  }, []);

  // Save parameters to localStorage on change
  useEffect(() => {
    if (selectedVoice) {
      localStorage.setItem('fishaudio_last_voice', selectedVoice.id);
    }
  }, [selectedVoice]);

  useEffect(() => {
    localStorage.setItem('fishaudio_last_pitch', pitch.toString());
  }, [pitch]);

  useEffect(() => {
    localStorage.setItem('fishaudio_last_rate', rate.toString());
  }, [rate]);

  useEffect(() => {
    const handleTryVoice = (e: Event) => {
      const voiceDetail = (e as CustomEvent).detail;
      const voice = voices.find(v => v.id === voiceDetail.id);
      if (voice) {
        setSelectedVoice(voice);
        const element = document.getElementById('studio');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('fishaudio_try_voice', handleTryVoice);
    return () => window.removeEventListener('fishaudio_try_voice', handleTryVoice);
  }, [voices]);

  // Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => { setIsPlaying(false); setCurrentTime(0); };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

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

  // Playback handlers
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

  const handlePlayPauseLatest = () => {
    if (!audioRef.current || !latestAudio) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleSeekLatest = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleDownloadLatest = () => {
    if (!latestAudio) return;
    const link = document.createElement('a');
    link.href = latestAudio.url;
    link.download = `fishaudio-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show sponsor toast upon download click
    setShowDownloadToast(true);
    setTimeout(() => {
      setShowDownloadToast(false);
    }, 10000); // Hide after 10s
  };

  const saveToHistory = (blob: Blob, rawText: string, voice: Voice) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const b64 = reader.result as string;
      const newItem: AudioHistory = {
        id: crypto.randomUUID(),
        text: rawText,
        voiceId: voice.id,
        voiceName: voice.name,
        date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        audioUrl: b64
      };

      // Keep maximum 5 items in recent generations
      const newHistory = [newItem, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem('fishaudio_history', JSON.stringify(newHistory));
    };
  };

  const handleGenerateClick = () => {
    if (!text.trim() || text.length > CHAR_LIMIT) return;

    // Direct generate or captcha
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = '';
    for (let i = 0; i < 6; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setGeneratedCaptcha(res);
    setCaptchaValue('');
    setShowCaptcha(true);
  };

  const executeTTS = () => {
    if (captchaValue.toUpperCase() !== generatedCaptcha) { 
      setError("Invalid security verification code."); 
      return; 
    }
    setShowCaptcha(false);
    startProcessing();
  };

  const startProcessing = async () => {
    setIsProcessing(true);
    setProgress({ current: 0, total: text.length });
    setError(null);
    setLatestAudio(null);

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
      const objectUrl = URL.createObjectURL(audioBlob);

      setLatestAudio({
        url: objectUrl,
        text: text,
        voiceName: selectedVoice?.name || 'Unknown'
      });

      if (selectedVoice) {
        saveToHistory(audioBlob, text, selectedVoice);
      }

      if (audioRef.current) { 
        audioRef.current.src = objectUrl; 
        audioRef.current.play(); 
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Audio generation failed.");
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleRegenerate = (item: AudioHistory) => {
    setText(item.text);
    const voice = voices.find(v => v.id === item.voiceId);
    if (voice) {
      setSelectedVoice(voice);
    }
    // Scroll smoothly to studio text editor panel
    const element = document.getElementById('studio');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlayHistory = (item: AudioHistory) => {
    setLatestAudio({
      url: item.audioUrl,
      text: item.text,
      voiceName: item.voiceName
    });

    if (audioRef.current) {
      audioRef.current.src = item.audioUrl;
      audioRef.current.play();
    }
  };

  return (
    <div className="space-y-6">
      {/* Audio elements */}
      <audio 
        ref={previewRef} 
        onEnded={() => { setActivePreview(null); setLoadingPreviewId(null); }} 
        onPlaying={() => setLoadingPreviewId(null)}
        onPause={() => setLoadingPreviewId(null)}
        onError={() => { setActivePreview(null); setLoadingPreviewId(null); }}
      />
      <audio ref={audioRef} />

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between border border-red-100">
          {error}
          <button onClick={() => setError(null)} className="p-1"><X size={14} /></button>
        </div>
      )}

      {/* Editor Panel Wrapper */}
      <div className="h-[420px] md:h-[480px]">
        <EditorPanel
          text={text}
          setText={setText}
          pitch={pitch}
          setPitch={setPitch}
          rate={rate}
          setRate={setRate}
          selectedVoice={selectedVoice}
          isProcessing={isProcessing}
          progress={progress}
          onGenerate={handleGenerateClick}
          charLimit={CHAR_LIMIT}
          onOpenVoicePanel={() => setIsVoiceModalOpen(true)}
        />
      </div>

      {/* Progress / Skeleton Loader and Active Player Card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="card-surface p-6 flex flex-col gap-4 border border-border/80"
            >
              <div className="flex items-center gap-3">
                <Loader2 size={18} className="animate-spin text-ink" />
                <span className="text-xs font-black uppercase tracking-wider text-ink">Generating natural AI audio...</span>
              </div>
              <div className="w-full bg-surface-2 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-ink h-full transition-all duration-300 rounded-full" 
                  style={{ width: `${progress ? Math.round((progress.current / progress.total) * 100) : 0}%` }} 
                />
              </div>
              <p className="text-[10px] text-muted font-semibold uppercase tracking-wider">
                Our advanced neural model is synthesizing each syllable for peak realism.
              </p>
            </motion.div>
          ) : latestAudio ? (
            <motion.div 
              key="player"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="card p-6 border-ink/20 shadow-lg relative bg-paper"
            >
              <button 
                onClick={() => setLatestAudio(null)} 
                className="absolute top-4 right-4 text-muted hover:text-ink p-1 rounded-full hover:bg-surface-2 transition-all"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-ink/5 flex items-center justify-center border border-border">
                    <Volume2 size={18} className="text-ink" />
                  </div>
                  <div className="min-w-0 pr-6">
                    <p className="text-xs font-black text-ink uppercase tracking-tight truncate">{latestAudio.text.slice(0, 80)}</p>
                    <p className="text-[9px] text-muted font-bold uppercase tracking-widest mt-0.5">Voice: {latestAudio.voiceName}</p>
                  </div>
                </div>

                {/* Audio controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePlayPauseLatest}
                    className="w-11 h-11 rounded-full bg-ink flex items-center justify-center text-paper shadow-md hover:scale-105 active:scale-[0.98] transition-all"
                  >
                    {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                  </button>

                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted w-8 text-center shrink-0">{fmtTime(currentTime)}</span>
                    <div className="relative flex-1 h-1 bg-surface-2 rounded-full overflow-hidden group">
                      <div className="absolute inset-y-0 left-0 bg-ink rounded-full" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
                      <input 
                        type="range" 
                        min="0" 
                        max={duration || 0} 
                        step="0.01" 
                        value={currentTime}
                        onChange={handleSeekLatest} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      />
                    </div>
                    <span className="text-[10px] font-mono text-muted w-8 text-center shrink-0">{fmtTime(duration)}</span>
                  </div>

                  <button
                    onClick={handleDownloadLatest}
                    className="btn-outline !py-2.5 !px-4 !rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Recent Generations History List */}
      {history.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-ink">Recent Generations</span>
            <button 
              onClick={() => {
                setHistory([]);
                localStorage.removeItem('fishaudio_history');
              }}
              className="text-[10px] font-bold text-muted hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              Clear
            </button>
          </div>

          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="card p-4 flex items-center justify-between gap-4 hover:border-ink/10 transition-colors bg-paper">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button
                    onClick={() => handlePlayHistory(item)}
                    className="w-8 h-8 rounded-lg bg-surface hover:bg-surface-2 border border-border flex items-center justify-center shrink-0 transition-colors"
                  >
                    <Play size={12} fill="currentColor" className="ml-0.5 text-ink" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-ink leading-snug truncate">{item.text.slice(0, 80)}...</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="chip text-[9px] !px-2 !py-0.5">{item.voiceName}</span>
                      <span className="text-[9px] text-muted font-bold uppercase tracking-widest">{item.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleRegenerate(item)}
                    className="btn-outline !p-2 !rounded-lg"
                    title="Pre-fill Text & Voice"
                  >
                    <RefreshCw size={12} />
                  </button>
                  <a
                    href={item.audioUrl}
                    download={`fishaudio-${item.id.slice(0, 6)}.mp3`}
                    onClick={() => {
                      setShowDownloadToast(true);
                      setTimeout(() => setShowDownloadToast(false), 10000);
                    }}
                    className="btn-outline !p-2 !rounded-lg"
                    title="Download Audio File"
                  >
                    <Download size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Voice Selection Modal */}
      <VoicePanel
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        voices={voices}
        selectedVoice={selectedVoice}
        onSelectVoice={(v) => setSelectedVoice(v)}
        activePreview={activePreview}
        loadingPreviewId={loadingPreviewId}
        onPreview={handlePlayPreview}
      />

      {/* Captcha popup */}
      <AnimatePresence>
        {showCaptcha && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={() => setShowCaptcha(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="card w-full max-w-sm relative z-10 p-6 shadow-2xl bg-paper">
              <button onClick={() => setShowCaptcha(false)} className="absolute top-4 right-4 text-muted hover:text-ink"><X size={18} /></button>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-black font-display text-ink uppercase tracking-tight">Security Check</h3>
                <p className="text-[10px] text-muted mt-1 uppercase tracking-wider font-bold">Please verify to synthesize audio</p>
              </div>

              <div className="bg-surface rounded-xl p-4 mb-4 flex items-center justify-between border border-border">
                <span className="text-lg font-mono font-black tracking-[0.3em] text-ink select-none flex-1 text-center">
                  {generatedCaptcha}
                </span>
                <button 
                  onClick={() => {
                    let res = ''; const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
                    for (let i = 0; i < 6; i++) res += c.charAt(Math.floor(Math.random() * c.length));
                    setGeneratedCaptcha(res);
                  }} 
                  className="text-muted hover:text-ink p-1"
                >
                  <RefreshCw size={14} />
                </button>
              </div>

              <input 
                autoFocus 
                type="text" 
                placeholder="Enter security code" 
                value={captchaValue} 
                onChange={e => setCaptchaValue(e.target.value)}
                className="field !text-center !font-mono !text-base !tracking-widest mb-4 uppercase"
                onKeyDown={e => e.key === 'Enter' && executeTTS()}
              />
              <button onClick={executeTTS} className="btn-primary w-full !py-3 uppercase tracking-wider text-xs font-black">Verify Code</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Sponsor / Ad Download Toast */}
      <AnimatePresence>
        {showDownloadToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 card w-[340px] p-5 shadow-2xl border-t-4 border-ink bg-paper rounded-2xl flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-ink uppercase tracking-wider">Sponsors keep this free</span>
              <button 
                onClick={() => setShowDownloadToast(false)} 
                className="text-muted hover:text-ink p-0.5 rounded-full hover:bg-surface-2 transition-all"
              >
                <X size={14} />
              </button>
            </div>
            
            {/* Horizontal Ad in toast */}
            <div className="w-full bg-surface-2 rounded-xl overflow-hidden shadow-inner-sm border border-border">
              <AdBanner type="320x50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
