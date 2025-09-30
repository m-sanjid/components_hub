import { siteConfig } from "@/config/site";

export interface OGImageOptions {
  title?: string;
  description?: string;
  type?: "default" | "component" | "template";
  category?: string;
  theme?: "light" | "dark";
}

export function generateOGImageUrl(options: OGImageOptions = {}): string {
  const {
    title,
    description,
    type = "default",
    category,
    theme = "light",
  } = options;

  const baseUrl = siteConfig.url;
  const searchParams = new URLSearchParams();

  if (title) searchParams.set("title", title);
  if (description) searchParams.set("description", description);
  if (type) searchParams.set("type", type);
  if (category) searchParams.set("category", category);
  if (theme) searchParams.set("theme", theme);

  const queryString = searchParams.toString();
  return `${baseUrl}/api/og${type !== "default" ? `/${type}` : ""}${queryString ? `?${queryString}` : ""}`;
}

export function generateComponentOGImage(
  title: string,
  description?: string,
  category?: string,
  theme: "light" | "dark" = "light",
): string {
  return generateOGImageUrl({
    title,
    description,
    type: "component",
    category,
    theme,
  });
}

export function generateTemplateOGImage(
  title: string,
  description?: string,
  category?: string,
  theme: "light" | "dark" = "light",
): string {
  return generateOGImageUrl({
    title,
    description,
    type: "template",
    category,
    theme,
  });
}

export function generateDefaultOGImage(
  title?: string,
  description?: string,
  theme: "light" | "dark" = "light",
): string {
  return generateOGImageUrl({
    title,
    description,
    type: "default",
    theme,
  });
}
