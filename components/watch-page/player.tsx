"use client";

import { useState, useRef, useEffect } from "react";
import { PictureInPicture2 } from "lucide-react";

export default function Player({ src }: { src: string }) {
  const [popped, setPopped] = useState(false);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: any) => {
    if (!popped) return; // only draggable when popped out

    const box = playerRef.current;
    if (!box) return;

    offset.current = {
      x: e.clientX - box.offsetLeft,
      y: e.clientY - box.offsetTop,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: any) => {
    const box = playerRef.current;
    if (!box) return;

    box.style.left = `${e.clientX - offset.current.x}px`;
    box.style.top = `${e.clientY - offset.current.y}px`;
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (!popped) {
      // Reset when unpopping
      const box = playerRef.current;
      if (box) {
        box.style.left = "0px";
        box.style.top = "0px";
      }
    }
  }, [popped]);

  return (
    <div
      ref={playerRef}
      style={{
        position: popped ? "fixed" : "relative",
        bottom: popped ? "20px" : "auto",
        right: popped ? "20px" : "auto",
        width: popped ? "400px" : "100%",
        height: popped ? "230px" : "500px",
        zIndex: popped ? 9999 : "auto",
        cursor: popped ? "grab" : "default",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: popped
          ? "0 0 40px rgba(2, 20, 2, 0.2)"
          : "0 0 40px rgba(231, 200, 255, 0.1)",
        transition: "all 0.25s ease",
        background: "#000",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* POP BUTTON */}
      <button
        onClick={() => setPopped(!popped)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          // background: "gray",
          color: "#fff",
          border: "2px solid rgba(32,45,32,0.5)",
          padding: "4px 8px",
          borderRadius: "6px",
          fontSize: "12px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        {popped ? "Dock" : <PictureInPicture2 />}
      </button>

      <iframe
        key={src}
        src={src}
        width="100%"
        height="100%"
        allowFullScreen
        style={{
          border: "none",
          outline: "none",
          display: "block",
          filter: "brightness(1.1) contrast(1.05)",
        }}
      ></iframe>
    </div>
  );
}
