import React, { useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Volume2, 
  Volume1,
  VolumeX, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  X, 
  SlidersHorizontal,
  Radio, 
  Share2, 
  Bookmark, 
  Check,
  Globe,
  MessageCircle 
} from 'lucide-react';
import type { AyahItem, AudioPhase, PlaybackMode, TranslationVoiceType, ViewMode, SupportedLanguage, SocialSharePayload } from '../types';
import { getLanguageMeta, getAyahTranslationInLanguage } from '../data/indianLanguagesData';

interface CinemaVideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  currentAyah: AyahItem | null;
  ayahs: AyahItem[];
  currentIndex: number;
  isPlaying: boolean;
  audioPhase: AudioPhase;
  playbackMode: PlaybackMode;
  setPlaybackMode: (mode: PlaybackMode) => void;
  voiceType: TranslationVoiceType;
  setVoiceType: (type: TranslationVoiceType) => void;
  selectedLanguage?: SupportedLanguage;
  onOpenLanguageModal?: () => void;
  volume: number;
  setVolume: (val: number) => void;
  onPlayPause: () => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  onReplayCurrent: () => void;
  onSelectAyah: (ayahIndex: number) => void;
  autoPlayNext: boolean;
  setAutoPlayNext: (val: boolean) => void;
  speed: number;
  setSpeed: (val: number) => void;
  viewMode: ViewMode;
  currentSurahName: string;
  currentSurahNumber: number;
  currentJuzNumber: number;
  onToggleBookmark?: (ayah: AyahItem) => void;
  isBookmarked?: boolean;
  onOpenSocialShare?: (payload: SocialSharePayload) => void;
}

