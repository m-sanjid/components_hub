import { getComponentList } from "@/lib/mdx-server";
import { getComponentDemoOnly } from "@/lib/mdx-demo";
import { IconComponents, IconLayoutGrid } from "@tabler/icons-react";
import Link from "next/link";

export default async function ComponentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const components = await getComponentList();
  const params = await searchParams;
  const query = (params?.q || "").toLowerCase();
  const selectedCategory = params?.category || "All";

  const categories = [
    "All",
    ...Array.from(new Set(components.map((c) => c.category))).sort(),
  ];

  const filtered = components.filter((c) => {
    const matchesQuery =
      !query ||
      c.title.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategory === "All" || c.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="from-foreground to-foreground/70 mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Components
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
            A curated collection of beautifully crafted, reusable components for
            your next project
          </p>
          {/* Controls */}
          <form
            className="mx-auto mt-8 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
            method="get"
          >
            <input
              type="text"
              name="q"
              defaultValue={params?.q || ""}
              placeholder="Search components..."
              className="border-border focus:ring-primary/20 focus:border-primary bg-card w-full rounded-lg border px-4 py-3 text-sm transition-all outline-none focus:ring-2"
            />
            <select
              name="category"
              defaultValue={selectedCategory}
              className="bg-card border-border w-full rounded-lg border px-3 py-3 text-sm sm:w-[220px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button className="bg-primary text-primary-foreground w-full rounded-lg px-5 py-3 text-sm font-medium hover:opacity-90 sm:w-auto">
              Apply
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {await Promise.all(
            filtered.map(async (component) => {
              const Demo = await getComponentDemoOnly(component.slug);
              return (
                <Link
                  href={`/components/${component.slug}`}
                  key={component.slug}
                  className="group border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Component Preview */}
                  <div className="from-muted/30 to-muted/10 relative min-h-[180px] bg-gradient-to-br p-4 sm:min-h-[200px] sm:p-6">
                    <div className="flex h-full items-center justify-center overflow-x-auto overflow-y-hidden">
                      <div className="min-h-[150px] w-full transform pt-8 transition-transform duration-300 sm:min-h-[180px] sm:pt-10">
                        {Demo}
                      </div>
                    </div>
                  </div>
                  {/* Component Info */}
                  <div className="from-card via-card/95 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-4 pt-10 sm:p-6 sm:pt-12">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                        {component.title}
                      </h3>
                      {component.category && (
                        <div className="flex items-center space-x-2">
                          <IconLayoutGrid className="text-muted-foreground h-3 w-3" />
                          <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                            {component.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Gradient Border Effect */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, transparent 0%, rgba(var(--primary), 0.1) 50%, transparent 100%)",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "xor",
                      WebkitMaskComposite: "xor",
                    }}
                  />
                </Link>
              );
            }),
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-muted text-muted-foreground inline-flex items-center space-x-2 rounded-full px-6 py-3 text-sm">
            <IconComponents className="h-4 w-4" />
            <span>
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
