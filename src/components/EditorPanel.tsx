"use client";
import { Loader2, Mic, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

interface Voice { id: string; name: string; language: string; }
interface Props {
  text: string;
  setText: (t: string) => void;
  pitch: number;
  setPitch: (p: number) => void;
  rate: number;
  setRate: (r: number) => void;
  selectedVoice: Voice | null;
  isProcessing: boolean;
  progress: { current: number; total: number } | null;
  onGenerate: () => void;
  charLimit: number;
}

export default function EditorPanel({
  text, setText, pitch, setPitch, rate, setRate,
  selectedVoice, isProcessing, progress, onGenerate, charLimit,
}: Props) {
  const pct = progress ? Math.round((progress.current / progress.total) * 100) : 0;

  return (
    <div className="card overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 border-b border-border bg-surface gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted uppercase tracking-wide">
            <SlidersHorizontal size={12} />
            Controls
          </div>
          <div className="flex items-center gap-4 sm:border-l sm:border-border sm:pl-4">
            <label className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-muted">Pitch</span>
              <input type="range" min="-1" max="1" step="0.1" value={pitch}
                onChange={e => setPitch(parseFloat(e.target.value))} className="w-16 sm:w-20" />
              <span className="text-[11px] font-mono text-muted w-6">{pitch > 0 ? `+${pitch}` : pitch}</span>
            </label>
            <label className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-muted">Speed</span>
              <input type="range" min="-1" max="1" step="0.1" value={rate}
                onChange={e => setRate(parseFloat(e.target.value))} className="w-16 sm:w-20" />
              <span className="text-[11px] font-mono text-muted w-6">{rate > 0 ? `+${rate}` : rate}</span>
            </label>
          </div>
        </div>
        <span className={`text-[11px] font-mono font-semibold tabular-nums text-right ${text.length > charLimit * 0.9 ? 'text-red-500' : 'text-muted'}`}>
          {text.length.toLocaleString()} / {charLimit.toLocaleString()}
        </span>
      </div>

      {/* Textarea */}
      <textarea
        className="w-full h-52 md:h-64 px-5 py-4 text-base text-ink placeholder:text-muted/50
                   bg-paper resize-none outline-none leading-relaxed font-sans"
        placeholder="Type or paste your script here…"
        value={text}
        onChange={e => setText(e.target.value.slice(0, charLimit))}
      />

      {/* Footer bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 py-4 border-t border-border bg-surface">
        {/* Selected voice chip */}
        <div className="flex items-center gap-2.5">
          {selectedVoice ? (
            <div className="flex items-center gap-2 bg-paper border border-border rounded-xl px-3 py-2">
              <div className="w-6 h-6 rounded-lg bg-ink flex items-center justify-center">
                <Mic size={11} className="text-paper" />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-ink leading-tight">{selectedVoice.name}</p>
                <p className="text-[10px] text-muted leading-tight">{selectedVoice.language}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted italic">Select a voice →</p>
          )}
        </div>

        {/* Generate button */}
        <button
          onClick={onGenerate}
          disabled={isProcessing || !text.trim()}
          className="btn-primary !px-6 !py-3 min-w-[160px] relative overflow-hidden"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Loader2 size={15} className="animate-spin" />
              <span className="text-[13px]">{pct}%</span>
              <span className="text-[13px]">Generating</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span className="text-[13px] font-semibold">Generate Audio</span>
              <ArrowRight size={15} />
            </span>
          )}
          {/* Progress underline */}
          {isProcessing && progress && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-paper/40"
              animate={{ width: `${pct}%` }}
              initial={{ width: 0 }}
            />
          )}
        </button>
      </div>
    </div>
  );
}
