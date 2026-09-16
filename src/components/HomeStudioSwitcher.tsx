"use client";

import { useState } from 'react';
import { Mic2, Library, Sparkles } from 'lucide-react';
import DynamicStudio from '@/components/DynamicStudio';
import DynamicVoiceClone from '@/components/voice-clone/DynamicVoiceClone';

interface Voice { 
  id: string; 
  name: string; 
  gender: string; 
  language: string; 
  country: string; 
  flag?: string; 
}

export default function HomeStudioSwitcher({ initialVoices }: { initialVoices: Voice[] }) {
  const [mode, setMode] = useState<'clone' | 'classic'>('clone');

  return (
    <div className="space-y-4 w-full">
      {/* Segmented Mode Selector */}
      <div className="flex items-center justify-between gap-2 p-1.5 bg-surface-2 rounded-2xl border border-border w-fit max-w-full overflow-x-auto shadow-xs">
        <button
          type="button"
          onClick={() => setMode('clone')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
            mode === 'clone' 
              ? 'bg-surface text-ink shadow-xs border border-border/80' 
              : 'text-muted hover:text-ink'
          }`}
        >
          <Mic2 size={13} className={mode === 'clone' ? 'text-accent' : 'text-muted'} />
          <span>Clone Your Voice</span>
          <span className="bg-accent-light text-accent-text text-[9px] font-bold px-2 py-0.5 rounded-full border border-accent-subtle">
            Instant
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMode('classic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
            mode === 'classic' 
              ? 'bg-surface text-ink shadow-xs border border-border/80' 
              : 'text-muted hover:text-ink'
          }`}
        >
          <Library size={13} className={mode === 'classic' ? 'text-accent' : 'text-muted'} />
          <span>500+ Ready Voices</span>
          <span className="text-[10px] text-muted font-normal">75+ Langs</span>
        </button>
      </div>

      {/* Render Active Studio */}
      <div className="card-elevated p-1 sm:p-2">
        {mode === 'clone' ? (
          <DynamicVoiceClone variant="compact" />
        ) : (
          <DynamicStudio initialVoices={initialVoices} />
        )}
      </div>
    </div>
  );
}
