import { getAllModules } from "@/lib/content";

export function generateStaticParams() {
  const modules = getAllModules();
  return modules.map((mod) => ({ slug: mod.meta.slug }));
}
