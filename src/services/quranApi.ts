import type { AyahItem } from '../types';
import { OFFLINE_SURAHS_AYAHS } from '../data/quranAyahs';
import { ALL_SURAHS } from '../data/quranSurahs';

// In-memory caches
const surahMemoryCache: Record<number, AyahItem[]> = {};
const juzMemoryCache: Record<number, AyahItem[]> = {};

/**
 * Phonetic transliteration / fallback converter from Hindi to Hinglish
 */
export function convertDevanagariToHinglish(hindiText: string): string {
  if (!hindiText) return '';

  const devanagariMap: [RegExp, string][] = [
    [/अल्लाह/g, 'Allah'],
    [/रहमान/g, 'Rahman'],
    [/रहीम/g, 'Raheem'],
    [/क़ुरआन/g, 'Quran'],
    [/रसूल/g, 'Rasool'],
    [/नबी/g, 'Nabi'],
    [/ईमान/g, 'Imaan'],
    [/मुहम्मद/g, 'Muhammad'],
    [/इब्राहिम/g, 'Ibrahim'],
    [/मूसा/g, 'Musa'],
    [/ईसा/g, 'Isa'],
    [/क़यामत/g, 'Qayamat'],
    [/जन्नत/g, 'Jannat'],
    [/जहन्नम/g, 'Jahannam'],
    [/नमाज़/g, 'Namaz'],
    [/रोज़ा/g, 'Roza'],
    [/हज/g, 'Hajj'],
    [/ज़कात/g, 'Zakat'],
    [/फ़रिश्ते/g, 'Farishte'],
    [/शैतान/g, 'Shaitan'],
    [/इबादत/g, 'Ibadat'],
    [/तारीफ़/g, 'Tareef'],
    [/प्रशंसा/g, 'Tareef'],
    [/मालिक/g, 'Maalik'],
    [/संसार/g, 'Jahan'],
    [/दयालु/g, 'Meherbaan'],
    [/कृपा/g, 'Raham']
  ];

  let result = hindiText;
  for (const [regex, replacement] of devanagariMap) {
    result = result.replace(regex, replacement);
  }
  return result;
}

/**
 * Fetch verses for any Surah (1-114).
 * Includes Mishary Rashid Alafasy Arabic Tilawat and Shamshad Ali Khan Studio Translation audio.
 */
export async function getSurahAyahs(surahNumber: number): Promise<AyahItem[]> {
  if (surahMemoryCache[surahNumber] && surahMemoryCache[surahNumber].length > 0) {
    return surahMemoryCache[surahNumber];
  }

  const surahMeta = ALL_SURAHS.find((s) => s.number === surahNumber);
  const surahName = surahMeta?.nameSimple || `Surah ${surahNumber}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,hi.hindi,en.sahih,ur.jalandhry,bn.bengali,ta.tamil,te.telugu,ml.abdulhameed`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.code === 200 && Array.isArray(data.data) && data.data.length >= 2) {
        const editionMap: Record<string, any> = {};
        data.data.forEach((ed: any) => {
          if (ed?.edition?.identifier) {
            editionMap[ed.edition.identifier] = ed;
          }
        });

        const arabicEdition = editionMap['quran-uthmani'] || data.data[0];
        const hindiEdition = editionMap['hi.hindi'] || data.data[1];
        const englishEdition = editionMap['en.sahih'] || data.data[2] || null;
        const urduEdition = editionMap['ur.jalandhry'] || data.data[3] || null;
        const bengaliEdition = editionMap['bn.bengali'] || null;
        const tamilEdition = editionMap['ta.tamil'] || null;
        const teluguEdition = editionMap['te.telugu'] || null;
        const malayalamEdition = editionMap['ml.abdulhameed'] || null;

        const ayahs: AyahItem[] = arabicEdition.ayahs.map((arabicAyah: any, index: number) => {
          const hinAyah = hindiEdition?.ayahs?.[index];
          const engAyah = englishEdition?.ayahs?.[index];
          const urAyah = urduEdition?.ayahs?.[index];
          const bnAyah = bengaliEdition?.ayahs?.[index];
          const taAyah = tamilEdition?.ayahs?.[index];
          const teAyah = teluguEdition?.ayahs?.[index];
          const mlAyah = malayalamEdition?.ayahs?.[index];

          const offlineMatch = OFFLINE_SURAHS_AYAHS[surahNumber]?.find(
            (o) => o.numberInSurah === arabicAyah.numberInSurah
          );

          const sNumStr = String(surahNumber).padStart(3, '0');
          const aNumStr = String(arabicAyah.numberInSurah).padStart(3, '0');
          
          // Arabic: Sheikh Mishary bin Rashid Alafasy
          const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${sNumStr}${aNumStr}.mp3`;
          
          // Translation: Shamshad Ali Khan (Fateh Muhammad Jalandhary Urdu Translation - Studio Audio)
          const translationAudioUrl = `https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/${sNumStr}${aNumStr}.mp3`;

          const hindiText = hinAyah ? hinAyah.text : (offlineMatch?.hindiTranslation || '');
          const hinglishText = offlineMatch
            ? offlineMatch.hinglishTranslation
            : (convertDevanagariToHinglish(hindiText) || engAyah?.text || '');

          return {
            surahNumber,
            surahName,
            numberInSurah: arabicAyah.numberInSurah,
            numberInQuran: arabicAyah.number,
            juz: arabicAyah.juz,
            arabicText: arabicAyah.text,
            romanTransliteration: offlineMatch?.romanTransliteration || `Surah ${surahNumber}, Ayah ${arabicAyah.numberInSurah}`,
            hinglishTranslation: hinglishText,
            hindiTranslation: hindiText,
            englishTranslation: engAyah ? engAyah.text : (offlineMatch?.englishTranslation || ''),
            urduTranslation: urAyah ? urAyah.text : offlineMatch?.urduTranslation,
            bengaliTranslation: bnAyah?.text,
            tamilTranslation: taAyah?.text,
            teluguTranslation: teAyah?.text,
            malayalamTranslation: mlAyah?.text,
            audioUrl,
            translationAudioUrl,
            sajdah: Boolean(arabicAyah.sajda)
          };
        });

        if (ayahs.length > 0) {
          surahMemoryCache[surahNumber] = ayahs;
          return ayahs;
        }
      }
    }
  } catch (err) {
    console.warn(`API fetch error for Surah ${surahNumber}, checking offline fallback`, err);
  }

  // Fallback to pre-cached offline data
  if (OFFLINE_SURAHS_AYAHS[surahNumber]) {
    const list = OFFLINE_SURAHS_AYAHS[surahNumber].map((a) => {
      const sNumStr = String(surahNumber).padStart(3, '0');
      const aNumStr = String(a.numberInSurah).padStart(3, '0');
      return {
        ...a,
        surahNumber,
        surahName,
        audioUrl: a.audioUrl || `https://everyayah.com/data/Alafasy_128kbps/${sNumStr}${aNumStr}.mp3`,
        translationAudioUrl: `https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/${sNumStr}${aNumStr}.mp3`
      };
    });
    return list;
  }

  return [];
}

