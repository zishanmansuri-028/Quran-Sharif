export interface DailyInspirationItem {
  id: string;
  dayIndex: number; // 1 to 30
  theme: string;
  // Ayah of the day
  ayahArabic: string;
  ayahReference: string;
  ayahHinglish: string;
  // Hadith of the day
  hadithArabic?: string;
  hadithHinglish: string;
  hadithSource: string;
  hadithGrade: string;
  // Practical Reflection for today
  reflectionHinglish: string;
  actionItemHinglish: string;
}

export const DAILY_INSPIRATIONS: DailyInspirationItem[] = [
  {
    id: "day-1",
    dayIndex: 1,
    theme: "Niyyat Ki Pakizgi (Purity of Intention)",
    ayahArabic: "فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحَدًا",
    ayahReference: "Surah Al-Kahf (18:110)",
    ayahHinglish: "To jo koi apne Rab se milne ki umeed rakhta hai, use chahiye ke nek aamaal kare aur apne Rab ki ibadat me kisi ko shareek na thehraye.",
    hadithArabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    hadithHinglish: "Rasoolullah ﷺ ne farmaya: 'Tamaam aamaal ka daromadar niyyaton par hai, aur har insaan ko wahi milega jiski usne niyyat ki.'",
    hadithSource: "Sahih al-Bukhari 1",
    hadithGrade: "Muttafaqun Alayh",
    reflectionHinglish: "Aaj jo bhi kaam karein — chaho wo padhai ho, naukri ho ya gharwalo ki khidmat — dil me Allah ki raza ki pakki niyyat karein.",
    actionItemHinglish: "Subah ke aaghaz me niyyat karein ke aaj zubaan se kisi ko takleef nahi denge."
  },
  {
    id: "day-2",
    dayIndex: 2,
    theme: "Sabr Aur Shukr (Patience and Gratitude)",
    ayahArabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    ayahReference: "Surah Al-Baqarah (2:153)",
    ayahHinglish: "Ae imaan walo! Sabr aur Namaz ke zariye madad mango. Beshak Allah sabr karne walo ke sath hai.",
    hadithArabic: "عَجَبًا لِأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ",
    hadithHinglish: "Momin ka maamla bhi kitna ajeeb hai! Uske har haal me khair hai: agar khushi mile to shukr karta hai to behtari hai, aur agar takleef pahunche to sabr karta hai to bhi behtari hai.",
    hadithSource: "Sahih Muslim 2999",
    hadithGrade: "Sahih",
    reflectionHinglish: "Mushkil waqt hamesha ke liye nahi hota, par sabr se hasil hone wala ajar hamesha zinda rehta hai.",
    actionItemHinglish: "Kisi bhi pareshani par gussa karne ke bajaye 3 baar 'Alhamdulillah ala kulli haal' padhein."
  },
  {
    id: "day-3",
    dayIndex: 3,
    theme: "Walidain (Parents) Ki Izzat Aur Khidmat",
    ayahArabic: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
    ayahReference: "Surah Al-Isra (17:23)",
    ayahHinglish: "Aur tumhare Rab ne faisla farma diya ke tum Uske siwa kisi ki ibadat na karo, aur maa-baap ke sath husn-e-sulook (bhalai) karo.",
    hadithArabic: "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ",
    hadithHinglish: "Rasoolullah ﷺ ne farmaya: 'Rab ki raza walid ki raza me hai, aur Rab ki narazgi walid ki narazgi me hai.'",
    hadithSource: "Jami at-Tirmidhi 1899",
    hadithGrade: "Sahih",
    reflectionHinglish: "Maa-baap dunya me jannat ke sabse aasan darwaze hain. Unki muskurahat hamari aakhirat sanwar sakti hai.",
    actionItemHinglish: "Aaj apne ammi-abbu ke haath chumein ya unhe phone karke unki khariyat aur dua lein."
  },
  {
    id: "day-4",
    dayIndex: 4,
    theme: "Sachai Aur Imandari (Honesty & Truth)",
    ayahArabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّادِقِينَ",
    ayahReference: "Surah At-Tawbah (9:119)",
    ayahHinglish: "Ae imaan walo! Allah se daro aur sach bolne walo ke sath ho jao.",
    hadithHinglish: "Sachai neki ki taraf le jaati hai aur neki jannat ki taraf le jaati hai. Aur jhoot gunah ki taraf le jata hai.",
    hadithSource: "Sahih al-Bukhari 6094",
    hadithGrade: "Muttafaqun Alayh",
    reflectionHinglish: "Chhoti si sachai shuru me mushkil lag sakti hai, par aakhir me wahi izzat aur kamiyabi deti hai.",
    actionItemHinglish: "Aaj kisi bhi majboori ya mazaak me jhoot na bole aur imandari par qayam rahein."
  },
  {
    id: "day-5",
    dayIndex: 5,
    theme: "Rizq Me Barkat Aur Tawakkul (Trust in Allah)",
    ayahArabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ",
    ayahReference: "Surah At-Talaq (65:3)",
    ayahHinglish: "Aur jo shakhs Allah par bharosa karega, to Allah use kaafi hai. Beshak Allah apna kaam pura karke rehta hai.",
    hadithHinglish: "Agar tum Allah par waisa tawakkul karo jaisa haq hai, to wo tumhe aise rizq dega jaise parindo ko deta hai — subah bhookhe nikalte hain aur shaam ko pet bhar kar laut te hain.",
    hadithSource: "Jami at-Tirmidhi 2344",
    hadithGrade: "Sahih",
    reflectionHinglish: "Koshish hamara farz hai, par nateeja Allah ke haath me hai. Dil ko be-fuzool fikro se aazad rakhein.",
    actionItemHinglish: "Apni rozi halal tareeqe se kamane ka ahed karein aur 'Hasbunallahu wa ni'mal wakeel' ka wird karein."
  },
  {
    id: "day-6",
    dayIndex: 6,
    theme: "Taubah Aur Maghfirat (Repentance & Mercy)",
    ayahArabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    ayahReference: "Surah Az-Zumar (39:53)",
    ayahHinglish: "Aap keh dijiye ke: Ae mere bando jinhone apni jaano par zyadati ki hai! Allah ki rehmat se mayoos na ho, beshak Allah sabhi gunah maaf farma deta hai.",
    hadithHinglish: "Rasoolullah ﷺ ne farmaya: 'Gunaho se taubah karne wala aisa hai jaise usne koi gunah kiya hi na ho.'",
    hadithSource: "Sunan Ibn Majah 4250",
    hadithGrade: "Hasan",
    reflectionHinglish: "Chahe kitne bhi gunah ho gaye hon, Allah ka darwaza kabhi band nahi hota. Bas ek sachha aansu kaafi hai.",
    actionItemHinglish: "Sone se pehle 100 baar 'Astaghfirullaha wa atoobu ilayh' padh kar taubah karein."
  },
  {
    id: "day-7",
    dayIndex: 7,
    theme: "Padosiyo Aur Rishtedaro Ke Huqooq (Kindness to Neighbors)",
    ayahArabic: "وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا ۖ وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ",
    ayahReference: "Surah An-Nisa (4:36)",
    ayahHinglish: "Aur Allah ki ibadat karo aur Uske sath kisi ko shareek na thehrao, aur maa-baap, rishtedaro, yateemo, miskeeno aur kareebi wa ajnabi padosiyo ke sath bhalai karo.",
    hadithHinglish: "Jibreel (alaihissalam) mujhe padosi ke baare me is qadar wasiyyat karte rahe ke mujhe laga ke shayad padosi ko virasat me hissa-dar bana denge.",
    hadithSource: "Sahih al-Bukhari 6014",
    hadithGrade: "Muttafaqun Alayh",
    reflectionHinglish: "Padosi chahe kisi bhi mazhab ya biradari ka ho, uski izzat aur zaroorat me khada hona hamara imaan hai.",
    actionItemHinglish: "Aaj kisi padosi ya dost ko khane ki koi cheez ya salam ka tohfa bhejein."
  }
];

export function getTodayInspiration(): DailyInspirationItem {
  const dayOfMonth = new Date().getDate();
  const index = (dayOfMonth - 1) % DAILY_INSPIRATIONS.length;
  return DAILY_INSPIRATIONS[index];
}
