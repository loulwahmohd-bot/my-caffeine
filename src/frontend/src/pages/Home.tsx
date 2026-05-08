import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStudent } from "@/hooks/useBackend";
import { useProgressStore } from "@/store/progressStore";
import { useSessionStore } from "@/store/sessionStore";
import { CHAPTERS } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronLeft,
  ClipboardList,
  Dices,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  Pencil,
  Send,
  Sigma,
  Sparkles,
  Star,
  Trophy,
  UserCircle2,
} from "lucide-react";
import react, { useState, useRef, useEffect } from "react";

// ── Chatbot knowledge base ────────────────────────────────────────────────────
const CHAT_SUGGESTIONS = [
  "من هو هدارة؟",
  "من هي ماكو؟",
  "ما قصة الرواية؟",
  "كيف وُجد هدارة؟",
  "من هي خروبة؟",
  "ما اسم المعلمة؟",
];

type ChatMsg = { id: string; from: "user" | "bot"; text: string };

function getBotReply(q: string): string {
  const text = q.trim();
  if (
    text.includes("هدارة") &&
    !text.includes("ماكو") &&
    !text.includes("خروبة")
  )
    return "هدارة هو طفل بدوي ضاع في الصحراء وهو رضيع، فربّته النعامة ماكو وعاش معها سنوات طويلة حتى تعلّم التأقلم مع الطبيعة. في النهاية عاد إلى أهله وتحوّل إلى إنسان.";
  if (text.includes("ماكو"))
    return "ماكو هي النعامة الأم التي وجدت هدارة رضيعاً ومدفوناً في الرمال وأنقذته. غطّته بجناحيها وأطعمته وحمته، وأصبحت كأم له.";
  if (text.includes("قصة الرواية") || text.includes("موضوع الرواية"))
    return "رواية (الولد الذي عاش مع النعام) تحكي عن طفل بدوي اسمه هدارة ضاع وهو رضيع في الصحراء، فربّته النعامة ماكو. عاش معها عشر سنوات وتعلّم طبائع الحيوانات، وفي النهاية عاد إلى عائلته وتزوج من خروبة.";
  if (text.includes("كيف وُجد") || text.includes("كيف وجد"))
    return "وُجد هدارة مدفوناً في الرمال حين انشغلت أمه فاطمة بمشاهدة بيض النعام، وكانت العاصفة قوية فلم تسمع بكاءه. وجدته النعامة ماكو وأنقذته.";
  if (text.includes("خروبة"))
    return "خروبة هي الفتاة ذات العينين كالنجوم التي أحبها هدارة بعد عودته للبشر. طلبت منه مهراً غير عادي: غزالة تتبعه بإرادتها، فأحضر لها ظبيا وتزوّجا.";
  if (text.includes("فاطمة"))
    return "فاطمة هي أم هدارة، المرأة البدوية الصابرة. لم تفقد الأمل في إيجاد ابنها رغم تأكيد الجميع بوفاته.";
  if (text.includes("بوبوط"))
    return "بوبوط هو الرجل الشجاع في القافلة الذي قتل أسداً بعصاه. لكنه استخدم القوة لإمساك هدارة مما جعل هدارة يخاف من البشر.";
  if (text.includes("لوك"))
    return "لوك أوكونر هو المصور الأجنبي الطامع بالشهرة والمال. أراد تصوير هدارة (الولد البري) وعرضه على المجلات العالمية.";
  if (text.includes("ظبيا"))
    return "ظبيا هي الغزالة التي أنقذها هدارة من الجوع، فأصبحت وفية له ولا تخاف منه. أحضرها مهراً لخروبة.";
  if (text.includes("سيدي إبراهيم"))
    return "سيدي إبراهيم رجل حكيم من القوافل، كان يشفق على هدارة ويرفض تسليمه للصحافة، وهو الوحيد الذي يعرف كامل قصته.";
  if (text.includes("اختبار") || text.includes("الاختبارات"))
    return "في قسم الاختبارات تجدين ٥ مستويات من السهل إلى الصعب جداً، كل مستوى يحتوي على ١٥ سؤالاً شاملاً عن الرواية.";
  if (text.includes("نقاط") || text.includes("نقطة"))
    return "تكسبين النقاط من خلال الإجابة على الأسئلة والاختبارات والألعاب. كلما كانت إجابتك أسرع وأصح، زادت نقاطك!";
  if (text.includes("شخصيات"))
    return "في صفحة الشخصيات تجدين ١٢ شخصية من الرواية. تُفتح الشخصيات كلما حصلتِ على ١٠ نقاط أو وسام جديد.";
  return "أهلاً بك! يمكنني مساعدتك في الإجابة عن أسئلة حول رواية (الولد الذي عاش مع النعام). جرّبي أسئلة مثل: من هو هدارة؟ أو ما قصة الرواية؟";
}

