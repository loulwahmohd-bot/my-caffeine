import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGradeSubmission,
  useMySubmissions,
  useStudent,
  useStudents,
} from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";
import { AssignmentStatus } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

export default function TeacherStudents() {
  const { sessionId } = useSessionStore();
  const { data: students = [], isLoading } = useStudents(sessionId);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { data: selected } = useStudent(selectedUserId);
  const { data: submissions = [] } = useMySubmissions(selectedUserId);
  const gradeSubmission = useGradeSubmission();
  const [gradingId, setGradingId] = useState<string | null>(null);
  const [grade, setGrade] = useState("8");
  const [feedback, setFeedback] = useState("");

  const handleGrade = async (assignmentId: bigint, userId: string) => {
    const res = await gradeSubmission.mutateAsync({
      assignmentId,
      userId,
      grade: BigInt(Number(grade)),
      feedback,
    });
    if (res.__kind__ === "err") {
      toast.error(res.err);
      return;
    }
    toast.success("تم التصحيح");
    setGradingId(null);
  };

  return (
    <Layout>
      <div className="space-y-6" data-ocid="teacher_students.page">
        <h1 className="text-2xl font-bold text-foreground">👧 الطالبات</h1>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        ) : students.length === 0 ? (
          <div
            className="text-center py-12 text-muted-foreground"
            data-ocid="teacher_students.empty_state"
          >
            <p className="text-4xl mb-3">👧</p>
            <p>لا توجد طالبات بعد</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {/* Student List */}
            <div
              className="md:col-span-1 space-y-2"
              data-ocid="teacher_students.list"
            >
              {students.map((s, i) => (
                <button
                  key={s.userId}
                  type="button"
                  data-ocid={`teacher_students.student.${i + 1}`}
                  onClick={() => setSelectedUserId(s.userId)}
                  className={`w-full text-right bg-card border rounded-xl p-4 transition-smooth ${
                    selectedUserId === s.userId
                      ? "border-primary shadow-xs"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate text-sm">
                        {s.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {s.className} • {String(s.points)} نقطة
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Student Detail */}
            <div className="md:col-span-2">
              {!selectedUserId ? (
                <div
                  className="text-center py-16 text-muted-foreground"
                  data-ocid="teacher_students.select_hint"
                >
                  ← اختاري طالبة
                </div>
              ) : !selected ? (
                <Skeleton className="h-48 w-full rounded-xl" />
              ) : (
                <div className="space-y-5">
                  {/* Profile */}
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h2 className="text-xl font-bold text-foreground mb-3">
                      {selected.name}
                    </h2>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-xl font-bold text-primary">
                          {String(selected.points)}
                        </p>
                        <p className="text-xs text-muted-foreground">نقطة</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-foreground">
                          {selected.chapterProgress.length}
                        </p>
                        <p className="text-xs text-muted-foreground">فصول</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-secondary">
                          {selected.badges.length}
                        </p>
                        <p className="text-xs text-muted-foreground">وسام</p>
                      </div>
                    </div>
                  </div>

                  {/* Chapter progress */}
                  {selected.chapterProgress.length > 0 && (
                    <div className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-bold text-foreground mb-3">
                        تقدم الفصول
                      </h3>
                      <div className="space-y-2">
                        {selected.chapterProgress.map((p) => (
                          <div
                            key={String(p.chapterId)}
                            className="flex items-center gap-3"
                          >
                            <span className="text-xs font-bold text-primary w-6 shrink-0">
                              {String(p.chapterId)}
                            </span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="h-2 bg-primary rounded-full"
                                style={{ width: `${Number(p.score)}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {String(p.score)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submissions */}
                  {submissions.length > 0 && (
                    <div className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-bold text-foreground mb-3">
                        الواجبات
                      </h3>
                      <div className="space-y-3">
                        {submissions.map((sub, i) => (
                          <div
                            key={`${String(sub.assignmentId)}-${sub.userId}`}
                            data-ocid={`teacher_students.submission.${i + 1}`}
                            className="border border-border rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-muted-foreground">
                                واجب #{String(sub.assignmentId)}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  sub.status === AssignmentStatus.graded
                                    ? "bg-green-100 text-green-700"
                                    : sub.status === AssignmentStatus.submitted
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {sub.status === AssignmentStatus.graded
                                  ? "مصحح"
                                  : sub.status === AssignmentStatus.submitted
                                    ? "مسلّم"
                                    : "معلق"}
                              </span>
                            </div>
                            <p className="text-sm text-foreground mb-3">
                              {sub.answer}
                            </p>
                            {sub.status === AssignmentStatus.submitted &&
                            gradingId !== String(sub.assignmentId) ? (
                              <button
                                type="button"
                                data-ocid={`teacher_students.grade_button.${i + 1}`}
                                onClick={() =>
                                  setGradingId(String(sub.assignmentId))
                                }
                                className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-smooth"
                              >
                                تصحيح
                              </button>
                            ) : gradingId === String(sub.assignmentId) ? (
                              <div className="space-y-2">
                                <input
                                  type="number"
                                  min="0"
                                  max="10"
                                  value={grade}
                                  onChange={(e) => setGrade(e.target.value)}
                                  placeholder="الدرجة / 10"
                                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                <input
                                  value={feedback}
                                  onChange={(e) => setFeedback(e.target.value)}
                                  placeholder="ملاحظة (اختياري)"
                                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    data-ocid={`teacher_students.confirm_grade.${i + 1}`}
                                    onClick={() =>
                                      handleGrade(sub.assignmentId, sub.userId)
                                    }
                                    className="bg-primary text-primary-foreground text-xs px-4 py-2 rounded-lg hover:opacity-90"
                                  >
                                    حفظ
                                  </button>
                                  <button
                                    type="button"
                                    data-ocid={`teacher_students.cancel_grade.${i + 1}`}
                                    onClick={() => setGradingId(null)}
                                    className="text-xs text-muted-foreground hover:text-foreground"
                                  >
                                    إلغاء
                                  </button>
                                </div>
                              </div>
                            ) : sub.status === AssignmentStatus.graded ? (
                              <p className="text-xs text-secondary">
                                الدرجة: {String(sub.grade)}/10{" "}
                                {sub.feedback && `- ${sub.feedback}`}
                              </p>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
