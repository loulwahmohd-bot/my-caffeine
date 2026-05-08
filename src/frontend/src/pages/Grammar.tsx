import { Layout } from "@/components/Layout";
import { useQuestions } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { QuestionType } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
interface Choice {
  text: string;
  correct: boolean;
}

interface GrammarQuestion {
  id: number;
  text: string;
  choices: Choice[]; // 4 max; sliced by level
  explanation: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hardcoded questions — Level 1 → 2 choices | Level 2 → 3 | Level 3 → 4
// ─────────────────────────────────────────────────────────────────────────────
// Backend questions are preferred; QUESTIONS is used as fallback
const STATIC_GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  {
    id: 1,
    text: "كم نعامات شابة انضمت إلى السرب؟",
    choices: [
      { text: "ثلاث نعامات", correct: true },
      { text: "ثلاثة نعامات", correct: false },
      { text: "ثلاثون نعامة", correct: false },
      { text: "ثلاثًا من النعامات", correct: false },
    ],
    explanation: "النعامة مؤنث → العدد يُذكَّر: «ثلاث نعامات».",
  },
  {
    id: 2,
    text: "كم خيمات وجد هدارة مهجورة؟",
    choices: [
      { text: "ثلاث خيمات", correct: true },
      { text: "ثلاثة خيمات", correct: false },
      { text: "ثلاثًا من الخيمات", correct: false },
      { text: "ثلاثون خيمة", correct: false },
    ],
    explanation: "الخيمة مؤنث → العدد يُذكَّر: «ثلاث خيمات».",
  },
  {
    id: 3,
    text: "كم بيضات حمل هدارة معه مملوءة بالماء؟",
    choices: [
      { text: "ثلاث بيضات", correct: true },
      { text: "ثلاثة بيضات", correct: false },
      { text: "ثلاثة بيوض", correct: false },
      { text: "ثلاثًا من البيضات", correct: false },
    ],
    explanation: "البيضة مؤنث → العدد يُذكَّر: «ثلاث بيضات».",
  },
  {
    id: 4,
    text: "كم يومًا بحثت النعامات عن هدارة بعد أسره؟",
    choices: [
      { text: "يومان", correct: true },
      { text: "يومين", correct: false },
      { text: "يومٌ واحد", correct: false },
      { text: "اثنان من الأيام", correct: false },
    ],
    explanation: "«يومان» هو المثنى في حالة الرفع.",
  },
  {
    id: 5,
    text: "كم سنة عاش هدارة مع النعام قبل أن يعود للبشر؟",
    choices: [
      { text: "سبع سنوات", correct: true },
      { text: "سبعة سنوات", correct: false },
      { text: "سبعًا من السنوات", correct: false },
      { text: "سبعون سنة", correct: false },
    ],
    explanation: "السنة مؤنث → العدد يُذكَّر: «سبع سنوات».",
  },
  {
    id: 6,
    text: "كم رجلًا من الطوارق أخذوا صناديق المعدات؟",
    choices: [
      { text: "أربعة رجال", correct: true },
      { text: "أربع رجال", correct: false },
      { text: "أربعًا من الرجال", correct: false },
      { text: "أربعون رجلًا", correct: false },
    ],
    explanation: "الرجل مذكر → العدد يُؤنَّث: «أربعة رجال».",
  },
  {
    id: 7,
    text: "كم سيارة كانت مع فريق لوك أوكونر؟",
    choices: [
      { text: "ثلاث سيارات", correct: true },
      { text: "ثلاثة سيارات", correct: false },
      { text: "ثلاثًا من السيارات", correct: false },
      { text: "ثلاثون سيارة", correct: false },
    ],
    explanation: "السيارة مؤنث → العدد يُذكَّر: «ثلاث سيارات».",
  },
  {
    id: 8,
    text: "كم فرخ نعام ساعد هدارة على الخروج من الحفرة؟",
    choices: [
      { text: "ثلاث فراخ", correct: true },
      { text: "ثلاثة فراخ", correct: false },
      { text: "ثلاثة أفراخ", correct: false },
      { text: "ثلاثًا من الفراخ", correct: false },
    ],
    explanation: "الفرخة مؤنث → العدد يُذكَّر: «ثلاث فراخ».",
  },
  {
    id: 9,
    text: "كم غزالة كانت مع ظبيا عندما قابلها هدارة؟",
    choices: [
      { text: "ثلاث غزالات", correct: true },
      { text: "ثلاثة غزالات", correct: false },
      { text: "ثلاثًا من الغزالات", correct: false },
      { text: "ثلاثون غزالة", correct: false },
    ],
    explanation: "الغزالة مؤنث → العدد يُذكَّر: «ثلاث غزالات».",
  },
  {
    id: 10,
    text: "كم يومًا دام عرس هدارة وخروبة؟",
    choices: [
      { text: "سبعة أيام", correct: true },
      { text: "سبع أيام", correct: false },
      { text: "سبعًا من الأيام", correct: false },
      { text: "سبعون يومًا", correct: false },
    ],
    explanation: "اليوم مذكر → العدد يُؤنَّث: «سبعة أيام».",
  },
];

