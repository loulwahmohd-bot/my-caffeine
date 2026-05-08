import { Layout } from "@/components/Layout";
import { useQuestions, useSubmitGameScore } from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";
import { QuestionType } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────
interface Choice {
  text: string;
  correct: boolean;
}
interface GameQuestion {
  text: string;
  choices: Choice[];
}
interface ReviewItem {
  question: string;
  chosen: string;
  correct: string;
  wasCorrect: boolean;
  timeBonus: boolean;
}

// ─── Hardcoded Questions ──────────────────────────────
const BOX_QUESTIONS: Record<number, GameQuestion[]> = {
  1: [
    {
      text: "هرب هدارة من القافلة لأنه شعر أن البشر ______",
      choices: [
        { text: "يريدون مساعدته", correct: false },
        { text: "سيؤذونه", correct: false },
        { text: "سيقتلونه مثل الحيوانات", correct: true },
        { text: "لا يهتمون به", correct: false },
      ],
    },
    {
      text: "كانت النعامات تظلّل هدارة من الشمس لأنها ______",
      choices: [
        { text: "تخاف منه", correct: false },
        { text: "تحبه", correct: true },
        { text: "تريد طعامه", correct: false },
        { text: "تظنه نعامة", correct: false },
      ],
    },
    {
      text: "شعر هدارة بالخوف عندما رأى والده يذبح الغنمة لأن منظر الدم ______",
      choices: [
        { text: "أزعجه", correct: true },
        { text: "أسعده", correct: false },
        { text: "جعله يضحك", correct: false },
        { text: "جعله يركض نحو الذبيحة", correct: false },
      ],
    },
    {
      text: "ركضت النعامات خلف القافلة يومين لأنها كانت تريد ______",
      choices: [
        { text: "الطعام", correct: false },
        { text: "الماء", correct: false },
        { text: "استعادة هدارة", correct: true },
        { text: "الهرب من الصحراء", correct: false },
      ],
    },
    {
      text: "شعر هدارة بالارتباك عندما سمع البشر يتحدثون لأنه لا يفهم الكلمات بل يفهم ______",
      choices: [
        { text: "المعنى", correct: false },
        { text: "النبرة", correct: true },
        { text: "اللغة", correct: false },
        { text: "الإشارات", correct: false },
      ],
    },
  ],
  2: [
    {
      text: "عندما ساعد هدارة اللبؤة الصغيرة رغم خوفه، فهذا يدل على أنه:",
      choices: [
        { text: "أناني", correct: false },
        { text: "شجاع", correct: true },
        { text: "غاضب", correct: false },
        { text: "متردد", correct: false },
      ],
    },
    {
      text: "عندما ظللت النعامات هدارة من الشمس، فهذا يدل على:",
      choices: [
        { text: "قسوتها", correct: false },
        { text: "حنانها", correct: true },
        { text: "غضبها", correct: false },
        { text: "أنانيتها", correct: false },
      ],
    },
    {
      text: "عندما أصرّ لوك على تصوير هدارة رغم فشل المعدات، فهذا يدل على:",
      choices: [
        { text: "طيبته", correct: false },
        { text: "طمعه", correct: true },
        { text: "خوفه", correct: false },
        { text: "جهله", correct: false },
      ],
    },
    {
      text: "عندما خافت خروبة على هدارة من البشر، فهذا يدل على:",
      choices: [
        { text: "عصبيتها", correct: false },
        { text: "حكمتها", correct: true },
        { text: "قسوتها", correct: false },
        { text: "ترددها", correct: false },
      ],
    },
    {
      text: "عندما هرب هدارة بسرعة دون تفكير، فهذا يدل على:",
      choices: [
        { text: "العجلة", correct: true },
        { text: "الهدوء", correct: false },
        { text: "اللطف", correct: false },
        { text: "الشجاعة", correct: false },
      ],
    },
  ],
  3: [
    {
      text: "عندما رفض هدارة ترك اللبؤة الصغيرة، فهذا يدل على:",
      choices: [
        { text: "الرحمة", correct: true },
        { text: "الأنانية", correct: false },
        { text: "العصبية", correct: false },
        { text: "التردد", correct: false },
      ],
    },
    {
      text: "عندما حاول بوبوط الإمساك بهدارة بالقوة، فهذا يدل على:",
      choices: [
        { text: "لطفه", correct: false },
        { text: "قسوته", correct: true },
        { text: "شجاعته", correct: false },
        { text: "حكمته", correct: false },
      ],
    },
    {
      text: "عندما ركضت النعامات خلف القافلة يومين، فهذا يدل على:",
      choices: [
        { text: "غضبها", correct: false },
        { text: "وفائها", correct: true },
        { text: "أنانيتها", correct: false },
        { text: "خوفها", correct: false },
      ],
    },
    {
      text: "عندما ساعدت خروبة هدارة على الكلام، فهذا يدل على:",
      choices: [
        { text: "صبرها", correct: true },
        { text: "عصبيتها", correct: false },
        { text: "قسوتها", correct: false },
        { text: "ترددها", correct: false },
      ],
    },
    {
      text: "عندما كان هدارة يهرب من البشر دائمًا، فهذا يدل على:",
      choices: [
        { text: "ثقته بهم", correct: false },
        { text: "خوفه منهم", correct: true },
        { text: "حبه لهم", correct: false },
        { text: "رغبته في العيش معهم", correct: false },
      ],
    },
  ],
};

