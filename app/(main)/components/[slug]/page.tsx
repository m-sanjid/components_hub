import {
  getComponentBySlug,
  processMdx,
  getComponentList,
} from "@/lib/mdx-server";
import { componentsRegistry } from "@/lib/component-registry";
import PostNavigation from "@/components/PostNavigation";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import React from "react";
import { redirect } from "next/navigation";

const getCachedRegistryItem = React.cache(async (slug: string) => {
  return await getComponentBySlug(slug);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getCachedRegistryItem(slug);

  if (!item) {
    return {
      title: "Component not found",
      description: "The component you are looking for does not exist.",
    };
  }

  const title = item.meta.title;
  const description = item.meta.description;

  return {
    title: item.meta.title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl(`/components/${item.meta.slug}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
      creator: "@components_hub",
    },
  };
}

export async function generateStaticParams() {
  const components = await getComponentList();
  return components.map((component) => ({
    slug: component.slug,
  }));
}

export default async function ComponentDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getComponentBySlug(slug);
  if (!result) {
    redirect("/components");
  }
  const { content, meta } = result;
  const MDXContent = await processMdx(content, componentsRegistry);
  const allComponents = await getComponentList();
  const currentIndex = allComponents.findIndex((comp) => comp.slug === slug);
  const prevComponent =
    currentIndex > 0 ? allComponents[currentIndex - 1] : null;
  const nextComponent =
    currentIndex < allComponents.length - 1
      ? allComponents[currentIndex + 1]
      : null;

  return (
    <div className="bg-background min-h-screen w-full">
      <article className="mx-auto w-full max-w-4xl px-2 py-6 sm:px-6 sm:py-10 md:px-8 md:py-16">
        <div className="mb-8 text-start sm:mb-12">
          <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
            {meta.title}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base md:text-lg">
            {meta.description}
          </p>
        </div>
        {/* Content Section */}
        <div className="w-full max-w-4xl md:mx-auto">
          <div className="prose prose-sm sm:prose md:prose-md dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-pre:bg-muted prose-pre:text-muted-foreground prose-pre:rounded-lg prose-pre:p-2 sm:prose-pre:p-4 prose-img:rounded-lg prose-img:shadow-md overflow-x-auto">
            {MDXContent}
          </div>
        </div>

        <div className="mt-8 sm:mt-12">
          <PostNavigation
            basePath="components"
            prevPost={
              prevComponent
                ? {
                    slug: prevComponent.slug,
                    title: prevComponent.title,
                  }
                : null
            }
            nextPost={
              nextComponent
                ? {
                    slug: nextComponent.slug,
                    title: nextComponent.title,
                  }
                : null
            }
          />
        </div>
      </article>
    </div>
  );
}
