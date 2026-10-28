import React from 'react';
import { 
  BookOpen, Search, Bookmark, Sparkles, SlidersHorizontal, 
  Heart, ShieldCheck, Film, Globe, Clock, Award
} from 'lucide-react';
import type { PlaybackMode, MainTabType, SupportedLanguage } from '../types';
import { getLanguageMeta } from '../data/indianLanguagesData';

interface NavbarProps {
  activeTab: MainTabType;
  onTabChange: (tab: MainTabType) => void;
  selectedLanguage: SupportedLanguage;
  openLanguageModal: () => void;
  playbackMode: PlaybackMode;
  setPlaybackMode: (mode: PlaybackMode) => void;
  openSearch: () => void;
  openBookmarks: () => void;
  openSettings: () => void;
  openCinemaMode: () => void;
  bookmarkCount: number;
  activeSurahName: string;
  activeAyahNumber: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  selectedLanguage,
  openLanguageModal,
  playbackMode,
  setPlaybackMode,
  openSearch,
  openBookmarks,
  openSettings,
  openCinemaMode,
  bookmarkCount
}) => {
  const navTabs: { id: MainTabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'quran', label: 'Quran Reader', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'duas', label: 'Everyday Duas', icon: <Heart className="w-4 h-4" /> },
    { id: 'sunnah', label: 'Sunnah Guide', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'tasbeeh', label: 'Digital Tasbeeh', icon: <Sparkles className="w-4 h-4 text-amber-300" />, badge: 'New' },
    { id: 'prayer-times', label: 'Namaz & Qibla', icon: <Clock className="w-4 h-4 text-emerald-300" />, badge: 'New' },
    { id: 'names-of-allah', label: '99 Names', icon: <Award className="w-4 h-4 text-amber-300" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#174C3A] text-[#F6F1E5] shadow-lg border-b border-[#C7A65B]/30 pt-[env(safe-area-inset-top,0px)]">
      
      {/* Top Special Feature Ribbon (Hinglish) */}
      <div className="bg-[#0E3326] text-[11px] py-1.5 px-4 text-center border-b border-[#C7A65B]/20 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#C7A65B] animate-pulse"></span>
        <span className="font-medium text-[#F6F1E5]/90">
          Quran Sharif — Har Aayat ki Arabic Tilawat (Mishary Alafasy) ➡️ Turant Tarjuma Bolkar (Shamshad Ali Khan)
        </span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onTabChange('quran')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C7A65B] to-[#9E813F] p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#174C3A] rounded-[10px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#C7A65B]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-[#F6F1E5] tracking-tight">
                  Quran Sharif
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#C7A65B] text-[#174C3A]">
                  Spiritual Companion
                </span>
              </div>
              <p className="text-[11px] text-[#DFC488] font-medium hidden sm:block">
                Tilawat, Tarjuma, Masnoon Duas & Sunnah Guide
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-[#0E3326] p-1.5 rounded-2xl border border-[#C7A65B]/30">
            {navTabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C7A65B] to-[#B6934A] text-[#0E3326] shadow-sm'
                      : 'text-[#F6F1E5]/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge && !isActive && (
                    <span className="text-[9px] bg-amber-400 text-emerald-950 px-1.5 py-0.2 rounded-full font-black animate-bounce">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2">
            
            {/* YouTube Video Mode Button */}
            <button
              onClick={openCinemaMode}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#C7A65B] via-[#DFC488] to-[#C7A65B] text-[#0E3326] font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#DFC488]"
              title="YouTube Video style full-screen player kholein"
            >
              <Film className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Video Mode</span>
            </button>

            {/* Quick Audio Mode Pill (When in Quran Reader) */}
            {activeTab === 'quran' && (
              <div className="hidden lg:flex items-center bg-[#0E3326] border border-[#C7A65B]/40 rounded-xl p-1 text-xs">
                <button
                  onClick={() => setPlaybackMode('arabic-and-hinglish')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    playbackMode === 'arabic-and-hinglish'
                      ? 'bg-[#C7A65B] text-[#174C3A] shadow-sm'
                      : 'text-[#F6F1E5]/80 hover:text-white'
                  }`}
                  title="Arabic Tilawat + Shamshad Ali Khan Tarjuma"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Dual</span>
                </button>
                <button
                  onClick={() => setPlaybackMode('arabic-only')}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    playbackMode === 'arabic-only'
                      ? 'bg-[#C7A65B] text-[#174C3A] shadow-sm'
                      : 'text-[#F6F1E5]/80 hover:text-white'
                  }`}
                  title="Sirf Arabic Tilawat"
                >
                  Arabic
                </button>
                <button
                  onClick={() => setPlaybackMode('hinglish-only')}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    playbackMode === 'hinglish-only'
                      ? 'bg-[#C7A65B] text-[#174C3A] shadow-sm'
                      : 'text-[#F6F1E5]/80 hover:text-white'
                  }`}
                  title="Sirf Hinglish Tarjuma"
                >
                  Tarjuma
                </button>
              </div>
            )}

            {/* Full Quran Index Button (Surah & Paara Index / Fahrist) */}
            <button
              onClick={openSearch}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#C7A65B] to-[#DFC488] hover:brightness-110 text-[#0E3326] font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer border border-[#DFC488]"
              title="114 Surah aur 30 Paaron ki poori Index (Fahrist) kholein"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#0E3326]" />
              <span>Index</span>
              <span className="hidden sm:inline">(فہرست)</span>
            </button>

            {/* All Indian Languages Selector Button (Spelling Hinglish) */}
            <button
              onClick={openLanguageModal}
              className="p-2 sm:px-3 rounded-xl bg-[#0E3326] hover:bg-[#123E2F] text-[#DFC488] transition-all border border-[#C7A65B]/40 flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-xs hover:border-[#C7A65B]"
              title="All Indian Languages (Spelling Hinglish) - Bhasha badlein"
            >
              <Globe className="w-4 h-4 text-[#C7A65B]" />
              <span className="hidden md:inline">{getLanguageMeta(selectedLanguage).name}</span>
              <span className="text-[10px] bg-[#C7A65B]/20 text-[#DFC488] px-1.5 py-0.2 rounded font-extrabold hidden lg:inline">
                Hinglish
              </span>
            </button>

            {/* Search Button */}
            <button
              onClick={openSearch}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] transition-colors flex items-center gap-1.5 text-xs border border-[#C7A65B]/30 cursor-pointer"
              title="Surah ya Paara search karein"
            >
              <Search className="w-4 h-4 text-[#C7A65B]" />
              <span className="hidden md:inline">Khojein</span>
            </button>

            {/* Bookmarks Drawer Trigger */}
            <button
              onClick={openBookmarks}
              className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] transition-colors border border-[#C7A65B]/30 cursor-pointer"
              title="Saved Bookmarks dekhein"
            >
              <Bookmark className="w-4 h-4 text-[#C7A65B]" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C7A65B] text-[#174C3A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Settings Trigger */}
            <button
              onClick={openSettings}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] transition-colors border border-[#C7A65B]/30 cursor-pointer"
              title="Audio aur Font Settings"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C7A65B]" />
            </button>

          </div>

        </div>
      </div>

      {/* Mobile & Tablet Responsive Sub-Bar Tabs */}
      <div className="xl:hidden bg-[#0E3326]/90 border-t border-[#C7A65B]/20 px-4 py-2 overflow-x-auto scrollbar-none flex items-center gap-2">
        {/* Quick Mobile Index (فہرست) Button */}
        <button
          onClick={openSearch}
          className="px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap flex items-center gap-1.5 transition-all bg-gradient-to-r from-[#C7A65B] to-[#DFC488] text-[#0E3326] shadow-sm shrink-0 cursor-pointer border border-[#DFC488]"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#0E3326]" />
          <span>📖 Index (114 Surah)</span>
        </button>

        {navTabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-[#C7A65B] text-[#0E3326] shadow-sm'
                  : 'text-[#F6F1E5]/80 hover:bg-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && !isActive && (
                <span className="text-[9px] bg-amber-400 text-emerald-950 px-1 py-0.2 rounded-full font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Mobile Language Button */}
        <button
          onClick={openLanguageModal}
          className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all bg-[#C7A65B]/20 text-[#DFC488] border border-[#C7A65B]/40 shrink-0"
        >
          <Globe className="w-3.5 h-3.5 text-[#C7A65B]" />
          <span>{getLanguageMeta(selectedLanguage).name} (Hinglish)</span>
        </button>
      </div>
    </header>
  );
};
