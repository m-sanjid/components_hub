import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

// Get all component documentation files
export async function getComponentList() {
  const componentsDirectory = path.join(process.cwd(), 'content/components');
  const filenames = fs.readdirSync(componentsDirectory);

  return filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const fullPath = path.join(componentsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      category: data.category || 'Uncategorized',
    };
  });
}

// Get a specific component's documentation
export async function getComponentBySlug(slug: string) {
  const fullPath = path.join(process.cwd(), 'content/components', `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      title: data.title || slug,
      description: data.description || '',
      category: data.category || 'Uncategorized',
    },
    content,
  };
}

// Process full MDX content (including markdown/docs)
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
