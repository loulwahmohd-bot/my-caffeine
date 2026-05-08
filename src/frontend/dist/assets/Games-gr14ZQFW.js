import { r as reactExports, u as useSessionStore, j as jsxRuntimeExports } from "./index-oDdfbtqD.js";
import { L as Layout } from "./Layout-B8aXBhxf.js";
import { f as useSubmitGameScore, d as useQuestions } from "./useBackend-D_fritFS.js";
import { Q as QuestionType } from "./backend.d-BwRNvkO5.js";
import { A as AnimatePresence, m as motion } from "./proxy-i-hyf0kx.js";
import "./index-C0960S8x.js";
const BOX_QUESTIONS = {
  1: [
    {
      text: "هرب هدارة من القافلة لأنه شعر أن البشر ______",
      choices: [
        { text: "يريدون مساعدته", correct: false },
        { text: "سيؤذونه", correct: false },
        { text: "سيقتلونه مثل الحيوانات", correct: true },
        { text: "لا يهتمون به", correct: false }
      ]
    },
    {
      text: "كانت النعامات تظلّل هدارة من الشمس لأنها ______",
      choices: [
        { text: "تخاف منه", correct: false },
        { text: "تحبه", correct: true },
        { text: "تريد طعامه", correct: false },
        { text: "تظنه نعامة", correct: false }
      ]
    },
    {
      text: "شعر هدارة بالخوف عندما رأى والده يذبح الغنمة لأن منظر الدم ______",
      choices: [
        { text: "أزعجه", correct: true },
        { text: "أسعده", correct: false },
        { text: "جعله يضحك", correct: false },
        { text: "جعله يركض نحو الذبيحة", correct: false }
      ]
    },
    {
      text: "ركضت النعامات خلف القافلة يومين لأنها كانت تريد ______",
      choices: [
        { text: "الطعام", correct: false },
        { text: "الماء", correct: false },
        { text: "استعادة هدارة", correct: true },
        { text: "الهرب من الصحراء", correct: false }
      ]
    },
    {
      text: "شعر هدارة بالارتباك عندما سمع البشر يتحدثون لأنه لا يفهم الكلمات بل يفهم ______",
      choices: [
        { text: "المعنى", correct: false },
        { text: "النبرة", correct: true },
        { text: "اللغة", correct: false },
        { text: "الإشارات", correct: false }
      ]
    }
  ],
  2: [
    {
      text: "عندما ساعد هدارة اللبؤة الصغيرة رغم خوفه، فهذا يدل على أنه:",
      choices: [
        { text: "أناني", correct: false },
        { text: "شجاع", correct: true },
        { text: "غاضب", correct: false },
        { text: "متردد", correct: false }
      ]
    },
    {
      text: "عندما ظللت النعامات هدارة من الشمس، فهذا يدل على:",
      choices: [
        { text: "قسوتها", correct: false },
        { text: "حنانها", correct: true },
        { text: "غضبها", correct: false },
        { text: "أنانيتها", correct: false }
      ]
    },
    {
      text: "عندما أصرّ لوك على تصوير هدارة رغم فشل المعدات، فهذا يدل على:",
      choices: [
        { text: "طيبته", correct: false },
        { text: "طمعه", correct: true },
        { text: "خوفه", correct: false },
        { text: "جهله", correct: false }
      ]
    },
    {
      text: "عندما خافت خروبة على هدارة من البشر، فهذا يدل على:",
      choices: [
        { text: "عصبيتها", correct: false },
        { text: "حكمتها", correct: true },
        { text: "قسوتها", correct: false },
        { text: "ترددها", correct: false }
      ]
    },
    {
      text: "عندما هرب هدارة بسرعة دون تفكير، فهذا يدل على:",
      choices: [
        { text: "العجلة", correct: true },
        { text: "الهدوء", correct: false },
        { text: "اللطف", correct: false },
        { text: "الشجاعة", correct: false }
      ]
    }
  ],
  3: [
    {
      text: "عندما رفض هدارة ترك اللبؤة الصغيرة، فهذا يدل على:",
      choices: [
        { text: "الرحمة", correct: true },
        { text: "الأنانية", correct: false },
        { text: "العصبية", correct: false },
        { text: "التردد", correct: false }
      ]
    },
    {
      text: "عندما حاول بوبوط الإمساك بهدارة بالقوة، فهذا يدل على:",
      choices: [
        { text: "لطفه", correct: false },
        { text: "قسوته", correct: true },
        { text: "شجاعته", correct: false },
        { text: "حكمته", correct: false }
      ]
    },
    {
      text: "عندما ركضت النعامات خلف القافلة يومين، فهذا يدل على:",
      choices: [
        { text: "غضبها", correct: false },
        { text: "وفائها", correct: true },
        { text: "أنانيتها", correct: false },
        { text: "خوفها", correct: false }
      ]
    },
    {
      text: "عندما ساعدت خروبة هدارة على الكلام، فهذا يدل على:",
      choices: [
        { text: "صبرها", correct: true },
        { text: "عصبيتها", correct: false },
        { text: "قسوتها", correct: false },
        { text: "ترددها", correct: false }
      ]
    },
    {
      text: "عندما كان هدارة يهرب من البشر دائمًا، فهذا يدل على:",
      choices: [
        { text: "ثقته بهم", correct: false },
        { text: "خوفه منهم", correct: true },
        { text: "حبه لهم", correct: false },
        { text: "رغبته في العيش معهم", correct: false }
      ]
    }
  ]
};
const BOXES = [
  {
    id: 1,
    emoji: "💬",
    label: "أكمل الفراغ",
    color: "from-amber-400 to-orange-400"
  },
  {
    id: 2,
    emoji: "🎭",
    label: "صفات الشخصيات",
    color: "from-rose-400 to-pink-400"
  },
  {
    id: 3,
    emoji: "⚡",
    label: "تصرفات ودلالاتها",
    color: "from-violet-400 to-purple-400"
  }
];
const TIMER = 30;
function Confetti({ active }) {
  if (!active) return null;
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ["#f59e0b", "#ef4444", "#8b5cf6", "#10b981", "#3b82f6", "#f97316"][Math.floor(Math.random() * 6)],
    size: 8 + Math.random() * 8
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 pointer-events-none z-50 overflow-hidden", children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "absolute rounded-sm",
      style: {
        left: `${p.x}%`,
        top: "-10px",
        width: p.size,
        height: p.size,
        backgroundColor: p.color
      },
      initial: { y: -20, opacity: 1, rotate: 0 },
      animate: { y: "110vh", opacity: 0, rotate: 720 },
      transition: { duration: 2.5, delay: p.delay, ease: "easeIn" }
    },
    p.id
  )) });
}
function TimerRing({ timeLeft }) {
  const radius = 36;
  const circ = 2 * Math.PI * radius;
  const progress = timeLeft / TIMER * circ;
  const color = timeLeft > 15 ? "#22c55e" : timeLeft > 8 ? "#f59e0b" : "#ef4444";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 h-24 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        className: "absolute inset-0 -rotate-90",
        width: "96",
        height: "96",
        "aria-label": "عداد الوقت",
        role: "img",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "48",
              cy: "48",
              r: radius,
              fill: "none",
              stroke: "#e5e7eb",
              strokeWidth: "6"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "48",
              cy: "48",
              r: radius,
              fill: "none",
              stroke: color,
              strokeWidth: "6",
              strokeDasharray: circ,
              strokeDashoffset: circ - progress,
              strokeLinecap: "round",
              style: { transition: "stroke-dashoffset 1s linear, stroke 0.3s" }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold z-10", style: { color }, children: timeLeft })
  ] });
}
function Games() {
  const [boxId, setBoxId] = reactExports.useState(null);
  const [qIdx, setQIdx] = reactExports.useState(0);
  const [score, setScore] = reactExports.useState(0);
  const [answered, setAnswered] = reactExports.useState(false);
  const [chosenIdx, setChosenIdx] = reactExports.useState(null);
  const [timeLeft, setTimeLeft] = reactExports.useState(TIMER);
  const [done, setDone] = reactExports.useState(false);
  const [review, setReview] = reactExports.useState([]);
  const [showConfetti, setShowConfetti] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  const { userId } = useSessionStore();
  const submitScore = useSubmitGameScore();
  const { data: backendQs = [] } = useQuestions({ qtype: QuestionType.game });
  const backendBoxMap = {};
  for (const q2 of backendQs) {
    const bid = q2.boxId != null ? Number(q2.boxId) : 1;
    if (!backendBoxMap[bid]) backendBoxMap[bid] = [];
    backendBoxMap[bid].push({
      text: q2.text,
      choices: q2.choices.map((c) => ({ text: c.text, correct: c.correct }))
    });
  }
  const getBoxQuestions = (id) => {
    const bq = backendBoxMap[id];
    return bq && bq.length > 0 ? bq : BOX_QUESTIONS[id] ?? [];
  };
  const questions = boxId ? getBoxQuestions(boxId) : [];
  const q = questions[qIdx];
  reactExports.useEffect(() => {
    var _a;
    if (!boxId || done || answered) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const currentQ = (_a = boxId ? getBoxQuestions(boxId) : []) == null ? void 0 : _a[qIdx];
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        var _a2;
        if (t <= 1) {
          clearInterval(timerRef.current);
          setAnswered(true);
          const correctChoice = ((_a2 = currentQ == null ? void 0 : currentQ.choices.find((c) => c.correct)) == null ? void 0 : _a2.text) ?? "";
          setReview((r) => [
            ...r,
            {
              question: (currentQ == null ? void 0 : currentQ.text) ?? "",
              chosen: "—",
              correct: correctChoice,
              wasCorrect: false,
              timeBonus: false
            }
          ]);
          return 0;
        }
        return t - 1;
      });
    }, 1e3);
    return () => clearInterval(timerRef.current);
  }, [boxId, qIdx, answered, done]);
  const handleChoice = (ci) => {
    var _a;
    if (answered) return;
    clearInterval(timerRef.current);
    const c = q.choices[ci];
    const timeBonus = timeLeft >= 15;
    const pts = c.correct ? timeBonus ? 10 : 5 : 0;
    setChosenIdx(ci);
    setAnswered(true);
    setScore((s) => s + pts);
    const correctChoice = ((_a = q.choices.find((ch) => ch.correct)) == null ? void 0 : _a.text) ?? "";
    setReview((r) => [
      ...r,
      {
        question: q.text,
        chosen: c.text,
        correct: correctChoice,
        wasCorrect: c.correct,
        timeBonus
      }
    ]);
  };
  const next = () => {
    if (qIdx + 1 >= questions.length) {
      const finalScore = score;
      setDone(true);
      if (finalScore >= questions.length * 7) setShowConfetti(true);
      submitScore.mutateAsync({
        userId,
        score: {
          boxId: BigInt(boxId),
          score: BigInt(finalScore),
          total: BigInt(questions.length * 10)
        }
      }).catch(() => {
      });
      return;
    }
    setQIdx((i) => i + 1);
    setAnswered(false);
    setChosenIdx(null);
    setTimeLeft(TIMER);
  };
  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setBoxId(null);
    setQIdx(0);
    setScore(0);
    setAnswered(false);
    setChosenIdx(null);
    setTimeLeft(TIMER);
    setDone(false);
    setReview([]);
    setShowConfetti(false);
  };
  const startBox = (id) => {
    setBoxId(id);
    setQIdx(0);
    setScore(0);
    setAnswered(false);
    setChosenIdx(null);
    setTimeLeft(TIMER);
    setDone(false);
    setReview([]);
  };
  const maxScore = questions.length * 10;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Confetti, { active: showConfetti }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto space-y-6 px-2",
        dir: "rtl",
        "data-ocid": "games.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "🎮" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "ألعاب الرواية" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            !boxId && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                className: "grid sm:grid-cols-3 gap-4",
                "data-ocid": "games.boxes_grid",
                children: BOXES.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    "data-ocid": `games.box.${i + 1}`,
                    whileHover: { scale: 1.04 },
                    whileTap: { scale: 0.97 },
                    onClick: () => startBox(b.id),
                    className: "group relative overflow-hidden rounded-2xl p-8 text-center shadow-md border border-border bg-card cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `absolute inset-0 bg-gradient-to-br ${b.color} opacity-10 group-hover:opacity-20 transition-smooth`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-3", children: b.emoji }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg text-foreground", children: b.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "5 أسئلة · 30 ثانية" })
                    ]
                  },
                  b.id
                ))
              },
              "boxes"
            ),
            done && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
                className: "bg-card border border-border rounded-2xl p-8 space-y-6",
                "data-ocid": "games.done_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-6xl mb-3", children: score >= maxScore * 0.8 ? "🏆" : score >= maxScore * 0.5 ? "👏" : "💪" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold text-primary", children: [
                      score,
                      " نقطة"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
                      "من أصل ",
                      maxScore,
                      " نقطة"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 w-full bg-muted rounded-full h-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "h-3 bg-primary rounded-full",
                        initial: { width: 0 },
                        animate: { width: `${score / maxScore * 100}%` },
                        transition: { duration: 1, ease: "easeOut" }
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground text-lg", children: "مراجعة الإجابات" }),
                    review.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, x: 20 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: review.indexOf(r) * 0.08 },
                        className: `rounded-xl border p-4 ${r.wasCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`,
                        "data-ocid": `games.review.item.${review.indexOf(r) + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1 line-clamp-2", children: r.question }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs flex-wrap", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: r.wasCorrect ? "text-green-700" : "text-red-600",
                                children: [
                                  "إجابتك: ",
                                  r.chosen
                                ]
                              }
                            ),
                            !r.wasCorrect && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-700", children: [
                              "الصحيحة: ",
                              r.correct
                            ] }),
                            r.wasCorrect && r.timeBonus && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-600 font-bold", children: "⚡ مكافأة السرعة!" })
                          ] })
                        ]
                      },
                      r.question.slice(0, 30)
                    ))
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "games.play_again",
                        onClick: () => startBox(boxId),
                        className: "flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-smooth",
                        children: "إعادة اللعب"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "games.back_to_boxes",
                        onClick: reset,
                        className: "flex-1 bg-muted text-foreground py-3 rounded-xl font-semibold hover:bg-muted/80 transition-smooth",
                        children: "اختر لعبة أخرى"
                      }
                    )
                  ] })
                ]
              },
              "done"
            ),
            boxId && !done && q && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -30 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 30 },
                className: "space-y-5",
                "data-ocid": "games.question_panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-card border border-border rounded-2xl px-5 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "السؤال" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground", children: [
                        qIdx + 1,
                        " / ",
                        questions.length
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TimerRing, { timeLeft }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "النقاط" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-primary text-lg", children: score })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 text-xs text-muted-foreground justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-green-100 text-green-700 px-2 py-0.5 rounded-full", children: "⚡ قبل 15ث = 10 نقاط" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full", children: "🕐 بعد 15ث = 5 نقاط" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-100 text-red-700 px-2 py-0.5 rounded-full", children: "✗ خطأ = 0 نقاط" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "bg-card border-2 border-primary/20 rounded-2xl p-6 shadow-sm",
                      initial: { scale: 0.97 },
                      animate: { scale: 1 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground leading-relaxed", children: q.text })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: q.choices.map((c, ci) => {
                    const choiceKey = `q${qIdx}-c${ci}`;
                    let cls = "relative text-right border-2 rounded-xl p-4 text-sm font-medium transition-smooth cursor-pointer ";
                    if (answered) {
                      if (c.correct) {
                        cls += "bg-green-50 border-green-400 text-green-800";
                      } else if (ci === chosenIdx) {
                        cls += "bg-red-50 border-red-400 text-red-700";
                      } else {
                        cls += "bg-card border-border text-muted-foreground opacity-50";
                      }
                    } else {
                      cls += "bg-card border-border text-foreground hover:border-primary hover:bg-primary/5 hover:shadow";
                    }
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.button,
                      {
                        type: "button",
                        "data-ocid": `games.choice.${ci + 1}`,
                        whileHover: answered ? {} : { scale: 1.02 },
                        whileTap: answered ? {} : { scale: 0.98 },
                        onClick: () => handleChoice(ci),
                        disabled: answered,
                        className: cls,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 text-xs text-muted-foreground", children: ["أ", "ب", "ج", "د"][ci] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.text }),
                          answered && c.correct && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 right-3 text-green-500", children: "✓" }),
                          answered && ci === chosenIdx && !c.correct && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 right-3 text-red-500", children: "✗" })
                        ]
                      },
                      choiceKey
                    );
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: answered && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      type: "button",
                      "data-ocid": "games.next_button",
                      onClick: next,
                      className: "w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-smooth",
                      children: qIdx + 1 >= questions.length ? "عرض النتيجة 🏁" : "السؤال التالي ←"
                    },
                    "next-btn"
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "games.back_button",
                      onClick: reset,
                      className: "w-full text-sm text-muted-foreground hover:text-foreground transition-smooth text-center",
                      children: "← العودة لاختيار اللعبة"
                    }
                  )
                ]
              },
              `q-${qIdx}`
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  Games as default
};
