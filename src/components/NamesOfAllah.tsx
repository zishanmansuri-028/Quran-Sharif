import React, { useState, useMemo } from 'react';
import { 
  Search, Sparkles, Copy, Check, Bookmark, Heart, 
  HelpCircle, Shield, Award, MessageCircle 
} from 'lucide-react';
import { NAMES_OF_ALLAH, AllahNameItem } from '../data/namesOfAllahData';
import type { SocialSharePayload } from '../types';

interface NamesOfAllahProps {
  onOpenSocialShare?: (payload: SocialSharePayload) => void;
}

export const NamesOfAllah: React.FC<NamesOfAllahProps> = ({ onOpenSocialShare }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedNumber, setCopiedNumber] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Sabhi 99 Mubarak Naam (सभी ९९ नाम)' },
    { id: 'Rehmat', label: 'Rehmat-o-Karam (दया व कृपा)' },
    { id: 'Qudrat', label: 'Azmat-o-Qudrat (शक्ति व महिमा)' },
    { id: 'Bakhshish', label: 'Maghfirat-o-Tawbah (क्षमा)' },
    { id: 'Hifazat', label: 'Hifazat-o-Aman (सुरक्षा)' },
    { id: 'Hikmat', label: 'Ilm-o-Hikmat (ज्ञान व बुद्धि)' }
  ];

  const filteredNames = useMemo(() => {
    return NAMES_OF_ALLAH.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.transliteration.toLowerCase().includes(q) ||
          item.hinglishMeaning.toLowerCase().includes(q) ||
          item.englishMeaning.toLowerCase().includes(q) ||
          item.benefitHinglish.toLowerCase().includes(q) ||
          item.arabic.includes(search) ||
          item.number.toString() === q
        );
      }
      return true;
    });
  }, [search, selectedCategory]);

  const handleCopy = (item: AllahNameItem) => {
    const text = `#${item.number} ${item.arabic} (${item.transliteration})\n\n[Hinglish Meaning]: ${item.hinglishMeaning}\n[English Meaning]: ${item.englishMeaning}\n\n[Fazilat & Zikr Ka Faida]:\n${item.benefitHinglish}\n\n— [Quran Sharif • Asma-ul-Husna (99 Names of Allah)]`;
    navigator.clipboard.writeText(text);
    setCopiedNumber(item.number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const handleWhatsAppShare = (item: AllahNameItem) => {
    if (onOpenSocialShare) {
      onOpenSocialShare({
        title: `Asma-ul-Husna: ${item.transliteration}`,
        arabicText: item.arabic,
        hinglishText: item.hinglishMeaning,
        englishText: item.englishMeaning,
        reference: `Mubarak Naam #${item.number} • ${item.benefitHinglish}`,
        type: 'name'
      });
      return;
    }
    const text = `✨ *Bismillahir Rahmanir Raheem* ✨\n\n✨ *Asma-ul-Husna (#${item.number})*\n${item.arabic} (${item.transliteration})\n\n*Hinglish Tarjuma:*\n${item.hinglishMeaning}\n\n*Fazilat & Faida:*\n${item.benefitHinglish}\n\n— *Quran Sharif Web App* (99 Names of Allah)\nAage share karein aur ajar payein! 🤲`;
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      navigator.clipboard.writeText(text);
      window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      
      {/* Top Banner (Pure Hinglish) */}
      <div className="bg-gradient-to-r from-[#174C3A] via-[#1F634D] to-[#0E3326] text-[#F6F1E5] rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-[#C7A65B]/40 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7A65B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A65B]/20 text-[#DFC488] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Asma-ul-Husna • 99 Mubarak Naam
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#F6F1E5]">
              अस्मा-उल-हुस्ना (99 Names of Allah)
            </h1>
            <p className="text-xs sm:text-sm text-[#DFC488]/90 mt-1 max-w-2xl">
              Hadees Shareef: "Beshak Allah Ta'ala ke 99 Mubarak Naam hain, jo shakhs inko yaad karega aur samajhkar amal karega, wo jannat me dakhil hoga." (Sahih al-Bukhari)
            </p>
          </div>

          <div className="bg-black/30 px-4 py-3 rounded-2xl border border-[#C7A65B]/30 text-center shrink-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#DFC488] block">99</span>
            <span className="text-[10px] text-[#F6F1E5]/80 uppercase font-bold">Mubarak Naam</span>
          </div>
        </div>
      </div>

      {/* Search Bar & Category Filters */}
      <div className="space-y-4 mb-8">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-emerald-800/50 dark:text-emerald-400/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Allah ke Mubarak Naam khojein (maslan 'Rahman', 'Razzaq', 'Shafi', '17', 'Shifa')..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-emerald-950/60 border border-[#C7A65B]/30 rounded-2xl shadow-xs text-sm text-[#26342D] dark:text-[#F6F1E5] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C7A65B]"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-emerald-800 dark:text-emerald-300 font-bold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#174C3A] text-[#DFC488] border-2 border-[#C7A65B] shadow-sm'
                  : 'bg-white dark:bg-emerald-950/40 text-[#26342D] dark:text-[#F6F1E5] hover:bg-[#F6F1E5] border border-[#C7A65B]/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* 99 Names Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNames.map(item => {
          const isCopied = copiedNumber === item.number;

          return (
            <div
              key={item.number}
              className="rounded-3xl p-5 sm:p-6 bg-white dark:bg-emerald-950/40 border-2 border-[#C7A65B]/25 hover:border-[#C7A65B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Number + Category Badge + Copy */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F6F1E5] dark:border-emerald-800/40">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#174C3A] text-[#DFC488] font-bold text-xs flex items-center justify-center shadow-inner">
                      {item.number}
                    </span>
                    {item.category && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C7A65B]/15 text-[#174C3A] dark:text-[#DFC488]">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(item)}
                      className="p-1.5 rounded-lg bg-[#F6F1E5] dark:bg-emerald-900/40 text-[#174C3A] dark:text-[#DFC488] hover:bg-[#C7A65B]/20 transition-all cursor-pointer text-xs flex items-center gap-1 font-semibold"
                      title="Is Mubarak Naam ki tafseel copy karein"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[10px]">{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => handleWhatsAppShare(item)}
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-all cursor-pointer border border-emerald-200"
                      title="WhatsApp & Insta Status Card banayein"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Pure Arabic Name */}
                <div className="text-center py-2">
                  <p 
                    className="text-3xl sm:text-4xl font-arabic text-[#174C3A] dark:text-[#DFC488] leading-relaxed select-text"
                    dir="rtl"
                  >
                    {item.arabic}
                  </p>
                  <h3 className="text-base sm:text-lg font-bold text-[#26342D] dark:text-[#F6F1E5] mt-1">
                    {item.transliteration}
                  </h3>
                </div>

                {/* Meanings */}
                <div className="mt-3 space-y-1 bg-[#FBF8F1] dark:bg-emerald-900/20 p-3 rounded-2xl border border-[#C7A65B]/20">
                  <p className="text-xs sm:text-sm font-semibold text-[#174C3A] dark:text-emerald-200">
                    {item.hinglishMeaning}
                  </p>
                  <p className="text-[11px] text-[#4B5B53] dark:text-emerald-300 italic">
                    "{item.englishMeaning}"
                  </p>
                </div>

                {/* Fazilat & Benefit of Reciting */}
                <div className="mt-3 pt-2">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C7A65B]" />
                    <span>Zikr Ka Faida (Fazilat):</span>
                  </span>
                  <p className="text-xs text-[#26342D] dark:text-emerald-100 leading-relaxed font-medium">
                    {item.benefitHinglish}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