const LEVELS = [
  { id: 1, label: "🟢 سهل", sublabel: "خياران", choiceCount: 2 },
  { id: 2, label: "🟡 متوسط", sublabel: "ثلاثة خيارات", choiceCount: 3 },
  { id: 3, label: "🔴 صعب", sublabel: "أربعة خيارات", choiceCount: 4 },
];

const LETTERS = ["أ", "ب", "ج", "د"];

// ─────────────────────────────────────────────────────────────────────────────
// Self-contained question card
// ─────────────────────────────────────────────────────────────────────────────
function GrammarCard({
  question,
  index,
  choiceCount,
  onAnswer,
}: {
  question: GrammarQuestion;
  index: number;
  choiceCount: number;
  onAnswer: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const visible = question.choices.slice(0, choiceCount);

  const pick = (ci: number, correct: boolean) => {
    if (selected !== null) return;
    setSelected(ci);
    onAnswer(correct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.055 }}
      data-ocid={`grammar.question.${index + 1}`}
      className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4"
    >
      <p className="font-semibold text-foreground leading-relaxed">
        <span className="text-primary font-bold me-2">{index + 1}.</span>
        {question.text}
      </p>

      <div className="grid gap-2">
        {visible.map((choice, ci) => {
          const isSelected = selected === ci;
          const revealed = selected !== null;
          const base = cn(
            "w-full text-right px-4 py-2.5 rounded-lg border text-sm transition-colors duration-200 flex items-center gap-2",
            revealed
              ? choice.correct
                ? "bg-green-50 border-green-400 text-green-800 font-semibold"
                : isSelected
                  ? "bg-red-50 border-red-400 text-red-800"
                  : "bg-card border-border text-foreground opacity-50"
              : isSelected
                ? "bg-primary/10 border-primary text-foreground font-medium"
                : "bg-background border-border text-foreground hover:bg-muted hover:border-primary/40 cursor-pointer",
          );
          return (
            <button
              key={`grammar-${index}-${choice.text.slice(0, 8)}`}
              type="button"
              data-ocid={`grammar.choice.${index + 1}.${ci + 1}`}
              className={base}
              onClick={() => pick(ci, choice.correct)}
              disabled={selected !== null}
            >
              <span
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border",
                  revealed && choice.correct
                    ? "bg-green-500 border-green-500 text-white"
                    : revealed && isSelected && !choice.correct
                      ? "bg-red-500 border-red-500 text-white"
                      : "bg-muted border-border text-muted-foreground",
                )}
              >
                {LETTERS[ci]}
              </span>
              <span className="flex-1">{choice.text}</span>
              {revealed && choice.correct && (
                <span className="text-green-600">✓</span>
              )}
              {revealed && isSelected && !choice.correct && (
                <span className="text-red-500">✗</span>
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="expl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-900 space-y-1">
              <p className="font-bold text-amber-700">📖 القاعدة النحوية:</p>
              <p className="leading-relaxed">{question.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Grammar() {
  const [level, setLevel] = useState(1);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [remountKey, setRemountKey] = useState(0);

  const { data: backendQs = [] } = useQuestions({
    qtype: QuestionType.grammar,
  });
  const QUESTIONS: GrammarQuestion[] =
    backendQs.length > 0
      ? backendQs.map((q, idx) => ({
          id: idx + 1,
          text: q.text,
          choices: q.choices.map((c) => ({ text: c.text, correct: c.correct })),
          explanation: q.explanation ?? "",
        }))
      : STATIC_GRAMMAR_QUESTIONS;

  const choiceCount = LEVELS.find((l) => l.id === level)?.choiceCount ?? 2;
  const totalAnswered = Object.keys(answers).length;
  const score = Object.values(answers).filter(Boolean).length;
  const isComplete = totalAnswered === QUESTIONS.length;

  const changeLevel = (newLevel: number) => {
    setLevel(newLevel);
    setAnswers({});
    setRemountKey((k) => k + 1);
  };

  const reset = () => {
    setAnswers({});
    setRemountKey((k) => k + 1);
  };

  return (
    <Layout>
      <div
        className="max-w-2xl mx-auto space-y-6 pb-12"
        dir="rtl"
        data-ocid="grammar.page"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">العدد والمعدود</h1>
          <p className="text-muted-foreground text-sm mt-1">
            أسئلة من رواية «الولد الذي عاش مع النعام» — ١٠ أسئلة
          </p>
        </div>

        {/* Grammar rule banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-sm text-foreground leading-relaxed">
          <span className="font-bold text-primary">📚 القاعدة: </span>
          العدد (٣–١٠) يخالف المعدود في التذكير والتأنيث. [معدود مؤنث → عدد مذكر
          | معدود مذكر → عدد مؤنث]
        </div>

        {/* Level selector */}
        <div className="flex gap-2" data-ocid="grammar.level_filter">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              type="button"
              data-ocid={`grammar.level.${l.id}`}
              onClick={() => changeLevel(l.id)}
              className={cn(
                "flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 border",
                level === l.id
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border text-foreground hover:bg-muted",
              )}
            >
              <span className="block">{l.label}</span>
              <span
                className={cn(
                  "block text-xs mt-0.5",
                  level === l.id
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {l.sublabel}
              </span>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        {totalAnswered > 0 && !isComplete && (
          <div className="space-y-1" data-ocid="grammar.progress">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>تقدمك</span>
              <span>
                {totalAnswered}/{QUESTIONS.length}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(totalAnswered / QUESTIONS.length) * 100}%`,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        )}

        {/* Questions */}
        <div
          className="space-y-4"
          data-ocid="grammar.questions_list"
          key={remountKey}
        >
          {QUESTIONS.map((q, i) => (
            <GrammarCard
              key={`${level}-${q.id}`}
              question={q}
              index={i}
              choiceCount={choiceCount}
              onAnswer={(correct) =>
                setAnswers((prev) => ({ ...prev, [i]: correct }))
              }
            />
          ))}
        </div>

        {/* Score summary */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              key="score"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              data-ocid="grammar.success_state"
              className="bg-card border-2 border-primary/30 rounded-2xl p-6 text-center shadow-sm"
            >
              <p className="text-5xl mb-3">
                {score === QUESTIONS.length
                  ? "🏆"
                  : score >= QUESTIONS.length * 0.7
                    ? "⭐"
                    : "📚"}
              </p>
              <p className="text-3xl font-bold text-primary">
                {score}/{QUESTIONS.length}
              </p>
              <p className="text-muted-foreground mt-1 mb-4">
                {score === QUESTIONS.length
                  ? "ممتاز! أتقنتِ العدد والمعدود 🎉"
                  : score >= QUESTIONS.length * 0.7
                    ? "أحسنتِ! مستواكِ جيد جدًا"
                    : "حاولي مرة أخرى، أنتِ قادرة!"}
              </p>
              <button
                type="button"
                data-ocid="grammar.reset_button"
                onClick={reset}
                className="px-6 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                إعادة المحاولة
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
