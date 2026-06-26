import { notFound } from "next/navigation";
import { getModuleBySlug, getAdjacentModules, getAllModules } from "@/lib/content";
import { ModuleHeader } from "@/components/course/ModuleHeader";
import { ModulePrevNext } from "@/components/course/ModulePrevNext";
import { MdxContent } from "@/components/course/MdxContent";
import { CompleteButton } from "@/components/course/CompleteButton";
import { TableOfContents } from "@/components/course/TableOfContents";

export function generateStaticParams() {
  return getAllModules().map((mod) => ({ slug: mod.meta.slug }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const moduleData = getModuleBySlug(slug);

  if (!moduleData) {
    notFound();
  }

  const adjacent = getAdjacentModules(slug);

  return (
    <div className="flex gap-8 px-6 py-12">
      <article className="flex-1 max-w-3xl">
        <ModuleHeader meta={moduleData.meta} />
        <MdxContent source={moduleData.content} />
        <CompleteButton slug={moduleData.meta.slug} />
        <ModulePrevNext adjacent={adjacent} />
      </article>
      <TableOfContents />
    </div>
  );
}
