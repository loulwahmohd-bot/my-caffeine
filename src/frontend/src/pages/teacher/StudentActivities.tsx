import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CHAPTER_QUESTIONS } from "@/data/chapterQuestions";
import { EXAM_LEVELS } from "@/data/examQuestions";
import type { ExamLevel } from "@/data/examQuestions";
import {
  useAddQuestion,
  useDeleteQuestion,
  useQuestions,
  useUpdateQuestion,
} from "@/hooks/useBackend";
import type { Choice, Question } from "@/types";
import { QuestionType } from "@/types";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit2,
  Loader2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ── Game box meta ────────────────────────────────────────────────
const GAME_BOXES = [
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

const DIFFICULTY_LABEL: Record<string, { label: string; cls: string }> = {
  easy: { label: "سهل", cls: "bg-green-100 text-green-700 border-green-200" },
  medium: {
    label: "متوسط",
    cls: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  hard: { label: "صعب", cls: "bg-red-100 text-red-700 border-red-200" },
};

const LETTERS = ["أ", "ب", "ج", "د"];

type SectionId = "chapters" | "grammar" | "exams" | "games";

const SECTIONS: {
  id: SectionId;
  label: string;
  emoji: string;
  count: string;
}[] = [
  {
    id: "chapters",
    label: "أسئلة الفصول",
    emoji: "📖",
    count: "38 فصل · 6 أسئلة",
  },
  {
    id: "grammar",
    label: "الأعداد والمعدود",
    emoji: "🔢",
    count: "10 أسئلة · 3 مستويات",
  },
  {
    id: "exams",
    label: "الاختبارات العامة",
    emoji: "📝",
    count: "5 مستويات · 15 سؤال",
  },
  { id: "games", label: "الألعاب", emoji: "🎮", count: "3 ألعاب · 5 أسئلة" },
];

// ── Helpers ──────────────────────────────────────────────────────
function choicesToLocal(choices: Choice[]) {
  return choices.map((c) => ({ text: c.text, correct: c.correct }));
}

function localToChoices(
  choices: { text: string; correct: boolean }[],
): Choice[] {
  return choices.map((c, i) => ({
    id: BigInt(i),
    text: c.text,
    correct: c.correct,
  }));
}

// ── Confirm Delete Dialog ────────────────────────────────────────
function ConfirmDelete({
  onConfirm,
  onCancel,
  isPending,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2 mt-1"
      data-ocid="activities.confirm_delete"
    >
      <span className="text-xs text-red-600 font-medium">تأكيد الحذف؟</span>
      <Button
        size="sm"
        variant="destructive"
        className="h-6 text-xs px-2"
        onClick={onConfirm}
        disabled={isPending}
        data-ocid="activities.confirm_button"
      >
        {isPending ? <Loader2 size={10} className="animate-spin" /> : "حذف"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="h-6 text-xs px-2"
        onClick={onCancel}
        disabled={isPending}
        data-ocid="activities.cancel_button"
      >
        إلغاء
      </Button>
    </div>
  );
}

// ── Choice Editor ────────────────────────────────────────────────
function ChoiceEditor({
  choices,
  onChange,
}: {
  choices: { text: string; correct: boolean }[];
  onChange: (c: { text: string; correct: boolean }[]) => void;
}) {
  return (
    <div className="space-y-1.5">
      {choices.map((ch, ci) => (
        <div
          key={`choice-${ci}-${ch.text.slice(0, 5)}`}
          className="flex items-center gap-2"
        >
          <span className="text-xs font-bold text-muted-foreground w-4 shrink-0">
            {LETTERS[ci]}
          </span>
          <input
            className="flex-1 text-xs bg-background border border-border rounded px-2 py-1 outline-none focus:border-primary"
            value={ch.text}
            onChange={(e) => {
              const next = choices.map((c, i) =>
                i === ci ? { ...c, text: e.target.value } : c,
              );
              onChange(next);
            }}
            dir="rtl"
          />
          <button
            type="button"
            onClick={() => {
              const next = choices.map((c, i) => ({ ...c, correct: i === ci }));
              onChange(next);
            }}
            className={`shrink-0 text-xs px-2 py-1 rounded border transition-colors ${
              ch.correct
                ? "bg-green-100 border-green-400 text-green-700 font-semibold"
                : "bg-card border-border text-muted-foreground hover:border-green-300"
            }`}
            title="اجعلها الإجابة الصحيحة"
          >
            {ch.correct ? "✓ صحيحة" : "صحيحة؟"}
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Chapters Section ──────────────────────────────────────────────
function ChaptersSection() {
  const { data: backendQs = [], isLoading } = useQuestions({
    qtype: QuestionType.chapter,
  });
  const addQ = useAddQuestion();
  const updateQ = useUpdateQuestion();
  const deleteQ = useDeleteQuestion();

  // Group backend questions by chapterId
  const chapterMap = new Map<number, Question[]>();
  for (const q of backendQs) {
    const cid = q.chapterId != null ? Number(q.chapterId) : 0;
    if (!chapterMap.has(cid)) chapterMap.set(cid, []);
    chapterMap.get(cid)!.push(q);
  }

  const chapters = CHAPTER_QUESTIONS.map((ch) => ({
    ...ch,
    questions: chapterMap.get(ch.id) ?? [],
  }));

  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editDraft, setEditDraft] = useState<{
    text: string;
    level: string;
    choices: { text: string; correct: boolean }[];
  } | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [addingTo, setAddingTo] = useState<number | null>(null);
  const [newDraft, setNewDraft] = useState<{
    text: string;
    level: string;
    choices: { text: string; correct: boolean }[];
  } | null>(null);

  const filtered = chapters.filter(
    (c) => c.title.includes(search) || String(c.id).includes(search),
  );

  function startEdit(q: Question) {
    setEditingId(q.id);
    setEditDraft({
      text: q.text,
      level: q.level != null ? String(q.level) : "2",
      choices: choicesToLocal(q.choices),
    });
  }

  async function saveEdit(chapterId: number) {
    if (!editDraft || !editingId) return;
    const original = backendQs.find((q) => q.id === editingId);
    if (!original) return;
    await updateQ.mutateAsync({
      ...original,
      text: editDraft.text,
      level: BigInt(editDraft.level),
      choices: localToChoices(editDraft.choices),
      chapterId: BigInt(chapterId),
    });
    setEditingId(null);
    setEditDraft(null);
  }

  async function handleDelete(id: bigint) {
    await deleteQ.mutateAsync(id);
    setDeleteId(null);
  }

  function startAdd(chId: number) {
    setAddingTo(chId);
    setNewDraft({
      text: "",
      level: "2",
      choices: [
        { text: "", correct: true },
        { text: "", correct: false },
        { text: "", correct: false },
        { text: "", correct: false },
      ],
    });
  }

  async function saveAdd(chId: number) {
    if (!newDraft || !newDraft.text.trim()) return;
    await addQ.mutateAsync({
      id: 0n,
      qtype: QuestionType.chapter,
      chapterId: BigInt(chId),
      level: BigInt(newDraft.level),
      boxId: undefined,
      text: newDraft.text,
      choices: localToChoices(newDraft.choices),
      explanation: "",
    });
    setAddingTo(null);
    setNewDraft(null);
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground py-8 justify-center">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-sm">جارٍ تحميل الأسئلة...</span>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-ocid="activities.chapters_section">
      <div className="flex items-center gap-2">
        <input
          type="search"
          placeholder="ابحثي عن فصل..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="activities.chapter_search"
          className="flex-1 max-w-xs text-sm bg-card border border-border rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors"
          dir="rtl"
        />
        <span className="text-xs text-muted-foreground">
          {filtered.length} فصل
        </span>
      </div>
      <div className="space-y-2">
        {filtered.map((ch, i) => {
          const isOpen = openId === ch.id;
          return (
            <div
              key={ch.id}
              className="border border-border rounded-xl overflow-hidden"
              data-ocid={`activities.chapter.${i + 1}`}
            >
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : ch.id)}
                  className="flex-1 flex items-center justify-between px-4 py-3 bg-card hover:bg-muted/40 transition-colors text-right"
                >
                  <span className="font-semibold text-foreground text-sm">
                    الفصل {ch.id}: {ch.title}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {ch.questions.length} أسئلة
                    </Badge>
                    {isOpen ? (
                      <ChevronUp size={16} className="text-muted-foreground" />
                    ) : (
                      <ChevronDown
                        size={16}
                        className="text-muted-foreground"
                      />
                    )}
                  </div>
                </button>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-4 border-t border-border bg-background">
                      {ch.questions.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-2">
                          لا توجد أسئلة لهذا الفصل بعد
                        </p>
                      )}
                      {ch.questions.map((q, qi) => {
                        const isEditing = editingId === q.id;
                        const isDeletingThis = deleteId === q.id;
                        const lvlNum = q.level != null ? Number(q.level) : 2;
                        const diffKey =
                          lvlNum <= 1
                            ? "easy"
                            : lvlNum === 2
                              ? "medium"
                              : "hard";
                        const diff = DIFFICULTY_LABEL[diffKey];
                        const correct = q.choices.find((c) => c.correct);
                        return (
                          <div
                            key={String(q.id)}
                            className="space-y-2 pb-3 border-b border-border last:border-0"
                          >
                            {isEditing && editDraft ? (
                              <div className="space-y-2">
                                <input
                                  className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-primary"
                                  value={editDraft.text}
                                  onChange={(e) =>
                                    setEditDraft(
                                      (d) =>
                                        d && { ...d, text: e.target.value },
                                    )
                                  }
                                  dir="rtl"
                                  placeholder="نص السؤال"
                                />
                                <select
                                  className="text-xs bg-background border border-border rounded px-2 py-1"
                                  value={editDraft.level}
                                  onChange={(e) =>
                                    setEditDraft(
                                      (d) =>
                                        d && { ...d, level: e.target.value },
                                    )
                                  }
                                >
                                  <option value="1">سهل</option>
                                  <option value="2">متوسط</option>
                                  <option value="3">صعب</option>
                                </select>
                                <ChoiceEditor
                                  choices={editDraft.choices}
                                  onChange={(choices) =>
                                    setEditDraft((d) => d && { ...d, choices })
                                  }
                                />
                                <div className="flex gap-2 mt-1">
                                  <Button
                                    size="sm"
                                    className="h-7 text-xs gap-1"
                                    onClick={() => saveEdit(ch.id)}
                                    disabled={updateQ.isPending}
                                    data-ocid={`activities.save_button.${qi + 1}`}
                                  >
                                    {updateQ.isPending ? (
                                      <Loader2
                                        size={10}
                                        className="animate-spin"
                                      />
                                    ) : (
                                      <Save size={12} />
                                    )}
                                    حفظ
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs gap-1"
                                    onClick={() => {
                                      setEditingId(null);
                                      setEditDraft(null);
                                    }}
                                    data-ocid={`activities.cancel_button.${qi + 1}`}
                                  >
                                    <X size={12} /> إلغاء
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-start gap-2">
                                  <span className="text-muted-foreground text-xs mt-1 shrink-0">
                                    {qi + 1}.
                                  </span>
                                  <p className="text-sm font-medium text-foreground flex-1 leading-relaxed">
                                    {q.text}
                                  </p>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${diff.cls}`}
                                  >
                                    {diff.label}
                                  </span>
                                  <div className="flex gap-1 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => startEdit(q)}
                                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                      data-ocid={`activities.edit_button.${qi + 1}`}
                                      title="تعديل"
                                    >
                                      <Edit2 size={13} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setDeleteId(q.id)}
                                      className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                                      data-ocid={`activities.delete_button.${qi + 1}`}
                                      title="حذف"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mr-4">
                                  {q.choices.map((c, ci) => (
                                    <div
                                      key={`${String(q.id)}-c${ci}`}
                                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${
                                        c.correct
                                          ? "bg-green-50 border-green-300 text-green-800 font-semibold"
                                          : "bg-card border-border text-muted-foreground"
                                      }`}
                                    >
                                      <span className="shrink-0 text-xs font-bold">
                                        {LETTERS[ci]}
                                      </span>
                                      <span className="flex-1">{c.text}</span>
                                      {c.correct && (
                                        <CheckCircle2
                                          size={13}
                                          className="text-green-600 shrink-0"
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                                {correct && (
                                  <p className="text-xs text-green-700 mr-4">
                                    ✓ الإجابة الصحيحة:{" "}
                                    <span className="font-semibold">
                                      {correct.text}
                                    </span>
                                  </p>
                                )}
                                {isDeletingThis && (
                                  <ConfirmDelete
                                    onConfirm={() => handleDelete(q.id)}
                                    onCancel={() => setDeleteId(null)}
                                    isPending={deleteQ.isPending}
                                  />
                                )}
                                {/* edit box */}
                                <button
                                  type="button"
                                  data-ocid={`activities.chapter_edit_box.${qi + 1}`}
                                  onClick={() => startEdit(q)}
                                  className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 border-2 border-dashed transition-smooth text-xs font-semibold"
                                  style={{
                                    background: "oklch(0.96 0.03 70)",
                                    borderColor: "oklch(0.78 0.10 68)",
                                    color: "oklch(0.42 0.10 65)",
                                  }}
                                  onMouseEnter={(e) => {
                                    const el =
                                      e.currentTarget as HTMLButtonElement;
                                    el.style.background = "oklch(0.90 0.06 70)";
                                    el.style.borderColor =
                                      "oklch(0.55 0.13 68)";
                                  }}
                                  onMouseLeave={(e) => {
                                    const el =
                                      e.currentTarget as HTMLButtonElement;
                                    el.style.background = "oklch(0.96 0.03 70)";
                                    el.style.borderColor =
                                      "oklch(0.78 0.10 68)";
                                  }}
                                >
                                  <Edit2 size={12} />
                                  ✏️ تعديل السؤال
                                </button>
                              </>
                            )}
                          </div>
                        );
                      })}
                      {/* Add Question */}
                      {addingTo === ch.id && newDraft ? (
                        <div className="space-y-2 border border-dashed border-primary/40 rounded-xl p-3">
                          <p className="text-xs font-semibold text-primary">
                            سؤال جديد
                          </p>
                          <input
                            className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-primary"
                            value={newDraft.text}
                            onChange={(e) =>
                              setNewDraft(
                                (d) => d && { ...d, text: e.target.value },
                              )
                            }
                            dir="rtl"
                            placeholder="نص السؤال الجديد"
                          />
                          <select
                            className="text-xs bg-background border border-border rounded px-2 py-1"
                            value={newDraft.level}
                            onChange={(e) =>
                              setNewDraft(
                                (d) => d && { ...d, level: e.target.value },
                              )
                            }
                          >
                            <option value="1">سهل</option>
                            <option value="2">متوسط</option>
                            <option value="3">صعب</option>
                          </select>
                          <ChoiceEditor
                            choices={newDraft.choices}
                            onChange={(choices) =>
                              setNewDraft((d) => d && { ...d, choices })
                            }
                          />
                          <div className="flex gap-2 mt-1">
                            <Button
                              size="sm"
                              className="h-7 text-xs gap-1"
                              onClick={() => saveAdd(ch.id)}
                              disabled={addQ.isPending}
                              data-ocid="activities.chapter_add_save"
                            >
                              {addQ.isPending ? (
                                <Loader2 size={10} className="animate-spin" />
                              ) : (
                                <Save size={12} />
                              )}
                              إضافة
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs gap-1"
                              onClick={() => {
                                setAddingTo(null);
                                setNewDraft(null);
                              }}
                              data-ocid="activities.chapter_add_cancel"
                            >
                              <X size={12} /> إلغاء
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-dashed text-xs gap-1 text-muted-foreground hover:text-primary hover:border-primary"
                          onClick={() => startAdd(ch.id)}
                          data-ocid={`activities.chapter_add_button.${i + 1}`}
                        >
                          <Plus size={13} /> إضافة سؤال
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Grammar Section ───────────────────────────────────────────────
function GrammarSection() {
  const { data: questions = [], isLoading } = useQuestions({
    qtype: QuestionType.grammar,
  });
  const addQ = useAddQuestion();
  const updateQ = useUpdateQuestion();
  const deleteQ = useDeleteQuestion();

  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editDraft, setEditDraft] = useState<{
    text: string;
    explanation: string;
    choices: { text: string; correct: boolean }[];
  } | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [adding, setAdding] = useState(false);
  const [newDraft, setNewDraft] = useState<{
    text: string;
    explanation: string;
    choices: { text: string; correct: boolean }[];
  } | null>(null);

  function startEdit(q: Question) {
    setEditingId(q.id);
    setEditDraft({
      text: q.text,
      explanation: q.explanation ?? "",
      choices: choicesToLocal(q.choices),
    });
  }

  async function saveEdit(q: Question) {
    if (!editDraft || !editingId) return;
    await updateQ.mutateAsync({
      ...q,
      text: editDraft.text,
      explanation: editDraft.explanation,
      choices: localToChoices(editDraft.choices),
    });
    setEditingId(null);
    setEditDraft(null);
  }

  async function handleDelete(id: bigint) {
    await deleteQ.mutateAsync(id);
    setDeleteId(null);
  }

  function startAddNew() {
    setAdding(true);
    setNewDraft({
      text: "",
      explanation: "",
      choices: [
        { text: "", correct: true },
        { text: "", correct: false },
        { text: "", correct: false },
        { text: "", correct: false },
      ],
    });
  }

  async function saveNew() {
    if (!newDraft || !newDraft.text.trim()) return;
    await addQ.mutateAsync({
      id: 0n,
      qtype: QuestionType.grammar,
      chapterId: undefined,
      level: undefined,
      boxId: undefined,
      text: newDraft.text,
      choices: localToChoices(newDraft.choices),
      explanation: newDraft.explanation,
    });
    setAdding(false);
    setNewDraft(null);
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground py-8 justify-center">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-sm">جارٍ تحميل الأسئلة...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="activities.grammar_section">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
          يُعرض بجميع الخيارات (المستوى الصعب)
        </span>
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs gap-1"
          onClick={startAddNew}
          data-ocid="activities.grammar_add_button"
        >
          <Plus size={13} /> إضافة سؤال
        </Button>
      </div>
      {questions.map((q, qi) => (
        <div
          key={String(q.id)}
          className="bg-card border border-border rounded-xl p-4 space-y-3"
          data-ocid={`activities.grammar.${qi + 1}`}
        >
          {editingId === q.id && editDraft ? (
            <div className="space-y-2">
              <input
                className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-primary"
                value={editDraft.text}
                onChange={(e) =>
                  setEditDraft((d) => d && { ...d, text: e.target.value })
                }
                dir="rtl"
                placeholder="نص السؤال"
              />
              <ChoiceEditor
                choices={editDraft.choices}
                onChange={(choices) =>
                  setEditDraft((d) => d && { ...d, choices })
                }
              />
              <input
                className="w-full text-xs bg-background border border-border rounded px-2 py-1 outline-none focus:border-primary"
                value={editDraft.explanation}
                onChange={(e) =>
                  setEditDraft(
                    (d) => d && { ...d, explanation: e.target.value },
                  )
                }
                dir="rtl"
                placeholder="الشرح / القاعدة"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="h-7 text-xs gap-1"
                  onClick={() => saveEdit(q)}
                  disabled={updateQ.isPending}
                  data-ocid={`activities.grammar_save.${qi + 1}`}
                >
                  {updateQ.isPending ? (
                    <Loader2 size={10} className="animate-spin" />
                  ) : (
                    <Save size={12} />
                  )}
                  حفظ
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs gap-1"
                  onClick={() => {
                    setEditingId(null);
                    setEditDraft(null);
                  }}
                  data-ocid={`activities.grammar_cancel.${qi + 1}`}
                >
                  <X size={12} /> إلغاء
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-foreground text-sm leading-relaxed flex-1">
                  <span className="text-primary font-bold me-2">{qi + 1}.</span>
                  {q.text}
                </p>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(q)}
                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="تعديل"
                    data-ocid={`activities.grammar_edit.${qi + 1}`}
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(q.id)}
                    className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                    title="حذف"
                    data-ocid={`activities.grammar_delete.${qi + 1}`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {q.choices.map((ch, ci) => (
                  <div
                    key={`g${String(q.id)}-c${ci}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${
                      ch.correct
                        ? "bg-green-50 border-green-300 text-green-800 font-semibold"
                        : "bg-background border-border text-muted-foreground"
                    }`}
                  >
                    <span className="shrink-0 font-bold">{LETTERS[ci]}</span>
                    <span className="flex-1">{ch.text}</span>
                    {ch.correct && (
                      <CheckCircle2
                        size={13}
                        className="text-green-600 shrink-0"
                      />
                    )}
                  </div>
                ))}
              </div>
              {q.explanation && (
                <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
                  💡 {q.explanation}
                </p>
              )}
              {deleteId === q.id && (
                <ConfirmDelete
                  onConfirm={() => handleDelete(q.id)}
                  onCancel={() => setDeleteId(null)}
                  isPending={deleteQ.isPending}
                />
              )}
              {/* edit box */}
              <button
                type="button"
                data-ocid={`activities.grammar_edit_box.${qi + 1}`}
                onClick={() => startEdit(q)}
                className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 border-2 border-dashed transition-smooth text-xs font-semibold"
                style={{
                  background: "oklch(0.96 0.03 70)",
                  borderColor: "oklch(0.78 0.10 68)",
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
                  el.style.borderColor = "oklch(0.78 0.10 68)";
                }}
              >
                <Edit2 size={12} />
                ✏️ تعديل السؤال
              </button>
            </>
          )}
        </div>
      ))}
      {questions.length === 0 && !isLoading && (
        <p className="text-xs text-muted-foreground text-center py-4">
          لا توجد أسئلة بعد — أضيفي أول سؤال
        </p>
      )}
      {adding && newDraft && (
        <div className="bg-card border border-dashed border-primary/40 rounded-xl p-4 space-y-3">
          <p className="text-xs font-semibold text-primary">سؤال جديد</p>
          <input
            className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-primary"
            value={newDraft.text}
            onChange={(e) =>
              setNewDraft((d) => d && { ...d, text: e.target.value })
            }
            dir="rtl"
            placeholder="نص السؤال"
          />
          <ChoiceEditor
            choices={newDraft.choices}
            onChange={(choices) => setNewDraft((d) => d && { ...d, choices })}
          />
          <input
            className="w-full text-xs bg-background border border-border rounded px-2 py-1 outline-none focus:border-primary"
            value={newDraft.explanation}
            onChange={(e) =>
              setNewDraft((d) => d && { ...d, explanation: e.target.value })
            }
            dir="rtl"
            placeholder="الشرح / القاعدة"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={saveNew}
              disabled={addQ.isPending}
              data-ocid="activities.grammar_new_save"
            >
              {addQ.isPending ? (
                <Loader2 size={10} className="animate-spin" />
              ) : (
                <Save size={12} />
              )}
              إضافة
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs gap-1"
              onClick={() => {
                setAdding(false);
                setNewDraft(null);
              }}
              data-ocid="activities.grammar_new_cancel"
            >
              <X size={12} /> إلغاء
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Exams Section ─────────────────────────────────────────────────
function ExamsSection() {
  const { data: backendQs = [], isLoading } = useQuestions({
    qtype: QuestionType.exam,
  });
  const addQ = useAddQuestion();
  const updateQ = useUpdateQuestion();
  const deleteQ = useDeleteQuestion();

  // Group by level
  const levelMap = new Map<number, Question[]>();
  for (const q of backendQs) {
    const lv = q.level != null ? Number(q.level) : 1;
    if (!levelMap.has(lv)) levelMap.set(lv, []);
    levelMap.get(lv)!.push(q);
  }

  // Merge static level metadata with backend questions
  const levels: (ExamLevel & { bqQuestions: Question[] })[] = EXAM_LEVELS.map(
    (lvl) => ({
      ...lvl,
      bqQuestions: levelMap.get(lvl.level) ?? [],
    }),
  );
  // Append any extra levels from backend not in EXAM_LEVELS
  for (const [lv, qs] of levelMap.entries()) {
    if (!EXAM_LEVELS.find((l) => l.level === lv)) {
      levels.push({
        level: lv,
        label: `مستوى ${lv}`,
        description: "",
        color: "bg-purple-50 border-purple-200 text-purple-800",
        starColors: ["#a78bfa", "#7c3aed", "#4c1d95"],
        questions: [],
        bqQuestions: qs,
      });
    }
  }

  const [openLevel, setOpenLevel] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editDraft, setEditDraft] = useState<{
    text: string;
    choices: string[];
    correctIndex: number;
  } | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [addingTo, setAddingTo] = useState<number | null>(null);
  const [newQDraft, setNewQDraft] = useState<{
    text: string;
    choices: string[];
    correctIndex: number;
  } | null>(null);
  const [addingExam, setAddingExam] = useState(false);
  const [newExamDraft, setNewExamDraft] = useState<{
    label: string;
    description: string;
  } | null>(null);

  const levelColors = [
    "bg-green-50 border-green-200 text-green-800",
    "bg-blue-50 border-blue-200 text-blue-800",
    "bg-yellow-50 border-yellow-200 text-yellow-800",
    "bg-orange-50 border-orange-200 text-orange-800",
    "bg-red-50 border-red-200 text-red-800",
  ];

  // Convert backend Question (exam) to local display format
  function toExamDisplay(q: Question) {
    return {
      text: q.text,
      choices: q.choices.map((c) => c.text),
      correctIndex: q.choices.findIndex((c) => c.correct),
    };
  }

  function startEditQ(q: Question) {
    const disp = toExamDisplay(q);
    setEditingId(q.id);
    setEditDraft({
      text: disp.text,
      choices: [...disp.choices],
      correctIndex: disp.correctIndex,
    });
  }

  async function saveEditQ(q: Question) {
    if (!editDraft || !editingId) return;
    const updatedChoices: Choice[] = editDraft.choices.map((ch, ci) => ({
      id: BigInt(ci),
      text: ch,
      correct: ci === editDraft.correctIndex,
    }));
    await updateQ.mutateAsync({
      ...q,
      text: editDraft.text,
      choices: updatedChoices,
    });
    setEditingId(null);
    setEditDraft(null);
  }

  async function handleDelete(id: bigint) {
    await deleteQ.mutateAsync(id);
    setDeleteId(null);
  }

  function startAddQ(lvl: number) {
    setAddingTo(lvl);
    setNewQDraft({ text: "", choices: ["", "", "", ""], correctIndex: 0 });
  }

  async function saveAddQ(lvl: number) {
    if (!newQDraft || !newQDraft.text.trim()) return;
    const choices: Choice[] = newQDraft.choices.map((ch, ci) => ({
      id: BigInt(ci),
      text: ch,
      correct: ci === newQDraft.correctIndex,
    }));
    await addQ.mutateAsync({
      id: 0n,
      qtype: QuestionType.exam,
      chapterId: undefined,
      level: BigInt(lvl),
      boxId: undefined,
      text: newQDraft.text,
      choices,
      explanation: "",
    });
    setAddingTo(null);
    setNewQDraft(null);
  }

  async function saveAddExam() {
    if (!newExamDraft || !newExamDraft.label.trim()) return;
    const maxLv = Math.max(0, ...levels.map((l) => l.level));
    const newLevel = maxLv + 1;
    // Persist a placeholder question so the level appears in the backend
    await addQ.mutateAsync({
      id: 0n,
      qtype: QuestionType.exam,
      chapterId: undefined,
      level: BigInt(newLevel),
      boxId: undefined,
      text: `${newExamDraft.label}${newExamDraft.description ? ` — ${newExamDraft.description}` : ""}`,
      choices: [
        { id: 0n, text: "أ", correct: true },
        { id: 1n, text: "ب", correct: false },
        { id: 2n, text: "ج", correct: false },
        { id: 3n, text: "د", correct: false },
      ],
      explanation: newExamDraft.description,
    });
    setAddingExam(false);
    setNewExamDraft(null);
  }

  const allLevels = levels;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground py-8 justify-center">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-sm">جارٍ تحميل الاختبارات...</span>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-ocid="activities.exams_section">
      <div className="flex justify-end mb-1">
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs gap-1"
          onClick={() => {
            setAddingExam(true);
            setNewExamDraft({ label: "", description: "" });
          }}
          data-ocid="activities.add_exam_button"
        >
          <Plus size={13} /> إضافة اختبار جديد
        </Button>
      </div>
      {allLevels.map((lvl, li) => (
        <div
          key={lvl.level}
          className="border border-border rounded-xl overflow-hidden"
          data-ocid={`activities.exam_level.${lvl.level}`}
        >
          <button
            type="button"
            onClick={() =>
              setOpenLevel(openLevel === lvl.level ? null : lvl.level)
            }
            className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted/40 transition-colors text-right"
          >
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${levelColors[li % levelColors.length]}`}
              >
                المستوى {lvl.level}
              </span>
              <span className="font-semibold text-foreground text-sm">
                {lvl.label}
              </span>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {lvl.description}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="outline" className="text-xs">
                {lvl.bqQuestions.length} سؤال
              </Badge>
              {openLevel === lvl.level ? (
                <ChevronUp size={16} className="text-muted-foreground" />
              ) : (
                <ChevronDown size={16} className="text-muted-foreground" />
              )}
            </div>
          </button>
          <AnimatePresence initial={false}>
            {openLevel === lvl.level && (
              <motion.div
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4 border-t border-border bg-background">
                  {lvl.bqQuestions.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      لا توجد أسئلة بعد
                    </p>
                  )}
                  {lvl.bqQuestions.map((q, qi) => {
                    const disp = toExamDisplay(q);
                    const isEditing = editingId === q.id;
                    const isDeletingThis = deleteId === q.id;
                    return (
                      <div
                        key={String(q.id)}
                        className="space-y-2 pb-3 border-b border-border last:border-0"
                      >
                        {isEditing && editDraft ? (
                          <div className="space-y-2">
                            <input
                              className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-primary"
                              value={editDraft.text}
                              onChange={(e) =>
                                setEditDraft(
                                  (d) => d && { ...d, text: e.target.value },
                                )
                              }
                              dir="rtl"
                              placeholder="نص السؤال"
                            />
                            <div className="space-y-1.5">
                              {editDraft.choices.map((ch, ci) => (
                                <div
                                  key={`ec-${LETTERS[ci]}`}
                                  className="flex items-center gap-2"
                                >
                                  <span className="text-xs font-bold text-muted-foreground w-4 shrink-0">
                                    {LETTERS[ci]}
                                  </span>
                                  <input
                                    className="flex-1 text-xs bg-background border border-border rounded px-2 py-1 outline-none focus:border-primary"
                                    value={ch}
                                    onChange={(e) => {
                                      const next = [...editDraft.choices];
                                      next[ci] = e.target.value;
                                      setEditDraft(
                                        (d) => d && { ...d, choices: next },
                                      );
                                    }}
                                    dir="rtl"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setEditDraft(
                                        (d) => d && { ...d, correctIndex: ci },
                                      )
                                    }
                                    className={`shrink-0 text-xs px-2 py-1 rounded border transition-colors ${
                                      editDraft.correctIndex === ci
                                        ? "bg-green-100 border-green-400 text-green-700 font-semibold"
                                        : "bg-card border-border text-muted-foreground"
                                    }`}
                                  >
                                    {editDraft.correctIndex === ci
                                      ? "✓ صحيحة"
                                      : "صحيحة؟"}
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2 mt-1">
                              <Button
                                size="sm"
                                className="h-7 text-xs gap-1"
                                onClick={() => saveEditQ(q)}
                                disabled={updateQ.isPending}
                                data-ocid={`activities.exam_save.${qi + 1}`}
                              >
                                {updateQ.isPending ? (
                                  <Loader2 size={10} className="animate-spin" />
                                ) : (
                                  <Save size={12} />
                                )}
                                حفظ
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs gap-1"
                                onClick={() => {
                                  setEditingId(null);
                                  setEditDraft(null);
                                }}
                                data-ocid={`activities.exam_cancel.${qi + 1}`}
                              >
                                <X size={12} /> إلغاء
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start gap-2">
                              <p className="text-sm font-medium text-foreground flex-1">
                                <span className="text-primary font-bold me-2">
                                  {qi + 1}.
                                </span>
                                {q.text}
                              </p>
                              <div className="flex gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => startEditQ(q)}
                                  className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                  title="تعديل"
                                  data-ocid={`activities.exam_edit.${qi + 1}`}
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteId(q.id)}
                                  className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                                  title="حذف"
                                  data-ocid={`activities.exam_delete.${qi + 1}`}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mr-4">
                              {disp.choices.map((ch, ci) => (
                                <div
                                  key={`ec-${String(q.id)}-${ci}`}
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${
                                    ci === disp.correctIndex
                                      ? "bg-green-50 border-green-300 text-green-800 font-semibold"
                                      : "bg-card border-border text-muted-foreground"
                                  }`}
                                >
                                  <span className="shrink-0 font-bold">
                                    {LETTERS[ci]}
                                  </span>
                                  <span className="flex-1">{ch}</span>
                                  {ci === disp.correctIndex && (
                                    <CheckCircle2
                                      size={13}
                                      className="text-green-600 shrink-0"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                            {isDeletingThis && (
                              <ConfirmDelete
                                onConfirm={() => handleDelete(q.id)}
                                onCancel={() => setDeleteId(null)}
                                isPending={deleteQ.isPending}
                              />
                            )}
                            {/* edit box */}
                            <button
                              type="button"
                              data-ocid={`activities.exam_edit_box.${qi + 1}`}
                              onClick={() => startEditQ(q)}
                              className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 border-2 border-dashed transition-smooth text-xs font-semibold"
                              style={{
                                background: "oklch(0.96 0.03 70)",
                                borderColor: "oklch(0.78 0.10 68)",
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
                                el.style.borderColor = "oklch(0.78 0.10 68)";
                              }}
                            >
                              <Edit2 size={12} />
                              ✏️ تعديل السؤال
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })}
                  {/* Add question */}
                  {addingTo === lvl.level && newQDraft ? (
                    <div className="space-y-2 border border-dashed border-primary/40 rounded-xl p-3">
                      <p className="text-xs font-semibold text-primary">
                        سؤال جديد
                      </p>
                      <input
                        className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-primary"
                        value={newQDraft.text}
                        onChange={(e) =>
                          setNewQDraft(
                            (d) => d && { ...d, text: e.target.value },
                          )
                        }
                        dir="rtl"
                        placeholder="نص السؤال"
                      />
                      <div className="space-y-1.5">
                        {newQDraft.choices.map((ch, ci) => (
                          <div
                            key={`nc-${LETTERS[ci]}`}
                            className="flex items-center gap-2"
                          >
                            <span className="text-xs font-bold text-muted-foreground w-4 shrink-0">
                              {LETTERS[ci]}
                            </span>
                            <input
                              className="flex-1 text-xs bg-background border border-border rounded px-2 py-1 outline-none focus:border-primary"
                              value={ch}
                              onChange={(e) => {
                                const next = [...newQDraft.choices];
                                next[ci] = e.target.value;
                                setNewQDraft(
                                  (d) => d && { ...d, choices: next },
                                );
                              }}
                              dir="rtl"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setNewQDraft(
                                  (d) => d && { ...d, correctIndex: ci },
                                )
                              }
                              className={`shrink-0 text-xs px-2 py-1 rounded border transition-colors ${
                                newQDraft.correctIndex === ci
                                  ? "bg-green-100 border-green-400 text-green-700 font-semibold"
                                  : "bg-card border-border text-muted-foreground"
                              }`}
                            >
                              {newQDraft.correctIndex === ci
                                ? "✓ صحيحة"
                                : "صحيحة؟"}
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <Button
                          size="sm"
                          className="h-7 text-xs gap-1"
                          onClick={() => saveAddQ(lvl.level)}
                          disabled={addQ.isPending}
                          data-ocid="activities.exam_add_save"
                        >
                          {addQ.isPending ? (
                            <Loader2 size={10} className="animate-spin" />
                          ) : (
                            <Save size={12} />
                          )}
                          إضافة
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1"
                          onClick={() => {
                            setAddingTo(null);
                            setNewQDraft(null);
                          }}
                          data-ocid="activities.exam_add_cancel"
                        >
                          <X size={12} /> إلغاء
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-dashed text-xs gap-1 text-muted-foreground hover:text-primary hover:border-primary"
                      onClick={() => startAddQ(lvl.level)}
                      data-ocid={`activities.exam_add_q_button.${lvl.level}`}
                    >
                      <Plus size={13} /> إضافة سؤال
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      {addingExam && newExamDraft && (
        <div className="border border-dashed border-primary/40 rounded-xl p-4 space-y-3">
          <p className="text-sm font-semibold text-primary">اختبار جديد</p>
          <input
            className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-primary"
            value={newExamDraft.label}
            onChange={(e) =>
              setNewExamDraft((d) => d && { ...d, label: e.target.value })
            }
            dir="rtl"
            placeholder="اسم الاختبار"
          />
          <input
            className="w-full text-xs bg-background border border-border rounded px-2 py-1 outline-none focus:border-primary"
            value={newExamDraft.description}
            onChange={(e) =>
              setNewExamDraft((d) => d && { ...d, description: e.target.value })
            }
            dir="rtl"
            placeholder="وصف الاختبار"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={saveAddExam}
              data-ocid="activities.new_exam_save"
            >
              <Save size={12} /> إنشاء
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs gap-1"
              onClick={() => {
                setAddingExam(false);
                setNewExamDraft(null);
              }}
              data-ocid="activities.new_exam_cancel"
            >
              <X size={12} /> إلغاء
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Games Section ─────────────────────────────────────────────────
function GamesSection() {
  const { data: backendQs = [], isLoading } = useQuestions({
    qtype: QuestionType.game,
  });
  const addQ = useAddQuestion();
  const updateQ = useUpdateQuestion();
  const deleteQ = useDeleteQuestion();

  // Group by boxId
  const boxMap = new Map<number, Question[]>();
  for (const q of backendQs) {
    const bid = q.boxId != null ? Number(q.boxId) : 1;
    if (!boxMap.has(bid)) boxMap.set(bid, []);
    boxMap.get(bid)!.push(q);
  }

  const [openBox, setOpenBox] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editDraft, setEditDraft] = useState<{
    text: string;
    choices: { text: string; correct: boolean }[];
  } | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [addingTo, setAddingTo] = useState<number | null>(null);
  const [newQDraft, setNewQDraft] = useState<{
    text: string;
    choices: { text: string; correct: boolean }[];
  } | null>(null);

  function startEditQ(q: Question) {
    setEditingId(q.id);
    setEditDraft({ text: q.text, choices: choicesToLocal(q.choices) });
  }

  async function saveEditQ(q: Question) {
    if (!editDraft || !editingId) return;
    await updateQ.mutateAsync({
      ...q,
      text: editDraft.text,
      choices: localToChoices(editDraft.choices),
    });
    setEditingId(null);
    setEditDraft(null);
  }

  async function handleDelete(id: bigint) {
    await deleteQ.mutateAsync(id);
    setDeleteId(null);
  }

  function startAdd(boxId: number) {
    setAddingTo(boxId);
    setNewQDraft({
      text: "",
      choices: [
        { text: "", correct: true },
        { text: "", correct: false },
        { text: "", correct: false },
        { text: "", correct: false },
      ],
    });
  }

  async function saveAdd(boxId: number) {
    if (!newQDraft || !newQDraft.text.trim()) return;
    await addQ.mutateAsync({
      id: 0n,
      qtype: QuestionType.game,
      chapterId: undefined,
      level: undefined,
      boxId: BigInt(boxId),
      text: newQDraft.text,
      choices: localToChoices(newQDraft.choices),
      explanation: "",
    });
    setAddingTo(null);
    setNewQDraft(null);
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground py-8 justify-center">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-sm">جارٍ تحميل الألعاب...</span>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-ocid="activities.games_section">
      {GAME_BOXES.map((box) => {
        const qs = boxMap.get(box.id) ?? [];
        return (
          <div
            key={box.id}
            className="border border-border rounded-xl overflow-hidden"
            data-ocid={`activities.game_box.${box.id}`}
          >
            <button
              type="button"
              onClick={() => setOpenBox(openBox === box.id ? null : box.id)}
              className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted/40 transition-colors text-right"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{box.emoji}</span>
                <span className="font-semibold text-foreground text-sm">
                  {box.label}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="text-xs">
                  {qs.length} أسئلة
                </Badge>
                {openBox === box.id ? (
                  <ChevronUp size={16} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={16} className="text-muted-foreground" />
                )}
              </div>
            </button>
            <AnimatePresence initial={false}>
              {openBox === box.id && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-4 border-t border-border bg-background">
                    {qs.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-2">
                        لا توجد أسئلة بعد
                      </p>
                    )}
                    {qs.map((q, qi) => {
                      const isEditing = editingId === q.id;
                      const isDeletingThis = deleteId === q.id;
                      return (
                        <div
                          key={String(q.id)}
                          className="space-y-2 pb-3 border-b border-border last:border-0"
                        >
                          {isEditing && editDraft ? (
                            <div className="space-y-2">
                              <input
                                className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-primary"
                                value={editDraft.text}
                                onChange={(e) =>
                                  setEditDraft(
                                    (d) => d && { ...d, text: e.target.value },
                                  )
                                }
                                dir="rtl"
                                placeholder="نص السؤال"
                              />
                              <ChoiceEditor
                                choices={editDraft.choices}
                                onChange={(choices) =>
                                  setEditDraft((d) => d && { ...d, choices })
                                }
                              />
                              <div className="flex gap-2 mt-1">
                                <Button
                                  size="sm"
                                  className="h-7 text-xs gap-1"
                                  onClick={() => saveEditQ(q)}
                                  disabled={updateQ.isPending}
                                  data-ocid={`activities.game_save.${qi + 1}`}
                                >
                                  {updateQ.isPending ? (
                                    <Loader2
                                      size={10}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Save size={12} />
                                  )}
                                  حفظ
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs gap-1"
                                  onClick={() => {
                                    setEditingId(null);
                                    setEditDraft(null);
                                  }}
                                  data-ocid={`activities.game_cancel.${qi + 1}`}
                                >
                                  <X size={12} /> إلغاء
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-start gap-2">
                                <p className="text-sm font-medium text-foreground flex-1">
                                  <span className="text-primary font-bold me-2">
                                    {qi + 1}.
                                  </span>
                                  {q.text}
                                </p>
                                <div className="flex gap-1 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => startEditQ(q)}
                                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                    title="تعديل"
                                    data-ocid={`activities.game_edit.${qi + 1}`}
                                  >
                                    <Edit2 size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDeleteId(q.id)}
                                    className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                                    title="حذف"
                                    data-ocid={`activities.game_delete.${qi + 1}`}
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mr-4">
                                {q.choices.map((ch, ci) => (
                                  <div
                                    key={`gc-${String(q.id)}-c${ci}`}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${
                                      ch.correct
                                        ? "bg-green-50 border-green-300 text-green-800 font-semibold"
                                        : "bg-card border-border text-muted-foreground"
                                    }`}
                                  >
                                    <span className="shrink-0 font-bold">
                                      {LETTERS[ci]}
                                    </span>
                                    <span className="flex-1">{ch.text}</span>
                                    {ch.correct && (
                                      <CheckCircle2
                                        size={13}
                                        className="text-green-600 shrink-0"
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                              {isDeletingThis && (
                                <ConfirmDelete
                                  onConfirm={() => handleDelete(q.id)}
                                  onCancel={() => setDeleteId(null)}
                                  isPending={deleteQ.isPending}
                                />
                              )}
                              {/* edit box */}
                              <button
                                type="button"
                                data-ocid={`activities.game_edit_box.${qi + 1}`}
                                onClick={() => startEditQ(q)}
                                className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 border-2 border-dashed transition-smooth text-xs font-semibold"
                                style={{
                                  background: "oklch(0.96 0.03 70)",
                                  borderColor: "oklch(0.78 0.10 68)",
                                  color: "oklch(0.42 0.10 65)",
                                }}
                                onMouseEnter={(e) => {
                                  const el =
                                    e.currentTarget as HTMLButtonElement;
                                  el.style.background = "oklch(0.90 0.06 70)";
                                  el.style.borderColor = "oklch(0.55 0.13 68)";
                                }}
                                onMouseLeave={(e) => {
                                  const el =
                                    e.currentTarget as HTMLButtonElement;
                                  el.style.background = "oklch(0.96 0.03 70)";
                                  el.style.borderColor = "oklch(0.78 0.10 68)";
                                }}
                              >
                                <Edit2 size={12} />
                                ✏️ تعديل السؤال
                              </button>
                            </>
                          )}
                        </div>
                      );
                    })}
                    {addingTo === box.id && newQDraft ? (
                      <div className="space-y-2 border border-dashed border-primary/40 rounded-xl p-3">
                        <p className="text-xs font-semibold text-primary">
                          سؤال جديد
                        </p>
                        <input
                          className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-primary"
                          value={newQDraft.text}
                          onChange={(e) =>
                            setNewQDraft(
                              (d) => d && { ...d, text: e.target.value },
                            )
                          }
                          dir="rtl"
                          placeholder="نص السؤال"
                        />
                        <ChoiceEditor
                          choices={newQDraft.choices}
                          onChange={(choices) =>
                            setNewQDraft((d) => d && { ...d, choices })
                          }
                        />
                        <div className="flex gap-2 mt-1">
                          <Button
                            size="sm"
                            className="h-7 text-xs gap-1"
                            onClick={() => saveAdd(box.id)}
                            disabled={addQ.isPending}
                            data-ocid="activities.game_add_save"
                          >
                            {addQ.isPending ? (
                              <Loader2 size={10} className="animate-spin" />
                            ) : (
                              <Save size={12} />
                            )}
                            إضافة
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs gap-1"
                            onClick={() => {
                              setAddingTo(null);
                              setNewQDraft(null);
                            }}
                            data-ocid="activities.game_add_cancel"
                          >
                            <X size={12} /> إلغاء
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-dashed text-xs gap-1 text-muted-foreground hover:text-primary hover:border-primary"
                        onClick={() => startAdd(box.id)}
                        data-ocid={`activities.game_add_button.${box.id}`}
                      >
                        <Plus size={13} /> إضافة سؤال
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────
export default function StudentActivities() {
  const [activeSection, setActiveSection] = useState<SectionId>("chapters");

  return (
    <div dir="rtl" className="space-y-5" data-ocid="activities.page">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-3xl">🎓</span>
        <div>
          <h2 className="text-xl font-bold text-foreground">أنشطة الطلبة</h2>
          <p className="text-sm text-muted-foreground">
            إدارة كاملة للأسئلة والألعاب — تعديل · حذف · إضافة
          </p>
        </div>
        <Badge variant="secondary" className="mr-auto text-xs">
          للمعلمة فقط · إدارة
        </Badge>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2" data-ocid="activities.section_tabs">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            type="button"
            data-ocid={`activities.tab.${sec.id}`}
            onClick={() => setActiveSection(sec.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-smooth ${
              activeSection === sec.id
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card border-border text-foreground hover:bg-muted/40"
            }`}
          >
            <span>{sec.emoji}</span>
            <span>{sec.label}</span>
            <span
              className={`text-xs hidden sm:inline ${
                activeSection === sec.id
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              }`}
            >
              ({sec.count})
            </span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
          🟢 سهل
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
          🟡 متوسط
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">
          🔴 صعب
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-300">
          <CheckCircle2 size={11} /> الإجابة الصحيحة
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">
          <Edit2 size={11} /> تعديل
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
          <Trash2 size={11} /> حذف
        </span>
      </div>

      {activeSection === "chapters" && <ChaptersSection />}
      {activeSection === "grammar" && <GrammarSection />}
      {activeSection === "exams" && <ExamsSection />}
      {activeSection === "games" && <GamesSection />}
    </div>
  );
}
