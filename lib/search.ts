import { getComponentList } from "./mdx-server";

type SearchableComponent = {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords?: string[];
};

let componentCache: SearchableComponent[] | null = null;

export async function searchComponents(
  query: string,
): Promise<SearchableComponent[]> {
  if (!componentCache) {
    componentCache = await getComponentList();
  }

  if (!query.trim()) {
    return componentCache;
  }

  const searchTerms = query.toLowerCase().split(" ");

  return componentCache.filter((component) => {
    const searchableText = [
      component.title,
      component.description,
      component.category,
      ...(component.keywords || []),
    ]
      .join(" ")
      .toLowerCase();

    return searchTerms.every((term) => searchableText.includes(term));
  });
}
