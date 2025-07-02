import { CodePreview } from "@/components/docs/CodePreview";
import { ThemeSwitcher } from "@/components/docs/ThemeSwitcher";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { mdxComponents } from "@/components/docs/MdxComponent";
import { CodeBlockCommand } from "@/components/docs/CodeBlockCommand";
import path from "path";
import { CodeTabs } from "@/components/docs/CodeTabs";
import { promises as fs } from "fs";

// Define the registry of components that can be used in MDX
export const componentsRegistry = {
  ...mdxComponents,
  // UI Components
  ThemeSwitcher,
  CodePreview,
  ComponentPreview,
  CodeBlockCommand,
  CodeTabs,
};

// Get the code and metadata for a component by name from the /content/components directory.
// Looks for .tsx or .mdx files in /content/components (top-level only).
export async function getRegistryItem(name: string) {
  const tsxPath = path.join(
    process.cwd(),
    "data",
    "components",
    "code",
    `${name}.tsx`,
  );
  const mdxPath = path.join(
    process.cwd(),
    "content",
    "components",
    `${name}.mdx`,
  );
  try {
    // Try .tsx first
    try {
      const code = await fs.readFile(tsxPath, "utf8");
      return {
        name,
        code,
        filePath: tsxPath,
      };
    } catch {}
    // Then try .mdx
    const code = await fs.readFile(mdxPath, "utf8");
    return {
      name,
      code,
      filePath: mdxPath,
    };
  } catch (err) {
    return undefined;
  }
}
