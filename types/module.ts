export interface ModuleMeta {
  title: string;
  slug: string;
  subtitle?: string;
  order: number;
  objective: string | string[];
  datasets?: string[];
  type?: "module" | "anexo";
}

export interface ModuleEntry {
  meta: ModuleMeta;
  fileName: string;
}

export interface ModuleData {
  meta: ModuleMeta;
  content: string;
  fileName: string;
}

export interface AdjacentModules {
  prev?: ModuleEntry;
  next?: ModuleEntry;
}
