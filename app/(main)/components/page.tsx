import { getComponentList } from "@/lib/mdx-server";
import { getComponentDemoOnly } from "@/lib/mdx-demo";
import { IconCircleDashed } from "@tabler/icons-react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";

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
      <div className="mx-auto max-w-6xl px-4 py-8 lg:py-16">
        {/* Header Section */}
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="mb-2 text-4xl font-bold">UI Components</h1>
          <p className="text-muted-foreground max-w-2xl">
            A curated collection of beautifully crafted, reusable components for
            your next project
          </p>
          {/* Filters */}
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((cat) => {
              const sp = new URLSearchParams();
              if (query) sp.set("q", query);
              if (cat !== "All") sp.set("category", cat);
              return (
                <Link
                  key={cat}
                  href={`/components?${sp.toString()}`}
                  className={cn(
                    "rounded-[6px] border px-2 py-px text-sm transition-colors",
                    selectedCategory === cat
                      ? "bg-[#FF6100] font-semibold text-white"
                      : "hover:bg-primary/10 bg-primary/5 text-primary",
                  )}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Search */}
          <form method="get" className="relative mt-6 w-full sm:w-80">
            <Search className="text-muted-foreground bg-primary/10 absolute top-2 left-2 size-5 rounded-[6px] border p-1" />
            <Input
              type="search"
              name="q"
              defaultValue={params?.q || ""}
              placeholder="Search components..."
              className="pl-8"
            />
          </form>

          <p className="text-muted-foreground mt-3 text-sm">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </p>
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
                      <div className="min-h-[150px] w-full transform pt-8 pb-24 transition-transform duration-300 sm:min-h-[180px] sm:pt-10">
                        {Demo}
                      </div>
                    </div>
                  </div>
                  {/* Component Info */}
                  <div className="from-primary-foreground/30 via-card/95 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-4 pt-10 sm:p-6 sm:pt-12">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                        {component.title}
                      </h3>
                      {component.category && (
                        <div className="flex items-center space-x-2">
                          <IconCircleDashed className="bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-md" />
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
          <div className="bg-primary/5 text-muted-foreground inline-flex items-center space-x-2 rounded-lg border px-4 py-2 text-sm font-semibold tracking-tight">
            <IconCircleDashed className="h-4 w-4" />
            <span>
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
