import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

export function extractComponentPreview(mdx: string) {
  const match = mdx.match(
    /<ComponentPreview[^>]*>([\s\S]*?)<\/ComponentPreview>/,
  );
  return match ? `<div>${match[0]}</div>` : "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getComponentDemoOnly(slug: string, components: any) {
  const filePath = path.join(
    process.cwd(),
    "content/components",
    `${slug}.mdx`,
  );
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContent);

  const previewSource = extractComponentPreview(content);

  const { content: compiledPreview } = await compileMDX({
    source: previewSource,
    components,
    options: {
      parseFrontmatter: true,
    },
  });

  return compiledPreview;
}