const BOXES = [
  {
    id: 1,
    emoji: "💬",
    label: "أكمل الفراغ",
    color: "from-amber-400 to-orange-400",
  },
  {
    id: 2,
    emoji: "🎭",
    label: "صفات الشخصيات",
    color: "from-rose-400 to-pink-400",
  },
  {
    id: 3,
    emoji: "⚡",
    label: "تصرفات ودلالاتها",
    color: "from-violet-400 to-purple-400",
  },
];

const TIMER = 30;

// ─── Confetti Particle ────────────────────────────────
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ["#f59e0b", "#ef4444", "#8b5cf6", "#10b981", "#3b82f6", "#f97316"][
      Math.floor(Math.random() * 6)
    ],
    size: 8 + Math.random() * 8,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: 720 }}
          transition={{ duration: 2.5, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

// ─── Timer Ring ───────────────────────────────────────
function TimerRing({ timeLeft }: { timeLeft: number }) {
  const radius = 36;
  const circ = 2 * Math.PI * radius;
  const progress = (timeLeft / TIMER) * circ;
  const color =
    timeLeft > 15 ? "#22c55e" : timeLeft > 8 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg
        className="absolute inset-0 -rotate-90"
        width="96"
        height="96"
        aria-label="عداد الوقت"
        role="img"
      >
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circ}
          strokeDashoffset={circ - progress}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
        />
      </svg>
      <span className="text-2xl font-bold z-10" style={{ color }}>
        {timeLeft}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────
export default function Games() {
  const [boxId, setBoxId] = useState<number | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosenIdx, setChosenIdx] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER);
  const [done, setDone] = useState(false);
  const [review, setReview] = useState<ReviewItem[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { userId } = useSessionStore();
  const submitScore = useSubmitGameScore();

  // Load questions from backend; fall back to static data per boxId
  const { data: backendQs = [] } = useQuestions({ qtype: QuestionType.game });
  const backendBoxMap: Record<number, GameQuestion[]> = {};
  for (const q of backendQs) {
    const bid = q.boxId != null ? Number(q.boxId) : 1;
    if (!backendBoxMap[bid]) backendBoxMap[bid] = [];
    backendBoxMap[bid].push({
      text: q.text,
      choices: q.choices.map((c) => ({ text: c.text, correct: c.correct })),
    });
  }
  const getBoxQuestions = (id: number): GameQuestion[] => {
    const bq = backendBoxMap[id];
    return bq && bq.length > 0 ? bq : (BOX_QUESTIONS[id] ?? []);
  };
  const questions = boxId ? getBoxQuestions(boxId) : [];
  const q = questions[qIdx];

  // Start/reset timer on new question
  // biome-ignore lint/correctness/useExhaustiveDependencies: getBoxQuestions depends only on stable backendQs/BOX_QUESTIONS
  useEffect(() => {
    if (!boxId || done || answered) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const currentQ = (boxId ? getBoxQuestions(boxId) : [])?.[qIdx];
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setAnswered(true);
          const correctChoice =
            currentQ?.choices.find((c) => c.correct)?.text ?? "";
          setReview((r) => [
            ...r,
            {
              question: currentQ?.text ?? "",
              chosen: "—",
              correct: correctChoice,
              wasCorrect: false,
              timeBonus: false,
            },
          ]);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [boxId, qIdx, answered, done]);

  const handleChoice = (ci: number) => {
    if (answered) return;
    clearInterval(timerRef.current!);
    const c = q.choices[ci];
    const timeBonus = timeLeft >= 15;
    const pts = c.correct ? (timeBonus ? 10 : 5) : 0;
    setChosenIdx(ci);
    setAnswered(true);
    setScore((s) => s + pts);
    const correctChoice = q.choices.find((ch) => ch.correct)?.text ?? "";
    setReview((r) => [
      ...r,
      {
        question: q.text,
        chosen: c.text,
        correct: correctChoice,
        wasCorrect: c.correct,
        timeBonus,
      },
    ]);
  };

  const next = () => {
    if (qIdx + 1 >= questions.length) {
      const finalScore = score;
      setDone(true);
      if (finalScore >= questions.length * 7) setShowConfetti(true);
      submitScore
        .mutateAsync({
          userId,
          score: {
            boxId: BigInt(boxId!),
            score: BigInt(finalScore),
            total: BigInt(questions.length * 10),
          },
        })
        .catch(() => {});
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

  const startBox = (id: number) => {
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

  return (
    <Layout>
      <Confetti active={showConfetti} />
      <div
        className="max-w-2xl mx-auto space-y-6 px-2"
        dir="rtl"
        data-ocid="games.page"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎮</span>
          <h1 className="text-2xl font-bold text-foreground">ألعاب الرواية</h1>
        </div>

        {/* ── Box Selection ── */}
        <AnimatePresence mode="wait">
          {!boxId && (
            <motion.div
              key="boxes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid sm:grid-cols-3 gap-4"
              data-ocid="games.boxes_grid"
            >
              {BOXES.map((b, i) => (
                <motion.button
                  key={b.id}
                  type="button"
                  data-ocid={`games.box.${i + 1}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => startBox(b.id)}
                  className="group relative overflow-hidden rounded-2xl p-8 text-center shadow-md border border-border bg-card cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-10 group-hover:opacity-20 transition-smooth`}
                  />
                  <p className="text-5xl mb-3">{b.emoji}</p>
                  <p className="font-bold text-lg text-foreground">{b.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    5 أسئلة · 30 ثانية
                  </p>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* ── Done / Results ── */}
          {done && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-2xl p-8 space-y-6"
              data-ocid="games.done_state"
            >
              <div className="text-center">
                <p className="text-6xl mb-3">
                  {score >= maxScore * 0.8
                    ? "🏆"
                    : score >= maxScore * 0.5
                      ? "👏"
                      : "💪"}
                </p>
                <p className="text-4xl font-bold text-primary">{score} نقطة</p>
                <p className="text-muted-foreground mt-1">
                  من أصل {maxScore} نقطة
                </p>
                <div className="mt-4 w-full bg-muted rounded-full h-3">
                  <motion.div
                    className="h-3 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / maxScore) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Review */}
              <div className="space-y-3">
                <h2 className="font-bold text-foreground text-lg">
                  مراجعة الإجابات
                </h2>
                {review.map((r) => (
                  <motion.div
                    key={r.question.slice(0, 30)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: review.indexOf(r) * 0.08 }}
                    className={`rounded-xl border p-4 ${
                      r.wasCorrect
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                    data-ocid={`games.review.item.${review.indexOf(r) + 1}`}
                  >
                    <p className="text-sm font-medium text-foreground mb-1 line-clamp-2">
                      {r.question}
                    </p>
                    <div className="flex gap-4 text-xs flex-wrap">
                      <span
                        className={
                          r.wasCorrect ? "text-green-700" : "text-red-600"
                        }
                      >
                        إجابتك: {r.chosen}
                      </span>
                      {!r.wasCorrect && (
                        <span className="text-green-700">
                          الصحيحة: {r.correct}
                        </span>
                      )}
                      {r.wasCorrect && r.timeBonus && (
                        <span className="text-amber-600 font-bold">
                          ⚡ مكافأة السرعة!
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  data-ocid="games.play_again"
                  onClick={() => startBox(boxId!)}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-smooth"
                >
                  إعادة اللعب
                </button>
                <button
                  type="button"
                  data-ocid="games.back_to_boxes"
                  onClick={reset}
                  className="flex-1 bg-muted text-foreground py-3 rounded-xl font-semibold hover:bg-muted/80 transition-smooth"
                >
                  اختر لعبة أخرى
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Active Game ── */}
          {boxId && !done && q && (
            <motion.div
              key={`q-${qIdx}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="space-y-5"
              data-ocid="games.question_panel"
            >
              {/* Header bar */}
              <div className="flex items-center justify-between bg-card border border-border rounded-2xl px-5 py-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">السؤال</p>
                  <p className="font-bold text-foreground">
                    {qIdx + 1} / {questions.length}
                  </p>
                </div>
                <TimerRing timeLeft={timeLeft} />
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">النقاط</p>
                  <p className="font-bold text-primary text-lg">{score}</p>
                </div>
              </div>

              {/* Scoring hint */}
              <div className="flex gap-2 text-xs text-muted-foreground justify-center">
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  ⚡ قبل 15ث = 10 نقاط
                </span>
                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  🕐 بعد 15ث = 5 نقاط
                </span>
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                  ✗ خطأ = 0 نقاط
                </span>
              </div>

              {/* Question card */}
              <motion.div
                className="bg-card border-2 border-primary/20 rounded-2xl p-6 shadow-sm"
                initial={{ scale: 0.97 }}
                animate={{ scale: 1 }}
              >
                <p className="text-lg font-bold text-foreground leading-relaxed">
                  {q.text}
                </p>
              </motion.div>

              {/* Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.choices.map((c, ci) => {
                  const choiceKey = `q${qIdx}-c${ci}`;
                  let cls =
                    "relative text-right border-2 rounded-xl p-4 text-sm font-medium transition-smooth cursor-pointer ";
                  if (answered) {
                    if (c.correct) {
                      cls += "bg-green-50 border-green-400 text-green-800";
                    } else if (ci === chosenIdx) {
                      cls += "bg-red-50 border-red-400 text-red-700";
                    } else {
                      cls +=
                        "bg-card border-border text-muted-foreground opacity-50";
                    }
                  } else {
                    cls +=
                      "bg-card border-border text-foreground hover:border-primary hover:bg-primary/5 hover:shadow";
                  }
                  return (
                    <motion.button
                      key={choiceKey}
                      type="button"
                      data-ocid={`games.choice.${ci + 1}`}
                      whileHover={answered ? {} : { scale: 1.02 }}
                      whileTap={answered ? {} : { scale: 0.98 }}
                      onClick={() => handleChoice(ci)}
                      disabled={answered}
                      className={cls}
                    >
                      <span className="absolute top-3 left-3 text-xs text-muted-foreground">
                        {["أ", "ب", "ج", "د"][ci]}
                      </span>
                      <span>{c.text}</span>
                      {answered && c.correct && (
                        <span className="absolute top-3 right-3 text-green-500">
                          ✓
                        </span>
                      )}
                      {answered && ci === chosenIdx && !c.correct && (
                        <span className="absolute top-3 right-3 text-red-500">
                          ✗
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Next button */}
              <AnimatePresence>
                {answered && (
                  <motion.button
                    key="next-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    type="button"
                    data-ocid="games.next_button"
                    onClick={next}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-smooth"
                  >
                    {qIdx + 1 >= questions.length
                      ? "عرض النتيجة 🏁"
                      : "السؤال التالي ←"}
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Back */}
              <button
                type="button"
                data-ocid="games.back_button"
                onClick={reset}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-smooth text-center"
              >
                ← العودة لاختيار اللعبة
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
