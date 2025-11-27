// app/api/proxy/[...url]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ url: string[] }> },
) {
  const encodedUrl = (await params).url.join("/");
  const url = decodeURIComponent(encodedUrl);

  const res = await fetch(url, {
    headers: {
      Referer: "https://megacloud.blog/embed-2/v3",
    },
  });

  const contentType = res.headers.get("content-type") || "";

  if (url.endsWith(".m3u8")) {
    let text = await res.text();
    // rewrite .ts URLs to point to this proxy
    text = text
      .split("\n")
      .map((line) => {
        if (!line || line.startsWith("#")) return line;
        return `/api/proxy/${encodeURIComponent(new URL(line, url).toString())}`;
      })
      .join("\n");
    return new NextResponse(text, {
      headers: { "Content-Type": "application/vnd.apple.mpegurl" },
    });
  } else {
    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: { "Content-Type": contentType },
    });
  }
}
