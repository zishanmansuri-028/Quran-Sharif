import { SunnahGuideItem } from '../types';

export const SUNNAH_DATABASE: SunnahGuideItem[] = [
  // ===============================
  // 1. WUDU (ABLUTION)
  // ===============================
  {
    id: 'sunnah-wudu-complete',
    category: 'wudu',
    categoryLabel: 'Wudu Ka Tarika (Farz aur Sunnat)',
    title: 'Wudu Ka Nabawi Sunnat Tarika: Step-by-Step Rahnumai',
    summary: 'Paaki aadha imaan hai. Quran Majeed me 4 Farz bataye gaye hain, aur Pyare Nabi ﷺ ki Sunnat is amal ko mukammal noor aur ajar banati hai.',
    classification: "Sunnah Mu'akkadah (Emphasized)",
    steps: [
      'Dil me wudu aur paaki ki sachchi niyat karein (zubaan se bolna zaroori nahi, dil ka irada hi kaafi hai).',
      'Paani ko hath lagane se pehle "Bismillah" kahein.',
      'Dono hathon ko kalaiyon (wrists) tak 3 baar achhi tarah dhoyen, aur ungliyon ka khilal karein.',
      'Seedhe (daayein) hath se 3 baar kulla karein (Madmadah), aur naak me paani daal kar baayein hath se naak saaf karein (Istinshaq & Istinthar).',
      'Poore chehre ko 3 baar dhoyen: peshani ke baalon se lekar thhodi (chin) ke neeche tak, aur ek kaan ki lau se doosre kaan tak. (Farz Rukan 1)',
      'Dono bazuon ko kohniyon (elbows) samet 3 baar dhoyen: pehle daayan (right) bazu, phir baayan (left) bazu. (Farz Rukan 2)',
      'Gheele hathon se poore sar ka masah karein: aage se peeche le jayein aur wapas laayein, aur kalme ki ungli se kaanon ke andar aur anguthe se bahar masah karein. (Farz Rukan 3)',
      'Dono paanv ko takhno (ankles) samet 3 baar dhoyen: pehle daayan paanv phir baayan paanv, aur chhotee ungli se paanv ki ungliyon ka khilal karein. (Farz Rukan 4)',
      'Wudu poora karne ke baad kalma-e-shahadat aur masnoon dua padhein: "Ash-hadu allaa ilaaha illallaah..." — isse Jannat ke 8 darwaze khul jate hain.'
    ],
    arabicDua: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: "Ash-hadu allaa ilaaha illallaahu wahdahoo laa shareeka lah, wa ash-hadu anna Muhammadan 'abduhoo wa Rasooluh",
    duaMeaning: 'Main gawaahi deta hoon ke Allah ke siwa koi mabood nahi, wo akela hai uska koi shareek nahi; aur main gawaahi deta hoon ke Muhammad ﷺ uske bande aur Rasool hain.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
    referenceNumber: 'Bukhari 159, Muslim 226',
    authenticity: 'Muttafaqun Alayh',
    commonMistakesToAvoid: [
      'Nal khula chhod kar paani zyada bahana ya fazool kharch karna; Nabi Kareem ﷺ sirf ek mudd (lagbhag 650 ml) paani se wudu farmate the.',
      'Takhno ya aediyon (heels) ka sookha reh jana; Nabi Kareem ﷺ ne farmaya: "Sookhi aediyon ke liye aag ki halakat hai".',
      'Hawas ya waswas me aakar 3 baar se zyada dhona; 3 baar se zyada dhona mana kiya gaya hai.',
      'Hawa nikalne ya gehri neend ke baad bina naya wudu kiye namaz padhna.'
    ]
  },

  // ===============================
  // 2. SALAH (PRAYER STEP-BY-STEP)
  // ===============================
  {
    id: 'sunnah-salah-guide',
    category: 'salah',
    categoryLabel: 'Namaz Ka Sunnat Tarika (Salah)',
    title: 'Namaz-e-Nabawi: "Waise Namaz Padho Jaise Mujhe Padhte Dekha"',
    summary: 'Rasoolullah ﷺ ne farmaya: "Namaz us tarah ada karo jaise tumne mujhe namaz padhte dekha hai." Takbeer-e-Tehrima se lekar Salam tak sukoon, khushoo aur mutmain tareeqa.',
    classification: 'Fard (Obligatory)',
    steps: [
      'Qibla-rukh (Kaaba Shareef ki taraf) seedhe khade ho jayein aur dil me us waqt ki namaz ki pakki niyat karein.',
      'Dono hathon ko kaano ya kandhon tak uthayein aur "Allahu Akbar" (Takbeer-e-Tehrima) kahein.',
      'Daayein hath ko baayein hath par seene ya naaf ke kareeb baandhein, nigaah sajdah ki jagah par rakhein, aur Sana ("Subhanaka Allahumma...") padhein.',
      'Ta\'awwuz aur Tasmiyah: "A\'udhu billahi minash-shaytanir-rajeem, Bismillahir-Rahmanir-Raheem" padhein, phir Surah Al-Fatihah thehar-thehar kar aayat-ba-aayat padhein aur aakhir me aahista ya buland aawaz me "Ameen" kahein.',
      'Surah Fatihah ke baad Quran Majeed ki koi bhi Surah ya kam se kam 3 choti aayatein padhein.',
      '"Allahu Akbar" keh kar Ruku me jayein: peeth bilkul seedhi ho, hath ghutnon par mazbooti se jame hon, aur sukoon se kam se kam 3 baar "Subhana Rabbiyal-\'Azeem" padhein.',
      'Ruku se seedhe khade hote waqt "Sami\'allahu liman hamidah" kahein, aur khade hokar mutmain andaaz me "Rabbana lakal-hamd" kahein (Qawmah).',
      '"Allahu Akbar" keh kar Sajde me jayein: 7 aaza par sajdah karein (peshani samet naak, dono hath, dono ghutne, aur paanv ki ungliyan Qibla rukh), aur sukoon se 3 baar "Subhana Rabbiyal-A\'la" padhein.',
      'Sajde se uthkar dono sajdon ke darmiyan seedhe baith jayein (Jalsah), "Rabbighfir lee" kahein, phir doosra sajdah karein.',
      'Aakhiri Qa\'dah me baith kar Tashahhud (Attahiyyaat), Durood Ibrahim, aur Masnoon Dua padhein, phir daayein aur baayein salam pherein: "Assalamu Alaikum wa Rahmatullah".'
    ],
    arabicDua: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration: "Allaahumma salli 'alaa Muhammadin wa 'alaa aali Muhammad, kamaa sallayta 'alaa Ibraaheema wa 'alaa aali Ibraaheem, innaka Hameedun Majeed",
    duaMeaning: 'Aye Allah! Rehmat nazil farma Muhammad ﷺ par aur unki aal par, jaisa ke tune rehmat nazil farmayi Ibrahim par aur unki aal par; beshak tu badi tareef wala aur buzurgi wala hai.',
    source: 'Sahih al-Bukhari',
    referenceNumber: 'Hadith 631 & 3370',
    authenticity: 'Muttafaqun Alayh',
    commonMistakesToAvoid: [
      'Jaldbaazi karna aur ruku-sajde me sukoon (Tuma\'ninah) na karna; bina sukoon aur thehrao ke namaz nahi hoti.',
      'Namaz me aasmaan ya idhar-udhar dekhna; nigaah hamesha sajdah ki jagah par rehni chahiye.',
      'Sajde me kohniyon ko kutton ki tarah zameen par bicha lena; kohniyan zameen aur pehlu se alag rehni chahiye.',
      'Ba-jamaat namaz me Imam se pehle ruku ya sajdah karna.'
    ]
  },

  // ===============================
  // 3. EATING & DRINKING
  // ===============================
  {
    id: 'sunnah-eating-drinking',
    category: 'eating',
    categoryLabel: 'Khane Peene Ke Sunnat Aadaab',
    title: 'Khana Khane Aur Paani Peene Ki Masnoon Sunnatein',
    summary: 'Islam me khana peena bhi ibadat ban jata hai jab use Rasoolullah ﷺ ke bataye hue paakeeza aadaab ke mutabiq ada kiya jaye.',
    classification: 'Mustahabb (Recommended)',
    steps: [
      'Dastarkhwan par aane se pehle dono hathon ko achhi tarah dho lein.',
      'Khana shuru karne se pehle Allah ka naam lein aur "Bismillah" kahein (agar bhool jayein to "Bismillahi awwalahu wa aakhirahu" kahein).',
      'Hamesha daayein (seedhe) hath se khayein aur bartan me apne aage se khayein.',
      'Aajizi aur tawazu ke sath baith kar khayein; tek laga kar ya ainth kar khana mana hai.',
      'Paani hamesha baith kar, daayein hath se pakad kar, dekh kar aur 3 saanson me thehar-thehar kar piyein; ek hi saans me pura gilaas na ghein.',
      'Khane me kabhi aib na nikalein: pasand ho to shukr ke sath khayein, na pasand ho to bina bura kahe chhod dein.',
      'Pet bhar kar zyadati se na khayein: 1/3 hissa khane ke liye, 1/3 paani ke liye, aur 1/3 saans ke liye rakhein.',
      'Khana khatam karne ke baad ungliyon aur bartan ko saaf karein, aur Allah ka shukr ada karein: "Alhamdulillahilladhee at\'amanaa..."'
    ],
    arabicDua: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: "Alhamdu lillaahil-ladhee at'amanaa wa saqaanaa wa ja'alanaa muslimeen",
    duaMeaning: 'Tamaam tareefein Allah ke liye hain jisne hamein khilaya, pilaya aur musalman banaya.',
    source: 'Sunan Abi Dawud & Sahih Muslim',
    referenceNumber: 'Abu Dawud 3850, Muslim 2026',
    authenticity: 'Sahih / Hasan',
    commonMistakesToAvoid: [
      'Baayein (ulte) hath se khana ya paani peena; Hadees me aaya hai ke Shaitan ulte hath se khata aur peeta hai.',
      'Garam khane ya chai me phoonk maarna.',
      'Khana zaya karna ya jhoota chhod kar phenk dena.'
    ]
  },

  // ===============================
  // 4. SLEEPING & NIGHT ROUTINE
  // ===============================
  {
    id: 'sunnah-sleep-night',
    category: 'sleep',
    categoryLabel: 'Sone Aur Raat Ki Sunnatein',
    title: 'Sone Ke Masnoon Aadaab Aur Raat Ki Hifazat',
    summary: 'Apni neend ko ibadat aur hifazat banayein. Nabi Kareem ﷺ ke bataye hue tareeqe par sona raat bhar farishton ki hifazat me rakhta hai.',
    classification: "Sunnah Mu'akkadah (Emphasized)",
    steps: [
      'Isha ki namaz ke baad jaldi sone ki aadat daalein; bina wajah raat ko bekar baatein ya mobile screen chalane se bachein.',
      'Ba-wudu hokar soyein; paak-saaf hokar sone wale ke liye raat bhar ek farishta maghfirat ki dua karta rehta hai.',
      'Bistar par letne se pehle chadar ya bistar ko 3 baar kapde ke kone se achhi tarah jhaad lein.',
      'Daayein (right) karwat par lein, daaya hath daayein rukhsaar (cheek) ke neeche rakhein, aur Qibla rukh karein.',
      'Ayat al-Kursi (Surah Baqarah 2:255) padhein; isse subah tak Allah ki taraf se ek farishta hifazat ke liye muqarrar ho jata hai.',
      'Dono hath jod kar 3 Qul (Surah Ikhlas, Falaq, Nas) padhein, hathon par phoonk kar sar, chehre aur poore jism par 3 baar pherein.',
      'Tasbeeh-e-Fatima padhein: 33 baar SubhanAllah, 33 baar Alhamdulillah, aur 34 baar Allahu Akbar.',
      'Fajr ki namaz me uthne ki pakki niyat karein aur imandari se alarm lagayein.'
    ],
    arabicDua: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    transliteration: "Allaahumma qinee 'adhaabaka yawma tab'athu 'ibaadak",
    duaMeaning: 'Aye Allah! Mujhe apne azaab se bacha jis din tu apne bandon ko dobara uthayega.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
    referenceNumber: 'Bukhari 5017, Muslim 2710',
    authenticity: 'Muttafaqun Alayh',
    commonMistakesToAvoid: [
      'Pet ke bal ulta hokar sona; Nabi Kareem ﷺ ne farmaya ke ye aisi aadat hai jise Allah Ta\'ala na-pasand farmata hai.',
      'Raat der tak be-faida mobile dekhna jiski wajah se Fajr ki namaz qaza ho jaye.',
      'Dil me kisi musalman bhai ke liye keena, bugz ya nafrat rakh kar sona.'
    ]
  },

  // ===============================
  // 5. FRIDAY (JUMU'AH) SUNNAHS
  // ===============================
  {
    id: 'sunnah-friday-jumuah',
    category: 'friday',
    categoryLabel: 'Jumuah (Shukrawar) Ki Sunnatein',
    title: 'Mubarak Jumuah (Shukrawar) Ki Khaas Sunnatein',
    summary: 'Jumuah ka din sabhi dino ka sardaar (Sayyid al-Ayyam) hai. Is din ki barkaton ko Nabi-e-Rehmat ﷺ ki sunnaton se hasil karein.',
    classification: "Sunnah Mu'akkadah (Emphasized)",
    steps: [
      'Ghusl karein (nahayein), nakhun tarashein, moochhein katrein aur safai karein.',
      'Saaf-suthre aur behtareen kapde (agar ho sake to safed) pehnein aur khushboo (Attar) lagayein.',
      'Miswak ka ehtemaam karein.',
      'Surah Al-Kahf (Paara 15-16) ki tilawat karein; Hadees me aaya hai ke isse do jumuah ke darmiyan noor roshan rehta hai.',
      'Poore din Rasoolullah ﷺ par kasrat se Durood Shareef bhejein.',
      'Masjid me waqt se pehle paidal jayein, waqaar aur sukoon ke sath jayein aur khutba poore dhyan se sunein; khutbe ke dauran mobile na chalaayein.',
      'Dua ki qubooliyat ki khaas ghadi (Sa\'at al-Ijabah) talash karein, khaas taur par Asr se Maghrib ke darmiyan aakhiri waqt me dua maangein.'
    ],
    arabicDua: 'اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ عَبْدِكَ وَرَسُولِكَ النَّبِيِّ الْأُمِّيِّ وَعَلَىٰ آلِهِ وَصَحْبِهِ وَسَلِّمْ',
    transliteration: "Allaahumma salli 'alaa sayyidinaa Muhammadin 'abdika wa Rasoolikan-nabiyyil-ummiyyi wa 'alaa aalihee wa sahbihee wa sallim",
    duaMeaning: 'Aye Allah! Rehmat nazil farma hamare sardaar Muhammad ﷺ par jo tere bande aur ummi Rasool hain, aur unki aal aur ashaab par salamati bhej.',
    source: 'Sahih al-Bukhari & Sunan Abi Dawud',
    referenceNumber: 'Bukhari 883, Abu Dawud 1046',
    authenticity: 'Sahih',
    commonMistakesToAvoid: [
      'Khutbe ke dauran baat karna, khusar-phusar karna ya mobile dekhna (yahan tak ke kisi ko "chup raho" kehne se bhi Jumuah ka ajar zaya ho jata hai).',
      'Baithe hue namaziyon ki gardanein phalang kar aage badhna; jahan jagah mile wahin baith jayein.',
      'Bina kisi shar\'i uzr ke susti me aakar Jumuah chhod dena; 3 Jumuah lagatar chhodne wale ke dil par muhar lag jati hai.'
    ]
  },

  // ===============================
  // 6. BATHROOM ETIQUETTE
  // ===============================
  {
    id: 'sunnah-bathroom-etiquette',
    category: 'bathroom',
    categoryLabel: 'Baitul-Khala Aur Taharat Ke Aadaab',
    title: 'Baitul-Khala (Bathroom) Jane Aur Paaki Ke Sunnat Aadaab',
    summary: 'Islam paaki aur sharm-o-haya ka deen hai. Taharat aur najaasat se bachne ka sunnat tarika.',
    classification: 'Mustahabb (Recommended)',
    steps: [
      'Koi aisi cheez lekar bathroom me na jayein jis par Allah ka naam ya Quran ki aayat likhi ho.',
      'Daakhil hone se pehle baahar hi dua padhein: "Allahumma innee a\'oodhu bika minal-khubuthi wal-khabaa\'ith" aur pehle baayan (left) paanv andar rakhein.',
      'Peshabb hamesha baith kar karein taake peshaab ke chheente kapdon ya jism par na padein.',
      'Khuli jagah me qaza-e-haajat ke waqt Qibla ki taraf rukh ya peeth na karein.',
      'Paani se achhi tarah istinja (paaki) karein aur sirf baayein (left) hath ka istemal karein.',
      'Bahar nikalte waqt pehle daayan (right) paanv bahar nikalein aur turant kahein: "Ghufranaka" (Aye Allah! Main teri bakhshish chahta hoon).'
    ],
    arabicDua: 'غُفْرَانَكَ',
    transliteration: 'Ghufraanak',
    duaMeaning: 'Aye Allah! Main teri bakhshish aur maghfirat chahta hoon.',
    source: 'Sahih al-Bukhari & Sunan Abi Dawud',
    referenceNumber: 'Bukhari 142, Abu Dawud 30',
    authenticity: 'Sahih',
    commonMistakesToAvoid: [
      'Peshaab ke chheenton se laparwahi baratna; Hadees me aaya hai ke qabr ke azaab ka ek bada sabab peshaab ke chheenton se na bachna hai.',
      'Istinja (paaki) ke liye daayein (seedhe) hath ka istemal karna.',
      'Bathroom me baat karna ya salaam ka jawab dena.'
    ]
  },

  // ===============================
  // 7. MORNING SUNNAHS
  // ===============================
  {
    id: 'sunnah-morning-routine',
    category: 'morning',
    categoryLabel: 'Subah Aur Fajr Ki Sunnatein',
    title: 'Fajr Se Tulu-e-Aftab (Suraj Nikalne) Tak Ka Nabawi Maamool',
    summary: 'Subah ke auqaat barkat se bhare hote hain. Nabi Kareem ﷺ ne dua farmayi: "Aye Allah! Meri Ummat ke subah ke waqt me barkat ata farma."',
    classification: 'Mustahabb (Recommended)',
    steps: [
      'Fajr ki azaan se pehle bedar hon, hathon se chehre se neend ke asraat saaf karein, aur so kar uthne ki dua padhein.',
      'Miswak karein ya daanton ko achhi tarah saaf karein.',
      'Wudu karein aur Fajr ke farz se pehle 2 Rakat Sunnat ada karein (Nabi ﷺ ne farmaya: Fajr ki 2 rakat duniya aur jo kuch isme hai sabse behtar hain).',
      'Fajr ki namaz waqt par ba-jamaat ada karein.',
      'Fajr ke baad apni jagah baith kar zikr, Quran ki tilawat aur subah ke masnoon azkaar me mashghool rahein.',
      'Suraj nikalne ke lagbhag 15-20 minute baad 2 se 4 Rakat Ishraq / Salat al-Duha ada karein, jo jism ke har jod ka sadqah ban jata hai.'
    ],
    arabicDua: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: "Asbahnaa wa asbahal-mulku lillaah, walhamdu lillaahi laa ilaaha illallaahu wahdahoo laa shareeka lah",
    duaMeaning: 'Humne subah ki aur Allah ke mulk ne subah ki, aur saari tareefein Allah ke liye hain; Allah ke siwa koi mabood nahi wo akela hai uska koi shareek nahi.',
    source: 'Sahih Muslim',
    referenceNumber: 'Hadith 2723',
    authenticity: 'Sahih',
    commonMistakesToAvoid: [
      'Fajr padhte hi foran so jana bina kisi zikr ya tilawat ke.',
      'Suraj nikalne ke theek waqt nafl namaz padhna (suraj nikalte waqt namaz padhna mana hai).'
    ]
  },

  // ===============================
  // 8. MOSQUE ETIQUETTE
  // ===============================
  {
    id: 'sunnah-mosque-etiquette',
    category: 'mosque',
    categoryLabel: 'Masjid Ke Aadaab',
    title: 'Masjid (Allah Ke Ghar) Me Jane Aur Baithne Ke Sunnat Aadaab',
    summary: 'Masjid Allah ka muqaddas ghar aur aman ka markaz hai, iske aadaab ka khayal rakhna har musalman ka farz hai.',
    classification: 'Mustahabb (Recommended)',
    steps: [
      'Masjid ki taraf ba-waqaar, aahista aur pur-sukoon chaal se jayein; namaz shuru hone par bhi daudkar na jayein.',
      'Daakhil hote waqt pehle daayan (right) paanv andar rakhein, Durood Shareef padhein aur dua padhein: "Allahummaftah lee abwaaba rahmatik".',
      'Baithne se pehle 2 Rakat Tahiyyatul-Masjid (Masjid ko salaami) ada karein (agar makrooh waqt na ho).',
      'Masjid me dakhil hote hi apna mobile phone silent ya switch off karein.',
      'Kaccha lehsun ya kaccha pyaaz kha kar masjid na jayein taake uski badboo se namaziyon aur farishton ko taqleef na ho.',
      'Pehle aage ki saff bharein, kandhe se kandha aur paanv se paanv mila kar saff seedhi karein taake Shaitan ke liye beech me jagah na bache.',
      'Bahar nikalte waqt pehle baayan (left) paanv bahar nikalein aur dua kahein: "Allahumma innee as-aluka min fadlik".'
    ],
    arabicDua: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allaahum-maftah lee abwaaba rahmatik',
    duaMeaning: 'Aye Allah! Mere liye apni rehmat ke darwaze khol de.',
    source: 'Sahih Muslim',
    referenceNumber: 'Hadith 713',
    authenticity: 'Sahih',
    commonMistakesToAvoid: [
      'Iqamat sun kar masjid ke andar bhag-daud karna; aahista aur sukoon se chalna sunnat hai.',
      'Namaz padhne wale ke aage se guzarna (namazi ke aage se guzarna bada gunaah hai).',
      'Masjid ke andar shor machana ya karobar aur duniya ki fizool baatein karna.'
    ]
  }
];
