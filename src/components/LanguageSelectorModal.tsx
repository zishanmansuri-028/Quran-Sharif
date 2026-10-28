import React, { useState } from 'react';
import { X, Globe, Check, Sparkles, Search } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { INDIAN_LANGUAGES_LIST } from '../data/indianLanguagesData';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedLanguage,
  onSelectLanguage
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = INDIAN_LANGUAGES_LIST.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
    l.hinglishSpelling.toLowerCase().includes(search.toLowerCase()) ||
    l.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-emerald-950 w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-[#C7A65B]/40 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#174C3A] to-[#0E3326] text-[#F6F1E5] flex items-center justify-between border-b border-[#C7A65B]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C7A65B] to-[#9E813F] p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-[#174C3A] rounded-[10px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#C7A65B]" />
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#F6F1E5] flex items-center gap-2">
                <span>All Indian Languages</span>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-[#C7A65B] text-[#174C3A]">
                  Spelling Hinglish
                </span>
              </h2>
              <p className="text-[11px] text-[#DFC488]">
                Bhasha chunein: Native script + Hinglish spelling ke sath
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#F6F1E5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-[#C7A65B]/20 bg-[#FBF8F1] dark:bg-emerald-900/20">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-800/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search language (e.g. 'Hindi', 'Urdu', 'Bangla', 'Tamil', 'Marathi')..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-emerald-950/60 border border-[#C7A65B]/30 rounded-xl text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 placeholder-emerald-800/40 focus:outline-none focus:ring-2 focus:ring-[#C7A65B]"
            />
          </div>
        </div>

        {/* Language Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((lang) => {
              const isSelected = selectedLanguage === lang.id;

              return (
                <div
                  key={lang.id}
                  onClick={() => {
                    onSelectLanguage(lang.id);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#174C3A] text-[#F6F1E5] border-[#C7A65B] shadow-md ring-2 ring-[#C7A65B]/40'
                      : 'bg-[#FBF8F1] hover:bg-[#F6F1E5] dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 border-[#C7A65B]/25 text-emerald-950 dark:text-emerald-100'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base">
                        {lang.name}
                      </span>
                      <span className={`text-xs ${isSelected ? 'text-[#DFC488]' : 'text-emerald-700 dark:text-emerald-400 font-medium'}`}>
                        ({lang.nativeName})
                      </span>
                    </div>

                    {/* Prominent Hinglish Spelling badge */}
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isSelected 
                          ? 'bg-[#0E3326] text-[#DFC488] border border-[#C7A65B]/40' 
                          : 'bg-[#C7A65B]/20 text-[#174C3A] dark:text-[#DFC488]'
                      }`}>
                        Spelling: {lang.hinglishSpelling}
                      </span>
                    </div>

                    <p className={`text-[11px] leading-relaxed mt-1 ${isSelected ? 'text-emerald-100/90' : 'text-emerald-800/70 dark:text-emerald-300'}`}>
                      {lang.description}
                    </p>
                  </div>

                  <div className="shrink-0 mt-1">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      isSelected 
                        ? 'bg-[#C7A65B] text-[#174C3A] border-[#C7A65B]' 
                        : 'border-emerald-300 dark:border-emerald-700'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FBF8F1] dark:bg-emerald-900/40 border-t border-[#C7A65B]/20 flex items-center justify-between text-xs text-emerald-800/80 dark:text-emerald-300">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A65B]" />
            <span>Currently Active: <strong>{INDIAN_LANGUAGES_LIST.find(l => l.id === selectedLanguage)?.hinglishSpelling}</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#174C3A] hover:bg-[#0E3326] text-[#F6F1E5] font-bold transition-colors cursor-pointer"
          >
            Done (Theek Hai)
          </button>
        </div>
      </div>
    </div>
  );
};
