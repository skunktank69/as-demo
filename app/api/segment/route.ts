export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const src = url.searchParams.get("url");
  if (!src) return new Response("Missing url param", { status: 400 });

  const upstream = await fetch(src, { headers: customHeaders() });
  if (!upstream.ok) return new Response("Upstream error", { status: 502 });

  const contentType = src.endsWith(".m3u8")
    ? "application/vnd.apple.mpegurl"
    : "video/mp2t";

  return new Response(upstream.body, {
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Expose-Headers": "*",
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
