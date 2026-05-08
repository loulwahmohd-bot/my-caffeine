import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CHAPTER_QUESTIONS } from "@/data/chapterQuestions";
import type { ChapterData } from "@/data/chapterQuestions";
import { useQuestions, useSubmitChapterProgress } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/progressStore";
import { useSessionStore } from "@/store/sessionStore";
import type { Choice, Question } from "@/types";
import { QuestionType } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Local display type ──────────────────────────────────────────────────────
interface LocalQuestion {
  id: string;
  text: string;
  difficulty: "easy" | "medium" | "hard";
  choices: Choice[];
}

function toLocalQuestion(q: Question): LocalQuestion {
  const lvl = q.level != null ? Number(q.level) : 2;
  const difficulty: "easy" | "medium" | "hard" =
    lvl <= 1 ? "easy" : lvl === 2 ? "medium" : "hard";
  return { id: String(q.id), text: q.text, difficulty, choices: q.choices };
}

// ─── Types ────────────────────────────────────────────────────────────────
type AnswerState = { selected: number | null; revealed: boolean };

// ─── Difficulty helpers ───────────────────────────────────────────────────────────────
const DIFF_CONFIG = {
  easy: { label: "سهل", bg: "bg-green-100 text-green-800" },
  medium: { label: "متوسط", bg: "bg-amber-100 text-amber-800" },
  hard: { label: "صعب", bg: "bg-red-100 text-red-800" },
} as const;

const ARABIC_LETTERS = ["أ", "ب", "ج", "د"] as const;

