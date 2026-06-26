"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    ).filter((h) => h.id);

    const tocItems: TocItem[] = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: Number.parseInt(heading.tagName.replace("H", ""), 10),
    }));

    setHeadings(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => {
      headingElements.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block w-48 shrink-0 pl-8" aria-label="Tabla de contenidos">
      <div className="sticky top-24">
        <div className="text-xs font-semibold uppercase text-muted-foreground mb-3">
          Contenido
        </div>
        <ul className="flex flex-col gap-1 text-xs">
          {headings.map((heading, index) => (
            <li
              key={`${heading.id}-${index}`}
              style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block py-1 text-muted-foreground hover:text-foreground transition-colors",
                  activeId === heading.id && "text-primary font-medium"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
