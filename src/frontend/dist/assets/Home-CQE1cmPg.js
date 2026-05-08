import { u as useSessionStore, r as reactExports, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-oDdfbtqD.js";
import { c as createLucideIcon, L as Layout, T as Trophy, B as BookOpen, S as Sigma, G as GraduationCap, C as CircleUserRound, a as LayoutDashboard } from "./Layout-B8aXBhxf.js";
import { B as Badge, a as Button } from "./button-D77dc4Cp.js";
import { b as useStudent } from "./useBackend-D_fritFS.js";
import { u as useProgressStore } from "./progressStore-TQYp-Hsw.js";
import { C as CHAPTERS } from "./index-CF5rV8Hy.js";
import { S as Star, C as ClipboardList } from "./star-CIh8b0rf.js";
import "./index-C0960S8x.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2", key: "6agr2n" }],
  [
    "path",
    { d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6", key: "1o487t" }
  ],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 14h.01", key: "ssrbsk" }],
  ["path", { d: "M15 6h.01", key: "cblpky" }],
  ["path", { d: "M18 9h.01", key: "2061c0" }]
];
const Dices = createLucideIcon("dices", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const CHAT_SUGGESTIONS = [
  "من هو هدارة؟",
  "من هي ماكو؟",
  "ما قصة الرواية؟",
  "كيف وُجد هدارة؟",
  "من هي خروبة؟",
  "ما اسم المعلمة؟"
];
function getBotReply(q) {
  const text = q.trim();
  if (text.includes("هدارة") && !text.includes("ماكو") && !text.includes("خروبة"))
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
const NAV_SECTIONS = [
  {
    to: "/chapters",
    icon: BookOpen,
    label: "أسئلة الفصول",
    color: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    to: "/grammar",
    icon: Sigma,
    label: "العدد والمعدود",
    color: "bg-orange-50 text-orange-700 border-orange-200"
  },
  {
    to: "/exams",
    icon: GraduationCap,
    label: "الاختبارات",
    color: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    to: "/games",
    icon: Dices,
    label: "الألعاب",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    to: "/writing",
    icon: Pencil,
    label: "الكتابي",
    color: "bg-sky-50 text-sky-700 border-sky-200"
  },
  {
    to: "/student/drawing",
    icon: Sparkles,
    label: "الرسم",
    color: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    to: "/student/notes",
    icon: ClipboardList,
    label: "الملاحظات",
    color: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    to: "/characters",
    icon: CircleUserRound,
    label: "الشخصيات",
    color: "bg-pink-50 text-pink-700 border-pink-200"
  },
  {
    to: "/student/assignments",
    icon: MessageCircle,
    label: "الواجبات",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    to: "/student/dashboard",
    icon: LayoutDashboard,
    label: "الداشبورد",
    color: "bg-stone-50 text-stone-700 border-stone-200"
  }
];
function Home() {
  var _a, _b;
  const { userId, role, name, points } = useSessionStore();
  const { data: student, isLoading } = useStudent(userId);
  const { chapterProgress } = useProgressStore();
  const [chatOpen, setChatOpen] = reactExports.useState(false);
  const [messages, setMessages] = reactExports.useState([
    {
      id: "init",
      from: "bot",
      text: "مرحباً! أنا مساعدك الذكي لرواية هدارة 🥩 اسأليني أي شيء عن القصة والشخصيات!"
    }
  ]);
  const [input, setInput] = reactExports.useState("");
  const chatEndRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a2;
    if (chatOpen) (_a2 = chatEndRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
  }, [chatOpen]);
  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg = {
      id: `u-${Date.now()}`,
      from: "user",
      text: trimmed
    };
    const botMsg = {
      id: `b-${Date.now() + 1}`,
      from: "bot",
      text: getBotReply(trimmed)
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };
  const completedCount = chapterProgress.filter((p) => p.completed).length;
  const totalChapters = CHAPTERS.length;
  const overallPct = Math.round(completedCount / totalChapters * 100);
  const displayPoints = student ? Number(student.points) : points;
  const displayBadges = ((_a = student == null ? void 0 : student.badges) == null ? void 0 : _a.length) ?? 0;
  const lastBadge = (_b = student == null ? void 0 : student.badges) == null ? void 0 : _b[student.badges.length - 1];
  const lastCompleted = chapterProgress.filter((p) => p.completed).at(-1);
  const lastChapter = lastCompleted ? CHAPTERS.find((c) => c.id === lastCompleted.chapterId) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-20 md:pb-6", dir: "rtl", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative rounded-2xl overflow-hidden h-56 md:h-80",
        "data-ocid": "home.hero_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-ostrich-boy.dim_1400x500.jpg",
              alt: "هدارة والنعامة في الصحراء",
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-l from-black/75 via-black/35 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-6 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/90 text-white border-0 text-xs px-2 py-0.5 mb-2", children: "رواية تعليمية" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-4xl font-bold text-white drop-shadow-lg leading-snug", children: "الولد الذي عاش مع النعام" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm md:text-base mt-1 max-w-xs", children: "رحلة الشجاعة والوفاء عبر رمال الصحراء" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/chapters",
                "data-ocid": "home.start_cta",
                className: "mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition-smooth text-sm w-fit",
                children: [
                  "ابدئي التعلم",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 })
                ]
              }
            )
          ] })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-2xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4",
        "data-ocid": "home.greeting_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "أهلاً وسهلاً،" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold text-foreground truncate", children: [
              name || "طالبتي",
              " 👋"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 w-full bg-muted rounded-full h-2.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-2.5 bg-primary rounded-full transition-all duration-700",
                style: { width: `${overallPct}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              completedCount,
              " / ",
              totalChapters,
              " فصول مكتملة (",
              overallPct,
              "%)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center bg-amber-50 border border-amber-200 rounded-xl px-5 py-3",
                "data-ocid": "home.points_display",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Star,
                    {
                      className: "text-amber-500",
                      size: 22,
                      fill: "currentColor"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-extrabold text-amber-600 leading-none mt-0.5", children: displayPoints }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-500/80", children: "نقطة" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-primary/10 border border-primary/20 rounded-xl px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "text-primary", size: 22 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-extrabold text-primary leading-none mt-0.5", children: displayBadges }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "وسام" })
            ] })
          ] })
        ]
      }
    ),
    (lastChapter || lastBadge) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-muted/40 border border-border rounded-2xl p-4",
        "data-ocid": "home.recent_activity",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: "آخر نشاط" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            lastChapter && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0", children: "✅" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                "أكملتِ الفصل: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: lastChapter.title })
              ] })
            ] }),
            lastBadge && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0", children: "🏅" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                "حصلتِ على وسام: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: String(lastBadge) })
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.sections_grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-foreground mb-3", children: "أقسام التطبيق" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3", children: NAV_SECTIONS.map((sec, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: sec.to,
          "data-ocid": `home.nav_card.${i + 1}`,
          className: `flex flex-col items-center gap-2 border rounded-2xl p-4 hover:shadow-md transition-smooth text-center ${sec.color}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(sec.icon, { size: 28, className: "shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold leading-tight", children: sec.label })
          ]
        },
        sec.label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl overflow-hidden",
        "data-ocid": "home.chatbot_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-smooth",
              onClick: () => setChatOpen((v) => !v),
              "data-ocid": "home.chatbot_toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-xl", children: "🦩" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: "مساعد هدارة الذكي" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "اسأليني عن الرواية" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MessageCircle,
                  {
                    size: 20,
                    className: `text-primary transition-transform duration-300 ${chatOpen ? "rotate-180" : ""}`
                  }
                )
              ]
            }
          ),
          chatOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 p-3 bg-muted/20", children: CHAT_SUGGESTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "home.chatbot_suggestion",
                className: "text-xs bg-card border border-border text-foreground px-3 py-1.5 rounded-full hover:bg-primary/10 hover:border-primary/30 transition-smooth",
                onClick: () => sendMessage(s),
                children: s
              },
              s
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "h-56 overflow-y-auto px-4 py-3 space-y-3",
                "data-ocid": "home.chatbot_messages",
                children: [
                  messages.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `flex ${m.from === "user" ? "justify-start" : "justify-end"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${m.from === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"}`,
                          children: m.text
                        }
                      )
                    },
                    m.id
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: chatEndRef })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "icon",
                  className: "shrink-0",
                  onClick: () => sendMessage(input),
                  "data-ocid": "home.chatbot_send",
                  disabled: !input.trim(),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "chat-input",
                  type: "text",
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && sendMessage(input),
                  placeholder: "اكتبي سؤالك...",
                  dir: "rtl",
                  className: "flex-1 bg-background border border-input rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 ring-ring transition-smooth",
                  "data-ocid": "home.chatbot_input"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    role === "teacher" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-secondary/10 border border-secondary/20 rounded-xl p-4 text-center",
        "data-ocid": "home.teacher_banner",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
          "👩‍🏫 أنتِ في وضع المعلمة •",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teacher", className: "text-secondary hover:underline", children: "اذهبي إلى لوحة التحكم" })
        ] })
      }
    )
  ] }) });
}
export {
  Home as default
};
