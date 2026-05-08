import { useCreateSession, useJoinSession } from "@/hooks/useBackend";
import { useSessionStore } from "@/store/sessionStore";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export default function Landing() {
  const [view, setView] = useState<"select" | "host" | "join">("select");
  const [hostedCode, setHostedCode] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [className, setClassName] = useState("");
  const [classError, setClassError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { setSession, userId } = useSessionStore();
  const createSession = useCreateSession();
  const joinSession = useJoinSession();
  const navigate = useNavigate();

  // Generate a fallback local session ID if backend not available
  const generateLocalCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from(
      { length: 6 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  };

  const handleHost = async () => {
    setIsCreating(true);
    try {
      let sessionId: string;
      try {
        // Try backend first (with a 5s timeout)
        const result = await Promise.race([
          createSession.mutateAsync(userId),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 5000),
          ),
        ]);
        sessionId = result as string;
      } catch {
        // Fallback: generate a local session code
        sessionId = generateLocalCode();
      }
      setHostedCode(sessionId);
      setSession({ sessionId, role: "teacher", name: "معلمة" });
    } catch {
      toast.error("تعذر إنشاء الجلسة، يرجى المحاولة مجدداً");
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
        className: className.trim(),
      });
      if (result.__kind__ === "err") {
        setCodeError("كود الجلسة غير صحيح أو منتهية الصلاحية");
        return;
      }
      setSession({
        sessionId: code.trim(),
        role: "student",
        name: name.trim(),
        className: className.trim(),
      });
      navigate({ to: "/home" });
    } catch {
      // Fallback: allow joining with local code
      setSession({
        sessionId: code.trim(),
        role: "student",
        name: name.trim(),
        className: className.trim(),
      });
      navigate({ to: "/home" });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      data-ocid="landing.page"
    >
      {/* ── Hero Banner ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(220px, 38vw, 460px)" }}
      >
        <img
          src="/assets/generated/hero-ostrich-boy.dim_1400x500.jpg"
          alt="هدارة والنعامة"
          className="w-full h-full object-cover"
        />
        {/* warm gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Title block */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4">
          <div
            className="rounded-2xl px-6 py-3 text-center"
            style={{
              background: "rgba(0,0,0,0.32)",
              backdropFilter: "blur(6px)",
            }}
          >
            <h1
              className="font-bold leading-snug text-white"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
                fontFamily: "'Noto Naskh Arabic', sans-serif",
              }}
            >
              🦩 الولد الذي عاش مع النعام
            </h1>
            <p
              className="text-white/80 mt-1"
              style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)" }}
            >
              تطبيق تعليمي تفاعلي لرواية هدارة
            </p>
          </div>
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        {/* SELECT ROLE */}
        {view === "select" && (
          <div className="w-full max-w-lg space-y-6">
            <p
              className="text-center font-semibold"
              style={{ color: "oklch(0.38 0.04 50)", fontSize: "1.1rem" }}
            >
              اختاري دورك للبدء
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Teacher card */}
              <button
                type="button"
                data-ocid="landing.host_button"
                onClick={() => setView("host")}
                className="group flex flex-col items-center gap-3 rounded-3xl p-8 border-2 transition-smooth text-center"
                style={{
                  background: "oklch(0.93 0.04 70)",
                  borderColor: "oklch(0.75 0.12 68)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "oklch(0.55 0.15 68)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 8px 28px oklch(0.55 0.12 68 / 0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "oklch(0.75 0.12 68)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "none";
                }}
              >
                <span style={{ fontSize: "3.5rem", lineHeight: 1 }}>👩‍🏫</span>
                <div>
                  <h2
                    className="font-bold"
                    style={{
                      color: "oklch(0.28 0.06 50)",
                      fontSize: "1.25rem",
                    }}
                  >
                    استضافة جلسة
                  </h2>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "oklch(0.48 0.04 50)" }}
                  >
                    للمعلمة • ابدئي جلسة جديدة
                  </p>
                </div>
              </button>

              {/* Student card */}
              <button
                type="button"
                data-ocid="landing.join_button"
                onClick={() => setView("join")}
                className="group flex flex-col items-center gap-3 rounded-3xl p-8 border-2 transition-smooth text-center"
                style={{
                  background: "oklch(0.91 0.05 35)",
                  borderColor: "oklch(0.73 0.13 32)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "oklch(0.55 0.16 30)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 8px 28px oklch(0.55 0.15 30 / 0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "oklch(0.73 0.13 32)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "none";
                }}
              >
                <span style={{ fontSize: "3.5rem", lineHeight: 1 }}>👧</span>
                <div>
                  <h2
                    className="font-bold"
                    style={{
                      color: "oklch(0.28 0.06 50)",
                      fontSize: "1.25rem",
                    }}
                  >
                    انضمام إلى جلسة
                  </h2>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "oklch(0.48 0.04 50)" }}
                  >
                    للطالبة • ادخلي كود المعلمة
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* HOST FLOW */}
        {view === "host" && (
          <div
            className="w-full max-w-md rounded-3xl border p-8 space-y-6 shadow-md"
            style={{
              background: "oklch(0.97 0.02 60)",
              borderColor: "oklch(0.84 0.06 65)",
            }}
            data-ocid="landing.host_form"
          >
            <div className="text-center">
              <span style={{ fontSize: "3rem" }}>👩‍🏫</span>
              <h2
                className="mt-2 font-bold"
                style={{ color: "oklch(0.25 0.05 45)", fontSize: "1.5rem" }}
              >
                استضافة جلسة
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.5 0.03 50)" }}
              >
                سيتم إنشاء كود جلسة فريد لمشاركته مع الطالبات
              </p>
            </div>

            {/* Code display after creation */}
            {hostedCode ? (
              <div
                className="rounded-2xl p-6 text-center space-y-2"
                style={{
                  background: "oklch(0.88 0.08 75)",
                  border: "2px dashed oklch(0.65 0.13 70)",
                }}
                data-ocid="landing.session_code_display"
              >
                <p
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.4 0.05 50)" }}
                >
                  كود الجلسة الخاص بك
                </p>
                <div
                  className="font-bold tracking-[0.3em]"
                  style={{ fontSize: "2.5rem", color: "oklch(0.3 0.08 45)" }}
                >
                  {hostedCode}
                </div>
                <p className="text-xs" style={{ color: "oklch(0.5 0.04 50)" }}>
                  شاركي هذا الكود مع طالباتك
                </p>
              </div>
            ) : (
              <div
                className="rounded-2xl p-5 text-center"
                style={{ background: "oklch(0.92 0.04 65)" }}
              >
                <p className="text-sm" style={{ color: "oklch(0.45 0.04 50)" }}>
                  اضغطي على "إنشاء الجلسة" لتحصلي على كود فريد
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {hostedCode ? (
                <button
                  type="button"
                  data-ocid="landing.enter_teacher_button"
                  onClick={handleEnterTeacher}
                  className="w-full rounded-xl py-3.5 font-bold text-white transition-smooth"
                  style={{
                    background: "oklch(0.52 0.13 68)",
                    fontSize: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "oklch(0.44 0.13 68)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "oklch(0.52 0.13 68)";
                  }}
                >
                  دخول لوحة المعلمة ←
                </button>
              ) : (
                <button
                  type="button"
                  data-ocid="landing.host_submit_button"
                  onClick={handleHost}
                  disabled={isCreating}
                  className="w-full rounded-xl py-3.5 font-bold text-white transition-smooth disabled:opacity-50"
                  style={{
                    background: "oklch(0.52 0.13 68)",
                    fontSize: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    if (!el.disabled)
                      el.style.background = "oklch(0.44 0.13 68)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "oklch(0.52 0.13 68)";
                  }}
                >
                  {isCreating ? "⏳ جاري الإنشاء..." : "✨ إنشاء الجلسة"}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setView("select");
                  setHostedCode(null);
                }}
                className="text-sm transition-colors text-center"
                style={{ color: "oklch(0.55 0.03 50)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = "oklch(0.3 0.05 45)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = "oklch(0.55 0.03 50)";
                }}
              >
                → رجوع
              </button>
            </div>
          </div>
        )}

        {/* JOIN FLOW */}
        {view === "join" && (
          <div
            className="w-full max-w-md rounded-3xl border p-8 shadow-md"
            style={{
              background: "oklch(0.97 0.02 60)",
              borderColor: "oklch(0.82 0.07 32)",
            }}
            data-ocid="landing.join_form"
          >
            <div className="text-center mb-6">
              <span style={{ fontSize: "3rem" }}>👧</span>
              <h2
                className="mt-2 font-bold"
                style={{ color: "oklch(0.25 0.05 45)", fontSize: "1.5rem" }}
              >
                انضمام إلى جلسة
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.5 0.03 50)" }}
              >
                أدخلي البيانات للانضمام إلى جلسة معلمتك
              </p>
            </div>

            <div className="space-y-4">
              {/* Code field */}
              <div>
                <label
                  htmlFor="session_code_input"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "oklch(0.35 0.05 50)" }}
                >
                  كود الجلسة
                </label>
                <input
                  id="session_code_input"
                  data-ocid="landing.session_code_input"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setCodeError("");
                  }}
                  placeholder="أدخلي الكود المكون من 6 أحرف"
                  maxLength={6}
                  className="w-full rounded-xl px-4 py-3 font-mono text-center transition-smooth focus:outline-none"
                  style={{
                    background: "oklch(0.94 0.02 55)",
                    border: `2px solid ${codeError ? "oklch(0.6 0.18 15)" : "oklch(0.84 0.04 60)"}`,
                    color: "oklch(0.25 0.05 45)",
                    fontSize: "1.15rem",
                    letterSpacing: "0.2em",
                  }}
                />
                {codeError && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.55 0.18 15)" }}
                    data-ocid="landing.code_field_error"
                  >
                    ⚠ {codeError}
                  </p>
                )}
              </div>

              {/* Name field */}
              <div>
                <label
                  htmlFor="name_input"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "oklch(0.35 0.05 50)" }}
                >
                  اسمك الكامل
                </label>
                <input
                  id="name_input"
                  data-ocid="landing.name_input"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  placeholder="أدخلي اسمك الكامل"
                  className="w-full rounded-xl px-4 py-3 transition-smooth focus:outline-none"
                  style={{
                    background: "oklch(0.94 0.02 55)",
                    border: `2px solid ${nameError ? "oklch(0.6 0.18 15)" : "oklch(0.84 0.04 60)"}`,
                    color: "oklch(0.25 0.05 45)",
                  }}
                />
                {nameError && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.55 0.18 15)" }}
                    data-ocid="landing.name_field_error"
                  >
                    ⚠ {nameError}
                  </p>
                )}
              </div>

              {/* Class field */}
              <div>
                <label
                  htmlFor="class_input"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "oklch(0.35 0.05 50)" }}
                >
                  الشعبة
                </label>
                <input
                  id="class_input"
                  data-ocid="landing.class_input"
                  value={className}
                  onChange={(e) => {
                    setClassName(e.target.value);
                    setClassError("");
                  }}
                  placeholder="مثال: 3أ"
                  className="w-full rounded-xl px-4 py-3 transition-smooth focus:outline-none"
                  style={{
                    background: "oklch(0.94 0.02 55)",
                    border: `2px solid ${classError ? "oklch(0.6 0.18 15)" : "oklch(0.84 0.04 60)"}`,
                    color: "oklch(0.25 0.05 45)",
                  }}
                />
                {classError && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.55 0.18 15)" }}
                    data-ocid="landing.class_field_error"
                  >
                    ⚠ {classError}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="button"
                  data-ocid="landing.join_submit_button"
                  onClick={handleJoin}
                  disabled={joinSession.isPending}
                  className="w-full rounded-xl py-3.5 font-bold text-white transition-smooth disabled:opacity-50"
                  style={{
                    background: "oklch(0.52 0.16 30)",
                    fontSize: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    if (!el.disabled)
                      el.style.background = "oklch(0.43 0.16 28)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "oklch(0.52 0.16 30)";
                  }}
                >
                  {joinSession.isPending
                    ? "⏳ جاري الانضمام..."
                    : "🎒 انضمي للجلسة"}
                </button>
                <button
                  type="button"
                  onClick={() => setView("select")}
                  className="text-sm transition-colors text-center"
                  style={{ color: "oklch(0.55 0.03 50)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = "oklch(0.3 0.05 45)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = "oklch(0.55 0.03 50)";
                  }}
                >
                  → رجوع
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer
        className="py-4 text-center text-xs border-t"
        style={{
          color: "oklch(0.6 0.02 50)",
          borderColor: "oklch(0.88 0.03 60)",
          background: "oklch(0.93 0.025 60)",
        }}
      >
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "oklch(0.45 0.1 50)" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
