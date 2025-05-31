import { NextResponse } from "next/server";
import { getComponentList } from "@/lib/mdx-server";

export async function GET() {
  try {
    const components = await getComponentList();
    return NextResponse.json(components);
  } catch (error) {
    console.error("getAllComponents failed:", error);
    return NextResponse.json(
      { error: "Failed to load components" },
      { status: 500 },
    );
  }
}
