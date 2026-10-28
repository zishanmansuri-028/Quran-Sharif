/**
 * Quran Speech Service — Speaks Indian Language / Hinglish translation after Arabic Tilawat.
 * Uses Web Speech API with support for all Indian language voice models (hi-IN, bn-IN, ta-IN, te-IN, mr-IN, gu-IN, kn-IN, ml-IN, pa-IN, ur-IN, en-IN)
 * and Arabic voice (ar-SA) for sequential "Arbi in Arbi ➡️ Bolkar Tarjuma" playback.
 */

let speechSynth: SpeechSynthesis | null = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  speechSynth = window.speechSynthesis;
}

// Track active HTMLAudioElement for Dua & Sunnah studio recordings
let activeDuaSunnahAudio: HTMLAudioElement | null = null;

/**
 * Specifically finds or configures a deep, dignified voice modeled after Shamshad Ali Khan
 * (Narrator of Fateh Muhammad Jalandhary Urdu translation on EveryAyah).
 */
export function getShamshadAliKhanVoice(preferredLang = 'hi-IN'): {
  voice: SpeechSynthesisVoice | null;
  pitch: number;
  rate: number;
} {
  if (!speechSynth) {
    return { voice: null, pitch: 0.88, rate: 0.90 };
  }

  const voices = speechSynth.getVoices();

  // 1. Prioritize authentic Urdu male voice (e.g. Urdu India, Urdu Pakistan)
  const urduVoice = voices.find(
    (v) =>
      (v.lang.toLowerCase().includes('ur') || v.name.toLowerCase().includes('urdu')) &&
      !v.name.toLowerCase().includes('female')
  ) || voices.find((v) => v.lang.toLowerCase().includes('ur') || v.name.toLowerCase().includes('urdu'));

  if (urduVoice) {
    return { voice: urduVoice, pitch: 0.88, rate: 0.90 };
  }

  // 2. Prioritize Indian Hindi male voices (e.g., Microsoft Hemant, Madhav, Mohan)
  const maleHindiVoice = voices.find(
    (v) =>
      (v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi')) &&
      (v.name.toLowerCase().includes('hemant') ||
        v.name.toLowerCase().includes('male') ||
        v.name.toLowerCase().includes('madhav') ||
        v.name.toLowerCase().includes('mohan'))
  );
  if (maleHindiVoice) {
    return { voice: maleHindiVoice, pitch: 0.88, rate: 0.90 };
  }

  // 3. Any Hindi voice
  const hindiVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().includes('hi-in') ||
      v.name.toLowerCase().includes('hindi')
  );
  if (hindiVoice) {
    return { voice: hindiVoice, pitch: 0.88, rate: 0.90 };
  }

  // 4. Any Indian English voice (which naturally pronounces Hinglish terms)
  const indianVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().includes('en-in') ||
      v.name.toLowerCase().includes('india')
  );
  if (indianVoice) {
    return { voice: indianVoice, pitch: 0.88, rate: 0.90 };
  }

  return {
    voice: voices.find((v) => v.default) || voices[0] || null,
    pitch: 0.88,
    rate: 0.90
  };
}

/**
 * Find the optimal voice for speaking any Indian language or Hinglish
 */
export function getOptimalVoiceForLanguage(langCode = 'hi-IN'): SpeechSynthesisVoice | null {
  if (!speechSynth) return null;
  const voices = speechSynth.getVoices();
  const targetPrefix = langCode.split('-')[0].toLowerCase();

  // 1. Look for exact language match (e.g. bn-IN, ta-IN, hi-IN, mr-IN)
  const exactMatch = voices.find((v) => v.lang.toLowerCase().startsWith(targetPrefix));
  if (exactMatch) return exactMatch;

  // 2. Look for Indian Hindi voice
  const hindiVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().includes('hi-in') ||
      v.name.toLowerCase().includes('hindi')
  );
  if (hindiVoice) return hindiVoice;

  // 3. Look for Indian English voice (which naturally pronounces Hinglish words)
  const indianEnglishVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().includes('en-in') ||
      v.name.toLowerCase().includes('india')
  );
  if (indianEnglishVoice) return indianEnglishVoice;

  // 4. Fallback to default
  return voices.find((v) => v.default) || voices[0] || null;
}

