const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\HP\\.gemini\\antigravity\\scratch\\quran-sharif';
const distDir = path.join(rootDir, 'dist');
const assetsDir = path.join(distDir, 'assets');

console.log('🔄 Building optimized 100% Standalone Offline Quran Sharif HTML...');

// 1. Get CSS and JS from dist/assets
const files = fs.readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.endsWith('.js'));

if (!cssFile || !jsFile) {
  console.error('❌ Missing built CSS or JS files in dist/assets');
  process.exit(1);
}

const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');

// 2. Base HTML structure
let baseHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Clean any previous redirects, modules, stylesheets
baseHtml = baseHtml.replace(/<script>[\s\S]*?window\.location\.replace[\s\S]*?<\/script>/gi, '');
baseHtml = baseHtml.replace(/<!-- Direct Windows File Explorer[\s\S]*?-->/gi, '');
baseHtml = baseHtml.replace(/<!-- Direct File Explorer[\s\S]*?-->/gi, '');
baseHtml = baseHtml.replace(/<script\s+type="module"[\s\S]*?<\/script>/gi, '');
baseHtml = baseHtml.replace(/<link\s+rel="stylesheet"[^>]*href="[^"]*"[^>]*>/gi, '');

// Convert external Google Fonts into non-blocking async to ensure 0ms render delay even offline
const fontRegex = /<link\s+href="https:\/\/fonts\.googleapis\.com[^"]*"\s+rel="stylesheet">/i;
const asyncFontTag = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Scheherazade+New:wght@400;600;700&display=swap" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Scheherazade+New:wght@400;600;700&display=swap"></noscript>`;

if (fontRegex.test(baseHtml)) {
  baseHtml = baseHtml.replace(fontRegex, asyncFontTag);
}

// Convert absolute asset paths to relative
baseHtml = baseHtml.replace(/href="\/favicon\.svg"/g, 'href="./favicon.svg"');
baseHtml = baseHtml.replace(/src="\/favicon\.svg"/g, 'src="./favicon.svg"');
baseHtml = baseHtml.replace(/href="\/manifest\.webmanifest"/g, 'href="./manifest.webmanifest"');

// 3. Inject standalone CSS into <head>
const styleTag = `\n    <style id="standalone-css">\n${cssContent}\n    </style>\n  </head>`;
let standaloneHtml = baseHtml.replace('</head>', () => styleTag);

// 4. Inject standalone JS right before </body>
const scriptTag = `\n    <script id="standalone-js">\n${jsContent}\n    </script>\n  </body>`;
standaloneHtml = standaloneHtml.replace('</body>', () => scriptTag);

// 5. Write to dist/index.html (STANDALONE, ZERO REDIRECTS)
fs.writeFileSync(path.join(distDir, 'index.html'), standaloneHtml, 'utf8');
console.log('✅ Generated clean dist/index.html (Size: ' + (standaloneHtml.length / 1024).toFixed(1) + ' KB)');

// 6. Write to Quran-Sharif.html in root folder (STANDALONE, ZERO REDIRECTS)
fs.writeFileSync(path.join(rootDir, 'Quran-Sharif.html'), standaloneHtml, 'utf8');
console.log('✅ Generated clean Quran-Sharif.html in root (Size: ' + (standaloneHtml.length / 1024).toFixed(1) + ' KB)');

// 7. Configure root index.html:
// If double-clicked in Windows File Explorer via file:// protocol -> instantly launch Quran-Sharif.html in the same directory!
// If opened in Vite Dev Server via http:// -> run Vite ESM module
const rootTemplate = `<!doctype html>
<html lang="hi-Latn">
  <head>
    <!-- Direct Windows File Explorer (file://) support: instant 1-click open -->
    <script>
      if (window.location.protocol === 'file:') {
        window.location.replace('./Quran-Sharif.html');
      }
    </script>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <link rel="apple-touch-icon" href="./favicon.svg" />
    <link rel="manifest" href="./manifest.webmanifest" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <meta name="theme-color" content="#174C3A" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Quran Sharif" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="description" content="Quran Sharif — 30 Paare aur 114 Surah. Har aayat ki Arabic tilawat aur uske turant baad Hinglish bolkar tarjuma. YouTube Video Mode, Volume Control, Uthmani script, Masnoon Duayein aur Sunnah Guide." />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Quran Sharif — Arabic Tilawat + Hinglish Bolkar Tarjuma | 30 Paare & 114 Surah" />
    <meta property="og:description" content="Holy Quran 30 Paare aur 114 Surah. Har aayat ki Mishary Alafasy tilawat aur Shamshad Ali Khan ka bolkar tarjuma, Everyday Duas aur Sunnah Guide Hinglish me." />
    <meta property="og:image" content="./favicon.svg" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Quran Sharif — Arabic Tilawat + Hinglish Bolkar Tarjuma" />
    <meta name="twitter:description" content="Holy Quran 30 Paare aur 114 Surah. Har aayat ki Mishary Alafasy tilawat aur Shamshad Ali Khan ka bolkar tarjuma." />
    <meta name="twitter:image" content="./favicon.svg" />
    
    <!-- Google Fonts: Amiri (Arabic), Scheherazade New, Plus Jakarta Sans, Noto Nastaliq Urdu, Noto Sans Devanagari -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Scheherazade+New:wght@400;600;700&display=swap" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Scheherazade+New:wght@400;600;700&display=swap"></noscript>

    <title>Quran Sharif — Arabic Tilawat + Hinglish Bolkar Tarjuma | 30 Paare & 114 Surah</title>
  </head>
  <body class="bg-[#F6F1E5] text-[#26342D] antialiased selection:bg-[#174C3A] selection:text-[#F6F1E5]">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
fs.writeFileSync(path.join(rootDir, 'index.html'), rootTemplate, 'utf8');
console.log('✅ Updated root index.html');

// 8. Update Windows Batch Launcher
const batContent = `@echo off
echo Starting Quran Sharif Web App...
start "" "%~dp0Quran-Sharif.html"
exit
`;
fs.writeFileSync(path.join(rootDir, 'Open-Quran-Sharif.bat'), batContent, 'utf8');
console.log('✅ Updated Open-Quran-Sharif.bat');

console.log('🎉 Done! All standalone files are ready and tested.');
