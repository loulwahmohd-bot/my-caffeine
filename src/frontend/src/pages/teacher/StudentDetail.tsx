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
import {
  useAwardBadge,
  useGrantPoints,
  useMySubmissions,
  useStudent,
} from "@/hooks/useBackend";
import type { Student } from "@/types";
import { CHAPTERS } from "@/types";
import { ArrowRight, Medal, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  student: Student;
  onBack: () => void;
}

export default function StudentDetail({ student, onBack }: Props) {
  const { data: live } = useStudent(student.userId);
  const s = live ?? student;
  const { data: submissions = [], isLoading: subsLoading } = useMySubmissions(
    student.userId,
  );

  const grantPoints = useGrantPoints();
  const awardBadge = useAwardBadge();

  const [points, setPoints] = useState("5");
  const [badge, setBadge] = useState("medal");

  const handleGrant = async () => {
    const n = Number(points);
    if (!n || n < 1) return;
    try {
      await grantPoints.mutateAsync({ userId: s.userId, delta: BigInt(n) });
      toast.success(`تم منح ${n} نقطة لـ ${s.name}`);
    } catch {
      toast.error("حدث خطأ");
    }
  };

  const handleAward = async () => {
    try {
      const BADGE_LABELS: Record<string, string> = {
        medal: "🏅 ميدالية",
        star: "⭐ نجمة",
        heart: "❤️ قلب",
      };
      await awardBadge.mutateAsync({
        userId: s.userId,
        badge: { id: BigInt(Date.now()), title: BADGE_LABELS[badge] ?? badge },
      });
      toast.success(`تم منح وسام لـ ${s.name}`);
    } catch {
      toast.error("حدث خطأ");
    }
  };

  const chapterMap = new Map<number, string>(
    CHAPTERS.map((c) => [c.id as number, c.title]),
  );

  return (
    <div className="space-y-5" data-ocid="teacher.student_detail">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        data-ocid="teacher.student_detail_back_button"
        onClick={onBack}
        className="gap-2"
      >
        <ArrowRight size={16} />
        العودة للقائمة
      </Button>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center text-3xl font-bold text-primary shrink-0">
            {s.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-foreground">{s.name}</h2>
            <p className="text-sm text-muted-foreground">{s.className}</p>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="secondary">{String(s.points)} نقطة</Badge>
              <Badge variant="outline">{s.badges.length} وسام</Badge>
            </div>
          </div>
        </div>
        {s.badges.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {s.badges.map((b) => (
              <span
                key={String(b.id)}
                className="text-sm bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-0.5"
              >
                {b.title}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Grant Points & Award Badge */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-muted/20 border border-border rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Star size={16} className="text-amber-500" />
            منح نقاط إضافية
          </h3>
          <div className="flex gap-2">
            <Input
              data-ocid="teacher.grant_points_input"
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              min="1"
              max="100"
              placeholder="عدد النقاط"
              className="flex-1"
            />
            <Button
              data-ocid="teacher.grant_points_button"
              onClick={handleGrant}
              disabled={grantPoints.isPending}
              size="sm"
            >
              منح
            </Button>
          </div>
        </div>

        <div className="bg-muted/20 border border-border rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Medal size={16} className="text-primary" />
            منح وسام
          </h3>
          <div className="flex gap-2">
            <Select value={badge} onValueChange={setBadge}>
              <SelectTrigger
                data-ocid="teacher.badge_select"
                className="flex-1"
              >
                <SelectValue placeholder="اختاري الوسام" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medal">🏅 ميدالية</SelectItem>
                <SelectItem value="star">⭐ نجمة</SelectItem>
                <SelectItem value="heart">❤️ قلب</SelectItem>
              </SelectContent>
            </Select>
            <Button
              data-ocid="teacher.award_badge_button"
              onClick={handleAward}
              disabled={awardBadge.isPending}
              size="sm"
              variant="secondary"
            >
              منح
            </Button>
          </div>
        </div>
      </div>

      {/* Chapter Progress */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-bold text-foreground mb-4">📖 تقدم الفصول</h3>
        {s.chapterProgress.length === 0 ? (
          <p className="text-muted-foreground text-sm py-2">لم تبدأ بعد</p>
        ) : (
          <div className="space-y-2">
            {s.chapterProgress.map((cp) => (
              <div
                key={String(cp.chapterId)}
                className="flex items-center gap-3 py-1.5 border-b border-border last:border-0"
              >
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${cp.completed ? "bg-primary" : "bg-muted-foreground/40"}`}
                />
                <span className="flex-1 text-sm text-foreground truncate">
                  {(chapterMap as Map<number, string>).get(
                    Number(cp.chapterId),
                  ) ?? `فصل ${String(cp.chapterId)}`}
                </span>
                <span
                  className={`text-sm font-bold ${cp.completed ? "text-primary" : "text-muted-foreground"}`}
                >
                  {String(cp.score)}/6
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exam Scores */}
      {s.examScores.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold text-foreground mb-4">
            📝 درجات الاختبارات
          </h3>
          <div className="space-y-2">
            {s.examScores.map((e, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                key={i}
                className="flex items-center justify-between py-1.5 border-b border-border last:border-0"
              >
                <span className="text-sm text-foreground">
                  مستوى {String(e.level)}
                </span>
                <span className="text-sm font-bold text-primary">
                  {String(e.score)} / {String(e.total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Game Scores */}
      {s.gameScores.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold text-foreground mb-4">🎮 درجات الألعاب</h3>
          <div className="space-y-2">
            {s.gameScores.map((g, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                key={i}
                className="flex items-center justify-between py-1.5 border-b border-border last:border-0"
              >
                <span className="text-sm text-foreground">
                  لعبة {String(g.boxId)}
                </span>
                <span className="text-sm font-bold text-primary">
                  {String(g.score)} / {String(g.total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submissions (Assignments) */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-bold text-foreground mb-4">📋 الواجبات المُسلَّمة</h3>
        {subsLoading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <p
            className="text-muted-foreground text-sm"
            data-ocid="teacher.student_submissions_empty_state"
          >
            لم تسلّم أي واجب بعد
          </p>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                key={i}
                data-ocid={`teacher.student_submission.${i + 1}`}
                className="border border-border rounded-xl p-3 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    واجب #{String(sub.assignmentId)}
                  </span>
                  <Badge
                    variant={sub.status === "graded" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {sub.status === "graded"
                      ? "مصحَّح"
                      : sub.status === "submitted"
                        ? "مُسلَّم"
                        : "معلّق"}
                  </Badge>
                </div>
                <p className="text-sm text-foreground line-clamp-2">
                  {sub.answer}
                </p>
                {sub.grade !== undefined && (
                  <p className="text-xs text-primary font-bold">
                    الدرجة: {String(sub.grade)}
                  </p>
                )}
                {sub.feedback && (
                  <p className="text-xs text-muted-foreground">
                    الملاحظة: {sub.feedback}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
