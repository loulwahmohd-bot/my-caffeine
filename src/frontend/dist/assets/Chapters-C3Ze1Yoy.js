import { r as reactExports, j as jsxRuntimeExports, c as cn, u as useSessionStore } from "./index-oDdfbtqD.js";
import { L as Layout } from "./Layout-B8aXBhxf.js";
import { c as createSlot, B as Badge, a as Button } from "./button-D77dc4Cp.js";
import { C as CHAPTER_QUESTIONS } from "./chapterQuestions-D8tDeLCp.js";
import { c as useSubmitChapterProgress, d as useQuestions } from "./useBackend-D_fritFS.js";
import { u as useProgressStore } from "./progressStore-TQYp-Hsw.js";
import { Q as QuestionType } from "./backend.d-BwRNvkO5.js";
import { m as motion, A as AnimatePresence } from "./proxy-i-hyf0kx.js";
import "./index-C0960S8x.js";
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function toLocalQuestion(q) {
  const lvl = q.level != null ? Number(q.level) : 2;
  const difficulty = lvl <= 1 ? "easy" : lvl === 2 ? "medium" : "hard";
  return { id: String(q.id), text: q.text, difficulty, choices: q.choices };
}
const DIFF_CONFIG = {
  easy: { label: "سهل", bg: "bg-green-100 text-green-800" },
  medium: { label: "متوسط", bg: "bg-amber-100 text-amber-800" },
  hard: { label: "صعب", bg: "bg-red-100 text-red-800" }
};
const ARABIC_LETTERS = ["أ", "ب", "ج", "د"];
function QuizView({
  questions,
  onFinish
}) {
  var _a;
  const [idx, setIdx] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState(
    questions.map(() => ({ selected: null, revealed: false }))
  );
  const q = questions[idx];
  const ans = answers[idx];
  const totalAnswered = answers.filter((a) => a.revealed).length;
  const score = answers.filter(
    (a, i) => {
      var _a2;
      return a.revealed && ((_a2 = questions[i].choices[a.selected ?? -1]) == null ? void 0 : _a2.correct);
    }
  ).length;
  const handleSelect = (ci) => {
    if (ans.revealed) return;
    setAnswers(
      (prev) => prev.map((a, i) => i === idx ? { selected: ci, revealed: true } : a)
    );
  };
  const handleNext = () => {
    if (idx < questions.length - 1) {
      setIdx((i) => i + 1);
    } else {
      onFinish(score);
    }
  };
  const diff = DIFF_CONFIG[q.difficulty];
  const allDone = totalAnswered === questions.length;
  const isCorrectAnswer = (_a = q.choices[ans.selected ?? -1]) == null ? void 0 : _a.correct;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "السؤال ",
          idx + 1,
          " من ",
          questions.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
          totalAnswered,
          " / ",
          questions.length,
          " أُجيب"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Progress,
        {
          "data-ocid": "chapter.quiz.progress",
          value: totalAnswered / questions.length * 100,
          className: "h-2"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: { duration: 0.25 },
        className: "bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-xs font-semibold px-2.5 py-0.5 rounded-full",
                  diff.bg
                ),
                children: diff.label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "سؤال ",
              idx + 1
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": `chapter.question.text.${idx + 1}`,
              className: "text-base font-semibold text-foreground leading-relaxed",
              children: q.text
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2.5", children: q.choices.map((choice, ci) => {
            const isSelected = ans.selected === ci;
            const isCorrect = choice.correct;
            let cls = "w-full text-right px-4 py-3 rounded-xl border text-sm font-medium transition-smooth cursor-pointer ";
            if (ans.revealed) {
              if (isCorrect)
                cls += "bg-green-50 border-green-400 text-green-800";
              else if (isSelected && !isCorrect)
                cls += "bg-red-50 border-red-400 text-red-700";
              else
                cls += "bg-background border-border text-foreground opacity-50";
            } else if (isSelected) {
              cls += "bg-primary/10 border-primary text-foreground";
            } else {
              cls += "bg-background border-border text-foreground hover:bg-muted hover:border-primary/40";
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `chapter.choice.${ci + 1}`,
                className: cls,
                onClick: () => handleSelect(ci),
                disabled: ans.revealed,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold me-2", children: ARABIC_LETTERS[ci] }),
                  choice.text
                ]
              },
              `q${q.id}-c${ci}`
            );
          }) }),
          ans.revealed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              className: "flex items-center justify-between pt-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-sm font-semibold",
                      isCorrectAnswer ? "text-green-700" : "text-red-600"
                    ),
                    children: isCorrectAnswer ? "✅ إجابة صحيحة!" : "❌ إجابة خاطئة"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "chapter.next_button",
                    size: "sm",
                    onClick: handleNext,
                    children: allDone ? "عرض النتيجة" : "السؤال التالي →"
                  }
                )
              ]
            }
          )
        ]
      },
      idx
    ) }),
    totalAnswered > 0 && !allDone && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
      "الإجابات الصحيحة حتى الآن:",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: score })
    ] })
  ] });
}
function ResultView({
  questionsCount,
  score,
  onBack
}) {
  const total = questionsCount;
  const pct = Math.round(score / total * 100);
  const emoji = score === total ? "🏆" : score >= 4 ? "⭐" : score >= 2 ? "📖" : "💪";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      className: "max-w-sm mx-auto text-center space-y-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-2xl font-bold text-foreground", children: [
            score,
            " / ",
            total
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
            "نسبة الإجابات الصحيحة: ",
            pct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-3 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: score === total ? "ممتاز! أجبت على جميع الأسئلة بصواب 🎉" : score >= 4 ? "عمل رائع! كادت تكون مثالية ✨" : score >= 2 ? "جيد! استمري في القراءة 📚" : "لا بأس، حاولي مجددًا 💙" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "chapter.back_to_chapters_button",
            variant: "outline",
            onClick: onBack,
            className: "w-full",
            children: "← العودة إلى الفصول"
          }
        )
      ]
    }
  );
}
function ChapterCard({
  chapter,
  questions,
  progress,
  index,
  onClick
}) {
  const easy = questions.filter((q) => q.difficulty === "easy").length;
  const med = questions.filter((q) => q.difficulty === "medium").length;
  const hard = questions.filter((q) => q.difficulty === "hard").length;
  const total = questions.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      "data-ocid": `chapters.item.${index + 1}`,
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index % 6 * 0.06 },
      whileHover: { scale: 1.02 },
      className: "w-full text-right bg-card border border-border rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-primary/40 transition-smooth cursor-pointer",
      onClick,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center", children: chapter.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm leading-snug line-clamp-2", children: chapter.title }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-1.5", children: (progress == null ? void 0 : progress.completed) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "النتيجة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
              progress.score,
              " / ",
              total
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              value: progress.score / total * 100,
              className: "h-1.5"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "لم تُحَل بعد" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-green-50 text-green-700 rounded-full px-2 py-0.5 font-medium", children: [
            easy,
            " سهل"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-amber-50 text-amber-700 rounded-full px-2 py-0.5 font-medium", children: [
            med,
            " متوسط"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-red-50 text-red-700 rounded-full px-2 py-0.5 font-medium", children: [
            hard,
            " صعب"
          ] })
        ] })
      ]
    }
  );
}
function Chapters() {
  const { chapterProgress, setChapterProgress } = useProgressStore();
  const { userId } = useSessionStore();
  const submitProgress = useSubmitChapterProgress();
  const { data: backendQs = [] } = useQuestions({
    qtype: QuestionType.chapter
  });
  const chapterQsMap = /* @__PURE__ */ new Map();
  for (const q of backendQs) {
    const cid = q.chapterId != null ? Number(q.chapterId) : 0;
    if (!chapterQsMap.has(cid)) chapterQsMap.set(cid, []);
    chapterQsMap.get(cid).push(toLocalQuestion(q));
  }
  const [activeChapter, setActiveChapter] = reactExports.useState(null);
  const [activeQuestions, setActiveQuestions] = reactExports.useState([]);
  const [quizScore, setQuizScore] = reactExports.useState(null);
  function getChapterQuestions(ch) {
    const bq = chapterQsMap.get(ch.id);
    if (bq && bq.length > 0) return bq;
    return ch.questions.map((q) => ({
      id: String(q.id),
      text: q.text,
      difficulty: q.difficulty,
      choices: q.choices.map((c) => ({
        id: BigInt(c.id),
        text: c.text,
        correct: c.correct
      }))
    }));
  }
  const handleOpenChapter = (ch) => {
    setActiveChapter(ch);
    setActiveQuestions(getChapterQuestions(ch));
    setQuizScore(null);
  };
  const handleFinishQuiz = (score) => {
    if (!activeChapter) return;
    setQuizScore(score);
    setChapterProgress(activeChapter.id, score);
    if (userId) {
      submitProgress.mutate({
        userId,
        progress: {
          chapterId: BigInt(activeChapter.id),
          score: BigInt(score),
          completed: true
        }
      });
    }
  };
  const handleBack = () => {
    setActiveChapter(null);
    setActiveQuestions([]);
    setQuizScore(null);
  };
  const completedCount = chapterProgress.filter((p) => p.completed).length;
  const totalChapters = CHAPTER_QUESTIONS.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background px-4 py-6 max-w-4xl mx-auto",
      "data-ocid": "chapters.page",
      children: [
        !activeChapter && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "أسئلة الفصول 📚" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  "data-ocid": "chapters.progress.badge",
                  variant: "secondary",
                  className: "text-xs",
                  children: [
                    completedCount,
                    " / ",
                    totalChapters,
                    " مكتمل"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "اختاري فصلاً للإجابة على أسئلته — كل فصل يحتوي على 6 أسئلة متدرجة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Progress,
              {
                "data-ocid": "chapters.overall.progress",
                value: completedCount / totalChapters * 100,
                className: "h-2"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "chapters.list",
              className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
              children: CHAPTER_QUESTIONS.map((ch, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChapterCard,
                {
                  chapter: ch,
                  questions: getChapterQuestions(ch),
                  progress: chapterProgress.find((p) => p.chapterId === ch.id),
                  index: i,
                  onClick: () => handleOpenChapter(ch)
                },
                ch.id
              ))
            }
          )
        ] }),
        activeChapter && quizScore === null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": "chapter.back_button",
                variant: "ghost",
                size: "sm",
                onClick: handleBack,
                children: "← عودة"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "الفصل ",
                activeChapter.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground leading-tight", children: activeChapter.title })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuizView, { questions: activeQuestions, onFinish: handleFinishQuiz })
        ] }),
        activeChapter && quizScore !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "الفصل ",
              activeChapter.id
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: activeChapter.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResultView,
            {
              questionsCount: activeQuestions.length,
              score: quizScore,
              onBack: handleBack
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  Chapters as default
};
