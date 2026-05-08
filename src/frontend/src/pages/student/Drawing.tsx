import { useSaveDrawing } from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
  "#FFFFFF",
];

export default function Drawing() {
  const { userId } = useSessionStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const [color, setColor] = useState("#D4873A");
  const [brushSize, setBrushSize] = useState(6);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [isSaving, setIsSaving] = useState(false);

  const saveDrawing = useSaveDrawing();

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const t = e.touches[0];
      return {
        x: (t.clientX - rect.left) * scaleX,
        y: (t.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: ((e as React.MouseEvent).clientX - rect.left) * scaleX,
      y: ((e as React.MouseEvent).clientY - rect.top) * scaleY,
    };
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: getPos is stable ref-based
  const startDraw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDrawing.current = true;
    lastPos.current = getPos(e);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: getPos is stable ref-based
  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
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
    [color, brushSize, tool],
  );

  const endDraw = useCallback(() => {
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
      toast.success("تم حفظ الرسم ✨");
    } catch {
      toast.error("تعذّر الحفظ");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFF7ED";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div className="space-y-4" dir="rtl" data-ocid="drawing.page">
      <h1 className="text-xl font-bold text-foreground">🎨 لوحة الرسم</h1>

      {/* Toolbar */}
      <div
        className="bg-card border border-border rounded-xl p-3 flex flex-wrap items-center gap-3"
        data-ocid="drawing.toolbar"
      >
        {/* Color palette */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {PALETTE.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setColor(c);
                setTool("pen");
              }}
              data-ocid={`drawing.color_${c.replace("#", "")}`}
              className="w-7 h-7 rounded-full border-2 transition-smooth"
              style={{
                backgroundColor: c,
                borderColor:
                  color === c && tool === "pen" ? "#8B3A0F" : "transparent",
                boxShadow:
                  color === c && tool === "pen" ? "0 0 0 2px #D4873A" : "none",
              }}
            />
          ))}
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Tools */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTool("pen")}
            data-ocid="drawing.pen_button"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
              tool === "pen"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            ✏️ قلم
          </button>
          <button
            type="button"
            onClick={() => setTool("eraser")}
            data-ocid="drawing.eraser_button"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
              tool === "eraser"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            🧹 ممحاة
          </button>
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Brush size */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">الحجم</span>
          <input
            type="range"
            min="2"
            max="30"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            data-ocid="drawing.brush_size"
            className="w-24 accent-primary"
          />
          <span className="text-xs text-muted-foreground w-4">{brushSize}</span>
        </div>

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleClear}
            data-ocid="drawing.clear_button"
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:text-foreground transition-smooth"
          >
            🗑️ مسح الكل
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            data-ocid="drawing.save_button"
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-smooth disabled:opacity-50"
          >
            {isSaving ? "جاري الحفظ..." : "💾 حفظ"}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div
        className="bg-card border border-border rounded-xl overflow-hidden"
        data-ocid="drawing.canvas_target"
      >
        <canvas
          ref={canvasRef}
          width={1200}
          height={700}
          className="w-full touch-none cursor-crosshair"
          style={{ maxHeight: "60vh", display: "block" }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>
    </div>
  );
}
