// HLS Proxy — base template with editable header section
// Run: npm install express node-fetch@2
// Start: node server.js

const express = require("express");
const fetch = require("node-fetch");
const { URL } = require("url");

const app = express();
const PORT = process.env.PORT || 30_000;

// Global CORS for browser access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// **EDIT THIS HEADER BLOCK HOWEVER YOU WANT**
function customHeaders() {
  return {
    // Placeholders only — you can replace them on your own server.
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0",
    Origin: "https://animepahe.si",
    Referer: "https://animepahe.si",
    // "X-Custom-Header": "your-value-here",
  };
}

// ------------------------------------------------------------
// PLAYLIST ROUTE
// ------------------------------------------------------------
app.get("/playlist", async (req, res) => {
  const src = req.query.url;
  if (!src) return res.status(400).send("Missing url param");

  try {
    const upstream = await fetch(src, { headers: customHeaders() });
    if (!upstream.ok) return res.status(502).send("Upstream error");

    let text = await upstream.text();
    const base = new URL(src);

    // Rewrite segments
    text = text.replace(/^(.*\.ts.*)$/gm, (segment) => {
      const segURL = new URL(segment, base).toString();
      return `/segment?url=${encodeURIComponent(segURL)}`;
    });

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(text);
  } catch (err) {
    res.status(500).send("Proxy error");
  }
});

// ------------------------------------------------------------
// SEGMENT ROUTE
// ------------------------------------------------------------
app.get("/segment", async (req, res) => {
  const src = req.query.url;
  if (!src) return res.status(400).send("Missing url param");

  try {
    const upstream = await fetch(src, { headers: customHeaders() });
    if (!upstream.ok) return res.status(502).send("Upstream error");

    res.setHeader("Content-Type", "video/mp2t");
    upstream.body.pipe(res);
  } catch (err) {
    res.status(500).send("Proxy error");
  }
});

// ------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`HLS Proxy running at http://localhost:${PORT}`);
});
