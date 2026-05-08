import { u as useSessionStore, j as jsxRuntimeExports } from "./index-oDdfbtqD.js";
import { b as useStudent } from "./useBackend-D_fritFS.js";
const LEVEL_NAMES = {
  1: "المستوى الأول",
  2: "المستوى الثاني",
  3: "المستوى الثالث",
  4: "المستوى الرابع",
  5: "المستوى الخامس"
};
function ExamScores() {
  const { userId } = useSessionStore();
  const { data: student, isLoading } = useStudent(userId);
  const scores = (student == null ? void 0 : student.examScores) ?? [];
  const levelBest = {};
  for (const s of scores) {
    const lvl = Number(s.level);
    const pct = Number(s.total) > 0 ? Math.round(Number(s.score) / Number(s.total) * 100) : 0;
    if (!levelBest[lvl] || pct > levelBest[lvl]) levelBest[lvl] = pct;
  }
  const chartLevels = [1, 2, 3, 4, 5];
  const maxPct = 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", dir: "rtl", "data-ocid": "exams.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "📝 درجات الاختبارات" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5",
        "data-ocid": "exams.chart",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-4 text-sm", children: "أفضل درجة لكل مستوى" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3 h-36", children: chartLevels.map((lvl) => {
            const pct = levelBest[lvl] ?? 0;
            const barH = pct === 0 ? 4 : Math.max(8, Math.round(pct / maxPct * 128));
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex-1 flex flex-col items-center gap-1",
                "data-ocid": `exams.chart_bar.${lvl}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: pct > 0 ? `${pct}%` : "" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full rounded-t-lg bg-primary/70 transition-smooth",
                      style: { height: `${barH}px` }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "م",
                    lvl
                  ] })
                ]
              },
              lvl
            );
          }) })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-8 text-center text-muted-foreground",
        "data-ocid": "exams.loading_state",
        children: "جاري التحميل..."
      }
    ) : scores.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-8 text-center",
        "data-ocid": "exams.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-2", children: "📝" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "لم تجري أي اختبار بعد" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border border-border rounded-xl overflow-hidden",
        "data-ocid": "exams.list",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground", children: "المستوى" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground", children: "الدرجة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground", children: "المجموع" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground", children: "النسبة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground w-24", children: "التقييم" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: scores.map((s, i) => {
            const pct = Number(s.total) > 0 ? Math.round(Number(s.score) / Number(s.total) * 100) : 0;
            const grade = pct >= 90 ? "ممتاز" : pct >= 75 ? "جيد جداً" : pct >= 60 ? "جيد" : pct >= 50 ? "مقبول" : "ضعيف";
            const gradeColor = pct >= 90 ? "text-secondary" : pct >= 75 ? "text-primary" : pct >= 60 ? "text-primary/80" : pct >= 50 ? "text-muted-foreground" : "text-destructive";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `exams.row.${i + 1}`,
                className: "border-b border-border last:border-0 hover:bg-muted/20 transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: i + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: LEVEL_NAMES[Number(s.level)] ?? `مستوى ${s.level}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold text-foreground", children: String(s.score) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: String(s.total) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-1.5 bg-primary rounded-full",
                        style: { width: `${pct}%` }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary", children: [
                      pct,
                      "%"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: `px-4 py-3 text-xs font-semibold ${gradeColor}`,
                      children: grade
                    }
                  )
                ]
              },
              `exam-${i}-${String(s.level)}`
            );
          }) })
        ] }) })
      }
    )
  ] });
}
export {
  ExamScores as default
};