/**
 * Fetch all verses for any of the 30 Paras (Juz 1-30).
 * Matches the continuous recitation format of "Quran-Para01/30-Urdu Translation".
 */
export async function getJuzAyahs(juzNumber: number): Promise<AyahItem[]> {
  if (juzMemoryCache[juzNumber] && juzMemoryCache[juzNumber].length > 0) {
    return juzMemoryCache[juzNumber];
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const [arabicRes, hindiRes, urduRes, englishRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`, { signal: controller.signal }),
      fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/hi.hindi`, { signal: controller.signal }).catch(() => null),
      fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/ur.jalandhry`, { signal: controller.signal }).catch(() => null),
      fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/en.sahih`, { signal: controller.signal }).catch(() => null)
    ]);
    clearTimeout(timeoutId);

    if (arabicRes.ok) {
      const arabicData = await arabicRes.json();
      const hindiData = hindiRes && hindiRes.ok ? await hindiRes.json() : null;
      const urduData = urduRes && urduRes.ok ? await urduRes.json() : null;
      const englishData = englishRes && englishRes.ok ? await englishRes.json() : null;

      const arabicAyahs = arabicData?.data?.ayahs || [];
      const hindiAyahs = hindiData?.data?.ayahs || [];
      const urduAyahs = urduData?.data?.ayahs || [];
      const englishAyahs = englishData?.data?.ayahs || [];

      const ayahs: AyahItem[] = arabicAyahs.map((arabicAyah: any, index: number) => {
        const hinAyah = hindiAyahs[index];
        const urAyah = urduAyahs[index];
        const engAyah = englishAyahs[index];

        const sNum = arabicAyah.surah?.number || 1;
        const sMeta = ALL_SURAHS.find((s) => s.number === sNum);
        const sName = sMeta?.nameSimple || arabicAyah.surah?.englishName || `Surah ${sNum}`;

        const sNumStr = String(sNum).padStart(3, '0');
        const aNumStr = String(arabicAyah.numberInSurah).padStart(3, '0');

        const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${sNumStr}${aNumStr}.mp3`;
        const translationAudioUrl = `https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/${sNumStr}${aNumStr}.mp3`;

        const hindiText = hinAyah?.text || '';
        const urduText = urAyah?.text || '';
        const englishText = engAyah?.text || '';

        const offlineMatch = OFFLINE_SURAHS_AYAHS[sNum]?.find(
          (o) => o.numberInSurah === arabicAyah.numberInSurah
        );

        const hinglishText = offlineMatch
          ? offlineMatch.hinglishTranslation
          : (convertDevanagariToHinglish(hindiText) || englishText);

        return {
          surahNumber: sNum,
          surahName: sName,
          numberInSurah: arabicAyah.numberInSurah,
          numberInQuran: arabicAyah.number,
          juz: juzNumber,
          arabicText: arabicAyah.text,
          romanTransliteration: offlineMatch?.romanTransliteration || `${sName} ${sNum}:${arabicAyah.numberInSurah}`,
          hinglishTranslation: hinglishText,
          hindiTranslation: hindiText,
          urduTranslation: urduText,
          englishTranslation: englishText,
          audioUrl,
          translationAudioUrl,
          sajdah: Boolean(arabicAyah.sajda)
        };
      });

      if (ayahs.length > 0) {
        juzMemoryCache[juzNumber] = ayahs;
        return ayahs;
      }
    }
  } catch (err) {
    console.error(`Error fetching Juz ${juzNumber}`, err);
  }

  return [];
}
