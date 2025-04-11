interface PropDefinition {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    description?: string;
  }
  
  export function PropTable({ props }: { props: PropDefinition[] }) {
    return (
      <div className="overflow-auto my-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">Prop</th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">Type</th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">Required</th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">Default</th>
              <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr key={prop.name} className="border-b border-gray-200 dark:border-gray-700">
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-mono">
                  {prop.name}
                </td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-mono">
                  {prop.type}
                </td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm">
                  {prop.required ? 'Yes' : 'No'}
                </td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-mono">
                  {prop.defaultValue || '-'}
                </td>
                <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm">
                  {prop.description || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }