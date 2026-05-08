export type {
  Session,
  Student,
  Question,
  Assignment,
  SubmissionPublic,
  Choice,
  Badge,
  ChapterProgress,
  GameScore,
  ExamScore,
} from "../backend.d";
export {
  AssignmentStatus,
  AssignmentType,
  QuestionType,
  SessionStatus,
} from "../backend.d";
export type { SessionId, UserId, Timestamp } from "../backend.d";

export type Role = "teacher" | "student" | null;

export interface SessionState {
  sessionId: string | null;
  userId: string;
  role: Role;
  name: string;
  className: string;
  points: number;
}

export const CHAPTERS = [
  { id: 1, title: "بيضات النعام في الرمل" },
  { id: 2, title: "مدفون في الرمال" },
  { id: 3, title: "حين طلبت أم هدارة العون" },
  { id: 4, title: "في مواجهة الموت" },
  { id: 5, title: "الأفعى السامة" },
  { id: 6, title: "الابن المفضل" },
  { id: 7, title: "المكان الممنوع" },
  { id: 8, title: "من دون ماء" },
  { id: 9, title: "هجوم بنات آوى" },
  { id: 10, title: "هل تعنين أنني لست طائر نعام حقيقياً؟" },
  { id: 11, title: "في جزيرة مقطوعة وسط الصحراء" },
  { id: 12, title: "ثلاث خيمات مهجورة" },
  { id: 13, title: "اليدان في المغارة" },
  { id: 14, title: "أخيراً، كائن يشبهني" },
  { id: 15, title: "الهجوم" },
  { id: 16, title: "قتل أسد" },
  { id: 17, title: "غزالة على وشك الموت" },
  { id: 18, title: "هجوم اللبؤة" },
  { id: 19, title: "الأسد الذي قتلته النعامات" },
  { id: 20, title: "اللبؤة الصغيرة" },
  { id: 21, title: "الفخ" },
  { id: 22, title: "الهرب" },
  { id: 23, title: "جنة لطيور النعام" },
  { id: 24, title: "فريق البحث عن الولد البري" },
  { id: 25, title: "لقاء مع صديق قديم" },
  { id: 26, title: "عن ولد بري في فرنسا" },
  { id: 27, title: "مناقير تحب المساعدة" },
  { id: 28, title: "أكثر شهرة من كاسبر هاوزر" },
  { id: 29, title: "وعاء فخاري مليء بالتمر" },
  { id: 30, title: "شياطين الصحراء تنتقم" },
  { id: 31, title: "بضعة ملايين من الجراد" },
  { id: 32, title: "كارثة" },
  { id: 33, title: "أسير" },
  { id: 34, title: "هذا بُني! هذا هدارة" },
  { id: 35, title: "التحول إلى إنسان" },
  { id: 36, title: "فتاة عيناها كالنجوم" },
  { id: 37, title: "يوم السعد ربما" },
  { id: 38, title: "آثار طيور النعام" },
] as const;

export const CHARACTERS = [
  {
    id: 1,
    name: "هدارة",
    emoji: "👦",
    description: "الولد الذي عاش مع النعام",
  },
  {
    id: 2,
    name: "ماكو",
    emoji: "🦩",
    description: "النعامة الأم التي ربّت هدارة",
  },
  {
    id: 3,
    name: "حوج",
    emoji: "🦩",
    description: "نعامة قوية البنية، أرجل قوية",
  },
  {
    id: 4,
    name: "فاطمة",
    emoji: "👩",
    description: "أم هدارة، المرأة البدوية الصابرة",
  },
  { id: 5, name: "محمد فاضل", emoji: "👨", description: "والد هدارة" },
  {
    id: 6,
    name: "دولة",
    emoji: "👨",
    description: "الرجل الصالح الذي صلاته مستجابة",
  },
  { id: 7, name: "بوبوط", emoji: "👨", description: "الرجل الشجاع في القافلة" },
  {
    id: 8,
    name: "لوك أوكونر",
    emoji: "📸",
    description: "المصور الأجنبي الطامع بالشهرة",
  },
  { id: 9, name: "ظبيا", emoji: "🦌", description: "الغزالة الوفية لهدارة" },
  {
    id: 10,
    name: "اللبؤة الصغيرة",
    emoji: "🦁",
    description: "الشبل الذي أنقذه هدارة",
  },
  {
    id: 11,
    name: "اللبؤة الكبيرة",
    emoji: "🦁",
    description: "اللبؤة البالغة",
  },
  {
    id: 12,
    name: "سيدي إبراهيم",
    emoji: "👳",
    description: "الحكيم الذي يعرف قصة هدارة",
  },
] as const;
