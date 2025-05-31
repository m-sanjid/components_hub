import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Component } from "@/types";

const snippetsDir = path.join(process.cwd(), "snippets");

export async function getComponentBySlug(slug: string) {
  const filePath = path.join(snippetsDir, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");

  const { content, data } = matter(source);

  return {
    frontmatter: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(data as any),
      slug,
    },
    code: content,
  };
}

const COMPONENTS_PATH = path.join(process.cwd(), "components", "snippets"); // adjust path if needed

export async function getAllComponents(): Promise<Component[]> {
  const files = await fs.readdir(COMPONENTS_PATH);

  return (await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(COMPONENTS_PATH, file);
        const rawContent = await fs.readFile(filePath, "utf-8");
        const { data: frontmatter } = matter(rawContent);

        return {
          meta: {
            slug,
            title: frontmatter.title || slug,
          },
          code: rawContent,
        };
      }),
  )) as Component[];
}
