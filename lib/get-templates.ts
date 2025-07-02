import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Template {
  title: string;
  description: string;
  category: string;
  content: string;
  price: number;
  featured: boolean;
  tags: string[];
  screenshots: string[];
  previewUrl: string;
  codeUrl: string;
  features: string[];
  requirements: string[];
  slug: string;
}

export async function getAllTemplates(): Promise<Template[]> {
  const templatesDirectory = path.join(process.cwd(), "data/templates");
  
  try {
    const filenames = fs.readdirSync(templatesDirectory);
    
    const templates = filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => {
        const slug = filename.replace(/\.mdx$/, "");
        const fullPath = path.join(templatesDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || slug,
          description: data.description || "",
          category: data.category || "Uncategorized",
          price: data.price || 0,
          featured: data.featured || false,
          tags: data.tags || [],
          content: data.content || "",
          screenshots: data.screenshots || [],
          previewUrl: data.previewUrl || "",
          codeUrl: data.codeUrl || "",
          features: data.features || [],
          requirements: data.requirements || [],
        };
      });

    return templates;
  } catch (error) {
    console.error("Error loading templates:", error);
    return [];
  }
}

export async function getTemplateBySlug(slug: string): Promise<Template | null> {
  const templates = await getAllTemplates();
  return templates.find((template) => template.slug === slug) || null;
}

export async function getTemplatesByCategory(category: string): Promise<Template[]> {
  const templates = await getAllTemplates();
  return templates.filter((template) => template.category === category);
}

export async function getFeaturedTemplates(): Promise<Template[]> {
  const templates = await getAllTemplates();
  return templates.filter((template) => template.featured);
} 