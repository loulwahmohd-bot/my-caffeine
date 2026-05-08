import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddQuestion,
  useDeleteQuestion,
  useQuestions,
  useUpdateQuestion,
} from "@/hooks/useBackend";
import type { Choice, Question } from "@/types";
import { CHAPTERS, QuestionType } from "@/types";
import { Edit2, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const QTYPE_LABELS: Record<QuestionType, string> = {
  [QuestionType.chapter]: "فصل",
  [QuestionType.exam]: "اختبار",
  [QuestionType.game]: "لعبة",
  [QuestionType.grammar]: "نحو",
  [QuestionType.writing]: "كتابي",
};

const DIFF_LABELS: Record<number, string> = {
  1: "سهل",
  2: "متوسط",
  3: "صعب",
};

const emptyQuestion = (): Omit<Question, "id"> => ({
  text: "",
  explanation: "",
  qtype: QuestionType.chapter,
  chapterId: BigInt(1),
  level: BigInt(1),
  boxId: undefined,
  choices: [
    { id: BigInt(1), text: "", correct: true },
    { id: BigInt(2), text: "", correct: false },
    { id: BigInt(3), text: "", correct: false },
    { id: BigInt(4), text: "", correct: false },
  ],
});

export default function QuestionManager() {
  const { data: questions = [], isLoading } = useQuestions();
  const addQuestion = useAddQuestion();
  const updateQuestion = useUpdateQuestion();
  const deleteQuestion = useDeleteQuestion();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Question | null>(null);
  const [form, setForm] = useState<Omit<Question, "id">>(emptyQuestion());
  const [filterType, setFilterType] = useState<string>("all");
  const [filterChapter, setFilterChapter] = useState<string>("all");

  const setChoice = (idx: number, text: string) => {
    setForm((f) => ({
      ...f,
      choices: f.choices.map((c, i) => (i === idx ? { ...c, text } : c)),
    }));
  };

  const setCorrect = (idx: number) => {
    setForm((f) => ({
      ...f,
      choices: f.choices.map((c, i) => ({ ...c, correct: i === idx })),
    }));
  };

  const handleSubmit = async () => {
    if (!form.text.trim()) {
      toast.error("أدخلي نص السؤال");
      return;
    }
    if (form.choices.some((c) => !c.text.trim())) {
      toast.error("أكملي جميع الخيارات");
      return;
    }
    try {
      if (editing) {
        await updateQuestion.mutateAsync({ ...form, id: editing.id });
        toast.success("تم تحديث السؤال");
        setEditing(null);
      } else {
        await addQuestion.mutateAsync({ ...form, id: BigInt(0) });
        toast.success("تم إضافة السؤال");
      }
      setForm(emptyQuestion());
      setShowForm(false);
    } catch {
      toast.error("حدث خطأ");
    }
  };

  const startEdit = (q: Question) => {
    setEditing(q);
    setForm({
      text: q.text,
      explanation: q.explanation,
      qtype: q.qtype,
      chapterId: q.chapterId,
      level: q.level,
      boxId: q.boxId,
      choices: [...q.choices],
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyQuestion());
  };

  const filtered = questions.filter((q) => {
    if (filterType !== "all" && q.qtype !== filterType) return false;
    if (filterChapter !== "all" && String(q.chapterId) !== filterChapter)
      return false;
    return true;
  });

  return (
    <div className="space-y-5" data-ocid="teacher.questions_section">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger
              data-ocid="teacher.filter_type_select"
              className="w-36 text-sm"
            >
              <SelectValue placeholder="النوع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              {Object.entries(QTYPE_LABELS).map(([v, l]) => (
                <SelectItem key={v} value={v}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterChapter} onValueChange={setFilterChapter}>
            <SelectTrigger
              data-ocid="teacher.filter_chapter_select"
              className="w-44 text-sm"
            >
              <SelectValue placeholder="الفصل" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفصول</SelectItem>
              {CHAPTERS.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.id}. {c.title.slice(0, 20)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          data-ocid="teacher.add_question_button"
          onClick={() => {
            setShowForm(!showForm);
            setEditing(null);
            setForm(emptyQuestion());
          }}
          size="sm"
          className="gap-1"
        >
          <Plus size={15} />
          إضافة سؤال
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div
          className="bg-muted/20 border border-primary/20 rounded-2xl p-5 space-y-4"
          data-ocid="teacher.question_form"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">
              {editing ? "✏️ تعديل السؤال" : "✨ سؤال جديد"}
            </h3>
            <button
              type="button"
              onClick={cancelForm}
              aria-label="إغلاق"
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label
                htmlFor="q-type"
                className="text-sm font-medium text-foreground"
              >
                نوع السؤال
              </label>
              <Select
                value={form.qtype}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, qtype: v as QuestionType }))
                }
              >
                <SelectTrigger id="q-type" data-ocid="teacher.q_type_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(QTYPE_LABELS).map(([v, l]) => (
                    <SelectItem key={v} value={v}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="q-chapter"
                className="text-sm font-medium text-foreground"
              >
                الفصل
              </label>
              <Select
                value={
                  form.chapterId !== undefined ? String(form.chapterId) : ""
                }
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, chapterId: BigInt(v) }))
                }
              >
                <SelectTrigger
                  id="q-chapter"
                  data-ocid="teacher.q_chapter_select"
                >
                  <SelectValue placeholder="اختاري..." />
                </SelectTrigger>
                <SelectContent>
                  {CHAPTERS.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.id}. {c.title.slice(0, 25)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="q-level"
                className="text-sm font-medium text-foreground"
              >
                مستوى الصعوبة
              </label>
              <Select
                value={form.level !== undefined ? String(form.level) : "1"}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, level: BigInt(v) }))
                }
              >
                <SelectTrigger id="q-level" data-ocid="teacher.q_level_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">🟢 سهل</SelectItem>
                  <SelectItem value="2">🟡 متوسط</SelectItem>
                  <SelectItem value="3">🔴 صعب</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="q-text"
              className="text-sm font-medium text-foreground"
            >
              نص السؤال
            </label>
            <Textarea
              id="q-text"
              data-ocid="teacher.q_text_input"
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              placeholder="اكتبي السؤال هنا..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              الخيارات (اضغطي على الخيار الصحيح)
            </p>
            {form.choices.map((c, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: choices are user-managed editable list
              <div key={idx} className="flex items-center gap-2">
                <button
                  type="button"
                  data-ocid={`teacher.q_correct.${idx + 1}`}
                  onClick={() => setCorrect(idx)}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-smooth ${
                    c.correct
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                  aria-label={`الخيار ${idx + 1} صحيح`}
                >
                  {["أ", "ب", "ج", "د"][idx]}
                </button>
                <Input
                  data-ocid={`teacher.q_choice.${idx + 1}`}
                  value={c.text}
                  onChange={(e) => setChoice(idx, e.target.value)}
                  placeholder={`الخيار ${["أ", "ب", "ج", "د"][idx]}`}
                  className="flex-1"
                />
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="q-exp"
              className="text-sm font-medium text-foreground"
            >
              التفسير (اختياري)
            </label>
            <Input
              id="q-exp"
              data-ocid="teacher.q_explanation_input"
              value={form.explanation}
              onChange={(e) =>
                setForm((f) => ({ ...f, explanation: e.target.value }))
              }
              placeholder="لماذا هذه الإجابة صحيحة؟"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              data-ocid="teacher.q_submit_button"
              onClick={handleSubmit}
              disabled={addQuestion.isPending || updateQuestion.isPending}
            >
              {editing ? "حفظ التعديلات" : "إضافة السؤال"}
            </Button>
            <Button
              type="button"
              variant="outline"
              data-ocid="teacher.q_cancel_button"
              onClick={cancelForm}
            >
              إلغاء
            </Button>
          </div>
        </div>
      )}

      {/* Questions List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="teacher.questions_empty_state"
        >
          <p className="text-4xl mb-3">❓</p>
          <p>لا توجد أسئلة تطابق الفلتر</p>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="teacher.questions_list">
          <p className="text-xs text-muted-foreground">
            {filtered.length} سؤال
          </p>
          {filtered.map((q, i) => (
            <div
              key={String(q.id)}
              data-ocid={`teacher.question.${i + 1}`}
              className="bg-card border border-border rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground line-clamp-2">
                    {q.text}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {QTYPE_LABELS[q.qtype]}
                    </Badge>
                    {q.chapterId !== undefined && (
                      <Badge variant="secondary" className="text-xs">
                        ف{String(q.chapterId)}
                      </Badge>
                    )}
                    {q.level !== undefined && (
                      <Badge variant="outline" className="text-xs">
                        {Number(q.level) === 1
                          ? "🟢"
                          : Number(q.level) === 2
                            ? "🟡"
                            : "🔴"}{" "}
                        {DIFF_LABELS[Number(q.level)]}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 space-y-0.5">
                    {q.choices.map((c) => (
                      <p
                        key={String(c.id)}
                        className={`text-xs ${c.correct ? "text-primary font-semibold" : "text-muted-foreground"}`}
                      >
                        {c.correct ? "✓ " : "• "}
                        {c.text}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    type="button"
                    data-ocid={`teacher.edit_question.${i + 1}`}
                    onClick={() => startEdit(q)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                    aria-label="تعديل السؤال"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    type="button"
                    data-ocid={`teacher.delete_question.${i + 1}`}
                    onClick={() => {
                      if (confirm("هل تريدين حذف هذا السؤال؟"))
                        deleteQuestion
                          .mutateAsync(q.id)
                          .then(() => toast.success("تم الحذف"));
                    }}
                    className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-smooth"
                    aria-label="حذف السؤال"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              {/* تعديل السؤال box */}
              <button
                type="button"
                data-ocid={`teacher.edit_question_box.${i + 1}`}
                onClick={() => startEdit(q)}
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 border-2 border-dashed transition-smooth text-sm font-semibold"
                style={{
                  background: "oklch(0.96 0.03 70)",
                  borderColor: "oklch(0.75 0.10 68)",
                  color: "oklch(0.42 0.10 65)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "oklch(0.90 0.06 70)";
                  el.style.borderColor = "oklch(0.55 0.13 68)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "oklch(0.96 0.03 70)";
                  el.style.borderColor = "oklch(0.75 0.10 68)";
                }}
              >
                <Edit2 size={15} />
                ✏️ تعديل السؤال
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
