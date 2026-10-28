import React, { useState } from 'react';
import { Search, BookOpen, Layers } from 'lucide-react';
import { ALL_SURAHS } from '../data/quranSurahs';
import { ALL_PARAS } from '../data/quranParas';
import type { ViewMode } from '../types';

interface SurahParaSelectorProps {
  selectedSurah: number;
  onSelectSurah: (surahNumber: number) => void;
  selectedJuz: number;
  onSelectJuz: (juzNumber: number) => void;
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
}

export const SurahParaSelector: React.FC<SurahParaSelectorProps> = ({
  selectedSurah,
  onSelectSurah,
  selectedJuz,
  onSelectJuz,
  viewMode,
  onSetViewMode
}) => {
  const [query, setQuery] = useState('');
  const [revelationFilter, setRevelationFilter] = useState<'all' | 'Meccan' | 'Medinan'>('all');

  const filteredSurahs = ALL_SURAHS.filter(
    (s) => {
      if (revelationFilter !== 'all' && s.revelationType !== revelationFilter) {
        return false;
      }
      return (
        s.nameSimple.toLowerCase().includes(query.toLowerCase()) ||
        s.nameHindi.toLowerCase().includes(query.toLowerCase()) ||
        s.nameEnglish.toLowerCase().includes(query.toLowerCase()) ||
        s.number.toString() === query.trim() ||
        s.nameArabic.includes(query)
      );
    }
  );

  const filteredParas = ALL_PARAS.filter(
    (p) =>
      p.nameHinglish.toLowerCase().includes(query.toLowerCase()) ||
      p.nameHindi.toLowerCase().includes(query.toLowerCase()) ||
      p.nameEnglish.toLowerCase().includes(query.toLowerCase()) ||
      p.number.toString() === query.trim() ||
      p.nameArabic.includes(query)
  );

  return (
    <div className="bg-[#FBF8F1] rounded-3xl border border-[#C7A65B]/30 p-4 sm:p-5 shadow-sm sticky top-22">
      
      {/* Tab Switcher (Hinglish) */}
      <div className="flex rounded-2xl bg-[#174C3A]/10 p-1 mb-4">
        <button
          onClick={() => onSetViewMode('surah')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            viewMode === 'surah'
              ? 'bg-[#174C3A] text-[#F6F1E5] shadow-sm'
              : 'text-[#174C3A] hover:bg-white/50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#C7A65B]" />
          <span>114 Surah (Surahs)</span>
        </button>
        <button
          onClick={() => onSetViewMode('para')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            viewMode === 'para'
              ? 'bg-[#174C3A] text-[#F6F1E5] shadow-sm'
              : 'text-[#174C3A] hover:bg-white/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#C7A65B]" />
          <span>30 Paare (Paras)</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-2.5">
        <Search className="w-4 h-4 text-[#C7A65B] absolute left-3 top-2.5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={viewMode === 'surah' ? 'Surah ka naam ya number search karein...' : 'Paara number ya naam search karein...'}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#C7A65B]/30 focus:outline-none focus:ring-2 focus:ring-[#174C3A]/30 text-[#26342D]"
        />
      </div>

      {/* Surah Makki / Madani Filters */}
      {viewMode === 'surah' && (
        <div className="flex items-center gap-1.5 mb-2.5">
          <button
            onClick={() => setRevelationFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              revelationFilter === 'all'
                ? 'bg-[#174C3A] text-[#DFC488]'
                : 'bg-white text-[#4B5B53] hover:bg-[#F6F1E5]'
            }`}
          >
            Sabhi (114)
          </button>
          <button
            onClick={() => setRevelationFilter('Meccan')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              revelationFilter === 'Meccan'
                ? 'bg-[#174C3A] text-[#DFC488]'
                : 'bg-white text-[#4B5B53] hover:bg-[#F6F1E5]'
            }`}
          >
            Makki (86)
          </button>
          <button
            onClick={() => setRevelationFilter('Medinan')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              revelationFilter === 'Medinan'
                ? 'bg-[#174C3A] text-[#DFC488]'
                : 'bg-white text-[#4B5B53] hover:bg-[#F6F1E5]'
            }`}
          >
            Madani (28)
          </button>
        </div>
      )}

      {/* List Container */}
      <div className="max-h-[580px] overflow-y-auto space-y-1.5 pr-1">
        {viewMode === 'surah' ? (
          filteredSurahs.map((surah) => {
            const isSelected = selectedSurah === surah.number;
            return (
              <button
                key={surah.number}
                onClick={() => onSelectSurah(surah.number)}
                className={`w-full text-left p-2.5 rounded-2xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#174C3A] text-[#F6F1E5] font-semibold shadow-md ring-1 ring-[#C7A65B]'
                    : 'bg-white hover:bg-[#F6F1E5] text-[#26342D] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-7 h-7 rounded-xl text-[11px] font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#C7A65B] text-[#174C3A]'
                        : 'bg-[#174C3A]/10 text-[#174C3A]'
                    }`}
                  >
                    {surah.number}
                  </span>
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span>{surah.nameSimple}</span>
                      <span className="text-[10px] opacity-80 font-normal">
                        ({surah.nameHindi})
                      </span>
                    </div>
                    <div className="text-[10px] opacity-75">
                      {surah.revelationType === 'Meccan' ? 'Makki' : 'Madani'} · {surah.numberOfAyahs} Aayatein
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-arabic text-base block">{surah.nameArabic}</span>
                  <span className="text-[10px] opacity-70">Paara {surah.juzNumber}</span>
                </div>
              </button>
            );
          })
        ) : (
          filteredParas.map((para) => {
            const isSelected = selectedJuz === para.number;
            return (
              <button
                key={para.number}
                onClick={() => onSelectJuz(para.number)}
                className={`w-full text-left p-3 rounded-2xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#174C3A] text-[#F6F1E5] font-semibold shadow-md ring-1 ring-[#C7A65B]'
                    : 'bg-white hover:bg-[#F6F1E5] text-[#26342D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-7 h-7 rounded-xl text-[11px] font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#C7A65B] text-[#174C3A]'
                        : 'bg-[#174C3A]/10 text-[#174C3A]'
                    }`}
                  >
                    {para.number}
                  </span>
                  <div>
                    <div className="font-bold">{para.nameHinglish} ({para.nameHindi})</div>
                    <div className="text-[10px] opacity-75">
                      {para.totalAyahs} Aayatein · Shuruat: {para.startSurah}
                    </div>
                  </div>
                </div>

                <div className="text-right font-arabic text-base">
                  {para.nameArabic}
                </div>
              </button>
            );
          })
        )}
      </div>

    </div>
  );
};
