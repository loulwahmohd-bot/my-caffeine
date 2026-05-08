import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { useSessionStore } from "@/store/sessionStore";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  GamepadIcon,
  GraduationCap,
  Home,
  PenLine,
  Sigma,
  UserCircle2,
} from "lucide-react";
import { Sidebar } from "./Sidebar";

const BOTTOM_NAV = [
  { to: "/home", icon: <Home size={20} />, label: "الرئيسية" },
  { to: "/chapters", icon: <BookOpen size={20} />, label: "الفصول" },
  { to: "/exams", icon: <GraduationCap size={20} />, label: "الاختبارات" },
  { to: "/games", icon: <GamepadIcon size={20} />, label: "الألعاب" },
  { to: "/grammar", icon: <Sigma size={20} />, label: "النحو" },
  { to: "/writing", icon: <PenLine size={20} />, label: "الكتابي" },
  { to: "/characters", icon: <UserCircle2 size={20} />, label: "شخصيات" },
];

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth = false }: LayoutProps) {
  const { name, sessionId } = useSessionStore();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="bg-card border-b border-border shadow-xs sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 h-14">
        <div className="flex items-center gap-3">
          <Link
            to="/home"
            className="font-display text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            الولد والنعام
          </Link>
          {sessionId && (
            <span className="hidden sm:inline text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono">
              {sessionId.slice(0, 8)}...
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {name && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                {name.charAt(0)}
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground">
                {name}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main
          className={cn(
            "flex-1 overflow-y-auto",
            fullWidth ? "" : "max-w-5xl mx-auto w-full px-4 md:px-6 py-6",
          )}
        >
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex items-center justify-around px-2 py-1 z-30">
        {BOTTOM_NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            data-ocid={`bottom_nav.${item.label}`}
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-xs transition-smooth min-w-0",
              pathname === item.to
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.icon}
            <span className="truncate text-[10px]">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Credit */}
      <div
        className="fixed bottom-3 left-3 z-40 pointer-events-none"
        data-ocid="credit.label"
      >
        <span className="text-[10px] text-muted-foreground/60 font-medium select-none">
          ✨ عائشه الضنحاني
        </span>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}