/**
 * Find Arabic voice for authentic Arbi pronunciation
 */
export function getOptimalArabicVoice(): SpeechSynthesisVoice | null {
  if (!speechSynth) return null;
  const voices = speechSynth.getVoices();
  return voices.find((v) => v.lang.toLowerCase().startsWith('ar')) || null;
}

export function getOptimalHinglishVoice(): SpeechSynthesisVoice | null {
  return getOptimalVoiceForLanguage('hi-IN');
}

/**
 * Speaks the translation text in the selected Indian language or Hinglish spelling.
 */
export function speakHinglish(
  text: string,
  rate = 0.90,
  volume = 1.0,
  langCode = 'hi-IN',
  onStart?: () => void,
  onEnd?: () => void
): Promise<void> {
  return new Promise((resolve) => {
    if (!speechSynth) {
      resolve();
      return;
    }

    // Cancel any previous speech
    speechSynth.cancel();

    if (!text || text.trim() === '') {
      resolve();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const shamshadConfig = getShamshadAliKhanVoice(langCode);
    const targetVoice = (langCode === 'hi-IN' || langCode === 'ur-IN' || langCode === 'hinglish')
      ? (shamshadConfig.voice || getOptimalVoiceForLanguage(langCode))
      : getOptimalVoiceForLanguage(langCode);

    if (targetVoice) {
      utterance.voice = targetVoice;
    }
    
    utterance.lang = targetVoice?.lang || langCode;
    utterance.rate = rate; // 0.90 gives a calm, dignified speech pace like Shamshad Ali Khan
    utterance.pitch = (langCode === 'hi-IN' || langCode === 'ur-IN' || langCode === 'hinglish') ? 0.88 : 1.0;
    utterance.volume = Math.max(0, Math.min(1, volume)); // Volume control: 0.0 to 1.0

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
      resolve();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      if (onEnd) onEnd();
      resolve();
    };

    speechSynth.speak(utterance);
  });
}

/**
 * Dual Sequential Audio for Duas and Sunnah:
 * 1. Speaks Arabic text in pure Arabic ("Arbi in Arbi" — Mishary Tilawat MP3 or Arabic Voice)
 * 2. Immediately speaks the Tarjuma in Shamshad Ali Khan's Studio Voice (Authentic MP3 or Shamshad Voice Profile)
 */
