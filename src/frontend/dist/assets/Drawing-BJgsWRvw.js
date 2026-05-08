import { u as useSessionStore, r as reactExports, j as jsxRuntimeExports } from "./index-oDdfbtqD.js";
import { j as useSaveDrawing } from "./useBackend-D_fritFS.js";
import { u as ue } from "./index-C0960S8x.js";
const PALETTE = [
  "#D4873A",
  "#8B3A0F",
  "#F5C87A",
  "#6B2D0F",
  "#2C6E49",
  "#1A3C5E",
  "#C53030",
  "#805AD5",
  "#000000",
  "#FFFFFF"
];
function Drawing() {
  const { userId } = useSessionStore();
  const canvasRef = reactExports.useRef(null);
  const isDrawing = reactExports.useRef(false);
  const lastPos = reactExports.useRef(null);
  const [color, setColor] = reactExports.useState("#D4873A");
  const [brushSize, setBrushSize] = reactExports.useState(6);
  const [tool, setTool] = reactExports.useState("pen");
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const saveDrawing = useSaveDrawing();
  const getPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const t = e.touches[0];
      return {
        x: (t.clientX - rect.left) * scaleX,
        y: (t.clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };
  const startDraw = reactExports.useCallback((e) => {
    e.preventDefault();
    isDrawing.current = true;
    lastPos.current = getPos(e);
  }, []);
  const draw = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      if (!isDrawing.current || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      const pos = getPos(e);
      ctx.lineWidth = tool === "eraser" ? brushSize * 3 : brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = tool === "eraser" ? "#FFF7ED" : color;
      ctx.beginPath();
      const lp = lastPos.current ?? pos;
      ctx.moveTo(lp.x, lp.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastPos.current = pos;
    },
    [color, brushSize, tool]
  );
  const endDraw = reactExports.useCallback(() => {
    isDrawing.current = false;
    lastPos.current = null;
  }, []);
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFF7ED";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !userId) return;
    setIsSaving(true);
    try {
      const data = canvas.toDataURL("image/png");
      await saveDrawing.mutateAsync({ userId, data });
      ue.success("تم حفظ الرسم ✨");
    } catch {
      ue.error("تعذّر الحفظ");
    } finally {
      setIsSaving(false);
    }
  };
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFF7ED";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", dir: "rtl", "data-ocid": "drawing.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "🎨 لوحة الرسم" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-3 flex flex-wrap items-center gap-3",
        "data-ocid": "drawing.toolbar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 flex-wrap", children: PALETTE.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setColor(c);
                setTool("pen");
              },
              "data-ocid": `drawing.color_${c.replace("#", "")}`,
              className: "w-7 h-7 rounded-full border-2 transition-smooth",
              style: {
                backgroundColor: c,
                borderColor: color === c && tool === "pen" ? "#8B3A0F" : "transparent",
                boxShadow: color === c && tool === "pen" ? "0 0 0 2px #D4873A" : "none"
              }
            },
            c
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setTool("pen"),
                "data-ocid": "drawing.pen_button",
                className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${tool === "pen" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
                children: "✏️ قلم"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setTool("eraser"),
                "data-ocid": "drawing.eraser_button",
                className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${tool === "eraser" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
                children: "🧹 ممحاة"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "الحجم" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: "2",
                max: "30",
                value: brushSize,
                onChange: (e) => setBrushSize(Number(e.target.value)),
                "data-ocid": "drawing.brush_size",
                className: "w-24 accent-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-4", children: brushSize })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleClear,
                "data-ocid": "drawing.clear_button",
                className: "px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:text-foreground transition-smooth",
                children: "🗑️ مسح الكل"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSave,
                disabled: isSaving,
                "data-ocid": "drawing.save_button",
                className: "px-3 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-smooth disabled:opacity-50",
                children: isSaving ? "جاري الحفظ..." : "💾 حفظ"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border border-border rounded-xl overflow-hidden",
        "data-ocid": "drawing.canvas_target",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "canvas",
          {
            ref: canvasRef,
            width: 1200,
            height: 700,
            className: "w-full touch-none cursor-crosshair",
            style: { maxHeight: "60vh", display: "block" },
            onMouseDown: startDraw,
            onMouseMove: draw,
            onMouseUp: endDraw,
            onMouseLeave: endDraw,
            onTouchStart: startDraw,
            onTouchMove: draw,
            onTouchEnd: endDraw
          }
        )
      }
    )
  ] });
}
export {
  Drawing as default
};
