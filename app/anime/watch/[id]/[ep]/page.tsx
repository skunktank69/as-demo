"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QualitySelector from "@/components/watch-page/qc";
import Player from "@/components/watch-page/player";

export default function WatchPage() {
  const { id, ep } = useParams();
  const [data, setData] = useState<any>(null);
  const [title, setTitle] = useState<any>(null);

  const [currentSource, setCurrentSource] = useState<string>("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/watch/${id}/${ep}`)
      .then((r) => r.json())
      .then((j) => {
        setData(j.data);
        setTitle(j.title);

        if (j.data.sources?.length) {
          setCurrentSource(j.data.sources[0].url);
        }
      });
  }, [id, ep]);

  if (!data) return <div>Loading episode…</div>;

  const changeQuality = (url: string) => {
    setCurrentSource(url);
  };

  // --- Split sources into sub/dub ---
  const subSources = data.sources.filter((s: any) => !s.isDub);
  const dubSources = data.sources.filter((s: any) => s.isDub);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Episode {data.episode} - {title}
      </h2>

      <Player
        src={`http://vidapi.skunktank.me:30001/?video=${encodeURIComponent(
          `http://vidapi.skunktank.me:30000/playlist?url=${currentSource}`,
        )}`}
      />

      <QualitySelector
        sub={subSources}
        dub={dubSources}
        currentSource={currentSource}
        changeQuality={changeQuality}
      />
      {/* DOWNLOADS */}
      <div style={{ marginTop: "20px" }}>
        <h3>Download:</h3>
        {data.downloads.map((d: any) => (
          <a
            key={`${d.quality}-${d.isDub}`}
            href={d.download}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginRight: "10px",
              marginBottom: "10px",
              padding: "5px 10px",
              background: "#444",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            {d.quality} {d.isDub ? "(Dub)" : "(Sub)"}
          </a>
        ))}
      </div>
    </div>
  );
}
