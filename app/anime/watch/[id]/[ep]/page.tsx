"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "@/components/player";

export default function WatchPage({
  params,
}: {
  params: Promise<{ id: string; ep: string }>;
}) {
  const [m3u8Url, setM3u8Url] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");

  useEffect(() => {
    async function loadVideo() {
      const { id, ep } = await params;

      try {
        // 1. Fetch the watch API
        const res = await fetch(`/api/watch/${id}/${ep}`);
        if (!res.ok) throw new Error(`Watch API returned ${res.status}`);
        const data = await res.json();

        setSubtitle(data.subtitle);

        // 2. Encode the m3u8 URL for the proxy
        const proxiedM3u8 = `/api/proxy/${encodeURIComponent(data.source)}`;
        setM3u8Url(proxiedM3u8);
      } catch (err) {
        console.error("Failed to load video:", err);
      }
    }

    loadVideo();
  }, [params]);

  if (!m3u8Url) return <p>Loading...</p>;

  return (
    <VideoPlayer
      title={`Episode`}
      m3u8={m3u8Url}
      textTrack={subtitle}
      thumb=""
    />
  );
}
