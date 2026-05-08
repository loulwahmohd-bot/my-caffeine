import { b as create, p as persist } from "./index-oDdfbtqD.js";
const useProgressStore = create()(
  persist(
    (set) => ({
      chapterProgress: [],
      currentChapter: 1,
      setChapterProgress: (chapterId, score) => set((s) => {
        const existing = s.chapterProgress.find(
          (p) => p.chapterId === chapterId
        );
        if (existing) {
          return {
            chapterProgress: s.chapterProgress.map(
              (p) => p.chapterId === chapterId ? { ...p, score: Math.max(p.score, score), completed: true } : p
            )
          };
        }
        return {
          chapterProgress: [
            ...s.chapterProgress,
            { chapterId, score, completed: true }
          ]
        };
      }),
      setCurrentChapter: (id) => set({ currentChapter: id })
    }),
    { name: "ostrich-progress" }
  )
);
export {
  useProgressStore as u
};
