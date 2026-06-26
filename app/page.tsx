import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Network } from "lucide-react";
import { getAllModules } from "@/lib/content";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const modules = getAllModules();
  const firstModule = modules[0];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="flex flex-col items-center text-center gap-6 py-12">
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-secondary-foreground">
          <BookOpen className="h-4 w-4" />
          <span>Curso completo · {modules.length} módulos</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Curso Obsidian para
          <br />
          <span className="text-primary">Despachos Jurídicos</span>
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground">
          Aprende a transformar la gestión documental de tu despacho con
          Obsidian. Desde la bóveda compartida hasta inteligencia artificial
          local, dominando Markdown, Dataview y trazabilidad procesal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {firstModule && (
            <Button asChild size="lg">
              <Link href={`/modulos/${firstModule.meta.slug}`}>
                Comenzar el curso
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3 py-8">
        <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
          <FileText className="h-8 w-8 text-primary" />
          <h3 className="mt-4 text-lg font-semibold">
            Redacción procesal con Markdown
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Domina la sintaxis Markdown para redactar demandas, tutelas y
            escritos con formato limpio y exportable a PDF.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
          <Network className="h-8 w-8 text-primary" />
          <h3 className="mt-4 text-lg font-semibold">
            Red de conocimiento jurídico
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Conecta normas, jurisprudencia y casos mediante enlaces
            bidireccionales para construir memoria institucional.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
          <BookOpen className="h-8 w-8 text-primary" />
          <h3 className="mt-4 text-lg font-semibold">
            {modules.length} módulos prácticos
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Desde la configuración inicial hasta inteligencia artificial local
            con Ollama. Cada módulo incluye ejercicios aplicables.
          </p>
        </div>
      </section>

      <section className="py-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Contenido del curso</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <Card key={mod.meta.slug} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="text-xs text-muted-foreground">Módulo {mod.meta.order}</div>
                <CardTitle className="text-lg">{mod.meta.title}</CardTitle>
                {mod.meta.subtitle && (
                  <CardDescription className="line-clamp-2">
                    {mod.meta.subtitle}
                  </CardDescription>
                )}
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/modulos/${mod.meta.slug}`}>
                    Ver módulo
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