export const CinemaVideoPlayer: React.FC<CinemaVideoPlayerProps> = ({
  isOpen,
  onClose,
  currentAyah,
  ayahs,
  currentIndex,
  isPlaying,
  audioPhase,
  playbackMode,
  setPlaybackMode,
  voiceType,
  setVoiceType,
  selectedLanguage = 'hinglish',
  onOpenLanguageModal,
  volume,
  setVolume,
  onPlayPause,
  onNextAyah,
  onPrevAyah,
  onReplayCurrent,
  onSelectAyah,
  autoPlayNext,
  setAutoPlayNext,
  speed,
  setSpeed,
  viewMode,
  currentSurahName,
  currentSurahNumber,
  currentJuzNumber,
  onToggleBookmark,
  isBookmarked = false,
  onOpenSocialShare
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.code === 'Space') {
        e.preventDefault();
        onPlayPause();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        onNextAyah();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        onPrevAyah();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        setVolume(Math.min(1.0, Math.round((volume + 0.1) * 10) / 10));
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        setVolume(Math.max(0.0, Math.round((volume - 0.1) * 10) / 10));
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setVolume(volume > 0 ? 0 : 1.0);
      } else if (e.code === 'Escape') {
        if (isFullscreen) {
          exitFullscreen();
        } else {
          onClose();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onPlayPause, onNextAyah, onPrevAyah, volume, setVolume, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      exitFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    } else {
      setIsFullscreen(false);
    }
  };

  if (!isOpen || !currentAyah) return null;

  const isArabicPlaying = isPlaying && audioPhase === 'playing-arabic';
  const isTranslationPlaying = isPlaying && audioPhase === 'playing-hinglish';

  const handleShare = () => {
    const text = `${currentAyah.arabicText}\n\n[Hinglish Meaning]: ${currentAyah.hinglishTranslation}\n\n[Urdu Tarjuma]: ${currentAyah.urduTranslation || ''}\n\n[Hindi Tarjuma]: ${currentAyah.hindiTranslation || ''}\n\n— [Quran Sharif • Paara ${currentAyah.juz} • Surah ${currentAyah.surahName || currentSurahName} (${currentAyah.surahNumber || currentSurahNumber}:${currentAyah.numberInSurah})]`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    if (onOpenSocialShare) {
      onOpenSocialShare({
        title: `Surah ${currentAyah.surahName || currentSurahName}`,
        arabicText: currentAyah.arabicText,
        hinglishText: currentAyah.hinglishTranslation,
        englishText: currentAyah.englishTranslation,
        reference: `Aayat ${currentAyah.numberInSurah} • Paara ${currentAyah.juz}`,
        type: 'ayah'
      });
      return;
    }
    const text = `✨ *Bismillahir Rahmanir Raheem* ✨\n\n📖 *Quran Sharif — Surah ${currentAyah.surahName || currentSurahName} (${currentAyah.surahNumber || currentSurahNumber}:${currentAyah.numberInSurah}) • Paara ${currentAyah.juz}*\n\n${currentAyah.arabicText}\n\n*Hinglish Tarjuma:*\n${currentAyah.hinglishTranslation}\n\n— *Quran Sharif Web App* (Tilawat + Bolkar Tarjuma)\nAage share karein aur ajar payein! 🤲`;
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      navigator.clipboard.writeText(text);
      window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#091F17] text-[#F6F1E5] flex flex-col justify-between overflow-hidden select-none animate-fadeIn">
      
      {/* Background Islamic Watermark / Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C7A65B]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#174C3A]/50 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#C7A65B_1px,transparent_1px)] [background-size:28px_28px] opacity-10" />
      </div>

      {/* TOP HEADER BAR (Hinglish + Safe Area) */}
      <header className="relative z-10 px-4 sm:px-8 pt-[max(0.75rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-3.5 bg-[#061711]/90 backdrop-blur-md border-b border-[#C7A65B]/25 flex items-center justify-between gap-4">
        
        {/* Left: Video / Para / Surah Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#C7A65B] text-[#0E3326] flex items-center justify-center font-extrabold text-sm shadow-lg shadow-[#C7A65B]/20">
            🎬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-extrabold text-[#DFC488] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                {viewMode === 'para' ? `Paara ${currentJuzNumber} / 30` : `Surah ${currentAyah.surahNumber || currentSurahNumber} / 114`}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#F6F1E5]">
                {currentAyah.surahName || currentSurahName}
              </span>
              <span className="text-xs text-[#DFC488]/80 font-medium bg-[#174C3A] px-2 py-0.5 rounded-md border border-[#C7A65B]/30">
                Aayat {currentAyah.numberInSurah} (Kul {ayahs.length} mein se {currentIndex + 1})
              </span>
            </div>
            
            {/* Audio Pair Signature in Hinglish */}
            <p className="text-[11px] text-[#F6F1E5]/70 hidden sm:flex items-center gap-1.5 mt-0.5">
              <span>Tilawat: <strong>Qari Mishary Rashid Alafasy</strong></span>
              <span>•</span>
              <span>Tarjuma Awaz: <strong>{voiceType === 'studio' ? 'Shamshad Ali Khan (Fateh Muhammad Jalandhary)' : 'Hinglish Speech TTS'}</strong></span>
            </p>
          </div>
        </div>

        {/* Right: Actions (Bookmark, Share, Settings, Fullscreen, Close) */}
        <div className="flex items-center gap-2">
          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(currentAyah)}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-[#C7A65B] text-[#0E3326] border-[#C7A65B]'
                  : 'bg-white/10 hover:bg-white/20 text-[#F6F1E5] border-white/15'
              }`}
              title="Bookmark karein"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleShare}
            className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] border border-white/15 transition-all cursor-pointer"
            title="Aayat copy karein"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="p-2 sm:p-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 transition-all cursor-pointer"
            title="WhatsApp par Aayat share karein"
          >
            <MessageCircle className="w-4 h-4" />
          </button>

          {onOpenLanguageModal && (
            <button
              onClick={onOpenLanguageModal}
              className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#DFC488] border border-[#C7A65B]/40 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="All Indian Languages - Bhasha badlein"
            >
              <Globe className="w-4 h-4 text-[#C7A65B]" />
              <span className="hidden md:inline">{getLanguageMeta(selectedLanguage).name}</span>
            </button>
          )}

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
              showSettings ? 'bg-[#C7A65B] text-[#0E3326] border-[#C7A65B]' : 'bg-white/10 hover:bg-white/20 text-[#F6F1E5] border-white/15'
            }`}
            title="Audio aur Display settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] border border-white/15 transition-all hidden sm:block cursor-pointer"
            title="Full Screen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-all cursor-pointer"
            title="Video Mode band karein (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* QUICK SETTINGS POPUP (Pure Hinglish) */}
      {showSettings && (
        <div className="absolute top-16 right-4 sm:right-8 z-30 w-80 bg-[#0E3326] border-2 border-[#C7A65B] rounded-2xl p-4 shadow-2xl animate-scaleUp">
          <div className="flex items-center justify-between pb-2 border-b border-white/15 mb-3">
            <h4 className="font-bold text-xs text-[#DFC488] uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C7A65B]" />
              <span>Playback Settings</span>
            </h4>
            <button onClick={() => setShowSettings(false)} className="text-white/60 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Voice Source */}
            <div>
              <label className="text-[11px] text-white/70 block mb-1">Tarjuma Awaz Source (Voice):</label>
              <div className="grid grid-cols-2 gap-1.5 bg-black/30 p-1 rounded-xl">
                <button
                  onClick={() => setVoiceType('studio')}
                  className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                    voiceType === 'studio'
                      ? 'bg-[#C7A65B] text-[#0E3326]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  🎙️ Studio (YouTube jaisa)
                </button>
                <button
                  onClick={() => setVoiceType('tts')}
                  className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                    voiceType === 'tts'
                      ? 'bg-[#C7A65B] text-[#0E3326]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  🤖 Hinglish TTS
                </button>
              </div>
            </div>

            {/* Playback Mode */}
            <div>
              <label className="text-[11px] text-white/70 block mb-1">Audio Mode:</label>
              <div className="grid grid-cols-3 gap-1 bg-black/30 p-1 rounded-xl">
                <button
                  onClick={() => setPlaybackMode('arabic-and-hinglish')}
                  className={`py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                    playbackMode === 'arabic-and-hinglish' ? 'bg-emerald-600 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Arabic + Tarjuma
                </button>
                <button
                  onClick={() => setPlaybackMode('arabic-only')}
                  className={`py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                    playbackMode === 'arabic-only' ? 'bg-emerald-600 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Sirf Arabic
                </button>
                <button
                  onClick={() => setPlaybackMode('hinglish-only')}
                  className={`py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                    playbackMode === 'hinglish-only' ? 'bg-emerald-600 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Sirf Tarjuma
                </button>
              </div>
            </div>

            {/* Speed */}
            <div>
              <label className="text-[11px] text-white/70 block mb-1">Raftaar (Speed):</label>
              <div className="flex gap-1.5">
                {[0.75, 1.0, 1.25, 1.5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`flex-1 py-1 rounded-lg text-center font-bold text-[11px] border cursor-pointer ${
                      speed === s ? 'bg-[#C7A65B] text-[#0E3326] border-[#C7A65B]' : 'bg-white/5 text-white/70 border-white/10'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            {/* Volume in Settings */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] text-white/70">Awaz (Volume):</label>
                <span className="text-[11px] font-bold text-[#DFC488]">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-[#C7A65B] h-1.5 bg-white/20 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* CENTER STAGE: IMMERSIVE YOUTUBE VIDEO DISPLAY */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-12 md:px-20 py-4 max-w-6xl mx-auto w-full text-center overflow-y-auto">
        
        {/* Tilawat Status Badge (Hinglish) */}
        <div className="mb-3 sm:mb-5">
          {isArabicPlaying && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-lg shadow-emerald-900/30 animate-pulse">
              <span className="flex gap-1 items-end h-3.5">
                <span className="w-1 bg-emerald-400 rounded-full animate-soundwave-1" />
                <span className="w-1 bg-emerald-400 rounded-full animate-soundwave-2" />
                <span className="w-1 bg-emerald-400 rounded-full animate-soundwave-3" />
              </span>
              <span className="text-xs sm:text-sm font-bold">1. Arabic Tilawat: Sheikh Mishary Rashid Alafasy</span>
            </div>
          )}

          {isTranslationPlaying && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7A65B]/25 text-[#DFC488] border border-[#C7A65B] shadow-lg shadow-[#C7A65B]/20 animate-pulse">
              <Sparkles className="w-4 h-4 text-[#DFC488]" />
              <span className="text-xs sm:text-sm font-bold">
                2. Tarjuma Awaz: {voiceType === 'studio' ? 'Shamshad Ali Khan (Fateh Muhammad Jalandhary)' : 'Hinglish Speech TTS'}
              </span>
            </div>
          )}

          {!isPlaying && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs border border-white/15">
              <span>Aayat {currentAyah.numberInSurah} ruki hui hai — Play button dabayein ya Space dabayein</span>
            </div>
          )}
        </div>

        {/* 1. ARABIC CALLIGRAPHY STAGE */}
        <div className={`w-full max-w-4xl p-5 sm:p-7 rounded-3xl transition-all duration-500 border ${
          isArabicPlaying
            ? 'bg-[#123E2F]/90 border-emerald-400/80 ring-4 ring-emerald-500/30 shadow-2xl scale-[1.01]'
            : 'bg-[#0E3326]/60 border-[#C7A65B]/30'
        }`}>
          <p
            dir="rtl"
            className="font-quran text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F6F1E5] font-normal leading-[1.8] sm:leading-[2.0] tracking-wide"
          >
            {currentAyah.arabicText}
          </p>
          
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#C7A65B]/20 text-[#DFC488] text-[11px] font-bold flex items-center justify-center border border-[#C7A65B]/40">
              {currentAyah.numberInSurah}
            </span>
            <span className="text-xs text-[#DFC488]/70">
              {currentAyah.romanTransliteration}
            </span>
          </div>
        </div>

        {/* 2. TRANSLATION DISPLAY BOX (All Indian Languages + Hinglish) */}
        <div className={`w-full max-w-4xl mt-4 sm:mt-5 p-4 sm:p-6 rounded-3xl transition-all duration-500 border ${
          isTranslationPlaying
            ? 'bg-[#1C3A2F] border-[#C7A65B] ring-4 ring-[#C7A65B]/40 shadow-2xl scale-[1.01]'
            : 'bg-[#0E3326]/40 border-white/10'
        }`}>
          {/* Authentic Urdu Text (Jalandhry Translation) */}
          {currentAyah.urduTranslation && (
            <p
              dir="rtl"
              className={`font-urdu text-xl sm:text-2xl md:text-3xl text-right mb-2.5 transition-colors ${
                isTranslationPlaying ? 'text-[#DFC488] font-semibold' : 'text-[#F6F1E5]/90'
              }`}
            >
              {currentAyah.urduTranslation}
            </p>
          )}

          {/* Dynamic Selected Indian Language + Hinglish */}
          <div className="text-left sm:text-center">
            {selectedLanguage !== 'hinglish' && (
              <div className="mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFC488] bg-[#0E3326] px-2.5 py-0.5 rounded-full border border-[#C7A65B]/40 inline-flex items-center gap-1.5 mb-1.5">
                  <Globe className="w-3 h-3 text-[#C7A65B]" />
                  <span>{getLanguageMeta(selectedLanguage).name} ({getLanguageMeta(selectedLanguage).nativeName}) — Spelling: {getLanguageMeta(selectedLanguage).hinglishSpelling}</span>
                </span>
                <p className={`text-base sm:text-lg md:text-xl transition-colors font-medium ${
                  isTranslationPlaying ? 'text-[#DFC488] font-bold' : 'text-[#F6F1E5]'
                }`}>
                  "{getAyahTranslationInLanguage(currentAyah, selectedLanguage).text}"
                </p>
              </div>
            )}

            {/* Hinglish Meaning (Always prominently featured) */}
            <div className="mt-1">
              <span className="text-[10px] uppercase font-bold text-[#DFC488]/70 block mb-0.5">
                Hinglish Spelling / Meaning:
              </span>
              <p className={`text-sm sm:text-base md:text-lg transition-colors font-medium ${
                isTranslationPlaying && selectedLanguage === 'hinglish' ? 'text-[#DFC488] font-bold' : 'text-[#F6F1E5]/95'
              }`}>
                "{currentAyah.hinglishTranslation}"
              </p>
            </div>

            {/* Hindi (Devanagari) */}
            {currentAyah.hindiTranslation && selectedLanguage !== 'hindi' && (
              <p className="text-xs sm:text-sm text-emerald-200/80 mt-1.5 font-hindi">
                {currentAyah.hindiTranslation}
              </p>
            )}

            {/* English (Sahih International) */}
            {currentAyah.englishTranslation && selectedLanguage !== 'english' && (
              <p className="text-[11px] sm:text-xs text-[#F6F1E5]/60 mt-0.5 italic">
                "{currentAyah.englishTranslation}"
              </p>
            )}
          </div>
        </div>
      </main>

      {/* BOTTOM CONTROLLER BAR (Hinglish + Volume Slider + Safe Area) */}
      <footer className="relative z-10 px-4 sm:px-8 pt-2.5 sm:pt-3.5 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] bg-[#061711]/95 backdrop-blur-md border-t border-[#C7A65B]/30">
        
        {/* Scrubber / Progress Bar */}
        <div className="max-w-6xl mx-auto mb-2.5">
          <div className="flex items-center justify-between text-[11px] text-[#DFC488] font-semibold mb-1">
            <span>Aayat {currentAyah.numberInSurah} of {ayahs.length}</span>
            <span>{Math.round(((currentIndex + 1) / ayahs.length) * 100)}% Poora Hua</span>
          </div>
          
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-[#C7A65B] rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / ayahs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Media Controls */}
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left Info: Auto-Next Switch & Speed */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoPlayNext(!autoPlayNext)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                autoPlayNext ? 'bg-emerald-900/60 text-emerald-300 border-emerald-500/50' : 'bg-white/5 text-white/50 border-white/10'
              }`}
              title="Agli aayat apne aap chalegi"
            >
              <Radio className="w-3 h-3" />
              <span className="hidden sm:inline">Auto Next: {autoPlayNext ? 'Chalu' : 'Band'}</span>
            </button>

            <span className="text-[11px] text-[#DFC488]/80 hidden md:inline">
              Speed: {speed}x
            </span>
          </div>

          {/* Center Playback Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Previous Ayah */}
            <button
              onClick={onPrevAyah}
              disabled={currentIndex <= 0}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-[#F6F1E5] transition-all cursor-pointer"
              title="Pichhli Aayat (Left Arrow)"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Replay Current */}
            <button
              onClick={onReplayCurrent}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#DFC488] transition-all cursor-pointer"
              title="Ye aayat dobara sunein"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Main Play / Pause Button */}
            <button
              onClick={onPlayPause}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#C7A65B] to-[#DFC488] hover:scale-105 active:scale-95 text-[#0E3326] flex items-center justify-center shadow-xl shadow-[#C7A65B]/25 transition-all cursor-pointer"
              title={isPlaying ? 'Rokein (Space)' : 'Chalu karein (Space)'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current text-[#0E3326]" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5 text-[#0E3326]" />
              )}
            </button>

            {/* Next Ayah */}
            <button
              onClick={onNextAyah}
              disabled={currentIndex >= ayahs.length - 1}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-[#F6F1E5] transition-all cursor-pointer"
              title="Agli Aayat (Right Arrow)"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Right: VOLUME SLIDER (Awaz Kam / Zyada) & Reciter Info */}
          <div className="flex items-center gap-2">
            
            {/* Volume Control */}
            <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-xl border border-[#C7A65B]/40">
              <button
                onClick={() => setVolume(volume > 0 ? 0 : 1.0)}
                className="text-[#DFC488] hover:text-white transition-colors cursor-pointer"
                title={volume === 0 ? "Awaz Unmute karein (M)" : "Awaz Mute karein (M)"}
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-4 h-4 text-[#DFC488]" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#DFC488]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 sm:w-24 accent-[#C7A65B] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                title={`Awaz (Volume): ${Math.round(volume * 100)}% (Arrow Up/Down)`}
              />
              <span className="text-[10px] text-[#DFC488] font-extrabold w-7 text-right hidden sm:inline">
                {Math.round(volume * 100)}%
              </span>
            </div>

            {/* Reciter Badge */}
            <span className="text-[11px] text-emerald-400/90 bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-500/30 hidden lg:inline-flex items-center gap-1 font-medium">
              <span>{voiceType === 'studio' ? 'Mishary + Shamshad' : 'Mishary + TTS'}</span>
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};
