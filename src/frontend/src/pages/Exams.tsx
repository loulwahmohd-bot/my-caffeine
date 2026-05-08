import { Layout } from "@/components/Layout";
import { EXAM_LEVELS, getStars } from "@/data/examQuestions";
import type { ExamLevel, ExamQuestion } from "@/data/examQuestions";
import { useQuestions, useSubmitExamScore } from "@/hooks/useBackend";
import { useProgressStore } from "@/store/progressStore";
import { useSessionStore } from "@/store/sessionStore";
import { QuestionType } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─ تخزين أفضل نتيجة محليًا ──────────────────────────────
const STORAGE_KEY = "ostrich_exam_best";
type BestScores = Record<number, { score: number; stars: number }>;

function loadBest(): BestScores {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}
function saveBest(b: BestScores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(b));
}

// ─ مكون النجوم ─────────────────────────────────────────
function Stars({ count, size = "text-2xl" }: { count: number; size?: string }) {
  return (
    <span className="flex gap-0.5 justify-center" aria-label={`${count} نجوم`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`${size} transition-transform duration-300 ${i <= count ? "text-yellow-400 scale-110" : "text-muted/30"}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

// ─ معاينة الوقت ─────────────────────────────────────────
const EXAM_DURATION = 15 * 60; // 15 minutes in seconds

function Timer({ seconds }: { seconds: number }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isWarning = seconds <= 120;
  const isCritical = seconds <= 30;
  return (
    <div
      className={`font-mono text-lg font-bold px-4 py-2 rounded-xl border-2 transition-colors ${
        isCritical
          ? "border-rose-400 bg-rose-50 text-rose-600 animate-pulse"
          : isWarning
            ? "border-amber-400 bg-amber-50 text-amber-700"
            : "border-border bg-card text-foreground"
      }`}
      data-ocid="exams.timer"
    >
      ⏱ {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}

// ─ بطاقة مستوى ──────────────────────────────────────────
function LevelCard({
  lvl,
  best,
  index,
  onClick,
}: {
  lvl: ExamLevel;
  best: BestScores;
  index: number;
  onClick: () => void;
}) {
  const b = best[lvl.level];
  return (
    <button
      type="button"
      data-ocid={`exams.level.${index + 1}`}
      onClick={onClick}
      className={`relative border-2 rounded-2xl p-5 text-right hover:scale-[1.03] active:scale-[0.99] transition-all duration-200 shadow-sm hover:shadow-md ${lvl.color} w-full`}
    >
      {/* شارة المستوى */}
      <div className="absolute top-3 left-3">
        <span className="text-3xl opacity-20 font-black select-none">
          {lvl.level}
        </span>
      </div>

      {/* النجوم إذا أتم */}
      {b && (
        <div className="absolute top-3 right-3">
          <Stars count={b.stars} size="text-base" />
        </div>
      )}

      <div className="mt-4">
        <p className="font-bold text-lg leading-snug">{lvl.label}</p>
        <p className="text-sm mt-0.5 opacity-75">{lvl.description}</p>
      </div>

      {b ? (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs bg-white/50 rounded-lg px-2 py-0.5 font-semibold">
            أفضل: {b.score}/15
          </span>
          <span className="text-xs opacity-60">اضغطي للمحاولة مجدداً</span>
        </div>
      ) : (
        <div className="mt-3">
          <span className="text-xs opacity-60">لم تُحَل بعد</span>
        </div>
      )}
    </button>
  );
}

// ─ سؤال اختبار ──────────────────────────────────────────
function QuestionItem({
  q,
  index,
  selected,
  revealed,
  onSelect,
}: {
  q: ExamQuestion;
  index: number;
  selected: number | null;
  revealed: boolean;
  onSelect: (i: number) => void;
}) {
  const ARABIC_LETTERS = ["أ", "ب", "ج", "د"];
  return (
    <div
      className="bg-card border border-border rounded-2xl p-4 shadow-sm"
      data-ocid={`exams.question.${index + 1}`}
    >
      <p className="font-semibold text-foreground mb-3 leading-relaxed">
        <span className="text-primary font-bold ml-1">{index + 1}.</span>{" "}
        {q.text}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {q.choices.map((choice, ci) => {
          const isSelected = selected === ci;
          const isCorrect = ci === q.correctIndex;
          let style =
            "border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5";
          if (revealed) {
            if (isCorrect)
              style =
                "border-emerald-400 bg-emerald-50 text-emerald-800 font-semibold";
            else if (isSelected && !isCorrect)
              style = "border-rose-400 bg-rose-50 text-rose-700";
          } else if (isSelected) {
            style = "border-primary bg-primary/10 text-primary font-semibold";
          }
          return (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: choices are stable
              key={ci}
              type="button"
              data-ocid={`exams.choice.${index + 1}.${ci + 1}`}
              disabled={revealed}
              onClick={() => onSelect(ci)}
              className={`border-2 rounded-xl p-3 text-right transition-all duration-150 text-sm flex items-start gap-2 ${style} ${
                revealed ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span className="font-bold text-muted-foreground/60 min-w-[1.2rem] text-center">
                {ARABIC_LETTERS[ci]}
              </span>
              <span className="flex-1 min-w-0">{choice}</span>
              {revealed && isCorrect && (
                <span className="text-emerald-600 text-base">✓</span>
              )}
              {revealed && isSelected && !isCorrect && (
                <span className="text-rose-500 text-base">✗</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─ المكون الرئيسي ──────────────────────────────────────────
export default function Exams() {
  const [best, setBest] = useState<BestScores>(loadBest);
  const [activeLvl, setActiveLvl] = useState<ExamLevel | null>(null);
  // selected[i] = index of chosen choice for question i
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { userId } = useSessionStore();
  const submitExam = useSubmitExamScore();
  const { setChapterProgress } = useProgressStore();

  // Load questions from backend; fall back to static data if backend empty
  const { data: backendQs = [] } = useQuestions({ qtype: QuestionType.exam });
  const levelMap = new Map<number, ExamQuestion[]>();
  for (const q of backendQs) {
    const lv = q.level != null ? Number(q.level) : 1;
    const correctIndex = q.choices.findIndex((c) => c.correct);
    const eq: ExamQuestion = {
      id: Number(q.id),
      text: q.text,
      choices: q.choices.map((c) => c.text),
      correctIndex: correctIndex >= 0 ? correctIndex : 0,
    };
    if (!levelMap.has(lv)) levelMap.set(lv, []);
    levelMap.get(lv)!.push(eq);
  }
  const ACTIVE_EXAM_LEVELS: ExamLevel[] = EXAM_LEVELS.map((lvl) => ({
    ...lvl,
    questions: levelMap.get(lvl.level)?.length
      ? (levelMap.get(lvl.level) ?? lvl.questions)
      : lvl.questions,
  }));

  // تشغيل المؤقت
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(EXAM_DURATION);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // إيقاف المؤقت عند انتهاء الوقت تلقائياً
  useEffect(() => {
    if (timeLeft === 0 && activeLvl && !revealed) {
      handleSubmit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, activeLvl, revealed]);

  // تنظيف عند unmount
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const handleSelectLevel = (lvl: ExamLevel) => {
    setActiveLvl(lvl);
    setSelected({});
    setRevealed(false);
    setFinalScore(null);
    startTimer();
  };

  const handleSelect = (qIdx: number, choiceIdx: number) => {
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
    // حفظ أفضل نتيجة
    const updated = { ...best };
    const prev = best[activeLvl.level];
    if (!prev || score > prev.score) {
      updated[activeLvl.level] = { score, stars };
      setBest(updated);
      saveBest(updated);
    }

    // تحديث التقدم
    setChapterProgress(activeLvl.level, score);

    // حفظ في الباكند
    try {
      await submitExam.mutateAsync({
        userId,
        score: {
          level: BigInt(activeLvl.level),
          score: BigInt(score),
          total: BigInt(questions.length),
        },
      });
    } catch {
      // silent – score already saved locally
    }

    if (timedOut) {
      toast.warning(`انتهى الوقت! نتيجتك: ${score}/${questions.length}`);
    } else {
      const pct = Math.round((score / questions.length) * 100);
      if (pct >= 90)
        toast.success(`🌟 ممتاز! ${score}/${questions.length} – ${pct}%`);
      else if (pct >= 60)
        toast.success(`👍 جيدة! ${score}/${questions.length} – ${pct}%`);
      else
        toast.info(
          `💪 استمري في التدريب! ${score}/${questions.length} – ${pct}%`,
        );
    }
  };

  const answeredCount = Object.keys(selected).length;
  const totalQ = activeLvl?.questions.length ?? 0;
  const allAnswered = answeredCount >= totalQ && totalQ > 0;

  const reset = () => {
    stopTimer();
    setActiveLvl(null);
    setSelected({});
    setRevealed(false);
    setFinalScore(null);
  };

  // ─── شاشة اختيار المستوى
  if (!activeLvl) {
    return (
      <Layout>
        <div className="space-y-6 max-w-2xl mx-auto" data-ocid="exams.page">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              🎓 الاختبارات
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              اختاري المستوى لبدء اختبار من 15 سؤال – مدة 15 دقيقة
            </p>
          </div>

          <div
            className="grid sm:grid-cols-2 gap-4"
            data-ocid="exams.levels_grid"
          >
            {ACTIVE_EXAM_LEVELS.map((lvl, i) => (
              <LevelCard
                key={lvl.level}
                lvl={lvl}
                best={best}
                index={i}
                onClick={() => handleSelectLevel(lvl)}
              />
            ))}
          </div>

          {/* ملخص التقدم */}
          {Object.keys(best).length > 0 && (
            <div
              className="bg-card border border-border rounded-2xl p-4"
              data-ocid="exams.progress_summary"
            >
              <h2 className="font-bold text-sm text-muted-foreground mb-3">
                تقدمك الكلي
              </h2>
              <div className="flex gap-3 flex-wrap">
                {ACTIVE_EXAM_LEVELS.map((lvl) => {
                  const b = best[lvl.level];
                  return (
                    <div
                      key={lvl.level}
                      className="flex flex-col items-center gap-1"
                    >
                      <span className="text-xs text-muted-foreground">
                        {lvl.label}
                      </span>
                      <Stars count={b?.stars ?? 0} size="text-sm" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // ─── شاشة الاختبار أو النتيجة
  return (
    <Layout>
      <div className="space-y-4 max-w-2xl mx-auto" data-ocid="exams.exam_page">
        {/* رأس الاختبار */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            data-ocid="exams.back_button"
            onClick={reset}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← المستويات
          </button>
          <div className="flex items-center gap-3">
            <span className="font-bold text-foreground">{activeLvl.label}</span>
            {!revealed && <Timer seconds={timeLeft} />}
          </div>
        </div>

        {/* شريط التقدم */}
        {!revealed && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {answeredCount}/{totalQ} سؤال
              </span>
              <span>{Math.round((answeredCount / totalQ) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQ) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* نتيجة نهائية */}
        {revealed && finalScore !== null && (
          <div
            className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm"
            data-ocid="exams.success_state"
          >
            <p className="text-5xl mb-3">
              {finalScore >= totalQ * 0.9
                ? "🏆"
                : finalScore >= totalQ * 0.6
                  ? "🌟"
                  : "💪"}
            </p>
            <p className="text-3xl font-bold text-primary">
              {finalScore}/{totalQ}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {Math.round((finalScore / totalQ) * 100)}% – {activeLvl.label}
            </p>
            <div className="mt-3 flex justify-center">
              <Stars count={getStars(finalScore, totalQ)} />
            </div>
            <div className="mt-5 flex gap-3 justify-center flex-wrap">
              <button
                type="button"
                data-ocid="exams.retry_button"
                onClick={() => handleSelectLevel(activeLvl)}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-smooth text-sm"
              >
                حاولي مجددًا
              </button>
              <button
                type="button"
                data-ocid="exams.levels_button"
                onClick={reset}
                className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-smooth text-sm"
              >
                المستويات
              </button>
            </div>
          </div>
        )}

        {/* قائمة الأسئلة */}
        <div className="space-y-4">
          {activeLvl.questions.map((q, i) => (
            <QuestionItem
              key={q.id}
              q={q}
              index={i}
              selected={selected[i] ?? null}
              revealed={revealed}
              onSelect={(ci) => handleSelect(i, ci)}
            />
          ))}
        </div>

        {/* زر التسليم */}
        {!revealed && (
          <div className="sticky bottom-4 flex justify-center pt-2">
            <div className="bg-card/95 backdrop-blur border border-border rounded-2xl p-3 shadow-lg flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {answeredCount}/{totalQ} محلول
              </span>
              <button
                type="button"
                data-ocid="exams.submit_button"
                onClick={() => handleSubmit(false)}
                disabled={!allAnswered || submitExam.isPending}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-smooth text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitExam.isPending ? "جارٍ الحفظ..." : "تسليم الاختبار"}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
