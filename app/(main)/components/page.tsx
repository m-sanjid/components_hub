import { getComponentList } from "@/lib/mdx-server";
import { componentsRegistry } from "@/lib/component-registry";
import { getComponentDemoOnly } from "@/lib/mdx-demo";
import { IconComponents, IconLayoutGrid } from "@tabler/icons-react";

export default async function ComponentsPage() {
  const components = await getComponentList();

  const getCardLayout = (index: number) => {
    const patterns = [
      { cols: "lg:col-span-2", rows: "lg:row-span-2", size: "large" },
      { cols: "lg:col-span-1", rows: "lg:row-span-1", size: "normal" },
      { cols: "lg:col-span-1", rows: "lg:row-span-1", size: "normal" },
      { cols: "lg:col-span-2", rows: "lg:row-span-1", size: "wide" },
      { cols: "lg:col-span-1", rows: "lg:row-span-1", size: "normal" },
      { cols: "lg:col-span-1", rows: "lg:row-span-1", size: "normal" },
      { cols: "lg:col-span-1", rows: "lg:row-span-1", size: "normal" },
    ];

    return patterns[index % patterns.length];
  };

  return (
    <div className="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="from-primary/20 to-primary/5 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-sm">
            <IconComponents className="text-primary h-8 w-8" />
          </div>
          <h1 className="from-foreground to-foreground/70 mb-4 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent">
            Components
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            A curated collection of beautifully crafted, reusable components for
            your next project
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          {await Promise.all(
            components.map(async (component, index) => {
              const Demo = await getComponentDemoOnly(
                component.slug,
                componentsRegistry,
              );

              const layout = getCardLayout(index);
              const isLarge = layout.size === "large";
              const isWide = layout.size === "wide";

              return (
                <div
                  key={component.slug}
                  className={`group border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${layout.cols} ${layout.rows}`}
                >
                  {/* Component Preview */}
                  <div
                    className={`from-muted/30 to-muted/10 relative bg-gradient-to-br p-6 ${
                      isLarge
                        ? "min-h-[400px]"
                        : isWide
                          ? "min-h-[220px]"
                          : "min-h-[200px]"
                    }`}
                  >
                    <div className="flex h-full items-center justify-center">
                      <div
                        className={`w-full ${
                          isLarge
                            ? "max-w-md"
                            : isWide
                              ? "max-w-lg"
                              : "max-w-sm"
                        } transform transition-transform duration-300 group-hover:scale-105`}
                      >
                        {Demo}
                      </div>
                    </div>
                  </div>

                  {/* Component Info */}
                  <div className="from-card via-card/95 absolute right-0 bottom-0 left-0 bg-gradient-to-t to-transparent p-6 pt-12">
                    <div className="space-y-2">
                      <h3
                        className={`font-semibold tracking-tight ${
                          isLarge ? "text-2xl" : "text-lg"
                        }`}
                      >
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
                    className="from-primary/20 to-primary/20 pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, transparent 0%, rgba(var(--primary), 0.1) 50%, transparent 100%)",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "xor",
                      WebkitMaskComposite: "xor",
                    }}
                  />
                </div>
              );
            }),
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-muted text-muted-foreground inline-flex items-center space-x-2 rounded-full px-6 py-3 text-sm">
            <IconComponents className="h-4 w-4" />
            <span>More components coming soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
