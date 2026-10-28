import React from 'react';
import { Bookmark, X, Trash2, BookOpen } from 'lucide-react';
import { getBookmarks, removeBookmark } from '../services/storage';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBookmark: (surahNumber: number, ayahNumber: number) => void;
  onBookmarkChanged: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  onSelectBookmark,
  onBookmarkChanged
}) => {
  if (!isOpen) return null;

  const bookmarks = getBookmarks();

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeBookmark(id);
    onBookmarkChanged();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#FBF8F1] h-full shadow-2xl border-l-2 border-[#C7A65B]/40 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Hinglish) */}
        <div className="p-4 sm:p-5 bg-[#174C3A] text-[#F6F1E5] flex items-center justify-between border-b border-[#C7A65B]/30">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#C7A65B]" />
            <h2 className="text-base font-bold">Saved Bookmarks ({bookmarks.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#F6F1E5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="py-24 text-center text-xs text-[#4B5B53] space-y-2">
              <Bookmark className="w-10 h-10 text-[#C7A65B] mx-auto opacity-40" />
              <p className="font-semibold text-sm text-[#174C3A]">Koyi bookmark nahi mila</p>
              <p className="max-w-xs mx-auto">
                Quran Sharif padhte waqt kisi bhi aayat ke bookmark icon par click karein taaki woh yahan hamesha save rahe.
              </p>
            </div>
          ) : (
            bookmarks.map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  onSelectBookmark(b.surahNumber, b.ayahNumber);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-white border border-[#C7A65B]/30 hover:border-[#C7A65B] hover:shadow-md transition-all cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#174C3A]/10 text-[#174C3A] flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4 text-[#C7A65B]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7A65B] block">
                      Surah {b.surahName} • Aayat {b.ayahNumber}
                    </span>
                    <p className="text-xs text-[#26342D] line-clamp-2 mt-0.5 font-quran text-right" dir="rtl">
                      {b.ayahText}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => handleRemove(b.id, e)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
                  title="Bookmark hatayein"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#C7A65B]/20 text-[11px] text-[#4B5B53] text-center">
          Bookmarks aapke device par surakshit save rehte hain.
        </div>
      </div>
    </div>
  );
};
