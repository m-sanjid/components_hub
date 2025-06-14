interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

export function PropTable({ props }: { props: PropDefinition[] }) {
  return (
    <div className="my-6 overflow-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium dark:border-gray-700">
              Prop
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium dark:border-gray-700">
              Type
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium dark:border-gray-700">
              Required
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium dark:border-gray-700">
              Default
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium dark:border-gray-700">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="border border-gray-200 px-4 py-2 font-mono text-sm dark:border-gray-700">
                {prop.name}
              </td>
              <td className="border border-gray-200 px-4 py-2 font-mono text-sm dark:border-gray-700">
                {prop.type}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm dark:border-gray-700">
                {prop.required ? "Yes" : "No"}
              </td>
              <td className="border border-gray-200 px-4 py-2 font-mono text-sm dark:border-gray-700">
                {prop.defaultValue || "-"}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm dark:border-gray-700">
                {prop.description || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
