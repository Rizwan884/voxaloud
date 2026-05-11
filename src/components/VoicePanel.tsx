"use client";
import { Search, Play, Pause, Check, Mic2, Loader2, Globe, Filter } from 'lucide-react';

interface Voice { id: string; name: string; gender: string; language: string; country: string; flag?: string; }

interface Props {
  voices: Voice[];
  filteredVoices: Voice[];
  selectedVoice: Voice | null;
  isLoading: boolean;
  onSelectVoice: (v: Voice) => void;
  activePreview: string | null;
  loadingPreviewId: string | null;
  onPreview: (v: Voice) => void;
  searchTerm: string;
  onSearch: (s: string) => void;
  selectedGender: 'All' | 'Male' | 'Female';
  onGender: (g: 'All' | 'Male' | 'Female') => void;
  selectedLanguage: string;
  onLanguage: (l: string) => void;
  selectedCountry: string;
  onCountry: (c: string) => void;
  uniqueLanguages: string[];
  uniqueCountries: string[];
}

export default function VoicePanel({
  voices, filteredVoices, selectedVoice, isLoading, onSelectVoice,
  activePreview, loadingPreviewId, onPreview, searchTerm, onSearch,
  selectedGender, onGender, selectedLanguage, onLanguage,
  selectedCountry, onCountry, uniqueLanguages, uniqueCountries
}: Props) {
  return (
    <div className="card-surface flex flex-col overflow-hidden shadow-sm border-border/60 h-[600px]" id="voices">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border/60 bg-paper/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center shadow-lg shadow-ink/10">
              <Mic2 size={16} className="text-paper" />
            </div>
            <div>
              <p className="text-xs font-black text-ink uppercase tracking-tight">Voice Library</p>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5">
                {isLoading && voices.length === 0 ? 'Syncing...' : `${voices.length} Premium Voices`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-6 border-b border-border/60 space-y-4 bg-paper/30">
        <div className="relative group">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-ink transition-colors pointer-events-none" />
          <input
            className="field !pl-10 !py-3 !text-xs !rounded-2xl !bg-paper shadow-inner-sm border-border/40 focus:border-ink/20"
            placeholder="Search by name or language..."
            value={searchTerm}
            onChange={e => onSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Globe size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <select 
              className="field !pl-8 !py-2 !text-[10px] !font-black !uppercase !tracking-wider !bg-paper border-border/40"
              value={selectedLanguage}
              onChange={e => onLanguage(e.target.value)}
            >
              <option value="All">Languages</option>
              {uniqueLanguages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="relative">
            <Filter size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <select 
              className="field !pl-8 !py-2 !text-[10px] !font-black !uppercase !tracking-wider !bg-paper border-border/40"
              value={selectedGender}
              onChange={e => onGender(e.target.value as any)}
            >
              <option value="All">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>

      {/* Voice list */}
      <div className="flex-1 overflow-y-auto divide-y divide-border/40 scrollbar-thin">
        {isLoading && voices.length === 0 ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 animate-pulse">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-ink/5 shrink-0" />
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-ink/5 rounded-full" />
                  <div className="h-2 w-32 bg-ink/5 rounded-full opacity-50" />
                </div>
              </div>
            </div>
          ))
        ) : filteredVoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <Search size={32} className="text-muted/20 mb-4" />
            <p className="text-xs font-black text-muted uppercase tracking-widest">No voices found</p>
            <p className="text-[10px] text-muted/60 mt-1 uppercase">Try adjusting your filters</p>
          </div>
        ) : (
          filteredVoices.map(voice => {
            const isSelected = selectedVoice?.id === voice.id;
            const isPreviewing = activePreview === voice.id;
            return (
              <div
                key={voice.id}
                onClick={() => onSelectVoice(voice)}
                className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-all duration-200 group relative ${isSelected ? 'bg-ink' : 'hover:bg-surface'}`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-ink shadow-[4px_0_12px_rgba(0,0,0,0.1)]" />
                )}
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-all shadow-sm ${isSelected ? 'bg-paper/10 text-paper border border-paper/20' : 'bg-paper text-ink border border-border/40 group-hover:border-ink/10'}`}>
                    {isSelected ? <Check size={16} className="text-paper" /> : (voice.flag || voice.name.slice(0,2).toUpperCase())}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-black uppercase tracking-tight truncate ${isSelected ? 'text-paper' : 'text-ink'}`}>{voice.name}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 truncate ${isSelected ? 'text-paper/40' : 'text-muted'}`}>
                      {voice.language} · {voice.gender}
                    </p>
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); onPreview(voice); }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all border shadow-sm ${isPreviewing ? (isSelected ? 'bg-paper/20 border-paper/30' : 'bg-ink border-ink text-paper') : (isSelected ? 'bg-paper/10 border-paper/10 hover:bg-paper/20' : 'bg-paper border-border/40 hover:border-ink/20 hover:bg-surface-2')}`}
                >
                  {loadingPreviewId === voice.id ? (
                    <Loader2 size={14} className={`animate-spin ${isSelected ? 'text-white' : 'text-ink'}`} />
                  ) : isPreviewing ? (
                    <Pause size={14} fill="currentColor" className={isSelected ? 'text-paper' : 'text-ink'} />
                  ) : (
                    <Play size={14} fill="currentColor" className={isSelected ? 'text-paper' : 'text-muted'} />
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
