"use client";

export default function QualitySelector({
  sub,
  dub,
  currentSource,
  changeQuality,
}: {
  sub: any[];
  dub: any[];
  currentSource: string;
  changeQuality: (url: string) => void;
}) {
  return (
    <>
      {sub.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Subbed Streams:</h3>
          {sub.map((s) => (
            <button
              key={s.resolution + "-sub"}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                cursor: "pointer",
                background: currentSource === s.url ? "#fff" : "#444",
                color: currentSource === s.url ? "#000" : "#fff",
                border: "none",
                borderRadius: "4px",
              }}
              onClick={() => changeQuality(s.url)}
            >
              {s.resolution}p
            </button>
          ))}
        </div>
      )}

      {dub.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Dubbed Streams:</h3>
          {dub.map((s) => (
            <button
              key={s.resolution + "-dub"}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                cursor: "pointer",
                background: currentSource === s.url ? "#fff" : "#444",
                color: currentSource === s.url ? "#000" : "#fff",
                border: "none",
                borderRadius: "4px",
              }}
              onClick={() => changeQuality(s.url)}
            >
              {s.resolution}p
            </button>
          ))}
        </div>
      )}
    </>
  );
}
