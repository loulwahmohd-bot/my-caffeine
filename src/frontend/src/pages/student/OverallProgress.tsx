import { useStudent } from "@/hooks/useBackend";
import { useProgressStore } from "@/store/progressStore";
import { useSessionStore } from "@/store/sessionStore";

export default function OverallProgress() {
  const { userId } = useSessionStore();
  const { data: student, isLoading } = useStudent(userId);
  const { chapterProgress } = useProgressStore();

  const totalPoints = Number(student?.points ?? 0);
  const unlockedChars = student?.unlockedChars?.length ?? 0;
  const completedChapters = chapterProgress.filter((p) => p.completed).length;
  const examScores = student?.examScores ?? [];
  const gameScores = student?.gameScores ?? [];

  const totalQuestionsAnswered =
    examScores.reduce((a, s) => a + Number(s.total), 0) +
    gameScores.reduce((a, s) => a + Number(s.total), 0);

  const totalCorrect =
    examScores.reduce((a, s) => a + Number(s.score), 0) +
    gameScores.reduce((a, s) => a + Number(s.score), 0);

  const successRate =
    totalQuestionsAnswered > 0
      ? Math.round((totalCorrect / totalQuestionsAnswered) * 100)
      : 0;

  // Build a simple session-based line chart from examScores
  const chartData = examScores.map((s, i) => ({
    x: i + 1,
    pct:
      Number(s.total) > 0
        ? Math.round((Number(s.score) / Number(s.total)) * 100)
        : 0,
  }));

  const chartH = 120;
  const chartW = 400;
  const padding = 24;
  const maxVal = 100;
  const n = chartData.length;

  const toSvgX = (i: number) =>
    n <= 1 ? chartW / 2 : padding + (i * (chartW - padding * 2)) / (n - 1);
  const toSvgY = (v: number) =>
    chartH - padding - (v / maxVal) * (chartH - padding * 2);

  const polyline =
    chartData.length >= 2
      ? chartData.map((d, i) => `${toSvgX(i)},${toSvgY(d.pct)}`).join(" ")
      : "";

  const SUMMARY_CARDS = [
    {
      label: "إجمالي النقاط",
      value: totalPoints,
      icon: "⭐",
      ocid: "progress.stat.1",
    },
    {
      label: "شخصيات مفتوحة",
      value: unlockedChars,
      icon: "🦸",
      ocid: "progress.stat.2",
    },
    {
      label: "فصول مكتملة",
      value: completedChapters,
      icon: "📖",
      ocid: "progress.stat.3",
    },
    {
      label: "أسئلة حُلّت",
      value: totalQuestionsAnswered,
      icon: "❓",
      ocid: "progress.stat.4",
    },
    {
      label: "معدل النجاح",
      value: `${successRate}%`,
      icon: "🏆",
      ocid: "progress.stat.5",
    },
  ];

  return (
    <div className="space-y-5" dir="rtl" data-ocid="progress.page">
      <h1 className="text-xl font-bold text-foreground">📊 التطور العام</h1>

      {isLoading ? (
        <div
          className="text-center py-10 text-muted-foreground"
          data-ocid="progress.loading_state"
        >
          جاري التحميل...
        </div>
      ) : (
        <>
          {/* Stats grid */}
          <div
            className="grid grid-cols-2 sm:grid-cols-5 gap-3"
            data-ocid="progress.stats"
          >
            {SUMMARY_CARDS.map((c) => (
              <div
                key={c.label}
                data-ocid={c.ocid}
                className="bg-card border border-border rounded-xl p-4 text-center"
              >
                <p className="text-2xl mb-1">{c.icon}</p>
                <p className="text-xl font-bold text-foreground">{c.value}</p>
                <p className="text-xs text-muted-foreground">{c.label}</p>
              </div>
            ))}
          </div>

          {/* SVG line chart */}
          <div
            className="bg-card border border-border rounded-xl p-5"
            data-ocid="progress.chart"
          >
            <h2 className="font-semibold text-foreground mb-4 text-sm">
              منحنى تطور الاختبارات
            </h2>
            {chartData.length < 2 ? (
              <div
                className="text-center text-muted-foreground py-8"
                data-ocid="progress.chart_empty_state"
              >
                <p className="text-3xl mb-1">📈</p>
                <p className="text-sm">أكملي اختبارين على الأقل لعرض المنحنى</p>
              </div>
            ) : (
              <svg
                role="img"
                aria-label="مخطط التقدم"
                viewBox={`0 0 ${chartW} ${chartH}`}
                className="w-full"
                style={{ height: 140 }}
              >
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((v) => (
                  <g key={v}>
                    <line
                      x1={padding}
                      y1={toSvgY(v)}
                      x2={chartW - padding}
                      y2={toSvgY(v)}
                      stroke="oklch(var(--border))"
                      strokeWidth="0.5"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding - 4}
                      y={toSvgY(v) + 4}
                      textAnchor="end"
                      fontSize="8"
                      fill="oklch(var(--muted-foreground))"
                    >
                      {v}%
                    </text>
                  </g>
                ))}

                {/* Line */}
                <polyline
                  points={polyline}
                  fill="none"
                  stroke="oklch(var(--primary))"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* Fill area */}
                <polyline
                  points={`${toSvgX(0)},${chartH - padding} ${polyline} ${toSvgX(chartData.length - 1)},${chartH - padding}`}
                  fill="oklch(var(--primary) / 0.12)"
                  stroke="none"
                />

                {/* Dots */}
                {chartData.map((d, i) => (
                  <circle
                    // biome-ignore lint/suspicious/noArrayIndexKey: stable index-position data
                    key={`dot-${i}`}
                    cx={toSvgX(i)}
                    cy={toSvgY(d.pct)}
                    r="4"
                    fill="oklch(var(--primary))"
                    data-ocid={`progress.chart_point.${i + 1}`}
                  />
                ))}
              </svg>
            )}
          </div>

          {/* Success rate ring */}
          <div
            className="bg-card border border-border rounded-xl p-5 flex items-center gap-6"
            data-ocid="progress.success_rate"
          >
            {/* SVG donut */}
            <svg
              viewBox="0 0 80 80"
              role="img"
              aria-label="دائرة التقدم"
              className="w-20 h-20 shrink-0"
            >
              <circle
                cx="40"
                cy="40"
                r="30"
                fill="none"
                stroke="oklch(var(--muted))"
                strokeWidth="10"
              />
              <circle
                cx="40"
                cy="40"
                r="30"
                fill="none"
                stroke="oklch(var(--primary))"
                strokeWidth="10"
                strokeDasharray={`${(successRate / 100) * 188.5} 188.5`}
                strokeDashoffset="47.1"
                strokeLinecap="round"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "center",
                }}
              />
              <text
                x="40"
                y="45"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="oklch(var(--foreground))"
              >
                {successRate}%
              </text>
            </svg>
            <div>
              <p className="font-bold text-foreground">معدل النجاح العام</p>
              <p className="text-sm text-muted-foreground mt-1">
                {totalCorrect} إجابة صحيحة من {totalQuestionsAnswered} سؤال
              </p>
              <div className="mt-2 flex gap-2 flex-wrap">
                {[
                  { l: "ممتاز", min: 90 },
                  { l: "جيد جداً", min: 75 },
                  { l: "جيد", min: 60 },
                ].map((g) => (
                  <span
                    key={g.l}
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      successRate >= g.min
                        ? "bg-primary/15 text-primary font-semibold"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {g.l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
