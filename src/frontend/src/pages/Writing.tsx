import { Layout } from "@/components/Layout";
import {
  useAssignments,
  useMySubmissions,
  useSubmitAssignment,
} from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";
import { AssignmentStatus, AssignmentType } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Hardcoded free-writing prompts ──────────────────────────────────────────
const FREE_PROMPTS = [
  {
    id: 1,
    text: "عبّري عن رأيك في تصرف هدارة عندما رفض أكل اللحم بعد عودته للبشر",
  },
  { id: 2, text: "كيف شعرت ماكو عندما وجدت الطفل وحيداً في الصحراء؟" },
  { id: 3, text: "لماذا تعتقدين أن هدارة أصبح رجلاً حكيماً في نهاية الرواية؟" },
  { id: 4, text: "لو كنت مكان فاطمة ماذا كنت ستفعلين عندما فقدت ابنها؟" },
  { id: 5, text: "صفي مشاعر هدارة عندما اكتشف أنه ليس نعامة حقيقية" },
  { id: 6, text: "ما رأيك في تصرف لوك أوكونر؟ هل كان يريد الخير لهدارة؟" },
  { id: 7, text: "كيف غيّرت الصحراء شخصية هدارة؟" },
  { id: 8, text: "ما أكثر شيء أثّر فيكِ في هذه الرواية؟" },
];

const MIN_CHARS = 150;

