import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChapterLocalProgress {
  chapterId: number;
  completed: boolean;
  score: number;
}

interface ProgressStore {
  chapterProgress: ChapterLocalProgress[];
  currentChapter: number;
  setChapterProgress: (chapterId: number, score: number) => void;
  setCurrentChapter: (id: number) => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      chapterProgress: [],
      currentChapter: 1,
      setChapterProgress: (chapterId, score) =>
        set((s) => {
          const existing = s.chapterProgress.find(
            (p) => p.chapterId === chapterId,
          );
          if (existing) {
            return {
              chapterProgress: s.chapterProgress.map((p) =>
                p.chapterId === chapterId
                  ? { ...p, score: Math.max(p.score, score), completed: true }
                  : p,
              ),
            };
          }
          return {
            chapterProgress: [
              ...s.chapterProgress,
              { chapterId, score, completed: true },
            ],
          };
        }),
      setCurrentChapter: (id) => set({ currentChapter: id }),
    }),
    { name: "ostrich-progress" },
  ),
);
