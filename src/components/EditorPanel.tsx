"use client";

import { useState, useEffect, useRef } from 'react';
import { Loader2, Mic, ArrowRight, SlidersHorizontal, Trash2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Voice { id: string; name: string; language: string; flag?: string; gender: string; country: string; }

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
  onOpenVoicePanel: () => void;
}

export default function EditorPanel({
  text, setText, pitch, setPitch, rate, setRate,
  selectedVoice, isProcessing, progress, onGenerate, charLimit,
  onOpenVoicePanel
}: Props) {
  const pct = progress ? Math.round((progress.current / progress.total) * 100) : 0;
  
  const [pitchActive, setPitchActive] = useState(false);
  const [rateActive, setRateActive] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto focus on desktop page load (width >= 768)
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      textareaRef.current?.focus();
    }
  }, []);

  const pitchPct = ((pitch + 1) / 2) * 100;
  const ratePct = ((rate + 1) / 2) * 100;

  // Character limit alerts: 80% (amber), 95% (red)
  const charPct = text.length / charLimit;
  let counterColorClass = 'text-muted border-border bg-paper';
  if (charPct >= 0.95) {
    counterColorClass = 'text-red-600 border-red-200 bg-red-50';
  } else if (charPct >= 0.8) {
    counterColorClass = 'text-amber-600 border-amber-200 bg-amber-50';
  }

  return (
    <div className="card-surface overflow-hidden shadow-sm border-border/60 flex flex-col h-full" id="studio">
      
      {/* Parameters Header */}
      <div className="flex flex-col gap-4 px-6 py-5 border-b border-border/60 bg-paper/50 backdrop-blur-sm shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-black text-ink uppercase tracking-[0.15em]">
            <SlidersHorizontal size={12} className="text-muted" />
            Voice Settings
          </div>
          {text.length > 0 && (
            <button 
              onClick={() => setText('')}
              className="p-1 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Clear text"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>

        {/* Speed / Pitch Touch friendly Sliders */}
        <div className="grid grid-cols-2 gap-6 pt-1">
          {/* Pitch */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[9px] font-bold text-muted uppercase tracking-wider">
              <span>Pitch</span>
              <span className="font-mono font-black text-ink bg-ink/5 px-1.5 py-0.5 rounded">{pitch > 0 ? `+${pitch}` : pitch}</span>
            </div>
            <div className="relative h-8 flex items-center">
              <AnimatePresence>
                {pitchActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-8 bg-ink text-paper text-[10px] font-bold px-2 py-0.5 rounded-md -translate-x-1/2 pointer-events-none z-20"
                    style={{ left: `${pitchPct}%` }}
                  >
                    {pitch > 0 ? `+${pitch}` : pitch}
                  </motion.div>
                )}
              </AnimatePresence>
              <input 
                type="range" 
                min="-1" 
                max="1" 
                step="0.1" 
                value={pitch}
                onMouseEnter={() => setPitchActive(true)}
                onMouseLeave={() => setPitchActive(false)}
                onTouchStart={() => setPitchActive(true)}
                onTouchEnd={() => setPitchActive(false)}
                onChange={e => setPitch(parseFloat(e.target.value))} 
                className="w-full cursor-pointer h-1.5 bg-border rounded-full appearance-none outline-none"
              />
            </div>
          </div>

          {/* Speed */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[9px] font-bold text-muted uppercase tracking-wider">
              <span>Speed</span>
              <span className="font-mono font-black text-ink bg-ink/5 px-1.5 py-0.5 rounded">{rate > 0 ? `+${rate}` : rate}</span>
            </div>
            <div className="relative h-8 flex items-center">
              <AnimatePresence>
                {rateActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-8 bg-ink text-paper text-[10px] font-bold px-2 py-0.5 rounded-md -translate-x-1/2 pointer-events-none z-20"
                    style={{ left: `${ratePct}%` }}
                  >
                    {rate > 0 ? `+${rate}` : rate}
                  </motion.div>
                )}
              </AnimatePresence>
              <input 
                type="range" 
                min="-1" 
                max="1" 
                step="0.1" 
                value={rate}
                onMouseEnter={() => setRateActive(true)}
                onMouseLeave={() => setRateActive(false)}
                onTouchStart={() => setRateActive(true)}
                onTouchEnd={() => setRateActive(false)}
                onChange={e => setRate(parseFloat(e.target.value))} 
                className="w-full cursor-pointer h-1.5 bg-border rounded-full appearance-none outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Textarea container */}
      <div className="relative flex-1 min-h-[140px] md:min-h-[200px] flex flex-col">
        <textarea
          ref={textareaRef}
          className="w-full flex-1 px-6 py-5 text-sm md:text-base text-ink placeholder:text-muted/30
                     bg-paper resize-none outline-none leading-relaxed font-sans"
          placeholder="Tap to type. Enter your script here to transform it into ultra-realistic AI speech..."
          value={text}
          onChange={e => setText(e.target.value.slice(0, charLimit))}
        />
        {text.length === 0 && (
          <div className="absolute top-5 left-6 pointer-events-none opacity-[0.03]">
            <Mic size={48} />
          </div>
        )}

        {/* Character Counter positioned beneath text */}
        <div className="absolute bottom-3 right-4 z-10">
          <span className={`text-[10px] font-black font-mono px-3 py-1.5 rounded-full border shadow-sm ${counterColorClass}`}>
            {text.length.toLocaleString()} / {charLimit.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Footer bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 px-6 py-5 border-t border-border/60 bg-paper/50 shrink-0">
        
        {/* Selected voice triggering trigger */}
        <button
          onClick={onOpenVoicePanel}
          className="flex items-center justify-between bg-paper border border-border shadow-sm rounded-xl px-4 py-2.5 hover:border-ink/20 transition-all text-left group"
        >
          {selectedVoice ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-sm border border-border">
                {selectedVoice.flag || '🎙️'}
              </div>
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-black text-ink leading-none uppercase tracking-tight truncate">{selectedVoice.name}</p>
                <p className="text-[9px] text-muted font-bold uppercase tracking-widest mt-1 truncate">{selectedVoice.language}</p>
              </div>
              <ChevronDown size={14} className="text-muted group-hover:text-ink transition-colors" />
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
              Choose AI Voice
              <ChevronDown size={14} />
            </div>
          )}
        </button>

        {/* Generate button (min height 52px) */}
        <button
          onClick={onGenerate}
          disabled={isProcessing || !text.trim()}
          className="btn-primary !px-8 h-[52px] min-h-[52px] min-w-[200px] relative overflow-hidden shadow-xl shadow-ink/10 hover:shadow-2xl hover:shadow-ink/20 group uppercase tracking-widest text-xs font-black"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <span>Generating {pct}%</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>Start Generating</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
          
          {/* Progress bar inside button */}
          {isProcessing && progress && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-paper/40"
              animate={{ width: `${pct}%` }}
              initial={{ width: 0 }}
            />
          )}
        </button>
      </div>
    </div>
  );
}
