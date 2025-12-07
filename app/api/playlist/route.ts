export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const src = url.searchParams.get("url");

  if (!src) {
    return new Response("Missing url param", { status: 400 });
  }

  const upstream = await fetch(src, { headers: customHeaders() });
  if (!upstream.ok) {
    return new Response("Upstream error", { status: 502 });
  }

  let text = await upstream.text();
  const base = new URL(src);

  // Rewrite .ts segments → /api/segment?url=<encoded>
  text = text.replace(/^(.*\.ts.*)$/gm, (seg) => {
    const real = new URL(seg, base).toString();
    return `/api/segment?url=${encodeURIComponent(real)}`;
  });

  return new Response(text, {
    headers: {
      "Content-Type": "application/vnd.apple.mpegurl",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function customHeaders() {
  return {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Gecko/20100101 Firefox/138.0",
    Origin: "https://animepahe.si",
    Referer: "https://animepahe.si",
  };
}
