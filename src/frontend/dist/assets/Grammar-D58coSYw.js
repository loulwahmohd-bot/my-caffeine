import { r as reactExports, j as jsxRuntimeExports, c as cn } from "./index-oDdfbtqD.js";
import { L as Layout } from "./Layout-B8aXBhxf.js";
import { d as useQuestions } from "./useBackend-D_fritFS.js";
import { Q as QuestionType } from "./backend.d-BwRNvkO5.js";
import { m as motion, A as AnimatePresence } from "./proxy-i-hyf0kx.js";
import "./index-C0960S8x.js";
const STATIC_GRAMMAR_QUESTIONS = [
  {
    id: 1,
    text: "كم نعامات شابة انضمت إلى السرب؟",
    choices: [
      { text: "ثلاث نعامات", correct: true },
      { text: "ثلاثة نعامات", correct: false },
      { text: "ثلاثون نعامة", correct: false },
      { text: "ثلاثًا من النعامات", correct: false }
    ],
    explanation: "النعامة مؤنث → العدد يُذكَّر: «ثلاث نعامات»."
  },
  {
    id: 2,
    text: "كم خيمات وجد هدارة مهجورة؟",
    choices: [
      { text: "ثلاث خيمات", correct: true },
      { text: "ثلاثة خيمات", correct: false },
      { text: "ثلاثًا من الخيمات", correct: false },
      { text: "ثلاثون خيمة", correct: false }
    ],
    explanation: "الخيمة مؤنث → العدد يُذكَّر: «ثلاث خيمات»."
  },
  {
    id: 3,
    text: "كم بيضات حمل هدارة معه مملوءة بالماء؟",
    choices: [
      { text: "ثلاث بيضات", correct: true },
      { text: "ثلاثة بيضات", correct: false },
      { text: "ثلاثة بيوض", correct: false },
      { text: "ثلاثًا من البيضات", correct: false }
    ],
    explanation: "البيضة مؤنث → العدد يُذكَّر: «ثلاث بيضات»."
  },
  {
    id: 4,
    text: "كم يومًا بحثت النعامات عن هدارة بعد أسره؟",
    choices: [
      { text: "يومان", correct: true },
      { text: "يومين", correct: false },
      { text: "يومٌ واحد", correct: false },
      { text: "اثنان من الأيام", correct: false }
    ],
    explanation: "«يومان» هو المثنى في حالة الرفع."
  },
  {
    id: 5,
    text: "كم سنة عاش هدارة مع النعام قبل أن يعود للبشر؟",
    choices: [
      { text: "سبع سنوات", correct: true },
      { text: "سبعة سنوات", correct: false },
      { text: "سبعًا من السنوات", correct: false },
      { text: "سبعون سنة", correct: false }
    ],
    explanation: "السنة مؤنث → العدد يُذكَّر: «سبع سنوات»."
  },
  {
    id: 6,
    text: "كم رجلًا من الطوارق أخذوا صناديق المعدات؟",
    choices: [
      { text: "أربعة رجال", correct: true },
      { text: "أربع رجال", correct: false },
      { text: "أربعًا من الرجال", correct: false },
      { text: "أربعون رجلًا", correct: false }
    ],
    explanation: "الرجل مذكر → العدد يُؤنَّث: «أربعة رجال»."
  },
  {
    id: 7,
    text: "كم سيارة كانت مع فريق لوك أوكونر؟",
    choices: [
      { text: "ثلاث سيارات", correct: true },
      { text: "ثلاثة سيارات", correct: false },
      { text: "ثلاثًا من السيارات", correct: false },
      { text: "ثلاثون سيارة", correct: false }
    ],
    explanation: "السيارة مؤنث → العدد يُذكَّر: «ثلاث سيارات»."
  },
  {
    id: 8,
    text: "كم فرخ نعام ساعد هدارة على الخروج من الحفرة؟",
    choices: [
      { text: "ثلاث فراخ", correct: true },
      { text: "ثلاثة فراخ", correct: false },
      { text: "ثلاثة أفراخ", correct: false },
      { text: "ثلاثًا من الفراخ", correct: false }
    ],
    explanation: "الفرخة مؤنث → العدد يُذكَّر: «ثلاث فراخ»."
  },
  {
    id: 9,
    text: "كم غزالة كانت مع ظبيا عندما قابلها هدارة؟",
    choices: [
      { text: "ثلاث غزالات", correct: true },
      { text: "ثلاثة غزالات", correct: false },
      { text: "ثلاثًا من الغزالات", correct: false },
      { text: "ثلاثون غزالة", correct: false }
    ],
    explanation: "الغزالة مؤنث → العدد يُذكَّر: «ثلاث غزالات»."
  },
  {
    id: 10,
    text: "كم يومًا دام عرس هدارة وخروبة؟",
    choices: [
      { text: "سبعة أيام", correct: true },
      { text: "سبع أيام", correct: false },
      { text: "سبعًا من الأيام", correct: false },
      { text: "سبعون يومًا", correct: false }
    ],
    explanation: "اليوم مذكر → العدد يُؤنَّث: «سبعة أيام»."
  }
];
const LEVELS = [
  { id: 1, label: "🟢 سهل", sublabel: "خياران", choiceCount: 2 },
  { id: 2, label: "🟡 متوسط", sublabel: "ثلاثة خيارات", choiceCount: 3 },
  { id: 3, label: "🔴 صعب", sublabel: "أربعة خيارات", choiceCount: 4 }
];
const LETTERS = ["أ", "ب", "ج", "د"];
function GrammarCard({
  question,
  index,
  choiceCount,
  onAnswer
}) {
  const [selected, setSelected] = reactExports.useState(null);
  const visible = question.choices.slice(0, choiceCount);
  const pick = (ci, correct) => {
    if (selected !== null) return;
    setSelected(ci);
    onAnswer(correct);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.22, delay: index * 0.055 },
      "data-ocid": `grammar.question.${index + 1}`,
      className: "bg-card border border-border rounded-xl p-5 shadow-sm space-y-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold me-2", children: [
            index + 1,
            "."
          ] }),
          question.text
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: visible.map((choice, ci) => {
          const isSelected = selected === ci;
          const revealed = selected !== null;
          const base = cn(
            "w-full text-right px-4 py-2.5 rounded-lg border text-sm transition-colors duration-200 flex items-center gap-2",
            revealed ? choice.correct ? "bg-green-50 border-green-400 text-green-800 font-semibold" : isSelected ? "bg-red-50 border-red-400 text-red-800" : "bg-card border-border text-foreground opacity-50" : isSelected ? "bg-primary/10 border-primary text-foreground font-medium" : "bg-background border-border text-foreground hover:bg-muted hover:border-primary/40 cursor-pointer"
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `grammar.choice.${index + 1}.${ci + 1}`,
              className: base,
              onClick: () => pick(ci, choice.correct),
              disabled: selected !== null,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border",
                      revealed && choice.correct ? "bg-green-500 border-green-500 text-white" : revealed && isSelected && !choice.correct ? "bg-red-500 border-red-500 text-white" : "bg-muted border-border text-muted-foreground"
                    ),
                    children: LETTERS[ci]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: choice.text }),
                revealed && choice.correct && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "✓" }),
                revealed && isSelected && !choice.correct && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "✗" })
              ]
            },
            `grammar-${index}-${choice.text.slice(0, 8)}`
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.28 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-900 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-amber-700", children: "📖 القاعدة النحوية:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: question.explanation })
            ] })
          },
          "expl"
        ) })
      ]
    }
  );
}
function Grammar() {
  var _a;
  const [level, setLevel] = reactExports.useState(1);
  const [answers, setAnswers] = reactExports.useState({});
  const [remountKey, setRemountKey] = reactExports.useState(0);
  const { data: backendQs = [] } = useQuestions({
    qtype: QuestionType.grammar
  });
  const QUESTIONS = backendQs.length > 0 ? backendQs.map((q, idx) => ({
    id: idx + 1,
    text: q.text,
    choices: q.choices.map((c) => ({ text: c.text, correct: c.correct })),
    explanation: q.explanation ?? ""
  })) : STATIC_GRAMMAR_QUESTIONS;
  const choiceCount = ((_a = LEVELS.find((l) => l.id === level)) == null ? void 0 : _a.choiceCount) ?? 2;
  const totalAnswered = Object.keys(answers).length;
  const score = Object.values(answers).filter(Boolean).length;
  const isComplete = totalAnswered === QUESTIONS.length;
  const changeLevel = (newLevel) => {
    setLevel(newLevel);
    setAnswers({});
    setRemountKey((k) => k + 1);
  };
  const reset = () => {
    setAnswers({});
    setRemountKey((k) => k + 1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto space-y-6 pb-12",
      dir: "rtl",
      "data-ocid": "grammar.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "العدد والمعدود" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "أسئلة من رواية «الولد الذي عاش مع النعام» — ١٠ أسئلة" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-sm text-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: "📚 القاعدة: " }),
          "العدد (٣–١٠) يخالف المعدود في التذكير والتأنيث. [معدود مؤنث → عدد مذكر | معدود مذكر → عدد مؤنث]"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", "data-ocid": "grammar.level_filter", children: LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `grammar.level.${l.id}`,
            onClick: () => changeLevel(l.id),
            className: cn(
              "flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 border",
              level === l.id ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card border-border text-foreground hover:bg-muted"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: l.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "block text-xs mt-0.5",
                    level === l.id ? "text-primary-foreground/80" : "text-muted-foreground"
                  ),
                  children: l.sublabel
                }
              )
            ]
          },
          l.id
        )) }),
        totalAnswered > 0 && !isComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", "data-ocid": "grammar.progress", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تقدمك" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              totalAnswered,
              "/",
              QUESTIONS.length
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full bg-primary rounded-full",
              initial: { width: 0 },
              animate: {
                width: `${totalAnswered / QUESTIONS.length * 100}%`
              },
              transition: { duration: 0.4 }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "space-y-4",
            "data-ocid": "grammar.questions_list",
            children: QUESTIONS.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              GrammarCard,
              {
                question: q,
                index: i,
                choiceCount,
                onAnswer: (correct) => setAnswers((prev) => ({ ...prev, [i]: correct }))
              },
              `${level}-${q.id}`
            ))
          },
          remountKey
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.35 },
            "data-ocid": "grammar.success_state",
            className: "bg-card border-2 border-primary/30 rounded-2xl p-6 text-center shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-3", children: score === QUESTIONS.length ? "🏆" : score >= QUESTIONS.length * 0.7 ? "⭐" : "📚" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-primary", children: [
                score,
                "/",
                QUESTIONS.length
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 mb-4", children: score === QUESTIONS.length ? "ممتاز! أتقنتِ العدد والمعدود 🎉" : score >= QUESTIONS.length * 0.7 ? "أحسنتِ! مستواكِ جيد جدًا" : "حاولي مرة أخرى، أنتِ قادرة!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "grammar.reset_button",
                  onClick: reset,
                  className: "px-6 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors",
                  children: "إعادة المحاولة"
                }
              )
            ]
          },
          "score"
        ) })
      ]
    }
  ) });
}
export {
  Grammar as default
};
