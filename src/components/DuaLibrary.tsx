import React, { useState, useMemo } from 'react';
import { 
  Search, Bookmark, Copy, Check, Sparkles, 
  BookMarked, Filter, Globe, MessageCircle
} from 'lucide-react';
import { DuaCategory, DuaItem, SupportedLanguage, SocialSharePayload } from '../types';
import { DUAS_DATABASE } from '../data/duasData';
import { getLanguageMeta } from '../data/indianLanguagesData';

interface DuaLibraryProps {
  selectedLanguage?: SupportedLanguage;
  onOpenLanguageModal?: () => void;
  onOpenSocialShare?: (payload: SocialSharePayload) => void;
}

const CATEGORIES: { key: DuaCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Sabhi Duas (सभी मसनून दुआएं)', icon: '✨' },
  { key: 'daily-routines', label: 'Rozmarrah Zindagi', icon: '🌅' },
  { key: 'worship', label: 'Namaz aur Wudu', icon: '🕌' },
  { key: 'anxiety-relief', label: 'Gham aur Pareshani', icon: '🤲' },
  { key: 'forgiveness', label: 'Taubah aur Maghfirat', icon: '🤍' },
  { key: 'food-drink', label: 'Khana aur Peena', icon: '🍽️' },
  { key: 'protection', label: 'Hifazat aur Nazar', icon: '🛡️' },
  { key: 'quranic-duas', label: 'Quran Sharif Ki Rabbana Duas', icon: '📖' },
  { key: 'personal-family', label: 'Ghar aur Parivar (Rizq)', icon: '🏡' }
];