export function speakDuaOrSunnahSequential(
  arabicText: string,
  transliteration: string,
  meaningText: string,
  langCode = 'hi-IN',
  rate = 0.90,
  volume = 1.0,
  audioUrl?: string,
  translationAudioUrl?: string,
  onPhaseChange?: (phase: 'arabic' | 'meaning' | 'idle') => void,
  onEnd?: () => void
): () => void {
  // Cancel previous
  stopAllDuaAndSunnahAudio();

  let isCancelled = false;

  const cancelFn = () => {
    isCancelled = true;
    stopAllDuaAndSunnahAudio();
    if (onPhaseChange) onPhaseChange('idle');
    if (onEnd) onEnd();
  };

  // Phase 2 runner: Plays Shamshad Ali Khan audio (Studio MP3 or Shamshad Voice profile)
  const runMeaningPhase = () => {
    if (isCancelled) return;
    if (onPhaseChange) onPhaseChange('meaning');

    // Option A: Real Shamshad Ali Khan Studio MP3 Recording (for Quranic Duas & Sunnah verses)
    if (translationAudioUrl && (langCode === 'hinglish' || langCode === 'hi-IN' || langCode === 'ur-IN')) {
      const studioAudio = new Audio(translationAudioUrl);
      studioAudio.volume = Math.max(0, Math.min(1, volume));
      studioAudio.playbackRate = rate;
      activeDuaSunnahAudio = studioAudio;

      studioAudio.onended = () => {
        activeDuaSunnahAudio = null;
        if (onPhaseChange) onPhaseChange('idle');
        if (onEnd) onEnd();
      };

      studioAudio.onerror = () => {
        console.warn('Shamshad Ali Khan studio audio failed, falling back to voice profile');
        speakShamshadVoiceProfile();
      };

      studioAudio.play().catch((err) => {
        console.warn('Shamshad Ali Khan play interrupted, using voice profile:', err);
        speakShamshadVoiceProfile();
      });
      return;
    }

    // Option B: Shamshad Ali Khan Vocal Profile via Speech Engine
    speakShamshadVoiceProfile();
  };

  const speakShamshadVoiceProfile = () => {
    if (isCancelled || !speechSynth) {
      if (onPhaseChange) onPhaseChange('idle');
      if (onEnd) onEnd();
      return;
    }

    const meaningUtterance = new SpeechSynthesisUtterance(meaningText);
    const shamshad = getShamshadAliKhanVoice(langCode);
    const targetVoice = (langCode === 'hi-IN' || langCode === 'ur-IN' || langCode === 'hinglish')
      ? (shamshad.voice || getOptimalVoiceForLanguage(langCode))
      : getOptimalVoiceForLanguage(langCode);

    if (targetVoice) {
      meaningUtterance.voice = targetVoice;
    }
    meaningUtterance.lang = targetVoice?.lang || langCode;
    meaningUtterance.rate = rate; // 0.90 dignified pacing
    meaningUtterance.pitch = (langCode === 'hi-IN' || langCode === 'ur-IN' || langCode === 'hinglish') ? 0.88 : 1.0;
    meaningUtterance.volume = Math.max(0, Math.min(1, volume));

    meaningUtterance.onstart = () => {
      if (!isCancelled && onPhaseChange) onPhaseChange('meaning');
    };

    meaningUtterance.onend = () => {
      if (onPhaseChange) onPhaseChange('idle');
      if (onEnd) onEnd();
    };

    meaningUtterance.onerror = () => {
      if (onPhaseChange) onPhaseChange('idle');
      if (onEnd) onEnd();
    };

    speechSynth.speak(meaningUtterance);
  };

  // Phase 1: Pure Arabic ("Arbi in Arbi")
  if (audioUrl) {
    if (onPhaseChange) onPhaseChange('arabic');
    const arabicAudio = new Audio(audioUrl);
    arabicAudio.volume = Math.max(0, Math.min(1, volume));
    arabicAudio.playbackRate = 0.95;
    activeDuaSunnahAudio = arabicAudio;

    arabicAudio.onended = () => {
      activeDuaSunnahAudio = null;
      if (isCancelled) return;
      setTimeout(() => {
        if (!isCancelled) runMeaningPhase();
      }, 280);
    };

    arabicAudio.onerror = () => {
      activeDuaSunnahAudio = null;
      playArabicViaTTS();
    };

    arabicAudio.play().catch(() => {
      activeDuaSunnahAudio = null;
      playArabicViaTTS();
    });
  } else {
    playArabicViaTTS();
  }

  function playArabicViaTTS() {
    if (!speechSynth) {
      runMeaningPhase();
      return;
    }

    const arabicVoice = getOptimalArabicVoice();
    const targetArabicSpeech = arabicVoice ? arabicText : transliteration;
    const arabicUtterance = new SpeechSynthesisUtterance(targetArabicSpeech);
    if (arabicVoice) {
      arabicUtterance.voice = arabicVoice;
      arabicUtterance.lang = arabicVoice.lang;
    } else {
      arabicUtterance.lang = 'hi-IN';
    }
    arabicUtterance.rate = 0.85;
    arabicUtterance.volume = Math.max(0, Math.min(1, volume));

    arabicUtterance.onstart = () => {
      if (!isCancelled && onPhaseChange) onPhaseChange('arabic');
    };

    arabicUtterance.onend = () => {
      if (isCancelled) return;
      setTimeout(() => {
        if (!isCancelled) runMeaningPhase();
      }, 280);
    };

    arabicUtterance.onerror = () => {
      if (isCancelled) return;
      runMeaningPhase();
    };

    speechSynth.speak(arabicUtterance);
  }

  return cancelFn;
}

/**
 * Immediately stop all Dua & Sunnah audio (both MP3 and TTS)
 */
export function stopAllDuaAndSunnahAudio(): void {
  if (activeDuaSunnahAudio) {
    activeDuaSunnahAudio.pause();
    activeDuaSunnahAudio.src = '';
    activeDuaSunnahAudio = null;
  }
  if (speechSynth) {
    speechSynth.cancel();
  }
}

/**
 * Immediately stop speech playback
 */
export function stopHinglishSpeech(): void {
  stopAllDuaAndSunnahAudio();
}
