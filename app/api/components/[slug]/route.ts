import { getComponentBySlug } from "@/lib/get-components";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const component = await getComponentBySlug(slug);
  console.log("Component:", component);
  if (!component) {
    return NextResponse.json({ error: "Component not Found" }, { status: 404 });
  }
  return NextResponse.json(component);
}
