"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Play, Pause, Loader2, Heart, PlusCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PublicVoice {
  id: string;
  title: string;
  description: string;
  languages: string[];
  likeCount: number;
  taskCount: number;
  author: string;
  sampleText: string;
  sampleAudioUrl: string | null;
}

interface Props {
  selectedId: string | null;
  onUse: (voice: PublicVoice) => void;
}

// Fish Audio doesn't expose a public CDN URL for its voice cover images, so
// each card gets a deterministic avatar instead — same voice always gets the
// same color + initials, and it never 404s like a hotlinked image could.
const AVATAR_PALETTE = [
  'bg-blue-50 text-blue-700',
  'bg-rose-50 text-rose-700',
  'bg-amber-50 text-amber-700',
  'bg-emerald-50 text-emerald-700',
  'bg-violet-50 text-violet-700',
  'bg-cyan-50 text-cyan-700',
  'bg-orange-50 text-orange-700',
  'bg-slate-100 text-slate-700',
];

function avatarClass(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

function initials(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function LibraryBrowser({ selectedId, onUse }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PublicVoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/voice-clone/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.items || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), query ? 400 : 0);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, search]);

  const togglePreview = (voice: PublicVoice) => {
    if (!voice.sampleAudioUrl || !audioRef.current) return;
    if (playingId === voice.id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      audioRef.current.src = voice.sampleAudioUrl;
      audioRef.current.play();
      setPlayingId(voice.id);
    }
  };

  return (
    <div className="space-y-4">
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} />

      <div className="relative group">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-ink transition-colors pointer-events-none" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 1M+ community voices — try “narrator”, “calm female”, “deep male”…"
          className="field !pl-10 !py-3 !text-xs !rounded-xl"
        />
      </div>

      {loading && results.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={22} className="animate-spin text-muted" />
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search size={28} className="text-muted/20 mb-3" />
          <p className="text-xs font-black text-muted uppercase tracking-widest">No voices found</p>
          <p className="text-[10px] text-muted/60 mt-1 uppercase">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto scrollbar-thin pr-1">
          {results.map((voice) => {
            const isSelected = selectedId === voice.id;
            const isPlaying = playingId === voice.id;
            return (
              <motion.div
                key={voice.id}
                layout
                className={`card p-4 flex flex-col gap-3 transition-all ${isSelected ? 'border-ink/30 ring-2 ring-ink/5' : 'hover:border-ink/10'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[11px] font-black border border-black/5 ${avatarClass(voice.id)}`}>
                      {initials(voice.title)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-tight text-ink truncate">{voice.title}</p>
                      <p className="text-[9px] text-muted font-bold uppercase tracking-widest mt-1">
                        {voice.languages.join(', ') || 'Multilingual'} · by {voice.author}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePreview(voice)}
                    disabled={!voice.sampleAudioUrl}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${isPlaying ? 'bg-ink border-ink text-paper' : 'bg-surface border-border hover:border-ink/20'} disabled:opacity-30`}
                  >
                    {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
                  </button>
                </div>

                {voice.description && (
                  <p className="text-[11px] text-muted leading-relaxed line-clamp-2">{voice.description}</p>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1 text-[9px] text-muted/60 font-bold uppercase tracking-widest">
                    <Heart size={10} /> {voice.likeCount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => onUse(voice)}
                    className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${isSelected ? 'bg-ink/5 text-ink' : 'text-muted hover:text-ink hover:bg-surface-2'}`}
                  >
                    {isSelected ? <><CheckCircle2 size={12} /> Selected</> : <><PlusCircle size={12} /> Use Voice</>}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
