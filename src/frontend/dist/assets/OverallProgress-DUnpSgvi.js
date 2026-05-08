import { u as useSessionStore, j as jsxRuntimeExports } from "./index-oDdfbtqD.js";
import { b as useStudent } from "./useBackend-D_fritFS.js";
import { u as useProgressStore } from "./progressStore-TQYp-Hsw.js";
function OverallProgress() {
  var _a;
  const { userId } = useSessionStore();
  const { data: student, isLoading } = useStudent(userId);
  const { chapterProgress } = useProgressStore();
  const totalPoints = Number((student == null ? void 0 : student.points) ?? 0);
  const unlockedChars = ((_a = student == null ? void 0 : student.unlockedChars) == null ? void 0 : _a.length) ?? 0;
  const completedChapters = chapterProgress.filter((p) => p.completed).length;
  const examScores = (student == null ? void 0 : student.examScores) ?? [];
  const gameScores = (student == null ? void 0 : student.gameScores) ?? [];
  const totalQuestionsAnswered = examScores.reduce((a, s) => a + Number(s.total), 0) + gameScores.reduce((a, s) => a + Number(s.total), 0);
  const totalCorrect = examScores.reduce((a, s) => a + Number(s.score), 0) + gameScores.reduce((a, s) => a + Number(s.score), 0);
  const successRate = totalQuestionsAnswered > 0 ? Math.round(totalCorrect / totalQuestionsAnswered * 100) : 0;
  const chartData = examScores.map((s, i) => ({
    x: i + 1,
    pct: Number(s.total) > 0 ? Math.round(Number(s.score) / Number(s.total) * 100) : 0
  }));
  const chartH = 120;
  const chartW = 400;
  const padding = 24;
  const maxVal = 100;
  const n = chartData.length;
  const toSvgX = (i) => n <= 1 ? chartW / 2 : padding + i * (chartW - padding * 2) / (n - 1);
  const toSvgY = (v) => chartH - padding - v / maxVal * (chartH - padding * 2);
  const polyline = chartData.length >= 2 ? chartData.map((d, i) => `${toSvgX(i)},${toSvgY(d.pct)}`).join(" ") : "";
  const SUMMARY_CARDS = [
    {
      label: "إجمالي النقاط",
      value: totalPoints,
      icon: "⭐",
      ocid: "progress.stat.1"
    },
    {
      label: "شخصيات مفتوحة",
      value: unlockedChars,
      icon: "🦸",
      ocid: "progress.stat.2"
    },
    {
      label: "فصول مكتملة",
      value: completedChapters,
      icon: "📖",
      ocid: "progress.stat.3"
    },
    {
      label: "أسئلة حُلّت",
      value: totalQuestionsAnswered,
      icon: "❓",
      ocid: "progress.stat.4"
    },
    {
      label: "معدل النجاح",
      value: `${successRate}%`,
      icon: "🏆",
      ocid: "progress.stat.5"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", dir: "rtl", "data-ocid": "progress.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "📊 التطور العام" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-10 text-muted-foreground",
        "data-ocid": "progress.loading_state",
        children: "جاري التحميل..."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-5 gap-3",
          "data-ocid": "progress.stats",
          children: SUMMARY_CARDS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": c.ocid,
              className: "bg-card border border-border rounded-xl p-4 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl mb-1", children: c.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: c.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: c.label })
              ]
            },
            c.label
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5",
          "data-ocid": "progress.chart",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-4 text-sm", children: "منحنى تطور الاختبارات" }),
            chartData.length < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center text-muted-foreground py-8",
                "data-ocid": "progress.chart_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-1", children: "📈" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "أكملي اختبارين على الأقل لعرض المنحنى" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                role: "img",
                "aria-label": "مخطط التقدم",
                viewBox: `0 0 ${chartW} ${chartH}`,
                className: "w-full",
                style: { height: 140 },
                children: [
                  [0, 25, 50, 75, 100].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1: padding,
                        y1: toSvgY(v),
                        x2: chartW - padding,
                        y2: toSvgY(v),
                        stroke: "oklch(var(--border))",
                        strokeWidth: "0.5",
                        strokeDasharray: "4 4"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "text",
                      {
                        x: padding - 4,
                        y: toSvgY(v) + 4,
                        textAnchor: "end",
                        fontSize: "8",
                        fill: "oklch(var(--muted-foreground))",
                        children: [
                          v,
                          "%"
                        ]
                      }
                    )
                  ] }, v)),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "polyline",
                    {
                      points: polyline,
                      fill: "none",
                      stroke: "oklch(var(--primary))",
                      strokeWidth: "2",
                      strokeLinejoin: "round",
                      strokeLinecap: "round"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "polyline",
                    {
                      points: `${toSvgX(0)},${chartH - padding} ${polyline} ${toSvgX(chartData.length - 1)},${chartH - padding}`,
                      fill: "oklch(var(--primary) / 0.12)",
                      stroke: "none"
                    }
                  ),
                  chartData.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: toSvgX(i),
                      cy: toSvgY(d.pct),
                      r: "4",
                      fill: "oklch(var(--primary))",
                      "data-ocid": `progress.chart_point.${i + 1}`
                    },
                    `dot-${i}`
                  ))
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 flex items-center gap-6",
          "data-ocid": "progress.success_rate",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                viewBox: "0 0 80 80",
                role: "img",
                "aria-label": "دائرة التقدم",
                className: "w-20 h-20 shrink-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "40",
                      cy: "40",
                      r: "30",
                      fill: "none",
                      stroke: "oklch(var(--muted))",
                      strokeWidth: "10"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "40",
                      cy: "40",
                      r: "30",
                      fill: "none",
                      stroke: "oklch(var(--primary))",
                      strokeWidth: "10",
                      strokeDasharray: `${successRate / 100 * 188.5} 188.5`,
                      strokeDashoffset: "47.1",
                      strokeLinecap: "round",
                      style: {
                        transform: "rotate(-90deg)",
                        transformOrigin: "center"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "text",
                    {
                      x: "40",
                      y: "45",
                      textAnchor: "middle",
                      fontSize: "14",
                      fontWeight: "700",
                      fill: "oklch(var(--foreground))",
                      children: [
                        successRate,
                        "%"
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: "معدل النجاح العام" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                totalCorrect,
                " إجابة صحيحة من ",
                totalQuestionsAnswered,
                " سؤال"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex gap-2 flex-wrap", children: [
                { l: "ممتاز", min: 90 },
                { l: "جيد جداً", min: 75 },
                { l: "جيد", min: 60 }
              ].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-0.5 rounded-full ${successRate >= g.min ? "bg-primary/15 text-primary font-semibold" : "bg-muted text-muted-foreground"}`,
                  children: g.l
                },
                g.l
              )) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  OverallProgress as default
};
