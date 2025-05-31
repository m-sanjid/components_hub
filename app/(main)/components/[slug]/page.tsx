import { getComponentBySlug, processMdx } from "@/lib/mdx-server";
import { componentsRegistry } from "@/lib/component-registry";

export default async function ComponentDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content, meta } = await getComponentBySlug(slug);
  const MDXContent = await processMdx(content, componentsRegistry);

  return (
    <div className="bg-background min-h-screen">
      <article className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
            {meta.title}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            {meta.description}
          </p>
        </div>

        {/* Content Section */}
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-lg dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-pre:bg-muted prose-pre:text-muted-foreground prose-pre:rounded-lg prose-pre:p-4 prose-img:rounded-lg prose-img:shadow-md">
            {MDXContent}
          </div>
        </div>
      </article>
    </div>
  );
}
