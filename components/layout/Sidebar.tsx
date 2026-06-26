"use client";

import { usePathname } from "next/navigation";
import { useProgress } from "@/hooks/useProgress";
import type { ModuleEntry } from "@/types/module";
import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";

interface SidebarProps {
  modules: ModuleEntry[];
}

export function Sidebar({ modules }: SidebarProps) {
  const pathname = usePathname();
  const { isCompleted } = useProgress();

  const mainModules = modules.filter((m) => m.meta.type !== "anexo");
  const annexes = modules.filter((m) => m.meta.type === "anexo");

  return (
    <nav className="flex h-[calc(100vh-6rem)] flex-col p-2" aria-label="Navegación del curso">
      <SidebarSection title="Módulos">
        {mainModules.map((mod) => (
          <SidebarItem
            key={mod.meta.slug}
            href={`/modulos/${mod.meta.slug}`}
            title={mod.meta.title}
            order={mod.meta.order}
            isActive={pathname === `/modulos/${mod.meta.slug}`}
            isCompleted={isCompleted(mod.meta.slug)}
          />
        ))}
      </SidebarSection>

      {annexes.length > 0 && (
        <SidebarSection title="Anexos">
          {annexes.map((mod) => (
            <SidebarItem
              key={mod.meta.slug}
              href={`/modulos/${mod.meta.slug}`}
              title={mod.meta.title}
              isActive={pathname === `/modulos/${mod.meta.slug}`}
              isCompleted={isCompleted(mod.meta.slug)}
            />
          ))}
        </SidebarSection>
      )}
    </nav>
  );
}
