import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useClassCompletion,
  useLeaderboard,
  useStudents,
} from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";
import { CHAPTERS } from "@/types";

export default function ClassStats() {
  const { sessionId } = useSessionStore();
  const { data: students = [], isLoading } = useStudents(sessionId);
  const { data: completion } = useClassCompletion(sessionId);
  const { data: leaderboard = [] } = useLeaderboard(sessionId);

  const classPct = completion ? Number(completion) : 0;

  // Per-chapter stats
  const chapterStats = CHAPTERS.map((ch) => {
    const scores = students
      .flatMap((s) => s.chapterProgress)
      .filter((cp) => Number(cp.chapterId) === ch.id);
    const completed = scores.filter((cp) => cp.completed).length;
    const avg =
      scores.length > 0
        ? Math.round(
            scores.reduce((sum, cp) => sum + Number(cp.score), 0) /
              scores.length,
          )
        : 0;
    return { ...ch, completed, total: students.length, avg };
  }).filter((c) => c.total > 0 && (c.completed > 0 || c.avg > 0));

  // Students below 50%
  const atRisk = students.filter((s) => {
    if (s.chapterProgress.length === 0) return false;
    const avg =
      s.chapterProgress.reduce((sum, cp) => sum + Number(cp.score), 0) /
      s.chapterProgress.length;
    return avg < 50;
  });

  // Exam avg per level
  const examLevels: Record<number, number[]> = {};
  for (const s of students) {
    for (const e of s.examScores) {
      const lv = Number(e.level);
      if (!examLevels[lv]) examLevels[lv] = [];
      examLevels[lv].push(
        e.total > 0 ? Math.round((Number(e.score) / Number(e.total)) * 100) : 0,
      );
    }
  }
  const examAvgs = Object.entries(examLevels).map(([lv, arr]) => ({
    level: Number(lv),
    avg: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length),
  }));

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="teacher.stats_section">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">{students.length}</p>
          <p className="text-xs text-muted-foreground mt-1">عدد الطالبات</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">{classPct}%</p>
          <p className="text-xs text-muted-foreground mt-1">متوسط الاستيعاب</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-destructive">{atRisk.length}</p>
          <p className="text-xs text-muted-foreground mt-1">طالبات تحت 50%</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">
            {leaderboard.length > 0 ? String(leaderboard[0].points) : "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">أعلى نقاط</p>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-36 h-36 shrink-0">
          <svg
            viewBox="0 0 36 36"
            role="img"
            aria-label="نسبة إتمام الفصل"
            className="w-36 h-36 -rotate-90"
          >
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="oklch(var(--muted))"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="oklch(var(--primary))"
              strokeWidth="3"
              strokeDasharray={`${classPct} ${100 - classPct}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-primary">{classPct}%</span>
            <span className="text-xs text-muted-foreground">إنجاز</span>
          </div>
        </div>
        <div className="flex-1 w-full">
          <h3 className="font-bold text-foreground mb-3">
            معدل استيعاب الشعبة كليًا
          </h3>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div
              className="h-4 bg-primary rounded-full transition-all duration-700"
              style={{ width: `${classPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {students.length} طالبة — يتم التحديث كل 5 ثوانٍ
          </p>
        </div>
      </div>

      {/* At-Risk Students */}
      {atRisk.length > 0 && (
        <div
          className="bg-destructive/5 border border-destructive/20 rounded-2xl p-5"
          data-ocid="teacher.at_risk_students"
        >
          <h3 className="font-bold text-destructive mb-3 flex items-center gap-2">
            ⚠️ طالبات تحتجن دعمًا (أقل من 50%)
          </h3>
          <div className="space-y-2">
            {atRisk.map((s, i) => {
              const avg = Math.round(
                s.chapterProgress.reduce(
                  (sum, cp) => sum + Number(cp.score),
                  0,
                ) / s.chapterProgress.length,
              );
              return (
                <div
                  key={s.userId}
                  data-ocid={`teacher.at_risk.${i + 1}`}
                  className="flex items-center gap-3 py-1.5 border-b border-border/50 last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-sm font-bold text-destructive shrink-0">
                    {s.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {s.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {s.className}
                    </p>
                  </div>
                  <Badge variant="destructive" className="shrink-0">
                    {avg}%
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Chapter Performance */}
      {chapterStats.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold text-foreground mb-4">📊 أداء كل فصل</h3>
          <div className="space-y-3">
            {chapterStats.map((c) => (
              <div key={c.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground line-clamp-1 flex-1 min-w-0">
                    {c.id}. {c.title}
                  </span>
                  <div className="flex items-center gap-2 shrink-0 mr-2">
                    <span className="text-xs text-muted-foreground">
                      {c.completed}/{c.total}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {c.avg}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${c.avg >= 70 ? "bg-primary" : c.avg >= 50 ? "bg-amber-400" : "bg-destructive"}`}
                    style={{ width: `${c.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exam Level Performance */}
      {examAvgs.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold text-foreground mb-4">
            📝 متوسط الاختبارات لكل مستوى
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {examAvgs.map((e) => (
              <div
                key={e.level}
                className="bg-muted/30 rounded-xl p-3 text-center"
              >
                <p className="text-lg font-bold text-primary">{e.avg}%</p>
                <p className="text-xs text-muted-foreground">مستوى {e.level}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div
        className="bg-card border border-border rounded-2xl p-5"
        data-ocid="teacher.full_leaderboard"
      >
        <h3 className="font-bold text-foreground mb-4">🏆 ترتيب كامل الشعبة</h3>
        {leaderboard.length === 0 ? (
          <p
            className="text-muted-foreground text-sm text-center py-4"
            data-ocid="teacher.leaderboard_empty_state"
          >
            لا توجد نقاط بعد
          </p>
        ) : (
          <div className="space-y-2">
            {leaderboard.map((s, i) => (
              <div
                key={s.userId}
                data-ocid={`teacher.leader.${i + 1}`}
                className="flex items-center gap-3 py-2 border-b border-border last:border-0"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    i === 0
                      ? "bg-amber-100 text-amber-700"
                      : i === 1
                        ? "bg-muted text-muted-foreground"
                        : i === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-muted/40 text-muted-foreground"
                  }`}
                >
                  {i < 3 ? ["🥇", "🥈", "🥉"][i] : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {s.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.className}</p>
                </div>
                <Badge variant="secondary" className="shrink-0 text-xs">
                  {String(s.points)} نقطة
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
