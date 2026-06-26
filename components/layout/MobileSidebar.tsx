"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/Sidebar";
import { SearchBar } from "@/components/layout/SearchBar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import type { ModuleEntry } from "@/types/module";

interface MobileSidebarProps {
  modules: ModuleEntry[];
}

export function MobileSidebar({ modules }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <span className="text-sm font-semibold">Curso Obsidian</span>
        <ThemeToggle />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 border-r border-border bg-card shadow-lg">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold">Navegación</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
              >
                <X />
              </Button>
            </div>
            <SearchBar modules={modules} />
            <div className="overflow-y-auto" style={{ maxHeight: "calc(100% - 120px)" }}>
              <div onClick={() => setOpen(false)}>
                <Sidebar modules={modules} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
