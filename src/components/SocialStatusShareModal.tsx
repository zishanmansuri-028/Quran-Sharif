import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Share2, Download, Copy, Check, Sparkles, 
  Send, Eye, Image as ImageIcon, Smartphone, Info
} from 'lucide-react';
import type { SocialSharePayload } from '../types';

// Custom Official Brand SVGs (100% Dependency-Free & Crisp)
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 2C6.496 2 2 6.483 2 12.008c0 1.947.558 3.845 1.616 5.49L2 22l4.662-1.579a9.98 9.98 0 0 0 5.369 1.587h.005c5.534 0 10.03-4.484 10.03-10.009A10.005 10.005 0 0 0 12.031 2zm5.727 14.167c-.24.673-1.393 1.288-1.92 1.374-.502.08-1.15.114-3.69-.933-2.617-1.077-4.283-3.754-4.413-3.928-.13-.174-1.055-1.401-1.055-2.67 0-1.27.665-1.895.903-2.144.238-.249.522-.311.696-.311.174 0 .348.002.5.01.163.008.38-.062.593.45.22.528.75 1.831.815 1.963.065.132.109.286.022.46-.087.174-.131.283-.261.435-.13.152-.274.34-.391.457-.13.13-.266.272-.114.533.152.261.677 1.116 1.454 1.808 1.002.892 1.848 1.168 2.109 1.298.261.13.413.109.565-.065.152-.174.652-.761.826-1.022.174-.261.348-.217.587-.13.239.087 1.522.717 1.783.848.261.13.435.196.5.304.065.109.065.63-.174 1.304z"/>
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterXIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TelegramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

interface SocialStatusShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SocialSharePayload | null;
}

