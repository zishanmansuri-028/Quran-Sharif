import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, BookOpen, 
  ChevronRight, Copy, Check, ShieldCheck, Globe, MessageCircle
} from 'lucide-react';
import { SunnahCategory, SunnahGuideItem, SupportedLanguage, SocialSharePayload } from '../types';
import { SUNNAH_DATABASE } from '../data/sunnahData';
import { getLanguageMeta } from '../data/indianLanguagesData';

interface SunnahGuideProps {
  selectedLanguage?: SupportedLanguage;
  onOpenLanguageModal?: () => void;
  onOpenSocialShare?: (payload: SocialSharePayload) => void;
}

const SUNNAH_CATEGORIES: { key: SunnahCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Sabhi Sunnatein (सभी सुन्नतें)', icon: '✨' },
  { key: 'wudu', label: 'Wudu (Farz vs Sunnat)', icon: '💧' },
  { key: 'salah', label: 'Namaz-e-Nabawi (नमाज़)', icon: '🕌' },
  { key: 'eating', label: 'Khana aur Peena', icon: '🍽️' },
  { key: 'sleep', label: 'Sona aur Raat Ke Aadaab', icon: '🌙' },
  { key: 'friday', label: 'Jumuah (Shukrawar) Ke Aadaab', icon: '🕋' },
  { key: 'morning', label: 'Subah aur Fajr Ka Maamool', icon: '🌅' },
  { key: 'bathroom', label: 'Baitul-Khala aur Taharat', icon: '🚿' },
  { key: 'mosque', label: 'Masjid Ke Aadaab', icon: '🏛️' }
];

