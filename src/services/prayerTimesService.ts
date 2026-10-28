/**
 * Prayer Times & Qibla Calculation Service
 * Computes accurate Islamic prayer times using solar coordinates (Dhuhr, Asr, Maghrib, Isha, Fajr, Sunrise)
 * and calculates Qibla compass bearing towards the Holy Kaaba in Makkah (21.4225° N, 39.8262° E).
 */

export interface PrayerCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  timezoneOffsetHours: number; // e.g. 5.5 for IST (India)
}

export const POPULAR_CITIES: PrayerCity[] = [
  { id: 'delhi', name: 'New Delhi', country: 'India', lat: 28.6139, lng: 77.2090, timezoneOffsetHours: 5.5 },
  { id: 'mumbai', name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, timezoneOffsetHours: 5.5 },
  { id: 'lucknow', name: 'Lucknow', country: 'India', lat: 26.8467, lng: 80.9462, timezoneOffsetHours: 5.5 },
  { id: 'hyderabad', name: 'Hyderabad', country: 'India', lat: 17.3850, lng: 78.4867, timezoneOffsetHours: 5.5 },
  { id: 'bengaluru', name: 'Bengaluru', country: 'India', lat: 12.9716, lng: 77.5946, timezoneOffsetHours: 5.5 },
  { id: 'kolkata', name: 'Kolkata', country: 'India', lat: 22.5726, lng: 88.3639, timezoneOffsetHours: 5.5 },
  { id: 'chennai', name: 'Chennai', country: 'India', lat: 13.0827, lng: 80.2707, timezoneOffsetHours: 5.5 },
  { id: 'srinagar', name: 'Srinagar (Kashmir)', country: 'India', lat: 34.0837, lng: 74.7973, timezoneOffsetHours: 5.5 },
  { id: 'patna', name: 'Patna', country: 'India', lat: 25.5941, lng: 85.1376, timezoneOffsetHours: 5.5 },
  { id: 'ahmedabad', name: 'Ahmedabad', country: 'India', lat: 23.0225, lng: 72.5714, timezoneOffsetHours: 5.5 },
  { id: 'bhopal', name: 'Bhopal', country: 'India', lat: 23.2599, lng: 77.4126, timezoneOffsetHours: 5.5 },
  { id: 'jaipur', name: 'Jaipur', country: 'India', lat: 26.9124, lng: 75.7873, timezoneOffsetHours: 5.5 },
  { id: 'karachi', name: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, timezoneOffsetHours: 5.0 },
  { id: 'lahore', name: 'Lahore', country: 'Pakistan', lat: 31.5204, lng: 74.3587, timezoneOffsetHours: 5.0 },
  { id: 'dhaka', name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, timezoneOffsetHours: 6.0 },
  { id: 'dubai', name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708, timezoneOffsetHours: 4.0 },
  { id: 'makkah', name: 'Makkah Al-Mukarramah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, timezoneOffsetHours: 3.0 },
  { id: 'madinah', name: 'Al-Madinah Al-Munawwarah', country: 'Saudi Arabia', lat: 24.5247, lng: 39.5692, timezoneOffsetHours: 3.0 },
  { id: 'london', name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, timezoneOffsetHours: 0.0 },
  { id: 'newyork', name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, timezoneOffsetHours: -5.0 }
];

export interface PrayerTimesResult {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  tahajjudEnd: string;
  qiblaBearing: number; // in degrees from North
  currentPrayer: string;
  nextPrayer: string;
  nextPrayerTime: string;
  minutesUntilNext: number;
  cityName: string;
}

// Convert degrees to radians and vice-versa
const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;

/**
 * Calculates Qibla direction (Compass bearing in degrees from True North clockwise)
 * Kaaba coordinates: lat 21.4225, lng 39.8262
 */
export function calculateQiblaBearing(userLat: number, userLng: number): number {
  const kaabaLat = toRad(21.4225);
  const kaabaLng = toRad(39.8262);
  const uLat = toRad(userLat);
  const uLng = toRad(userLng);

  const deltaLng = kaabaLng - uLng;
  const y = Math.sin(deltaLng);
  const x = Math.cos(uLat) * Math.tan(kaabaLat) - Math.sin(uLat) * Math.cos(deltaLng);
  let qibla = toDeg(Math.atan2(y, x));
  return Math.round((qibla + 360) % 360);
}

/**
 * Solar Calculation for accurate Prayer Times
 */
export function calculatePrayerTimes(city: PrayerCity, date = new Date()): PrayerTimesResult {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const b = (2 * Math.PI * (dayOfYear - 81)) / 365;

  // Equation of Time in minutes
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);

  // Solar Declination in radians
  const declination = toRad(23.45 * Math.sin((2 * Math.PI * (284 + dayOfYear)) / 365));

  // Solar Noon (Dhuhr) in decimal hours local time
  const localSolarNoon = 12 + (city.timezoneOffsetHours * 15 - city.lng) / 15 - eot / 60;

  const latRad = toRad(city.lat);

  // Hour Angle calculation helper
  const hourAngle = (angleDeg: number) => {
    const cosHA = (Math.sin(toRad(-angleDeg)) - Math.sin(latRad) * Math.sin(declination)) / (Math.cos(latRad) * Math.cos(declination));
    if (cosHA < -1) return Math.PI;
    if (cosHA > 1) return 0;
    return Math.acos(cosHA);
  };

  // 1. Sunrise / Sunset (sun is at -0.833° below horizon)
  const haSun = hourAngle(0.833);
  const sunHalfDay = toDeg(haSun) / 15;
  const sunriseHours = localSolarNoon - sunHalfDay;
  const sunsetHours = localSolarNoon + sunHalfDay;

  // 2. Fajr (Sun at 18° below horizon - University of Islamic Sciences Karachi / MWL)
  const haFajr = hourAngle(18);
  const fajrHours = localSolarNoon - toDeg(haFajr) / 15;

  // 3. Isha (Sun at 18° below horizon)
  const haIsha = hourAngle(18);
  const ishaHours = localSolarNoon + toDeg(haIsha) / 15;

  // 4. Asr (Hanafi / standard shadow ratio: shadow = object length + noon shadow)
  const noonShadowAngle = Math.abs(latRad - declination);
  const asrShadowRatio = 1 + Math.tan(noonShadowAngle); // standard shadow
  const asrAlt = toDeg(Math.atan(1 / asrShadowRatio));
  const cosAsrHA = (Math.sin(toRad(asrAlt)) - Math.sin(latRad) * Math.sin(declination)) / (Math.cos(latRad) * Math.cos(declination));
  const asrHA = Math.acos(Math.max(-1, Math.min(1, cosAsrHA)));
  const asrHours = localSolarNoon + toDeg(asrHA) / 15;

  // Format decimal hours to 12-hour AM/PM string
  const formatTime = (h: number) => {
    let normalized = (h + 24) % 24;
    const hours24 = Math.floor(normalized);
    const minutes = Math.floor((normalized - hours24) * 60);
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const toTotalMinutes = (h: number) => {
    let normalized = (h + 24) % 24;
    return Math.floor(normalized * 60);
  };

  const fM = toTotalMinutes(fajrHours);
  const sM = toTotalMinutes(sunriseHours);
  const dM = toTotalMinutes(localSolarNoon);
  const aM = toTotalMinutes(asrHours);
  const mM = toTotalMinutes(sunsetHours);
  const iM = toTotalMinutes(ishaHours);

  // Current time in minutes of today
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let currentPrayer = 'Tahajjud / Raat';
  let nextPrayer = 'Fajr';
  let nextPrayerMinutes = fM;
  let nextPrayerTime = formatTime(fajrHours);

  if (currentMinutes >= fM && currentMinutes < sM) {
    currentPrayer = 'Fajr';
    nextPrayer = 'Tuloo-e-Aftab (Sunrise)';
    nextPrayerMinutes = sM;
    nextPrayerTime = formatTime(sunriseHours);
  } else if (currentMinutes >= sM && currentMinutes < dM) {
    currentPrayer = 'Ishraq / Chaasht';
    nextPrayer = 'Dhuhr (Zuhar)';
    nextPrayerMinutes = dM;
    nextPrayerTime = formatTime(localSolarNoon);
  } else if (currentMinutes >= dM && currentMinutes < aM) {
    currentPrayer = 'Dhuhr (Zuhar)';
    nextPrayer = 'Asr';
    nextPrayerMinutes = aM;
    nextPrayerTime = formatTime(asrHours);
  } else if (currentMinutes >= aM && currentMinutes < mM) {
    currentPrayer = 'Asr';
    nextPrayer = 'Maghrib';
    nextPrayerMinutes = mM;
    nextPrayerTime = formatTime(sunsetHours);
  } else if (currentMinutes >= mM && currentMinutes < iM) {
    currentPrayer = 'Maghrib';
    nextPrayer = 'Isha';
    nextPrayerMinutes = iM;
    nextPrayerTime = formatTime(ishaHours);
  } else if (currentMinutes >= iM) {
    currentPrayer = 'Isha';
    nextPrayer = 'Fajr';
    nextPrayerMinutes = fM + 24 * 60; // next day
    nextPrayerTime = formatTime(fajrHours);
  }

  let diff = nextPrayerMinutes - currentMinutes;
  if (diff < 0) diff += 24 * 60;

  return {
    fajr: formatTime(fajrHours),
    sunrise: formatTime(sunriseHours),
    dhuhr: formatTime(localSolarNoon),
    asr: formatTime(asrHours),
    maghrib: formatTime(sunsetHours),
    isha: formatTime(ishaHours),
    tahajjudEnd: formatTime(fajrHours),
    qiblaBearing: calculateQiblaBearing(city.lat, city.lng),
    currentPrayer,
    nextPrayer,
    nextPrayerTime,
    minutesUntilNext: diff,
    cityName: city.name
  };
}
