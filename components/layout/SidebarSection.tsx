import { ReactNode } from "react";

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <>
      <div className="mb-1 px-2 text-[10px] font-semibold uppercase text-muted-foreground">
        {title}
      </div>
      <ul className="flex flex-col gap-0.5">{children}</ul>
    </>
  );
}
