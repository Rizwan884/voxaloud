"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, Mic2, Wand2, Loader2, X, LogIn, PlusCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ClonedVoice, getClonedVoices } from "@/lib/cloneStorage";
import { fmtTime } from "./engine";

const TTS_CHAR_LIMIT = 1000;

interface VoiceSourcePanelProps {
  label: string;
  duration: number;
  onFile: (file: File) => void;
  onGenerated: (blob: Blob, voiceName: string) => void;
  onClear: () => void;
}

export default function VoiceSourcePanel({ label, duration, onFile, onGenerated, onClear }: VoiceSourcePanelProps) {
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"upload" | "clone">("upload");
  const [voices] = useState<ClonedVoice[]>(() => getClonedVoices());
  const [selectedId, setSelectedId] = useState(() => getClonedVoices()[0]?.id || "");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedVoice = voices.find((v) => v.id === selectedId) || null;

  async function handleGenerate() {
    if (!text.trim() || !selectedVoice || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/voice-clone/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), referenceId: selectedVoice.id }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Speech generation failed.");
      }
      const blob = await res.blob();
      onGenerated(blob, selectedVoice.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Speech generation failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1 p-1 bg-surface-2 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all ${mode === "upload" ? "bg-paper text-ink shadow-sm" : "text-muted hover:text-ink"}`}
        >
          <Upload size={13} /> Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode("clone")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all ${mode === "clone" ? "bg-paper text-ink shadow-sm" : "text-muted hover:text-ink"}`}
        >
          <Mic2 size={13} /> Generate From My Voice
        </button>
      </div>

      {mode === "upload" && (
        <label className="flex items-center gap-3 border border-dashed border-border rounded-xl px-4 py-4 cursor-pointer hover:border-ink/30 hover:bg-surface-2/60 transition-all">
          <Upload size={16} className="text-muted shrink-0" />
          <span className="text-xs text-muted">
            Click to upload a narration audio file (MP3, WAV, M4A, AAC, OGG)
          </span>
          <input
            type="file"
            accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.webm,.flac"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFile(file);
              e.target.value = "";
            }}
          />
        </label>
      )}

      {mode === "clone" && (
        <div className="space-y-3 border border-border rounded-xl p-4 bg-surface-2/40">
          {authLoading ? (
            <div className="h-24 bg-ink/5 animate-pulse rounded-lg" />
          ) : !user ? (
            <div className="flex flex-col items-center text-center gap-2 py-4">
              <p className="text-xs font-semibold text-ink">Sign in to use your cloned voices</p>
              <p className="text-[11px] text-muted max-w-xs">
                Log in to pick from the voices you&apos;ve cloned and turn any script into narration.
              </p>
              <Link href="/login" className="btn-outline !text-[11px] !py-2 !px-4 mt-1">
                <LogIn size={12} /> Log In
              </Link>
            </div>
          ) : voices.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-2 py-4">
              <p className="text-xs font-semibold text-ink">No cloned voices yet</p>
              <p className="text-[11px] text-muted max-w-xs">
                Clone a voice first, then come back here to narrate this video with it.
              </p>
              <Link href="/voice-clone" className="btn-outline !text-[11px] !py-2 !px-4 mt-1">
                <PlusCircle size={12} /> Clone a Voice
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {voices.map((v) => (
                  <button
                    type="button"
                    key={v.id}
                    onClick={() => setSelectedId(v.id)}
                    className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold uppercase tracking-wide transition-all ${
                      selectedId === v.id ? "bg-ink text-paper border-ink" : "bg-paper border-border text-ink hover:border-ink/30"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, TTS_CHAR_LIMIT))}
                  placeholder={selectedVoice ? `Type the narration for ${selectedVoice.name}…` : "Select a voice above first…"}
                  className="field min-h-[100px] resize-none"
                />
                <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-muted/70">
                  {text.length}/{TTS_CHAR_LIMIT}
                </span>
              </div>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!text.trim() || !selectedVoice || busy}
                className="btn-primary w-full !py-2.5 text-xs uppercase tracking-wider"
              >
                {busy ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Generating Speech…
                  </>
                ) : (
                  <>
                    <Wand2 size={14} /> Generate Speech
                  </>
                )}
              </button>
            </>
          )}
          {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
        </div>
      )}

      {label && (
        <div className="flex items-center justify-between gap-3 bg-surface-2 border border-border rounded-xl px-4 py-2.5">
          <span className="text-xs text-ink font-medium truncate">
            {label} <span className="text-muted font-normal">· {fmtTime(duration)}</span>
          </span>
          <button type="button" onClick={onClear} className="p-1 text-muted hover:text-red-500 shrink-0" title="Remove voice">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
