import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "data/components/examples",
      `${name}.tsx`,
    );
    const code = fs.readFileSync(filePath, "utf8");

    return NextResponse.json({ code });
  } catch (err) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }
}
