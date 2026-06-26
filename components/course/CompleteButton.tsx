"use client";

import { Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/useProgress";

export function CompleteButton({ slug }: { slug: string }) {
  const { isCompleted, toggleCompleted } = useProgress();
  const completed = isCompleted(slug);

  return (
    <Button
      variant={completed ? "secondary" : "default"}
      size="lg"
      onClick={() => toggleCompleted(slug)}
      className="mt-8"
    >
      {completed ? (
        <>
          <Check className="h-4 w-4" />
          Completado — Click para desmarcar
        </>
      ) : (
        <>
          <Circle className="h-4 w-4" />
          Marcar como completado
        </>
      )}
    </Button>
  );
}
