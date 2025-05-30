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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
            <IconComponents className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
            Components
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            A curated collection of beautifully crafted, reusable components for your next project
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
                  className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 ${layout.cols} ${layout.rows}`}
                >
                  {/* Component Preview */}
                  <div className={`relative bg-gradient-to-br from-muted/30 to-muted/10 p-6 ${
                    isLarge ? "min-h-[400px]" : 
                    isWide ? "min-h-[220px]" : "min-h-[200px]"
                  }`}>
                    <div className="flex h-full items-center justify-center">
                      <div className={`w-full ${
                        isLarge ? "max-w-md" : 
                        isWide ? "max-w-lg" : "max-w-sm"
                      } transform transition-transform duration-300 group-hover:scale-105`}>
                        {Demo}
                      </div>
                    </div>

                  </div>

                  {/* Component Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card via-card/95 to-transparent p-6 pt-12">
                    <div className="space-y-2">
                      <h3 className={`font-semibold tracking-tight ${
                        isLarge ? "text-2xl" : "text-lg"
                      }`}>
                        {component.title}
                      </h3>
                      {component.category && (
                        <div className="flex items-center space-x-2">
                          <IconLayoutGrid className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                            {component.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" 
                       style={{ 
                         background: 'linear-gradient(135deg, transparent 0%, rgba(var(--primary), 0.1) 50%, transparent 100%)',
                         mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                         maskComposite: 'xor',
                         WebkitMaskComposite: 'xor'
                       }} />
                </div>
              );
            }),
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-muted px-6 py-3 text-sm text-muted-foreground">
            <IconComponents className="h-4 w-4" />
            <span>More components coming soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}