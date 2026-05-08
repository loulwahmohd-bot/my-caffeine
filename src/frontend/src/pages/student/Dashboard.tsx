import { useMySubmissions, useStudent } from "@/hooks/useBackend";
import { useProgressStore } from "@/store/progressStore";
import { useSessionStore } from "@/store/sessionStore";
import { CHAPTERS } from "@/types";
import { AssignmentStatus } from "@/types";
import { Link } from "@tanstack/react-router";

const STAT_TABS = [
  { to: "/student/chapters", label: "الفصول", icon: "📖" },
  { to: "/student/exams", label: "الاختبارات", icon: "📝" },
  { to: "/student/games", label: "الألعاب", icon: "🎮" },
  { to: "/student/drawing", label: "الرسم", icon: "🎨" },
  { to: "/student/notes", label: "الملاحظات", icon: "📒" },
  { to: "/student/progress", label: "التطور", icon: "📊" },
];

export default function Dashboard() {
  const { userId, name, className, sessionId, points } = useSessionStore();
  const { data: student } = useStudent(userId);
  const { data: submissions = [] } = useMySubmissions(userId);
  const { chapterProgress } = useProgressStore();

  const completedChapters = chapterProgress.filter((p) => p.completed);
  const pendingHomework = submissions.filter(
    (s) => s.status === AssignmentStatus.pending,
  ).length;
  const lastExam = student?.examScores?.length
    ? student.examScores[student.examScores.length - 1]
    : null;
  const unlockedCount = student?.unlockedChars?.length ?? 0;

  return (
    <div className="space-y-6" dir="rtl" data-ocid="student_dashboard.page">
      {/* Welcome banner */}
      <div
        className="bg-primary/10 border border-primary/30 rounded-2xl p-5 flex items-center gap-4"
        data-ocid="student_dashboard.welcome_card"
      >
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary shrink-0">
          {(name || "ط").charAt(0)}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-foreground">
            مرحبًا، {name || "طالبة"} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {className || "شعبة غير محددة"}
            {sessionId && (
              <span className="mr-2 font-mono text-xs">
                كود: {sessionId.slice(0, 8)}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        data-ocid="student_dashboard.stats"
      >
        {[
          {
            label: "نقاطي",
            value: String(student?.points ?? points ?? 0),
            icon: "⭐",
            ocid: "student_dashboard.stat.1",
          },
          {
            label: "شخصيات مفتوحة",
            value: String(unlockedCount),
            icon: "🦸",
            ocid: "student_dashboard.stat.2",
          },
          {
            label: "فصول مكتملة",
            value: String(completedChapters.length),
            icon: "📖",
            ocid: "student_dashboard.stat.3",
          },
          {
            label: "واجبات معلقة",
            value: String(pendingHomework),
            icon: "📌",
            ocid: "student_dashboard.stat.4",
          },
        ].map((s) => (
          <div
            key={s.label}
            data-ocid={s.ocid}
            className="bg-card border border-border rounded-xl p-4 text-center"
          >
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Last exam */}
      {lastExam && (
        <div
          className="bg-card border border-border rounded-xl p-4 flex items-center justify-between"
          data-ocid="student_dashboard.last_exam_card"
        >
          <div>
            <p className="text-xs text-muted-foreground">آخر اختبار</p>
            <p className="font-bold text-foreground">
              المستوى {String(lastExam.level)}
            </p>
          </div>
          <div className="text-left">
            <p className="text-2xl font-bold text-primary">
              {String(lastExam.score)}
              <span className="text-sm text-muted-foreground">
                /{String(lastExam.total)}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Recent chapters */}
      {completedChapters.length > 0 && (
        <div
          className="bg-card border border-border rounded-xl p-5"
          data-ocid="student_dashboard.recent_chapters"
        >
          <h2 className="font-bold text-foreground mb-3">📖 آخر الفصول</h2>
          <div className="space-y-2">
            {completedChapters.slice(-3).map((p) => {
              const ch = CHAPTERS.find((c) => c.id === p.chapterId);
              return (
                <div key={p.chapterId} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {p.chapterId}
                  </span>
                  <span className="flex-1 text-sm text-foreground truncate min-w-0">
                    {ch?.title ?? `فصل ${p.chapterId}`}
                  </span>
                  <span className="text-sm font-bold text-primary shrink-0">
                    {p.score}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div
        className="grid grid-cols-3 sm:grid-cols-6 gap-2"
        data-ocid="student_dashboard.quick_links"
      >
        {STAT_TABS.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            data-ocid={`student_dashboard.link.${t.label}`}
            className="bg-card hover:bg-primary/10 border border-border rounded-xl p-3 flex flex-col items-center gap-1 text-center transition-smooth"
          >
            <span className="text-2xl">{t.icon}</span>
            <span className="text-xs text-muted-foreground">{t.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
