import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { CodeBlock } from "./CodeBlock";

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-pre:bg-muted prose-pre:text-foreground prose-code:text-primary prose-a:text-primary prose-img:rounded-lg prose-table:text-foreground prose-th:border-border prose-td:border-border">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkBreaks],
            rehypePlugins: [
              rehypeRaw,
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "append",
                  properties: {
                    className: ["anchor"],
                  },
                },
              ],
            ],
          },
        }}
        components={{
          pre: ({ children }: { children: React.ReactNode }) => (
            <CodeBlock>{children}</CodeBlock>
          ),
        }}
      />
    </div>
  );
}
