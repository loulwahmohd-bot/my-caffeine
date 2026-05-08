import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useClassCompletion,
  useEndSession,
  useLeaderboard,
  useStudents,
} from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  ClipboardList,
  GamepadIcon,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  PenLine,
  Sigma,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Assignments from "./teacher/Assignments";
import ClassStats from "./teacher/ClassStats";
import QuestionManager from "./teacher/QuestionManager";
import StudentActivities from "./teacher/StudentActivities";
import StudentsList from "./teacher/StudentsList";

type Tab =
  | "dashboard"
  | "students"
  | "assignments"
  | "questions"
  | "stats"
  | "activities";

export default function TeacherDashboard() {
  const { sessionId, userId } = useSessionStore();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [endConfirm, setEndConfirm] = useState(false);

  const { data: students = [], isLoading: studentsLoading } =
    useStudents(sessionId);
  const { data: completion } = useClassCompletion(sessionId);
  const { data: leaderboard = [] } = useLeaderboard(sessionId);
  const endSession = useEndSession();
  const navigate = useNavigate();

  const classPct = completion ? Number(completion) : 0;

  const handleEndSession = async () => {
    if (!endConfirm) {
      setEndConfirm(true);
      return;
    }
    if (!sessionId) return;
    try {
      await endSession.mutateAsync({ sessionId, teacherId: userId });
      toast.success("تم إنهاء الجلسة بنجاح");
      useSessionStore.getState().clearSession();
      navigate({ to: "/" });
    } catch {
      toast.error("حدث خطأ أثناء إنهاء الجلسة");
    } finally {
      setEndConfirm(false);
    }
  };

  const TABS = [
    {
      id: "dashboard" as Tab,
      label: "الرئيسية",
      icon: <LayoutDashboard size={16} />,
    },
    { id: "students" as Tab, label: "الطالبات", icon: <Users size={16} /> },
    {
      id: "assignments" as Tab,
      label: "الواجبات",
      icon: <ClipboardList size={16} />,
    },
    {
      id: "questions" as Tab,
      label: "الأسئلة",
      icon: <HelpCircle size={16} />,
    },
    {
      id: "stats" as Tab,
      label: "الإحصائيات",
      icon: <GraduationCap size={16} />,
    },
    {
      id: "activities" as Tab,
      label: "أنشطة الطلبة",
      icon: <Activity size={16} />,
    },
  ];

  const STUDENT_LINKS = [
    { to: "/home", icon: <LayoutDashboard size={15} />, label: "الرئيسية" },
    { to: "/chapters", icon: <BookOpen size={15} />, label: "أسئلة الفصول" },
    { to: "/grammar", icon: <Sigma size={15} />, label: "العدد والمعدود" },
    { to: "/exams", icon: <GraduationCap size={15} />, label: "الاختبارات" },
    { to: "/games", icon: <GamepadIcon size={15} />, label: "الألعاب" },
    { to: "/writing", icon: <PenLine size={15} />, label: "الكتابي" },
  ];

  return (
    <Layout>
      <div dir="rtl" data-ocid="teacher.page">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              👩‍🏫 لوحة المعلمة
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-muted-foreground">كود الجلسة:</span>
              <button
                type="button"
                className="font-mono font-bold text-base bg-primary/10 text-primary px-3 py-0.5 rounded-lg tracking-widest cursor-pointer select-all border-none outline-none"
                title="انقري للنسخ"
                data-ocid="teacher.session_code"
                onClick={() => {
                  navigator.clipboard.writeText(sessionId ?? "");
                  toast.success("تم نسخ الكود");
                }}
              >
                {sessionId ?? "—"}
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            {!endConfirm ? (
              <Button
                variant="destructive"
                size="sm"
                data-ocid="teacher.end_session_button"
                onClick={handleEndSession}
              >
                إنهاء الجلسة
              </Button>
            ) : (
              <div className="flex gap-2 items-center">
                <span className="text-sm text-destructive font-medium">
                  هل أنتِ متأكدة؟
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  data-ocid="teacher.end_session_confirm_button"
                  onClick={handleEndSession}
                  disabled={endSession.isPending}
                >
                  نعم، أنهِ
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="teacher.end_session_cancel_button"
                  onClick={() => setEndConfirm(false)}
                >
                  إلغاء
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Tab Nav */}
        <div
          className="flex overflow-x-auto gap-1 bg-muted/30 rounded-xl p-1 mb-6 border border-border"
          data-ocid="teacher.tabs"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-ocid={`teacher.tab.${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap flex-1 justify-center ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-6" data-ocid="teacher.dashboard_section">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-2xl p-5 text-center">
                {studentsLoading ? (
                  <Skeleton className="h-8 w-12 mx-auto mb-1" />
                ) : (
                  <p className="text-3xl font-bold text-primary">
                    {students.length}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">طالبة في الجلسة</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 text-center">
                <p className="text-3xl font-bold text-primary">{classPct}%</p>
                <p className="text-sm text-muted-foreground">
                  متوسط استيعاب الشعبة
                </p>
              </div>
              <div className="col-span-2 md:col-span-1 bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">
                    معدل الإنجاز
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {classPct}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${classPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div
              className="bg-card border border-border rounded-2xl p-5"
              data-ocid="teacher.leaderboard"
            >
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                🏆 ترتيب الطالبات
              </h2>
              {leaderboard.length === 0 ? (
                <p
                  className="text-center text-muted-foreground py-6"
                  data-ocid="teacher.leaderboard_empty_state"
                >
                  لم تبدأ الطالبات بعد
                </p>
              ) : (
                <div className="space-y-2">
                  {leaderboard.slice(0, 10).map((s, i) => (
                    <div
                      key={s.userId}
                      data-ocid={`teacher.rank.${i + 1}`}
                      className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          i === 0
                            ? "bg-amber-100 text-amber-700"
                            : i === 1
                              ? "bg-muted text-muted-foreground"
                              : i === 2
                                ? "bg-orange-100 text-orange-700"
                                : "bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        {i === 0
                          ? "🥇"
                          : i === 1
                            ? "🥈"
                            : i === 2
                              ? "🥉"
                              : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {s.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {s.className}
                        </p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {String(s.points)} نقطة
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick links to student pages */}
            <div className="bg-muted/20 border border-border rounded-2xl p-5">
              <h2 className="font-bold text-foreground mb-3">
                📱 صفحات التطبيق (عرض الطالبات)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {STUDENT_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    data-ocid={`teacher.preview_link.${link.label}`}
                    className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-primary/5 hover:border-primary/30 transition-smooth"
                  >
                    <span className="text-primary opacity-80">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && <StudentsList />}
        {activeTab === "assignments" && <Assignments />}
        {activeTab === "questions" && <QuestionManager />}
        {activeTab === "stats" && <ClassStats />}
        {activeTab === "activities" && <StudentActivities />}
      </div>
    </Layout>
  );
}
