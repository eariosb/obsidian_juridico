import { CheckCircle } from "lucide-react";
import type { ModuleMeta } from "@/types/module";

export function ModuleHeader({ meta }: { meta: ModuleMeta }) {
  const objectives = Array.isArray(meta.objective)
    ? meta.objective
    : [meta.objective];

  return (
    <header className="mb-8">
      <div className="mb-2 text-sm text-muted-foreground">
        Módulo {meta.order}
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {meta.title}
      </h1>
      {meta.subtitle && (
        <p className="mt-3 text-lg text-muted-foreground">{meta.subtitle}</p>
      )}

      {objectives.length > 0 && (
        <div className="mt-6 rounded-lg border border-border bg-secondary/50 p-4">
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Objetivos de aprendizaje
          </h2>
          <ul className="flex flex-col gap-2">
            {objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
