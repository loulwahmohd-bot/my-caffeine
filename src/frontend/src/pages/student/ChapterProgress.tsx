import { useProgressStore } from "@/store/progressStore";
import { CHAPTERS } from "@/types";

const LEVEL_LABEL: Record<number, string> = {
  0: "لم يبدأ",
  1: "ضعيف",
  2: "مقبول",
  3: "جيد",
  4: "جيد جداً",
  5: "ممتاز",
};

const scoreLevel = (score: number) => {
  if (score === 0) return 0;
  if (score < 40) return 1;
  if (score < 55) return 2;
  if (score < 70) return 3;
  if (score < 85) return 4;
  return 5;
};

const LEVEL_COLORS = [
  "bg-muted text-muted-foreground",
  "bg-destructive/10 text-destructive",
  "bg-secondary/15 text-secondary",
  "bg-primary/15 text-primary",
  "bg-primary/25 text-primary",
  "bg-secondary/30 text-secondary",
];

export default function ChapterProgress() {
  const { chapterProgress } = useProgressStore();

  const getProgress = (id: number) =>
    chapterProgress.find((p) => p.chapterId === id) ?? null;

  const completedCount = chapterProgress.filter((p) => p.completed).length;
  const avgScore =
    chapterProgress.length > 0
      ? Math.round(
          chapterProgress.reduce((a, p) => a + p.score, 0) /
            chapterProgress.length,
        )
      : 0;

  return (
    <div className="space-y-5" dir="rtl" data-ocid="chapters.page">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">📖 تقدم الفصول</h1>
        <div className="flex gap-3 text-sm">
          <span className="bg-card border border-border rounded-lg px-3 py-1">
            <span className="font-bold text-primary">{completedCount}</span>
            <span className="text-muted-foreground"> / 38 مكتملة</span>
          </span>
          <span className="bg-card border border-border rounded-lg px-3 py-1">
            <span className="font-bold text-primary">{avgScore}%</span>
            <span className="text-muted-foreground"> معدل</span>
          </span>
        </div>
      </div>

      {/* Progress bar overall */}
      <div
        className="bg-card border border-border rounded-xl p-4"
        data-ocid="chapters.overall_progress"
      >
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>التقدم العام</span>
          <span>{Math.round((completedCount / 38) * 100)}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-3 bg-primary rounded-full transition-smooth"
            style={{ width: `${Math.round((completedCount / 38) * 100)}%` }}
          />
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-card border border-border rounded-xl overflow-hidden"
        data-ocid="chapters.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground w-12">
                  #
                </th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">
                  الفصل
                </th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground w-24">
                  الدرجة
                </th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground w-28">
                  المستوى
                </th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground w-32">
                  التقدم
                </th>
              </tr>
            </thead>
            <tbody>
              {CHAPTERS.map((ch, idx) => {
                const p = getProgress(ch.id);
                const score = p?.score ?? 0;
                const level = scoreLevel(score);
                return (
                  <tr
                    key={ch.id}
                    data-ocid={`chapters.row.${idx + 1}`}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                  >
                    <td className="px-4 py-3 text-muted-foreground text-xs font-mono">
                      {ch.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {ch.title}
                    </td>
                    <td className="px-4 py-3">
                      {p ? (
                        <span className="font-bold text-primary">{score}%</span>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          LEVEL_COLORS[level]
                        }`}
                      >
                        {LEVEL_LABEL[level]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-1.5 bg-primary rounded-full"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        {p?.completed && (
                          <span className="text-secondary text-xs">✓</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
