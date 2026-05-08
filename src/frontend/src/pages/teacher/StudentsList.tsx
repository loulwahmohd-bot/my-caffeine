import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useStudents } from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";
import type { Student } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";
import StudentDetail from "./StudentDetail";

export default function StudentsList() {
  const { sessionId } = useSessionStore();
  const { data: students = [], isLoading } = useStudents(sessionId);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Student | null>(null);

  const filtered = students.filter(
    (s) => s.name.includes(search) || s.className.includes(search),
  );

  if (selected) {
    return (
      <StudentDetail student={selected} onBack={() => setSelected(null)} />
    );
  }

  return (
    <div className="space-y-4" data-ocid="teacher.students_section">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground"
        />
        <Input
          data-ocid="teacher.students_search_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث باسم الطالبة أو الشعبة..."
          className="pr-9"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="teacher.students_empty_state"
        >
          <p className="text-4xl mb-3">👧</p>
          <p className="font-medium">
            {search ? "لا نتائج للبحث" : "لم تنضم أي طالبة بعد"}
          </p>
          <p className="text-xs mt-1">
            {!search && "شاركي كود الجلسة مع طالباتك"}
          </p>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="teacher.students_list">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/30 rounded-lg">
            <span>الطالبة</span>
            <span>النقاط</span>
            <span>الأوسمة</span>
            <span>عرض</span>
          </div>
          {filtered.map((s, i) => {
            const totalPct =
              s.chapterProgress.length > 0
                ? Math.round(
                    (s.chapterProgress.filter((c) => c.completed).length /
                      s.chapterProgress.length) *
                      100,
                  )
                : 0;
            return (
              <div
                key={s.userId}
                data-ocid={`teacher.student.${i + 1}`}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-smooth"
              >
                <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary text-lg shrink-0">
                  {s.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {s.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.className}</p>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div
                      className="h-1.5 bg-primary rounded-full"
                      style={{ width: `${totalPct}%` }}
                    />
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
                  <span className="font-bold text-primary text-sm">
                    {String(s.points)} نقطة
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {s.badges.length} وسام
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1 md:hidden shrink-0">
                  <Badge variant="secondary" className="text-xs">
                    {String(s.points)} نقطة
                  </Badge>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  data-ocid={`teacher.view_student.${i + 1}`}
                  onClick={() => setSelected(s)}
                >
                  عرض
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
