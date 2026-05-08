import { u as useSessionStore, r as reactExports, j as jsxRuntimeExports, c as cn } from "./index-oDdfbtqD.js";
import { L as Layout } from "./Layout-B8aXBhxf.js";
import { b as useStudent } from "./useBackend-D_fritFS.js";
import { m as motion, A as AnimatePresence } from "./proxy-i-hyf0kx.js";
import "./index-C0960S8x.js";
const CHARACTER_DATA = [
  {
    id: 1,
    emoji: "👦",
    name: "هدارة",
    role: "البطل الرئيسي",
    description: "ولد صغير بشعر طويل ومنفوش، عاش مع النعام عشر سنوات بعد أن تاه في الصحراء رضيعاً.",
    quote: "أنا لستُ نعامة، ولكنني لستُ بشراً أيضاً."
  },
  {
    id: 2,
    emoji: "🦩",
    name: "ماكو",
    role: "النعامة الأم",
    description: "نعامة برقبة طويلة وريش خفيف، أنقذت هدارة من الموت وتبنّته وربّته كأحد فراخها.",
    quote: "غطّت هدارة بجناحيها الكبيرين حين هبّت العاصفة."
  },
  {
    id: 3,
    emoji: "🦩",
    name: "حوج",
    role: "راعي السرب",
    description: "نعامة أكبر حجمًا بأرجل قوية، شريك ماكو الأمين وراعي السرب الذي يحمي الجميع.",
    quote: "وقف حوج بين هدارة والخطر كأسوار من ريش ومنقار."
  },
  {
    id: 4,
    emoji: "👩",
    name: "فاطمة",
    role: "أم هدارة الحقيقية",
    description: "امرأة بدوية ذات ملامح هادئة، لم تيأس من البحث عن ابنها طوال سنوات رغم اعتقاد الجميع بموته.",
    quote: "لن أتوقف عن البحث ما دمتُ أتنفس، بُنيّ."
  },
  {
    id: 5,
    emoji: "👨",
    name: "محمد فاضل",
    role: "والد هدارة",
    description: "رجل بلحية خفيفة وعمامة بدوية، والد هدارة الذي ظنّ أن ابنه فقد إلى الأبد.",
    quote: "رأى في عيني الولد الغريب وهج عينيه هو نفسه."
  },
  {
    id: 6,
    emoji: "👨",
    name: "دولة",
    role: "الرجل الصالح",
    description: "رجل قوي البنية بلباس قافلة بسيط، تُستجاب صلاته وتلجأ إليه القبيلة في الشدائد.",
    quote: "قرأ دولة سورة الحديد والدموع تجري على خدّيه."
  },
  {
    id: 7,
    emoji: "👨",
    name: "بوبوط",
    role: "الشجاع في القافلة",
    description: "رجل شجاع يحمل عصا قصيرة، قتل الأسد بعصاه ودفن رأسه وأطرافه وفق التقاليد.",
    quote: "ضرب بوبوط الأسد بعصاه ضربةً واحدة أسكتته للأبد."
  },
  {
    id: 8,
    emoji: "📸",
    name: "لوك أوكونر",
    role: "المصور الطامع",
    description: "رجل أجنبي يحمل كاميرا كبيرة على كتفه، أراد استغلال قصة هدارة لتحقيق الشهرة والثروة.",
    quote: "قال لوك: سيكون هذا الفيلم الأكثر مشاهدةً في التاريخ."
  },
  {
    id: 9,
    emoji: "🦌",
    name: "ظبيا",
    role: "الغزالة الوفية",
    description: "غزالة صغيرة بقرون قصيرة وعيون واسعة، أكثر من وثق به هدارة من غير النعامات.",
    quote: "لم تهرب ظبيا حين رأت هدارة، بل تقدمت نحوه."
  },
  {
    id: 10,
    emoji: "🦁",
    name: "اللبؤة الصغيرة",
    role: "الشبل اليتيم",
    description: "شبل لبؤة صغير بملامح لطيفة، فقدت أمها ورعاها هدارة حتى شبّت على ساقيها.",
    quote: "لعقت اللبؤة الصغيرة يدَ هدارة فشعر بدفء غريب."
  },
  {
    id: 11,
    emoji: "🦁",
    name: "اللبؤة الكبيرة",
    role: "الخطر الداهم",
    description: "لبؤة بالغة برأس كبير وملامح قوية، هاجمت عش النعام لكن ماكو دافعت عنه بشجاعة.",
    quote: "قفزت ماكو وأصابت عنق اللبؤة قبل أن تصل إلى البيض."
  },
  {
    id: 12,
    emoji: "👳",
    name: "سيدي إبراهيم",
    role: "الحكيم المتعاطف",
    description: "رجل حكيم بعمامة طويلة وملامح هادئة، الشخص الوحيد الذي شعر بالشفقة على هدارة وأدرك معاناته.",
    quote: "قال سيدي إبراهيم: هذا الولد بين عالمَين، ولا يملك واحداً."
  }
];
function CharacterCard({
  char,
  unlocked,
  isNew,
  onClick,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05, duration: 0.4 },
      "data-ocid": `characters.character.${index + 1}`,
      onClick: unlocked ? onClick : void 0,
      className: cn(
        "relative bg-card border rounded-2xl p-4 flex flex-col items-center text-center transition-smooth select-none",
        unlocked ? "border-primary/40 hover:border-primary hover:shadow-md cursor-pointer hover:-translate-y-0.5" : "border-border",
        isNew && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      ),
      children: [
        !unlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 rounded-2xl bg-muted/60 flex flex-col items-center justify-center gap-1 z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl", children: "🔒" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium", children: "مقفلة" })
        ] }),
        isNew && unlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full z-20", children: "جديد!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "text-5xl mb-3 transition-smooth",
              !unlocked && "grayscale opacity-30"
            ),
            children: char.emoji
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: cn(
              "text-sm font-bold leading-tight",
              unlocked ? "text-foreground" : "text-muted-foreground"
            ),
            children: char.name
          }
        ),
        unlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium", children: char.role }),
        unlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-2 leading-relaxed line-clamp-3", children: char.description })
      ]
    }
  );
}
function Characters() {
  const { userId, points } = useSessionStore();
  const { data: student } = useStudent(userId);
  const backendUnlocked = new Set(
    ((student == null ? void 0 : student.unlockedChars) ?? []).map((id) => Number(id))
  );
  const totalPoints = Number((student == null ? void 0 : student.points) ?? points ?? 0);
  const unlockedByPoints = Math.min(
    CHARACTER_DATA.length,
    1 + Math.floor(totalPoints / 10)
  );
  const unlockedCount = Math.max(
    unlockedByPoints,
    backendUnlocked.size > 0 ? backendUnlocked.size : 0
  );
  const isUnlocked = (charId) => charId <= unlockedCount || backendUnlocked.has(charId);
  const prevUnlocked = reactExports.useRef(unlockedCount);
  const [celebChar, setCelebChar] = reactExports.useState(null);
  const [newlyUnlocked, setNewlyUnlocked] = reactExports.useState(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    if (unlockedCount > prevUnlocked.current) {
      const newChar = CHARACTER_DATA[unlockedCount - 1];
      if (newChar) {
        setCelebChar(newChar);
        setNewlyUnlocked((s) => new Set(s).add(newChar.id));
      }
    }
    prevUnlocked.current = unlockedCount;
  }, [unlockedCount]);
  const pointsToNext = unlockedCount < CHARACTER_DATA.length ? 10 - totalPoints % 10 : 0;
  const progressPct = unlockedCount / CHARACTER_DATA.length * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", dir: "rtl", "data-ocid": "characters.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground flex items-center gap-2", children: "🦩 شخصيات الرواية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: 'اكشفي شخصيات رواية "الولد الذي عاش مع النعام" بجمع النقاط' })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-left text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-foreground text-xl", children: [
            totalPoints,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-sm", children: "نقطة" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              unlockedCount,
              " / ",
              CHARACTER_DATA.length,
              " شخصية مفتوحة"
            ] }),
            unlockedCount < CHARACTER_DATA.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
              pointsToNext,
              " نقطة للشخصية القادمة"
            ] }),
            unlockedCount === CHARACTER_DATA.length && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "🎉 جميع الشخصيات مفتوحة!" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-3 bg-muted rounded-full overflow-hidden",
              "data-ocid": "characters.progress_bar",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "h-full bg-primary rounded-full",
                  initial: { width: 0 },
                  animate: { width: `${progressPct}%` },
                  transition: { duration: 0.8, ease: "easeOut" }
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-primary/8 border border-primary/20 rounded-xl p-3 text-sm text-primary/90 flex items-center gap-2",
          "data-ocid": "characters.unlock_hint",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "💡" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "كل 10 نقاط = شخصية جديدة تُفتح تلقائياً! العب الألعاب وأجيبي على الأسئلة لجمع النقاط." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4",
          "data-ocid": "characters.grid",
          children: CHARACTER_DATA.map((char, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CharacterCard,
            {
              char,
              unlocked: isUnlocked(char.id),
              isNew: newlyUnlocked.has(char.id),
              index: i,
              onClick: () => setCelebChar(char)
            },
            char.id
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: celebChar && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center",
        onClick: () => setCelebChar(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.5, y: 60 },
            animate: { scale: 1, y: 0 },
            exit: { scale: 0.8, opacity: 0 },
            transition: { type: "spring", stiffness: 280, damping: 22 },
            className: "bg-card rounded-3xl p-8 shadow-xl max-w-sm w-full mx-4 text-center border border-primary/30",
            dir: "rtl",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1 mb-2", children: [0, 0.1, 0.2].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  initial: { scale: 0, rotate: -20 },
                  animate: { scale: 1, rotate: 0 },
                  transition: { delay: d, type: "spring" },
                  className: "text-xl",
                  children: "⭐"
                },
                d
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { scale: 0 },
                  animate: { scale: [0, 1.3, 1] },
                  transition: { duration: 0.5, delay: 0.15 },
                  className: "text-7xl my-3",
                  children: celebChar.emoji
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-primary uppercase tracking-wider mb-1", children: "✨ شخصية جديدة مفتوحة!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-1", children: celebChar.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-primary/10 text-primary px-3 py-0.5 rounded-full font-medium", children: celebChar.role }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed my-4", children: celebChar.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-xs italic text-primary/80 bg-primary/8 rounded-xl px-4 py-2 border-r-4 border-primary", children: [
                '"',
                celebChar.quote,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.7 },
                  onClick: () => setCelebChar(null),
                  className: "mt-5 w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-smooth",
                  "data-ocid": "characters.close_button",
                  children: "رائع! 🎉"
                }
              )
            ]
          }
        )
      },
      "celebration-overlay"
    ) })
  ] });
}
export {
  Characters as default
};
