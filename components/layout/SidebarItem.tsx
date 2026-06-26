import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  href: string;
  title: string;
  order?: number;
  isActive: boolean;
  isCompleted: boolean;
}

export function SidebarItem({ href, title, order, isActive, isCompleted }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-start gap-2 rounded-md px-2 py-0.5 text-xs transition-colors",
        isActive
          ? "bg-primary/10 font-medium text-primary"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      <span className="mt-0.5 shrink-0 text-[10px]" aria-hidden="true">
        {isCompleted ? "✅" : "○"}
      </span>
      <span className="line-clamp-2">
        {order && <span className="text-[10px] text-muted-foreground/70 mr-1">{order}</span>}
        {title}
      </span>
    </Link>
  );
}
