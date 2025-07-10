import { cn } from "@/lib/utils";

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

export function PropsTable({ props }: { props: PropDefinition[] }) {
  return (
    <div className="border-muted bg-background relative my-6 w-full overflow-x-auto rounded-md border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50 supports-[backdrop-filter]:bg-muted/60 sticky top-0 z-10 backdrop-blur">
          <tr>
            <th className="text-muted-foreground w-[150px] px-4 py-2 text-left font-medium">
              Prop
            </th>
            <th className="text-muted-foreground w-[120px] px-4 py-2 text-left font-medium">
              Type
            </th>
            <th className="text-muted-foreground w-[80px] px-4 py-2 text-left font-medium">
              Required
            </th>
            <th className="text-muted-foreground w-[120px] px-4 py-2 text-left font-medium">
              Default
            </th>
            <th className="text-muted-foreground min-w-[200px] px-4 py-2 text-left font-medium">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={cn(
                "border-border border-t transition-colors",
                i % 2 === 1 && "bg-muted/10",
              )}
            >
              <td className="text-foreground px-4 py-2 font-mono text-[13px] whitespace-nowrap">
                {prop.name}
              </td>
              <td className="px-4 py-2 font-mono text-[13px] whitespace-nowrap text-purple-500 dark:text-purple-400">
                {prop.type}
              </td>
              <td className="px-4 py-2 text-sm">
                {prop.required ? (
                  <span className="text-green-600 dark:text-green-400">
                    Yes
                  </span>
                ) : (
                  <span className="text-muted-foreground">No</span>
                )}
              </td>
              <td className="px-4 py-2 font-mono text-[13px]">
                {prop.defaultValue ?? (
                  <span className="text-muted-foreground">–</span>
                )}
              </td>
              <td className="text-muted-foreground px-4 py-2 text-sm">
                {prop.description ?? "–"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
