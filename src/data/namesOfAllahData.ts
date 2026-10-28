export interface AllahNameItem {
  number: number;
  arabic: string;
  transliteration: string;
  hinglishMeaning: string;
  englishMeaning: string;
  benefitHinglish: string;
  category?: 'Rehmat' | 'Qudrat' | 'Bakhshish' | 'Hifazat' | 'Hikmat';
}

export const NAMES_OF_ALLAH: AllahNameItem[] = [
  {
    number: 1,
    arabic: "الرَّحْمَنُ",
    transliteration: "Ar-Rahman",
    hinglishMeaning: "Behad Meharban (सब पर कृपा करने वाला)",
    englishMeaning: "The Most Gracious / Compassionate",
    benefitHinglish: "Is mubarak naam ka zikr karne se dil me narmi, sukoon aur Allah ki aam rehmat hasil hoti hai.",
    category: "Rehmat"
  },
  {
    number: 2,
    arabic: "الرَّحِيمُ",
    transliteration: "Ar-Raheem",
    hinglishMeaning: "Nihayat Rahem Karne Wala (अत्यंत दयालु)",
    englishMeaning: "The Most Merciful",
    benefitHinglish: "Har namaz ke baad 100 baar padhne se har qism ki aafat aur pareshani se hifazat rehti hai.",
    category: "Rehmat"
  },
  {
    number: 3,
    arabic: "الْمَلِكُ",
    transliteration: "Al-Malik",
    hinglishMeaning: "Haqeeqi Badshah (सच्चा बादशाह)",
    englishMeaning: "The King and Owner of Dominion",
    benefitHinglish: "Zawal ke waqt kasrat se zikr karne se mohtaji aur gareebi dur hoti hai.",
    category: "Qudrat"
  },
  {
    number: 4,
    arabic: "الْقُدُّوسُ",
    transliteration: "Al-Quddus",
    hinglishMeaning: "Har Aib Se Pak (पवित्र व निष्कलंक)",
    englishMeaning: "The Most Pure and Holy",
    benefitHinglish: "Dil ko gande khayalat aur waswaso se pak karne ke liye iska zikr nihayat mufid hai.",
    category: "Hikmat"
  },
  {
    number: 5,
    arabic: "السَّلَامُ",
    transliteration: "As-Salam",
    hinglishMeaning: "Salamti Dene Wala (शान्ति और सलामती देने वाला)",
    englishMeaning: "The Source of Peace and Safety",
    benefitHinglish: "Bimar shakhs par 115 martaba padhkar dam karne se shifa aur salamti naseeb hoti hai.",
    category: "Hifazat"
  },
  {
    number: 6,
    arabic: "الْمُؤْمِنُ",
    transliteration: "Al-Mu'min",
    hinglishMeaning: "Aman aur Imaan Dene Wala (सुरक्षा व ईमान बख्शने वाला)",
    englishMeaning: "The Granter of Security and Faith",
    benefitHinglish: "Khauf aur darr ke waqt 630 baar padhne se dushman aur nuqsan se hifazat rehti hai.",
    category: "Hifazat"
  },
  {
    number: 7,
    arabic: "الْمُهَيْمِنُ",
    transliteration: "Al-Muhaymin",
    hinglishMeaning: "Nigran aur Muhafiz (सबकी देखरेख करने वाला)",
    englishMeaning: "The Guardian, The Overseer",
    benefitHinglish: "Ghusl ke baad 115 baar padhne se batin (internal soul) roshan hota hai.",
    category: "Hifazat"
  },
  {
    number: 8,
    arabic: "الْعَزِيزُ",
    transliteration: "Al-Aziz",
    hinglishMeaning: "Sab Par Ghalib aur Izzat Wala (सब पर भारी, सर्वशक्तिमान)",
    englishMeaning: "The All-Mighty, The Invincible",
    benefitHinglish: "Fajr ke baad 41 martaba padhne wala kisi ka mohtaj nahi rehta aur izzat pata hai.",
    category: "Qudrat"
  },
  {
    number: 9,
    arabic: "الْجَبَّارُ",
    transliteration: "Al-Jabbar",
    hinglishMeaning: "Zabardast aur Tute Dilon Ko Jodne Wala (टूटे दिलों को जोड़ने वाला)",
    englishMeaning: "The Compeller, The Restorer",
    benefitHinglish: "Subah-o-shaam 226 baar padhne se zalim ke zulm se hifazat rehti hai.",
    category: "Qudrat"
  },
  {
    number: 10,
    arabic: "الْمُتَكَبِّرُ",
    transliteration: "Al-Mutakabbir",
    hinglishMeaning: "Badaai aur Azmat Wala (सबसे बड़ा और महान)",
    englishMeaning: "The Supremely Great",
    benefitHinglish: "Kisi mushkil kaam se pehle padhne se kaam me aasaani aur kamiyabi milti hai.",
    category: "Qudrat"
  },
  {
    number: 11,
    arabic: "الْخَالِقُ",
    transliteration: "Al-Khaliq",
    hinglishMeaning: "Paida Karne Wala (सबका रचयिता)",
    englishMeaning: "The Creator",
    benefitHinglish: "Raat ke waqt 100 baar padhne par Allah Farishta muqarrar farmate hain jo uske liye ibadat likhta hai.",
    category: "Qudrat"
  },
  {
    number: 12,
    arabic: "الْبَارِئُ",
    transliteration: "Al-Bari'",
    hinglishMeaning: "Theek Banane Wala (निर्दोष और संतुलन से बनाने वाला)",
    englishMeaning: "The Originator, The Evolver",
    benefitHinglish: "Be-aulad aurtan 7 din roza rakh kar 21 baar 'Al-Khaliq, Al-Bari, Al-Musawwir' padhe to nek aulaad ho sakti hai.",
    category: "Qudrat"
  },
  {
    number: 13,
    arabic: "الْمُصَوِّرُ",
    transliteration: "Al-Musawwir",
    hinglishMeaning: "Soorat Aur Shakl Dene Wala (रूप और आकार देने वाला)",
    englishMeaning: "The Fashioner of Forms",
    benefitHinglish: "Duaon me is naam ke waseele se maqsad me khubsurti aur kamiyabi ata hoti hai.",
    category: "Qudrat"
  },
  {
    number: 14,
    arabic: "الْغَفَّارُ",
    transliteration: "Al-Ghaffar",
    hinglishMeaning: "Gunaaho Ko Chhupane Aur Maaf Karne Wala (गुनाहों को माफ़ करने वाला)",
    englishMeaning: "The Repeatedly Forgiving",
    benefitHinglish: "Jumuah ki namaz ke baad 100 baar padhne se maghfirat ke darwaze khulte hain.",
    category: "Bakhshish"
  },
  {
    number: 15,
    arabic: "الْقَهَّارُ",
    transliteration: "Al-Qahhar",
    hinglishMeaning: "Sab Par Qaabu Rakhne Wala (सब पर नियंत्रण रखने वाला)",
    englishMeaning: "The Subduer, The Supreme Dominator",
    benefitHinglish: "Dil se dunya ki beja muhabbat dur karne aur nafs par qabu pane ke liye kasrat se padhein.",
    category: "Qudrat"
  },
  {
    number: 16,
    arabic: "الْوَهَّابُ",
    transliteration: "Al-Wahhab",
    hinglishMeaning: "Bila Muaawza Dene Wala (बिना मांगे सब कुछ अता करने वाला)",
    englishMeaning: "The Supreme Bestower",
    benefitHinglish: "Sajde me 7 martaba padhne se dua qabool hoti hai aur tangi dur hoti hai.",
    category: "Rehmat"
  },
  {
    number: 17,
    arabic: "الرَّزَّاقُ",
    transliteration: "Ar-Razzaq",
    hinglishMeaning: "Rizq Aur Rozi Dene Wala (अन्न व रोज़ी बख्शने वाला)",
    englishMeaning: "The Provider, The Sustainer",
    benefitHinglish: "Subah ke waqt ghar ke charo kono me 10-10 baar phookne se barkat aur rizq badhta hai.",
    category: "Rehmat"
  },
  {
    number: 18,
    arabic: "الْفَتَّاحُ",
    transliteration: "Al-Fattah",
    hinglishMeaning: "Band Raaste Aur Rehmat Kholne Wala (मुश्किलें और बन्द रास्ते खोलने वाला)",
    englishMeaning: "The Opener, The Supreme Arbiter",
    benefitHinglish: "Fajr ke baad seene par haath rakh kar 71 martaba padhne se dil ka zang dur hota hai aur raste khulte hain.",
    category: "Hikmat"
  },
  {
    number: 19,
    arabic: "الْعَلِيمُ",
    transliteration: "Al-Aleem",
    hinglishMeaning: "Sab Kuch Jaanne Wala (सब कुछ जानने वाला)",
    englishMeaning: "The All-Knowing",
    benefitHinglish: "Ilm me barkat aur zehan tez karne ke liye kasrat se wird karein.",
    category: "Hikmat"
  },
  {
    number: 20,
    arabic: "الْقَابِضُ",
    transliteration: "Al-Qabid",
    hinglishMeaning: "Tang Karne Wala (तंग करने वाला)",
    englishMeaning: "The Constrictor",
    benefitHinglish: "Jo shakhs roti ke tukde par 40 din tak likh kar khaye wo bhookh se mahfooz rahega.",
    category: "Qudrat"
  },
  {
    number: 21,
    arabic: "الْبَاسِطُ",
    transliteration: "Al-Basit",
    hinglishMeaning: "Kushada Aur Farakh Karne Wala (खोलने और फैलाने वाला)",
    englishMeaning: "The Expander, The Reliever",
    benefitHinglish: "Chaasht ke waqt 10 martaba haath utha kar padhein aur chehre par pherein, ghani ho jayega.",
    category: "Rehmat"
  },
  {
    number: 22,
    arabic: "الْخَافِضُ",
    transliteration: "Al-Khafid",
    hinglishMeaning: "Past Karne Wala (झुकाने और नीचा करने वाला)",
    englishMeaning: "The Abaser, The Reducer",
    benefitHinglish: "Zalim ke shar se bachne ke liye 500 martaba wird nihayat faydemand hai.",
    category: "Qudrat"
  },
  {
    number: 23,
    arabic: "الرَّافِعُ",
    transliteration: "Ar-Rafi",
    hinglishMeaning: "Buland Karne Wala (मर्तबा और दर्जा ऊंचा करने वाला)",
    englishMeaning: "The Exalter, The Elevator",
    benefitHinglish: "Har mahine ki 14wi raat ko 100 baar padhne se izzat aur darja buland hota hai.",
    category: "Qudrat"
  },
  {
    number: 24,
    arabic: "الْمُعِزُّ",
    transliteration: "Al-Mu'izz",
    hinglishMeaning: "Izzat Dene Wala (सम्मान और प्रतिष्ठा देने वाला)",
    englishMeaning: "The Giver of Honour",
    benefitHinglish: "Peer ya Juma ki raat Maghrib ke baad 140 baar padhne se logo me mohtaram rehta hai.",
    category: "Hikmat"
  },
  {
    number: 25,
    arabic: "الْمُذِلُّ",
    transliteration: "Al-Mudhill",
    hinglishMeaning: "Zaleel Karne Wala (अपमानित करने वाला)",
    englishMeaning: "The Humiliator, The Dishonourer",
    benefitHinglish: "75 martaba sajde me padh kar dua karne se hasido ke shar se hifazat rehti hai.",
    category: "Qudrat"
  },
  {
    number: 26,
    arabic: "السَّمِيعُ",
    transliteration: "As-Samee",
    hinglishMeaning: "Sab Kuch Sunne Wala (सबकी पुकार सुनने वाला)",
    englishMeaning: "The All-Hearing",
    benefitHinglish: "Jumuah ke din 500 martaba padhne se duaen jaldi mustajab hoti hain.",
    category: "Hikmat"
  },
  {
    number: 27,
    arabic: "الْبَصِيرُ",
    transliteration: "Al-Baseer",
    hinglishMeaning: "Sab Kuch Dekhne Wala (सब कुछ देखने वाला)",
    englishMeaning: "The All-Seeing",
    benefitHinglish: "Juma ki namaz ke baad 100 baar padhne se aankhon ki roshni aur basirat me izafa hota hai.",
    category: "Hikmat"
  },
  {
    number: 28,
    arabic: "الْحَكَمُ",
    transliteration: "Al-Hakam",
    hinglishMeaning: "Faisla Karne Wala (सच्चा इंसाफ करने वाला)",
    englishMeaning: "The Impartial Judge",
    benefitHinglish: "Aadhi raat me ba-wudu 99 baar padhne se Allah seene me hikmat ke chashme jari farmata hai.",
    category: "Hikmat"
  },
  {
    number: 29,
    arabic: "الْعَدْلُ",
    transliteration: "Al-Adl",
    hinglishMeaning: "Haqeeqi Insaaf Wala (न्यायी व निष्पक्ष)",
    englishMeaning: "The Utterly Just",
    benefitHinglish: "Juma ki raat 20 tukdo par roti par likh kar khane se log muti aur insaaf pasand bante hain.",
    category: "Hikmat"
  },
  {
    number: 30,
    arabic: "اللَّطِيفُ",
    transliteration: "Al-Lateef",
    hinglishMeaning: "Bareekbeen Aur Karam Karne Wala (कृपालु और सूक्ष्मदर्शी)",
    englishMeaning: "The Subtle, The Most Kind",
    benefitHinglish: "Mushkil tareen waqt me 133 baar 'Ya Lateef' padhne se aasaani paida ho jati hai.",
    category: "Rehmat"
  },
  {
    number: 31,
    arabic: "الْخَبِيرُ",
    transliteration: "Al-Khabeer",
    hinglishMeaning: "Har Baat Se Bakhabar (छिपे भेदों से वाकिफ़)",
    englishMeaning: "The All-Aware",
    benefitHinglish: "Bure aadat se chutkare ke liye 7 din tak iska kasrat se wird karein.",
    category: "Hikmat"
  },
  {
    number: 32,
    arabic: "الْحَلِيمُ",
    transliteration: "Al-Haleem",
    hinglishMeaning: "Burdbar Aur Sabr Wala (धैर्यवान व सहनशील)",
    englishMeaning: "The Forbearing, The Clement",
    benefitHinglish: "Kheti ya saman par likh kar rakhne se aafat aur nuqsan se mahfooz rehta hai.",
    category: "Rehmat"
  },
  {
    number: 33,
    arabic: "الْعَظِيمُ",
    transliteration: "Al-Azeem",
    hinglishMeaning: "Badi Azmat Wala (सर्वोच्च महान)",
    englishMeaning: "The Magnificent, The Infinite",
    benefitHinglish: "Kasrat se padhne wale shakhs ko har qadam par izzat aur azeem martaba milta hai.",
    category: "Qudrat"
  },
  {
    number: 34,
    arabic: "الْغَفُورُ",
    transliteration: "Al-Ghafoor",
    hinglishMeaning: "Bakhshne Wala (माफ़ करने वाला)",
    englishMeaning: "The All-Forgiving",
    benefitHinglish: "Sajde me kasrat se padhne se gunaho ke bojh se nijat milti hai.",
    category: "Bakhshish"
  },
  {
    number: 35,
    arabic: "الشَّكُورُ",
    transliteration: "Ash-Shakoor",
    hinglishMeaning: "Qadardaan (थोड़े अमल की बड़ी क़द्र करने वाला)",
    englishMeaning: "The Most Grateful, The Appreciative",
    benefitHinglish: "Aankhon ki takleef ya roohani bechaini me 41 baar padh kar paani par dam karein.",
    category: "Rehmat"
  },
  {
    number: 36,
    arabic: "الْعَلِيُّ",
    transliteration: "Al-Aliyy",
    hinglishMeaning: "Sabse Buland (सर्वोच्च)",
    englishMeaning: "The Most High, The Sublime",
    benefitHinglish: "Jo shakhs hamesha iska wird rakhega, Allah use bulandi aur behtari ata farmayega.",
    category: "Qudrat"
  },
  {
    number: 37,
    arabic: "الْكَبِيرُ",
    transliteration: "Al-Kabeer",
    hinglishMeaning: "Sabse Bada (महानतम)",
    englishMeaning: "The Greatest",
    benefitHinglish: "Rozana 100 baar padhne wale ko maashre me buland muqam hasil hota hai.",
    category: "Qudrat"
  },
  {
    number: 38,
    arabic: "الْحَفِيظُ",
    transliteration: "Al-Hafeez",
    hinglishMeaning: "Hifazat Karne Wala (सबका रक्षक)",
    englishMeaning: "The Preserver, The Protector",
    benefitHinglish: "Safar me ya darr ke waqt 16 baar padhne se har hadse se aman milti hai.",
    category: "Hifazat"
  },
  {
    number: 39,
    arabic: "الْمُقِيتُ",
    transliteration: "Al-Muqeet",
    hinglishMeaning: "Rozi Aur Taqat Pahunchane Wala (शारीरिक व आत्मिक खुराक देने वाला)",
    englishMeaning: "The Nourisher, The Sustainer",
    benefitHinglish: "Bad-akhlaq bachhe par 7 martaba paani par dam kar ke pilayein to aadat sudhar sakti hai.",
    category: "Rehmat"
  },
  {
    number: 40,
    arabic: "الْحَسِيبُ",
    transliteration: "Al-Haseeb",
    hinglishMeaning: "Kifayat Karne Wala Aur Hisaab Lene Wala (काफी होने वाला)",
    englishMeaning: "The Accounter, The Sufficient",
    benefitHinglish: "Subah-o-shaam 70 baar 'Hasbiyallahu Al-Haseeb' padhein to dushman se hifazat rehti hai.",
    category: "Hifazat"
  },
  {
    number: 41,
    arabic: "الْجَلِيلُ",
    transliteration: "Al-Jaleel",
    hinglishMeaning: "Buzurgi Aur Jalal Wala (प्रतापी व महिमामय)",
    englishMeaning: "The Majestic, The Sublime",
    benefitHinglish: "Mushk aur zafran se kaghaz par likh kar paas rakhne se auro ki nazro me roab paida hota hai.",
    category: "Qudrat"
  },
  {
    number: 42,
    arabic: "الْكَرِيمُ",
    transliteration: "Al-Kareem",
    hinglishMeaning: "Bada Sakhi Aur Karam Karne Wala (उदार व अनुग्रहकारी)",
    englishMeaning: "The Most Generous",
    benefitHinglish: "Sone se pehle kasrat se padhne se ulema aur nek bando me shumar hota hai.",
    category: "Rehmat"
  },
  {
    number: 43,
    arabic: "الرَّقِيبُ",
    transliteration: "Ar-Raqeeb",
    hinglishMeaning: "Nigehbaan Aur Nigraan (देखभाल करने वाला पहरेदार)",
    englishMeaning: "The Watchful Observer",
    benefitHinglish: "Apne maal aur aulaad par 7 baar padh kar dam karne se gumshuda hone se bache rehte hain.",
    category: "Hifazat"
  },
  {
    number: 44,
    arabic: "الْمُجِيبُ",
    transliteration: "Al-Mujeeb",
    hinglishMeaning: "Duaen Qabool Karne Wala (प्रार्थना स्वीकार करने वाला)",
    englishMeaning: "The Responsive, The Answerer",
    benefitHinglish: "Dua maangte waqt 'Ya Mujeeb' ka waseela lagane se dua jaldi mustajab hoti hai.",
    category: "Rehmat"
  },
  {
    number: 45,
    arabic: "الْوَاسِعُ",
    transliteration: "Al-Wasi",
    hinglishMeaning: "Kushadagi Aur Wusat Wala (विशाल व असीमित)",
    englishMeaning: "The Vast, The All-Encompassing",
    benefitHinglish: "Kasrat se wird karne se rizq aur ilm dono me farakhi naseeb hoti hai.",
    category: "Rehmat"
  },
  {
    number: 46,
    arabic: "الْحَكِيمُ",
    transliteration: "Al-Hakeem",
    hinglishMeaning: "Hikmat Wala (ज्ञान व बुद्धि का स्वामी)",
    englishMeaning: "The All-Wise",
    benefitHinglish: "Padhne se dil me baseera aur sahih faisla lene ki quwwat paida hoti hai.",
    category: "Hikmat"
  },
  {
    number: 47,
    arabic: "الْوَدُودُ",
    transliteration: "Al-Wadood",
    hinglishMeaning: "Muhabbat Karne Wala (सच्चा प्रेम करने वाला)",
    englishMeaning: "The Most Loving",
    benefitHinglish: "Miya-biwi ke jhagde me 1000 baar khane par dam kar ke dono khayein to muhabbat paida hoti hai.",
    category: "Rehmat"
  },
  {
    number: 48,
    arabic: "الْمَجِيدُ",
    transliteration: "Al-Majeed",
    hinglishMeaning: "Buzurgi Aur Sharafat Wala (महिमामय व गौरवशाली)",
    englishMeaning: "The Most Glorious",
    benefitHinglish: "Ayyam-e-Beez (13, 14, 15) ko roza rakh kar kasrat se padhein to jild ki beemariyaan dur hoti hain.",
    category: "Qudrat"
  },
  {
    number: 49,
    arabic: "الْبَاعِثُ",
    transliteration: "Al-Ba'ith",
    hinglishMeaning: "Murdou Ko Zinda Karne Wala (मुरदों को जीवित करने वाला)",
    englishMeaning: "The Resurrector",
    benefitHinglish: "Sone se pehle seene par haath rakh kar 100 martaba padhne se dil roshan hota hai.",
    category: "Qudrat"
  },
  {
    number: 50,
    arabic: "الشَّهِيدُ",
    transliteration: "Ash-Shaheed",
    hinglishMeaning: "Har Jagah Hazir-o-Nazir (हर जगह उपस्थित साक्षी)",
    englishMeaning: "The All-Witnessing",
    benefitHinglish: "Nafarman aulaad ke maathe par haath rakh kar 21 baar padhein to farmabardar ho jaye.",
    category: "Hikmat"
  },
  {
    number: 51,
    arabic: "الْحَقُّ",
    transliteration: "Al-Haqq",
    hinglishMeaning: "Sacha Aur Bar-haq (सत्य और शाश्वत)",
    englishMeaning: "The Absolute Truth",
    benefitHinglish: "Chaarkona kaghaz par likh kar subah ke waqt dua karein to gumshuda cheez mil jati hai.",
    category: "Hikmat"
  },
  {
    number: 52,
    arabic: "الْوَكِيلُ",
    transliteration: "Al-Wakeel",
    hinglishMeaning: "Kaarsaz Aur Kifayat Karne Wala (कारसाज़ व कार्यसाधक)",
    englishMeaning: "The Trustworthy Trustee",
    benefitHinglish: "'Hasbunallahu wa ni'mal wakeel' ke sath padhne se aag aur toofan se hifazat rehti hai.",
    category: "Hifazat"
  },
  {
    number: 53,
    arabic: "الْقَوِيُّ",
    transliteration: "Al-Qawiyy",
    hinglishMeaning: "Badi Taqat Wala (परम शक्तिशाली)",
    englishMeaning: "The All-Strong",
    benefitHinglish: "Kamzori aur dushmano ke khauf ke waqt 116 martaba padhna nihayat muassar hai.",
    category: "Qudrat"
  },
  {
    number: 54,
    arabic: "الْمَتِينُ",
    transliteration: "Al-Mateen",
    hinglishMeaning: "Mazboot Aur Pukhta (दृढ़ व स्थिर)",
    englishMeaning: "The Firm, The Steadfast",
    benefitHinglish: "Doodh pilane wali maa paani par dam karke piye to doodh me barkat hoti hai.",
    category: "Qudrat"
  },
  {
    number: 55,
    arabic: "الْوَلِيُّ",
    transliteration: "Al-Waliyy",
    hinglishMeaning: "Madadgar Aur Dost (सहायक और सच्चा मित्र)",
    englishMeaning: "The Protecting Friend",
    benefitHinglish: "Jo shakhs rozana iska wird karega, Allah use apna muqarrab banda banayega.",
    category: "Rehmat"
  },
  {
    number: 56,
    arabic: "الْحَمِيدُ",
    transliteration: "Al-Hameed",
    hinglishMeaning: "Har Tareef Ke Laiq (सर्वप्रशंसनीय)",
    englishMeaning: "The Praiseworthy",
    benefitHinglish: "Tanhaai me 93 baar padhne se zubaan me mithas aur baatin me noor paida hota hai.",
    category: "Rehmat"
  },
  {
    number: 57,
    arabic: "الْمُحْصِي",
    transliteration: "Al-Muhsee",
    hinglishMeaning: "Sab Kuch Gin Kar Rakhne Wala (सबकी गिनती रखने वाला)",
    englishMeaning: "The Appraiser, The Accounter",
    benefitHinglish: "20 roti ke tukdo par 20 baar padh kar khaye to log muti bante hain.",
    category: "Hikmat"
  },
  {
    number: 58,
    arabic: "الْمُبْدِئُ",
    transliteration: "Al-Mubdi'",
    hinglishMeaning: "Pehli Baar Paida Karne Wala (पहली बार रचने वाला)",
    englishMeaning: "The Originator",
    benefitHinglish: "Hamila aurat ke pet par haath rakh kar 29 baar padhein to hamal mahfooz rehta hai.",
    category: "Qudrat"
  },
  {
    number: 59,
    arabic: "الْمُعِيدُ",
    transliteration: "Al-Mu'eed",
    hinglishMeaning: "Dobara Lautane Wala (दोबारा लौटाने वाला)",
    englishMeaning: "The Restorer",
    benefitHinglish: "Gumshuda shakhs ke wapis aane ke liye charo kono par 70 baar padh kar dua karein.",
    category: "Qudrat"
  },
  {
    number: 60,
    arabic: "الْمُحْيِي",
    transliteration: "Al-Muhyee",
    hinglishMeaning: "Zindagi Bakhshne Wala (जीवनदाता)",
    englishMeaning: "The Giver of Life",
    benefitHinglish: "Bimar shakhs par kasrat se padhein to roohani aur jismani sehat naseeb hoti hai.",
    category: "Rehmat"
  },
  {
    number: 61,
    arabic: "الْمُمِيتُ",
    transliteration: "Al-Mumeet",
    hinglishMeaning: "Maut Dene Wala (मृत्यु देने वाला)",
    englishMeaning: "The Creator of Death",
    benefitHinglish: "Nafs-e-ammarah par qabu pane ke liye sone se pehle seene par haath rakh kar padhein.",
    category: "Qudrat"
  },
  {
    number: 62,
    arabic: "الْحَيُّ",
    transliteration: "Al-Hayy",
    hinglishMeaning: "Hamesha Zinda Rehne Wala (सदा जीवित)",
    englishMeaning: "The Ever-Living",
    benefitHinglish: "'Ya Hayyu Ya Qayyoom' padhne se har mushkil aasan hoti hai aur lambi ba-barkat umar milti hai.",
    category: "Qudrat"
  },
  {
    number: 63,
    arabic: "الْقَيُّومُ",
    transliteration: "Al-Qayyoom",
    hinglishMeaning: "Sabko Thaamne Wala (सबको सम्भालने वाला)",
    englishMeaning: "The Self-Subsisting Sustainer",
    benefitHinglish: "Fajr aur Sunnat ke darmian 40 baar 'Ya Hayyu Ya Qayyoom bi-rahmatika astaghees' padhein.",
    category: "Qudrat"
  },
  {
    number: 64,
    arabic: "الْوَاجِدُ",
    transliteration: "Al-Wajid",
    hinglishMeaning: "Jo Chahe Paane Wala (सब कुछ पाने वाला)",
    englishMeaning: "The Perceiver, The Finder",
    benefitHinglish: "Khana khate waqt har luqme par padhne se dil ki roohani quwwat badhti hai.",
    category: "Qudrat"
  },
  {
    number: 65,
    arabic: "الْمَاجِدُ",
    transliteration: "Al-Majid",
    hinglishMeaning: "Buzurgi Aur Karam Wala (सम्मानित व उदार)",
    englishMeaning: "The Illustrious",
    benefitHinglish: "Tanhaai me padhne se nooraniyat aur roohani sukoon milta hai.",
    category: "Rehmat"
  },
  {
    number: 66,
    arabic: "الْوَاحِدُ",
    transliteration: "Al-Wahid",
    hinglishMeaning: "Ek Aur Yakta (अकेला और अद्वितीय)",
    englishMeaning: "The One",
    benefitHinglish: "1000 martaba padhne se dil se darr aur vehm dur hota hai.",
    category: "Hikmat"
  },
  {
    number: 67,
    arabic: "الْأَحَدُ",
    transliteration: "Al-Ahad",
    hinglishMeaning: "Akela Jiski Koi Misal Nahi (जिसकी कोई मिसाल नहीं)",
    englishMeaning: "The Indivisible, The Unique",
    benefitHinglish: "1000 martaba padhne se tauheed ki roohani sachayi dil me utarti hai.",
    category: "Hikmat"
  },
  {
    number: 68,
    arabic: "الصَّمَدُ",
    transliteration: "As-Samad",
    hinglishMeaning: "Beniyaz Aur Be-parwah (सबका सहारा, जो किसी का मोहताज नहीं)",
    englishMeaning: "The Eternal, The Independent",
    benefitHinglish: "Sahar ke waqt 115 baar padhne wale ko Allah ghani aur be-niaz kar deta hai.",
    category: "Qudrat"
  },
  {
    number: 69,
    arabic: "الْقَادِرُ",
    transliteration: "Al-Qadir",
    hinglishMeaning: "Qudrat Wala (सामर्थ्यवान)",
    englishMeaning: "The Capable, The Powerful",
    benefitHinglish: "Wudu ke baad har azoo dhote waqt padhein to dushman par ghalba hasil hota hai.",
    category: "Qudrat"
  },
  {
    number: 70,
    arabic: "الْمُقْتَدِرُ",
    transliteration: "Al-Muqtadir",
    hinglishMeaning: "Mukammal Qudrat Rakhne Wala (पूर्ण सक्षम)",
    englishMeaning: "The Omnipotent",
    benefitHinglish: "So kar uthte waqt 20 baar padhne se sote waqt ki susti aur ghaflat dur hoti hai.",
    category: "Qudrat"
  },
  {
    number: 71,
    arabic: "الْمُقَدِّمُ",
    transliteration: "Al-Muqaddim",
    hinglishMeaning: "Aage Badhane Wala (आगे बढ़ाने वाला)",
    englishMeaning: "The Expediter",
    benefitHinglish: "Jung ya muqabale ke waqt padhne se shujaat aur aage badhne ki himmat aati hai.",
    category: "Qudrat"
  },
  {
    number: 72,
    arabic: "الْمُؤَخِّرُ",
    transliteration: "Al-Mu'akhkhir",
    hinglishMeaning: "Peechhe Karne Wala (पीछे करने वाला)",
    englishMeaning: "The Delayer",
    benefitHinglish: "Rozana 100 baar padhne se Allah taubah ki taufeeq naseeb farmata hai.",
    category: "Qudrat"
  },
  {
    number: 73,
    arabic: "الْأَوَّلُ",
    transliteration: "Al-Awwal",
    hinglishMeaning: "Sabse Pehla (सबसे पहला)",
    englishMeaning: "The Very First",
    benefitHinglish: "Aulaad ki chahat me 40 din tak 1000 baar padhna faydemand hai.",
    category: "Hikmat"
  },
  {
    number: 74,
    arabic: "الْآخِرُ",
    transliteration: "Al-Akhir",
    hinglishMeaning: "Sabke Baad Rehne Wala (सबके बाद रहने वाला)",
    englishMeaning: "The Very Last",
    benefitHinglish: "Rozana 1000 baar padhne se batin se ghairullah ki muhabbat dur hoti hai.",
    category: "Hikmat"
  },
  {
    number: 75,
    arabic: "الظَّاهِرُ",
    transliteration: "Az-Zahir",
    hinglishMeaning: "Zahir Aur Aashkaar (सब पर प्रत्यक्ष)",
    englishMeaning: "The Manifest",
    benefitHinglish: "Ishraq ke baad 500 baar padhne se aankhon aur dil me roshni aati hai.",
    category: "Hikmat"
  },
  {
    number: 76,
    arabic: "الْبَاطِنُ",
    transliteration: "Al-Batin",
    hinglishMeaning: "Poshida Aur Chhupa Hua (अप्रत्यक्ष व रहस्यमय)",
    englishMeaning: "The Hidden",
    benefitHinglish: "Rozana 33 baar padhne se haqeeqi asraar aur dil ka chain hasil hota hai.",
    category: "Hikmat"
  },
  {
    number: 77,
    arabic: "الْوَالِي",
    transliteration: "Al-Waali",
    hinglishMeaning: "Hukmaran Aur Kaarsaaz (सबका स्वामी व प्रबंधक)",
    englishMeaning: "The Sole Governor",
    benefitHinglish: "Ghar par aafat se bachne ke liye 11 baar padhein.",
    category: "Qudrat"
  },
  {
    number: 78,
    arabic: "الْمُتَعَالِي",
    transliteration: "Al-Muta'ali",
    hinglishMeaning: "Nihayat Buland-o-Bala (अति उच्च व महान)",
    englishMeaning: "The Self-Exalted",
    benefitHinglish: "Kasrat se wird karne se har mushkil asan aur roohani darja buland hota hai.",
    category: "Qudrat"
  },
  {
    number: 79,
    arabic: "الْبَرُّ",
    transliteration: "Al-Barr",
    hinglishMeaning: "Ehsaan Aur Bhalai Karne Wala (नेकी व उपकार करने वाला)",
    englishMeaning: "The Source of Goodness",
    benefitHinglish: "Buri aadat chutne aur narm-dili ke liye rozana 7 baar padhein.",
    category: "Rehmat"
  },
  {
    number: 80,
    arabic: "التَّوَّابُ",
    transliteration: "At-Tawwab",
    hinglishMeaning: "Taubah Qabool Karne Wala (तौबा स्वीकार करने वाला)",
    englishMeaning: "The Acceptor of Repentance",
    benefitHinglish: "Chaasht ki namaz ke baad 360 baar padhne se taubah naseeb hoti hai.",
    category: "Bakhshish"
  },
  {
    number: 81,
    arabic: "الْمُنْتَقِمُ",
    transliteration: "Al-Muntaqim",
    hinglishMeaning: "Badla Lene Wala (इंसाफ़ का बदला लेने वाला)",
    englishMeaning: "The Rightful Avenger",
    benefitHinglish: "Zalim ke zulm se be-bas hone par 3 Jumuah tak kasrat se padhein.",
    category: "Qudrat"
  },
  {
    number: 82,
    arabic: "الْعَفُوُّ",
    transliteration: "Al-Afuww",
    hinglishMeaning: "Maaf Karne Aur Gunah Mitane Wala (क्षमा करने वाला)",
    englishMeaning: "The Pardoner, The Effacer",
    benefitHinglish: "Kasrat se padhne wale ke gunaho ke nishan tak mita diye jaate hain.",
    category: "Bakhshish"
  },
  {
    number: 83,
    arabic: "الرَّءُوفُ",
    transliteration: "Ar-Ra'oof",
    hinglishMeaning: "Bada Shafiq Aur Meharban (परम कृपालु)",
    englishMeaning: "The Most Kind, The Compassionate",
    benefitHinglish: "Gussa control karne ke liye 10 martaba Darood ke sath padhein.",
    category: "Rehmat"
  },
  {
    number: 84,
    arabic: "مَالِكُ الْمُلْكِ",
    transliteration: "Malik-ul-Mulk",
    hinglishMeaning: "Sari Kainaat Ka Badshah (सारे ब्रह्मांड का स्वामी)",
    englishMeaning: "The Owner of All Sovereignty",
    benefitHinglish: "Hamesha padhne se ghareebi dur hoti hai aur be-niyazi milti hai.",
    category: "Qudrat"
  },
  {
    number: 85,
    arabic: "ذُو الْجَلَالِ وَالْإِكْرَامِ",
    transliteration: "Dhul-Jalali wal-Ikram",
    hinglishMeaning: "Jalal Aur Inaam-o-Ikram Wala (महिमा और उदारता का स्वामी)",
    englishMeaning: "The Lord of Majesty and Generosity",
    benefitHinglish: "Dua ke aaghaz aur aakhir me padhne se dua rad nahi hoti.",
    category: "Qudrat"
  },
  {
    number: 86,
    arabic: "الْمُقْسِطُ",
    transliteration: "Al-Muqsit",
    hinglishMeaning: "Insaaf Karne Wala (न्याय करने वाला)",
    englishMeaning: "The Equitable",
    benefitHinglish: "Waswaso aur shaitani khayalat se bachne ke liye 100 baar padhein.",
    category: "Hikmat"
  },
  {
    number: 87,
    arabic: "الْجَامِعُ",
    transliteration: "Al-Jami",
    hinglishMeaning: "Sabko Jama Karne Wala (सबको इकट्ठा करने वाला)",
    englishMeaning: "The Gatherer, The Uniter",
    benefitHinglish: "Bichhde huye rishtedaro ya gumshuda cheez ko milane ke liye padhein.",
    category: "Hikmat"
  },
  {
    number: 88,
    arabic: "الْغَنِيُّ",
    transliteration: "Al-Ghaniyy",
    hinglishMeaning: "Beniyaz Aur Dhanwaan (स्वयं समृद्ध)",
    englishMeaning: "The Self-Sufficient",
    benefitHinglish: "Bimari aur tangdasti dur karne ke liye rozana 70 baar padhein.",
    category: "Qudrat"
  },
  {
    number: 89,
    arabic: "الْمُغْنِي",
    transliteration: "Al-Mughni",
    hinglishMeaning: "Ghani Banane Wala (दूसरों को समृद्ध बनाने वाला)",
    englishMeaning: "The Enricher",
    benefitHinglish: "Rozana 1000 baar padhne se Allah be-niyaz aur ghani bana deta hai.",
    category: "Rehmat"
  },
  {
    number: 90,
    arabic: "الْمَانِعُ",
    transliteration: "Al-Mani",
    hinglishMeaning: "Rukawat Aur Rokne Wala (रोकने वाला)",
    englishMeaning: "The Preventer",
    benefitHinglish: "Ghar me ikhtilaf aur fasad dur karne ke liye bistar par 20 baar padhein.",
    category: "Hifazat"
  },
  {
    number: 91,
    arabic: "الضَّارُّ",
    transliteration: "Ad-Darr",
    hinglishMeaning: "Nuqsan Pahunchane Wala (नुकसान का मालिक)",
    englishMeaning: "The Creator of Harm",
    benefitHinglish: "Juma ki raat 100 baar padhne se aafato se hifazat hoti hai.",
    category: "Qudrat"
  },
  {
    number: 92,
    arabic: "النَّافِعُ",
    transliteration: "An-Nafi",
    hinglishMeaning: "Faida Pahunchane Wala (लाभ पहुँचाने वाला)",
    englishMeaning: "The Creator of Good / Profit",
    benefitHinglish: "Kashti, gadi ya safar me 41 baar padhein to khair-o-afiyat rehti hai.",
    category: "Rehmat"
  },
  {
    number: 93,
    arabic: "النُّورُ",
    transliteration: "An-Noor",
    hinglishMeaning: "Noor Aur Roshni (सच्चा प्रकाश)",
    englishMeaning: "The Light",
    benefitHinglish: "Surah Noor ki aayat-e-noor ke sath padhne se batin me roohani noor bharta hai.",
    category: "Hikmat"
  },
  {
    number: 94,
    arabic: "الْهَادِي",
    transliteration: "Al-Hadi",
    hinglishMeaning: "Hidayat Dene Wala (मार्गदर्शन देने वाला)",
    englishMeaning: "The Guide",
    benefitHinglish: "Haath aasmaan ki taraf utha kar kasrat se padhein to hidayat aur sachayi milti hai.",
    category: "Hikmat"
  },
  {
    number: 95,
    arabic: "الْبَدِيعُ",
    transliteration: "Al-Badee",
    hinglishMeaning: "Bila Namoona Naya Banane Wala (अनोखा सृजनकर्ता)",
    englishMeaning: "The Incomparable Originator",
    benefitHinglish: "1000 martaba padhne se gham aur pareshani aasan hoti hai.",
    category: "Qudrat"
  },
  {
    number: 96,
    arabic: "الْبَاقِي",
    transliteration: "Al-Baqi",
    hinglishMeaning: "Hamesha Rehne Wala (सदा रहने वाला)",
    englishMeaning: "The Everlasting",
    benefitHinglish: "Sone se pehle 100 baar padhne se aamaal qabool hote hain aur aafat se bachav hota hai.",
    category: "Qudrat"
  },
  {
    number: 97,
    arabic: "الْوَارِثُ",
    transliteration: "Al-Warith",
    hinglishMeaning: "Sabka Asal Waris (सबका सच्चा वारिस)",
    englishMeaning: "The Ultimate Inheritor",
    benefitHinglish: "Suraj nikalne se pehle 100 baar padhne se lambi umar aur dukh dard se nijat milti hai.",
    category: "Qudrat"
  },
  {
    number: 98,
    arabic: "الرَّشِيدُ",
    transliteration: "Ar-Rasheed",
    hinglishMeaning: "Seedhi Raah Dikhane Wala (सीधी राह दिखाने वाला)",
    englishMeaning: "The Infallible Guide",
    benefitHinglish: "Maghrib aur Isha ke darmian 1000 baar padhne se mushkil masle hal ho jaate hain.",
    category: "Hikmat"
  },
  {
    number: 99,
    arabic: "الصَّبُورُ",
    transliteration: "As-Saboor",
    hinglishMeaning: "Nihayat Sabr Wala (अत्यधिक धैर्यवान)",
    englishMeaning: "The Most Patient",
    benefitHinglish: "Suraj nikalne se pehle 100 baar padhne se sakht pareshani me sabr aur himmat milti hai.",
    category: "Hikmat"
  }
];
