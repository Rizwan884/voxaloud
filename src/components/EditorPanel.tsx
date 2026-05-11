"use client";
import { Loader2, Mic, ArrowRight, SlidersHorizontal, Trash2 } from 'lucide-react';
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
    <div className="card-surface overflow-hidden shadow-sm border-border/60" id="studio">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-border/60 bg-paper/50 backdrop-blur-sm gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-black text-ink uppercase tracking-[0.15em]">
            <SlidersHorizontal size={12} className="text-muted" />
            Parameters
          </div>
          <div className="flex items-center gap-6 sm:border-l sm:border-border sm:pl-6">
            <label className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Pitch</span>
              <input type="range" min="-1" max="1" step="0.1" value={pitch}
                onChange={e => setPitch(parseFloat(e.target.value))} className="w-20 md:w-28" />
              <span className="text-[10px] font-black font-mono text-ink w-8 bg-ink/5 py-1 rounded text-center">{pitch > 0 ? `+${pitch}` : pitch}</span>
            </label>
            <label className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Speed</span>
              <input type="range" min="-1" max="1" step="0.1" value={rate}
                onChange={e => setRate(parseFloat(e.target.value))} className="w-20 md:w-28" />
              <span className="text-[10px] font-black font-mono text-ink w-8 bg-ink/5 py-1 rounded text-center">{rate > 0 ? `+${rate}` : rate}</span>
            </label>
          </div>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button 
            onClick={() => setText('')}
            className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            title="Clear text"
          >
            <Trash2 size={16} />
          </button>
          <span className={`text-[10px] font-black font-mono px-3 py-1.5 rounded-full border ${text.length > charLimit * 0.9 ? 'text-red-500 border-red-100 bg-red-50' : 'text-muted border-border bg-paper'}`}>
            {text.length.toLocaleString()} / {charLimit.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          className="w-full h-64 md:h-80 px-6 py-6 text-base md:text-lg text-ink placeholder:text-muted/30
                     bg-paper resize-none outline-none leading-relaxed font-sans"
          placeholder="Enter your script here to transform it into ultra-realistic AI speech..."
          value={text}
          onChange={e => setText(e.target.value.slice(0, charLimit))}
        />
        {text.length === 0 && (
          <div className="absolute top-6 left-6 pointer-events-none opacity-20">
            <Mic size={48} />
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 px-6 py-5 border-t border-border/60 bg-paper/50">
        {/* Selected voice chip */}
        <div className="flex items-center gap-3">
          {selectedVoice ? (
            <div className="flex items-center gap-3 bg-paper border border-border shadow-sm rounded-2xl px-4 py-2.5">
              <div className="w-8 h-8 rounded-xl bg-ink flex items-center justify-center shadow-lg shadow-ink/10">
                <Mic size={14} className="text-paper" />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-black text-ink leading-none uppercase tracking-tight truncate">{selectedVoice.name}</p>
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1 truncate">{selectedVoice.language}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-widest animate-pulse">
              <ArrowRight size={14} />
              Select a voice from the library
            </div>
          )}
        </div>

        {/* Generate button */}
        <button
          onClick={onGenerate}
          disabled={isProcessing || !text.trim()}
          className="btn-primary !px-8 !py-4 min-w-[200px] relative overflow-hidden shadow-xl shadow-ink/10 hover:shadow-2xl hover:shadow-ink/20 group"
        >
          {isProcessing ? (
            <span className="flex items-center gap-3">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm font-black uppercase tracking-widest">Generating {pct}%</span>
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <span className="text-sm font-black uppercase tracking-widest">Synthesize Audio</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
          {/* Progress underline */}
          {isProcessing && progress && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-paper/30"
              animate={{ width: `${pct}%` }}
              initial={{ width: 0 }}
            />
          )}
        </button>
      </div>
    </div>
  );
}
