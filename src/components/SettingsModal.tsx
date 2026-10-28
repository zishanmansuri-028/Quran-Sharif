import React from 'react';
import { X, Sliders, Type, Volume2, Sparkles, Volume1, VolumeX, Globe } from 'lucide-react';
import type { PlaybackMode, TranslationVoiceType, SupportedLanguage } from '../types';
import { INDIAN_LANGUAGES_LIST } from '../data/indianLanguagesData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: (lang: SupportedLanguage) => void;
  playbackMode: PlaybackMode;
  setPlaybackMode: (mode: PlaybackMode) => void;
  voiceType: TranslationVoiceType;
  setVoiceType: (type: TranslationVoiceType) => void;
  volume: number;
  setVolume: (val: number) => void;
  arabicFontSize: number;
  setArabicFontSize: (size: number) => void;
  showTransliteration: boolean;
  setShowTransliteration: (val: boolean) => void;
  showHindi: boolean;
  setShowHindi: (val: boolean) => void;
  showEnglish: boolean;
  setShowEnglish: (val: boolean) => void;
  speechSpeed: number;
  setSpeechSpeed: (val: number) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  selectedLanguage,
  setSelectedLanguage,
  playbackMode,
  setPlaybackMode,
  voiceType,
  setVoiceType,
  volume,
  setVolume,
  arabicFontSize,
  setArabicFontSize,
  showTransliteration,
  setShowTransliteration,
  showHindi,
  setShowHindi,
  showEnglish,
  setShowEnglish,
  speechSpeed,
  setSpeechSpeed
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border-2 border-[#C7A65B]/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Hinglish) */}
        <div className="p-4 sm:p-5 bg-[#174C3A] text-[#F6F1E5] flex items-center justify-between border-b border-[#C7A65B]/30">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-[#C7A65B]" />
            <h2 className="text-base font-bold">Quran Sharif Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#F6F1E5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Hinglish) */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs text-[#26342D]">
          
          {/* Dual Audio Playback Mode */}
          <div className="space-y-2">
            <span className="font-bold text-sm text-[#174C3A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C7A65B]" />
              <span>Audio Playback Mode:</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setPlaybackMode('arabic-and-hinglish')}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  playbackMode === 'arabic-and-hinglish'
                    ? 'bg-[#174C3A] text-[#F6F1E5] border-[#C7A65B] shadow-sm font-bold'
                    : 'bg-[#FBF8F1] border-[#C7A65B]/30 hover:bg-[#F6F1E5]'
                }`}
              >
                <div className="font-bold">Arabic + Hinglish</div>
                <div className="text-[10px] opacity-80 mt-1">Tilawat ke turant baad bolkar tarjuma</div>
              </button>

              <button
                onClick={() => setPlaybackMode('arabic-only')}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  playbackMode === 'arabic-only'
                    ? 'bg-[#174C3A] text-[#F6F1E5] border-[#C7A65B] shadow-sm font-bold'
                    : 'bg-[#FBF8F1] border-[#C7A65B]/30 hover:bg-[#F6F1E5]'
                }`}
              >
                <div className="font-bold">Sirf Arabic</div>
                <div className="text-[10px] opacity-80 mt-1">Sirf Qari ki tilawat</div>
              </button>

              <button
                onClick={() => setPlaybackMode('hinglish-only')}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  playbackMode === 'hinglish-only'
                    ? 'bg-[#174C3A] text-[#F6F1E5] border-[#C7A65B] shadow-sm font-bold'
                    : 'bg-[#FBF8F1] border-[#C7A65B]/30 hover:bg-[#F6F1E5]'
                }`}
              >
                <div className="font-bold">Sirf Hinglish</div>
                <div className="text-[10px] opacity-80 mt-1">Sirf bolkar tarjuma</div>
              </button>
            </div>
          </div>

          {/* All Indian Languages Option (Spelling Hinglish) */}
          <div className="space-y-2.5 p-3.5 rounded-2xl bg-[#FBF8F1] border border-[#C7A65B]/30">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#174C3A] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C7A65B]" />
                <span>All Indian Languages (Spelling Hinglish):</span>
              </span>
              <span className="text-[10px] bg-[#C7A65B] text-[#174C3A] px-2 py-0.5 rounded font-extrabold">
                14 Languages
              </span>
            </div>
            <p className="text-[11px] text-[#4B5B53]">
              Apni bhasha chunein (Native Script + Hinglish Spelling ke sath):
            </p>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {INDIAN_LANGUAGES_LIST.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedLanguage === lang.id
                      ? 'bg-[#174C3A] text-[#F6F1E5] border-[#C7A65B] shadow-sm font-bold'
                      : 'bg-white border-[#C7A65B]/25 text-[#26342D] hover:bg-[#F6F1E5]'
                  }`}
                >
                  <div className="font-bold text-xs truncate">{lang.name} ({lang.nativeName})</div>
                  <div className={`text-[9px] truncate ${selectedLanguage === lang.id ? 'text-[#DFC488]' : 'text-[#9E813F]'}`}>
                    Spelling: {lang.hinglishSpelling}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Voice Type (Studio vs TTS) */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-[#FBF8F1] border border-[#C7A65B]/30">
            <span className="font-bold text-xs text-[#174C3A] block">
              Tarjuma Awaz Source (Voice Type):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setVoiceType('studio')}
                className={`p-2.5 rounded-xl border text-left font-bold text-xs transition-all cursor-pointer ${
                  voiceType === 'studio'
                    ? 'bg-[#174C3A] text-[#F6F1E5] border-[#C7A65B]'
                    : 'bg-white border-[#C7A65B]/30 text-[#26342D]'
                }`}
              >
                <div>🎙️ Studio Awaz</div>
                <div className="text-[10px] opacity-75 font-normal mt-0.5">Shamshad Ali Khan (YouTube Jaisa)</div>
              </button>

              <button
                onClick={() => setVoiceType('tts')}
                className={`p-2.5 rounded-xl border text-left font-bold text-xs transition-all cursor-pointer ${
                  voiceType === 'tts'
                    ? 'bg-[#174C3A] text-[#F6F1E5] border-[#C7A65B]'
                    : 'bg-white border-[#C7A65B]/30 text-[#26342D]'
                }`}
              >
                <div>🤖 Hinglish Speech TTS</div>
                <div className="text-[10px] opacity-75 font-normal mt-0.5">Browser speech synthesis</div>
              </button>
            </div>
          </div>

          {/* VOLUME KAM / ZYADA (Volume Slider) */}
          <div className="space-y-2 p-4 rounded-2xl bg-[#FBF8F1] border border-[#C7A65B]/30">
            <div className="flex items-center justify-between font-bold text-[#174C3A]">
              <span className="flex items-center gap-1.5">
                {volume === 0 ? <VolumeX className="w-4 h-4 text-rose-500" /> : volume < 0.5 ? <Volume1 className="w-4 h-4 text-[#C7A65B]" /> : <Volume2 className="w-4 h-4 text-[#C7A65B]" />}
                <span>Awaz Kam / Zyada (Volume Control)</span>
              </span>
              <span className="bg-[#174C3A] text-[#DFC488] px-2 py-0.5 rounded-md text-[11px] font-extrabold">
                {Math.round(volume * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setVolume(0)}
                className="text-[11px] font-bold text-rose-700 hover:underline cursor-pointer"
              >
                Mute
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-[#C7A65B] h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <button
                onClick={() => setVolume(1.0)}
                className="text-[11px] font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                100%
              </button>
            </div>
          </div>

          {/* Arabic Font Size Slider */}
          <div className="space-y-2 p-4 rounded-2xl bg-[#FBF8F1] border border-[#C7A65B]/30">
            <div className="flex items-center justify-between font-bold text-[#174C3A]">
              <span className="flex items-center gap-1.5">
                <Type className="w-4 h-4 text-[#C7A65B]" />
                <span>Arabic Aksharon ka Size (Font Size)</span>
              </span>
              <span className="bg-[#174C3A] text-[#DFC488] px-2 py-0.5 rounded-md text-[11px]">
                {arabicFontSize}px
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[11px] font-bold">Chhota</span>
              <input
                type="range"
                min="22"
                max="46"
                value={arabicFontSize}
                onChange={(e) => setArabicFontSize(parseInt(e.target.value))}
                className="w-full accent-[#C7A65B] h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <span className="text-base font-bold">Bada</span>
            </div>
          </div>

          {/* Hinglish Speech Speed */}
          <div className="space-y-2 p-4 rounded-2xl bg-[#FBF8F1] border border-[#C7A65B]/30">
            <div className="flex items-center justify-between font-bold text-[#174C3A]">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#C7A65B]" />
                <span>Bolne ki Raftaar (Speed)</span>
              </span>
              <span className="bg-[#174C3A] text-[#DFC488] px-2 py-0.5 rounded-md text-[11px]">
                {speechSpeed}x
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              {[0.75, 1.0, 1.25].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeechSpeed(s)}
                  className={`flex-1 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    speechSpeed === s
                      ? 'bg-[#174C3A] text-[#F6F1E5]'
                      : 'bg-white border border-[#C7A65B]/30 text-[#26342D]'
                  }`}
                >
                  {s === 0.75 ? 'Dheema (0.75x)' : s === 1.0 ? 'Normal (1.0x)' : 'Tez (1.25x)'}
                </button>
              ))}
            </div>
          </div>

          {/* Display Toggles */}
          <div className="space-y-2.5">
            <span className="font-bold text-sm text-[#174C3A] block">
              Kya kya dikhana hai (Display Options):
            </span>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FBF8F1] border border-[#C7A65B]/20">
              <span className="font-semibold text-xs">Roman Transliteration (Uchharan)</span>
              <button
                onClick={() => setShowTransliteration(!showTransliteration)}
                className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                  showTransliteration ? 'bg-[#C7A65B]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    showTransliteration ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FBF8F1] border border-[#C7A65B]/20">
              <span className="font-semibold text-xs">Hindi Tarjuma (Devanagari)</span>
              <button
                onClick={() => setShowHindi(!showHindi)}
                className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                  showHindi ? 'bg-[#C7A65B]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    showHindi ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FBF8F1] border border-[#C7A65B]/20">
              <span className="font-semibold text-xs">English Translation (Sahih International)</span>
              <button
                onClick={() => setShowEnglish(!showEnglish)}
                className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                  showEnglish ? 'bg-[#C7A65B]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    showEnglish ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FBF8F1] border-t border-[#C7A65B]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#174C3A] text-[#F6F1E5] font-bold text-xs hover:bg-[#0E3326] transition-colors cursor-pointer"
          >
            Save Karein (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
