export interface SurahMeta {
  number: number;
  nameArabic: string;
  nameSimple: string;
  nameEnglish: string;
  nameUrdu: string;
  nameHindi: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  juzNumber: number;
}

export interface ParaMeta {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameHinglish: string;
  nameHindi: string;
  startSurah: string;
  startSurahNumber: number;
  startAyah: number;
  totalAyahs: number;
}

export interface AyahItem {
  surahNumber?: number;
  surahName?: string;
  numberInSurah: number;
  numberInQuran: number;
  juz: number;
  arabicText: string;
  romanTransliteration: string;
  hinglishTranslation: string; // Romanized Hindi/Urdu for TTS and reading
  hindiTranslation: string;    // Devanagari Hindi
  englishTranslation: string;
  urduTranslation?: string;    // Authentic Jalandhry Urdu
  bengaliTranslation?: string; // Bengali
  tamilTranslation?: string;   // Tamil
  teluguTranslation?: string;  // Telugu
  malayalamTranslation?: string; // Malayalam
  marathiTranslation?: string; // Marathi
  gujaratiTranslation?: string; // Gujarati
  kannadaTranslation?: string; // Kannada
  punjabiTranslation?: string; // Punjabi
  odiaTranslation?: string;    // Odia
  assameseTranslation?: string; // Assamese
  translationsByLang?: Record<string, string>;
  hinglishSpellingsByLang?: Record<string, string>; // Hinglish spelling representation
  audioUrl?: string;           // Arabic recitation MP3 (Mishary bin Rashid Alafasy)
  translationAudioUrl?: string; // Studio Urdu/Hinglish translation MP3 (Shamshad Ali Khan)
  sajdah?: boolean;
}

export type SupportedLanguage = 
  | 'hinglish'
  | 'hindi'
  | 'urdu'
  | 'bengali'
  | 'tamil'
  | 'telugu'
  | 'marathi'
  | 'gujarati'
  | 'kannada'
  | 'malayalam'
  | 'punjabi'
  | 'odia'
  | 'assamese'
  | 'english';

export interface IndianLanguageMeta {
  id: SupportedLanguage;
  name: string;
  nativeName: string;
  hinglishSpelling: string;
  speechCode: string;
  apiEdition?: string;
  direction: 'ltr' | 'rtl';
  description: string;
}

export type PlaybackMode = 'arabic-and-hinglish' | 'arabic-only' | 'hinglish-only';

export type TranslationVoiceType = 'studio' | 'tts';

export type ViewMode = 'surah' | 'para';

export type MainTabType = 'quran' | 'duas' | 'sunnah' | 'tasbeeh' | 'prayer-times' | 'names-of-allah';

export type AudioPhase = 'idle' | 'playing-arabic' | 'playing-hinglish';

export interface QuranBookmark {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  ayahText: string;
  savedAt: number;
}

export interface ReadingProgress {
  lastSurah: number;
  lastAyah: number;
  lastJuz: number;
  timestamp: number;
}

export interface SocialSharePayload {
  title: string;
  arabicText?: string;
  hinglishText: string;
  englishText?: string;
  reference: string;
  type?: 'ayah' | 'dua' | 'hadith' | 'sunnah' | 'name';
}

// ==========================================
// NEW TYPES FOR SPIRITUAL COMPANION EXTENSION
// ==========================================

export type DuaCategory = 
  | 'daily-routines'
  | 'food-drink'
  | 'worship'
  | 'anxiety-relief'
  | 'forgiveness'
  | 'personal-family'
  | 'quranic-duas'
  | 'protection';

export interface DuaItem {
  id: string;
  title: string;
  arabicText: string;
  transliteration: string;
  englishMeaning: string;
  hinglishMeaning: string;
  category: DuaCategory;
  categoryLabel: string;
  situation: string;
  sourceBook: string;
  referenceNumber: string;
  grading: 'Sahih' | 'Hasan' | 'Muttafaqun Alayh' | 'Quranic Ayah';
  repetitionCount?: string;
  whenToRecite: string;
  audioUrl?: string;
  translationAudioUrl?: string; // Shamshad Ali Khan Studio audio MP3
}

export type SunnahCategory =
  | 'morning'
  | 'bathroom'
  | 'wudu'
  | 'salah'
  | 'eating'
  | 'clothing'
  | 'mosque'
  | 'family'
  | 'sleep'
  | 'friday';

export interface SunnahGuideItem {
  id: string;
  category: SunnahCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  classification: 'Fard (Obligatory)' | "Sunnah Mu'akkadah (Emphasized)" | 'Mustahabb (Recommended)' | 'Permissible Custom';
  steps: string[];
  arabicDua?: string;
  transliteration?: string;
  duaMeaning?: string;
  source: string;
  referenceNumber: string;
  authenticity: string;
  commonMistakesToAvoid?: string[];
  audioUrl?: string;
  translationAudioUrl?: string; // Shamshad Ali Khan Studio audio MP3
}

export interface RoutineTask {
  id: string;
  period: 'morning' | 'midday' | 'evening' | 'night';
  title: string;
  description: string;
  timeContext: string;
  arabicDua?: string;
  transliteration?: string;
  duaMeaning?: string;
  sourceReference?: string;
  isCompleted?: boolean;
}

export interface SpiritualGuidanceResult {
  topicKey: string;
  understanding: string;
  quranicVerse: {
    arabic: string;
    surahName: string;
    surahNumber: number;
    ayahNumber: number;
    englishTranslation: string;
    hinglishTranslation?: string;
    audioUrl?: string;
    translationAudioUrl?: string;
  };
  explanation: string;
  practicalSteps: string[];
  relevantDua: {
    title: string;
    arabic: string;
    transliteration: string;
    meaning: string;
    source: string;
  };
  hadith?: {
    arabic?: string;
    text: string;
    collection: string;
    reference: string;
    grading: string;
  };
  reflection: string;
  followUpQuestions: string[];
  isMedicalOrMentalHealthNotice?: boolean;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  guidance?: SpiritualGuidanceResult;
}

export interface SavedConversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ConversationMessage[];
}
