import { templates } from "@/lib/constants";
import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "next-view-transitions";
import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";
import { DowloadCode } from "@/components/DowloadCode";
import { OnThisPage } from "@/components/docs/OnThisPage";

interface TemplateDetailsPageProps {
  params: { id: string };
}

export default function TemplateDetailsPage({
  params,
}: TemplateDetailsPageProps) {
  const template = templates.find((t) => t.id === parseInt(params.id));

  if (!template) {
    return (
      <main className="grid min-h-screen place-items-center px-6 py-24 text-center">
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
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <nav
        className="mx-auto max-w-6xl px-6 pt-20 text-sm"
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
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-[2fr_1fr]">
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
                className="border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 rounded-full border px-3 py-1 text-xs transition-colors"
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
                <dd className="font-medium">${template.price.toFixed(2)}</dd>
              </div>
            )}
            <div>
              <dt className="text-muted-foreground">Screenshots</dt>
              <dd className="font-medium">
                {template.screenshots?.length || 0}
              </dd>
            </div>
          </dl>
        </div>

        {/* Actions Card */}
        <aside className="bg-card sticky top-24 h-fit space-y-4 rounded-xl border p-5 shadow-sm">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Get the template</span>
            {typeof template.price === "number" && (
              <span className="bg-primary/10 rounded-md border px-2 py-0.5 font-medium backdrop-blur-lg">
                ${template.price.toFixed(2)}
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
          <DowloadCode template={template} />
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
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-6 text-xl font-semibold">Screenshots</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {template.screenshots.map((src, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card overflow-hidden rounded-xl border"
              >
                <div className="relative aspect-video">
                  <Image
                    src={src}
                    alt={`${template.title} screenshot ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </MotionDiv>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-6 text-xl font-semibold">Features</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {template?.features?.map((feature, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-lg border p-5"
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
    </main>
  );
}
