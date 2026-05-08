import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role } from "../types";

interface SessionStore {
  sessionId: string | null;
  userId: string;
  role: Role;
  name: string;
  className: string;
  points: number;
  setSession: (data: Partial<SessionStore>) => void;
  clearSession: () => void;
  addPoints: (n: number) => void;
}

const generateUserId = () =>
  `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      sessionId: null,
      userId: generateUserId(),
      role: null,
      name: "",
      className: "",
      points: 0,
      setSession: (data) => set((s) => ({ ...s, ...data })),
      clearSession: () =>
        set({
          sessionId: null,
          userId: generateUserId(),
          role: null,
          name: "",
          className: "",
          points: 0,
        }),
      addPoints: (n) => set((s) => ({ points: s.points + n })),
    }),
    { name: "ostrich-session" },
  ),
);
