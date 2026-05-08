import { u as useSessionStore, r as reactExports, j as jsxRuntimeExports, S as Skeleton } from "./index-oDdfbtqD.js";
import { L as Layout } from "./Layout-B8aXBhxf.js";
import { o as useStudents, b as useStudent, h as useMySubmissions, p as useGradeSubmission } from "./useBackend-D_fritFS.js";
import { a as AssignmentStatus } from "./backend.d-BwRNvkO5.js";
import { u as ue } from "./index-C0960S8x.js";
function TeacherStudents() {
  const { sessionId } = useSessionStore();
  const { data: students = [], isLoading } = useStudents(sessionId);
  const [selectedUserId, setSelectedUserId] = reactExports.useState(null);
  const { data: selected } = useStudent(selectedUserId);
  const { data: submissions = [] } = useMySubmissions(selectedUserId);
  const gradeSubmission = useGradeSubmission();
  const [gradingId, setGradingId] = reactExports.useState(null);
  const [grade, setGrade] = reactExports.useState("8");
  const [feedback, setFeedback] = reactExports.useState("");
  const handleGrade = async (assignmentId, userId) => {
    const res = await gradeSubmission.mutateAsync({
      assignmentId,
      userId,
      grade: BigInt(Number(grade)),
      feedback
    });
    if (res.__kind__ === "err") {
      ue.error(res.err);
      return;
    }
    ue.success("تم التصحيح");
    setGradingId(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "teacher_students.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "👧 الطالبات" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i)) }) : students.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12 text-muted-foreground",
        "data-ocid": "teacher_students.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "👧" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "لا توجد طالبات بعد" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "md:col-span-1 space-y-2",
          "data-ocid": "teacher_students.list",
          children: students.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `teacher_students.student.${i + 1}`,
              onClick: () => setSelectedUserId(s.userId),
              className: `w-full text-right bg-card border rounded-xl p-4 transition-smooth ${selectedUserId === s.userId ? "border-primary shadow-xs" : "border-border hover:border-primary/40"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary shrink-0", children: s.name.charAt(0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate text-sm", children: s.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    s.className,
                    " • ",
                    String(s.points),
                    " نقطة"
                  ] })
                ] })
              ] })
            },
            s.userId
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: !selectedUserId ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-16 text-muted-foreground",
          "data-ocid": "teacher_students.select_hint",
          children: "← اختاري طالبة"
        }
      ) : !selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-3", children: selected.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-primary", children: String(selected.points) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "نقطة" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: selected.chapterProgress.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "فصول" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-secondary", children: selected.badges.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "وسام" })
            ] })
          ] })
        ] }),
        selected.chapterProgress.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground mb-3", children: "تقدم الفصول" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selected.chapterProgress.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary w-6 shrink-0", children: String(p.chapterId) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-2 bg-primary rounded-full",
                    style: { width: `${Number(p.score)}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0", children: [
                  String(p.score),
                  "%"
                ] })
              ]
            },
            String(p.chapterId)
          )) })
        ] }),
        submissions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground mb-3", children: "الواجبات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: submissions.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `teacher_students.submission.${i + 1}`,
              className: "border border-border rounded-lg p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "واجب #",
                    String(sub.assignmentId)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs px-2 py-0.5 rounded-full font-medium ${sub.status === AssignmentStatus.graded ? "bg-green-100 text-green-700" : sub.status === AssignmentStatus.submitted ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"}`,
                      children: sub.status === AssignmentStatus.graded ? "مصحح" : sub.status === AssignmentStatus.submitted ? "مسلّم" : "معلق"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mb-3", children: sub.answer }),
                sub.status === AssignmentStatus.submitted && gradingId !== String(sub.assignmentId) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `teacher_students.grade_button.${i + 1}`,
                    onClick: () => setGradingId(String(sub.assignmentId)),
                    className: "text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-smooth",
                    children: "تصحيح"
                  }
                ) : gradingId === String(sub.assignmentId) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      max: "10",
                      value: grade,
                      onChange: (e) => setGrade(e.target.value),
                      placeholder: "الدرجة / 10",
                      className: "w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      value: feedback,
                      onChange: (e) => setFeedback(e.target.value),
                      placeholder: "ملاحظة (اختياري)",
                      className: "w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `teacher_students.confirm_grade.${i + 1}`,
                        onClick: () => handleGrade(sub.assignmentId, sub.userId),
                        className: "bg-primary text-primary-foreground text-xs px-4 py-2 rounded-lg hover:opacity-90",
                        children: "حفظ"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `teacher_students.cancel_grade.${i + 1}`,
                        onClick: () => setGradingId(null),
                        className: "text-xs text-muted-foreground hover:text-foreground",
                        children: "إلغاء"
                      }
                    )
                  ] })
                ] }) : sub.status === AssignmentStatus.graded ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-secondary", children: [
                  "الدرجة: ",
                  String(sub.grade),
                  "/10",
                  " ",
                  sub.feedback && `- ${sub.feedback}`
                ] }) : null
              ]
            },
            `${String(sub.assignmentId)}-${sub.userId}`
          )) })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  TeacherStudents as default
};
