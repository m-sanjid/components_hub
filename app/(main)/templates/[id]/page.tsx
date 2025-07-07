"use client";

import { templates } from "@/lib/constants";
import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import ContactCTA from "@/components/docs/ContactCTA";
import MotionDiv from "@/components/MotionDiv";

interface TemplateDetailsPageProps {
  params: {
    id: string;
  };
}

export default function TemplateDetailsPage({
  params,
}: TemplateDetailsPageProps) {
  const template = templates.find(
    (template) => template.id === parseInt(params.id),
  );

  if (!template) {
    return <div>Template not found</div>;
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = template.downloadUrl || "";
    link.download = `${template.title}.zip`;
    link.click();
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pt-24 pb-16 text-start md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold md:text-5xl">{template.title}</h1>
          <p className="mt-4 text-lg text-neutral-400">
            {template.description}
          </p>

          {/* Badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/10 rounded-full border px-3 py-1 text-xs font-semibold tracking-tight backdrop-blur-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-4 md:col-span-1 md:items-end md:justify-end">
          <Link
            href={template.previewUrl ?? ""}
            target="_blank"
            className="bg-primary/10 flex items-center gap-2 border border-dashed px-5 py-2 text-sm font-bold tracking-tighter backdrop-blur-md"
          >
            Live Preview <IconExternalLink size={16} />
          </Link>
          <Button
            className="rounded-none px-5 py-2 text-sm font-bold tracking-tighter"
            onClick={handleDownload}
          >
            Download Code
          </Button>
        </div>
      </section>

      {/* Screenshots */}
      {template.screenshots && (
        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {template.screenshots?.map((src, index) => (
            <MotionDiv
              key={index}
              className="overflow-hidden rounded-xl bg-neutral-900"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <img
                src={src}
                alt={`Screenshot ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </MotionDiv>
          ))}
        </section>
      )}

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-semibold">Features</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {template?.features?.map((feature, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-primary/10 border-primary/10 border p-6 backdrop-blur-lg"
            >
              <h2 className="font-semibold md:text-lg">{feature.title}</h2>
              <div className="text-muted-foreground flex flex-col items-start gap-1 text-sm md:text-base">
                {feature.description.map((desc, index) => (
                  <span key={index}>{desc}</span>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
