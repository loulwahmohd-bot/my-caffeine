import { u as useSessionStore, j as jsxRuntimeExports, L as Link } from "./index-oDdfbtqD.js";
import { b as useStudent, h as useMySubmissions } from "./useBackend-D_fritFS.js";
import { u as useProgressStore } from "./progressStore-TQYp-Hsw.js";
import { C as CHAPTERS } from "./index-CF5rV8Hy.js";
import { a as AssignmentStatus } from "./backend.d-BwRNvkO5.js";
const STAT_TABS = [
  { to: "/student/chapters", label: "الفصول", icon: "📖" },
  { to: "/student/exams", label: "الاختبارات", icon: "📝" },
  { to: "/student/games", label: "الألعاب", icon: "🎮" },
  { to: "/student/drawing", label: "الرسم", icon: "🎨" },
  { to: "/student/notes", label: "الملاحظات", icon: "📒" },
  { to: "/student/progress", label: "التطور", icon: "📊" }
];
function Dashboard() {
  var _a, _b;
  const { userId, name, className, sessionId, points } = useSessionStore();
  const { data: student } = useStudent(userId);
  const { data: submissions = [] } = useMySubmissions(userId);
  const { chapterProgress } = useProgressStore();
  const completedChapters = chapterProgress.filter((p) => p.completed);
  const pendingHomework = submissions.filter(
    (s) => s.status === AssignmentStatus.pending
  ).length;
  const lastExam = ((_a = student == null ? void 0 : student.examScores) == null ? void 0 : _a.length) ? student.examScores[student.examScores.length - 1] : null;
  const unlockedCount = ((_b = student == null ? void 0 : student.unlockedChars) == null ? void 0 : _b.length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", dir: "rtl", "data-ocid": "student_dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-primary/10 border border-primary/30 rounded-2xl p-5 flex items-center gap-4",
        "data-ocid": "student_dashboard.welcome_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary shrink-0", children: (name || "ط").charAt(0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground", children: [
              "مرحبًا، ",
              name || "طالبة",
              " 👋"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
              className || "شعبة غير محددة",
              sessionId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-2 font-mono text-xs", children: [
                "كود: ",
                sessionId.slice(0, 8)
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
        "data-ocid": "student_dashboard.stats",
        children: [
          {
            label: "نقاطي",
            value: String((student == null ? void 0 : student.points) ?? points ?? 0),
            icon: "⭐",
            ocid: "student_dashboard.stat.1"
          },
          {
            label: "شخصيات مفتوحة",
            value: String(unlockedCount),
            icon: "🦸",
            ocid: "student_dashboard.stat.2"
          },
          {
            label: "فصول مكتملة",
            value: String(completedChapters.length),
            icon: "📖",
            ocid: "student_dashboard.stat.3"
          },
          {
            label: "واجبات معلقة",
            value: String(pendingHomework),
            icon: "📌",
            ocid: "student_dashboard.stat.4"
          }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": s.ocid,
            className: "bg-card border border-border rounded-xl p-4 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl mb-1", children: s.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label })
            ]
          },
          s.label
        ))
      }
    ),
    lastExam && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 flex items-center justify-between",
        "data-ocid": "student_dashboard.last_exam_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "آخر اختبار" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground", children: [
              "المستوى ",
              String(lastExam.level)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-primary", children: [
            String(lastExam.score),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "/",
              String(lastExam.total)
            ] })
          ] }) })
        ]
      }
    ),
    completedChapters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-5",
        "data-ocid": "student_dashboard.recent_chapters",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground mb-3", children: "📖 آخر الفصول" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: completedChapters.slice(-3).map((p) => {
            const ch = CHAPTERS.find((c) => c.id === p.chapterId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0", children: p.chapterId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-foreground truncate min-w-0", children: (ch == null ? void 0 : ch.title) ?? `فصل ${p.chapterId}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-primary shrink-0", children: [
                p.score,
                "%"
              ] })
            ] }, p.chapterId);
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-3 sm:grid-cols-6 gap-2",
        "data-ocid": "student_dashboard.quick_links",
        children: STAT_TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: t.to,
            "data-ocid": `student_dashboard.link.${t.label}`,
            className: "bg-card hover:bg-primary/10 border border-border rounded-xl p-3 flex flex-col items-center gap-1 text-center transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: t.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t.label })
            ]
          },
          t.to
        ))
      }
    )
  ] });
}
export {
  Dashboard as default
};
