"use client";
import { Play, Pause, Square, Download, Trash2, Clock3, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AdBanner from './AdBanner';

interface AudioHistory { id: string; text: string; voiceName: string; date: string; audioUrl: string; }
interface Props {
  history: AudioHistory[];
  playingId: string | null;
  lastCreatedId: string | null;
  currentTime: number;
  duration: number;
  isAudioPlaying: boolean;
  expandedHistory: Record<string, boolean>;
  onToggleExpand: (id: string) => void;
  onPlayPause: (item: AudioHistory) => void;
  onStop: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

function fmt(t: number) {
  return `${Math.floor(t/60)}:${Math.floor(t%60).toString().padStart(2,'0')}`;
}

export default function HistoryPanel({
  history, playingId, lastCreatedId,
  currentTime, duration, isAudioPlaying, expandedHistory,
  onToggleExpand, onPlayPause, onStop, onSeek, onDelete, onClear,
}: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock3 size={16} className="text-muted" />
          <h3 className="text-[15px] font-semibold font-display text-ink">Recent Audio</h3>
          {history.length > 0 && <span className="badge">{history.length}</span>}
        </div>
        {history.length > 0 && (
          <button onClick={onClear} className="text-[11px] font-semibold text-muted hover:text-red-500 transition-colors">
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 && (
        <div className="card-surface rounded-2xl py-12 flex flex-col items-center gap-3">
          {/* Inline SVG wave illustration */}
          <svg width="48" height="36" viewBox="0 0 48 36" fill="none" className="opacity-20">
            <rect x="0" y="12" width="4" height="12" rx="2" fill="#0A0A0A"/>
            <rect x="7" y="6" width="4" height="24" rx="2" fill="#0A0A0A"/>
            <rect x="14" y="0" width="4" height="36" rx="2" fill="#0A0A0A"/>
            <rect x="21" y="8" width="4" height="20" rx="2" fill="#0A0A0A"/>
            <rect x="28" y="4" width="4" height="28" rx="2" fill="#0A0A0A"/>
            <rect x="35" y="10" width="4" height="16" rx="2" fill="#0A0A0A"/>
            <rect x="42" y="14" width="4" height="8" rx="2" fill="#0A0A0A"/>
          </svg>
          <p className="text-muted text-sm font-medium">Your generated audio will appear here</p>
        </div>
      )}

      {history.length === 0 && (
        <div className="mt-4">
          <AdBanner type="300x250" />
        </div>
      )}

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {history.map(item => {
            const isPlaying = playingId === item.id;
            const isNew = lastCreatedId === item.id;
            const expanded = expandedHistory[item.id];
            const isActive = isPlaying && isAudioPlaying;
            const pct = duration ? (currentTime / duration) * 100 : 0;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className={`card p-4 transition-all duration-200 relative ${isNew ? 'ring-2 ring-ink/10 shadow-md' : ''} ${isPlaying ? 'border-ink/20' : ''}`}
              >
                {isNew && (
                  <span className="absolute -top-2.5 left-4 bg-ink text-paper text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    New
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (!isActive) {
                        window.open('https://www.effectivecpmnetwork.com/f8mrsykx70?key=e870401b902074570e55488ba9d77bd4', '_blank');
                      }
                      onPlayPause(item);
                    }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${isActive ? 'bg-ink text-paper' : 'bg-surface hover:bg-surface-2 text-ink'}`}
                  >
                    {isActive ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-medium text-ink leading-snug ${expanded ? '' : 'line-clamp-1'}`}>{item.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="chip">{item.voiceName}</span>
                      <span className="text-[11px] text-muted">{item.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {isPlaying && (
                      <button onClick={onStop} className="btn-ghost !p-1.5" title="Stop"><Square size={14} fill="currentColor" /></button>
                    )}
                    <a 
                      href={item.audioUrl} 
                      download={`fishaudio-${item.id.slice(0,6)}.mp3`} 
                      onClick={() => {
                        window.open('https://www.effectivecpmnetwork.com/f8mrsykx70?key=e870401b902074570e55488ba9d77bd4', '_blank');
                      }}
                      className="btn-ghost !p-1.5" 
                      title="Download"
                    ><Download size={14} /></a>
                    <button onClick={() => onDelete(item.id)} className="btn-ghost !p-1.5 hover:!text-red-500" title="Delete"><Trash2 size={14} /></button>
                    {item.text.length > 60 && (
                      <button onClick={() => onToggleExpand(item.id)} className="btn-ghost !p-1.5">
                        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                {isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-border"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-muted w-8 shrink-0">{fmt(currentTime)}</span>
                      <div className="relative flex-1 h-1 bg-surface-2 rounded-full overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-ink rounded-full transition-all" style={{ width: `${pct}%` }} />
                        <input type="range" min="0" max={duration||0} step="0.01" value={currentTime}
                          onChange={onSeek} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
                      </div>
                      <span className="text-[11px] font-mono text-muted w-8 shrink-0 text-right">{fmt(duration)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
                      <span className="text-[11px] text-muted font-medium">Playing now</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {history.length > 0 && (
        <div className="mt-4">
          <AdBanner type="300x250" />
        </div>
      )}
    </section>
  );
}
