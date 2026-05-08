import { u as useSessionStore, r as reactExports, j as jsxRuntimeExports } from "./index-oDdfbtqD.js";
import { b as useStudent, k as useSaveNotes } from "./useBackend-D_fritFS.js";
import { u as ue } from "./index-C0960S8x.js";
function Notes() {
  const { userId } = useSessionStore();
  const { data: student } = useStudent(userId);
  const saveNotes = useSaveNotes();
  const [text, setText] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [lastSaved, setLastSaved] = reactExports.useState(null);
  const timerRef = reactExports.useRef(null);
  const initializedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (student && !initializedRef.current) {
      initializedRef.current = true;
    }
  }, [student]);
  const triggerSave = async (value) => {
    if (!userId) return;
    setSaving(true);
    try {
      await saveNotes.mutateAsync({ userId, notes: value });
      setLastSaved(/* @__PURE__ */ new Date());
    } catch {
      ue.error("تعذّر الحفظ");
    } finally {
      setSaving(false);
    }
  };
  const handleChange = (value) => {
    setText(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => triggerSave(value), 5e3);
  };
  const handleManualSave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    triggerSave(text);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", dir: "rtl", "data-ocid": "notes.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "📒 ملاحظاتي" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        lastSaved && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "آخر حفظ:",
          " ",
          lastSaved.toLocaleTimeString("ar-SA", {
            hour: "2-digit",
            minute: "2-digit"
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleManualSave,
            disabled: saving,
            "data-ocid": "notes.save_button",
            className: "px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-smooth disabled:opacity-50",
            children: saving ? "جاري الحفظ..." : "💾 حفظ"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl overflow-hidden",
        "data-ocid": "notes.editor",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border-b border-border px-4 py-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-destructive/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-primary/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-secondary/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mr-2", children: "تحفظ تلقائياً كل 5 ثوانٍ ⏱" }),
            saving && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs text-primary animate-pulse",
                "data-ocid": "notes.loading_state",
                children: "● يحفظ..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: text,
              onChange: (e) => handleChange(e.target.value),
              placeholder: "اكتبي ملاحظاتك هنا... 📝",
              "data-ocid": "notes.textarea",
              rows: 20,
              className: "w-full px-5 py-4 bg-card text-foreground text-base leading-8 resize-none outline-none placeholder:text-muted-foreground font-body",
              style: {
                fontFamily: "'Noto Naskh Arabic', sans-serif",
                lineHeight: 2.2
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "💡 يتم الحفظ تلقائيًا كل 5 ثوانٍ عند الكتابة" })
  ] });
}
export {
  Notes as default
};
