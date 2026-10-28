import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, Sparkles, Volume2, VolumeX, CheckCircle, 
  Flame, Award, BookmarkCheck, Heart, ArrowRight
} from 'lucide-react';

interface DhikrPreset {
  id: string;
  arabic: string;
  transliteration: string;
  hinglishMeaning: string;
  defaultTarget: number;
  fazilatHinglish: string;
  hadithReference: string;
}

const DHIKR_PRESETS: DhikrPreset[] = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    hinglishMeaning: 'Allah har aib aur kamzori se paak hai (अल्लाह हर ऐब से पाक है)',
    defaultTarget: 33,
    fazilatHinglish: 'Rasoolullah ﷺ ne farmaya: Jo shakhs 100 baar SubhanAllah kahe, uske liye 1000 nekiyan likhi jaati hain ya 1000 gunah maaf hote hain.',
    hadithReference: 'Sahih Muslim 2698'
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    hinglishMeaning: 'Tamaam tareefein Allah ke liye hain (तमाम तारीफें अल्लाह के लिए हैं)',
    defaultTarget: 33,
    fazilatHinglish: 'Alhamdulillah mizaan (tarazu) ko nekiyon se bhar deta hai. Nematon me barkat ka sabse bada zariya hai.',
    hadithReference: 'Sahih Muslim 223'
  },
  {
    id: 'allahuakbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    hinglishMeaning: 'Allah sabse bada hai (अल्लाह सबसे बड़ा है)',
    defaultTarget: 34,
    fazilatHinglish: 'Tasbeeh-e-Fatimi (33 SubhanAllah, 33 Alhamdulillah, 34 Allahu Akbar) thakan dur karne aur barkat ke liye behtareen hai.',
    hadithReference: 'Sahih al-Bukhari 3705'
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha wa atoobu ilayh',
    hinglishMeaning: 'Main Allah se maafi mangta hu aur Uski taraf ruju karta hu',
    defaultTarget: 100,
    fazilatHinglish: 'Jo shakhs istighfar ko lazim pakad le, Allah use har pareshani se nikalne ka rasta aur aisi jagah se rizq deta hai jahan ka gumaan bhi na ho.',
    hadithReference: 'Sunan Abi Dawud 1518'
  },
  {
    id: 'durood',
    arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ',
    transliteration: 'Allahumma Salli Ala Muhammadin Wa Ala Aali Muhammad',
    hinglishMeaning: 'Ae Allah! Nabi Kareem ﷺ aur unki aal par rehmat aur salamti nazil farma',
    defaultTarget: 100,
    fazilatHinglish: 'Jo shakhs mujh par ek baar durood bhejta hai, Allah us par 10 rehmatein nazil farmata hai aur 10 darje buland karta hai.',
    hadithReference: 'Sahih Muslim 408'
  },
  {
    id: 'lailahaillallah',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'La ilaha illallahu wahdahu la shareeka lah',
    hinglishMeaning: 'Allah ke siwa koi mabood nahi, Wo akela hai Uska koi shareek nahi',
    defaultTarget: 100,
    fazilatHinglish: 'Afzal-ut-tareen zikr hai. Din me 100 baar padhne wale ko 10 ghulam aazad karne ka sawab aur shaitan se hifazat milti hai.',
    hadithReference: 'Sahih al-Bukhari 3293'
  },
  {
    id: 'hawqala',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'La hawla wa la quwwata illa billah',
    hinglishMeaning: 'Gunaho se bachne aur neki karne ki taqat sirf Allah ki taraf se hai',
    defaultTarget: 100,
    fazilatHinglish: 'Ye jannat ke khazano me se ek azeem khazana hai aur 99 beemariyon ki shifa hai.',
    hadithReference: 'Sahih al-Bukhari 6384'
  }
];