// ─── Draft storage key ───────────────────────────────────────────────────────
function draftKey(promptId: number) {
  return `writing_draft_prompt_${promptId}`;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Writing() {
  const { userId, sessionId } = useSessionStore();
  const { data: assignments = [] } = useAssignments(sessionId);
  const { data: mySubmissions = [] } = useMySubmissions(userId);
  const submitMutation = useSubmitAssignment();

  // Free-writing prompt navigation
  const [promptIndex, setPromptIndex] = useState(0);
  const [freeText, setFreeText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const currentPrompt = FREE_PROMPTS[promptIndex];

  // Load draft on mount / prompt change
  useEffect(() => {
    const saved = localStorage.getItem(draftKey(currentPrompt.id));
    setFreeText(saved ?? "");
    setSubmitted(false);
  }, [currentPrompt.id]);

  // Auto-save draft
  useEffect(() => {
    if (freeText) {
      localStorage.setItem(draftKey(currentPrompt.id), freeText);
    }
  }, [freeText, currentPrompt.id]);

  function goTo(idx: number) {
    setDirection(idx > promptIndex ? 1 : -1);
    setPromptIndex(idx);
  }

  function goPrev() {
    if (promptIndex > 0) goTo(promptIndex - 1);
  }
  function goNext() {
    if (promptIndex < FREE_PROMPTS.length - 1) goTo(promptIndex + 1);
  }

  const isEnough = freeText.trim().length >= MIN_CHARS;

  function handleFreeSubmit() {
    if (!isEnough) return;
    toast.success("تم حفظ إجابتك ✨");
    setSubmitted(true);
    localStorage.removeItem(draftKey(currentPrompt.id));
  }

  // Teacher assignments section
  const writingAssignments = assignments.filter(
    (a) => a.atype === AssignmentType.writing,
  );
  const submittedMap = new Map(
    mySubmissions.map((s) => [String(s.assignmentId), s]),
  );

  const [assignText, setAssignText] = useState<Record<string, string>>({});

  async function handleAssignSubmit(id: bigint) {
    const answer = assignText[String(id)]?.trim();
    if (!answer || !sessionId) return;
    try {
      const res = await submitMutation.mutateAsync({
        assignmentId: id,
        userId,
        sessionId,
        answer,
      });
      if ("err" in res) {
        toast.error(String((res as { err: string }).err));
        return;
      }
      toast.success("تم التسليم للمعلمة ✅");
      setAssignText((p) => ({ ...p, [String(id)]: "" }));
    } catch {
      toast.error("تعذّر التسليم");
    }
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <Layout>
      <div
        className="max-w-2xl mx-auto space-y-10 pb-16"
        dir="rtl"
        data-ocid="writing.page"
      >
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">
            ✍️ الأسئلة الكتابية
          </h1>
          <p className="text-muted-foreground text-sm">
            عبّري عن أفكارك ومشاعرك بحرية
          </p>
        </div>

        {/* ── Free-writing prompts ── */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              💡 أسئلة تعبيرية
            </h2>
            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {promptIndex + 1} / {FREE_PROMPTS.length}
            </span>
          </div>

          {/* Prompt card with slide animation */}
          <div className="relative overflow-hidden" style={{ minHeight: 110 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPrompt.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                data-ocid={`writing.prompt.${promptIndex + 1}`}
              >
                <div className="flex gap-3 items-start">
                  <span className="mt-0.5 w-8 h-8 rounded-full bg-primary/15 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {currentPrompt.id}
                  </span>
                  <p className="text-foreground text-base font-medium leading-relaxed">
                    {currentPrompt.text}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div
            className="flex items-center justify-center gap-2"
            role="tablist"
            aria-label="اختر السؤال"
          >
            {FREE_PROMPTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === promptIndex}
                data-ocid={`writing.dot.${i + 1}`}
                onClick={() => goTo(i)}
                className={`rounded-full transition-smooth ${
                  i === promptIndex
                    ? "w-6 h-3 bg-primary"
                    : "w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>

          {/* Answer area */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-primary/10 border border-primary/30 rounded-2xl p-6 text-center space-y-3"
                data-ocid="writing.success_state"
              >
                <div className="text-4xl">✅</div>
                <p className="text-foreground font-bold text-lg">
                  تم حفظ إجابتك!
                </p>
                <p className="text-muted-foreground text-sm">
                  يمكنك الانتقال للسؤال التالي
                </p>
                <button
                  type="button"
                  data-ocid="writing.next_button"
                  onClick={() => {
                    if (promptIndex < FREE_PROMPTS.length - 1) goNext();
                    else setSubmitted(false);
                  }}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-smooth"
                >
                  {promptIndex < FREE_PROMPTS.length - 1
                    ? "السؤال التالي ←"
                    : "العودة للبداية"}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="relative">
                  <textarea
                    data-ocid="writing.free_textarea"
                    value={freeText}
                    onChange={(e) => setFreeText(e.target.value)}
                    placeholder="اكتبي إجابتك هنا... (١٥٠ حرفاً على الأقل)"
                    rows={7}
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none leading-relaxed"
                  />
                </div>

                {/* Char counter */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 w-40 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-smooth"
                        style={{
                          width: `${Math.min((freeText.trim().length / MIN_CHARS) * 100, 100)}%`,
                          background: isEnough
                            ? "oklch(var(--primary))"
                            : "oklch(var(--secondary))",
                        }}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isEnough ? "text-primary" : "text-muted-foreground"
                      }`}
                      data-ocid="writing.char_counter"
                    >
                      {freeText.trim().length} / {MIN_CHARS}
                    </span>
                    {!isEnough && (
                      <span className="text-xs text-muted-foreground">
                        (تحتاجين {MIN_CHARS - freeText.trim().length} حرفاً
                        إضافياً)
                      </span>
                    )}
                  </div>
                  {freeText.trim().length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      تم الحفظ تلقائياً 💾
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    data-ocid="writing.submit_button"
                    onClick={handleFreeSubmit}
                    disabled={!isEnough}
                    className="bg-primary text-primary-foreground px-7 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    تسليم الإجابة
                  </button>
                  <div className="flex gap-2 mr-auto">
                    <button
                      type="button"
                      data-ocid="writing.prev_button"
                      onClick={goPrev}
                      disabled={promptIndex === 0}
                      className="border border-border rounded-xl px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-smooth disabled:opacity-30"
                    >
                      → السابق
                    </button>
                    <button
                      type="button"
                      data-ocid="writing.next_nav_button"
                      onClick={goNext}
                      disabled={promptIndex === FREE_PROMPTS.length - 1}
                      className="border border-border rounded-xl px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-smooth disabled:opacity-30"
                    >
                      ← التالي
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── Teacher assignments ── */}
        {writingAssignments.length > 0 && (
          <section
            className="space-y-4"
            data-ocid="writing.assignments_section"
          >
            <h2 className="text-lg font-bold text-foreground">
              📝 واجبات المعلمة
            </h2>
            <div className="space-y-4">
              {writingAssignments.map((a, i) => {
                const sub = submittedMap.get(String(a.id));
                const isSubmitted = !!sub;
                const key = String(a.id);

                return (
                  <div
                    key={key}
                    data-ocid={`writing.assignment.${i + 1}`}
                    className="bg-card border border-border rounded-2xl p-5 space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="font-bold text-foreground">{a.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {a.content}
                        </p>
                      </div>
                      {isSubmitted && (
                        <span
                          className={`flex-shrink-0 text-xs px-3 py-1 rounded-full font-semibold ${
                            sub.status === AssignmentStatus.graded
                              ? "bg-primary/15 text-primary"
                              : "bg-secondary/15 text-secondary"
                          }`}
                        >
                          {sub.status === AssignmentStatus.graded
                            ? `✅ ${String(sub.grade)}/١٠`
                            : "⏳ مسلّم"}
                        </span>
                      )}
                    </div>

                    {/* Submitted view */}
                    {isSubmitted ? (
                      <div className="space-y-3">
                        <div className="bg-muted/50 rounded-xl p-4">
                          <p className="text-sm text-foreground leading-relaxed">
                            {sub.answer}
                          </p>
                        </div>
                        {sub.feedback && (
                          <div
                            className="bg-secondary/10 border border-secondary/20 rounded-xl p-4"
                            data-ocid={`writing.teacher_feedback.${i + 1}`}
                          >
                            <p className="text-xs font-semibold text-secondary mb-1">
                              💬 ملاحظة المعلمة
                            </p>
                            <p className="text-sm text-foreground leading-relaxed">
                              {sub.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Answer input */
                      <div className="space-y-3">
                        <textarea
                          data-ocid={`writing.assign_textarea.${i + 1}`}
                          value={assignText[key] ?? ""}
                          onChange={(e) =>
                            setAssignText((p) => ({
                              ...p,
                              [key]: e.target.value,
                            }))
                          }
                          placeholder="اكتبي إجابتك هنا..."
                          rows={5}
                          className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none leading-relaxed"
                        />
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs text-muted-foreground"
                            data-ocid={`writing.assign_char.${i + 1}`}
                          >
                            {(assignText[key] ?? "").length} حرف
                          </span>
                          <button
                            type="button"
                            data-ocid={`writing.assign_submit.${i + 1}`}
                            onClick={() => handleAssignSubmit(a.id)}
                            disabled={
                              !(assignText[key] ?? "").trim() ||
                              submitMutation.isPending
                            }
                            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-smooth disabled:opacity-40"
                          >
                            تسليم للمعلمة
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
