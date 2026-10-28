import { SupportedLanguage, IndianLanguageMeta, AyahItem } from '../types';

export const INDIAN_LANGUAGES_LIST: IndianLanguageMeta[] = [
  {
    id: 'hinglish',
    name: 'Hinglish',
    nativeName: 'हिंग्लिश (Roman Hindi/Urdu)',
    hinglishSpelling: 'Hinglish (Bolkar Tarjuma - Default)',
    speechCode: 'hi-IN',
    direction: 'ltr',
    description: 'Sabse aasan Roman Hindi/Urdu jo har koi asaani se padh aur samajh sakta hai.'
  },
  {
    id: 'hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    hinglishSpelling: 'Hindi (Devanagari Lipi + Hinglish Bol)',
    speechCode: 'hi-IN',
    apiEdition: 'hi.hindi',
    direction: 'ltr',
    description: 'Shuddh Hindi anuvaad (Farooq Khan & Ahmed).'
  },
  {
    id: 'urdu',
    name: 'Urdu',
    nativeName: 'اردو',
    hinglishSpelling: 'Urdu (Jalandhari Tarjuma + Roman Urdu)',
    speechCode: 'ur-PK',
    apiEdition: 'ur.jalandhry',
    direction: 'rtl',
    description: 'Fateh Muhammad Jalandhari ka mustanad Urdu tarjuma.'
  },
  {
    id: 'bengali',
    name: 'Bengali / Bangla',
    nativeName: 'বাংলা',
    hinglishSpelling: 'Bangla (Bengali Lipi + Hinglish Spellings)',
    speechCode: 'bn-IN',
    apiEdition: 'bn.bengali',
    direction: 'ltr',
    description: 'Muhiuddin Khan dwara anuvadit Bangla tarjuma.'
  },
  {
    id: 'marathi',
    name: 'Marathi',
    nativeName: 'मराठी',
    hinglishSpelling: 'Marathi (Devanagari Marathi + Hinglish)',
    speechCode: 'mr-IN',
    direction: 'ltr',
    description: 'Pavitra Quran cha Marathi madhe bhashantar.'
  },
  {
    id: 'gujarati',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    hinglishSpelling: 'Gujarati (Gujarati Lipi + Hinglish)',
    speechCode: 'gu-IN',
    direction: 'ltr',
    description: 'Pavitra Quran no Gujarati anuvad.'
  },
  {
    id: 'tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    hinglishSpelling: 'Tamil (Tamil Lipi + Hinglish)',
    speechCode: 'ta-IN',
    apiEdition: 'ta.tamil',
    direction: 'ltr',
    description: 'Jan Trust Foundation dwara Tamil tharjumah.'
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    hinglishSpelling: 'Telugu (Telugu Lipi + Hinglish)',
    speechCode: 'te-IN',
    apiEdition: 'te.telugu',
    direction: 'ltr',
    description: 'Maulana Abder-Rahim dwara Telugu anuvad.'
  },
  {
    id: 'kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    hinglishSpelling: 'Kannada (Kannada Lipi + Hinglish)',
    speechCode: 'kn-IN',
    direction: 'ltr',
    description: 'Divya Quran Kannada anuvad (Abdussalam Puthige).'
  },
  {
    id: 'malayalam',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    hinglishSpelling: 'Malayalam (Malayalam Lipi + Hinglish)',
    speechCode: 'ml-IN',
    apiEdition: 'ml.abdulhameed',
    direction: 'ltr',
    description: 'Cheriyamundam Abdul Hameed dwara Malayalam parivarthanam.'
  },
  {
    id: 'punjabi',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ / پنجابی',
    hinglishSpelling: 'Punjabi (Gurmukhi / Shahmukhi + Hinglish)',
    speechCode: 'pa-IN',
    direction: 'ltr',
    description: 'Pavitra Quran da Punjabi tarjuma.'
  },
  {
    id: 'odia',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    hinglishSpelling: 'Odia (Odia Lipi + Hinglish)',
    speechCode: 'or-IN',
    direction: 'ltr',
    description: 'Pabitra Quran Odia bhasha re anubad.'
  },
  {
    id: 'assamese',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    hinglishSpelling: 'Assamese (Axomiya + Hinglish)',
    speechCode: 'as-IN',
    direction: 'ltr',
    description: 'Pobitro Quran Asomiya bhashar anubad.'
  },
  {
    id: 'english',
    name: 'English',
    nativeName: 'English (Sahih International)',
    hinglishSpelling: 'English (Global Clear Translation)',
    speechCode: 'en-IN',
    apiEdition: 'en.sahih',
    direction: 'ltr',
    description: 'Clear, modern, authentic English translation.'
  }
];

export function getLanguageMeta(lang: SupportedLanguage): IndianLanguageMeta {
  return INDIAN_LANGUAGES_LIST.find(l => l.id === lang) || INDIAN_LANGUAGES_LIST[0];
}

/**
 * Multi-Language Surah 1 (Al-Fatihah) sample translations across Indian languages
 */
