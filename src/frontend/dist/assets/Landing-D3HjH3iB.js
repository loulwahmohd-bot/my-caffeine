import { r as reactExports, u as useSessionStore, a as useNavigate, j as jsxRuntimeExports } from "./index-oDdfbtqD.js";
import { u as useCreateSession, a as useJoinSession } from "./useBackend-D_fritFS.js";
import { u as ue } from "./index-C0960S8x.js";
function Landing() {
  const [view, setView] = reactExports.useState("select");
  const [hostedCode, setHostedCode] = reactExports.useState(null);
  const [code, setCode] = reactExports.useState("");
  const [codeError, setCodeError] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [nameError, setNameError] = reactExports.useState("");
  const [className, setClassName] = reactExports.useState("");
  const [classError, setClassError] = reactExports.useState("");
  const [isCreating, setIsCreating] = reactExports.useState(false);
  const { setSession, userId } = useSessionStore();
  const createSession = useCreateSession();
  const joinSession = useJoinSession();
  const navigate = useNavigate();
  const generateLocalCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from(
      { length: 6 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };
  const handleHost = async () => {
    setIsCreating(true);
    try {
      let sessionId;
      try {
        const result = await Promise.race([
          createSession.mutateAsync(userId),
          new Promise(
            (_, reject) => setTimeout(() => reject(new Error("timeout")), 5e3)
          )
        ]);
        sessionId = result;
      } catch {
        sessionId = generateLocalCode();
      }
      setHostedCode(sessionId);
      setSession({ sessionId, role: "teacher", name: "معلمة" });
    } catch {
      ue.error("تعذر إنشاء الجلسة، يرجى المحاولة مجدداً");
    } finally {
      setIsCreating(false);
    }
  };
  const handleEnterTeacher = () => {
    navigate({ to: "/teacher" });
  };
  const validateJoin = () => {
    let valid = true;
    if (!code.trim()) {
      setCodeError("يرجى إدخال كود الجلسة");
      valid = false;
    } else if (code.trim().length !== 6) {
      setCodeError("كود الجلسة يجب أن يكون 6 أحرف");
      valid = false;
    } else {
      setCodeError("");
    }
    if (!name.trim()) {
      setNameError("يرجى إدخال اسمك");
      valid = false;
    } else {
      setNameError("");
    }
    if (!className.trim()) {
      setClassError("يرجى إدخال الشعبة");
      valid = false;
    } else {
      setClassError("");
    }
    return valid;
  };
  const handleJoin = async () => {
    if (!validateJoin()) return;
    try {
      const result = await joinSession.mutateAsync({
        sessionId: code.trim(),
        userId,
        name: name.trim(),
        className: className.trim()
      });
      if (result.__kind__ === "err") {
        setCodeError("كود الجلسة غير صحيح أو منتهية الصلاحية");
        return;
      }
      setSession({
        sessionId: code.trim(),
        role: "student",
        name: name.trim(),
        className: className.trim()
      });
      navigate({ to: "/home" });
    } catch {
      setSession({
        sessionId: code.trim(),
        role: "student",
        name: name.trim(),
        className: className.trim()
      });
      navigate({ to: "/home" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col bg-background",
      "data-ocid": "landing.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative w-full overflow-hidden",
            style: { height: "clamp(220px, 38vw, 460px)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/generated/hero-ostrich-boy.dim_1400x500.jpg",
                  alt: "هدارة والنعامة",
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 100%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-end pb-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-2xl px-6 py-3 text-center",
                  style: {
                    background: "rgba(0,0,0,0.32)",
                    backdropFilter: "blur(6px)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h1",
                      {
                        className: "font-bold leading-snug text-white",
                        style: {
                          fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
                          fontFamily: "'Noto Naskh Arabic', sans-serif"
                        },
                        children: "🦩 الولد الذي عاش مع النعام"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-white/80 mt-1",
                        style: { fontSize: "clamp(0.8rem, 2vw, 1rem)" },
                        children: "تطبيق تعليمي تفاعلي لرواية هدارة"
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-start justify-center px-4 py-10", children: [
          view === "select" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-center font-semibold",
                style: { color: "oklch(0.38 0.04 50)", fontSize: "1.1rem" },
                children: "اختاري دورك للبدء"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "landing.host_button",
                  onClick: () => setView("host"),
                  className: "group flex flex-col items-center gap-3 rounded-3xl p-8 border-2 transition-smooth text-center",
                  style: {
                    background: "oklch(0.93 0.04 70)",
                    borderColor: "oklch(0.75 0.12 68)"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.borderColor = "oklch(0.55 0.15 68)";
                    e.currentTarget.style.boxShadow = "0 8px 28px oklch(0.55 0.12 68 / 0.25)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.borderColor = "oklch(0.75 0.12 68)";
                    e.currentTarget.style.boxShadow = "none";
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "3.5rem", lineHeight: 1 }, children: "👩‍🏫" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h2",
                        {
                          className: "font-bold",
                          style: {
                            color: "oklch(0.28 0.06 50)",
                            fontSize: "1.25rem"
                          },
                          children: "استضافة جلسة"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "mt-1 text-sm",
                          style: { color: "oklch(0.48 0.04 50)" },
                          children: "للمعلمة • ابدئي جلسة جديدة"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "landing.join_button",
                  onClick: () => setView("join"),
                  className: "group flex flex-col items-center gap-3 rounded-3xl p-8 border-2 transition-smooth text-center",
                  style: {
                    background: "oklch(0.91 0.05 35)",
                    borderColor: "oklch(0.73 0.13 32)"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.borderColor = "oklch(0.55 0.16 30)";
                    e.currentTarget.style.boxShadow = "0 8px 28px oklch(0.55 0.15 30 / 0.25)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.borderColor = "oklch(0.73 0.13 32)";
                    e.currentTarget.style.boxShadow = "none";
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "3.5rem", lineHeight: 1 }, children: "👧" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h2",
                        {
                          className: "font-bold",
                          style: {
                            color: "oklch(0.28 0.06 50)",
                            fontSize: "1.25rem"
                          },
                          children: "انضمام إلى جلسة"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "mt-1 text-sm",
                          style: { color: "oklch(0.48 0.04 50)" },
                          children: "للطالبة • ادخلي كود المعلمة"
                        }
                      )
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          view === "host" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "w-full max-w-md rounded-3xl border p-8 space-y-6 shadow-md",
              style: {
                background: "oklch(0.97 0.02 60)",
                borderColor: "oklch(0.84 0.06 65)"
              },
              "data-ocid": "landing.host_form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "3rem" }, children: "👩‍🏫" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "mt-2 font-bold",
                      style: { color: "oklch(0.25 0.05 45)", fontSize: "1.5rem" },
                      children: "استضافة جلسة"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm mt-1",
                      style: { color: "oklch(0.5 0.03 50)" },
                      children: "سيتم إنشاء كود جلسة فريد لمشاركته مع الطالبات"
                    }
                  )
                ] }),
                hostedCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-2xl p-6 text-center space-y-2",
                    style: {
                      background: "oklch(0.88 0.08 75)",
                      border: "2px dashed oklch(0.65 0.13 70)"
                    },
                    "data-ocid": "landing.session_code_display",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm font-medium",
                          style: { color: "oklch(0.4 0.05 50)" },
                          children: "كود الجلسة الخاص بك"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "font-bold tracking-[0.3em]",
                          style: { fontSize: "2.5rem", color: "oklch(0.3 0.08 45)" },
                          children: hostedCode
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.5 0.04 50)" }, children: "شاركي هذا الكود مع طالباتك" })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-2xl p-5 text-center",
                    style: { background: "oklch(0.92 0.04 65)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.45 0.04 50)" }, children: 'اضغطي على "إنشاء الجلسة" لتحصلي على كود فريد' })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  hostedCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "landing.enter_teacher_button",
                      onClick: handleEnterTeacher,
                      className: "w-full rounded-xl py-3.5 font-bold text-white transition-smooth",
                      style: {
                        background: "oklch(0.52 0.13 68)",
                        fontSize: "1rem"
                      },
                      onMouseEnter: (e) => {
                        const el = e.currentTarget;
                        el.style.background = "oklch(0.44 0.13 68)";
                      },
                      onMouseLeave: (e) => {
                        const el = e.currentTarget;
                        el.style.background = "oklch(0.52 0.13 68)";
                      },
                      children: "دخول لوحة المعلمة ←"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "landing.host_submit_button",
                      onClick: handleHost,
                      disabled: isCreating,
                      className: "w-full rounded-xl py-3.5 font-bold text-white transition-smooth disabled:opacity-50",
                      style: {
                        background: "oklch(0.52 0.13 68)",
                        fontSize: "1rem"
                      },
                      onMouseEnter: (e) => {
                        const el = e.currentTarget;
                        if (!el.disabled)
                          el.style.background = "oklch(0.44 0.13 68)";
                      },
                      onMouseLeave: (e) => {
                        const el = e.currentTarget;
                        el.style.background = "oklch(0.52 0.13 68)";
                      },
                      children: isCreating ? "⏳ جاري الإنشاء..." : "✨ إنشاء الجلسة"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setView("select");
                        setHostedCode(null);
                      },
                      className: "text-sm transition-colors text-center",
                      style: { color: "oklch(0.55 0.03 50)" },
                      onMouseEnter: (e) => {
                        const el = e.currentTarget;
                        el.style.color = "oklch(0.3 0.05 45)";
                      },
                      onMouseLeave: (e) => {
                        const el = e.currentTarget;
                        el.style.color = "oklch(0.55 0.03 50)";
                      },
                      children: "→ رجوع"
                    }
                  )
                ] })
              ]
            }
          ),
          view === "join" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "w-full max-w-md rounded-3xl border p-8 shadow-md",
              style: {
                background: "oklch(0.97 0.02 60)",
                borderColor: "oklch(0.82 0.07 32)"
              },
              "data-ocid": "landing.join_form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "3rem" }, children: "👧" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "mt-2 font-bold",
                      style: { color: "oklch(0.25 0.05 45)", fontSize: "1.5rem" },
                      children: "انضمام إلى جلسة"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm mt-1",
                      style: { color: "oklch(0.5 0.03 50)" },
                      children: "أدخلي البيانات للانضمام إلى جلسة معلمتك"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "session_code_input",
                        className: "block text-sm font-semibold mb-1.5",
                        style: { color: "oklch(0.35 0.05 50)" },
                        children: "كود الجلسة"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "session_code_input",
                        "data-ocid": "landing.session_code_input",
                        value: code,
                        onChange: (e) => {
                          setCode(e.target.value.toUpperCase());
                          setCodeError("");
                        },
                        placeholder: "أدخلي الكود المكون من 6 أحرف",
                        maxLength: 6,
                        className: "w-full rounded-xl px-4 py-3 font-mono text-center transition-smooth focus:outline-none",
                        style: {
                          background: "oklch(0.94 0.02 55)",
                          border: `2px solid ${codeError ? "oklch(0.6 0.18 15)" : "oklch(0.84 0.04 60)"}`,
                          color: "oklch(0.25 0.05 45)",
                          fontSize: "1.15rem",
                          letterSpacing: "0.2em"
                        }
                      }
                    ),
                    codeError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xs mt-1",
                        style: { color: "oklch(0.55 0.18 15)" },
                        "data-ocid": "landing.code_field_error",
                        children: [
                          "⚠ ",
                          codeError
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "name_input",
                        className: "block text-sm font-semibold mb-1.5",
                        style: { color: "oklch(0.35 0.05 50)" },
                        children: "اسمك الكامل"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "name_input",
                        "data-ocid": "landing.name_input",
                        value: name,
                        onChange: (e) => {
                          setName(e.target.value);
                          setNameError("");
                        },
                        placeholder: "أدخلي اسمك الكامل",
                        className: "w-full rounded-xl px-4 py-3 transition-smooth focus:outline-none",
                        style: {
                          background: "oklch(0.94 0.02 55)",
                          border: `2px solid ${nameError ? "oklch(0.6 0.18 15)" : "oklch(0.84 0.04 60)"}`,
                          color: "oklch(0.25 0.05 45)"
                        }
                      }
                    ),
                    nameError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xs mt-1",
                        style: { color: "oklch(0.55 0.18 15)" },
                        "data-ocid": "landing.name_field_error",
                        children: [
                          "⚠ ",
                          nameError
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "class_input",
                        className: "block text-sm font-semibold mb-1.5",
                        style: { color: "oklch(0.35 0.05 50)" },
                        children: "الشعبة"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "class_input",
                        "data-ocid": "landing.class_input",
                        value: className,
                        onChange: (e) => {
                          setClassName(e.target.value);
                          setClassError("");
                        },
                        placeholder: "مثال: 3أ",
                        className: "w-full rounded-xl px-4 py-3 transition-smooth focus:outline-none",
                        style: {
                          background: "oklch(0.94 0.02 55)",
                          border: `2px solid ${classError ? "oklch(0.6 0.18 15)" : "oklch(0.84 0.04 60)"}`,
                          color: "oklch(0.25 0.05 45)"
                        }
                      }
                    ),
                    classError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xs mt-1",
                        style: { color: "oklch(0.55 0.18 15)" },
                        "data-ocid": "landing.class_field_error",
                        children: [
                          "⚠ ",
                          classError
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "landing.join_submit_button",
                        onClick: handleJoin,
                        disabled: joinSession.isPending,
                        className: "w-full rounded-xl py-3.5 font-bold text-white transition-smooth disabled:opacity-50",
                        style: {
                          background: "oklch(0.52 0.16 30)",
                          fontSize: "1rem"
                        },
                        onMouseEnter: (e) => {
                          const el = e.currentTarget;
                          if (!el.disabled)
                            el.style.background = "oklch(0.43 0.16 28)";
                        },
                        onMouseLeave: (e) => {
                          const el = e.currentTarget;
                          el.style.background = "oklch(0.52 0.16 30)";
                        },
                        children: joinSession.isPending ? "⏳ جاري الانضمام..." : "🎒 انضمي للجلسة"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setView("select"),
                        className: "text-sm transition-colors text-center",
                        style: { color: "oklch(0.55 0.03 50)" },
                        onMouseEnter: (e) => {
                          const el = e.currentTarget;
                          el.style.color = "oklch(0.3 0.05 45)";
                        },
                        onMouseLeave: (e) => {
                          const el = e.currentTarget;
                          el.style.color = "oklch(0.55 0.03 50)";
                        },
                        children: "→ رجوع"
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "footer",
          {
            className: "py-4 text-center text-xs border-t",
            style: {
              color: "oklch(0.6 0.02 50)",
              borderColor: "oklch(0.88 0.03 60)",
              background: "oklch(0.93 0.025 60)"
            },
            children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              ". Built with love using",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "underline",
                  style: { color: "oklch(0.45 0.1 50)" },
                  children: "caffeine.ai"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  Landing as default
};
