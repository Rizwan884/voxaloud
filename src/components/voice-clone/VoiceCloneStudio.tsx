"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Mic2, Plus, Play, Pause, X, Loader2, Download, ArrowRight,
  Library, Sparkles, Volume2, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CloneRecorder from './CloneRecorder';
import LibraryBrowser from './LibraryBrowser';
import AdBanner from '@/components/AdBanner';
import AuthGate from '@/components/auth/AuthGate';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  ClonedVoice, CloneGeneration,
  getClonedVoices, saveClonedVoice, removeClonedVoice,
  getCloneHistory, saveCloneGeneration, clearCloneHistory,
  blobToDataUrl,
} from '@/lib/cloneStorage';

const CHAR_LIMIT = 1000;

interface PublicVoice { id: string; title: string; }

function fmtTime(t: number) {
  if (isNaN(t)) return '0:00';
  return `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, '0')}`;
}

export default function VoiceCloneStudio({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const isFull = variant === 'full';
  const { user, loading: authLoading, configured } = useAuth();

  const [voices, setVoices] = useState<ClonedVoice[]>(() => getClonedVoices());
  const [selectedVoice, setSelectedVoice] = useState<ClonedVoice | null>(() => getClonedVoices()[0] || null);
  const [tab, setTab] = useState<'my' | 'library'>('my');
  const [showRecorder, setShowRecorder] = useState(false);

  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latestAudio, setLatestAudio] = useState<{ url: string; text: string; voiceName: string } | null>(null);

  const [history, setHistory] = useState<CloneGeneration[]>(() => getCloneHistory());

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const handleCloned = (voice: ClonedVoice) => {
    const next = saveClonedVoice(voice);
    setVoices(next);
    setSelectedVoice(voice);
    setShowRecorder(false);
    setTab('my');
  };

  const handleUseLibraryVoice = (voice: PublicVoice) => {
    const cloned: ClonedVoice = {
      id: voice.id,
      name: voice.title,
      createdAt: new Date().toISOString(),
      source: 'library',
    };
    const next = saveClonedVoice(cloned);
    setVoices(next);
    setSelectedVoice(cloned);
  };

  const handleDeleteVoice = async (id: string) => {
    setVoices(removeClonedVoice(id));
    if (selectedVoice?.id === id) setSelectedVoice(null);
    fetch('/api/voice-clone/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  };

  const handleGenerate = async () => {
    if (!text.trim() || !selectedVoice || isGenerating) return;
    setIsGenerating(true);
    setError(null);
    setLatestAudio(null);

    try {
      const res = await fetch('/api/voice-clone/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), referenceId: selectedVoice.id }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Generation failed');
      }

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      setLatestAudio({ url: objectUrl, text, voiceName: selectedVoice.name });

      const dataUrl = await blobToDataUrl(blob);
      const item: CloneGeneration = {
        id: crypto.randomUUID(),
        voiceId: selectedVoice.id,
        voiceName: selectedVoice.name,
        text,
        date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        audioUrl: dataUrl,
      };
      setHistory(saveCloneGeneration(item));

      if (audioRef.current) {
        audioRef.current.src = objectUrl;
        audioRef.current.play();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current || !latestAudio) return;
    if (isPlaying) audioRef.current.pause(); else audioRef.current.play();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const t = parseFloat(e.target.value);
    audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const handlePlayHistory = (item: CloneGeneration) => {
    setLatestAudio({ url: item.audioUrl, text: item.text, voiceName: item.voiceName });
    if (audioRef.current) { audioRef.current.src = item.audioUrl; audioRef.current.play(); }
  };

  const charPct = text.length / CHAR_LIMIT;
  let counterClass = 'text-muted border-border bg-paper';
  if (charPct >= 0.95) counterClass = 'text-red-600 border-red-200 bg-red-50';
  else if (charPct >= 0.8) counterClass = 'text-amber-600 border-amber-200 bg-amber-50';

  if (authLoading) {
    return <div className={`w-full ${isFull ? 'h-[420px]' : 'h-[260px]'} bg-ink/5 animate-pulse rounded-2xl`} />;
  }

  if (!user) {
    return <AuthGate variant={variant} configured={configured} />;
  }

  return (
    <div className="space-y-5">
      <audio ref={audioRef} />

      {/* Tabs */}
      {isFull && (
        <div className="flex items-center gap-1 p-1 bg-surface-2 rounded-xl w-fit">
          <button
            onClick={() => setTab('my')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${tab === 'my' ? 'bg-paper text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
          >
            <Mic2 size={12} /> My Voices
          </button>
          <button
            onClick={() => setTab('library')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${tab === 'library' ? 'bg-paper text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
          >
            <Library size={12} /> Discover Library
          </button>
        </div>
      )}

      {(!isFull || tab === 'my') && (
        <div className="space-y-4">
          {!showRecorder ? (
            <div className="flex flex-wrap gap-2.5">
              {voices.map((v) => {
                const isSelected = selectedVoice?.id === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVoice(v)}
                    className={`group flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl border cursor-pointer transition-all ${isSelected ? 'bg-ink text-paper border-ink' : 'bg-paper border-border hover:border-ink/20'}`}
                  >
                    <Volume2 size={13} className={isSelected ? 'text-paper/70' : 'text-muted'} />
                    <span className="text-[11px] font-black uppercase tracking-wide max-w-[120px] truncate">{v.name}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteVoice(v.id); }}
                      className={`p-0.5 rounded-full transition-colors ${isSelected ? 'hover:bg-paper/20' : 'hover:bg-red-50 hover:text-red-500'}`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
              <button
                onClick={() => setShowRecorder(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-dashed border-ink/20 text-ink text-[11px] font-black uppercase tracking-wide hover:bg-ink/5 transition-all"
              >
                <Plus size={13} /> Clone New Voice
              </button>
            </div>
          ) : (
            <CloneRecorder onCancel={() => setShowRecorder(false)} onCloned={handleCloned} />
          )}

          {!isFull && (
            <Link href="/voice-clone" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-muted hover:text-ink uppercase tracking-wider transition-colors">
              Search 1,000+ community voices in the full studio <ArrowRight size={11} />
            </Link>
          )}
        </div>
      )}

      {isFull && tab === 'library' && (
        <LibraryBrowser selectedId={selectedVoice?.id || null} onUse={handleUseLibraryVoice} />
      )}

      {/* Text + Generate */}
      {voices.length > 0 && !showRecorder && (
        <div className="card-surface overflow-hidden border-border/60">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, CHAR_LIMIT))}
              placeholder={selectedVoice ? `Type what ${selectedVoice.name} should say…` : 'Select a voice above, then type your script…'}
              disabled={!selectedVoice}
              className="w-full min-h-[120px] px-5 py-4 text-sm text-ink placeholder:text-muted/40 bg-paper resize-none outline-none leading-relaxed disabled:opacity-50"
            />
            <span className={`absolute bottom-3 right-3 text-[9px] font-black font-mono px-2.5 py-1 rounded-full border ${counterClass}`}>
              {text.length}/{CHAR_LIMIT}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-border/60 bg-paper/50">
            <span className="text-[9px] text-muted font-bold uppercase tracking-widest truncate">
              {selectedVoice ? `Voice: ${selectedVoice.name}` : 'No voice selected'}
            </span>
            <button
              onClick={handleGenerate}
              disabled={!text.trim() || !selectedVoice || isGenerating}
              className="btn-primary !px-6 h-11 min-w-[160px] uppercase tracking-widest text-xs font-black shrink-0"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Generating…</span>
              ) : (
                <span className="flex items-center gap-2">Generate Speech <ArrowRight size={14} /></span>
              )}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between border border-red-100">
          {error}
          <button onClick={() => setError(null)} className="p-1"><X size={14} /></button>
        </div>
      )}

      {/* Generating state: shows a real ad slot while the user waits */}
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card-surface p-6 flex flex-col gap-4 border border-border/80"
          >
            <div className="flex items-center gap-3">
              <Loader2 size={18} className="animate-spin text-ink" />
              <span className="text-xs font-black uppercase tracking-wider text-ink">Cloning your voice&apos;s speech pattern…</span>
            </div>
            <p className="text-[10px] text-muted font-semibold uppercase tracking-wider">
              This usually takes a few seconds. Thanks for the patience — a quick word from our sponsors:
            </p>
            <div className="w-full flex justify-center bg-surface-2 rounded-xl overflow-hidden">
              <AdBanner type="300x250" />
            </div>
          </motion.div>
        ) : latestAudio ? (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card p-6 border-ink/20 shadow-lg relative bg-paper"
          >
            <button onClick={() => setLatestAudio(null)} className="absolute top-4 right-4 text-muted hover:text-ink p-1 rounded-full hover:bg-surface-2 transition-all">
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
              <div className="flex items-center gap-4">
                <button onClick={handlePlayPause} className="w-11 h-11 rounded-full bg-ink flex items-center justify-center text-paper shadow-md hover:scale-105 active:scale-[0.98] transition-all">
                  {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                </button>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted w-8 text-center shrink-0">{fmtTime(currentTime)}</span>
                  <div className="relative flex-1 h-1 bg-surface-2 rounded-full overflow-hidden group">
                    <div className="absolute inset-y-0 left-0 bg-ink rounded-full" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
                    <input type="range" min="0" max={duration || 0} step="0.01" value={currentTime} onChange={handleSeek} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                  <span className="text-[10px] font-mono text-muted w-8 text-center shrink-0">{fmtTime(duration)}</span>
                </div>
                <a
                  href={latestAudio.url}
                  download={`voice-clone-${latestAudio.voiceName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.mp3`}
                  className="btn-outline !py-2.5 !px-4 !rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0"
                >
                  <Download size={14} /> Download
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* History */}
      {history.length > 0 && (
        <div className="space-y-3 pt-5 border-t border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-ink">Recent Clone Generations</span>
            <button
              onClick={() => setHistory(clearCloneHistory())}
              className="text-[10px] font-bold text-muted hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2.5">
            {(isFull ? history : history.slice(0, 3)).map((item) => (
              <div key={item.id} className="card p-3.5 flex items-center justify-between gap-3 hover:border-ink/10 transition-colors bg-paper">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button
                    onClick={() => handlePlayHistory(item)}
                    className="w-8 h-8 rounded-lg bg-surface hover:bg-surface-2 border border-border flex items-center justify-center shrink-0 transition-colors"
                  >
                    <Play size={12} fill="currentColor" className="ml-0.5 text-ink" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-ink leading-snug truncate">{item.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="chip text-[9px] !px-2 !py-0.5">{item.voiceName}</span>
                      <span className="text-[9px] text-muted font-bold uppercase tracking-widest">{item.date}</span>
                    </div>
                  </div>
                </div>
                <a href={item.audioUrl} download={`voice-clone-${item.id.slice(0, 6)}.mp3`} className="btn-outline !p-2 !rounded-lg shrink-0" title="Download">
                  <Download size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {voices.length === 0 && !showRecorder && (
        <button
          onClick={() => setShowRecorder(true)}
          className="w-full card-surface p-8 flex flex-col items-center gap-3 border-dashed border-2 border-border hover:border-ink/20 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-ink group-hover:text-paper transition-all">
            <Mic2 size={20} className="text-ink group-hover:text-paper" />
          </div>
          <p className="text-xs font-black uppercase tracking-wider text-ink">Clone your first voice</p>
          <p className="text-[10px] text-muted uppercase tracking-wider font-semibold flex items-center gap-1">
            <RefreshCw size={10} /> Takes about 15 seconds
          </p>
        </button>
      )}

      {isFull && (
        <p className="text-[10px] text-muted/50 font-medium leading-relaxed flex items-center gap-1.5">
          <Sparkles size={11} /> Powered by Fish Audio&apos;s S2.1 engine · {CHAR_LIMIT} characters per generation
        </p>
      )}
    </div>
  );
}
