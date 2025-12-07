import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("url");
  if (!target)
    return NextResponse.json({ error: "Missing url" }, { status: 400 });

  const res = await fetch(target);
  const body = await res.arrayBuffer();

  return new NextResponse(body, {
    status: res.status,
    headers: {
      "Content-Type":
        res.headers.get("Content-Type") || "application/octet-stream",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