// ─── QuizView (one chapter) ────────────────────────────────────────────────────────
function QuizView({
  questions,
  onFinish,
}: {
  questions: LocalQuestion[];
  onFinish: (score: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>(
    questions.map(() => ({ selected: null, revealed: false })),
  );

  const q: LocalQuestion = questions[idx];
  const ans = answers[idx];
  const totalAnswered = answers.filter((a) => a.revealed).length;
  const score = answers.filter(
    (a, i) => a.revealed && questions[i].choices[a.selected ?? -1]?.correct,
  ).length;

  const handleSelect = (ci: number) => {
    if (ans.revealed) return;
    setAnswers((prev) =>
      prev.map((a, i) => (i === idx ? { selected: ci, revealed: true } : a)),
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
  const isCorrectAnswer = q.choices[ans.selected ?? -1]?.correct;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            السؤال {idx + 1} من {questions.length}
          </span>
          <span className="font-medium text-foreground">
            {totalAnswered} / {questions.length} أُجيب
          </span>
        </div>
        <Progress
          data-ocid="chapter.quiz.progress"
          value={(totalAnswered / questions.length) * 100}
          className="h-2"
        />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5"
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-semibold px-2.5 py-0.5 rounded-full",
                diff.bg,
              )}
            >
              {diff.label}
            </span>
            <span className="text-xs text-muted-foreground">
              سؤال {idx + 1}
            </span>
          </div>

          <p
            data-ocid={`chapter.question.text.${idx + 1}`}
            className="text-base font-semibold text-foreground leading-relaxed"
          >
            {q.text}
          </p>

          <div className="grid gap-2.5">
            {q.choices.map((choice, ci) => {
              const isSelected = ans.selected === ci;
              const isCorrect = choice.correct;
              let cls =
                "w-full text-right px-4 py-3 rounded-xl border text-sm font-medium transition-smooth cursor-pointer ";

              if (ans.revealed) {
                if (isCorrect)
                  cls += "bg-green-50 border-green-400 text-green-800";
                else if (isSelected && !isCorrect)
                  cls += "bg-red-50 border-red-400 text-red-700";
                else
                  cls +=
                    "bg-background border-border text-foreground opacity-50";
              } else if (isSelected) {
                cls += "bg-primary/10 border-primary text-foreground";
              } else {
                cls +=
                  "bg-background border-border text-foreground hover:bg-muted hover:border-primary/40";
              }

              return (
                <button
                  key={`q${q.id}-c${ci}`}
                  type="button"
                  data-ocid={`chapter.choice.${ci + 1}`}
                  className={cls}
                  onClick={() => handleSelect(ci)}
                  disabled={ans.revealed}
                >
                  <span className="font-bold me-2">{ARABIC_LETTERS[ci]}</span>
                  {choice.text}
                </button>
              );
            })}
          </div>

          {ans.revealed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between pt-2"
            >
              <span
                className={cn(
                  "text-sm font-semibold",
                  isCorrectAnswer ? "text-green-700" : "text-red-600",
                )}
              >
                {isCorrectAnswer ? "✅ إجابة صحيحة!" : "❌ إجابة خاطئة"}
              </span>
              <Button
                data-ocid="chapter.next_button"
                size="sm"
                onClick={handleNext}
              >
                {allDone ? "عرض النتيجة" : "السؤال التالي →"}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {totalAnswered > 0 && !allDone && (
        <p className="text-center text-sm text-muted-foreground">
          الإجابات الصحيحة حتى الآن:{" "}
          <span className="font-bold text-primary">{score}</span>
        </p>
      )}
    </div>
  );
}

// ─── ResultView ────────────────────────────────────────────────────────────────
function ResultView({
  questionsCount,
  score,
  onBack,
}: {
  questionsCount: number;
  score: number;
  onBack: () => void;
}) {
  const total = questionsCount;
  const pct = Math.round((score / total) * 100);
  const emoji =
    score === total ? "🏆" : score >= 4 ? "⭐" : score >= 2 ? "📖" : "💪";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-sm mx-auto text-center space-y-5"
    >
      <div className="text-6xl">{emoji}</div>
      <div>
        <h3 className="text-2xl font-bold text-foreground">
          {score} / {total}
        </h3>
        <p className="text-muted-foreground mt-1">
          نسبة الإجابات الصحيحة: {pct}%
        </p>
      </div>
      <Progress value={pct} className="h-3 rounded-full" />
      <p className="text-sm text-muted-foreground">
        {score === total
          ? "ممتاز! أجبت على جميع الأسئلة بصواب 🎉"
          : score >= 4
            ? "عمل رائع! كادت تكون مثالية ✨"
            : score >= 2
              ? "جيد! استمري في القراءة 📚"
              : "لا بأس، حاولي مجددًا 💙"}
      </p>
      <Button
        data-ocid="chapter.back_to_chapters_button"
        variant="outline"
        onClick={onBack}
        className="w-full"
      >
        ← العودة إلى الفصول
      </Button>
    </motion.div>
  );
}

// ─── ChapterCard ────────────────────────────────────────────────────────────────
function ChapterCard({
  chapter,
  questions,
  progress,
  index,
  onClick,
}: {
  chapter: ChapterData;
  questions: LocalQuestion[];
  progress: { score: number; completed: boolean } | undefined;
  index: number;
  onClick: () => void;
}) {
  const easy = questions.filter((q) => q.difficulty === "easy").length;
  const med = questions.filter((q) => q.difficulty === "medium").length;
  const hard = questions.filter((q) => q.difficulty === "hard").length;
  const total = questions.length;

  return (
    <motion.button
      type="button"
      data-ocid={`chapters.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 6) * 0.06 }}
      whileHover={{ scale: 1.02 }}
      className="w-full text-right bg-card border border-border rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-primary/40 transition-smooth cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
          {chapter.id}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
            {chapter.title}
          </h3>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        {progress?.completed ? (
          <>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">النتيجة</span>
              <span className="font-bold text-primary">
                {progress.score} / {total}
              </span>
            </div>
            <Progress
              value={(progress.score / total) * 100}
              className="h-1.5"
            />
          </>
        ) : (
          <p className="text-xs text-muted-foreground">لم تُحَل بعد</p>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="text-xs bg-green-50 text-green-700 rounded-full px-2 py-0.5 font-medium">
          {easy} سهل
        </span>
        <span className="text-xs bg-amber-50 text-amber-700 rounded-full px-2 py-0.5 font-medium">
          {med} متوسط
        </span>
        <span className="text-xs bg-red-50 text-red-700 rounded-full px-2 py-0.5 font-medium">
          {hard} صعب
        </span>
      </div>
    </motion.button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Chapters() {
  const { chapterProgress, setChapterProgress } = useProgressStore();
  const { userId } = useSessionStore();
  const submitProgress = useSubmitChapterProgress();

  // Fetch all chapter questions from backend; fall back to static data per chapter
  const { data: backendQs = [] } = useQuestions({
    qtype: QuestionType.chapter,
  });
  const chapterQsMap = new Map<number, LocalQuestion[]>();
  for (const q of backendQs) {
    const cid = q.chapterId != null ? Number(q.chapterId) : 0;
    if (!chapterQsMap.has(cid)) chapterQsMap.set(cid, []);
    chapterQsMap.get(cid)!.push(toLocalQuestion(q));
  }

  const [activeChapter, setActiveChapter] = useState<ChapterData | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<LocalQuestion[]>([]);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  function getChapterQuestions(ch: ChapterData): LocalQuestion[] {
    const bq = chapterQsMap.get(ch.id);
    if (bq && bq.length > 0) return bq;
    // Fall back to static data
    return ch.questions.map((q) => ({
      id: String(q.id),
      text: q.text,
      difficulty: q.difficulty,
      choices: q.choices.map((c) => ({
        id: BigInt(c.id),
        text: c.text,
        correct: c.correct,
      })),
    }));
  }

  const handleOpenChapter = (ch: ChapterData) => {
    setActiveChapter(ch);
    setActiveQuestions(getChapterQuestions(ch));
    setQuizScore(null);
  };

  const handleFinishQuiz = (score: number) => {
    if (!activeChapter) return;
    setQuizScore(score);
    setChapterProgress(activeChapter.id, score);
    if (userId) {
      submitProgress.mutate({
        userId,
        progress: {
          chapterId: BigInt(activeChapter.id),
          score: BigInt(score),
          completed: true,
        },
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

  return (
    <Layout>
      <div
        className="min-h-screen bg-background px-4 py-6 max-w-4xl mx-auto"
        data-ocid="chapters.page"
      >
        {/* Chapter list */}
        {!activeChapter && (
          <>
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">
                  أسئلة الفصول 📚
                </h1>
                <Badge
                  data-ocid="chapters.progress.badge"
                  variant="secondary"
                  className="text-xs"
                >
                  {completedCount} / {totalChapters} مكتمل
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                اختاري فصلاً للإجابة على أسئلته — كل فصل يحتوي على 6 أسئلة متدرجة
              </p>
              <div className="pt-2">
                <Progress
                  data-ocid="chapters.overall.progress"
                  value={(completedCount / totalChapters) * 100}
                  className="h-2"
                />
              </div>
            </div>

            <div
              data-ocid="chapters.list"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {CHAPTER_QUESTIONS.map((ch, i) => (
                <ChapterCard
                  key={ch.id}
                  chapter={ch}
                  questions={getChapterQuestions(ch)}
                  progress={chapterProgress.find((p) => p.chapterId === ch.id)}
                  index={i}
                  onClick={() => handleOpenChapter(ch)}
                />
              ))}
            </div>
          </>
        )}

        {/* Quiz mode */}
        {activeChapter && quizScore === null && (
          <>
            <div className="mb-6 flex items-center gap-3">
              <Button
                type="button"
                data-ocid="chapter.back_button"
                variant="ghost"
                size="sm"
                onClick={handleBack}
              >
                ← عودة
              </Button>
              <div>
                <p className="text-xs text-muted-foreground">
                  الفصل {activeChapter.id}
                </p>
                <h2 className="text-lg font-bold text-foreground leading-tight">
                  {activeChapter.title}
                </h2>
              </div>
            </div>
            <QuizView questions={activeQuestions} onFinish={handleFinishQuiz} />
          </>
        )}

        {/* Result mode */}
        {activeChapter && quizScore !== null && (
          <>
            <div className="mb-8 text-center">
              <p className="text-xs text-muted-foreground">
                الفصل {activeChapter.id}
              </p>
              <h2 className="text-xl font-bold text-foreground">
                {activeChapter.title}
              </h2>
            </div>
            <ResultView
              questionsCount={activeQuestions.length}
              score={quizScore}
              onBack={handleBack}
            />
          </>
        )}
      </div>
    </Layout>
  );
}
