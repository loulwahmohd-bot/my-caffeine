import { j as jsxRuntimeExports } from "./index-oDdfbtqD.js";
import { u as useProgressStore } from "./progressStore-TQYp-Hsw.js";
import { C as CHAPTERS } from "./index-CF5rV8Hy.js";
const LEVEL_LABEL = {
  0: "لم يبدأ",
  1: "ضعيف",
  2: "مقبول",
  3: "جيد",
  4: "جيد جداً",
  5: "ممتاز"
};
const scoreLevel = (score) => {
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
  "bg-secondary/30 text-secondary"
];
function ChapterProgress() {
  const { chapterProgress } = useProgressStore();
  const getProgress = (id) => chapterProgress.find((p) => p.chapterId === id) ?? null;
  const completedCount = chapterProgress.filter((p) => p.completed).length;
  const avgScore = chapterProgress.length > 0 ? Math.round(
    chapterProgress.reduce((a, p) => a + p.score, 0) / chapterProgress.length
  ) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", dir: "rtl", "data-ocid": "chapters.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "📖 تقدم الفصول" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-card border border-border rounded-lg px-3 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: completedCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: " / 38 مكتملة" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-card border border-border rounded-lg px-3 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
            avgScore,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: " معدل" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4",
        "data-ocid": "chapters.overall_progress",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "التقدم العام" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              Math.round(completedCount / 38 * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-3 bg-primary rounded-full transition-smooth",
              style: { width: `${Math.round(completedCount / 38 * 100)}%` }
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border border-border rounded-xl overflow-hidden",
        "data-ocid": "chapters.table",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground w-12", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground", children: "الفصل" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground w-24", children: "الدرجة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground w-28", children: "المستوى" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground w-32", children: "التقدم" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: CHAPTERS.map((ch, idx) => {
            const p = getProgress(ch.id);
            const score = (p == null ? void 0 : p.score) ?? 0;
            const level = scoreLevel(score);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `chapters.row.${idx + 1}`,
                className: "border-b border-border last:border-0 hover:bg-muted/20 transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs font-mono", children: ch.id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: ch.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: p ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
                    score,
                    "%"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[level]}`,
                      children: LEVEL_LABEL[level]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-1.5 bg-primary rounded-full",
                        style: { width: `${score}%` }
                      }
                    ) }),
                    (p == null ? void 0 : p.completed) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary text-xs", children: "✓" })
                  ] }) })
                ]
              },
              ch.id
            );
          }) })
        ] }) })
      }
    )
  ] });
}
export {
  ChapterProgress as default
};
