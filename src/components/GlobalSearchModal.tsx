import React, { useState, useEffect } from 'react';
import { 
  Search, X, BookOpen, Layers, ArrowRight, Sparkles, Filter
} from 'lucide-react';
import { ALL_SURAHS } from '../data/quranSurahs';
import { ALL_PARAS } from '../data/quranParas';
import type { ViewMode } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSurah: (surahNumber: number) => void;
  onSelectJuz: (juzNumber: number) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSurah,
  onSelectJuz
}) => {
  const [query, setQuery] = useState('');
  const [indexMode, setIndexMode] = useState<ViewMode>('surah');
  const [revelationFilter, setRevelationFilter] = useState<'all' | 'Meccan' | 'Medinan'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset search when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filtered Surahs
  const filteredSurahs = ALL_SURAHS.filter((s) => {
    if (revelationFilter !== 'all' && s.revelationType !== revelationFilter) {
      return false;
    }
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      s.nameSimple.toLowerCase().includes(q) ||
      s.nameHindi.toLowerCase().includes(q) ||
      s.nameEnglish.toLowerCase().includes(q) ||
      s.number.toString() === q ||
      s.nameArabic.includes(query)
    );
  });

  // Filtered Paras
  const filteredParas = ALL_PARAS.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      p.nameHinglish.toLowerCase().includes(q) ||
      p.nameHindi.toLowerCase().includes(q) ||
      p.nameEnglish.toLowerCase().includes(q) ||
      p.number.toString() === q ||
      p.nameArabic.includes(query)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-14 px-3 sm:px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#0E3326] text-[#F6F1E5] w-full max-w-4xl rounded-3xl shadow-2xl border-2 border-[#C7A65B]/40 overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#174C3A] via-[#123E2F] to-[#0E3326] border-b border-[#C7A65B]/30">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C7A65B] to-[#9E813F] p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#174C3A] rounded-[10px] flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#C7A65B]" />
                </div>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#F6F1E5] flex items-center gap-2">
                  <span>Quran Sharif Index & Khoj (فہرست)</span>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-[#C7A65B] text-[#174C3A]">
                    114 Surah & 30 Paare
                  </span>
                </h2>
                <p className="text-[11px] text-[#DFC488]">
                  Kisi bhi Surah ya Paare par direct jaane ke liye tap karein
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-[#F6F1E5] transition-colors cursor-pointer border border-white/10"
              title="Band Karein"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#C7A65B] absolute left-3.5 top-3" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Surah ka naam, number (e.g. 36, Yaseen, Baqarah, Rahman) ya Paara khojein..."
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-2xl bg-black/40 border border-[#C7A65B]/40 focus:outline-none focus:border-[#C7A65B] focus:ring-1 focus:ring-[#C7A65B] text-[#F6F1E5] placeholder:text-[#DFC488]/50"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-2.5 text-[#DFC488]/70 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mode Switcher Tabs: 114 Surah vs 30 Paare */}
          <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-[#C7A65B]/20">
            <div className="flex items-center bg-black/30 p-1 rounded-2xl border border-[#C7A65B]/30 flex-1 sm:flex-initial">
              <button
                onClick={() => setIndexMode('surah')}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  indexMode === 'surah'
                    ? 'bg-[#C7A65B] text-[#0E3326] shadow-sm font-black'
                    : 'text-[#F6F1E5]/70 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>114 Surah (Surahs)</span>
              </button>
              <button
                onClick={() => setIndexMode('para')}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  indexMode === 'para'
                    ? 'bg-[#C7A65B] text-[#0E3326] shadow-sm font-black'
                    : 'text-[#F6F1E5]/70 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>30 Paare (Paras)</span>
              </button>
            </div>

            {/* Makki / Madani Filters (Surahs Mode Only) */}
            {indexMode === 'surah' && (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={() => setRevelationFilter('all')}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    revelationFilter === 'all'
                      ? 'bg-[#C7A65B] text-[#0E3326]'
                      : 'bg-white/5 text-[#DFC488] hover:bg-white/10'
                  }`}
                >
                  Sabhi (114)
                </button>
                <button
                  onClick={() => setRevelationFilter('Meccan')}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    revelationFilter === 'Meccan'
                      ? 'bg-[#C7A65B] text-[#0E3326]'
                      : 'bg-white/5 text-[#DFC488] hover:bg-white/10'
                  }`}
                >
                  Makki (86)
                </button>
                <button
                  onClick={() => setRevelationFilter('Medinan')}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    revelationFilter === 'Medinan'
                      ? 'bg-[#C7A65B] text-[#0E3326]'
                      : 'bg-white/5 text-[#DFC488] hover:bg-white/10'
                  }`}
                >
                  Madani (28)
                </button>
              </div>
            )}
          </div>

          {/* Mobile Filter Pills for Surahs */}
          {indexMode === 'surah' && (
            <div className="flex sm:hidden items-center gap-1.5 mt-2.5">
              <button
                onClick={() => setRevelationFilter('all')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                  revelationFilter === 'all'
                    ? 'bg-[#C7A65B] text-[#0E3326]'
                    : 'bg-white/10 text-[#DFC488]'
                }`}
              >
                Sabhi (114)
              </button>
              <button
                onClick={() => setRevelationFilter('Meccan')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                  revelationFilter === 'Meccan'
                    ? 'bg-[#C7A65B] text-[#0E3326]'
                    : 'bg-white/10 text-[#DFC488]'
                }`}
              >
                Makki (86)
              </button>
              <button
                onClick={() => setRevelationFilter('Medinan')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                  revelationFilter === 'Medinan'
                    ? 'bg-[#C7A65B] text-[#0E3326]'
                    : 'bg-white/10 text-[#DFC488]'
                }`}
              >
                Madani (28)
              </button>
            </div>
          )}

        </div>

        {/* Modal Body: Scrollable Surahs / Paras Grid (Mobile: 1-col, Tablet: 2-col, Laptop: 3-col) */}
        <div className="overflow-y-auto p-3 sm:p-5 flex-1">
          
          {indexMode === 'surah' ? (
            filteredSurahs.length === 0 ? (
              <div className="py-12 text-center text-[#DFC488]/70">
                <Search className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-bold">"{query}" naam ki koi Surah nahi mili.</p>
                <p className="text-xs mt-1">Spelling check karein ya Surah number daalein.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                {filteredSurahs.map((surah) => (
                  <button
                    key={surah.number}
                    onClick={() => {
                      onSelectSurah(surah.number);
                      onClose();
                    }}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-[#174C3A] hover:border-[#C7A65B] border border-[#C7A65B]/20 text-left transition-all cursor-pointer flex items-center justify-between group shadow-sm hover:scale-101 active:scale-98"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C7A65B] to-[#9E813F] text-[#0E3326] font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                        {surah.number}
                      </span>
                      <div className="min-w-0">
                        <div className="font-extrabold text-xs sm:text-sm text-[#F6F1E5] truncate flex items-center gap-1.5">
                          <span>{surah.nameSimple}</span>
                          <span className="text-[10px] text-[#DFC488]/80 font-normal">
                            ({surah.nameHindi})
                          </span>
                        </div>
                        <div className="text-[10px] text-[#DFC488]/80 flex items-center gap-1.5 mt-0.5">
                          <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${
                            surah.revelationType === 'Meccan' 
                              ? 'bg-amber-500/20 text-amber-300' 
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}>
                            {surah.revelationType === 'Meccan' ? 'Makki' : 'Madani'}
                          </span>
                          <span>· {surah.numberOfAyahs} Aayatein</span>
                          <span>· Paara {surah.juzNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      <span className="font-arabic text-base sm:text-lg text-[#DFC488] block group-hover:text-white transition-colors">
                        {surah.nameArabic}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )
          ) : (
            filteredParas.length === 0 ? (
              <div className="py-12 text-center text-[#DFC488]/70">
                <Search className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-bold">"{query}" naam ka koi Paara nahi mila.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {filteredParas.map((para) => (
                  <button
                    key={para.number}
                    onClick={() => {
                      onSelectJuz(para.number);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-[#174C3A] hover:border-[#C7A65B] border border-[#C7A65B]/20 text-left transition-all cursor-pointer flex items-center justify-between group shadow-sm hover:scale-101 active:scale-98"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C7A65B] to-[#9E813F] text-[#0E3326] font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                        {para.number}
                      </span>
                      <div className="min-w-0">
                        <div className="font-extrabold text-xs sm:text-sm text-[#F6F1E5] truncate">
                          Paara {para.number}: {para.nameHinglish}
                        </div>
                        <div className="text-[10px] text-[#DFC488]/80 mt-0.5">
                          {para.totalAyahs} Aayatein · Shuruat: {para.startSurah}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      <span className="font-arabic text-base sm:text-lg text-[#DFC488] block group-hover:text-white transition-colors">
                        {para.nameArabic}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )
          )}

        </div>

        {/* Modal Footer Quick Shortcuts */}
        <div className="px-4 py-3 bg-[#0A241B] border-t border-[#C7A65B]/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#DFC488]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Mashoor Suratein:</span>
            {[
              { name: 'Yaseen', num: 36 },
              { name: 'Al-Mulk', num: 67 },
              { name: 'Ar-Rahman', num: 55 },
              { name: 'Al-Kahf', num: 18 }
            ].map(item => (
              <button
                key={item.num}
                onClick={() => {
                  onSelectSurah(item.num);
                  onClose();
                }}
                className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-[#C7A65B] hover:text-[#0E3326] text-white font-semibold transition-all cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>

          <span className="text-[10px] opacity-70">
            Esc key ya ✕ dabakar band karein
          </span>
        </div>

      </div>
    </div>
  );
};
