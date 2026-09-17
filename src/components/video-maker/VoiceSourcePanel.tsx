"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, LogIn, PlusCircle, Loader2, CheckCircle2, History, Volume2, Play, Pause } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ClonedVoice, getClonedVoices, saveClonedVoice } from "@/lib/cloneStorage";

export interface SelectedVoice {
  id: string;
  name: string;
}

interface PublicVoice {
  id: string;
  title: string;
  languages: string[];
  author: string;
  sampleAudioUrl: string | null;
}

export const LAST_VOICE_STORAGE = "shad_video_maker_last_voice";

export function readLastUsedVoice(): SelectedVoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_VOICE_STORAGE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

interface VoiceSourcePanelProps {
  selectedVoice: SelectedVoice | null;
  onSelectVoice: (voice: SelectedVoice) => void;
  onClearVoice: () => void;
}

export default function VoiceSourcePanel({ selectedVoice, onSelectVoice, onClearVoice }: VoiceSourcePanelProps) {
  const { user, loading: authLoading } = useAuth();
  const [myVoices, setMyVoices] = useState<ClonedVoice[]>(() => getClonedVoices());
  const [query, setQuery] = useState("");
  const [publicResults, setPublicResults] = useState<PublicVoice[]>([]);
  const [searching, setSearching] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastUsed = readLastUsedVoice();

  useEffect(() => {
    if (!user) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/voice-clone/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setPublicResults(data.items || []);
      } catch {
        setPublicResults([]);
      } finally {
        setSearching(false);
      }
    }, query ? 400 : 0);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, user]);

  if (authLoading) return <div className="h-24 bg-ink/5 animate-pulse rounded-xl" />;

  if (!user) {
    return (
      <div className="flex flex-col items-center text-center gap-2 py-6 border border-border rounded-xl bg-surface-2/40">
        <p className="text-xs font-semibold text-ink">Sign in to use your cloned voices</p>
        <p className="text-[11px] text-muted max-w-xs">
          Log in to search your voices and the community library to narrate this video.
        </p>
        <Link href="/login" className="btn-outline !text-[11px] !py-2 !px-4 mt-1">
          <LogIn size={12} /> Log In
        </Link>
      </div>
    );
  }

  const myMatches = query ? myVoices.filter((v) => v.name.toLowerCase().includes(query.toLowerCase())) : myVoices;
  const publicMatches = publicResults.filter((p) => !myVoices.some((v) => v.id === p.id));

  function handlePickMine(voice: ClonedVoice) {
    onSelectVoice({ id: voice.id, name: voice.name });
  }

  function handlePickPublic(voice: PublicVoice) {
    const cloned: ClonedVoice = { id: voice.id, name: voice.title, createdAt: new Date().toISOString(), source: "library" };
    setMyVoices(saveClonedVoice(cloned));
    onSelectVoice({ id: voice.id, name: voice.title });
  }

  function togglePreview(voice: PublicVoice) {
    if (!voice.sampleAudioUrl || !audioRef.current) return;
    if (playingId === voice.id) {
      audioRef.current.pause();
      setPlayingId(null);
      return;
    }
    audioRef.current.src = voice.sampleAudioUrl;
    audioRef.current.play();
    setPlayingId(voice.id);
  }

  return (
    <div className="space-y-3">
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} />

      {selectedVoice ? (
        <div className="flex items-center justify-between gap-3 bg-ink text-paper rounded-xl px-4 py-2.5">
          <span className="text-xs font-semibold flex items-center gap-2 truncate">
            <Volume2 size={13} className="shrink-0" /> Narrating with <span className="uppercase">{selectedVoice.name}</span>
          </span>
          <button onClick={onClearVoice} className="text-[10px] font-bold uppercase tracking-wider text-paper/70 hover:text-paper shrink-0">
            Change
          </button>
        </div>
      ) : (
        lastUsed && (
          <button
            type="button"
            onClick={() => onSelectVoice(lastUsed)}
            className="w-full flex items-center justify-between gap-2 border border-dashed border-border rounded-xl px-4 py-2.5 hover:border-ink/30 hover:bg-surface-2/60 transition-all"
          >
            <span className="text-[11px] text-muted flex items-center gap-1.5">
              <History size={12} /> Last used: <span className="font-semibold text-ink">{lastUsed.name}</span>
            </span>
            <span className="text-[10px] font-bold text-accent">Use again</span>
          </button>
        )
      )}

      <div className="relative">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your voices or the community library…"
          className="field !pl-9"
        />
      </div>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {myMatches.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[9px] font-black uppercase tracking-widest text-muted">My Voices</p>
            <div className="flex flex-wrap gap-1.5">
              {myMatches.map((v) => {
                const isSelected = selectedVoice?.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => handlePickMine(v)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-bold uppercase tracking-wide transition-all ${
                      isSelected ? "bg-ink text-paper border-ink" : "bg-paper border-border text-ink hover:border-ink/30"
                    }`}
                  >
                    {isSelected && <CheckCircle2 size={12} />}
                    {v.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {(searching || publicMatches.length > 0) && (
          <div className="space-y-1.5">
            <p className="text-[9px] font-black uppercase tracking-widest text-muted flex items-center gap-1.5">
              Community Library {searching && <Loader2 size={10} className="animate-spin" />}
            </p>
            <div className="space-y-1.5">
              {publicMatches.map((v) => {
                const isSelected = selectedVoice?.id === v.id;
                const isPlaying = playingId === v.id;
                return (
                  <div
                    key={v.id}
                    className={`flex items-center gap-2 px-2 py-2 rounded-lg border transition-all ${
                      isSelected ? "bg-ink text-paper border-ink" : "bg-paper border-border hover:border-ink/30"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => togglePreview(v)}
                      disabled={!v.sampleAudioUrl}
                      title={v.sampleAudioUrl ? "Preview voice sample" : "No preview available"}
                      className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border transition-all disabled:opacity-30 ${
                        isPlaying
                          ? "bg-accent border-accent text-white"
                          : isSelected
                          ? "border-paper/30 text-paper hover:border-paper/60"
                          : "border-border text-muted hover:border-ink/30"
                      }`}
                    >
                      {isPlaying ? <Pause size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" className="ml-0.5" />}
                    </button>
                    <button type="button" onClick={() => handlePickPublic(v)} className="flex-1 min-w-0 flex items-center justify-between gap-2 text-left">
                      <span className="min-w-0">
                        <span className="block text-[11px] font-bold uppercase tracking-wide truncate">{v.title}</span>
                        <span className={`block text-[9px] truncate ${isSelected ? "text-paper/60" : "text-muted"}`}>
                          {v.languages.join(", ") || "Multilingual"} · by {v.author}
                        </span>
                      </span>
                      {isSelected ? <CheckCircle2 size={14} className="shrink-0" /> : <PlusCircle size={14} className="shrink-0 text-muted" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {myMatches.length === 0 && !searching && publicMatches.length === 0 && (
          <p className="text-[11px] text-muted py-2">No voices found for &quot;{query}&quot;.</p>
        )}
      </div>

      {myVoices.length === 0 && (
        <Link href="/voice-clone" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-muted hover:text-ink uppercase tracking-wider">
          <PlusCircle size={11} /> Clone your first voice
        </Link>
      )}
    </div>
  );
}
