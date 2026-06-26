"use client";

import { createContext, useContext } from "react";

export interface ProgressContextValue {
  completedSlugs: Set<string>;
  progressPct: number;
  toggleCompleted: (slug: string) => void;
  markCompleted: (slug: string) => void;
  unmarkCompleted: (slug: string) => void;
  isCompleted: (slug: string) => boolean;
}

export const ProgressContext = createContext<ProgressContextValue | null>(null);

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}
