import { Skeleton } from "@/components/ui/skeleton";
import { useSessionStore } from "@/store/sessionStore";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy pages
const Landing = lazy(() => import("./pages/Landing"));
const Home = lazy(() => import("./pages/Home"));
const Chapters = lazy(() => import("./pages/Chapters"));
const Grammar = lazy(() => import("./pages/Grammar"));
const Exams = lazy(() => import("./pages/Exams"));
const Games = lazy(() => import("./pages/Games"));
const Writing = lazy(() => import("./pages/Writing"));
const StudentProfile = lazy(() => import("./pages/StudentProfile"));
const StudentDashboard = lazy(() => import("./pages/student/Dashboard"));
const StudentDrawing = lazy(() => import("./pages/student/Drawing"));
const StudentNotes = lazy(() => import("./pages/student/Notes"));
const StudentChapters = lazy(() => import("./pages/student/ChapterProgress"));
const StudentExams = lazy(() => import("./pages/student/ExamScores"));
const StudentGames = lazy(() => import("./pages/student/GameScores"));
const StudentProgress = lazy(() => import("./pages/student/OverallProgress"));
const Characters = lazy(() => import("./pages/Characters"));
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard"));
const TeacherStudents = lazy(() => import("./pages/TeacherStudents"));

const LoadingFallback = () => (
  <div className="p-6 space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
);

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  ),
});

function requireSession() {
  const { sessionId } = useSessionStore.getState();
  if (!sessionId) throw redirect({ to: "/" });
}

function requireTeacher() {
  const { role, sessionId } = useSessionStore.getState();
  if (!sessionId) throw redirect({ to: "/" });
  if (role !== "teacher") throw redirect({ to: "/home" });
}

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  beforeLoad: requireSession,
  component: Home,
});
const chaptersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chapters",
  beforeLoad: requireSession,
  component: Chapters,
});
const grammarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/grammar",
  beforeLoad: requireSession,
  component: Grammar,
});
const examsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exams",
  beforeLoad: requireSession,
  component: Exams,
});
const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/games",
  beforeLoad: requireSession,
  component: Games,
});
const writingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/writing",
  beforeLoad: requireSession,
  component: Writing,
});
const studentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student",
  beforeLoad: requireSession,
  component: StudentProfile,
});
const studentIndexRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/",
  component: StudentDashboard,
});
const studentDrawingRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/drawing",
  component: StudentDrawing,
});
const studentNotesRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/notes",
  component: StudentNotes,
});
const studentChaptersRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/chapters",
  component: StudentChapters,
});
const studentExamsRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/exams",
  component: StudentExams,
});
const studentGamesRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/games",
  component: StudentGames,
});
const studentProgressRoute = createRoute({
  getParentRoute: () => studentRoute,
  path: "/progress",
  component: StudentProgress,
});
const charactersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/characters",
  beforeLoad: requireSession,
  component: Characters,
});
const teacherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher",
  beforeLoad: requireTeacher,
  component: TeacherDashboard,
});
const teacherStudentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/students",
  beforeLoad: requireTeacher,
  component: TeacherStudents,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  homeRoute,
  chaptersRoute,
  grammarRoute,
  examsRoute,
  gamesRoute,
  writingRoute,
  studentRoute.addChildren([
    studentIndexRoute,
    studentDrawingRoute,
    studentNotesRoute,
    studentChaptersRoute,
    studentExamsRoute,
    studentGamesRoute,
    studentProgressRoute,
  ]),
  charactersRoute,
  teacherRoute,
  teacherStudentsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
