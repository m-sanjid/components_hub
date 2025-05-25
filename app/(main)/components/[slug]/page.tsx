import { getComponentBySlug, processMdx } from '@/lib/mdx-server';
import { componentsRegistry } from '@/lib/component-registry';

export default async function ComponentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { content, meta } = await getComponentBySlug(slug);
  const MDXContent = await processMdx(content, componentsRegistry);

  return (
    <article className="prose dark:prose-invert max-w-none py-8 lg:py-16">
      <h1>{meta.title}</h1>
      <p className="text-gray-500">{meta.description}</p>
      <div>{MDXContent}</div>
    </article>
  );
}
