import React, { useState } from 'react';
import { 
  Play, 
  Volume2, 
  Copy, 
  Check, 
  Bookmark, 
  Sparkles,
  Globe,
  MessageCircle
} from 'lucide-react';
import type { AyahItem, AudioPhase, TranslationVoiceType, SupportedLanguage, SocialSharePayload } from '../types';
import { getLanguageMeta, getAyahTranslationInLanguage } from '../data/indianLanguagesData';

interface AyahCardProps {
  ayah: AyahItem;
  surahNumber: number;
  surahName: string;
  isCurrentlyActive: boolean;
  audioPhase: AudioPhase;
  voiceType?: TranslationVoiceType;
  selectedLanguage?: SupportedLanguage;
  onOpenLanguageModal?: () => void;
  arabicFontSize: number;
  showTransliteration: boolean;
  showHindi: boolean;
  showEnglish: boolean;
  isSaved: boolean;
  onPlayAyahDual: (ayahNumber: number) => void;
  onPlayHinglishOnly: (ayahNumber: number) => void;
  onPlayArabicOnly: (ayahNumber: number) => void;
  onToggleBookmark: (ayah: AyahItem) => void;
  onOpenSocialShare?: (payload: SocialSharePayload) => void;
}

export const AyahCard: React.FC<AyahCardProps> = ({
  ayah,
  surahNumber,
  surahName,
  isCurrentlyActive,
  audioPhase,
  voiceType = 'studio',
  selectedLanguage = 'hinglish',
  onOpenLanguageModal,
  arabicFontSize,
  showTransliteration,
  showHindi,
  showEnglish,
  isSaved,
  onPlayAyahDual,
  onPlayHinglishOnly,
  onToggleBookmark,
  onOpenSocialShare
}) => {
  const [copied, setCopied] = useState(false);

  const langMeta = getLanguageMeta(selectedLanguage);
  const langTranslation = getAyahTranslationInLanguage(ayah, selectedLanguage);

  const isArabicPlaying = isCurrentlyActive && audioPhase === 'playing-arabic';
  const isTranslationPlaying = isCurrentlyActive && audioPhase === 'playing-hinglish';

  const handleCopy = () => {
    const text = `${ayah.arabicText}\n\n[${langMeta.name} (${langMeta.hinglishSpelling})]: ${langTranslation.text}\n\n[Hinglish Spelling / Meaning]: ${langTranslation.hinglishSpelling}\n\n[English Meaning]: ${ayah.englishTranslation}\n\n— [Quran Sharif • Surah ${ayah.surahName || surahName} (${ayah.surahNumber || surahNumber}:${ayah.numberInSurah}) • Paara ${ayah.juz}]`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    if (onOpenSocialShare) {
      onOpenSocialShare({
        title: `Surah ${ayah.surahName || surahName}`,
        arabicText: ayah.arabicText,
        hinglishText: langTranslation.hinglishSpelling || ayah.hinglishTranslation,
        englishText: ayah.englishTranslation,
        reference: `Aayat ${ayah.numberInSurah} • Paara ${ayah.juz}`,
        type: 'ayah'
      });
      return;
    }
    const text = `✨ *Bismillahir Rahmanir Raheem* ✨\n\n📖 *Quran Sharif — Surah ${ayah.surahName || surahName} (${ayah.surahNumber || surahNumber}:${ayah.numberInSurah}) • Paara ${ayah.juz}*\n\n${ayah.arabicText}\n\n*Hinglish Tarjuma:*\n${langTranslation.hinglishSpelling || ayah.hinglishTranslation}\n\n*English:* "${ayah.englishTranslation}"\n\n— *Quran Sharif Web App* (Tilawat + Bolkar Tarjuma)\nAage share karein aur ajar payein! 🤲`;
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      navigator.clipboard.writeText(text);
      window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div
      id={`ayah-${ayah.numberInSurah}`}
      className={`rounded-3xl border transition-all duration-300 p-5 sm:p-7 shadow-sm ${
        isCurrentlyActive
          ? isTranslationPlaying
            ? 'bg-[#FBF8F1] border-[#C7A65B] ring-2 ring-[#C7A65B]/60 shadow-lg scale-[1.01]'
            : 'bg-[#FBF8F1] border-emerald-600 ring-2 ring-emerald-500/30 shadow-lg scale-[1.01]'
          : 'bg-white border-[#C7A65B]/25 hover:border-[#C7A65B]/60 hover:shadow-md'
      }`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F6F1E5] mb-4">
        
        {/* Ayah Reference Badge (Hinglish) */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#174C3A] text-[#DFC488] font-bold text-xs flex items-center justify-center shadow-inner">
            {ayah.surahNumber || surahNumber}:{ayah.numberInSurah}
          </span>
          <span className="text-[11px] text-[#4B5B53] font-semibold">
            Paara {ayah.juz}
          </span>

          {ayah.surahName && (
            <span className="text-[11px] text-[#174C3A] font-bold bg-[#174C3A]/10 px-2 py-0.5 rounded-md">
              {ayah.surahName}
            </span>
          )}

          {ayah.sajdah && (
            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              Sajdah (Sajda)
            </span>
          )}

          {/* Quick Language Switch Pill */}
          {onOpenLanguageModal && (
            <button
              onClick={onOpenLanguageModal}
              className="text-[10px] font-bold text-[#174C3A] bg-[#C7A65B]/20 hover:bg-[#C7A65B]/35 border border-[#C7A65B]/40 px-2 py-0.5 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
              title="Click karke bhasha (language) badlein"
            >
              <Globe className="w-3 h-3 text-[#174C3A]" />
              <span>{langMeta.name}</span>
            </button>
          )}

          {/* Active Audio State Pill (Hinglish) */}
          {isArabicPlaying && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-emerald-700" />
              <span>Arabic Tilawat chal rahi hai...</span>
            </span>
          )}

          {isTranslationPlaying && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C7A65B]/20 text-[#174C3A] border border-[#C7A65B] animate-pulse flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C7A65B]" />
              <span>Tarjuma Awaz chal rahi hai ({voiceType === 'studio' ? 'Shamshad Ali Khan' : 'Hinglish'})...</span>
            </span>
          )}
        </div>

        {/* Action Buttons (Hinglish) */}
        <div className="flex items-center gap-1.5">
          
          {/* Main Dual Play Button */}
          <button
            onClick={() => onPlayAyahDual(ayah.numberInSurah)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
              isCurrentlyActive
                ? 'bg-[#C7A65B] text-[#174C3A]'
                : 'bg-[#174C3A] text-[#F6F1E5] hover:bg-[#0E3326]'
            }`}
            title="Arabic Tilawat aur uske turant baad Tarjuma sunein"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Arabic + Tarjuma Sunein</span>
            <span className="sm:hidden">Sunein</span>
          </button>

          {/* Translation Voice Only Button */}
          <button
            onClick={() => onPlayHinglishOnly(ayah.numberInSurah)}
            className="p-1.5 rounded-lg bg-[#F6F1E5] text-[#174C3A] hover:bg-[#C7A65B]/20 transition-all text-xs font-semibold cursor-pointer"
            title="Sirf Tarjuma Awaz sunein"
          >
            <Sparkles className="w-4 h-4 text-[#C7A65B]" />
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-[#F6F1E5] text-[#174C3A] hover:bg-[#C7A65B]/20 transition-all cursor-pointer"
            title="Aayat copy karein"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* WhatsApp & Instagram Status Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-all cursor-pointer border border-emerald-200 flex items-center gap-1"
            title="WhatsApp Status & Instagram Story Card banayein"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold hidden xl:inline text-emerald-800">Status</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(ayah)}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              isSaved
                ? 'bg-[#C7A65B] text-[#174C3A]'
                : 'bg-[#F6F1E5] text-[#174C3A] hover:bg-[#C7A65B]/20'
            }`}
            title={isSaved ? "Bookmark se hatayein" : "Bookmark karein"}
          >
            <Bookmark className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Arabic Ayah Text (Tested Uthmani Font with Tashkeel and RTL) */}
      <div className="text-right my-5">
        <p
          dir="rtl"
          className="font-quran leading-[2.5] text-[#174C3A] font-normal selection:bg-[#C7A65B] selection:text-[#174C3A]"
          style={{ fontSize: `${arabicFontSize}px` }}
        >
          {ayah.arabicText}
          <span className="inline-flex items-center justify-center w-7 h-7 mx-2 rounded-full border border-[#C7A65B] text-[#C7A65B] text-xs font-serif font-bold">
            {ayah.numberInSurah}
          </span>
        </p>
      </div>

      {/* Roman Transliteration */}
      {showTransliteration && ayah.romanTransliteration && (
        <div className="pt-1 text-xs text-[#9E813F] font-medium leading-relaxed">
          {ayah.romanTransliteration}
        </div>
      )}

      {/* Authentic Urdu Text (Jalandhary Translation) */}
      {ayah.urduTranslation && (
        <div className="mt-3 text-right">
          <p
            dir="rtl"
            className="font-urdu text-xl sm:text-2xl text-[#174C3A] leading-relaxed selection:bg-[#C7A65B] selection:text-[#174C3A]"
          >
            {ayah.urduTranslation}
          </p>
        </div>
      )}

      {/* Dynamic Indian Language & Hinglish Meaning Box */}
      <div
        className={`mt-4 p-4 rounded-2xl border transition-all ${
          isTranslationPlaying
            ? 'bg-[#C7A65B]/15 border-[#C7A65B] ring-1 ring-[#C7A65B]'
            : 'bg-[#FBF8F1] border-[#C7A65B]/30'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#174C3A] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A65B]" />
              <span>{langMeta.name} Tarjuma ({langMeta.nativeName}):</span>
            </span>
            <span className="text-[10px] font-bold bg-[#C7A65B]/20 text-[#174C3A] px-2 py-0.5 rounded-md border border-[#C7A65B]/30">
              Spelling: {langMeta.hinglishSpelling}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPlayHinglishOnly(ayah.numberInSurah)}
              className="text-[11px] font-bold text-[#174C3A] hover:text-[#C7A65B] flex items-center gap-1 cursor-pointer bg-white/80 px-2 py-1 rounded-md border border-[#C7A65B]/30 transition-colors"
              title="Sirf tarjuma awaz mein sunein"
            >
              <Volume2 className="w-3 h-3" />
              <span>Awaz mein sunein</span>
            </button>
            {onOpenLanguageModal && (
              <button
                onClick={onOpenLanguageModal}
                className="text-[11px] font-semibold text-[#174C3A] hover:text-[#C7A65B] flex items-center gap-1 cursor-pointer underline underline-offset-2"
                title="Bhasha badlein"
              >
                <Globe className="w-3 h-3" />
                Change Language
              </button>
            )}
          </div>
        </div>

        {/* Translation in Selected Indian Language */}
        <p className="text-sm sm:text-base text-[#26342D] leading-relaxed font-normal">
          "{langTranslation.text}"
        </p>

        {/* Phonetic Hinglish Spelling (For easy reading across any Indian language) */}
        {selectedLanguage !== 'hinglish' && langTranslation.hinglishSpelling && (
          <div className="mt-2.5 pt-2 border-t border-[#C7A65B]/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E813F] block mb-0.5">
              Hinglish Spelling (हिंग्लिश उच्चारण व तर्जुमा):
            </span>
            <p className="text-xs sm:text-sm text-[#4B5B53] italic font-serif leading-relaxed">
              "{langTranslation.hinglishSpelling}"
            </p>
          </div>
        )}
      </div>

      {/* Hindi Translation Box */}
      {showHindi && ayah.hindiTranslation && (
        <div className="mt-3 pt-3 border-t border-[#F6F1E5]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B5B53] block mb-1">
            Hindi Tarjuma:
          </span>
          <p className="text-xs sm:text-sm text-[#26342D]/90 leading-relaxed font-devanagari">
            {ayah.hindiTranslation}
          </p>
        </div>
      )}

      {/* English Translation Box */}
      {showEnglish && ayah.englishTranslation && (
        <div className="mt-2 pt-2 border-t border-[#F6F1E5]/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B5B53] block mb-0.5">
            English Translation (Sahih International):
          </span>
          <p className="text-xs text-[#4B5B53] leading-relaxed font-light italic">
            "{ayah.englishTranslation}"
          </p>
        </div>
      )}

    </div>
  );
};
