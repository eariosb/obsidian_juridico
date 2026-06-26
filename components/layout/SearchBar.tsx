"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ModuleEntry } from "@/types/module";

interface SearchBarProps {
  modules: ModuleEntry[];
}

export function SearchBar({ modules }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return modules.filter(
      (m) =>
        m.meta.title.toLowerCase().includes(q) ||
        m.meta.slug.toLowerCase().includes(q) ||
        (m.meta.subtitle?.toLowerCase().includes(q) ?? false)
    );
  }, [query, modules]);

  return (
    <div className="relative px-2">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar módulo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-input bg-background py-1.5 pl-8 pr-8 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label="Buscar módulo"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query && results.length > 0 && (
        <ul className="mt-2 flex flex-col gap-1 rounded-md border border-border bg-popover p-2 shadow-md">
          {results.map((m) => (
            <li key={m.meta.slug}>
              <Link
                href={`/modulos/${m.meta.slug}`}
                onClick={() => setQuery("")}
                className={cn(
                  "block rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                )}
              >
                <span className="text-xs text-muted-foreground">
                  {m.meta.order}
                </span>{" "}
                {m.meta.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {query && results.length === 0 && (
        <p className="mt-2 px-2 text-sm text-muted-foreground">
          Sin resultados para &quot;{query}&quot;
        </p>
      )}
    </div>
  );
}
