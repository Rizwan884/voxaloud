"use client";
import { Search, ChevronDown, Play, Pause, Check, Mic2 } from 'lucide-react';
import { useState } from 'react';

interface Voice { id: string; name: string; gender: string; language: string; country: string; previewAudioPath: string; }

interface Props {
  voices: Voice[];
  filteredVoices: Voice[];
  selectedVoice: Voice | null;
  onSelectVoice: (v: Voice) => void;
  activePreview: string | null;
  onPreview: (v: Voice) => void;
  searchTerm: string;
  onSearch: (s: string) => void;
  selectedGender: 'All' | 'Male' | 'Female';
  onGender: (g: 'All' | 'Male' | 'Female') => void;
}

export default function VoicePanel({
  voices, filteredVoices, selectedVoice, onSelectVoice,
  activePreview, onPreview, searchTerm, onSearch,
  selectedGender, onGender,
}: Props) {
  return (
    <div className="card flex flex-col overflow-hidden" id="voices">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
            <Mic2 size={15} className="text-paper" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink font-display">Voice Library</p>
            <p className="text-[11px] text-muted">{voices.length} voices</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 border-b border-border space-y-2.5 bg-surface">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <input
            className="field !pl-9 !py-2 !text-[13px]"
            placeholder="Search voices..."
            value={searchTerm}
            onChange={e => onSearch(e.target.value)}
          />
        </div>
        {/* Gender tabs */}
        <div className="flex items-center gap-1 bg-surface-2 rounded-lg p-0.5">
          {(['All', 'Male', 'Female'] as const).map(g => (
            <button
              key={g}
              onClick={() => onGender(g)}
              className={`flex-1 py-1.5 text-[11px] font-semibold rounded-md transition-all ${
                selectedGender === g ? 'bg-paper text-ink shadow-sm' : 'text-muted hover:text-ink'
              }`}
            >{g}</button>
          ))}
        </div>
        </div>
      </div>

      {/* Voice list */}
      <div className="overflow-y-auto max-h-[380px] divide-y divide-border">
        {filteredVoices.length === 0 && (
          <p className="text-center text-muted text-sm py-10">No voices found.</p>
        )}
        {filteredVoices.map(voice => {
          const isSelected = selectedVoice?.id === voice.id;
          const isPreviewing = activePreview === voice.id;
          return (
            <div
              key={voice.id}
              onClick={() => onSelectVoice(voice)}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors group ${isSelected ? 'bg-ink text-paper' : 'hover:bg-surface'}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 transition-all ${isSelected ? 'bg-paper/15' : 'bg-surface-2 text-ink group-hover:bg-surface'}`}>
                  {isSelected ? <Check size={14} /> : voice.name.slice(0,2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className={`text-[13px] font-semibold truncate ${isSelected ? 'text-paper' : 'text-ink'}`}>{voice.name}</p>
                  <p className={`text-[11px] truncate ${isSelected ? 'text-paper/60' : 'text-muted'}`}>{voice.language} · {voice.gender}</p>
                </div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); onPreview(voice); }}
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${isPreviewing ? (isSelected ? 'bg-paper/20' : 'bg-ink text-paper') : (isSelected ? 'hover:bg-paper/10' : 'hover:bg-surface-2')}`}
              >
                {isPreviewing
                  ? <Pause size={13} fill="currentColor" className={isSelected ? 'text-paper' : 'text-ink'} />
                  : <Play size={13} fill="currentColor" className={isSelected ? 'text-paper' : 'text-muted'} />
                }
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
