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
  useAssignments,
  useCreateAssignment,
  useDeleteAssignment,
  useGradeSubmission,
  useStudents,
  useSubmissions,
} from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";
import type { Assignment } from "@/types";
import { AssignmentType } from "@/types";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TYPE_LABELS: Record<AssignmentType, string> = {
  [AssignmentType.writing]: "كتابي",
  [AssignmentType.mcq]: "اختيار من متعدد",
  [AssignmentType.drawing]: "رسم",
  [AssignmentType.poll]: "تصويت",
};

function SubmissionsPanel({ assignment }: { assignment: Assignment }) {
  const { data: submissions = [], isLoading } = useSubmissions(assignment.id);
  const { data: students = [] } = useStudents(
    useSessionStore.getState().sessionId,
  );
  const gradeSubmission = useGradeSubmission();
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});

  const studentName = (userId: string) =>
    students.find((s) => s.userId === userId)?.name ?? userId;

  const handleGrade = async (userId: string) => {
    const g = Number(grades[userId] ?? 0);
    await gradeSubmission.mutateAsync({
      assignmentId: assignment.id,
      userId,
      grade: BigInt(g),
      feedback: feedbacks[userId] ?? "",
    });
    toast.success("تم حفظ الدرجة");
  };

  if (isLoading)
    return (
      <div className="py-4">
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    );

  return (
    <div
      className="mt-4 border-t border-border pt-4 space-y-3"
      data-ocid="teacher.submissions_panel"
    >
      <p className="text-sm font-semibold text-muted-foreground">
        {submissions.length} إجابة
      </p>
      {submissions.length === 0 ? (
        <p
          className="text-sm text-muted-foreground py-2"
          data-ocid="teacher.submissions_empty_state"
        >
          لم تسلّم أي طالبة بعد
        </p>
      ) : (
        submissions.map((sub, i) => (
          <div
            key={`${sub.userId}-${i}`}
            data-ocid={`teacher.submission.${i + 1}`}
            className="bg-muted/20 rounded-xl p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-foreground">
                {studentName(sub.userId)}
              </span>
              <Badge
                variant={sub.status === "graded" ? "default" : "secondary"}
                className="text-xs"
              >
                {sub.status === "graded" ? "مصحَّح" : "مُسلَّم"}
              </Badge>
            </div>
            {assignment.atype === AssignmentType.drawing ? (
              sub.answer.startsWith("data:") ? (
                <img
                  src={sub.answer}
                  alt="رسم الطالبة"
                  className="max-h-48 rounded-lg border border-border"
                />
              ) : (
                <p className="text-sm text-muted-foreground">[رسم]</p>
              )
            ) : (
              <p className="text-sm text-foreground bg-card rounded-lg px-3 py-2 border border-border">
                {sub.answer}
              </p>
            )}
            <div className="flex gap-2">
              <Input
                data-ocid={`teacher.grade_input.${i + 1}`}
                type="number"
                min="0"
                max="100"
                placeholder="الدرجة"
                value={
                  grades[sub.userId] ??
                  (sub.grade !== undefined ? String(sub.grade) : "")
                }
                onChange={(e) =>
                  setGrades((g) => ({ ...g, [sub.userId]: e.target.value }))
                }
                className="w-20"
              />
              <Input
                data-ocid={`teacher.feedback_input.${i + 1}`}
                placeholder="ملاحظة..."
                value={feedbacks[sub.userId] ?? sub.feedback ?? ""}
                onChange={(e) =>
                  setFeedbacks((f) => ({ ...f, [sub.userId]: e.target.value }))
                }
                className="flex-1"
              />
              <Button
                type="button"
                size="sm"
                data-ocid={`teacher.save_grade_button.${i + 1}`}
                onClick={() => handleGrade(sub.userId)}
                disabled={gradeSubmission.isPending}
              >
                حفظ
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default function Assignments() {
  const { sessionId } = useSessionStore();
  const { data: assignments = [], isLoading } = useAssignments(sessionId);
  const createAssignment = useCreateAssignment();
  const deleteAssignment = useDeleteAssignment();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [atype, setAtype] = useState<AssignmentType>(AssignmentType.writing);
  const [expanded, setExpanded] = useState<bigint | null>(null);

  const handleCreate = async () => {
    if (!sessionId || !title.trim() || !content.trim()) return;
    try {
      await createAssignment.mutateAsync({
        sessionId,
        title: title.trim(),
        atype,
        content: content.trim(),
      });
      toast.success("تم إنشاء الواجب وإرساله لجميع الطالبات");
      setTitle("");
      setContent("");
      setShowForm(false);
    } catch {
      toast.error("حدث خطأ أثناء الإنشاء");
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("هل تريدين حذف هذا الواجب؟")) return;
    await deleteAssignment.mutateAsync(id);
    toast.success("تم الحذف");
  };

  return (
    <div className="space-y-5" data-ocid="teacher.assignments_section">
      {/* Create Button */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-foreground">الواجبات المنشورة</h2>
        <Button
          type="button"
          data-ocid="teacher.new_assignment_button"
          onClick={() => setShowForm(!showForm)}
          size="sm"
          className="gap-1"
        >
          <Plus size={15} />
          إضافة واجب
        </Button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div
          className="bg-muted/20 border border-primary/20 rounded-2xl p-5 space-y-4"
          data-ocid="teacher.create_assignment_form"
        >
          <h3 className="font-bold text-foreground">📝 واجب جديد</h3>
          <div className="space-y-1">
            <label
              htmlFor="assign-title"
              className="text-sm font-medium text-foreground"
            >
              عنوان الواجب
            </label>
            <Input
              id="assign-title"
              data-ocid="teacher.assignment_title_input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: اكتبي ملخصاً للفصل الأول"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="assign-type"
              className="text-sm font-medium text-foreground"
            >
              نوع الواجب
            </label>
            <Select
              value={atype}
              onValueChange={(v) => setAtype(v as AssignmentType)}
            >
              <SelectTrigger
                id="assign-type"
                data-ocid="teacher.assignment_type_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={AssignmentType.writing}>📝 كتابي</SelectItem>
                <SelectItem value={AssignmentType.mcq}>
                  🔤 اختيار من متعدد
                </SelectItem>
                <SelectItem value={AssignmentType.drawing}>🎨 رسم</SelectItem>
                <SelectItem value={AssignmentType.poll}>📊 تصويت</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="assign-content"
              className="text-sm font-medium text-foreground"
            >
              محتوى الواجب / السؤال
            </label>
            <Textarea
              id="assign-content"
              data-ocid="teacher.assignment_content_input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                atype === AssignmentType.poll
                  ? "خياراتك: اكتبي كل خيار في سطر"
                  : "اكتبي السؤال أو الوصف..."
              }
              rows={4}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              data-ocid="teacher.create_assignment_submit_button"
              onClick={handleCreate}
              disabled={
                createAssignment.isPending || !title.trim() || !content.trim()
              }
            >
              نشر الواجب للطالبات
            </Button>
            <Button
              type="button"
              variant="outline"
              data-ocid="teacher.create_assignment_cancel_button"
              onClick={() => setShowForm(false)}
            >
              إلغاء
            </Button>
          </div>
        </div>
      )}

      {/* Assignments List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : assignments.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="teacher.assignments_empty_state"
        >
          <p className="text-4xl mb-3">📋</p>
          <p className="font-medium">لا توجد واجبات بعد</p>
          <p className="text-xs mt-1">اضغطي على "إضافة واجب" لإنشاء أول واجب</p>
        </div>
      ) : (
        <div className="space-y-3">
          {assignments.map((a, i) => (
            <div
              key={String(a.id)}
              data-ocid={`teacher.assignment.${i + 1}`}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {a.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {TYPE_LABELS[a.atype]}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    data-ocid={`teacher.review_assignment.${i + 1}`}
                    onClick={() => setExpanded(expanded === a.id ? null : a.id)}
                    className="gap-1 text-xs"
                  >
                    {expanded === a.id ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                    الإجابات
                  </Button>
                  <button
                    type="button"
                    data-ocid={`teacher.delete_assignment.${i + 1}`}
                    onClick={() => handleDelete(a.id)}
                    className="text-destructive hover:opacity-70 transition-colors p-1.5 rounded-lg hover:bg-destructive/10"
                    aria-label="حذف الواجب"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              {expanded === a.id && (
                <div className="px-4 pb-4">
                  <SubmissionsPanel assignment={a} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
