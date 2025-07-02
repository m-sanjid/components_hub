"use client";

import { template } from "@/lib/constants";
import { motion } from "framer-motion";
import { IconFileDownload, IconExternalLink } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import ContactCTA from "@/components/docs/ContactCTA";

export default function TemplateDetailsPage() {
  const router = useRouter();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = template.downloadUrl || "";
    link.download = `${template.title}.zip`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black ">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-16 text-start grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className="rounded-full border bg-primary/10 backdrop-blur-lg px-3 py-1 text-xs tracking-tight font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap justify-end items-end gap-4 md:col-span-1">
          <Link
            href={template.previewUrl}
            target="_blank"
            className="flex items-center gap-2 bg-primary/10 font-bold tracking-tighter text-sm px-5 py-2 backdrop-blur-md border border-dashed"
          >
            Live Preview <IconExternalLink size={16} />
          </Link>
          <Button
          className="rounded-none font-bold tracking-tighter text-sm px-5 py-2"
            onClick={handleDownload}
          >
            Download Code
          </Button>
        </div>
      </section>

      {/* Screenshots */}
      <section className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {template.screenshots.map((src, index) => (
          <motion.div
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
          </motion.div>
        ))}
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8">Features</h2>
        <div className="grid gap-6 md:grid-cols-2 text-muted-foreground">
          {template.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-primary/10 backdrop-blur-lg p-6 rounded-lg border border-primary/10"
            >
              {feature}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      {/* <section className="bg-primary/10 backdrop-blur-2xl my-10 py-16 px-6">
        <ContactCTA />
      </section> */}
    </div>
  );
}
