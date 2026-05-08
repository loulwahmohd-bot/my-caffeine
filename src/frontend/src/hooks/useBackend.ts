import { createActor } from "@/backend";
import type {
  AssignmentType,
  ChapterProgress,
  ExamScore,
  GameScore,
  Question,
} from "@/types";
import type { QuestionType } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Actor ────────────────────────────────────────────
export function useBackendActor() {
  return useActor(createActor);
}

// ─── Session ──────────────────────────────────────────
export function useSession(sessionId: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getSession(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: 5000,
  });
}

export function useCreateSession() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (teacherId: string) => {
      if (!actor) throw new Error("no actor");
      return actor.createSession(teacherId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["session"] }),
  });
}

export function useJoinSession() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      sessionId: string;
      userId: string;
      name: string;
      className: string;
    }) => {
      if (!actor) throw new Error("no actor");
      return actor.joinSession(
        args.sessionId,
        args.userId,
        args.name,
        args.className,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useEndSession() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { sessionId: string; teacherId: string }) => {
      if (!actor) throw new Error("no actor");
      return actor.endSession(args.sessionId, args.teacherId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["session"] }),
  });
}

// ─── Students ─────────────────────────────────────────
export function useStudents(sessionId: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["students", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return [];
      return actor.listStudents(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: 5000,
  });
}

export function useStudent(userId: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["student", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getStudent(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
    refetchInterval: 5000,
  });
}

export function useLeaderboard(sessionId: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["leaderboard", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return [];
      return actor.getLeaderboard(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: 5000,
  });
}

export function useClassCompletion(sessionId: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["class-completion", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return BigInt(0);
      return actor.classCompletion(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: 5000,
  });
}

// ─── Questions ────────────────────────────────────────
export interface QuestionFilter {
  qtype?: QuestionType;
  chapterId?: number;
  level?: number;
  boxId?: number;
}

export function useQuestions(filter: QuestionFilter = {}) {
  const { actor, isFetching } = useActor(createActor);
  const { qtype = null, chapterId = null, level = null, boxId = null } = filter;
  return useQuery({
    queryKey: ["questions", qtype, chapterId, level, boxId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listQuestions(
        qtype,
        chapterId != null ? BigInt(chapterId) : null,
        level != null ? BigInt(level) : null,
        boxId != null ? BigInt(boxId) : null,
      );
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });
}

export function useAddQuestion() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (q: Question) => {
      if (!actor) throw new Error("no actor");
      return actor.addQuestion(q);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["questions"] }),
  });
}

export function useUpdateQuestion() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (q: Question) => {
      if (!actor) throw new Error("no actor");
      return actor.updateQuestion(q);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["questions"] }),
  });
}

export function useDeleteQuestion() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("no actor");
      return actor.deleteQuestion(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["questions"] }),
  });
}

// ─── Assignments ──────────────────────────────────────
export function useAssignments(sessionId: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["assignments", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return [];
      return actor.listAssignments(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: 5000,
  });
}

export function useCreateAssignment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      sessionId: string;
      title: string;
      atype: AssignmentType;
      content: string;
    }) => {
      if (!actor) throw new Error("no actor");
      return actor.createAssignment(
        args.sessionId,
        args.title,
        args.atype,
        args.content,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["assignments"] }),
  });
}

export function useDeleteAssignment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("no actor");
      return actor.deleteAssignment(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["assignments"] }),
  });
}

export function useSubmissions(assignmentId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["submissions", assignmentId?.toString()],
    queryFn: async () => {
      if (!actor || !assignmentId) return [];
      return actor.getSubmissions(assignmentId);
    },
    enabled: !!actor && !isFetching && !!assignmentId,
    refetchInterval: 5000,
  });
}

export function useMySubmissions(userId: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["my-submissions", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.mySubmissions(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
    refetchInterval: 5000,
  });
}

export function useSubmitAssignment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      assignmentId: bigint;
      userId: string;
      sessionId: string;
      answer: string;
    }) => {
      if (!actor) throw new Error("no actor");
      return actor.submitAssignment(
        args.assignmentId,
        args.userId,
        args.sessionId,
        args.answer,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-submissions"] }),
  });
}

export function useGradeSubmission() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      assignmentId: bigint;
      userId: string;
      grade: bigint;
      feedback: string;
    }) => {
      if (!actor) throw new Error("no actor");
      return actor.gradeSubmission(
        args.assignmentId,
        args.userId,
        args.grade,
        args.feedback,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["submissions"] }),
  });
}

// ─── Progress ─────────────────────────────────────────
export function useSubmitChapterProgress() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { userId: string; progress: ChapterProgress }) => {
      if (!actor) throw new Error("no actor");
      return actor.submitChapterProgress(args.userId, args.progress);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["student"] }),
  });
}

export function useSubmitExamScore() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { userId: string; score: ExamScore }) => {
      if (!actor) throw new Error("no actor");
      return actor.submitExamScore(args.userId, args.score);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["student"] }),
  });
}

export function useSubmitGameScore() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { userId: string; score: GameScore }) => {
      if (!actor) throw new Error("no actor");
      return actor.submitGameScore(args.userId, args.score);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["student"] }),
  });
}

export function useGrantPoints() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { userId: string; delta: bigint }) => {
      if (!actor) throw new Error("no actor");
      return actor.grantPoints(args.userId, args.delta);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["student"] }),
  });
}

export function useAwardBadge() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      userId: string;
      badge: { id: bigint; title: string };
    }) => {
      if (!actor) throw new Error("no actor");
      return actor.awardBadge(args.userId, args.badge);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["student"] }),
  });
}

export function useSaveNotes() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (args: { userId: string; notes: string }) => {
      if (!actor) throw new Error("no actor");
      return actor.saveNotes(args.userId, args.notes);
    },
  });
}

export function useSaveDrawing() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (args: { userId: string; data: string }) => {
      if (!actor) throw new Error("no actor");
      return actor.saveDrawing(args.userId, args.data);
    },
  });
}
