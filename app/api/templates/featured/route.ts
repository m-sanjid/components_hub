import { NextResponse } from "next/server";
import { getFeaturedTemplates } from "@/lib/get-templates";

export async function GET() {
  try {
    const featuredTemplates = await getFeaturedTemplates();
    return NextResponse.json(featuredTemplates);
  } catch (error) {
    console.error("Error fetching featured templates:", error);
    return NextResponse.json({ error: "Failed to fetch featured templates" }, { status: 500 });
  }
} 