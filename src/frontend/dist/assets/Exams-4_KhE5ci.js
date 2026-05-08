import { r as reactExports, u as useSessionStore, j as jsxRuntimeExports } from "./index-oDdfbtqD.js";
import { L as Layout } from "./Layout-B8aXBhxf.js";
import { E as EXAM_LEVELS, g as getStars } from "./examQuestions-DiZ2Diqk.js";
import { e as useSubmitExamScore, d as useQuestions } from "./useBackend-D_fritFS.js";
import { u as useProgressStore } from "./progressStore-TQYp-Hsw.js";
import { Q as QuestionType } from "./backend.d-BwRNvkO5.js";
import { u as ue } from "./index-C0960S8x.js";
const STORAGE_KEY = "ostrich_exam_best";
function loadBest() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}
function saveBest(b) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(b));
}
function Stars({ count, size = "text-2xl" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex gap-0.5 justify-center", "aria-label": `${count} نجوم`, children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `${size} transition-transform duration-300 ${i <= count ? "text-yellow-400 scale-110" : "text-muted/30"}`,
      children: "★"
    },
    i
  )) });
}
const EXAM_DURATION = 15 * 60;
function Timer({ seconds }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isWarning = seconds <= 120;
  const isCritical = seconds <= 30;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `font-mono text-lg font-bold px-4 py-2 rounded-xl border-2 transition-colors ${isCritical ? "border-rose-400 bg-rose-50 text-rose-600 animate-pulse" : isWarning ? "border-amber-400 bg-amber-50 text-amber-700" : "border-border bg-card text-foreground"}`,
      "data-ocid": "exams.timer",
      children: [
        "⏱ ",
        String(mins).padStart(2, "0"),
        ":",
        String(secs).padStart(2, "0")
      ]
    }
  );
}
function LevelCard({
  lvl,
  best,
  index,
  onClick
}) {
  const b = best[lvl.level];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `exams.level.${index + 1}`,
      onClick,
      className: `relative border-2 rounded-2xl p-5 text-right hover:scale-[1.03] active:scale-[0.99] transition-all duration-200 shadow-sm hover:shadow-md ${lvl.color} w-full`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl opacity-20 font-black select-none", children: lvl.level }) }),
        b && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { count: b.stars, size: "text-base" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg leading-snug", children: lvl.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5 opacity-75", children: lvl.description })
        ] }),
        b ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-white/50 rounded-lg px-2 py-0.5 font-semibold", children: [
            "أفضل: ",
            b.score,
            "/15"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-60", children: "اضغطي للمحاولة مجدداً" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-60", children: "لم تُحَل بعد" }) })
      ]
    }
  );
}
function QuestionItem({
  q,
  index,
  selected,
  revealed,
  onSelect
}) {
  const ARABIC_LETTERS = ["أ", "ب", "ج", "د"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl p-4 shadow-sm",
      "data-ocid": `exams.question.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground mb-3 leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold ml-1", children: [
            index + 1,
            "."
          ] }),
          " ",
          q.text
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: q.choices.map((choice, ci) => {
          const isSelected = selected === ci;
          const isCorrect = ci === q.correctIndex;
          let style = "border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5";
          if (revealed) {
            if (isCorrect)
              style = "border-emerald-400 bg-emerald-50 text-emerald-800 font-semibold";
            else if (isSelected && !isCorrect)
              style = "border-rose-400 bg-rose-50 text-rose-700";
          } else if (isSelected) {
            style = "border-primary bg-primary/10 text-primary font-semibold";
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `exams.choice.${index + 1}.${ci + 1}`,
              disabled: revealed,
              onClick: () => onSelect(ci),
              className: `border-2 rounded-xl p-3 text-right transition-all duration-150 text-sm flex items-start gap-2 ${style} ${revealed ? "cursor-default" : "cursor-pointer"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-muted-foreground/60 min-w-[1.2rem] text-center", children: ARABIC_LETTERS[ci] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 min-w-0", children: choice }),
                revealed && isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600 text-base", children: "✓" }),
                revealed && isSelected && !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500 text-base", children: "✗" })
              ]
            },
            ci
          );
        }) })
      ]
    }
  );
}
function Exams() {
  const [best, setBest] = reactExports.useState(loadBest);
  const [activeLvl, setActiveLvl] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState({});
  const [revealed, setRevealed] = reactExports.useState(false);
  const [finalScore, setFinalScore] = reactExports.useState(null);
  const [timeLeft, setTimeLeft] = reactExports.useState(EXAM_DURATION);
  const timerRef = reactExports.useRef(null);
  const { userId } = useSessionStore();
  const submitExam = useSubmitExamScore();
  const { setChapterProgress } = useProgressStore();
  const { data: backendQs = [] } = useQuestions({ qtype: QuestionType.exam });
  const levelMap = /* @__PURE__ */ new Map();
  for (const q of backendQs) {
    const lv = q.level != null ? Number(q.level) : 1;
    const correctIndex = q.choices.findIndex((c) => c.correct);
    const eq = {
      id: Number(q.id),
      text: q.text,
      choices: q.choices.map((c) => c.text),
      correctIndex: correctIndex >= 0 ? correctIndex : 0
    };
    if (!levelMap.has(lv)) levelMap.set(lv, []);
    levelMap.get(lv).push(eq);
  }
  const ACTIVE_EXAM_LEVELS = EXAM_LEVELS.map((lvl) => {
    var _a;
    return {
      ...lvl,
      questions: ((_a = levelMap.get(lvl.level)) == null ? void 0 : _a.length) ? levelMap.get(lvl.level) ?? lvl.questions : lvl.questions
    };
  });
  const startTimer = reactExports.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(EXAM_DURATION);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1e3);
  }, []);
  const stopTimer = reactExports.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);
  reactExports.useEffect(() => {
    if (timeLeft === 0 && activeLvl && !revealed) {
      handleSubmit(true);
    }
  }, [timeLeft, activeLvl, revealed]);
  reactExports.useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);
  const handleSelectLevel = (lvl) => {
    setActiveLvl(lvl);
    setSelected({});
    setRevealed(false);
    setFinalScore(null);
    startTimer();
  };
  const handleSelect = (qIdx, choiceIdx) => {
    if (revealed) return;
    setSelected((prev) => ({ ...prev, [qIdx]: choiceIdx }));
  };
  const handleSubmit = async (timedOut = false) => {
    if (!activeLvl) return;
    stopTimer();
    const questions = activeLvl.questions;
    let score = 0;
    questions.forEach((q, i) => {
      if (selected[i] === q.correctIndex) score++;
    });
    setFinalScore(score);
    setRevealed(true);
    const stars = getStars(score, questions.length);
    const updated = { ...best };
    const prev = best[activeLvl.level];
    if (!prev || score > prev.score) {
      updated[activeLvl.level] = { score, stars };
      setBest(updated);
      saveBest(updated);
    }
    setChapterProgress(activeLvl.level, score);
    try {
      await submitExam.mutateAsync({
        userId,
        score: {
          level: BigInt(activeLvl.level),
          score: BigInt(score),
          total: BigInt(questions.length)
        }
      });
    } catch {
    }
    if (timedOut) {
      ue.warning(`انتهى الوقت! نتيجتك: ${score}/${questions.length}`);
    } else {
      const pct = Math.round(score / questions.length * 100);
      if (pct >= 90)
        ue.success(`🌟 ممتاز! ${score}/${questions.length} – ${pct}%`);
      else if (pct >= 60)
        ue.success(`👍 جيدة! ${score}/${questions.length} – ${pct}%`);
      else
        ue.info(
          `💪 استمري في التدريب! ${score}/${questions.length} – ${pct}%`
        );
    }
  };
  const answeredCount = Object.keys(selected).length;
  const totalQ = (activeLvl == null ? void 0 : activeLvl.questions.length) ?? 0;
  const allAnswered = answeredCount >= totalQ && totalQ > 0;
  const reset = () => {
    stopTimer();
    setActiveLvl(null);
    setSelected({});
    setRevealed(false);
    setFinalScore(null);
  };
  if (!activeLvl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl mx-auto", "data-ocid": "exams.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "🎓 الاختبارات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "اختاري المستوى لبدء اختبار من 15 سؤال – مدة 15 دقيقة" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid sm:grid-cols-2 gap-4",
          "data-ocid": "exams.levels_grid",
          children: ACTIVE_EXAM_LEVELS.map((lvl, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            LevelCard,
            {
              lvl,
              best,
              index: i,
              onClick: () => handleSelectLevel(lvl)
            },
            lvl.level
          ))
        }
      ),
      Object.keys(best).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl p-4",
          "data-ocid": "exams.progress_summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-sm text-muted-foreground mb-3", children: "تقدمك الكلي" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: ACTIVE_EXAM_LEVELS.map((lvl) => {
              const b = best[lvl.level];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: lvl.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { count: (b == null ? void 0 : b.stars) ?? 0, size: "text-sm" })
                  ]
                },
                lvl.level
              );
            }) })
          ]
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-2xl mx-auto", "data-ocid": "exams.exam_page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "exams.back_button",
          onClick: reset,
          className: "text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1",
          children: "← المستويات"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: activeLvl.label }),
        !revealed && /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { seconds: timeLeft })
      ] })
    ] }),
    !revealed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          answeredCount,
          "/",
          totalQ,
          " سؤال"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Math.round(answeredCount / totalQ * 100),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full bg-primary rounded-full transition-all duration-300",
          style: { width: `${answeredCount / totalQ * 100}%` }
        }
      ) })
    ] }),
    revealed && finalScore !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl p-6 text-center shadow-sm",
        "data-ocid": "exams.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-3", children: finalScore >= totalQ * 0.9 ? "🏆" : finalScore >= totalQ * 0.6 ? "🌟" : "💪" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-primary", children: [
            finalScore,
            "/",
            totalQ
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
            Math.round(finalScore / totalQ * 100),
            "% – ",
            activeLvl.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { count: getStars(finalScore, totalQ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3 justify-center flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "exams.retry_button",
                onClick: () => handleSelectLevel(activeLvl),
                className: "bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-smooth text-sm",
                children: "حاولي مجددًا"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "exams.levels_button",
                onClick: reset,
                className: "bg-secondary text-secondary-foreground px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-smooth text-sm",
                children: "المستويات"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: activeLvl.questions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuestionItem,
      {
        q,
        index: i,
        selected: selected[i] ?? null,
        revealed,
        onSelect: (ci) => handleSelect(i, ci)
      },
      q.id
    )) }),
    !revealed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky bottom-4 flex justify-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/95 backdrop-blur border border-border rounded-2xl p-3 shadow-lg flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        answeredCount,
        "/",
        totalQ,
        " محلول"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "exams.submit_button",
          onClick: () => handleSubmit(false),
          disabled: !allAnswered || submitExam.isPending,
          className: "bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-smooth text-sm disabled:opacity-50 disabled:cursor-not-allowed",
          children: submitExam.isPending ? "جارٍ الحفظ..." : "تسليم الاختبار"
        }
      )
    ] }) })
  ] }) });
}
export {
  Exams as default
};
