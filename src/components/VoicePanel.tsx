"use client";

import { useState, useMemo } from 'react';
import { Search, Play, Pause, Mic2, Loader2, Globe, Filter, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Voice { id: string; name: string; gender: string; language: string; country: string; flag?: string; }

interface Props {
  isOpen: boolean;
  onClose: () => void;
  voices: Voice[];
  selectedVoice: Voice | null;
  onSelectVoice: (v: Voice) => void;
  activePreview: string | null;
  loadingPreviewId: string | null;
  onPreview: (v: Voice) => void;
}

// Dynamically assign style to voices based on ID hash for consistent filtering
const getStyleForVoice = (id: string) => {
  const num = id.split('-')[1] ? parseInt(id.split('-')[1], 10) : 0;
  const styles = ['Narrator', 'Conversational', 'Ads', 'Character'];
  return styles[num % styles.length];
};

export default function VoicePanel({
  isOpen, onClose, voices, selectedVoice, onSelectVoice,
  activePreview, loadingPreviewId, onPreview
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<'All' | 'Male' | 'Female'>('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState<'All' | 'Narrator' | 'Conversational' | 'Ads' | 'Character'>('All');

  // Compute unique languages dynamically
  const uniqueLanguages = useMemo(() => {
    return Array.from(new Set(voices.map(v => v.language))).sort();
  }, [voices]);

  // Dynamic Filtering in JS
  const filteredVoices = useMemo(() => {
    return voices.filter(v => {
      const style = getStyleForVoice(v.id);
      const matchSearch = 
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        v.language.toLowerCase().includes(searchTerm.toLowerCase()) || 
        v.country.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchGender = selectedGender === 'All' || v.gender.toLowerCase() === selectedGender.toLowerCase();
      const matchLang = selectedLanguage === 'All' || v.language === selectedLanguage;
      const matchStyle = selectedStyle === 'All' || style === selectedStyle;

      return matchSearch && matchGender && matchLang && matchStyle;
    }).sort((a, b) => {
      // Keep selected voice at top
      if (a.id === selectedVoice?.id) return -1;
      if (b.id === selectedVoice?.id) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [voices, searchTerm, selectedGender, selectedLanguage, selectedStyle, selectedVoice]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-ink/40 backdrop-blur-sm" 
          onClick={onClose} 
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative bg-paper w-full sm:max-w-3xl h-[85vh] sm:h-[80vh] flex flex-col overflow-hidden 
                     rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl border-t sm:border border-border bottom-0 sm:bottom-auto fixed sm:relative"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-border/60 bg-paper/50 backdrop-blur-sm shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center shadow-lg shadow-ink/10">
                <Mic2 size={16} className="text-paper" />
              </div>
              <div>
                <p className="text-xs font-black text-ink uppercase tracking-tight">Voice Library</p>
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5">
                  {voices.length === 0 ? 'Syncing...' : `${voices.length} Premium Voices Available`}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 text-muted hover:text-ink hover:bg-surface-2 rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search & Filters */}
          <div className="p-6 border-b border-border/60 bg-paper/30 shrink-0 space-y-4">
            <div className="relative group">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-ink transition-colors pointer-events-none" />
              <input
                className="field !pl-10 !py-3 !text-xs !rounded-xl !bg-paper shadow-inner-sm border-border/40 focus:border-ink/20"
                placeholder="Search by name, language, or country..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* Language */}
              <div className="relative">
                <Globe size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <select 
                  className="field !pl-8 !py-2.5 !text-[10px] !font-black !uppercase !tracking-wider !bg-paper border-border/40"
                  value={selectedLanguage}
                  onChange={e => setSelectedLanguage(e.target.value)}
                >
                  <option value="All">Languages</option>
                  {uniqueLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Gender */}
              <div className="relative">
                <Filter size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <select 
                  className="field !pl-8 !py-2.5 !text-[10px] !font-black !uppercase !tracking-wider !bg-paper border-border/40"
                  value={selectedGender}
                  onChange={e => setSelectedGender(e.target.value as 'All' | 'Male' | 'Female')}
                >
                  <option value="All">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Style */}
              <div className="relative">
                <Sparkles size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <select 
                  className="field !pl-8 !py-2.5 !text-[10px] !font-black !uppercase !tracking-wider !bg-paper border-border/40"
                  value={selectedStyle}
                  onChange={e => setSelectedStyle(e.target.value as 'All' | 'Narrator' | 'Conversational' | 'Ads' | 'Character')}
                >
                  <option value="All">Styles</option>
                  <option value="Narrator">Narrator</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Ads">Ads</option>
                  <option value="Character">Character</option>
                </select>
              </div>
            </div>
          </div>

          {/* Voice list grid */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/40 scrollbar-thin">
            {filteredVoices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                <Search size={32} className="text-muted/20 mb-4" />
                <p className="text-xs font-black text-muted uppercase tracking-widest">No voices found</p>
                <p className="text-[10px] text-muted/60 mt-1 uppercase">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:gap-px bg-border/20">
                {filteredVoices.map(voice => {
                  const isSelected = selectedVoice?.id === voice.id;
                  const isPreviewing = activePreview === voice.id;
                  const voiceStyle = getStyleForVoice(voice.id);

                  return (
                    <div
                      key={voice.id}
                      onClick={() => {
                        onSelectVoice(voice);
                        onClose();
                      }}
                      className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-all duration-150 relative bg-paper hover:bg-surface-2 ${isSelected ? 'bg-ink/5 border-l-4 border-ink' : 'border-l-4 border-transparent'}`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border border-border/60 bg-paper shadow-sm`}>
                          {voice.flag || voice.name.slice(0,2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black uppercase tracking-tight text-ink flex items-center gap-1.5 truncate">
                            {voice.name}
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-ink shrink-0" />}
                          </p>
                          <p className="text-[10px] font-bold uppercase tracking-widest mt-1 text-muted truncate">
                            {voice.language} · {voice.gender} · {voiceStyle}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={e => { e.stopPropagation(); onPreview(voice); }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all border shadow-sm ${isPreviewing ? 'bg-ink border-ink text-paper' : 'bg-paper border-border/40 hover:border-ink/20'}`}
                      >
                        {loadingPreviewId === voice.id ? (
                          <Loader2 size={14} className="animate-spin text-ink" />
                        ) : isPreviewing ? (
                          <Pause size={14} fill="currentColor" className="text-paper" />
                        ) : (
                          <Play size={14} fill="currentColor" className="text-muted hover:text-ink" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
