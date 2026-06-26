import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdjacentModules } from "@/types/module";

export function ModulePrevNext({ adjacent }: { adjacent: AdjacentModules }) {
  return (
    <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
      {adjacent.prev ? (
        <Button asChild variant="outline" size="sm">
          <Link href={`/modulos/${adjacent.prev.meta.slug}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground">Anterior</span>
              <span className="line-clamp-1">{adjacent.prev.meta.title}</span>
            </span>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {adjacent.next ? (
        <Button asChild variant="outline" size="sm">
          <Link href={`/modulos/${adjacent.next.meta.slug}`}>
            <span className="flex flex-col items-end text-right">
              <span className="text-xs text-muted-foreground">Siguiente</span>
              <span className="line-clamp-1">{adjacent.next.meta.title}</span>
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}
