"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ProgressContext, type ProgressContextValue } from "@/hooks/useProgress";

const STORAGE_KEY = "course-progress-obsidian";

interface ProgressProviderProps {
  totalModules: number;
  children: React.ReactNode;
}

export function ProgressProvider({ totalModules, children }: ProgressProviderProps) {
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw) as string[];
        setCompletedSlugs(new Set(arr));
      }
    } catch {
      // ignore parse errors
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSlugs]));
    } catch {
      // ignore storage errors
    }
  }, [completedSlugs, mounted]);

  const markCompleted = useCallback((slug: string) => {
    setCompletedSlugs((prev) => {
      const next = new Set(prev);
      next.add(slug);
      return next;
    });
  }, []);

  const unmarkCompleted = useCallback((slug: string) => {
    setCompletedSlugs((prev) => {
      const next = new Set(prev);
      next.delete(slug);
      return next;
    });
  }, []);

  const toggleCompleted = useCallback((slug: string) => {
    setCompletedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (slug: string) => completedSlugs.has(slug),
    [completedSlugs]
  );

  const progressPct = useMemo(() => {
    if (totalModules === 0) return 0;
    return (completedSlugs.size / totalModules) * 100;
  }, [completedSlugs.size, totalModules]);

  const value: ProgressContextValue = {
    completedSlugs,
    progressPct,
    toggleCompleted,
    markCompleted,
    unmarkCompleted,
    isCompleted,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
