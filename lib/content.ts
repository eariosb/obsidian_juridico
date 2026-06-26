import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ModuleEntry, ModuleData, AdjacentModules, ModuleMeta } from "@/types/module";

const CONTENT_DIR = path.join(process.cwd(), "content", "modulos");

function validateMeta(
  data: Record<string, unknown>,
  fileName: string
): ModuleMeta {
  if (typeof data.title !== "string") {
    throw new TypeError(`Module ${fileName} is missing required field: title`);
  }
  if (typeof data.slug !== "string") {
    throw new TypeError(`Module ${fileName} is missing required field: slug`);
  }
  if (typeof data.order !== "number") {
    throw new TypeError(`Module ${fileName} is missing required field: order`);
  }

  const objective = data.objective;
  if (
    objective !== undefined &&
    !Array.isArray(objective) &&
    typeof objective !== "string"
  ) {
    throw new TypeError(
      `Module ${fileName} has invalid field: objective must be string or string[]`
    );
  }

  return {
    title: data.title,
    slug: data.slug,
    subtitle: typeof data.subtitle === "string" ? data.subtitle : undefined,
    order: data.order,
    objective: (objective as string | string[]) ?? [],
    datasets: Array.isArray(data.datasets)
      ? (data.datasets as string[])
      : undefined,
    type: data.type === "anexo" ? "anexo" : "module",
  };
}

export function getAllModules(): ModuleEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const modules: ModuleEntry[] = files.map((fileName) => {
    const filePath = path.join(CONTENT_DIR, fileName);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    const meta = validateMeta(data, fileName);

    return { meta, fileName };
  });

  return modules.sort((a, b) => a.meta.order - b.meta.order);
}

export function getModuleBySlug(slug: string): ModuleData | undefined {
  if (!fs.existsSync(CONTENT_DIR)) {
    return undefined;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  for (const fileName of files) {
    const filePath = path.join(CONTENT_DIR, fileName);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    if (data.slug === slug) {
      const meta = validateMeta(data, fileName);
      return { meta, content, fileName };
    }
  }

  return undefined;
}

export function getAdjacentModules(slug: string): AdjacentModules {
  const modules = getAllModules();
  const index = modules.findIndex((m) => m.meta.slug === slug);

  if (index === -1) {
    return {};
  }

  return {
    prev: index > 0 ? modules[index - 1] : undefined,
    next: index < modules.length - 1 ? modules[index + 1] : undefined,
  };
}

export function getTotalModules(): number {
  return getAllModules().length;
}
