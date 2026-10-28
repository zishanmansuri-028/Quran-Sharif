import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  Volume1,
  VolumeX,
  Radio, 
  X,
  Globe 
} from 'lucide-react';
import type { PlaybackMode, AudioPhase, AyahItem, TranslationVoiceType, SupportedLanguage } from '../types';
import { getLanguageMeta } from '../data/indianLanguagesData';

interface ContinuousAudioPlayerBarProps {
  currentAyah: AyahItem | null;
  surahName: string;
  surahNumber: number;
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
  autoPlayNext: boolean;
  setAutoPlayNext: (val: boolean) => void;
  speed: number;
  setSpeed: (val: number) => void;
  onClosePlayer: () => void;
  onOpenCinemaMode: () => void;
}

export const ContinuousAudioPlayerBar: React.FC<ContinuousAudioPlayerBarProps> = ({
  currentAyah,
  surahName,
  surahNumber,
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
  autoPlayNext,
  setAutoPlayNext,
  speed,
  setSpeed,
  onClosePlayer,
  onOpenCinemaMode
}) => {
  if (!currentAyah) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0E3326]/98 backdrop-blur-md text-[#F6F1E5] border-t-2 border-[#C7A65B] shadow-2xl px-3 sm:px-4 pt-2.5 sm:pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Left: Active Ayah Info & Status Badge (Pure Hinglish) */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#C7A65B] text-[#174C3A] font-extrabold text-xs flex items-center justify-center shadow-md">
              {currentAyah.surahNumber || surahNumber}:{currentAyah.numberInSurah}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm text-[#F6F1E5]">
                  {currentAyah.surahName || surahName}
                </span>
                <span className="text-[10px] text-[#DFC488] bg-white/10 px-1.5 py-0.5 rounded-md border border-white/15">
                  Aayat {currentAyah.numberInSurah} · Paara {currentAyah.juz}
                </span>

                {onOpenLanguageModal && (
                  <button
                    onClick={onOpenLanguageModal}
                    className="text-[10px] font-bold text-[#174C3A] bg-[#C7A65B] hover:bg-[#DFC488] px-1.5 py-0.5 rounded-md flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    title="All Indian Languages - Spelling Hinglish"
                  >
                    <Globe className="w-2.5 h-2.5" />
                    <span>{getLanguageMeta(selectedLanguage).name}</span>
                  </button>
                )}
              </div>

              {/* Status Message (Hinglish) */}
              <div className="flex items-center gap-1.5 text-xs mt-0.5">
                {audioPhase === 'playing-arabic' && (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-1 bg-emerald-400 rounded-full animate-soundwave-1"></span>
                      <span className="w-1 bg-emerald-400 rounded-full animate-soundwave-2"></span>
                      <span className="w-1 bg-emerald-400 rounded-full animate-soundwave-3"></span>
                    </span>
                    <span>1. Arabic Tilawat (Mishary Alafasy) chal rahi hai...</span>
                  </span>
                )}

                {audioPhase === 'playing-hinglish' && (
                  <span className="text-[#C7A65B] font-bold flex items-center gap-1.5 animate-pulse text-[11px] sm:text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#DFC488]" />
                    <span>
                      2. Tarjuma bolkar: {voiceType === 'studio' ? 'Shamshad Ali Khan (Studio)' : 'Hinglish Awaz'}...
                    </span>
                  </span>
                )}

                {audioPhase === 'idle' && (
                  <span className="text-[#F6F1E5]/70 text-[11px]">
                    Play button dabayein ya Video Mode kholein
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* YouTube Video Mode Button (Mobile) */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={onOpenCinemaMode}
              className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#C7A65B] to-[#DFC488] text-[#0E3326] font-bold text-[11px] flex items-center gap-1 shadow-md cursor-pointer"
              title="YouTube Video Mode kholein"
            >
              🎬 <span>Video Mode</span>
            </button>
            <button
              onClick={onClosePlayer}
              className="p-1 text-[#F6F1E5]/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Playback Controls (Prev, Play/Pause, Next, Replay) & Volume Slider */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          <button
            onClick={onPrevAyah}
            className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] transition-all cursor-pointer"
            title="Pichhli Aayat (Previous Ayah)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onPlayPause}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
              isPlaying
                ? 'bg-[#C7A65B] text-[#174C3A]'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
            title={isPlaying ? 'Rokein (Pause)' : 'Chalu karein (Play)'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={onNextAyah}
            className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] transition-all cursor-pointer"
            title="Agli Aayat (Next Ayah)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={onReplayCurrent}
            className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#DFC488] transition-all hidden sm:block cursor-pointer"
            title="Ye aayat dobara sunein"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* VOLUME KAM / ZYADA KARNE KA OPTION */}
          <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1.5 rounded-xl border border-[#C7A65B]/30 ml-1">
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 1.0)}
              className="text-[#DFC488] hover:text-white transition-colors cursor-pointer"
              title={volume === 0 ? "Awaz Unmute karein" : "Awaz Mute karein"}
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
              className="w-14 sm:w-20 accent-[#C7A65B] h-1.5 bg-white/20 rounded-lg cursor-pointer"
              title={`Awaz (Volume): ${Math.round(volume * 100)}%`}
            />
            <span className="text-[10px] text-[#DFC488] font-extrabold w-7 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>

        </div>

        {/* Right: Audio Mode Selector, Video Mode Button & Autoplay Toggle (Hinglish) */}
        <div className="flex items-center gap-2 text-xs w-full md:w-auto justify-between md:justify-end">
          
          {/* YouTube Video Mode Button (Desktop) */}
          <button
            onClick={onOpenCinemaMode}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#C7A65B] to-[#DFC488] hover:brightness-110 text-[#0E3326] font-extrabold text-xs shadow-md transition-all cursor-pointer"
            title="Full-Screen YouTube Video Mode kholein"
          >
            🎬 <span>Video Mode</span>
          </button>

          {/* Voice Type Selector (Studio vs TTS) */}
          <button
            onClick={() => setVoiceType(voiceType === 'studio' ? 'tts' : 'studio')}
            className={`px-2 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 cursor-pointer ${
              voiceType === 'studio'
                ? 'bg-emerald-900/80 text-emerald-300 border-emerald-500/60'
                : 'bg-white/10 text-white/80 border-white/20'
            }`}
            title={voiceType === 'studio' ? 'Studio Voice: Shamshad Ali Khan (YouTube jaisa)' : 'Browser Hinglish TTS'}
          >
            <span>{voiceType === 'studio' ? '🎙️ Studio Awaz' : '🤖 TTS Awaz'}</span>
          </button>

          {/* Dual Audio Mode Selector */}
          <div className="flex items-center bg-black/30 border border-[#C7A65B]/40 rounded-xl p-0.5">
            <button
              onClick={() => setPlaybackMode('arabic-and-hinglish')}
              className={`px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                playbackMode === 'arabic-and-hinglish'
                  ? 'bg-[#C7A65B] text-[#174C3A]'
                  : 'text-[#F6F1E5]/80 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Arabic + Tarjuma</span>
            </button>
            <button
              onClick={() => setPlaybackMode('arabic-only')}
              className={`px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                playbackMode === 'arabic-only'
                  ? 'bg-[#C7A65B] text-[#174C3A]'
                  : 'text-[#F6F1E5]/80 hover:text-white'
              }`}
            >
              Sirf Arabic
            </button>
            <button
              onClick={() => setPlaybackMode('hinglish-only')}
              className={`px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                playbackMode === 'hinglish-only'
                  ? 'bg-[#C7A65B] text-[#174C3A]'
                  : 'text-[#F6F1E5]/80 hover:text-white'
              }`}
            >
              Sirf Tarjuma
            </button>
          </div>

          {/* Autoplay Next Toggle */}
          <button
            onClick={() => setAutoPlayNext(!autoPlayNext)}
            className={`px-2 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 cursor-pointer ${
              autoPlayNext
                ? 'bg-emerald-800 text-[#DFC488] border-emerald-600'
                : 'bg-white/10 text-white/60 border-white/15'
            }`}
            title="Auto-Play: Agli aayat apne aap chalegi"
          >
            <Radio className="w-3 h-3" />
            <span className="hidden lg:inline">Auto:</span>
            <span>{autoPlayNext ? 'ON' : 'OFF'}</span>
          </button>

          {/* Close Player (Desktop) */}
          <button
            onClick={onClosePlayer}
            className="hidden md:block p-1.5 rounded-lg hover:bg-white/10 text-[#F6F1E5]/60 hover:text-white transition-colors cursor-pointer"
            title="Player band karein"
          >
            <X className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};
