"use client";

import { useState } from 'react';
import { Mic2, Library } from 'lucide-react';
import DynamicStudio from '@/components/DynamicStudio';
import DynamicVoiceClone from '@/components/voice-clone/DynamicVoiceClone';

interface Voice { id: string; name: string; gender: string; language: string; country: string; flag?: string; }

export default function HomeStudioSwitcher({ initialVoices }: { initialVoices: Voice[] }) {
  const [mode, setMode] = useState<'clone' | 'classic'>('clone');

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-1 p-1 bg-surface-2 rounded-xl w-fit">
        <button
          onClick={() => setMode('clone')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${mode === 'clone' ? 'bg-paper text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
        >
          <Mic2 size={12} /> Clone Your Voice
          <span className="ml-0.5 bg-green-100 text-green-700 text-[8px] font-black px-1.5 py-0.5 rounded-full">NEW</span>
        </button>
        <button
          onClick={() => setMode('classic')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${mode === 'classic' ? 'bg-paper text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
        >
          <Library size={12} /> 500+ Voices
        </button>
      </div>

      {mode === 'clone' ? (
        <DynamicVoiceClone variant="compact" />
      ) : (
        <DynamicStudio initialVoices={initialVoices} />
      )}
    </div>
  );
}