export const DigitalTasbeeh: React.FC = () => {
  const [selectedDhikrIndex, setSelectedDhikrIndex] = useState(0);
  const currentDhikr = DHIKR_PRESETS[selectedDhikrIndex];

  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(currentDhikr.defaultTarget);
  const [laps, setLaps] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [vibrateEnabled, setVibrateEnabled] = useState<boolean>(true);

  // Daily statistics
  const [dailyTotal, setDailyTotal] = useState<number>(() => {
    const todayKey = `tasbeeh_daily_${new Date().toISOString().slice(0, 10)}`;
    const saved = localStorage.getItem(todayKey);
    return saved ? parseInt(saved, 10) : 0;
  });

  // When changing dhikr, update target and reset count
  const handleSelectDhikr = (idx: number) => {
    setSelectedDhikrIndex(idx);
    setTarget(DHIKR_PRESETS[idx].defaultTarget);
    setCount(0);
  };

  // Click Sound effect generator via Web Audio API (No external MP3 needed!)
  const playClickSound = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  // Play achievement chime when target completed
  const playTargetReachedSound = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const now = audioCtx.currentTime;

      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0.35, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.09 + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.25);
      });
    } catch {
      // AudioContext unavailable
    }
  };

  const handleIncrement = () => {
    playClickSound();

    // Haptic vibration for mobile phones
    if (vibrateEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(25);
    }

    const nextCount = count + 1;
    setCount(nextCount);

    // Update Daily Total
    const newDaily = dailyTotal + 1;
    setDailyTotal(newDaily);
    const todayKey = `tasbeeh_daily_${new Date().toISOString().slice(0, 10)}`;
    localStorage.setItem(todayKey, newDaily.toString());

    // Check if target reached
    if (target > 0 && nextCount >= target) {
      playTargetReachedSound();
      setLaps(prev => prev + 1);
      setCount(0); // Reset for next lap
      if (vibrateEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([60, 50, 120]);
      }
    }
  };

  const handleReset = () => {
    if (count > 0 || laps > 0) {
      if (window.confirm("Kya aap is tasbeeh count ko reset karna chahte hain?")) {
        setCount(0);
        setLaps(0);
      }
    }
  };

  const progressPercent = target > 0 ? Math.min(100, Math.round((count / target) * 100)) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Top Banner (Pure Hinglish) */}
      <div className="bg-gradient-to-r from-[#174C3A] via-[#1F634D] to-[#0E3326] text-[#F6F1E5] rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-[#C7A65B]/40 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7A65B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A65B]/20 text-[#DFC488] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Digital Dhikr • Zikr-e-Ilahi Ka Tohfa
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#F6F1E5]">
              डिजिटल तस्बीह (Digital Tasbeeh & Zikr Counter)
            </h1>
            <p className="text-xs sm:text-sm text-[#DFC488]/90 mt-1 max-w-2xl">
              Dil ko sukoon aur rooh ko taazgi dene ke liye authentic Masnoon Azkar ka tactile counter. Har roz zikr karein aur nekiyon ka ajar payein.
            </p>
          </div>

          {/* Today's Stats Pill */}
          <div className="flex items-center gap-3 bg-black/30 px-4 py-2.5 rounded-2xl border border-[#C7A65B]/30 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#C7A65B]/20 flex items-center justify-center text-[#DFC488]">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] text-[#DFC488]/80 block font-semibold">Aaj Ka Kul Zikr (Today):</span>
              <span className="text-lg font-extrabold text-[#F6F1E5]">{dailyTotal.toLocaleString()}</span>
              <span className="text-[10px] text-[#DFC488] ml-1">martaba</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Azkar Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
        {DHIKR_PRESETS.map((preset, idx) => {
          const isSelected = selectedDhikrIndex === idx;
          return (
            <button
              key={preset.id}
              onClick={() => handleSelectDhikr(idx)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                isSelected
                  ? 'bg-[#174C3A] text-[#DFC488] border-2 border-[#C7A65B] shadow-md scale-102'
                  : 'bg-white dark:bg-emerald-950/40 text-[#26342D] dark:text-[#F6F1E5] hover:bg-[#F6F1E5] border border-[#C7A65B]/20'
              }`}
            >
              <span>{preset.transliteration}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#C7A65B]/20 text-[#174C3A] dark:text-[#DFC488] font-bold">
                {preset.defaultTarget}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Tasbeeh Counter Box */}
      <div className="bg-white dark:bg-emerald-950/40 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#C7A65B]/30 mb-6">
        
        {/* Active Zikr Header */}
        <div className="text-center mb-6">
          <div className="text-2xl sm:text-3xl font-arabic text-[#174C3A] dark:text-[#DFC488] mb-2 leading-relaxed">
            {currentDhikr.arabic}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#26342D] dark:text-[#F6F1E5]">
            {currentDhikr.transliteration}
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5B53] dark:text-emerald-300 mt-1 max-w-lg mx-auto">
            {currentDhikr.hinglishMeaning}
          </p>
        </div>

        {/* Big Circular Counter Dial & Controls */}
        <div className="flex flex-col items-center justify-center my-4">
          
          {/* Circular Progress & Click Dial */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            
            {/* SVG Progress Ring */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="text-[#C7A65B]/20"
                strokeWidth="6"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className="text-[#174C3A] dark:text-[#C7A65B] transition-all duration-150"
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={2 * Math.PI * 44 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Tap Button (Big Ergonomic Hitbox) */}
            <button
              onClick={handleIncrement}
              className="absolute w-44 h-44 sm:w-50 sm:h-50 rounded-full bg-gradient-to-br from-[#174C3A] via-[#123E2F] to-[#0E3326] text-[#F6F1E5] flex flex-col items-center justify-center shadow-2xl hover:scale-102 active:scale-95 transition-transform cursor-pointer border-4 border-[#C7A65B]"
              title="Click karein ya tap karein zikr count karne ke liye"
            >
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#F6F1E5]">
                {count}
              </span>
              <span className="text-[11px] font-bold text-[#DFC488] uppercase tracking-wider mt-1">
                Hadaf (Target): {target}
              </span>
              <span className="text-[10px] text-[#F6F1E5]/70 mt-0.5">
                {progressPercent}% Poora Hua
              </span>
            </button>
          </div>

          {/* Target Preset Pills & Settings Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            
            {/* Target Options */}
            <div className="flex items-center bg-[#F6F1E5] dark:bg-emerald-900/40 p-1 rounded-xl border border-[#C7A65B]/30">
              <span className="text-[11px] font-bold text-[#174C3A] dark:text-[#DFC488] px-2">Hadaf:</span>
              {[33, 100, 313, 1000].map(val => (
                <button
                  key={val}
                  onClick={() => { setTarget(val); setCount(0); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    target === val
                      ? 'bg-[#174C3A] text-[#DFC488] shadow-xs'
                      : 'text-[#4B5B53] dark:text-[#F6F1E5]/70 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            {/* Laps Count */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/40 text-amber-900 dark:text-amber-200 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Tasbeeh Daur (Laps): {laps}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border-gray-300'
              }`}
              title={soundEnabled ? 'Aawaz (Sound) Band karein' : 'Aawaz (Sound) Chalu karein'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Reset Counter Button */}
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="Is tasbeeh ko zero par reset karein"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

          </div>

        </div>

      </div>

      {/* Fazilat & Hadith Reference Card */}
      <div className="bg-[#FBF8F1] dark:bg-emerald-900/20 rounded-3xl p-5 sm:p-6 border border-[#C7A65B]/40 shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-[#174C3A] dark:text-[#DFC488]">
          <BookmarkCheck className="w-4 h-4 text-[#C7A65B]" />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
            Is Zikr Ki Fazilat Aur Barakaat (Hinglish):
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#26342D] dark:text-emerald-100 leading-relaxed font-medium">
          "{currentDhikr.fazilatHinglish}"
        </p>
        <div className="mt-3 pt-2.5 border-t border-[#C7A65B]/20 flex items-center justify-between text-[11px] text-[#4B5B53] dark:text-emerald-400">
          <span>Hadees Reference: <strong>{currentDhikr.hadithReference}</strong></span>
          <span className="font-semibold text-emerald-800 dark:text-emerald-300">Authentic Sunnah</span>
        </div>
      </div>

    </div>
  );
};
