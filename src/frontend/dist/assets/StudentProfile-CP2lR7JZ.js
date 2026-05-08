import { j as jsxRuntimeExports, L as Link, c as cn, O as Outlet } from "./index-oDdfbtqD.js";
import { u as useLocation, L as Layout } from "./Layout-B8aXBhxf.js";
import "./index-C0960S8x.js";
const STUDENT_TABS = [
  { to: "/student", label: "الرئيسية", icon: "🏠" },
  { to: "/student/chapters", label: "الفصول", icon: "📖" },
  { to: "/student/exams", label: "الاختبارات", icon: "📝" },
  { to: "/student/games", label: "الألعاب", icon: "🎮" },
  { to: "/student/progress", label: "التطور", icon: "📊" },
  { to: "/student/drawing", label: "الرسم", icon: "🎨" },
  { to: "/student/notes", label: "الملاحظات", icon: "📒" }
];
function StudentProfile() {
  var _a;
  const { pathname } = useLocation();
  const activeTab = pathname === "/student" ? "/student" : ((_a = STUDENT_TABS.find(
    (t) => t.to !== "/student" && pathname.startsWith(t.to)
  )) == null ? void 0 : _a.to) ?? "/student";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: "rtl", "data-ocid": "student.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-1 flex gap-1 overflow-x-auto mb-5 scrollbar-none",
        "data-ocid": "student.tabs",
        children: STUDENT_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: tab.to,
            "data-ocid": `student.tab.${tab.label}`,
            className: cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth",
              activeTab === tab.to ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.label })
            ]
          },
          tab.to
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] }) });
}
export {
  StudentProfile as default
};
