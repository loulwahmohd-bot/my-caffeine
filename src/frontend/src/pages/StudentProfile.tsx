import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "@tanstack/react-router";

const STUDENT_TABS = [
  { to: "/student", label: "الرئيسية", icon: "🏠" },
  { to: "/student/chapters", label: "الفصول", icon: "📖" },
  { to: "/student/exams", label: "الاختبارات", icon: "📝" },
  { to: "/student/games", label: "الألعاب", icon: "🎮" },
  { to: "/student/progress", label: "التطور", icon: "📊" },
  { to: "/student/drawing", label: "الرسم", icon: "🎨" },
  { to: "/student/notes", label: "الملاحظات", icon: "📒" },
];

export default function StudentProfile() {
  const { pathname } = useLocation();
  const activeTab =
    pathname === "/student"
      ? "/student"
      : (STUDENT_TABS.find(
          (t) => t.to !== "/student" && pathname.startsWith(t.to),
        )?.to ?? "/student");

  return (
    <Layout>
      <div dir="rtl" data-ocid="student.page">
        {/* Sub-navigation tabs */}
        <div
          className="bg-card border border-border rounded-xl p-1 flex gap-1 overflow-x-auto mb-5 scrollbar-none"
          data-ocid="student.tabs"
        >
          {STUDENT_TABS.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              data-ocid={`student.tab.${tab.label}`}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth",
                activeTab === tab.to
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              )}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          ))}
        </div>

        {/* Sub-page content */}
        <Outlet />
      </div>
    </Layout>
  );
}
