import React, { useState, useEffect } from 'react';
import { 
  Clock, Compass, MapPin, Sparkles, AlertCircle, 
  Sun, Moon, Sunrise, Sunset, Navigation, CheckCircle2 
} from 'lucide-react';
import { 
  POPULAR_CITIES, 
  PrayerCity, 
  PrayerTimesResult, 
  calculatePrayerTimes 
} from '../services/prayerTimesService';

export const PrayerTimesQibla: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>(() => {
    return localStorage.getItem('quran_prayer_city') || 'delhi';
  });

  const activeCity = POPULAR_CITIES.find(c => c.id === selectedCityId) || POPULAR_CITIES[0];
  const [prayerData, setPrayerData] = useState<PrayerTimesResult>(() => calculatePrayerTimes(activeCity));

  // Update prayer times every minute
  useEffect(() => {
    setPrayerData(calculatePrayerTimes(activeCity));
    const interval = setInterval(() => {
      setPrayerData(calculatePrayerTimes(activeCity));
    }, 60000);
    return () => clearInterval(interval);
  }, [activeCity]);

  const handleCityChange = (cityId: string) => {
    setSelectedCityId(cityId);
    localStorage.setItem('quran_prayer_city', cityId);
    const newCity = POPULAR_CITIES.find(c => c.id === cityId) || POPULAR_CITIES[0];
    setPrayerData(calculatePrayerTimes(newCity));
  };

  const prayersList = [
    { name: 'Fajr (फ़ज्र)', time: prayerData.fajr, icon: <Sunrise className="w-5 h-5" />, isNext: prayerData.nextPrayer.includes('Fajr'), desc: 'Subah Sadiq se lekar Tuloo-e-Aftab tak' },
    { name: 'Sunrise (तुलू-ए-आफ़ताब)', time: prayerData.sunrise, icon: <Sun className="w-5 h-5 text-amber-500" />, isNext: prayerData.nextPrayer.includes('Sunrise'), desc: 'Suraj nikalne ka waqt (Namaz makrooh)' },
    { name: 'Dhuhr (ज़ुहर)', time: prayerData.dhuhr, icon: <Sun className="w-5 h-5 text-amber-600" />, isNext: prayerData.nextPrayer.includes('Dhuhr'), desc: 'Zawal-e-Aftab ke baad se Asr tak' },
    { name: 'Asr (अस्र)', time: prayerData.asr, icon: <Sun className="w-5 h-5 text-orange-500" />, isNext: prayerData.nextPrayer.includes('Asr'), desc: 'Dopahar dhalne se Maghrib tak' },
    { name: 'Maghrib (मग़रिब)', time: prayerData.maghrib, icon: <Sunset className="w-5 h-5 text-rose-500" />, isNext: prayerData.nextPrayer.includes('Maghrib'), desc: 'Ghurub-e-Aftab ke foran baad' },
    { name: 'Isha (इशा)', time: prayerData.isha, icon: <Moon className="w-5 h-5 text-indigo-400" />, isNext: prayerData.nextPrayer.includes('Isha'), desc: 'Shafaq gayab hone ke baad se Fajr tak' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Top Banner (Pure Hinglish) */}
      <div className="bg-gradient-to-r from-[#174C3A] via-[#123E2F] to-[#0E3326] text-[#F6F1E5] rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-[#C7A65B]/40 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7A65B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7A65B]/20 text-[#DFC488] text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5" />
              Namaz Timings & Qibla Direction
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#F6F1E5]">
              नमाज़ के औक़ात व क़िबला (Prayer Times & Qibla)
            </h1>
            <p className="text-xs sm:text-sm text-[#DFC488]/90 mt-1 max-w-2xl">
              Paancho waqt ki namaz ke sahih auqaat, Agli Namaz ka live countdown, aur Khana-e-Kaba (Makkah) ka Qibla rukh aasan tareeqe se.
            </p>
          </div>

          {/* City Selector Dropdown */}
          <div className="bg-black/35 p-3 rounded-2xl border border-[#C7A65B]/40 shrink-0 w-full md:w-auto">
            <label className="text-[10px] text-[#DFC488] font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C7A65B]" />
              <span>Apna Shahar Chunein (City):</span>
            </label>
            <select
              value={selectedCityId}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full bg-[#174C3A] text-[#F6F1E5] font-bold text-xs py-2 px-3 rounded-xl border border-[#C7A65B]/50 focus:outline-none focus:ring-2 focus:ring-[#C7A65B] cursor-pointer"
            >
              {POPULAR_CITIES.map(c => (
                <option key={c.id} value={c.id} className="bg-[#0E3326] text-white">
                  {c.name} ({c.country})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Live Countdown Card to Next Namaz */}
      <div className="bg-gradient-to-r from-amber-500/15 via-[#C7A65B]/20 to-amber-500/10 border-2 border-[#C7A65B] rounded-3xl p-5 sm:p-6 mb-8 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#C7A65B] text-[#0E3326] flex items-center justify-center font-extrabold shadow-md shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Agli Namaz (Next Prayer):
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#174C3A] dark:text-[#DFC488]">
                {prayerData.nextPrayer} — {prayerData.nextPrayerTime}
              </h2>
            </div>
          </div>

          <div className="px-5 py-2.5 rounded-2xl bg-[#174C3A] text-[#F6F1E5] border border-[#C7A65B]/40 shadow-sm text-center shrink-0">
            <span className="text-[10px] text-[#DFC488] font-bold uppercase tracking-wider block">Baqi Waqt (Remaining):</span>
            <span className="text-lg font-black text-[#F6F1E5]">
              {Math.floor(prayerData.minutesUntilNext / 60)} Ghante {prayerData.minutesUntilNext % 60} Minute
            </span>
          </div>
        </div>
      </div>

      {/* 6 Prayers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
        {prayersList.map((p, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-4 border transition-all text-center flex flex-col justify-between ${
              p.isNext
                ? 'bg-gradient-to-b from-[#174C3A] to-[#0E3326] text-white border-2 border-[#C7A65B] shadow-lg scale-102 ring-2 ring-[#C7A65B]/40'
                : 'bg-white dark:bg-emerald-950/40 border-[#C7A65B]/25 text-[#26342D] dark:text-[#F6F1E5] shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-center mb-2">
                <span className={`p-2 rounded-xl ${p.isNext ? 'bg-[#C7A65B] text-[#0E3326]' : 'bg-[#F6F1E5] dark:bg-emerald-900/40 text-[#174C3A] dark:text-[#DFC488]'}`}>
                  {p.icon}
                </span>
              </div>
              <h3 className={`text-xs sm:text-sm font-bold ${p.isNext ? 'text-[#DFC488]' : 'text-[#174C3A] dark:text-[#F6F1E5]'}`}>
                {p.name}
              </h3>
            </div>

            <div className="mt-3">
              <span className={`text-sm sm:text-base font-extrabold block ${p.isNext ? 'text-white' : 'text-[#174C3A] dark:text-[#DFC488]'}`}>
                {p.time}
              </span>
              <span className="text-[9px] text-gray-500 dark:text-emerald-300 block mt-0.5 line-clamp-1">
                {p.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Qibla Direction Compass Card */}
      <div className="bg-white dark:bg-emerald-950/40 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#C7A65B]/30 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Info */}
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Qibla Direction • Kaaba Shareef (Makkah)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#174C3A] dark:text-[#DFC488]">
              {activeCity.name} Se Qibla Ka Rukh
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5B53] dark:text-emerald-200 mt-2 leading-relaxed">
              True North (Uttar) se <strong>{prayerData.qiblaBearing}° Degrees</strong> par Khana-e-Kaba (Makkah Al-Mukarramah) sthit hai. Apne phone ya compass ko is angle par rakh kar namaz padhein.
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-[#F6F1E5] dark:bg-emerald-900/25 border border-[#C7A65B]/30 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#174C3A] dark:text-emerald-300">Shahar:</span>
                <span className="font-bold">{activeCity.name}, {activeCity.country}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#174C3A] dark:text-emerald-300">Qibla Angle:</span>
                <span className="font-extrabold text-[#C7A65B]">{prayerData.qiblaBearing}° Clockwise from North</span>
              </div>
            </div>
          </div>

          {/* Right Compass Graphic */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-[#C7A65B] bg-[#174C3A] shadow-2xl flex items-center justify-center p-3">
              
              {/* Compass Marks */}
              <span className="absolute top-2 text-xs font-black text-[#DFC488]">N</span>
              <span className="absolute bottom-2 text-xs font-black text-[#DFC488]/70">S</span>
              <span className="absolute right-2 text-xs font-black text-[#DFC488]/70">E</span>
              <span className="absolute left-2 text-xs font-black text-[#DFC488]/70">W</span>

              {/* Inner Circle */}
              <div className="w-36 h-36 rounded-full border-2 border-dashed border-[#C7A65B]/40 flex items-center justify-center relative">
                
                {/* Rotating Qibla Needle */}
                <div 
                  className="absolute w-full h-full flex items-center justify-center transition-transform duration-700"
                  style={{ transform: `rotate(${prayerData.qiblaBearing}deg)` }}
                >
                  <div className="w-1 h-32 bg-transparent flex flex-col items-center justify-between">
                    {/* Kaaba Arrow Pointer */}
                    <div className="flex flex-col items-center">
                      <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px] border-b-amber-400" />
                      <span className="text-[10px] font-black bg-amber-400 text-[#0E3326] px-1 rounded-sm mt-0.5 shadow-sm">
                        🕋 QIBLA
                      </span>
                    </div>
                    {/* Tail */}
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                  </div>
                </div>

                <div className="w-6 h-6 rounded-full bg-[#C7A65B] text-[#0E3326] flex items-center justify-center font-bold text-xs shadow-md z-10">
                  ★
                </div>

              </div>

            </div>
            <span className="text-[11px] font-bold text-[#174C3A] dark:text-[#DFC488] mt-2">
              Qibla Bearing: {prayerData.qiblaBearing}°
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};