export const DuaLibrary: React.FC<DuaLibraryProps> = ({
  selectedLanguage = 'hinglish',
  onOpenLanguageModal,
  onOpenSocialShare
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DuaCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('quran_bookmarked_duas');
    return saved ? JSON.parse(saved) : ['dua-sayyidul-istighfar', 'dua-distress-yunus', 'dua-ayatul-kursi'];
  });
  const [filterBookmarkedOnly, setFilterBookmarkedOnly] = useState(false);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('quran_bookmarked_duas', JSON.stringify(next));
      return next;
    });
  };

  const handleCopy = (dua: DuaItem) => {
    const text = `${dua.title}\n\n[Arbi in Arbi]:\n${dua.arabicText}\n\n[Hinglish Spelling / Pronunciation]:\n${dua.transliteration}\n\n[Hinglish Tarjuma]:\n${dua.hinglishMeaning}\n\n[English Meaning]:\n${dua.englishMeaning}\n\nReference: ${dua.sourceBook} (${dua.referenceNumber}) - Grade: ${dua.grading}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsAppShare = (dua: DuaItem) => {
    if (onOpenSocialShare) {
      onOpenSocialShare({
        title: dua.title,
        arabicText: dua.arabicText,
        hinglishText: dua.hinglishMeaning,
        englishText: dua.englishMeaning,
        reference: `${dua.sourceBook} (${dua.referenceNumber})`,
        type: 'dua'
      });
      return;
    }
    const text = `✨ *Bismillahir Rahmanir Raheem* ✨\n\n🤲 *${dua.title}* (${dua.situation})\n\n${dua.arabicText}\n\n*Hinglish Spelling / Pronunciation:*\n_${dua.transliteration}_\n\n*Hinglish Tarjuma:*\n"${dua.hinglishMeaning}"\n\nKitab / Reference: ${dua.sourceBook} (${dua.referenceNumber})\n\n— *Quran Sharif Web App* (Everyday Masnoon Duas)\nAage share karein aur ajar payein! 🤲`;
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      navigator.clipboard.writeText(text);
      window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const filteredDuas = useMemo(() => {
    return DUAS_DATABASE.filter(dua => {
      if (filterBookmarkedOnly && !bookmarkedIds.includes(dua.id)) {
        return false;
      }
      if (selectedCategory !== 'all' && dua.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          dua.title.toLowerCase().includes(q) ||
          dua.englishMeaning.toLowerCase().includes(q) ||
          dua.hinglishMeaning.toLowerCase().includes(q) ||
          dua.transliteration.toLowerCase().includes(q) ||
          dua.situation.toLowerCase().includes(q) ||
          dua.arabicText.includes(searchQuery)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery, filterBookmarkedOnly, bookmarkedIds]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Hero Banner (Hinglish) */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-amber-500/30 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Hisn al-Muslim • Sabhi Duas Hinglish Me
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-amber-200">
              Rozmarrah Zindagi Ki Masnoon Duas (मसनून दुआएं)
            </h1>
            <p className="text-sm md:text-base text-emerald-100/90 mt-1 max-w-2xl">
              Authentic masnoon duayein — <strong>Arbi in Arbi</strong> (pure Uthmani script), aasan <strong>Roman Hinglish spelling</strong> aur mukammal <strong>Hinglish tarjuma</strong> ke sath.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenLanguageModal && (
              <button
                onClick={onOpenLanguageModal}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs bg-emerald-950/70 hover:bg-emerald-950 text-amber-300 border border-amber-500/40 shadow-sm cursor-pointer transition-all"
                title="Bhasha (Language) badlein"
              >
                <Globe className="w-4 h-4 text-amber-300" />
                <span>{getLanguageMeta(selectedLanguage).name} (Hinglish)</span>
              </button>
            )}

            <button
              onClick={() => setFilterBookmarkedOnly(!filterBookmarkedOnly)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all shadow-sm cursor-pointer ${
                filterBookmarkedOnly
                  ? 'bg-amber-400 text-emerald-950 font-bold'
                  : 'bg-emerald-950/60 hover:bg-emerald-950 text-amber-200 border border-emerald-700/50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${filterBookmarkedOnly ? 'fill-current' : ''}`} />
              <span>Saved Duas ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls (Hinglish) */}
      <div className="space-y-4 mb-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-emerald-800/50 dark:text-emerald-400/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Duas khojein (maslan 'sona', 'wudu', 'ghar', 'rizq', 'pareshani', 'taubah')..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl shadow-sm text-sm md:text-base text-emerald-950 dark:text-emerald-100 placeholder-emerald-900/40 dark:placeholder-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-emerald-800/60 hover:text-emerald-950 font-medium cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-amber-200 border border-amber-400/40 shadow-sm font-bold'
                    : 'bg-white dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-800/50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dua Cards Grid */}
      {filteredDuas.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-emerald-950/30 rounded-3xl border border-emerald-100 dark:border-emerald-800 p-8">
          <BookMarked className="w-12 h-12 text-emerald-800/30 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-100">
            Koi Dua Nahi Mili
          </h3>
          <p className="text-xs md:text-sm text-emerald-800/70 dark:text-emerald-400 mt-1">
            Kripya doosre lafz se search karein ya category filter ko 'Sabhi Duas' par set karein.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredDuas.map(dua => {
            const isBookmarked = bookmarkedIds.includes(dua.id);

            return (
              <div
                key={dua.id}
                className="rounded-3xl p-6 shadow-md transition-all duration-300 border bg-white dark:bg-emerald-950/40 border-emerald-900/10 dark:border-emerald-700/30 hover:shadow-lg"
              >
                {/* Header: Title + Category + Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-emerald-100 dark:border-emerald-800/50">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-300/40">
                        {dua.categoryLabel}
                      </span>
                      {dua.repetitionCount && (
                        <span className="text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded-full">
                          Kitni Baar: {dua.repetitionCount}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-serif font-bold text-emerald-950 dark:text-amber-200">
                      {dua.title}
                    </h3>
                    <p className="text-xs text-emerald-800/70 dark:text-emerald-400 mt-0.5">
                      {dua.situation}
                    </p>
                  </div>

                  {/* Actions (Copy + Bookmark - Voice completely removed) */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopy(dua)}
                      className="p-2.5 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 rounded-xl hover:bg-emerald-100 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                      title="Poori Dua copy karein"
                    >
                      {copiedId === dua.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span className="hidden sm:inline">{copiedId === dua.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => handleWhatsAppShare(dua)}
                      className="p-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                      title="WhatsApp par Dua share karein"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>

                    <button
                      onClick={() => toggleBookmark(dua.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                        isBookmarked
                          ? 'bg-amber-400 text-emerald-950 border-amber-500'
                          : 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                      }`}
                      title={isBookmarked ? 'Bookmark se hatayein' : 'Bookmark karein'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>

                {/* 1. ARBI IN ARBI (Authentic Arabic Uthmani Script) */}
                <div className="p-5 rounded-2xl border-2 transition-all mb-4 bg-amber-50/60 dark:bg-emerald-900/25 border-amber-300/70 dark:border-emerald-800/60">
                  <div className="flex items-center justify-between mb-2 pb-1 border-b border-amber-200/80 dark:border-emerald-800/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                      Arbi in Arbi (عربي في عربي):
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-400">
                      Uthmani Script with Tashkeel
                    </span>
                  </div>
                  <p 
                    className="text-right text-xl md:text-2xl font-arabic text-emerald-950 dark:text-amber-100 leading-loose select-text"
                    dir="rtl"
                  >
                    {dua.arabicText}
                  </p>
                </div>

                {/* 2. HINGLISH SPELLING / PRONUNCIATION (रोमन हिज्जे) */}
                <div className="mb-3 p-3.5 rounded-xl bg-white dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-1">
                    Hinglish Spelling / Pronunciation (रोमन हिज्जे):
                  </span>
                  <p className="text-xs md:text-sm text-emerald-900 dark:text-emerald-200 italic font-medium leading-relaxed">
                    {dua.transliteration}
                  </p>
                </div>

                {/* 3. HINGLISH TARJUMA (हिंग्लिश तर्जुमा) */}
                <div className="p-4 rounded-xl border transition-all mb-3 bg-[#FBF8F1] dark:bg-emerald-900/20 border-[#C7A65B]/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#174C3A] dark:text-[#DFC488] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C7A65B]" />
                      <span>Hinglish Tarjuma (हिंग्लिश मायने):</span>
                    </span>
                    <span className="text-[10px] bg-[#C7A65B]/20 text-[#174C3A] dark:text-[#DFC488] px-2 py-0.5 rounded font-extrabold">
                      Aasan Hinglish
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-emerald-950 dark:text-emerald-100 font-medium leading-relaxed">
                    "{dua.hinglishMeaning}"
                  </p>
                </div>

                {/* 4. ENGLISH MEANING */}
                <div className="mb-3 px-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900/60 dark:text-emerald-400 block mb-0.5">
                    English Meaning:
                  </span>
                  <p className="text-xs text-emerald-900/80 dark:text-emerald-300 italic leading-relaxed">
                    "{dua.englishMeaning}"
                  </p>
                </div>

                {/* Reference & Grading Footer */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-emerald-100 dark:border-emerald-800/50 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800/80 dark:text-emerald-400">
                    <span className="font-semibold">Kitab / Sanad:</span>
                    <span>{dua.sourceBook}</span>
                    <span>• {dua.referenceNumber}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] ${
                    dua.grading === 'Sahih' || dua.grading === 'Muttafaqun Alayh' || dua.grading === 'Quranic Ayah'
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                  }`}>
                    Darja (Grade): {dua.grading}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
