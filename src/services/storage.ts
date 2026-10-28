import type { QuranBookmark, ReadingProgress, PlaybackMode, TranslationVoiceType, SupportedLanguage } from '../types';

const STORAGE_KEYS = {
  BOOKMARKS: 'quran_sharif_bookmarks',
  PROGRESS: 'quran_sharif_progress',
  PLAYBACK_MODE: 'quran_sharif_playback_mode',
  VOICE_TYPE: 'quran_sharif_voice_type',
  FONT_SIZE: 'quran_sharif_font_size',
  SPEECH_SPEED: 'quran_sharif_speech_speed',
  VOLUME: 'quran_sharif_volume',
  LANGUAGE: 'quran_sharif_language'
};

export function getBookmarks(): QuranBookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBookmark(bookmark: QuranBookmark): QuranBookmark[] {
  const current = getBookmarks();
  const exists = current.some((b) => b.id === bookmark.id);
  let updated: QuranBookmark[];
  if (exists) {
    updated = current.filter((b) => b.id !== bookmark.id);
  } else {
    updated = [bookmark, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  return updated;
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().some((b) => b.id === id);
}

export function removeBookmark(id: string): QuranBookmark[] {
  const current = getBookmarks();
  const updated = current.filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  return updated;
}

export function getReadingProgress(): ReadingProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveReadingProgress(progress: ReadingProgress): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredPlaybackMode(): PlaybackMode {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLAYBACK_MODE);
    if (raw === 'arabic-only' || raw === 'hinglish-only') {
      return raw;
    }
    return 'arabic-and-hinglish'; // Default
  } catch {
    return 'arabic-and-hinglish';
  }
}

export function saveStoredPlaybackMode(mode: PlaybackMode): void {
  localStorage.setItem(STORAGE_KEYS.PLAYBACK_MODE, mode);
}

export function getStoredVoiceType(): TranslationVoiceType {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VOICE_TYPE);
    if (raw === 'tts') return 'tts';
    return 'studio'; // Default: Studio voice like YouTube (Mishary + Shamshad Ali Khan)
  } catch {
    return 'studio';
  }
}

export function saveStoredVoiceType(type: TranslationVoiceType): void {
  localStorage.setItem(STORAGE_KEYS.VOICE_TYPE, type);
}

export function getStoredFontSize(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FONT_SIZE);
    return raw ? parseInt(raw, 10) : 30; // 30px default
  } catch {
    return 30;
  }
}

export function saveStoredFontSize(size: number): void {
  localStorage.setItem(STORAGE_KEYS.FONT_SIZE, String(size));
}

export function getStoredVolume(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VOLUME);
    if (raw !== null) {
      const parsed = parseFloat(raw);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
        return parsed;
      }
    }
    return 1.0; // Default full volume
  } catch {
    return 1.0;
  }
}

export function saveStoredVolume(vol: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.VOLUME, String(vol));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredLanguage(): SupportedLanguage {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (raw) return raw as SupportedLanguage;
    return 'hinglish'; // Default is Hinglish
  } catch {
    return 'hinglish';
  }
}

export function saveStoredLanguage(lang: SupportedLanguage): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  } catch (e) {
    console.error(e);
  }
}
