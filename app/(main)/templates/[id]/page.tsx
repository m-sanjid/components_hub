import { Metadata } from "next";
import { templates } from "@/lib/constants";
import { IconExternalLink } from "@tabler/icons-react";
import MotionDiv from "@/components/MotionDiv";
import { DowloadCode } from "@/components/DownloadCode";
import { OnThisPage } from "@/components/docs/OnThisPage";
import TechStack from "@/components/TechStack";
import { GalleryRoot, GalleryGrid } from "@/components/docs/Gallery";
import { absoluteUrl } from "@/lib/utils";
import { generateDefaultOGImage } from "@/lib/og-image";
import BuyNowButton from "@/components/docs/BuyNowButton";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export async function generateStaticParams() {
  return templates.map((t) => ({ id: t.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const template = templates.find((t) => t.id === parseInt(id));

  if (!template) {
    return {
      title: "Template not found",
      description: "The requested template does not exist.",
    };
  }
  const title = template.title;
  const description = template.description;
  const ogImageUrl = generateDefaultOGImage(
    `${title} - Starter Template`,
    description,
    "light",
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl(`/templates/${template.id}`),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
      creator: "@dev_sanjid",
    },
  };
}

export default async function TemplateDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = templates.find((t) => t.id === parseInt(id));
  const IsFree = template?.price === 0;

  // Navigation Logic
  const currentIndex = templates.findIndex((t) => t.id === parseInt(id));
  const prevTemplate = currentIndex > 0 ? templates[currentIndex - 1] : null;
  const nextTemplate =
    currentIndex < templates.length - 1 ? templates[currentIndex + 1] : null;

  // Other Templates (excluding current)
  const otherTemplates = templates
    .filter((t) => t.id !== parseInt(id))
    .slice(0, 3);

  if (!template) {
    return (
      <main className="grid min-h-screen place-items-center py-24 text-center md:px-6">
        <h1 className="mb-2 text-2xl font-semibold">Template not found</h1>
        <p className="text-muted-foreground mb-6">
          The template you are looking for does not exist.
        </p>
        <Link href="/templates" className="underline underline-offset-4">
          Back to templates
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      {/* Breadcrumb */}
      <nav
        className="mx-auto max-w-6xl pt-20 text-sm md:px-6"
        aria-label="Breadcrumb"
      >
        <ol className="text-muted-foreground flex items-center gap-2">
          <li>
            <Link href="/templates" className="hover:underline">
              Templates
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground font-medium">{template.title}</li>
        </ol>
      </nav>

      {/* Header Section */}
      <section className="mx-auto grid max-w-6xl gap-8 py-8 md:grid-cols-[2fr_1fr] md:px-6">
        {/* Title and meta */}
        <div id="template-content">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {template.title}
          </h1>
          <p className="text-muted-foreground mt-4 text-base md:text-lg">
            {template.description}
          </p>

          {/* Tags */}
          <MotionDiv className="mt-6 flex flex-wrap gap-2">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/5 text-primary rounded-[6px] border px-2 py-0.5 text-[10px] font-medium"
              >
                {tag}
              </span>
            ))}
          </MotionDiv>

          {/* Metadata */}
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
            <div>
              <dt className="text-muted-foreground">Category</dt>
              <dd className="font-medium">{template.category}</dd>
            </div>
            {typeof template.price === "number" && (
              <div>
                <dt className="text-muted-foreground">Price</dt>
                <dd className="font-medium">
                  {IsFree ? "Free" : `${template.price.toFixed(2)}`}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Actions Card */}
        <aside className="sticky top-24 h-fit space-y-4 rounded-xl border bg-neutral-50 p-5 shadow-xl dark:bg-neutral-900">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Get the template</span>
            {typeof template.price === "number" && (
              <span className="bg-primary/10 rounded-md border px-2 py-0.5 font-medium backdrop-blur-lg">
                {IsFree ? "Free" : `${template.price.toFixed(2)}`}
              </span>
            )}
          </div>
          {template.previewUrl && (
            <Link
              href={template.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary/5 hover:bg-primary/10 flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold backdrop-blur-lg transition-colors"
            >
              Live Preview <IconExternalLink size={16} />
            </Link>
          )}
          {IsFree ? (
            <DowloadCode template={template} />
          ) : (
            <BuyNowButton template={template} />
          )}
          <p className="text-muted-foreground text-xs">
            Includes source files and assets. Licensed for personal and
            commercial use.
          </p>
          <div className="pt-2">
            <OnThisPage rootId="template-content" />
          </div>
        </aside>
      </section>

      {/* Screenshots */}
      {template.screenshots && template.screenshots.length > 0 && (
        <section className="mx-auto max-w-6xl py-12 md:px-6">
          <h2 className="mb-6 text-xl font-semibold">Screenshots</h2>
          <GalleryRoot images={template.screenshots} title={template.title}>
            <GalleryGrid />
          </GalleryRoot>
        </section>
      )}

      {/* Features */}
      <section className="mx-auto max-w-6xl py-12 md:px-6">
        <h2 className="mb-6 text-xl font-semibold">Features</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {template?.features?.map((feature, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.04 }}
              className="rounded-lg border bg-neutral-50 p-5 dark:bg-neutral-900"
            >
              <h3 className="font-semibold">{feature.title}</h3>
              <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm">
                {feature.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            </MotionDiv>
          ))}
        </div>
      </section>

      {template?.techStack?.length && (
        <TechStack techStack={template.techStack} />
      )}

      {/* Navigation */}
      <section className="mx-auto max-w-6xl py-12 md:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          {prevTemplate ? (
            <Link
              href={`/templates/${prevTemplate.id}`}
              className="group flex flex-1 items-center justify-start gap-3 rounded-xl border bg-neutral-50 p-4 transition-colors hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              <div className="bg-background flex size-10 items-center justify-center rounded-full border shadow-sm transition-transform group-hover:-translate-x-1">
                <IconArrowLeft size={16} />
              </div>
              <div className="text-left">
                <div className="text-muted-foreground text-xs">Previous</div>
                <div className="font-medium">{prevTemplate.title}</div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextTemplate ? (
            <Link
              href={`/templates/${nextTemplate.id}`}
              className="group flex flex-1 items-center justify-end gap-3 rounded-xl border bg-neutral-50 p-4 transition-colors hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              <div className="text-right">
                <div className="text-muted-foreground text-xs">Next</div>
                <div className="font-medium">{nextTemplate.title}</div>
              </div>
              <div className="bg-background flex size-10 items-center justify-center rounded-full border shadow-sm transition-transform group-hover:translate-x-1">
                <IconArrowRight size={16} />
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>

      {/* Other Templates */}
      <section className="mx-auto max-w-6xl py-12 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">More Templates</h2>
          <Link
            href="/templates"
            className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium"
          >
            View all <IconArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherTemplates.map((t) => (
            <Link
              key={t.id}
              href={`/templates/${t.id}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border bg-neutral-50 transition-shadow hover:shadow-lg dark:bg-neutral-900"
            >
              <div className="relative aspect-video w-full overflow-hidden border-b">
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="bg-primary/10 text-primary rounded px-2 py-0.5 text-[10px] font-medium">
                    {t.category}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {t.price === 0 ? "Free" : `$${t.price}`}
                  </span>
                </div>
                <h3 className="mb-1 line-clamp-1 font-semibold">{t.title}</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {t.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
