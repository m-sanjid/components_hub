import { NextResponse } from "next/server";
import { getRegistryItem } from "@/lib/component-registry";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name)
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  const item = await getRegistryItem(name);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ code: item.code });
}