export const SunnahGuide: React.FC<SunnahGuideProps> = ({
  selectedLanguage = 'hinglish',
  onOpenLanguageModal,
  onOpenSocialShare
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SunnahCategory | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (guide: SunnahGuideItem) => {
    const text = `${guide.title} (${guide.classification})\n\n[Khulasa]: ${guide.summary}\n\n[Tariqa-e-Kaar]:\n${guide.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n${guide.arabicDua ? `[Arbi in Arbi]:\n${guide.arabicDua}\n\n[Hinglish Spelling]:\n${guide.transliteration || ''}\n\n[Hinglish Tarjuma]:\n${guide.duaMeaning || ''}\n\n` : ''}Kitab / Hadees: ${guide.source} (${guide.referenceNumber})`;
    navigator.clipboard.writeText(text);
    setCopiedId(guide.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsAppShare = (guide: SunnahGuideItem) => {
    if (onOpenSocialShare) {
      onOpenSocialShare({
        title: guide.title,
        arabicText: guide.arabicDua || "سُنَّةُ رَسُولِ اللَّهِ ﷺ",
        hinglishText: `${guide.summary} — ${guide.steps[0]}`,
        englishText: `Classification: ${guide.classification}`,
        reference: `${guide.source} (${guide.referenceNumber})`,
        type: 'sunnah'
      });
      return;
    }
    const text = `✨ *Bismillahir Rahmanir Raheem* ✨\n\n🛡️ *Sunnah Guide: ${guide.title}* (${guide.classification})\n_${guide.summary}_\n\n*Tariqa-e-Kaar (Steps):*\n${guide.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n${guide.arabicDua ? `${guide.arabicDua}\n*Tarjuma:* "${guide.duaMeaning}"\n\n` : ''}Kitab: ${guide.source} (${guide.referenceNumber})\n\n— *Quran Sharif Web App* (Sunnah Guide)\nAage share karein aur ajar payein! 🤲`;
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      navigator.clipboard.writeText(text);
      window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const filteredGuides = selectedCategory === 'all'
    ? SUNNAH_DATABASE
    : SUNNAH_DATABASE.filter(g => g.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Hero Banner (Hinglish) */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-amber-500/30 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Sunnah & Islamic Lifestyle • Sabhi Sunnatein Hinglish Me
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-amber-200">
              Rozmarrah Zindagi Ki Masnoon Sunnatein (सुन्नत व आदाब)
            </h1>
            <p className="text-sm md:text-base text-emerald-100/90 mt-1 max-w-2xl">
              Nabi Kareem ﷺ ki mubarak sunnaton ka step-by-step aasan Hinglish me mukammal bayan — <strong>Farz vs Sunnat</strong> ki wazahat aur masnoon duayein.
            </p>
          </div>

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
        </div>
      </div>

      {/* Category Pills (Hinglish) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        {SUNNAH_CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
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

      {/* Guide Cards (Hinglish - Voice completely removed) */}
      <div className="space-y-8">
        {filteredGuides.map(guide => {
          return (
            <div
              key={guide.id}
              className="rounded-3xl p-6 md:p-8 shadow-md transition-all duration-300 border bg-white dark:bg-emerald-950/40 border-emerald-900/10 dark:border-emerald-700/30 hover:shadow-lg"
            >
              {/* Header: Title + Classification Badge + Copy Button */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 pb-4 border-b border-emerald-100 dark:border-emerald-800/50">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full ${
                      guide.classification.includes('Fard')
                        ? 'bg-red-100 text-red-900 border border-red-300 font-black'
                        : 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                    }`}>
                      {guide.classification}
                    </span>
                    <span className="text-xs text-emerald-800/70 dark:text-emerald-400 font-semibold">
                      {guide.categoryLabel}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-emerald-950 dark:text-amber-200">
                    {guide.title}
                  </h2>
                  <p className="text-xs md:text-sm text-emerald-900/80 dark:text-emerald-300 mt-1">
                    {guide.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start">
                  <button
                    onClick={() => handleCopy(guide)}
                    className="p-2.5 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 rounded-xl hover:bg-emerald-100 transition-all shrink-0 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                    title="Poora Sunnat Guide copy karein"
                  >
                    {copiedId === guide.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span className="hidden sm:inline">{copiedId === guide.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => handleWhatsAppShare(guide)}
                    className="p-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                    title="WhatsApp par Sunnat Guide share karein"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Step-by-Step Instructions (Pure Hinglish) */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900/70 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Tariqa-e-Kaar (तरीक़ा-ए-कार — Step-by-Step Hinglish):
                </h3>
                <div className="space-y-3">
                  {guide.steps.map((step, idx) => {
                    const isFardPillar = step.includes('(Farz Rukan');
                    return (
                      <div
                        key={idx}
                        className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all ${
                          isFardPillar
                            ? 'bg-amber-50/80 dark:bg-emerald-900/40 border-amber-400/80 font-medium'
                            : 'bg-emerald-50/30 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/40'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                          isFardPillar
                            ? 'bg-amber-600 text-white'
                            : 'bg-emerald-700 text-amber-200'
                        }`}>
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs md:text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed">
                            {step}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ARBI IN ARBI: Supplication Associated With the Sunnah */}
              {guide.arabicDua && (
                <div className="p-5 rounded-2xl border-2 transition-all mb-6 bg-amber-50/60 dark:bg-emerald-900/30 border-amber-300/80 dark:border-emerald-700/60">
                  <div className="flex items-center justify-between mb-2 pb-1 border-b border-amber-200/80 dark:border-emerald-800/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                      Arbi in Arbi (عربي في عربي):
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-400">
                      Masnoon Arabic Dua
                    </span>
                  </div>
                  <p 
                    className="text-right text-lg md:text-xl font-arabic text-emerald-950 dark:text-amber-100 leading-loose"
                    dir="rtl"
                  >
                    {guide.arabicDua}
                  </p>

                  {/* Hinglish Spelling / Pronunciation */}
                  {guide.transliteration && (
                    <div className="mt-3 pt-2 border-t border-amber-200/60 dark:border-emerald-800/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-0.5">
                        Hinglish Spelling / Pronunciation (रोमन हिज्जे):
                      </span>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300 italic font-medium">
                        {guide.transliteration}
                      </p>
                    </div>
                  )}

                  {/* Hinglish Tarjuma */}
                  {guide.duaMeaning && (
                    <div className="mt-2.5 pt-2 border-t border-amber-200/60 dark:border-emerald-800/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#174C3A] dark:text-[#DFC488] block mb-0.5">
                        Hinglish Tarjuma (हिंग्लिश मायने):
                      </span>
                      <p className="text-xs md:text-sm text-emerald-950 dark:text-emerald-100 font-medium leading-relaxed">
                        "{guide.duaMeaning}"
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Common Mistakes to Avoid (Hinglish) */}
              {guide.commonMistakesToAvoid && guide.commonMistakesToAvoid.length > 0 && (
                <div className="bg-red-50/70 dark:bg-red-950/30 border-l-4 border-red-500 p-4 rounded-r-2xl mb-6">
                  <h4 className="text-xs font-bold text-red-900 dark:text-red-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    Aam Galtiyon Se Bachein (Common Mistakes — Hinglish):
                  </h4>
                  <ul className="space-y-1.5 text-xs md:text-sm text-red-950 dark:text-red-200 list-disc list-inside">
                    {guide.commonMistakesToAvoid.map((mistake, mIdx) => (
                      <li key={mIdx}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Source & Authenticity Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-emerald-100 dark:border-emerald-800/50 text-xs">
                <div className="flex items-center gap-1 text-emerald-800/80 dark:text-emerald-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="font-semibold">Kitab:</span>
                  <span>{guide.source}</span>
                  <span>• {guide.referenceNumber}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-md font-semibold text-[11px] bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                  Sanad: {guide.authenticity}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