// ── Navigation sections ───────────────────────────────────────────────────────
const NAV_SECTIONS = [
  {
    to: "/chapters",
    icon: BookOpen,
    label: "أسئلة الفصول",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    to: "/grammar",
    icon: Sigma,
    label: "العدد والمعدود",
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    to: "/exams",
    icon: GraduationCap,
    label: "الاختبارات",
    color: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    to: "/games",
    icon: Dices,
    label: "الألعاب",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    to: "/writing",
    icon: Pencil,
    label: "الكتابي",
    color: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    to: "/student/drawing",
    icon: Sparkles,
    label: "الرسم",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    to: "/student/notes",
    icon: ClipboardList,
    label: "الملاحظات",
    color: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    to: "/characters",
    icon: UserCircle2,
    label: "الشخصيات",
    color: "bg-pink-50 text-pink-700 border-pink-200",
  },
  {
    to: "/student/assignments",
    icon: MessageCircle,
    label: "الواجبات",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    to: "/student/dashboard",
    icon: LayoutDashboard,
    label: "الداشبورد",
    color: "bg-stone-50 text-stone-700 border-stone-200",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  const { userId, role, name, points } = useSessionStore();
  const { data: student, isLoading } = useStudent(userId);
  const { chapterProgress } = useProgressStore();

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: "init",
      from: "bot",
      text: "مرحباً! أنا مساعدك الذكي لرواية هدارة 🥩 اسأليني أي شيء عن القصة والشخصيات!",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatOpen]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMsg = {
      id: `u-${Date.now()}`,
      from: "user",
      text: trimmed,
    };
    const botMsg: ChatMsg = {
      id: `b-${Date.now() + 1}`,
      from: "bot",
      text: getBotReply(trimmed),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const completedCount = chapterProgress.filter((p) => p.completed).length;
  const totalChapters = CHAPTERS.length;
  const overallPct = Math.round((completedCount / totalChapters) * 100);

  const displayPoints = student ? Number(student.points) : points;
  const displayBadges = student?.badges?.length ?? 0;
  const lastBadge = student?.badges?.[student.badges.length - 1];
  const lastCompleted = chapterProgress.filter((p) => p.completed).at(-1);
  const lastChapter = lastCompleted
    ? CHAPTERS.find((c) => c.id === lastCompleted.chapterId)
    : null;

  return (
    <Layout>
      <div className="space-y-6 pb-20 md:pb-6" dir="rtl" data-ocid="home.page">
        {/* ── Hero Banner ─────────────────────────────────────────── */}
        <div
          className="relative rounded-2xl overflow-hidden h-56 md:h-80"
          data-ocid="home.hero_banner"
        >
          <img
            src="/assets/generated/hero-ostrich-boy.dim_1400x500.jpg"
            alt="هدارة والنعامة في الصحراء"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-right">
            <div className="mb-1">
              <Badge className="bg-amber-500/90 text-white border-0 text-xs px-2 py-0.5 mb-2">
                رواية تعليمية
              </Badge>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg leading-snug">
              الولد الذي عاش مع النعام
            </h1>
            <p className="text-white/80 text-sm md:text-base mt-1 max-w-xs">
              رحلة الشجاعة والوفاء عبر رمال الصحراء
            </p>
            <Link
              to="/chapters"
              data-ocid="home.start_cta"
              className="mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition-smooth text-sm w-fit"
            >
              ابدئي التعلم
              <ChevronLeft size={16} />
            </Link>
          </div>
        </div>

        {/* ── Greeting + Points ───────────────────────────────────── */}
        {isLoading ? (
          <Skeleton className="h-28 w-full rounded-2xl" />
        ) : (
          <div
            className="bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            data-ocid="home.greeting_card"
          >
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-sm">أهلاً وسهلاً،</p>
              <h2 className="text-2xl font-bold text-foreground truncate">
                {name || "طالبتي"} 👋
              </h2>
              <div className="mt-2 w-full bg-muted rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-2.5 bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {completedCount} / {totalChapters} فصول مكتملة ({overallPct}%)
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div
                className="flex flex-col items-center bg-amber-50 border border-amber-200 rounded-xl px-5 py-3"
                data-ocid="home.points_display"
              >
                <Star
                  className="text-amber-500"
                  size={22}
                  fill="currentColor"
                />
                <span className="text-2xl font-extrabold text-amber-600 leading-none mt-0.5">
                  {displayPoints}
                </span>
                <span className="text-xs text-amber-500/80">نقطة</span>
              </div>
              <div className="flex flex-col items-center bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
                <Trophy className="text-primary" size={22} />
                <span className="text-2xl font-extrabold text-primary leading-none mt-0.5">
                  {displayBadges}
                </span>
                <span className="text-xs text-muted-foreground">وسام</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Recent Activity ─────────────────────────────────────── */}
        {(lastChapter || lastBadge) && (
          <div
            className="bg-muted/40 border border-border rounded-2xl p-4"
            data-ocid="home.recent_activity"
          >
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              آخر نشاط
            </p>
            <div className="flex flex-col gap-2">
              {lastChapter && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    ✅
                  </span>
                  <span className="text-foreground">
                    أكملتِ الفصل: <strong>{lastChapter.title}</strong>
                  </span>
                </div>
              )}
              {lastBadge && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    🏅
                  </span>
                  <span className="text-foreground">
                    حصلتِ على وسام: <strong>{String(lastBadge)}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Navigation Cards ────────────────────────────────────── */}
        <div data-ocid="home.sections_grid">
          <h3 className="text-lg font-bold text-foreground mb-3">
            أقسام التطبيق
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {NAV_SECTIONS.map((sec, i) => (
              <Link
                key={sec.label}
                to={sec.to}
                data-ocid={`home.nav_card.${i + 1}`}
                className={`flex flex-col items-center gap-2 border rounded-2xl p-4 hover:shadow-md transition-smooth text-center ${
                  sec.color
                }`}
              >
                <sec.icon size={28} className="shrink-0" />
                <span className="text-xs font-semibold leading-tight">
                  {sec.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Chatbot ─────────────────────────────────────────────── */}
        <div
          className="bg-card border border-border rounded-2xl overflow-hidden"
          data-ocid="home.chatbot_section"
        >
          {/* Header / toggle */}
          <button
            type="button"
            className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-smooth"
            onClick={() => setChatOpen((v) => !v)}
            data-ocid="home.chatbot_toggle"
          >
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-xl">
                🦩
              </span>
              <div className="text-right">
                <p className="font-bold text-foreground text-sm">
                  مساعد هدارة الذكي
                </p>
                <p className="text-xs text-muted-foreground">
                  اسأليني عن الرواية
                </p>
              </div>
            </div>
            <MessageCircle
              size={20}
              className={`text-primary transition-transform duration-300 ${
                chatOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Collapsible body */}
          {chatOpen && (
            <div className="border-t border-border">
              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 p-3 bg-muted/20">
                {CHAT_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    data-ocid="home.chatbot_suggestion"
                    className="text-xs bg-card border border-border text-foreground px-3 py-1.5 rounded-full hover:bg-primary/10 hover:border-primary/30 transition-smooth"
                    onClick={() => sendMessage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Messages */}
              <div
                className="h-56 overflow-y-auto px-4 py-3 space-y-3"
                data-ocid="home.chatbot_messages"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.from === "user" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                        m.from === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 p-3 border-t border-border">
                <Button
                  type="button"
                  size="icon"
                  className="shrink-0"
                  onClick={() => sendMessage(input)}
                  data-ocid="home.chatbot_send"
                  disabled={!input.trim()}
                >
                  <Send size={16} />
                </Button>
                <input
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="اكتبي سؤالك..."
                  dir="rtl"
                  className="flex-1 bg-background border border-input rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 ring-ring transition-smooth"
                  data-ocid="home.chatbot_input"
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Teacher shortcut ────────────────────────────────────── */}
        {role === "teacher" && (
          <div
            className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 text-center"
            data-ocid="home.teacher_banner"
          >
            <p className="text-sm font-medium text-foreground">
              👩‍🏫 أنتِ في وضع المعلمة •{" "}
              <Link to="/teacher" className="text-secondary hover:underline">
                اذهبي إلى لوحة التحكم
              </Link>
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
