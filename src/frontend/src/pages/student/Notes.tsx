import { useSaveNotes, useStudent } from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Notes() {
  const { userId } = useSessionStore();
  const { data: student } = useStudent(userId);
  const saveNotes = useSaveNotes();

  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initializedRef = useRef(false);

  // Load notes from student on first fetch
  useEffect(() => {
    if (student && !initializedRef.current) {
      initializedRef.current = true;
      // backend doesn't expose notes on Student type directly, so local state
    }
  }, [student]);

  const triggerSave = async (value: string) => {
    if (!userId) return;
    setSaving(true);
    try {
      await saveNotes.mutateAsync({ userId, notes: value });
      setLastSaved(new Date());
    } catch {
      toast.error("تعذّر الحفظ");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (value: string) => {
    setText(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => triggerSave(value), 5000);
  };

  const handleManualSave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    triggerSave(text);
  };

  return (
    <div className="space-y-4" dir="rtl" data-ocid="notes.page">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">📒 ملاحظاتي</h1>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <span className="text-xs text-muted-foreground">
              آخر حفظ:{" "}
              {lastSaved.toLocaleTimeString("ar-SA", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
          <button
            type="button"
            onClick={handleManualSave}
            disabled={saving}
            data-ocid="notes.save_button"
            className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-smooth disabled:opacity-50"
          >
            {saving ? "جاري الحفظ..." : "💾 حفظ"}
          </button>
        </div>
      </div>

      <div
        className="bg-card border border-border rounded-xl overflow-hidden"
        data-ocid="notes.editor"
      >
        <div className="bg-muted/40 border-b border-border px-4 py-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
          <span className="text-xs text-muted-foreground mr-2">
            تحفظ تلقائياً كل 5 ثوانٍ ⏱
          </span>
          {saving && (
            <span
              className="text-xs text-primary animate-pulse"
              data-ocid="notes.loading_state"
            >
              ● يحفظ...
            </span>
          )}
        </div>
        <textarea
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="اكتبي ملاحظاتك هنا... 📝"
          data-ocid="notes.textarea"
          rows={20}
          className="w-full px-5 py-4 bg-card text-foreground text-base leading-8 resize-none outline-none placeholder:text-muted-foreground font-body"
          style={{
            fontFamily: "'Noto Naskh Arabic', sans-serif",
            lineHeight: 2.2,
          }}
        />
      </div>

      <p className="text-xs text-muted-foreground text-center">
        💡 يتم الحفظ تلقائيًا كل 5 ثوانٍ عند الكتابة
      </p>
    </div>
  );
}