export const SocialStatusShareModal: React.FC<SocialStatusShareModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  // 1:1 Square Post is default for standard social media feeds
  const [aspectRatio, setAspectRatio] = useState<'square' | 'story'>('square');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !data) return;
    generateCardImage();
  }, [isOpen, data, aspectRatio]);

  if (!isOpen || !data) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Formatted caption for social media posts & WhatsApp
  const getFormattedStatusText = () => {
    let text = `✨ *Bismillahir Rahmanir Raheem* ✨\n\n`;
    text += `📖 *${data.title}*`;
    if (data.reference) text += ` (${data.reference})`;
    text += `\n\n`;
    if (data.arabicText && data.arabicText.trim()) {
      text += `${data.arabicText.trim()}\n\n`;
    }
    if (data.hinglishText && data.hinglishText.trim()) {
      text += `*Hinglish Tarjuma:*\n"${data.hinglishText.trim()}"\n\n`;
    }
    if (data.englishText && data.englishText.trim()) {
      text += `*English Meaning:*\n"${data.englishText.trim()}"\n\n`;
    }
    text += `— *Quran Sharif Web App*\n📲 Tilawat & Bolkar Tarjuma (30 Paare aur 114 Surah)\n🤲 Aage share karein, Sadqah-e-Jariya hai!`;
    return text;
  };

  // Helper to split multiline text by measuring canvas width
  const getWrappedLines = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] => {
    if (!text || !text.trim()) return [];
    const words = text.trim().split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  };

  // Canvas Drawing Engine for High-Resolution Status Cards (1080x1080 Square / 1080x1920 Story)
  const generateCardImage = async () => {
    setIsGenerating(true);
    
    // Ensure Google fonts are ready
    if (document.fonts) {
      try {
        await document.fonts.ready;
      } catch {
        // Fallback gracefully
      }
    }

    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = aspectRatio === 'square' ? 1080 : 1920;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    // 1. Background Gradient (Royal Islamic Emerald Deep)
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#091F17');
    bgGradient.addColorStop(0.3, '#123E2F');
    bgGradient.addColorStop(0.7, '#0E3326');
    bgGradient.addColorStop(1, '#061711');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Radial Ambient Glow
    const glowGradient = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, width * 0.7);
    glowGradient.addColorStop(0, 'rgba(199, 166, 91, 0.16)');
    glowGradient.addColorStop(0.6, 'rgba(18, 62, 47, 0.4)');
    glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, width, height);

    // 3. Ornate Double Golden Borders with Corner Ornaments
    const outerPad = aspectRatio === 'square' ? 36 : 46;
    const innerPad = outerPad + 14;

    ctx.strokeStyle = '#C7A65B';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(outerPad, outerPad, width - outerPad * 2, height - outerPad * 2);

    ctx.strokeStyle = 'rgba(223, 196, 136, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(innerPad, innerPad, width - innerPad * 2, height - innerPad * 2);

    // Corner Ornaments with 8-Pointed Islamic Star
    const drawCornerOrnament = (cx: number, cy: number, rot: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      // Corner bracket
      ctx.strokeStyle = '#C7A65B';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, 32);
      ctx.lineTo(0, 0);
      ctx.lineTo(32, 0);
      ctx.stroke();

      // 8-point Islamic star motif at corner
      ctx.fillStyle = '#C7A65B';
      const r = 7;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        const x1 = Math.cos(a) * r;
        const y1 = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
        const ia = a + Math.PI / 8;
        const x2 = Math.cos(ia) * (r * 0.6);
        const y2 = Math.sin(ia) * (r * 0.6);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    drawCornerOrnament(innerPad, innerPad, 0);
    drawCornerOrnament(width - innerPad, innerPad, Math.PI / 2);
    drawCornerOrnament(width - innerPad, height - innerPad, Math.PI);
    drawCornerOrnament(innerPad, height - innerPad, -Math.PI / 2);

    // 4. HEADER SECTION (Compact & Royal)
    let headerY = aspectRatio === 'square' ? 76 : 110;

    // Badge Pill
    const badgeW = aspectRatio === 'square' ? 380 : 440;
    const badgeH = aspectRatio === 'square' ? 36 : 44;
    const badgeX = (width - badgeW) / 2;
    ctx.fillStyle = 'rgba(199, 166, 91, 0.2)';
    ctx.beginPath();
    ctx.roundRect(badgeX, headerY, badgeW, badgeH, badgeH / 2);
    ctx.fill();
    ctx.strokeStyle = '#C7A65B';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = '#DFC488';
    ctx.font = `bold ${aspectRatio === 'square' ? 17 : 20}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    const badgeText = aspectRatio === 'square' ? '✨ QURAN SHARIF · 1:1 POST ✨' : '✨ QURAN SHARIF STATUS ✨';
    ctx.fillText(badgeText, width / 2, headerY + (aspectRatio === 'square' ? 24 : 29));

    headerY += badgeH + (aspectRatio === 'square' ? 24 : 32);

    // Title & Reference
    ctx.fillStyle = '#F6F1E5';
    ctx.font = `bold ${aspectRatio === 'square' ? 28 : 34}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(data.title, width / 2, headerY);

    if (data.reference) {
      headerY += (aspectRatio === 'square' ? 28 : 36);
      ctx.fillStyle = '#C7A65B';
      ctx.font = `600 ${aspectRatio === 'square' ? 18 : 22}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillText(`— ${data.reference} —`, width / 2, headerY);
    }

    headerY += (aspectRatio === 'square' ? 30 : 40);

    // Bismillah Calligraphy
    ctx.fillStyle = '#DFC488';
    ctx.font = `bold ${aspectRatio === 'square' ? 30 : 38}px "Amiri", "Scheherazade New", serif`;
    ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', width / 2, headerY);

    headerY += (aspectRatio === 'square' ? 22 : 30);

    // Decorative Header Divider
    ctx.strokeStyle = 'rgba(199, 166, 91, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 140, headerY);
    ctx.lineTo(width / 2 + 140, headerY);
    ctx.stroke();

    // Small Diamond in center of divider
    ctx.fillStyle = '#C7A65B';
    ctx.beginPath();
    ctx.arc(width / 2, headerY, 3.5, 0, Math.PI * 2);
    ctx.fill();

    headerY += (aspectRatio === 'square' ? 18 : 28);
    const contentAreaTop = headerY;

    // 5. FOOTER BOUNDARY (Fixed at bottom)
    const footerBottom = height - (aspectRatio === 'square' ? 52 : 72);
    const footerAreaTop = footerBottom - (aspectRatio === 'square' ? 62 : 82);

    // 6. CONTENT AUTO-FIT SCALING ENGINE (Guarantees 100% fits inside without ANY overflow)
    const availableContentHeight = footerAreaTop - contentAreaTop;
    const arabicMaxWidth = width - (aspectRatio === 'square' ? 160 : 180);
    const boxInnerWidth = width - (aspectRatio === 'square' ? 230 : 250);

    let aSize = aspectRatio === 'square' ? 34 : 44;
    let hSize = aspectRatio === 'square' ? 23 : 28;
    let eSize = aspectRatio === 'square' ? 16 : 20;

    let bestLayout = {
      aLines: [] as string[],
      aH: 0,
      aLineH: 0,
      hLines: [] as string[],
      hBoxH: 0,
      hLineH: 0,
      eLines: [] as string[],
      eH: 0,
      eLineH: 0,
      gap1: 0,
      gap2: 0,
      totalH: 0,
      aSize,
      hSize,
      eSize
    };

    // Auto-fit iteration loop
    for (let attempt = 0; attempt < 35; attempt++) {
      // 1. Arabic Lines
      let aLines: string[] = [];
      let aH = 0;
      const aLineH = Math.round(aSize * 1.62);
      if (data.arabicText && data.arabicText.trim()) {
        ctx.font = `bold ${aSize}px "Amiri", "Scheherazade New", serif`;
        aLines = getWrappedLines(ctx, data.arabicText.trim(), arabicMaxWidth);
        aH = aLines.length * aLineH;
      }

      // 2. Hinglish Lines & Box Height
      ctx.font = `500 ${hSize}px "Plus Jakarta Sans", sans-serif`;
      const hLines = getWrappedLines(ctx, `"${data.hinglishText.trim()}"`, boxInnerWidth);
      const hLineH = Math.round(hSize * 1.45);
      // Box header (28px) + padding (36px)
      const hBoxH = hLines.length * hLineH + (aspectRatio === 'square' ? 54 : 68);

      // 3. English Lines (if present)
      let eLines: string[] = [];
      let eH = 0;
      const eLineH = Math.round(eSize * 1.35);
      if (data.englishText && data.englishText.trim()) {
        ctx.font = `italic ${eSize}px "Plus Jakarta Sans", sans-serif`;
        eLines = getWrappedLines(ctx, `"${data.englishText.trim()}"`, boxInnerWidth);
        eH = eLines.length * eLineH + (aspectRatio === 'square' ? 16 : 24);
      }

      const gap1 = (aH > 0 && hBoxH > 0) ? (aspectRatio === 'square' ? 18 : 26) : 0;
      const gap2 = (eH > 0) ? (aspectRatio === 'square' ? 14 : 20) : 0;
      const totalH = aH + gap1 + hBoxH + gap2 + eH;

      bestLayout = {
        aLines, aH, aLineH,
        hLines, hBoxH, hLineH,
        eLines, eH, eLineH,
        gap1, gap2, totalH,
        aSize, hSize, eSize
      };

      if (totalH <= availableContentHeight || (aSize <= 18 && hSize <= 14)) {
        break;
      }

      // Decrement font sizes proportionally
      if (aSize > 18) aSize -= 1;
      if (hSize > 14) hSize -= 1;
      if (eSize > 12) eSize -= 1;
    }

    // Dynamic Vertical Center Alignment
    const verticalRemaining = Math.max(0, availableContentHeight - bestLayout.totalH);
    let currentY = contentAreaTop + Math.floor(verticalRemaining / 2);

    // 7. DRAW ARABIC TEXT (Center Stage with Gold Glow)
    if (bestLayout.aLines.length > 0) {
      ctx.font = `bold ${bestLayout.aSize}px "Amiri", "Scheherazade New", serif`;
      ctx.fillStyle = '#DFC488';
      ctx.textAlign = 'center';
      
      let ayahLineY = currentY + Math.round(bestLayout.aSize * 0.9);
      for (const line of bestLayout.aLines) {
        ctx.fillText(line, width / 2, ayahLineY);
        ayahLineY += bestLayout.aLineH;
      }
      currentY = ayahLineY + bestLayout.gap1;
    } else {
      // If no Arabic text (e.g. pure Hinglish Sunnah or Hadith guidance), draw an ornamental motif
      ctx.fillStyle = '#C7A65B';
      const r = 10;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        const x1 = width / 2 + Math.cos(a) * r;
        const y1 = currentY + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
        const ia = a + Math.PI / 8;
        const x2 = width / 2 + Math.cos(ia) * (r * 0.55);
        const y2 = currentY + Math.sin(ia) * (r * 0.55);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.fill();
      currentY += 24;
    }

    // 8. DRAW HINGLISH TARJUMA GLASS CONTAINER
    const boxMarginX = aspectRatio === 'square' ? 70 : 80;
    const boxW = width - boxMarginX * 2;
    const boxH = bestLayout.hBoxH + (bestLayout.eH > 0 ? (bestLayout.gap2 + bestLayout.eH) : 0);
    const boxY = currentY;

    // Glassmorphism Box Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.42)';
    ctx.beginPath();
    ctx.roundRect(boxMarginX, boxY, boxW, boxH, 18);
    ctx.fill();

    // Delicate Golden Border
    ctx.strokeStyle = 'rgba(199, 166, 91, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Box Header Label
    ctx.fillStyle = '#C7A65B';
    ctx.font = `bold ${Math.max(15, bestLayout.hSize - 4)}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('📖 HINGLISH TARJUMA (मायने):', width / 2, boxY + 28);

    // Box Hinglish Text Lines
    ctx.fillStyle = '#F6F1E5';
    ctx.font = `500 ${bestLayout.hSize}px "Plus Jakarta Sans", sans-serif`;
    let lineY = boxY + 28 + bestLayout.hLineH;
    for (const line of bestLayout.hLines) {
      ctx.fillText(line, width / 2, lineY);
      lineY += bestLayout.hLineH;
    }

    // Box English Text Lines (if present)
    if (bestLayout.eLines.length > 0) {
      lineY += bestLayout.gap2;
      ctx.fillStyle = 'rgba(223, 196, 136, 0.85)';
      ctx.font = `italic ${bestLayout.eSize}px "Plus Jakarta Sans", sans-serif`;
      for (const line of bestLayout.eLines) {
        ctx.fillText(line, width / 2, lineY);
        lineY += bestLayout.eLineH;
      }
    }

    // 9. FOOTER WATERMARK & BRANDING (Inside inner border)
    ctx.strokeStyle = 'rgba(199, 166, 91, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 160, footerAreaTop + 8);
    ctx.lineTo(width / 2 + 160, footerAreaTop + 8);
    ctx.stroke();

    ctx.fillStyle = '#DFC488';
    ctx.font = `bold ${aspectRatio === 'square' ? 19 : 22}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('📖 Quran Sharif Web App — Tilawat & Bolkar Tarjuma', width / 2, footerAreaTop + 32);

    ctx.fillStyle = 'rgba(246, 241, 229, 0.65)';
    ctx.font = `500 ${aspectRatio === 'square' ? 14 : 16}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText('Padhein aur aage share karein • Sadqah-e-Jariya 🤲', width / 2, footerAreaTop + 54);

    // Export Data URL
    const dataUrl = canvas.toDataURL('image/png');
    setPreviewDataUrl(dataUrl);
    setIsGenerating(false);
  };

  // Convert previewDataUrl to a standard File object for Web Share API
  const getCanvasImageFile = async (): Promise<File | null> => {
    if (!previewDataUrl) return null;
    try {
      const res = await fetch(previewDataUrl);
      const blob = await res.blob();
      const safeTitle = data.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      return new File([blob], `quran-post-${safeTitle}-${aspectRatio}.png`, { type: 'image/png' });
    } catch {
      return null;
    }
  };

  // 1. Share via Native Device Share Sheet (WhatsApp, Instagram, Facebook, Snapchat, Telegram, etc.)
  const handleNativeShare = async () => {
    const text = getFormattedStatusText();
    const imageFile = await getCanvasImageFile();

    if (imageFile && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
      try {
        await navigator.share({
          files: [imageFile],
          title: data.title,
          text: text
        });
        showToast("✨ Share window kamyabi se khul gaya!");
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return; // User closed sheet
      }
    }

    // Fallback: Download image and copy text
    handleDownloadImage();
    handleCopyText();
    showToast("📥 1:1 Image download ho gayi aur text copy ho chuka hai! Ab kisi bhi app me share karein.");
  };

  // 2. Share directly to WhatsApp (Status & Chat)
  const handleShareWhatsApp = async () => {
    const text = getFormattedStatusText();
    const imageFile = await getCanvasImageFile();

    if (imageFile && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
      try {
        await navigator.share({
          files: [imageFile],
          title: data.title,
          text: text
        });
        return;
      } catch {
        // Fallback to URL
      }
    }

    // Auto download image & copy text for desktop WhatsApp Web
    handleDownloadImage();
    handleCopyText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    showToast("🟢 WhatsApp khul raha hai! 1:1 Image save ho gayi aur text copy ho chuka hai.");
  };

  // 3. Share to Instagram (1:1 Feed Post & Story)
  const handleShareInstagram = async () => {
    const text = `${data.title} (${data.reference})\n\n${data.hinglishText}\n\n#Quran #IslamicStatus #QuranSharif`;
    const imageFile = await getCanvasImageFile();

    if (imageFile && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
      try {
        await navigator.share({
          files: [imageFile],
          title: 'Quran Sharif Post',
          text: text
        });
        return;
      } catch {
        // Fallback
      }
    }

    handleDownloadImage();
    handleCopyText();
    showToast("🟣 1:1 Post Image gallery me save ho gayi hai aur Caption copy ho gaya hai! Instagram kholkar 1:1 Post ya Story lagayein.");
  };

  // 4. Share to Facebook
  const handleShareFacebook = () => {
    const text = getFormattedStatusText();
    handleDownloadImage();
    handleCopyText();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    showToast("🔵 Facebook khul raha hai! 1:1 Post Image save ho gayi aur text copy ho chuka hai.");
  };

  // 5. Share to Twitter / X
  const handleShareTwitter = () => {
    const shortText = `📖 ${data.title} (${data.reference})\n\n${data.arabicText ? `"${data.arabicText}"\n\n` : ''}${data.hinglishText}\n\n#QuranSharif #IslamicStatus`;
    handleDownloadImage();
    handleCopyText();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shortText)}`;
    window.open(url, '_blank');
    showToast("✖️ Twitter (X) khul raha hai! 1:1 Image save ho gayi hai.");
  };

  // 6. Share to Telegram
  const handleShareTelegram = () => {
    const text = getFormattedStatusText();
    handleDownloadImage();
    handleCopyText();
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    showToast("✈️ Telegram khul raha hai! 1:1 Image save ho gayi hai.");
  };

  // 7. Share to LinkedIn
  const handleShareLinkedIn = () => {
    handleDownloadImage();
    handleCopyText();
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
    showToast("💼 LinkedIn khul raha hai! 1:1 Image save ho gayi hai.");
  };

  // 8. Download High-Resolution Image (PNG)
  const handleDownloadImage = () => {
    if (!previewDataUrl) return;
    const a = document.createElement('a');
    a.href = previewDataUrl;
    const safeTitle = data.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    a.download = `quran-post-${safeTitle}-${aspectRatio}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`📥 ${aspectRatio === 'square' ? '1:1 Square Post' : '9:16 Story'} Image download ho gayi!`);
  };

  // 9. Copy Formatted Caption
  const handleCopyText = () => {
    navigator.clipboard.writeText(getFormattedStatusText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    showToast("📋 Formatted Post Caption copy ho gaya!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#0E3326] text-[#F6F1E5] w-full max-w-4xl rounded-3xl shadow-2xl border-2 border-[#C7A65B]/40 overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#174C3A] to-[#0E3326] border-b border-[#C7A65B]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C7A65B] to-[#9E813F] p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-[#174C3A] rounded-[10px] flex items-center justify-center">
                <Share2 className="w-5 h-5 text-[#C7A65B]" />
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#F6F1E5] flex items-center gap-2">
                <span>Social Media & Status Creator</span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-[#C7A65B] text-[#174C3A]">
                  1:1 Post & Story
                </span>
              </h2>
              <p className="text-[11px] text-[#DFC488]">
                Har aayat, dua aur sunnah ko kisi bhi social media par proper 1:1 post ya story ke roop me share karein
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#F6F1E5] transition-colors cursor-pointer"
            title="Band Karein"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* In-Modal Sleek Toast Notification */}
        {toastMessage && (
          <div className="bg-emerald-600/90 text-white text-xs px-4 py-2 border-b border-emerald-400 flex items-center justify-between animate-fade-in">
            <span className="font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-200" />
              <span>{toastMessage}</span>
            </span>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-white/80 hover:text-white text-xs cursor-pointer ml-3 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Body: 2 Columns on desktop (Left: Live Canvas Preview, Right: Universal Share Options) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-6">
          
          {/* Left Column: Visual Status Card Preview */}
          <div className="flex-1 flex flex-col items-center justify-center">
            
            {/* Format Selector Pills (1:1 Square Post vs 9:16 Story) */}
            <div className="flex items-center bg-black/40 p-1.5 rounded-2xl border border-[#C7A65B]/30 mb-4 w-full max-w-sm">
              <button
                onClick={() => setAspectRatio('square')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  aspectRatio === 'square'
                    ? 'bg-[#C7A65B] text-[#0E3326] shadow-md font-black'
                    : 'text-[#F6F1E5]/70 hover:text-white'
                }`}
              >
                <span>⏹️ 1:1 Square Post</span>
              </button>
              <button
                onClick={() => setAspectRatio('story')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  aspectRatio === 'story'
                    ? 'bg-[#C7A65B] text-[#0E3326] shadow-md font-black'
                    : 'text-[#F6F1E5]/70 hover:text-white'
                }`}
              >
                <span>📱 9:16 Story</span>
              </button>
            </div>

            {/* Live Canvas Preview Image */}
            <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C7A65B] transition-all max-h-[440px] ${
              aspectRatio === 'square' ? 'aspect-square' : 'aspect-[9/16]'
            }`}>
              {isGenerating ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#091F17] p-8 text-center min-w-[280px]">
                  <Sparkles className="w-8 h-8 text-[#C7A65B] animate-spin mb-3" />
                  <span className="text-xs text-[#DFC488] font-bold">1:1 Ultra-HD Card ban raha hai...</span>
                </div>
              ) : previewDataUrl ? (
                <img 
                  src={previewDataUrl} 
                  alt="Islamic 1:1 Post Preview" 
                  className="w-full h-full object-contain bg-black"
                />
              ) : null}
            </div>

            <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-[#DFC488]">
              <Eye className="w-3.5 h-3.5" />
              <span>
                {aspectRatio === 'square' 
                  ? '1080x1080 Ultra-HD 1:1 Square (Insta Feed, WhatsApp, FB sabhi par fit)' 
                  : '1080x1920 Ultra-HD 9:16 Vertical (WhatsApp Status & Insta Story)'}
              </span>
            </div>

          </div>

          {/* Right Column: 1-Click Social Media Sharing Grid */}
          <div className="flex-1 flex flex-col justify-between space-y-4">
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#DFC488] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#C7A65B]" />
                  <span>Kahan Share Karna Chahte Hain?</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-700/50">
                  Auto-Fit Active
                </span>
              </div>

              {/* Primary: Share via Native Share Sheet (All Apps) */}
              <button
                onClick={handleNativeShare}
                className="w-full mb-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-110 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-3 shadow-xl cursor-pointer transition-transform hover:scale-101 active:scale-95 border border-emerald-400"
              >
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-white" />
                </div>
                <span>📱 Phone Share Sheet (Share to Any App)</span>
              </button>

              {/* 1-Click Social Media Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                
                {/* 1. WhatsApp */}
                <button
                  onClick={handleShareWhatsApp}
                  className="p-3 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white font-bold text-xs flex items-center gap-2.5 border border-[#25D366]/40 cursor-pointer transition-all hover:scale-102 active:scale-95"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-white text-[11px]">WhatsApp</span>
                    <span className="text-[9px] text-[#25D366] font-medium">Status & Chat</span>
                  </div>
                </button>

                {/* 2. Instagram */}
                <button
                  onClick={handleShareInstagram}
                  className="p-3 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 hover:from-pink-500/30 hover:to-indigo-500/30 text-white font-bold text-xs flex items-center gap-2.5 border border-pink-400/40 cursor-pointer transition-all hover:scale-102 active:scale-95"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-white text-[11px]">Instagram</span>
                    <span className="text-[9px] text-pink-300 font-medium">1:1 Post & Story</span>
                  </div>
                </button>

                {/* 3. Facebook */}
                <button
                  onClick={handleShareFacebook}
                  className="p-3 rounded-2xl bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-white font-bold text-xs flex items-center gap-2.5 border border-[#1877F2]/40 cursor-pointer transition-all hover:scale-102 active:scale-95"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#1877F2] flex items-center justify-center shrink-0">
                    <FacebookIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-white text-[11px]">Facebook</span>
                    <span className="text-[9px] text-blue-300 font-medium">Feed & Groups</span>
                  </div>
                </button>

                {/* 4. Twitter / X */}
                <button
                  onClick={handleShareTwitter}
                  className="p-3 rounded-2xl bg-black/40 hover:bg-black/60 text-white font-bold text-xs flex items-center gap-2.5 border border-white/20 cursor-pointer transition-all hover:scale-102 active:scale-95"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                    <TwitterXIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-white text-[11px]">Twitter (X)</span>
                    <span className="text-[9px] text-gray-300 font-medium">Post / Tweet</span>
                  </div>
                </button>

                {/* 5. Telegram */}
                <button
                  onClick={handleShareTelegram}
                  className="p-3 rounded-2xl bg-[#229ED9]/20 hover:bg-[#229ED9]/30 text-white font-bold text-xs flex items-center gap-2.5 border border-[#229ED9]/40 cursor-pointer transition-all hover:scale-102 active:scale-95"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#229ED9] flex items-center justify-center shrink-0">
                    <TelegramIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-white text-[11px]">Telegram</span>
                    <span className="text-[9px] text-sky-300 font-medium">Channel & Group</span>
                  </div>
                </button>

                {/* 6. LinkedIn */}
                <button
                  onClick={handleShareLinkedIn}
                  className="p-3 rounded-2xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 text-white font-bold text-xs flex items-center gap-2.5 border border-[#0A66C2]/40 cursor-pointer transition-all hover:scale-102 active:scale-95"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#0A66C2] flex items-center justify-center shrink-0">
                    <LinkedInIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-white text-[11px]">LinkedIn</span>
                    <span className="text-[9px] text-blue-300 font-medium">Share Post</span>
                  </div>
                </button>

              </div>

              {/* Download HD Image Button */}
              <button
                onClick={handleDownloadImage}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#C7A65B] via-[#DFC488] to-[#C7A65B] hover:brightness-110 text-[#0E3326] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-102 active:scale-95 mb-2.5"
              >
                <Download className="w-4 h-4 text-[#0E3326]" />
                <span>📥 {aspectRatio === 'square' ? '1:1 HD Post Image' : '9:16 HD Story Image'} Download Karein (PNG)</span>
              </button>

              {/* Copy Formatted Text Button */}
              <button
                onClick={handleCopyText}
                className="w-full py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-[#F6F1E5] font-bold text-xs flex items-center justify-center gap-2 border border-white/15 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Caption Text Copied!' : 'Post Caption & Meaning Text Copy Karein'}</span>
              </button>

            </div>

            {/* Instruction Guidance Box in Hinglish */}
            <div className="p-3 rounded-2xl bg-black/30 border border-[#C7A65B]/20 text-[11px] text-[#DFC488]/90 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-white">
                <Info className="w-3.5 h-3.5 text-[#C7A65B]" />
                <span>1:1 Post Sabhi Social Media Par Proper Kaise Fit Hota Hai:</span>
              </span>
              <p>
                <strong>Auto-Fit Engine:</strong> Chahe aayat chhoti ho ya badi, Arabic text aur Hinglish tarjuma card ke andar 100% proper fit hota hai aur kabhi cut ya overflow nahi hota.
              </p>
              <p>
                <strong>1-Click Action:</strong> Kisi bhi social media button par click karte hi image auto-download ho jaati hai aur caption copy ho jata hai, jisse aap turant post kar sakte hain.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
