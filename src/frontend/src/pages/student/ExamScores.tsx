import { useStudent } from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";

const LEVEL_NAMES: Record<number, string> = {
  1: "المستوى الأول",
  2: "المستوى الثاني",
  3: "المستوى الثالث",
  4: "المستوى الرابع",
  5: "المستوى الخامس",
};

export default function ExamScores() {
  const { userId } = useSessionStore();
  const { data: student, isLoading } = useStudent(userId);

  const scores = student?.examScores ?? [];

  // Aggregate best per level for chart
  const levelBest: Record<number, number> = {};
  for (const s of scores) {
    const lvl = Number(s.level);
    const pct =
      Number(s.total) > 0
        ? Math.round((Number(s.score) / Number(s.total)) * 100)
        : 0;
    if (!levelBest[lvl] || pct > levelBest[lvl]) levelBest[lvl] = pct;
  }

  const chartLevels = [1, 2, 3, 4, 5];
  const maxPct = 100;

  return (
    <div className="space-y-5" dir="rtl" data-ocid="exams.page">
      <h1 className="text-xl font-bold text-foreground">📝 درجات الاختبارات</h1>

      {/* Bar chart */}
      <div
        className="bg-card border border-border rounded-xl p-5"
        data-ocid="exams.chart"
      >
        <h2 className="font-semibold text-foreground mb-4 text-sm">
          أفضل درجة لكل مستوى
        </h2>
        <div className="flex items-end gap-3 h-36">
          {chartLevels.map((lvl) => {
            const pct = levelBest[lvl] ?? 0;
            const barH =
              pct === 0 ? 4 : Math.max(8, Math.round((pct / maxPct) * 128));
            return (
              <div
                key={lvl}
                className="flex-1 flex flex-col items-center gap-1"
                data-ocid={`exams.chart_bar.${lvl}`}
              >
                <span className="text-xs font-bold text-primary">
                  {pct > 0 ? `${pct}%` : ""}
                </span>
                <div
                  className="w-full rounded-t-lg bg-primary/70 transition-smooth"
                  style={{ height: `${barH}px` }}
                />
                <span className="text-xs text-muted-foreground">م{lvl}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scores list */}
      {isLoading ? (
        <div
          className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground"
          data-ocid="exams.loading_state"
        >
          جاري التحميل...
        </div>
      ) : scores.length === 0 ? (
        <div
          className="bg-card border border-border rounded-xl p-8 text-center"
          data-ocid="exams.empty_state"
        >
          <p className="text-4xl mb-2">📝</p>
          <p className="text-muted-foreground">لم تجري أي اختبار بعد</p>
        </div>
      ) : (
        <div
          className="bg-card border border-border rounded-xl overflow-hidden"
          data-ocid="exams.list"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-right px-4 py-3 font-semibold text-muted-foreground">
                    #
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-muted-foreground">
                    المستوى
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-muted-foreground">
                    الدرجة
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-muted-foreground">
                    المجموع
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-muted-foreground">
                    النسبة
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-muted-foreground w-24">
                    التقييم
                  </th>
                </tr>
              </thead>
              <tbody>
                {scores.map((s, i) => {
                  const pct =
                    Number(s.total) > 0
                      ? Math.round((Number(s.score) / Number(s.total)) * 100)
                      : 0;
                  const grade =
                    pct >= 90
                      ? "ممتاز"
                      : pct >= 75
                        ? "جيد جداً"
                        : pct >= 60
                          ? "جيد"
                          : pct >= 50
                            ? "مقبول"
                            : "ضعيف";
                  const gradeColor =
                    pct >= 90
                      ? "text-secondary"
                      : pct >= 75
                        ? "text-primary"
                        : pct >= 60
                          ? "text-primary/80"
                          : pct >= 50
                            ? "text-muted-foreground"
                            : "text-destructive";
                  return (
                    <tr
                      key={`exam-${i}-${String(s.level)}`}
                      data-ocid={`exams.row.${i + 1}`}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                    >
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {LEVEL_NAMES[Number(s.level)] ?? `مستوى ${s.level}`}
                      </td>
                      <td className="px-4 py-3 font-bold text-foreground">
                        {String(s.score)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {String(s.total)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-1.5 bg-primary rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-primary">
                            {pct}%
                          </span>
                        </div>
                      </td>
                      <td
                        className={`px-4 py-3 text-xs font-semibold ${gradeColor}`}
                      >
                        {grade}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
