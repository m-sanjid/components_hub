import type { Metadata } from "next";
import { templates } from "@/lib/constants";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const template = templates.find((t) => t.id === Number(id));
  if (!template) {
    return { title: "Template not found" };
  }
  const title = `${template.title}`;
  const description = template.description;
  const image = template.screenshots?.[0] ?? template.image;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default function TemplateIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
