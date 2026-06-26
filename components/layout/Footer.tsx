import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-muted/50 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Esneider Ríos</h3>
            <p className="text-sm text-muted-foreground">
              Estadístico · Dev · Legaltech
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a
              href="mailto:eariosb@unal.edu.co"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              eariosb@unal.edu.co
            </a>
            <a
              href="https://wa.me/573044575399"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Phone className="h-4 w-4" />
              +57 304 457 5399
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Medellín, Colombia
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Curso Obsidian para Despachos Jurídicos
        </div>
      </div>
    </footer>
  );
}
