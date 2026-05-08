import { cn } from "@/lib/utils";
import { useSessionStore } from "@/store/sessionStore";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  GamepadIcon,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  PenLine,
  Sigma,
  Trophy,
  UserCircle2,
  Users,
} from "lucide-react";

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  roles?: Array<"teacher" | "student">;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/home", icon: <Home size={18} />, label: "الرئيسية" },
  { to: "/chapters", icon: <BookOpen size={18} />, label: "أسئلة الفصول" },
  { to: "/grammar", icon: <Sigma size={18} />, label: "العدد والمعدود" },
  { to: "/exams", icon: <GraduationCap size={18} />, label: "الاختبارات" },
  { to: "/games", icon: <GamepadIcon size={18} />, label: "الألعاب" },
  { to: "/writing", icon: <PenLine size={18} />, label: "الكتابي" },
  { to: "/characters", icon: <UserCircle2 size={18} />, label: "الشخصيات" },
  { to: "/student", icon: <Trophy size={18} />, label: "ملفي" },
  {
    to: "/teacher",
    icon: <LayoutDashboard size={18} />,
    label: "لوحة المعلمة",
    roles: ["teacher"],
  },
  {
    to: "/teacher/students",
    icon: <Users size={18} />,
    label: "الطالبات",
    roles: ["teacher"],
  },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const { role, name, clearSession } = useSessionStore();

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.roles || (role && item.roles.includes(role)),
  );

  return (
    <aside className="hidden md:flex flex-col w-56 bg-sidebar border-l border-sidebar-border min-h-screen shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-sidebar-border">
        <h1 className="font-display text-lg font-bold text-foreground leading-tight">
          الجَميان
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">الولد والنعامة</p>
      </div>

      {/* Nav */}
      <nav
        className="flex-1 px-3 py-4 space-y-0.5"
        aria-label="القائمة الرئيسية"
      >
        {visibleItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            data-ocid={`sidebar.link.${item.label}`}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-smooth w-full text-right",
              pathname === item.to || pathname.startsWith(`${item.to}/`)
                ? "bg-primary/15 text-foreground font-semibold border-r-2 border-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <span className="shrink-0 opacity-70">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User */}
      {name && (
        <div className="px-4 py-4 border-t border-sidebar-border">
          <p className="text-sm font-medium text-foreground truncate">{name}</p>
          <p className="text-xs text-muted-foreground mb-3">
            {role === "teacher" ? "معلمة" : "طالبة"}
          </p>
          <button
            type="button"
            data-ocid="sidebar.logout_button"
            onClick={clearSession}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors w-full"
          >
            <LogOut size={14} />
            <span>خروج</span>
          </button>
        </div>
      )}
    </aside>
  );
}
