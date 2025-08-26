import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

// Get all component documentation files
export async function getComponentList() {
  const componentsDirectory = path.join(process.cwd(), "content/components");
  const filenames = fs.readdirSync(componentsDirectory);

  return filenames
    .filter(
      (filename) => filename.endsWith(".mdx") || filename.endsWith(".tsx"),
    )
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|tsx)$/, "");
      const fullPath = path.join(componentsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        category: data.category || "Uncategorized",
      };
    });
}

// Get a specific component's documentation
export async function getComponentBySlug(slug: string) {
  const fullPath = path.join(
    process.cwd(),
    "content/components",
    `${slug}.mdx`,
  );
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      meta: {
        slug,
        title: data.title || slug,
        description: data.description || "",
        category: data.category || "Uncategorized",
      },
      content,
    };
  } catch (err) {
    console.error("Failed to load component:", err);
    return undefined;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function processMdx(source: string, components: any) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: true,
    },
  });

  return content;
}

// Compile an MDX file from the templates directory with provided components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getTemplateMdx(
  filename: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: any,
) {
  const templatesDirectory = path.join(process.cwd(), "data/templates");
  const fullPath = path.join(templatesDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { content } = await compileMDX({
    source: fileContents,
    components,
    options: {
      parseFrontmatter: true,
    },
  });

  return content;
}