export const SURAH_FATIAH_INDIAN_TRANSLATIONS: Record<number, Record<SupportedLanguage, { text: string; hinglish: string }>> = {
  1: {
    hinglish: {
      text: 'Allah ke naam se jo bada Meherbaan, nihayat Raham karne wala hai.',
      hinglish: 'Allah ke naam se jo bada Meherbaan, nihayat Raham karne wala hai.'
    },
    hindi: {
      text: 'अल्लाह के नाम से, जो बड़ा कृपाशील और अत्यंत दयावान है।',
      hinglish: 'Allah ke naam se, jo bada kripasheel aur atyant dayawan hai.'
    },
    urdu: {
      text: 'شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔',
      hinglish: 'Shuru Allah ke naam se jo bada Meherbaan nihayat Raham wala hai.'
    },
    bengali: {
      text: 'আল্লাহর নামে যিনি অসীম করুণাময়, পরম দয়ালু।',
      hinglish: 'Allahr name jini osheem korunamoy, porom doyalu.'
    },
    marathi: {
      text: 'अल्लाहच्या नावाने, जो अत्यंत दयाळू आणि परम कृपाळू आहे.',
      hinglish: 'Allahchya navane, jo atyant dayalu aani param kripalu aahe.'
    },
    gujarati: {
      text: 'અલ્લાહના નામથી, જે અત્યંત કૃપાળુ અને દયાળુ છે.',
      hinglish: 'Allahna naam thi, je atyant kripalu ane dayalu chhe.'
    },
    tamil: {
      text: 'அளவற்ற அருளாளனும், நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் பெயரால்.',
      hinglish: 'Alavatra arulalanum, nigaratra anbudaiyonumaagiya Allahvin peyaraal.'
    },
    telugu: {
      text: 'అపార కరుణామయుడు, పరమ దయాళువైన అల్లాహ్ పేరుతో.',
      hinglish: 'Apaara karunaamayudu, parama dayaluvaina Allah perutho.'
    },
    kannada: {
      text: 'ಅತ್ಯಂತ ಕರುಣಾಮಯಿಯೂ ಅಪಾರ ದಯಾಳುವೂ ಆದ ಅಲ್ಲಾಹನ ಹೆಸರಿನಲ್ಲಿ.',
      hinglish: 'Atyanta karunamayiyu apaara dayaluvu aada Allahana hesarinalli.'
    },
    malayalam: {
      text: 'പരമകാരുണികനും കരുണാനിധിയുമായ അല്ലാഹുവിൻ്റെ നാമത്തിൽ.',
      hinglish: 'Parama kaarunikanum karunaa nidhiyumaaya Allahuvinte naamathil.'
    },
    punjabi: {
      text: 'ਅੱਲ੍ਹਾ ਦੇ ਨਾਮ ਨਾਲ, ਜੋ ਅਤਿਅੰਤ ਮਿਹਰਬਾਨ ਅਤੇ ਦਿਆਲੂ ਹੈ।',
      hinglish: 'Allah de naam naal, jo atyant meherbaan ate dayalu hai.'
    },
    odia: {
      text: 'ଅଲ୍ଲାହଙ୍କ ନାମରେ, ଯିଏ ପରମ ଦୟାଳୁ ଓ କରୁଣାମୟ।',
      hinglish: 'Allahanka naamare, jiye parama dayalu o karunamaya.'
    },
    assamese: {
      text: 'আল্লাৰ নামত, যিজনে অতিশয় দয়ালু আৰু কৃপাময়।',
      hinglish: 'Allahr naamat, jijone otishoy doyalu aaru kripamoy.'
    },
    english: {
      text: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      hinglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'
    }
  },
  2: {
    hinglish: {
      text: 'Tamaam taareefein Allah hi ke liye hain jo tamaam jahanon ka Rab hai.',
      hinglish: 'Tamaam taareefein Allah hi ke liye hain jo tamaam jahanon ka Rab hai.'
    },
    hindi: {
      text: 'सब प्रशंसा अल्लाह ही के लिए है जो सारे संसार का पालनहार है।',
      hinglish: 'Sab prashansa Allah hi ke liye hai jo saare sansar ka palanhar hai.'
    },
    urdu: {
      text: 'سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا رب ہے۔',
      hinglish: 'Sab taareefein Allah hi ke liye hain jo tamaam jahanon ka Rab hai.'
    },
    bengali: {
      text: 'যাবতীয় প্রশংসা একমাত্র আল্লাহর জন্য, যিনি সকল সৃষ্টির পালনকর্তা।',
      hinglish: 'Jabotiyo proshongsha ekmatro Allahr jonno, jini sokol sristir palon korta.'
    },
    marathi: {
      text: 'सर्व प्रशंसा अल्लाहसाठीच आहे, जो सर्व विश्वांचा पालनकर्ता आहे.',
      hinglish: 'Sarva prashansa Allahsaathich aahe, jo sarva vishvancha palankarta aahe.'
    },
    gujarati: {
      text: 'બધી પ્રશંસા અલ્લાહ માટે છે, જે સમગ્ર બ્રહ્માંડનો રબ છે.',
      hinglish: 'Badhi prashansa Allah maate chhe, je samagra brahmand no Rab chhe.'
    },
    tamil: {
      text: 'அனைத்து புகழும் அகிலங்களின் இறைவனாகிய அல்லாஹ்வுக்கே உரியது.',
      hinglish: 'Anaithu pugazhum agilangalin iraivanagiya Allahvukke uriyathu.'
    },
    telugu: {
      text: 'సమస్త స్తోత్రాలు సర్వలోకాల ప్రభువైన అల్లాహ్‌కే చెందుతాయి.',
      hinglish: 'Samasta stotraalu sarvalokaala prabhuvaina Allahke chendutaayi.'
    },
    kannada: {
      text: 'ಸರ್ವಲೋಕಗಳ ಒಡೆಯನಾದ ಅಲ್ಲಾಹನಿಗೆ ಮಾತ್ರ ಎಲ್ಲಾ ಸ್ತುತಿ-ಪ್ರಶಂಸೆಗಳು.',
      hinglish: 'Sarvalokagala odeyanaada Allahange maatra ella stuti-prashamsegolu.'
    },
    malayalam: {
      text: 'സർവ്വലോകങ്ങളുടെയും നാഥനായ അല്ലാഹുവിനാകുന്നു സർവ്വസ്തുതിയും.',
      hinglish: 'Sarvalokangaludeyum naadhanaaya Allahuvinaakunnu sarvasthuthiyum.'
    },
    punjabi: {
      text: 'ਸਾਰੀ ਪ੍ਰਸ਼ੰਸਾ ਅੱਲ੍ਹਾ ਲਈ ਹੈ, ਜੋ ਸਾਰੇ ਸੰਸਾਰਾਂ ਦਾ ਰੱਬ ਹੈ।',
      hinglish: 'Saari prashansa Allah layi hai, jo saare sansaran da Rabb hai.'
    },
    odia: {
      text: 'ସମସ୍ତ ପ୍ରଶଂସା ଅଲ୍ଲାହଙ୍କ ପାଇଁ, ଯିଏ ସମଗ୍ର ବିଶ୍ୱର ପ୍ରଭୁ।',
      hinglish: 'Samasta prashansa Allahanka pain, jiye samagra biswara Prabhu.'
    },
    assamese: {
      text: 'সকলো প্ৰশংসা কেৱল আল্লাৰ বাবে, যিজনে সমগ্ৰ বিশ্বৰ প্ৰতিপালক।',
      hinglish: 'Sokolo proxongxa kewol Allahr baabe, jijone xomogro bishwor protipalok.'
    },
    english: {
      text: '[All] praise is [due] to Allah, Lord of the worlds.',
      hinglish: '[All] praise is [due] to Allah, Lord of the worlds.'
    }
  }
};

