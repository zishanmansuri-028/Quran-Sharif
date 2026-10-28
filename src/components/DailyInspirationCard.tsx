import React, { useState } from 'react';
import { 
  Sparkles, Share2, Check, BookOpen, Heart, 
  MessageCircle, ArrowRight, Clock, Star, Flame
} from 'lucide-react';
import { getTodayInspiration, DailyInspirationItem } from '../data/dailyInspirationsData';
import type { SocialSharePayload } from '../types';

interface DailyInspirationCardProps {
  onOpenSurah?: (surahNum: number) => void;
  onOpenTab?: (tab: 'quran' | 'duas' | 'sunnah' | 'tasbeeh' | 'prayer-times' | 'names-of-allah') => void;
  onOpenSocialShare?: (payload: SocialSharePayload) => void;
}

export const DailyInspirationCard: React.FC<DailyInspirationCardProps> = ({
  onOpenSurah,
  onOpenTab,
  onOpenSocialShare
}) => {
  const item = getTodayInspiration();
  const [copied, setCopied] = useState(false);

  const handleShareWhatsApp = () => {
    if (onOpenSocialShare) {
      onOpenSocialShare({
        title: `Aaj Ki Aayat & Hadees (${item.theme})`,
        arabicText: item.ayahArabic,
        hinglishText: item.ayahHinglish,
        englishText: `Hadees: ${item.hadithHinglish}`,
        reference: item.ayahReference,
        type: 'ayah'
      });
      return;
    }
    const text = `✨ *Bismillahir Rahmanir Raheem* ✨\n\n📖 *Quran Sharif — Aaj Ki Aayat (${item.ayahReference}):*\n"${item.ayahArabic}"\n\n*Hinglish Tarjuma:*\n${item.ayahHinglish}\n\n🕌 *Aaj Ki Hadees (${item.hadithSource}):*\n${item.hadithHinglish}\n\n💡 *Aaj Ki Roohani Nasihat:*\n${item.reflectionHinglish}\n\n✅ *Aaj Ka Nek Amal:* ${item.actionItemHinglish}\n\n— *Quran Sharif Web App* (Tilawat + Bolkar Tarjuma)\nPadhein aur aage share karein, Sadqah-e-Jariya hai! 🤲`;
    
    // Check if on mobile device to trigger WhatsApp directly
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleCopy = () => {
    const text = `✨ Quran Sharif — Aaj Ki Aayat (${item.ayahReference}) ✨\n\n${item.ayahArabic}\n\n[Hinglish Tarjuma]:\n${item.ayahHinglish}\n\n[Hadees Shareef - ${item.hadithSource}]:\n${item.hadithHinglish}\n\n[Nasihat]: ${item.reflectionHinglish}\n\n[Nek Amal]: ${item.actionItemHinglish}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-br from-[#123E2F] via-[#174C3A] to-[#0E3326] text-[#F6F1E5] rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-[#C7A65B]/40 mb-8 relative overflow-hidden">
      
      {/* Ambient Islamic Radial Glow */}
      <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#C7A65B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#C7A65B]/25">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A65B]/20 text-[#DFC488] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rozana Ki Hidayat • {item.theme}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#F6F1E5]">
              आज की आयत व आज की हदीस (Daily Inspiration)
            </h2>
          </div>

          {/* 1-Click WhatsApp Share & Copy Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-400/50"
              title="WhatsApp Status & Instagram Story Card banayein"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Status & Share</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#DFC488] border border-[#C7A65B]/40 transition-all cursor-pointer text-xs flex items-center gap-1 font-bold"
              title="Poori aayat aur hadees copy karein"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Ayah of the Day & Hadith of the Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          
          {/* Card 1: Ayah of the Day */}
          <div className="bg-black/25 rounded-2xl p-4 sm:p-5 border border-[#C7A65B]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#DFC488] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#C7A65B]" />
                  <span>Aaj Ki Aayat (Ayah of the Day):</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#C7A65B]/20 text-[#DFC488]">
                  {item.ayahReference}
                </span>
              </div>

              {/* Arabic Text */}
              <p 
                className="text-right text-lg sm:text-xl font-arabic text-[#DFC488] leading-loose my-2 select-text"
                dir="rtl"
              >
                {item.ayahArabic}
              </p>

              {/* Hinglish Meaning */}
              <p className="text-xs sm:text-sm text-[#F6F1E5]/90 leading-relaxed font-medium mt-1">
                "{item.ayahHinglish}"
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-[#DFC488]/80 flex items-center justify-between">
              <span>Mukammal Tilawat ke sath</span>
              {onOpenSurah && (
                <button
                  onClick={() => onOpenSurah(18)}
                  className="text-xs font-bold text-[#DFC488] hover:text-white underline cursor-pointer"
                >
                  Surah Kholein ➡️
                </button>
              )}
            </div>
          </div>

          {/* Card 2: Hadith of the Day */}
          <div className="bg-black/25 rounded-2xl p-4 sm:p-5 border border-[#C7A65B]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#DFC488] uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-teal-400" />
                  <span>Aaj Ki Hadees (Hadith of the Day):</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-200">
                  {item.hadithGrade}
                </span>
              </div>

              {item.hadithArabic && (
                <p 
                  className="text-right text-base sm:text-lg font-arabic text-teal-200 leading-loose my-1 select-text"
                  dir="rtl"
                >
                  {item.hadithArabic}
                </p>
              )}

              <p className="text-xs sm:text-sm text-[#F6F1E5]/90 leading-relaxed font-medium mt-1">
                "{item.hadithHinglish}"
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-[#DFC488]/80 flex items-center justify-between">
              <span>Sanad: <strong>{item.hadithSource}</strong></span>
              <span className="text-teal-300 font-semibold">Authentic Sunnah</span>
            </div>
          </div>

        </div>

        {/* Reflection & Action Item Banner */}
        <div className="bg-white/10 rounded-2xl p-4 border border-[#C7A65B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#C7A65B] text-[#174C3A] flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
              💡
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#DFC488] uppercase tracking-wider">
                Aaj Ka Nek Amal (Daily Action):
              </h4>
              <p className="text-xs sm:text-sm text-[#F6F1E5] font-semibold mt-0.5">
                {item.actionItemHinglish}
              </p>
            </div>
          </div>

          <div className="text-[11px] text-[#DFC488]/90 italic sm:text-right shrink-0">
            "{item.reflectionHinglish}"
          </div>
        </div>

        {/* Quick Surah & Tool Shortcuts (Quick Launch) */}
        <div className="pt-2 border-t border-[#C7A65B]/20">
          <span className="text-[11px] font-bold text-[#DFC488] uppercase tracking-wider block mb-2.5">
            ⚡ Quick Shortcuts (क़ौम के लिए ख़ास सूरह व टूल्स):
          </span>
          <div className="flex flex-wrap items-center gap-2">
            
            {onOpenSurah && (
              <>
                <button
                  onClick={() => onOpenSurah(36)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] font-bold text-xs border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Surah Yaseen (36)</span>
                  <span className="text-[10px] text-[#DFC488]">दिल-ए-कुरान</span>
                </button>

                <button
                  onClick={() => onOpenSurah(67)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] font-bold text-xs border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Surah Al-Mulk (67)</span>
                  <span className="text-[10px] text-[#DFC488]">क़ब्र के अज़ाब से नजात</span>
                </button>

                <button
                  onClick={() => onOpenSurah(18)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] font-bold text-xs border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Surah Al-Kahf (18)</span>
                  <span className="text-[10px] text-[#DFC488]">जुमुआ का नूर</span>
                </button>

                <button
                  onClick={() => onOpenSurah(55)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] font-bold text-xs border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Surah Ar-Rahman (55)</span>
                  <span className="text-[10px] text-[#DFC488]">क़ुरान की ज़ीनत</span>
                </button>
              </>
            )}

            {onOpenTab && (
              <>
                <button
                  onClick={() => onOpenTab('tasbeeh')}
                  className="px-3 py-1.5 rounded-xl bg-[#C7A65B] text-[#0E3326] font-extrabold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>📿 Digital Tasbeeh</span>
                </button>

                <button
                  onClick={() => onOpenTab('prayer-times')}
                  className="px-3 py-1.5 rounded-xl bg-[#C7A65B] text-[#0E3326] font-extrabold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>🕌 Namaz Times & Qibla</span>
                </button>

                <button
                  onClick={() => onOpenTab('names-of-allah')}
                  className="px-3 py-1.5 rounded-xl bg-[#C7A65B] text-[#0E3326] font-extrabold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>✨ 99 Names of Allah</span>
                </button>
              </>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
