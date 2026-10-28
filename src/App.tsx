import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SurahParaSelector } from './components/SurahParaSelector';
import { AyahCard } from './components/AyahCard';
import { ContinuousAudioPlayerBar } from './components/ContinuousAudioPlayerBar';
import { CinemaVideoPlayer } from './components/CinemaVideoPlayer';
import { SettingsModal } from './components/SettingsModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { DuaLibrary } from './components/DuaLibrary';
import { SunnahGuide } from './components/SunnahGuide';
import { DigitalTasbeeh } from './components/DigitalTasbeeh';
import { PrayerTimesQibla } from './components/PrayerTimesQibla';
import { NamesOfAllah } from './components/NamesOfAllah';
import { DailyInspirationCard } from './components/DailyInspirationCard';
import { SocialStatusShareModal } from './components/SocialStatusShareModal';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { ALL_SURAHS } from './data/quranSurahs';
import { ALL_PARAS } from './data/quranParas';
import { getLanguageMeta, getAyahTranslationInLanguage } from './data/indianLanguagesData';
import { getSurahAyahs, getJuzAyahs } from './services/quranApi';
import { speakHinglish, stopHinglishSpeech } from './services/quranSpeechService';
import { 
  getBookmarks, 
  saveBookmark, 
  isBookmarked, 
  getReadingProgress, 
  saveReadingProgress,
  getStoredPlaybackMode,
  saveStoredPlaybackMode,
  getStoredVoiceType,
  saveStoredVoiceType,
  getStoredFontSize,
  saveStoredFontSize,
  getStoredVolume,
  saveStoredVolume,
  getStoredLanguage,
  saveStoredLanguage
} from './services/storage';
import type { SurahMeta, ParaMeta, AyahItem, PlaybackMode, AudioPhase, TranslationVoiceType, ViewMode, MainTabType, SupportedLanguage, SocialSharePayload } from './types';
import { 
  Sparkles, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck,
  Heart,
  ArrowRight,
  Globe,
  Volume2,
  BookOpen
} from 'lucide-react';