/**
 * Returns translation text and its Hinglish phonetic spelling for any given Ayah and language
 */
export function getAyahTranslationInLanguage(
  ayah: AyahItem, 
  lang: SupportedLanguage
): { text: string; hinglishSpelling: string } {
  // Check special curated translations for Surah 1
  if (ayah.surahNumber === 1 && SURAH_FATIAH_INDIAN_TRANSLATIONS[ayah.numberInSurah]?.[lang]) {
    const item = SURAH_FATIAH_INDIAN_TRANSLATIONS[ayah.numberInSurah][lang];
    return {
      text: item.text,
      hinglishSpelling: item.hinglish
    };
  }

  // Language mappings
  switch (lang) {
    case 'hinglish':
      return {
        text: ayah.hinglishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'hindi':
      return {
        text: ayah.hindiTranslation || ayah.hinglishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'urdu':
      return {
        text: ayah.urduTranslation || ayah.hinglishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'bengali':
      return {
        text: ayah.bengaliTranslation || ayah.hindiTranslation || ayah.hinglishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'tamil':
      return {
        text: ayah.tamilTranslation || ayah.englishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'telugu':
      return {
        text: ayah.teluguTranslation || ayah.hindiTranslation || ayah.hinglishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'malayalam':
      return {
        text: ayah.malayalamTranslation || ayah.englishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'marathi':
      return {
        text: ayah.marathiTranslation || ayah.hindiTranslation || ayah.hinglishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'gujarati':
      return {
        text: ayah.gujaratiTranslation || ayah.hindiTranslation || ayah.hinglishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'kannada':
      return {
        text: ayah.kannadaTranslation || ayah.englishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'punjabi':
      return {
        text: ayah.punjabiTranslation || ayah.hindiTranslation || ayah.hinglishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'odia':
      return {
        text: ayah.odiaTranslation || ayah.hindiTranslation || ayah.hinglishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'assamese':
      return {
        text: ayah.assameseTranslation || ayah.bengaliTranslation || ayah.hinglishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    case 'english':
      return {
        text: ayah.englishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };

    default:
      return {
        text: ayah.hinglishTranslation,
        hinglishSpelling: ayah.hinglishTranslation
      };
  }
}
