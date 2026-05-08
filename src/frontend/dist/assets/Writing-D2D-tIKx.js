import { u as useSessionStore, r as reactExports, j as jsxRuntimeExports } from "./index-oDdfbtqD.js";
import { L as Layout } from "./Layout-B8aXBhxf.js";
import { g as useAssignments, h as useMySubmissions, i as useSubmitAssignment } from "./useBackend-D_fritFS.js";
import { A as AssignmentType, a as AssignmentStatus } from "./backend.d-BwRNvkO5.js";
import { u as ue } from "./index-C0960S8x.js";
import { A as AnimatePresence, m as motion } from "./proxy-i-hyf0kx.js";
const FREE_PROMPTS = [
  {
    id: 1,
    text: "عبّري عن رأيك في تصرف هدارة عندما رفض أكل اللحم بعد عودته للبشر"
  },
  { id: 2, text: "كيف شعرت ماكو عندما وجدت الطفل وحيداً في الصحراء؟" },
  { id: 3, text: "لماذا تعتقدين أن هدارة أصبح رجلاً حكيماً في نهاية الرواية؟" },
  { id: 4, text: "لو كنت مكان فاطمة ماذا كنت ستفعلين عندما فقدت ابنها؟" },
  { id: 5, text: "صفي مشاعر هدارة عندما اكتشف أنه ليس نعامة حقيقية" },
  { id: 6, text: "ما رأيك في تصرف لوك أوكونر؟ هل كان يريد الخير لهدارة؟" },
  { id: 7, text: "كيف غيّرت الصحراء شخصية هدارة؟" },
  { id: 8, text: "ما أكثر شيء أثّر فيكِ في هذه الرواية؟" }
];
const MIN_CHARS = 150;
function draftKey(promptId) {
  return `writing_draft_prompt_${promptId}`;
}
function Writing() {
  const { userId, sessionId } = useSessionStore();
  const { data: assignments = [] } = useAssignments(sessionId);
  const { data: mySubmissions = [] } = useMySubmissions(userId);
  const submitMutation = useSubmitAssignment();
  const [promptIndex, setPromptIndex] = reactExports.useState(0);
  const [freeText, setFreeText] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [direction, setDirection] = reactExports.useState(1);
  const currentPrompt = FREE_PROMPTS[promptIndex];
  reactExports.useEffect(() => {
    const saved = localStorage.getItem(draftKey(currentPrompt.id));
    setFreeText(saved ?? "");
    setSubmitted(false);
  }, [currentPrompt.id]);
  reactExports.useEffect(() => {
    if (freeText) {
      localStorage.setItem(draftKey(currentPrompt.id), freeText);
    }
  }, [freeText, currentPrompt.id]);
  function goTo(idx) {
    setDirection(idx > promptIndex ? 1 : -1);
    setPromptIndex(idx);
  }
  function goPrev() {
    if (promptIndex > 0) goTo(promptIndex - 1);
  }
  function goNext() {
    if (promptIndex < FREE_PROMPTS.length - 1) goTo(promptIndex + 1);
  }
  const isEnough = freeText.trim().length >= MIN_CHARS;
  function handleFreeSubmit() {
    if (!isEnough) return;
    ue.success("تم حفظ إجابتك ✨");
    setSubmitted(true);
    localStorage.removeItem(draftKey(currentPrompt.id));
  }
  const writingAssignments = assignments.filter(
    (a) => a.atype === AssignmentType.writing
  );
  const submittedMap = new Map(
    mySubmissions.map((s) => [String(s.assignmentId), s])
  );
  const [assignText, setAssignText] = reactExports.useState({});
  async function handleAssignSubmit(id) {
    var _a;
    const answer = (_a = assignText[String(id)]) == null ? void 0 : _a.trim();
    if (!answer || !sessionId) return;
    try {
      const res = await submitMutation.mutateAsync({
        assignmentId: id,
        userId,
        sessionId,
        answer
      });
      if ("err" in res) {
        ue.error(String(res.err));
        return;
      }
      ue.success("تم التسليم للمعلمة ✅");
      setAssignText((p) => ({ ...p, [String(id)]: "" }));
    } catch {
      ue.error("تعذّر التسليم");
    }
  }
  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 })
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto space-y-10 pb-16",
      dir: "rtl",
      "data-ocid": "writing.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "✍️ الأسئلة الكتابية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "عبّري عن أفكارك ومشاعرك بحرية" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "💡 أسئلة تعبيرية" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full", children: [
              promptIndex + 1,
              " / ",
              FREE_PROMPTS.length
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden", style: { minHeight: 110 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", custom: direction, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              custom: direction,
              variants: slideVariants,
              initial: "enter",
              animate: "center",
              exit: "exit",
              transition: { duration: 0.28, ease: "easeInOut" },
              className: "bg-card border border-border rounded-2xl p-6 shadow-sm",
              "data-ocid": `writing.prompt.${promptIndex + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 w-8 h-8 rounded-full bg-primary/15 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0", children: currentPrompt.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-base font-medium leading-relaxed", children: currentPrompt.text })
              ] })
            },
            currentPrompt.id
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-center gap-2",
              role: "tablist",
              "aria-label": "اختر السؤال",
              children: FREE_PROMPTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": i === promptIndex,
                  "data-ocid": `writing.dot.${i + 1}`,
                  onClick: () => goTo(i),
                  className: `rounded-full transition-smooth ${i === promptIndex ? "w-6 h-3 bg-primary" : "w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/60"}`
                },
                p.id
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.96 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0 },
              className: "bg-primary/10 border border-primary/30 rounded-2xl p-6 text-center space-y-3",
              "data-ocid": "writing.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: "✅" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-bold text-lg", children: "تم حفظ إجابتك!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "يمكنك الانتقال للسؤال التالي" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "writing.next_button",
                    onClick: () => {
                      if (promptIndex < FREE_PROMPTS.length - 1) goNext();
                      else setSubmitted(false);
                    },
                    className: "bg-primary text-primary-foreground px-6 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-smooth",
                    children: promptIndex < FREE_PROMPTS.length - 1 ? "السؤال التالي ←" : "العودة للبداية"
                  }
                )
              ]
            },
            "success"
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "space-y-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    "data-ocid": "writing.free_textarea",
                    value: freeText,
                    onChange: (e) => setFreeText(e.target.value),
                    placeholder: "اكتبي إجابتك هنا... (١٥٠ حرفاً على الأقل)",
                    rows: 7,
                    className: "w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none leading-relaxed"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 flex-1 w-40 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full transition-smooth",
                        style: {
                          width: `${Math.min(freeText.trim().length / MIN_CHARS * 100, 100)}%`,
                          background: isEnough ? "oklch(var(--primary))" : "oklch(var(--secondary))"
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `text-xs font-medium ${isEnough ? "text-primary" : "text-muted-foreground"}`,
                        "data-ocid": "writing.char_counter",
                        children: [
                          freeText.trim().length,
                          " / ",
                          MIN_CHARS
                        ]
                      }
                    ),
                    !isEnough && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      "(تحتاجين ",
                      MIN_CHARS - freeText.trim().length,
                      " حرفاً إضافياً)"
                    ] })
                  ] }),
                  freeText.trim().length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "تم الحفظ تلقائياً 💾" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "writing.submit_button",
                      onClick: handleFreeSubmit,
                      disabled: !isEnough,
                      className: "bg-primary text-primary-foreground px-7 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed",
                      children: "تسليم الإجابة"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mr-auto", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "writing.prev_button",
                        onClick: goPrev,
                        disabled: promptIndex === 0,
                        className: "border border-border rounded-xl px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-smooth disabled:opacity-30",
                        children: "→ السابق"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "writing.next_nav_button",
                        onClick: goNext,
                        disabled: promptIndex === FREE_PROMPTS.length - 1,
                        className: "border border-border rounded-xl px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-smooth disabled:opacity-30",
                        children: "← التالي"
                      }
                    )
                  ] })
                ] })
              ]
            },
            "input"
          ) })
        ] }),
        writingAssignments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "space-y-4",
            "data-ocid": "writing.assignments_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "📝 واجبات المعلمة" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: writingAssignments.map((a, i) => {
                const sub = submittedMap.get(String(a.id));
                const isSubmitted = !!sub;
                const key = String(a.id);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `writing.assignment.${i + 1}`,
                    className: "bg-card border border-border rounded-2xl p-5 space-y-4",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground", children: a.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: a.content })
                        ] }),
                        isSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `flex-shrink-0 text-xs px-3 py-1 rounded-full font-semibold ${sub.status === AssignmentStatus.graded ? "bg-primary/15 text-primary" : "bg-secondary/15 text-secondary"}`,
                            children: sub.status === AssignmentStatus.graded ? `✅ ${String(sub.grade)}/١٠` : "⏳ مسلّم"
                          }
                        )
                      ] }),
                      isSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/50 rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: sub.answer }) }),
                        sub.feedback && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "bg-secondary/10 border border-secondary/20 rounded-xl p-4",
                            "data-ocid": `writing.teacher_feedback.${i + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-secondary mb-1", children: "💬 ملاحظة المعلمة" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: sub.feedback })
                            ]
                          }
                        )
                      ] }) : (
                        /* Answer input */
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "textarea",
                            {
                              "data-ocid": `writing.assign_textarea.${i + 1}`,
                              value: assignText[key] ?? "",
                              onChange: (e) => setAssignText((p) => ({
                                ...p,
                                [key]: e.target.value
                              })),
                              placeholder: "اكتبي إجابتك هنا...",
                              rows: 5,
                              className: "w-full bg-background border border-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none leading-relaxed"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "text-xs text-muted-foreground",
                                "data-ocid": `writing.assign_char.${i + 1}`,
                                children: [
                                  (assignText[key] ?? "").length,
                                  " حرف"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                "data-ocid": `writing.assign_submit.${i + 1}`,
                                onClick: () => handleAssignSubmit(a.id),
                                disabled: !(assignText[key] ?? "").trim() || submitMutation.isPending,
                                className: "bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-smooth disabled:opacity-40",
                                children: "تسليم للمعلمة"
                              }
                            )
                          ] })
                        ] })
                      )
                    ]
                  },
                  key
                );
              }) })
            ]
          }
        )
      ]
    }
  ) });
}
export {
  Writing as default
};
