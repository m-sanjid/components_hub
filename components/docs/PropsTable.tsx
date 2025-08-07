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
    <div className="border-muted bg-background relative my-6 w-full overflow-x-auto rounded-lg border shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-primary/30 sticky top-0 z-10 rounded-t-lg backdrop-blur">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">
              Prop
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">
              Required
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">
              Default
            </th>
            <th className="min-w-[200px] px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={cn(
                "border-border hover:bg-muted/20 border-t transition-colors",
                i === props.length - 1 && "rounded-b-lg",
                i % 2 === 1 && "bg-muted",
              )}
            >
              <td className="text-foreground px-4 py-2 font-mono text-[13px] font-medium whitespace-nowrap">
                {prop.name}
              </td>
              <td className="px-4 py-2 font-mono text-[13px] whitespace-nowrap text-purple-600 dark:text-purple-400">
                {prop.type}
              </td>
              <td className="px-4 py-2 text-sm">
                {prop.required ? (
                  <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                    Yes
                  </span>
                ) : (
                  <span className="text-muted-foreground text-xs">No</span>
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