export const App: React.FC = () => {
  // Navigation: Main Spiritual Companion Tab ('quran' | 'duas' | 'sunnah')
  const [mainTab, setMainTab] = useState<MainTabType>('quran');

  // Quran Reader View Mode ('surah' | 'para')
  const [viewMode, setViewMode] = useState<ViewMode>('surah');
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [selectedJuz, setSelectedJuz] = useState<number>(1);
  const [targetAyahToScroll, setTargetAyahToScroll] = useState<number | null>(null);

  // Ayahs Data
  const [ayahs, setAyahs] = useState<AyahItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Audio Playback & Dual Voice State (Mishary + Shamshad Ali Khan / TTS)
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>(getStoredPlaybackMode());
  const [voiceType, setVoiceType] = useState<TranslationVoiceType>(getStoredVoiceType());
  const [volume, setVolume] = useState<number>(getStoredVolume());
  const [activeAyahIndex, setActiveAyahIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPhase, setAudioPhase] = useState<AudioPhase>('idle');
  const [autoPlayNext, setAutoPlayNext] = useState<boolean>(true);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);

  // Cinema / YouTube Video Mode State
  const [cinemaPlayerOpen, setCinemaPlayerOpen] = useState(false);

  // Display Settings & Indian Language Selection
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(getStoredLanguage());
  const [arabicFontSize, setArabicFontSize] = useState<number>(getStoredFontSize());
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showHindi, setShowHindi] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);

  // Modals & Drawers
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [socialShareModalOpen, setSocialShareModalOpen] = useState(false);
  const [activeShareData, setActiveShareData] = useState<SocialSharePayload | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [mobileSelectorOpen, setMobileSelectorOpen] = useState(false);

  const handleSelectSurahAndScroll = (num: number) => {
    setViewMode('surah');
    setSelectedSurah(num);
    setMobileSelectorOpen(false);
    setTimeout(() => {
      const el = document.getElementById('ayah-reading-stream');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 200, behavior: 'smooth' });
      }
    }, 120);
  };

  const handleSelectJuzAndScroll = (juzNum: number) => {
    setViewMode('para');
    setSelectedJuz(juzNum);
    setMobileSelectorOpen(false);
    setTimeout(() => {
      const el = document.getElementById('ayah-reading-stream');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 200, behavior: 'smooth' });
      }
    }, 120);
  };

  const handleOpenSocialShare = (payload: SocialSharePayload) => {
    setActiveShareData(payload);
    setSocialShareModalOpen(true);
  };

  // References
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const playbackModeRef = useRef<PlaybackMode>(playbackMode);
  const voiceTypeRef = useRef<TranslationVoiceType>(voiceType);
  const selectedLanguageRef = useRef<SupportedLanguage>(selectedLanguage);
  const volumeRef = useRef<number>(volume);
  const autoPlayNextRef = useRef<boolean>(autoPlayNext);
  const speechSpeedRef = useRef<number>(speechSpeed);
  const ayahsRef = useRef<AyahItem[]>(ayahs);
  const activeIndexRef = useRef<number>(activeAyahIndex);

  // Volume Controller handler (real-time volume update)
  const handleSetVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, Math.round(val * 100) / 100));
    setVolume(clamped);
    volumeRef.current = clamped;
    saveStoredVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  // Language setter handler
  const handleSetLanguage = (lang: SupportedLanguage) => {
    setSelectedLanguage(lang);
    selectedLanguageRef.current = lang;
    saveStoredLanguage(lang);
  };

  // Keep refs synced
  useEffect(() => {
    selectedLanguageRef.current = selectedLanguage;
    saveStoredLanguage(selectedLanguage);
  }, [selectedLanguage]);
  useEffect(() => {
    playbackModeRef.current = playbackMode;
    saveStoredPlaybackMode(playbackMode);
  }, [playbackMode]);

  useEffect(() => {
    voiceTypeRef.current = voiceType;
    saveStoredVoiceType(voiceType);
  }, [voiceType]);

  useEffect(() => {
    autoPlayNextRef.current = autoPlayNext;
  }, [autoPlayNext]);

  useEffect(() => {
    speechSpeedRef.current = speechSpeed;
  }, [speechSpeed]);

  useEffect(() => {
    ayahsRef.current = ayahs;
  }, [ayahs]);

  useEffect(() => {
    activeIndexRef.current = activeAyahIndex;
  }, [activeAyahIndex]);

  useEffect(() => {
    saveStoredFontSize(arabicFontSize);
  }, [arabicFontSize]);

  const refreshBookmarksCount = () => {
    setBookmarkCount(getBookmarks().length);
  };

  useEffect(() => {
    refreshBookmarksCount();
  }, []);

  // Fetch Ayahs depending on viewMode (Surah vs Para)
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);
    stopAllAudio();

    if (viewMode === 'surah') {
      getSurahAyahs(selectedSurah)
        .then((data) => {
          if (!isCancelled) {
            setAyahs(data);
            setActiveAyahIndex(0);
            setLoading(false);
            saveReadingProgress({
              lastSurah: selectedSurah,
              lastAyah: 1,
              lastJuz: ALL_SURAHS.find((s) => s.number === selectedSurah)?.juzNumber || 1,
              timestamp: Date.now()
            });
          }
        })
        .catch((err) => {
          if (!isCancelled) {
            console.error(err);
            setError('Aayatein load karne mein dikkat hui. Kripya internet connection check karein.');
            setLoading(false);
          }
        });
    } else {
      // Para (Juz) Mode — Loads all ayahs for that Para!
      getJuzAyahs(selectedJuz)
        .then((data) => {
          if (!isCancelled) {
            setAyahs(data);
            setActiveAyahIndex(0);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!isCancelled) {
            console.error(err);
            setError('Paara ki aayatein load karne mein dikkat hui. Kripya dobara koshish karein.');
            setLoading(false);
          }
        });
    }

    return () => {
      isCancelled = true;
      stopAllAudio();
    };
  }, [viewMode, selectedSurah, selectedJuz]);

  // Scroll to target ayah when requested
  useEffect(() => {
    if (targetAyahToScroll && ayahs.length > 0) {
      setTimeout(() => {
        const el = document.getElementById(`ayah-${targetAyahToScroll}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      setTargetAyahToScroll(null);
    }
  }, [targetAyahToScroll, ayahs]);

  const currentSurahMeta: SurahMeta =
    ALL_SURAHS.find((s) => s.number === selectedSurah) || ALL_SURAHS[0];

  const currentParaMeta: ParaMeta =
    ALL_PARAS.find((p) => p.number === selectedJuz) || ALL_PARAS[0];

  // ==========================================
  // CORE DUAL AUDIO PLAYBACK ENGINE (Mishary + Shamshad Ali Khan)
  // ==========================================

  const stopAllAudio = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setAudioPhase('idle');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    stopHinglishSpeech();
  };

  const playAyahByIndex = (index: number, forcedMode?: PlaybackMode) => {
    const mode = forcedMode || playbackModeRef.current;
    const currentList = ayahsRef.current;
    if (index < 0 || index >= currentList.length) return;

    const targetAyah = currentList[index];
    if (!targetAyah) return;

    // Scroll to the playing ayah smoothly in page view
    const cardEl = document.getElementById(`ayah-${targetAyah.numberInSurah}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Stop ongoing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    stopHinglishSpeech();

    setActiveAyahIndex(index);
    setIsPlaying(true);
    isPlayingRef.current = true;

    // Preload next audio for zero-latency seamless continuity
    if (voiceTypeRef.current === 'studio' && targetAyah.translationAudioUrl) {
      const pre = new Audio();
      pre.preload = 'auto';
      pre.src = targetAyah.translationAudioUrl;
    }

    // 1. Mode: Translation Only
    if (mode === 'hinglish-only') {
      playTranslationVoice(targetAyah, index);
      return;
    }

    // 2. Mode: Arabic First (Both 'arabic-and-hinglish' and 'arabic-only')
    if (targetAyah.audioUrl) {
      setAudioPhase('playing-arabic');
      const audio = new Audio(targetAyah.audioUrl);
      audio.playbackRate = speechSpeedRef.current;
      audio.volume = volumeRef.current; // Real-time volume applied
      audioRef.current = audio;

      audio.onended = () => {
        if (!isPlayingRef.current) return;

        // If mode is Dual (Arabic + Translation), immediately play translation!
        if (mode === 'arabic-and-hinglish') {
          playTranslationVoice(targetAyah, index);
        } else {
          handleAyahSequenceFinished(index);
        }
      };

      audio.onerror = () => {
        console.warn('Arabic audio playback error, proceeding to translation');
        if (mode === 'arabic-and-hinglish') {
          playTranslationVoice(targetAyah, index);
        } else {
          handleAyahSequenceFinished(index);
        }
      };

      audio.play().catch((err) => {
        console.warn('Audio play prevented or interrupted:', err);
      });
    } else {
      // Fallback
      playTranslationVoice(targetAyah, index);
    }
  };

  // Speaks/plays the translation (Studio human voice by Shamshad Ali Khan or Browser TTS in chosen Indian Language)
  const playTranslationVoice = (targetAyah: AyahItem, index: number) => {
    setAudioPhase('playing-hinglish');

    const currentLang = selectedLanguageRef.current;
    const langTrans = getAyahTranslationInLanguage(targetAyah, currentLang);
    const langMeta = getLanguageMeta(currentLang);
    const speechText = currentLang === 'hinglish' 
      ? targetAyah.hinglishTranslation 
      : (langTrans.text || targetAyah.hinglishTranslation);

    // Option A: Studio Human Voice (Authentic YouTube Video style by Shamshad Ali Khan)
    if (voiceTypeRef.current === 'studio' && targetAyah.translationAudioUrl && (currentLang === 'hinglish' || currentLang === 'urdu' || currentLang === 'hindi')) {
      const tAudio = new Audio(targetAyah.translationAudioUrl);
      tAudio.playbackRate = speechSpeedRef.current;
      tAudio.volume = volumeRef.current; // Real-time volume applied
      audioRef.current = tAudio;

      tAudio.onended = () => {
        if (!isPlayingRef.current) return;
        handleAyahSequenceFinished(index);
      };

      tAudio.onerror = () => {
        console.warn('Studio translation error, falling back to TTS');
        speakHinglish(
          speechText,
          speechSpeedRef.current,
          volumeRef.current,
          langMeta.speechCode,
          undefined,
          () => handleAyahSequenceFinished(index)
        );
      };

      tAudio.play().catch((err) => {
        console.warn('Studio audio play error, falling back to TTS:', err);
        speakHinglish(
          speechText,
          speechSpeedRef.current,
          volumeRef.current,
          langMeta.speechCode,
          undefined,
          () => handleAyahSequenceFinished(index)
        );
      });
      return;
    }

    // Option B: Web Speech Synthesis TTS (Supports all Indian languages & Hinglish)
    speakHinglish(
      speechText,
      speechSpeedRef.current,
      volumeRef.current,
      langMeta.speechCode,
      undefined,
      () => handleAyahSequenceFinished(index)
    );
  };

  const handleAyahSequenceFinished = (finishedIndex: number) => {
    if (!isPlayingRef.current) return;

    if (autoPlayNextRef.current) {
      const currentList = ayahsRef.current;
      if (finishedIndex + 1 < currentList.length) {
        // 500ms brief reflective pause before next verse
        setTimeout(() => {
          if (isPlayingRef.current) {
            playAyahByIndex(finishedIndex + 1);
          }
        }, 500);
        return;
      }
    }

    // Sequence ended
    setIsPlaying(false);
    isPlayingRef.current = false;
    setAudioPhase('idle');
  };

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      stopAllAudio();
    } else {
      playAyahByIndex(activeAyahIndex || 0);
    }
  };

  const handleNextAyah = () => {
    if (activeAyahIndex + 1 < ayahs.length) {
      playAyahByIndex(activeAyahIndex + 1);
    }
  };

  const handlePrevAyah = () => {
    if (activeAyahIndex > 0) {
      playAyahByIndex(activeAyahIndex - 1);
    }
  };

  const handleReplayCurrent = () => {
    playAyahByIndex(activeAyahIndex);
  };

  const handleBookmarkToggle = (ayah: AyahItem) => {
    const sNum = ayah.surahNumber || selectedSurah;
    const bId = `quran-${sNum}-${ayah.numberInSurah}`;
    saveBookmark({
      id: bId,
      surahNumber: sNum,
      ayahNumber: ayah.numberInSurah,
      surahName: ayah.surahName || currentSurahMeta.nameSimple,
      ayahText: ayah.arabicText,
      savedAt: Date.now()
    });
    refreshBookmarksCount();
  };

  const handleSelectBookmark = (surahNum: number, ayahNum: number) => {
    if (viewMode !== 'surah' || surahNum !== selectedSurah) {
      setViewMode('surah');
      setSelectedSurah(surahNum);
    }
    setTargetAyahToScroll(ayahNum);
  };

  const currentActiveAyah = ayahs[activeAyahIndex] || ayahs[0] || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E5] text-[#26342D] pb-28">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={mainTab}
        onTabChange={(tab) => {
          setMainTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedLanguage={selectedLanguage}
        openLanguageModal={() => setLanguageModalOpen(true)}
        playbackMode={playbackMode}
        setPlaybackMode={setPlaybackMode}
        openSearch={() => setSearchModalOpen(true)}
        openBookmarks={() => setBookmarksDrawerOpen(true)}
        openSettings={() => setSettingsModalOpen(true)}
        openCinemaMode={() => setCinemaPlayerOpen(true)}
        bookmarkCount={bookmarkCount}
        activeSurahName={currentActiveAyah?.surahName || currentSurahMeta.nameSimple}
        activeAyahNumber={currentActiveAyah?.numberInSurah || 1}
      />

      {/* Main Container with Mobile & Desktop Player Bar Clearance */}
      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-44 sm:pb-36 w-full">

        {/* View 1: Everyday Duas (Masnoon Duas in Pure Hinglish) */}
        {mainTab === 'duas' && (
          <DuaLibrary
            selectedLanguage={selectedLanguage}
            onOpenLanguageModal={() => setLanguageModalOpen(true)}
            onOpenSocialShare={handleOpenSocialShare}
          />
        )}

        {/* View 2: Daily Sunnah Guide (Sunnah Guidance in Pure Hinglish) */}
        {mainTab === 'sunnah' && (
          <SunnahGuide
            selectedLanguage={selectedLanguage}
            onOpenLanguageModal={() => setLanguageModalOpen(true)}
            onOpenSocialShare={handleOpenSocialShare}
          />
        )}

        {/* View 3: Digital Tasbeeh & Zikr Counter */}
        {mainTab === 'tasbeeh' && (
          <DigitalTasbeeh />
        )}

        {/* View 4: Namaz Times & Qibla Direction */}
        {mainTab === 'prayer-times' && (
          <PrayerTimesQibla />
        )}

        {/* View 5: 99 Names of Allah (Asma-ul-Husna) */}
        {mainTab === 'names-of-allah' && (
          <NamesOfAllah onOpenSocialShare={handleOpenSocialShare} />
        )}

        {/* View 6: Quran Reader (Default Full View with 114 Surahs & 30 Paras) */}
        {mainTab === 'quran' && (
          <>
            {/* Attractive & Engaging Daily Inspiration Card & Quick Launch Hub */}
            <DailyInspirationCard
              onOpenSurah={handleSelectSurahAndScroll}
              onOpenTab={(tab) => setMainTab(tab)}
              onOpenSocialShare={handleOpenSocialShare}
            />

            {/* Top Feature Hero Banner (Hinglish) */}
            <div className="bg-gradient-to-r from-[#174C3A] via-[#123E2F] to-[#0E3326] text-[#F6F1E5] rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#C7A65B]/40 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7A65B]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#DFC488] bg-white/10 px-3 py-1 rounded-full border border-white/15">
                      {viewMode === 'para' ? `Paara ${selectedJuz} of 30` : `Surah ${currentSurahMeta.number} of 114`}
                    </span>
                    <span className="text-xs text-[#DFC488]/80 font-medium">
                      {viewMode === 'para'
                        ? `${currentParaMeta.nameHinglish} · ${ayahs.length || currentParaMeta.totalAyahs} Aayatein`
                        : `${currentSurahMeta.revelationType === 'Meccan' ? 'Makki' : 'Madani'} · ${currentSurahMeta.numberOfAyahs} Aayatein · Paara ${currentSurahMeta.juzNumber}`}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F6F1E5] font-serif flex items-center gap-3">
                    {viewMode === 'para' ? (
                      <>
                        <span>Paara {selectedJuz}: {currentParaMeta.nameHinglish}</span>
                        <span className="text-lg sm:text-xl font-normal text-[#DFC488]">
                          ({currentParaMeta.nameHindi})
                        </span>
                        <span className="text-[#C7A65B] font-arabic text-3xl font-normal">
                          {currentParaMeta.nameArabic}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>{currentSurahMeta.nameSimple}</span>
                        <span className="text-lg sm:text-xl font-normal text-[#DFC488]">
                          ({currentSurahMeta.nameHindi})
                        </span>
                        <span className="text-[#C7A65B] font-arabic text-3xl font-normal">
                          {currentSurahMeta.nameArabic}
                        </span>
                      </>
                    )}
                  </h1>

                  <p className="text-xs sm:text-sm text-[#F6F1E5]/80 mt-1">
                {viewMode === 'para'
                  ? `Shuruat: ${currentParaMeta.startSurah} (${currentParaMeta.startAyah})`
                  : `"${currentSurahMeta.nameEnglish}" — ${currentSurahMeta.nameUrdu}`}
              </p>
            </div>

            {/* Quick Actions: Navigation + YouTube Video Mode + Play */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Prev / Next buttons */}
              {viewMode === 'surah' ? (
                <>
                  <button
                    disabled={selectedSurah <= 1}
                    onClick={() => setSelectedSurah(selectedSurah - 1)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-[#F6F1E5] border border-white/20 transition-all cursor-pointer"
                    title="Pichhli Surah"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    disabled={selectedSurah >= 114}
                    onClick={() => setSelectedSurah(selectedSurah + 1)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-[#F6F1E5] border border-white/20 transition-all cursor-pointer"
                    title="Agli Surah"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    disabled={selectedJuz <= 1}
                    onClick={() => setSelectedJuz(selectedJuz - 1)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-[#F6F1E5] border border-white/20 transition-all cursor-pointer"
                    title="Pichhla Paara"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    disabled={selectedJuz >= 30}
                    onClick={() => setSelectedJuz(selectedJuz + 1)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-[#F6F1E5] border border-white/20 transition-all cursor-pointer"
                    title="Agla Paara"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Full Index Modal Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C7A65B] via-[#DFC488] to-[#C7A65B] hover:brightness-110 text-[#0E3326] font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                title="114 Surah aur 30 Paaron ki poori Index (Fahrist) kholein"
              >
                <BookOpen className="w-4 h-4 text-[#0E3326]" />
                <span>📖 Index (فہرست)</span>
              </button>

              {/* YouTube Video Mode Button */}
              <button
                onClick={() => {
                  setCinemaPlayerOpen(true);
                  if (!isPlaying) {
                    playAyahByIndex(activeAyahIndex || 0);
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0E3326] border-2 border-[#C7A65B] text-[#DFC488] font-extrabold text-xs flex items-center gap-2 hover:bg-[#123E2F] shadow-md transition-all cursor-pointer"
                title="YouTube Video style mein full-screen player kholein"
              >
                <span>🎬</span>
                <span>YouTube Video Mode</span>
              </button>

              {/* Play All from Beginning */}
              <button
                onClick={() => playAyahByIndex(0)}
                className="px-4 py-2.5 rounded-xl bg-[#C7A65B] text-[#174C3A] font-extrabold text-xs flex items-center gap-2 hover:bg-[#DFC488] shadow-md transition-all cursor-pointer"
                title="Shuruat se Arabic + Tarjuma sunein"
              >
                <Sparkles className="w-4 h-4" />
                <span>Shuruat se Sunein (Play All)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Quran Navigator & Index Bar */}
        <div className="lg:hidden bg-[#FBF8F1] border-2 border-[#C7A65B]/40 rounded-3xl p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#174C3A] to-[#0E3326] text-[#DFC488] font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                {viewMode === 'para' ? selectedJuz : currentSurahMeta.number}
              </span>
              <div className="min-w-0">
                <div className="font-extrabold text-xs sm:text-sm text-[#174C3A] truncate flex items-center gap-1.5">
                  <span>{viewMode === 'para' ? `Paara ${selectedJuz}: ${currentParaMeta.nameHinglish}` : currentSurahMeta.nameSimple}</span>
                  <span className="text-[10px] text-[#4B5B53] font-normal">
                    ({viewMode === 'para' ? currentParaMeta.nameHindi : currentSurahMeta.nameHindi})
                  </span>
                </div>
                <div className="text-[10px] text-[#4B5B53]/80">
                  {viewMode === 'para'
                    ? `${currentParaMeta.totalAyahs} Aayatein`
                    : `${currentSurahMeta.revelationType === 'Meccan' ? 'Makki' : 'Madani'} · ${currentSurahMeta.numberOfAyahs} Aayatein · Paara ${currentSurahMeta.juzNumber}`}
                </div>
              </div>
            </div>

            <div className="text-right shrink-0 font-arabic text-xl text-[#174C3A]">
              {viewMode === 'para' ? currentParaMeta.nameArabic : currentSurahMeta.nameArabic}
            </div>
          </div>

          {/* Quick Action Buttons on Mobile */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#C7A65B]/25">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#C7A65B] to-[#DFC488] text-[#0E3326] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>📖 Index Kholein (فہرست)</span>
            </button>

            <button
              onClick={() => setMobileSelectorOpen(!mobileSelectorOpen)}
              className="py-2 px-3 rounded-xl bg-white text-[#174C3A] border border-[#C7A65B]/40 font-bold text-xs flex items-center justify-center gap-1 shadow-2xs hover:bg-[#F6F1E5] transition-all cursor-pointer"
            >
              <span>{mobileSelectorOpen ? 'List Chhupayein ✕' : '114 List Dekhein ▾'}</span>
            </button>
          </div>

          {/* Collapsible Mobile Selector if user toggles it */}
          {mobileSelectorOpen && (
            <div className="mt-3 pt-3 border-t border-[#C7A65B]/30 animate-fade-in">
              <SurahParaSelector
                selectedSurah={selectedSurah}
                onSelectSurah={handleSelectSurahAndScroll}
                selectedJuz={selectedJuz}
                onSelectJuz={handleSelectJuzAndScroll}
                viewMode={viewMode}
                onSetViewMode={(mode) => setViewMode(mode)}
              />
            </div>
          )}
        </div>

        {/* 2-Column Responsive Layout: Sidebar Navigator + Ayah Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: 114 Surahs & 30 Paras Browser (Desktop & Laptop) */}
          <div className="hidden lg:block lg:col-span-4">
            <SurahParaSelector
              selectedSurah={selectedSurah}
              onSelectSurah={handleSelectSurahAndScroll}
              selectedJuz={selectedJuz}
              onSelectJuz={handleSelectJuzAndScroll}
              viewMode={viewMode}
              onSetViewMode={(mode) => setViewMode(mode)}
            />
          </div>

          {/* Right Main Column: Ayahs Stream */}
          <div id="ayah-reading-stream" className="lg:col-span-8 space-y-4">
            
            {/* Bismillah Header (Omitted for Surah 9 At-Tawbah) */}
            {!(viewMode === 'surah' && selectedSurah === 9) && (
              <div className="bg-[#FBF8F1] rounded-3xl border border-[#C7A65B]/30 p-6 text-center shadow-sm">
                <p dir="rtl" className="font-quran text-2xl sm:text-3xl text-[#174C3A] font-normal">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-xs text-[#9E813F] mt-2 font-medium">
                  "Shuru karta hoon Allah ke naam se jo bada Meherbaan nihayat Raham wala hai"
                </p>
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="bg-white rounded-3xl border border-[#C7A65B]/20 p-12 text-center shadow-sm">
                <RefreshCw className="w-8 h-8 text-[#C7A65B] animate-spin mx-auto mb-3" />
                <p className="text-sm font-bold text-[#174C3A]">
                  {viewMode === 'para' ? `Paara ${selectedJuz}` : `Surah ${currentSurahMeta.nameSimple}`} load ho rahi hai...
                </p>
                <p className="text-xs text-[#4B5B53] mt-1">
                  Uthmani Arabic text, tarjuma aur audio track taiyaar ho rahe hain...
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-3xl p-6 text-center">
                <p className="font-bold text-sm mb-2">{error}</p>
                <button
                  onClick={() => {
                    if (viewMode === 'surah') setSelectedSurah(selectedSurah);
                    else setSelectedJuz(selectedJuz);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-700 text-white font-bold text-xs hover:bg-rose-800 cursor-pointer"
                >
                  Dobara Koshish Karein (Retry)
                </button>
              </div>
            )}

            {/* Ayahs Cards List */}
            {!loading && !error && ayahs.length > 0 && (
              ayahs.map((ayah, index) => {
                const isActive = isPlaying && activeAyahIndex === index;
                const bId = `quran-${ayah.surahNumber || selectedSurah}-${ayah.numberInSurah}`;
                const saved = isBookmarked(bId);

                return (
                  <AyahCard
                    key={`${ayah.surahNumber || selectedSurah}-${ayah.numberInSurah}-${index}`}
                    ayah={ayah}
                    surahNumber={ayah.surahNumber || selectedSurah}
                    surahName={ayah.surahName || currentSurahMeta.nameSimple}
                    isCurrentlyActive={isActive}
                    audioPhase={audioPhase}
                    voiceType={voiceType}
                    selectedLanguage={selectedLanguage}
                    onOpenLanguageModal={() => setLanguageModalOpen(true)}
                    arabicFontSize={arabicFontSize}
                    showTransliteration={showTransliteration}
                    showHindi={showHindi}
                    showEnglish={showEnglish}
                    isSaved={saved}
                    onPlayAyahDual={() => playAyahByIndex(index, 'arabic-and-hinglish')}
                    onPlayHinglishOnly={() => playAyahByIndex(index, 'hinglish-only')}
                    onPlayArabicOnly={() => playAyahByIndex(index, 'arabic-only')}
                    onToggleBookmark={handleBookmarkToggle}
                    onOpenSocialShare={handleOpenSocialShare}
                  />
                );
              })
            )}

            {/* End of Surah / Para Banner (Hinglish) */}
            {!loading && !error && ayahs.length > 0 && (
              <div className="bg-[#FBF8F1] rounded-3xl border border-[#C7A65B]/30 p-8 text-center mt-8">
                <ShieldCheck className="w-8 h-8 text-[#C7A65B] mx-auto mb-2" />
                <h3 className="font-serif font-bold text-lg text-[#174C3A]">
                  {viewMode === 'para' ? `Paara ${selectedJuz} Poora Hua` : `Surah ${currentSurahMeta.nameSimple} Poori Hui`}
                </h3>
                <p className="text-xs text-[#4B5B53] mt-1 max-w-md mx-auto">
                  Sadaqallahul Azeem (صدق الله العظيم) — Allah Ta'ala ne sach farmaya.
                </p>

                <div className="mt-4 flex items-center justify-center gap-3">
                  {viewMode === 'surah' && selectedSurah < 114 && (
                    <button
                      onClick={() => {
                        setSelectedSurah(selectedSurah + 1);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#174C3A] text-[#F6F1E5] font-bold text-xs hover:bg-[#0E3326] transition-all cursor-pointer shadow-md"
                    >
                      Agli Surah Padhein ({ALL_SURAHS[selectedSurah]?.nameSimple}) ➡️
                    </button>
                  )}

                  {viewMode === 'para' && selectedJuz < 30 && (
                    <button
                      onClick={() => {
                        setSelectedJuz(selectedJuz + 1);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#174C3A] text-[#F6F1E5] font-bold text-xs hover:bg-[#0E3326] transition-all cursor-pointer shadow-md"
                    >
                      Agla Paara Padhein (Paara {selectedJuz + 1}: {ALL_PARAS[selectedJuz]?.nameHinglish}) ➡️
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
        </>
        )}

      </main>

      {/* FIXED CONTINUOUS DUAL AUDIO PLAYER BAR (WITH VOLUME CONTROL & HINGLISH) */}
      <ContinuousAudioPlayerBar
        currentAyah={currentActiveAyah}
        surahName={currentActiveAyah?.surahName || currentSurahMeta.nameSimple}
        surahNumber={currentActiveAyah?.surahNumber || selectedSurah}
        isPlaying={isPlaying}
        audioPhase={audioPhase}
        playbackMode={playbackMode}
        setPlaybackMode={setPlaybackMode}
        voiceType={voiceType}
        setVoiceType={setVoiceType}
        selectedLanguage={selectedLanguage}
        onOpenLanguageModal={() => setLanguageModalOpen(true)}
        volume={volume}
        setVolume={handleSetVolume}
        onPlayPause={handleTogglePlayPause}
        onNextAyah={handleNextAyah}
        onPrevAyah={handlePrevAyah}
        onReplayCurrent={handleReplayCurrent}
        autoPlayNext={autoPlayNext}
        setAutoPlayNext={setAutoPlayNext}
        speed={speechSpeed}
        setSpeed={setSpeechSpeed}
        onClosePlayer={stopAllAudio}
        onOpenCinemaMode={() => setCinemaPlayerOpen(true)}
      />

      {/* FULLSCREEN YOUTUBE CINEMA VIDEO PLAYER (WITH VOLUME CONTROL & HINGLISH) */}
      <CinemaVideoPlayer
        isOpen={cinemaPlayerOpen}
        onClose={() => setCinemaPlayerOpen(false)}
        currentAyah={currentActiveAyah}
        ayahs={ayahs}
        currentIndex={activeAyahIndex}
        isPlaying={isPlaying}
        audioPhase={audioPhase}
        playbackMode={playbackMode}
        setPlaybackMode={setPlaybackMode}
        voiceType={voiceType}
        setVoiceType={setVoiceType}
        selectedLanguage={selectedLanguage}
        onOpenLanguageModal={() => setLanguageModalOpen(true)}
        volume={volume}
        setVolume={handleSetVolume}
        onPlayPause={handleTogglePlayPause}
        onNextAyah={handleNextAyah}
        onPrevAyah={handlePrevAyah}
        onReplayCurrent={handleReplayCurrent}
        onSelectAyah={(idx) => playAyahByIndex(idx)}
        autoPlayNext={autoPlayNext}
        setAutoPlayNext={setAutoPlayNext}
        speed={speechSpeed}
        setSpeed={setSpeechSpeed}
        viewMode={viewMode}
        currentSurahName={currentSurahMeta.nameSimple}
        currentSurahNumber={selectedSurah}
        currentJuzNumber={selectedJuz}
        onToggleBookmark={handleBookmarkToggle}
        isBookmarked={currentActiveAyah ? isBookmarked(`quran-${currentActiveAyah.surahNumber || selectedSurah}-${currentActiveAyah.numberInSurah}`) : false}
        onOpenSocialShare={handleOpenSocialShare}
      />

      {/* FULL QURAN INDEX & SEARCH MODAL (فہرست قرآن) */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSurah={handleSelectSurahAndScroll}
        onSelectJuz={handleSelectJuzAndScroll}
      />

      {/* BOOKMARKS DRAWER */}
      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        onSelectBookmark={handleSelectBookmark}
        onBookmarkChanged={refreshBookmarksCount}
      />

      {/* SETTINGS MODAL */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={handleSetLanguage}
        playbackMode={playbackMode}
        setPlaybackMode={setPlaybackMode}
        voiceType={voiceType}
        setVoiceType={setVoiceType}
        volume={volume}
        setVolume={handleSetVolume}
        arabicFontSize={arabicFontSize}
        setArabicFontSize={setArabicFontSize}
        showTransliteration={showTransliteration}
        setShowTransliteration={setShowTransliteration}
        showHindi={showHindi}
        setShowHindi={setShowHindi}
        showEnglish={showEnglish}
        setShowEnglish={setShowEnglish}
        speechSpeed={speechSpeed}
        setSpeechSpeed={setSpeechSpeed}
      />

      {/* ALL INDIAN LANGUAGES SELECTOR MODAL (SPELLING HINGLISH) */}
      <LanguageSelectorModal
        isOpen={languageModalOpen}
        onClose={() => setLanguageModalOpen(false)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={handleSetLanguage}
      />

      {/* WHATSAPP & INSTAGRAM STATUS / SOCIAL MEDIA SHARING MODAL */}
      <SocialStatusShareModal
        isOpen={socialShareModalOpen}
        onClose={() => setSocialShareModalOpen(false)}
        data={activeShareData}
      />

    </div>
  );
};
