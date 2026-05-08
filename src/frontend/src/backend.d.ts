import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type SessionId = string;
export interface ChapterProgress {
    completed: boolean;
    chapterId: bigint;
    score: bigint;
}
export type Result_1 = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export interface Badge {
    id: bigint;
    title: string;
}
export interface ExamScore {
    total: bigint;
    level: bigint;
    score: bigint;
}
export type UserId = string;
export interface Session {
    id: SessionId;
    status: SessionStatus;
    createdAt: Timestamp;
    teacherId: UserId;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface GameScore {
    total: bigint;
    score: bigint;
    boxId: bigint;
}
export interface Choice {
    id: bigint;
    text: string;
    correct: boolean;
}
export interface Assignment {
    id: bigint;
    title: string;
    content: string;
    atype: AssignmentType;
    createdAt: Timestamp;
    sessionId: SessionId;
}
export interface SubmissionPublic {
    status: AssignmentStatus;
    userId: UserId;
    submittedAt: Timestamp;
    feedback: string;
    answer: string;
    grade?: bigint;
    assignmentId: bigint;
    sessionId: SessionId;
}
export interface Question {
    id: bigint;
    explanation: string;
    text: string;
    qtype: QuestionType;
    chapterId?: bigint;
    level?: bigint;
    boxId?: bigint;
    choices: Array<Choice>;
}
export interface Student {
    userId: UserId;
    name: string;
    badges: Array<Badge>;
    joinedAt: Timestamp;
    chapterProgress: Array<ChapterProgress>;
    gameScores: Array<GameScore>;
    unlockedChars: Array<bigint>;
    examScores: Array<ExamScore>;
    sessionId: SessionId;
    className: string;
    points: bigint;
}
export enum AssignmentStatus {
    graded = "graded",
    submitted = "submitted",
    pending = "pending"
}
export enum AssignmentType {
    mcq = "mcq",
    poll = "poll",
    writing = "writing",
    drawing = "drawing"
}
export enum QuestionType {
    exam = "exam",
    game = "game",
    grammar = "grammar",
    writing = "writing",
    chapter = "chapter"
}
export enum SessionStatus {
    active = "active",
    ended = "ended"
}
export interface backendInterface {
    addQuestion(q: Question): Promise<bigint>;
    awardBadge(userId: UserId, badge: Badge): Promise<Result>;
    classCompletion(sessionId: SessionId): Promise<bigint>;
    createAssignment(sessionId: SessionId, title: string, atype: AssignmentType, content: string): Promise<bigint>;
    createSession(teacherId: UserId): Promise<SessionId>;
    deleteAssignment(id: bigint): Promise<void>;
    deleteQuestion(id: bigint): Promise<void>;
    endSession(sessionId: SessionId, teacherId: UserId): Promise<Result>;
    getLeaderboard(sessionId: SessionId): Promise<Array<Student>>;
    getSession(sessionId: SessionId): Promise<Session | null>;
    getStudent(userId: UserId): Promise<Student | null>;
    getSubmissions(assignmentId: bigint): Promise<Array<SubmissionPublic>>;
    gradeSubmission(assignmentId: bigint, userId: UserId, grade: bigint, feedback: string): Promise<Result>;
    grantPoints(userId: UserId, delta: bigint): Promise<Result_1>;
    joinSession(sessionId: SessionId, userId: UserId, name: string, className: string): Promise<Result>;
    listAssignments(sessionId: SessionId): Promise<Array<Assignment>>;
    listQuestions(qtype: QuestionType | null, chapterId: bigint | null, level: bigint | null, boxId: bigint | null): Promise<Array<Question>>;
    listStudents(sessionId: SessionId): Promise<Array<Student>>;
    mySubmissions(userId: UserId): Promise<Array<SubmissionPublic>>;
    saveDrawing(userId: UserId, data: string): Promise<Result>;
    saveNotes(userId: UserId, notes: string): Promise<Result>;
    submitAssignment(assignmentId: bigint, userId: UserId, sessionId: SessionId, answer: string): Promise<Result>;
    submitChapterProgress(userId: UserId, progress: ChapterProgress): Promise<Result>;
    submitExamScore(userId: UserId, score: ExamScore): Promise<Result>;
    submitGameScore(userId: UserId, score: GameScore): Promise<Result>;
    updateQuestion(q: Question): Promise<Result>;
}
