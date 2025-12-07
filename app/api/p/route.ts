export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const video = url.searchParams.get("video") || "";

  const html = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Plyr HLS Player</title>

    <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />

    <style>
        .art-video-player {
            --art-progress-height: 12px !important;
            --art-border-radius: 1.5vh !important;
            --art-theme: #fff !important;
            --art-hover-color: #fff !important;
            --art-control-background: rgba(255, 255, 255, 0.15) !important;
            --art-control-hover-background: rgba(255, 255, 255, 0.3) !important;
        }
        .art-progress-hover,
        .art-control-progress-inner,
        .art-progress-played {
            border-radius: 50vh !important;
        }
        .art-icon-state svg path {
            d: path("M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z");
            fill: currentColor;
        }
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #000;
        }
        .artplayer-app {
            margin: 0;
            width: 100vw;
            height: 100vh;
        }
    </style>
</head>

<body>
    <div class="artplayer-app"></div>

    <script src="https://cdn.jsdelivr.net/npm/artplayer/dist/artplayer.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.17/hls.min.js"></script>

    <script>
        const video = decodeURIComponent("${encodeURIComponent(video)}");

        function playM3u8(videoElement, url, art) {
            if (Hls.isSupported()) {
                if (art.hls) art.hls.destroy();
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(videoElement);
                art.hls = hls;

                art.on("destroy", () => hls.destroy());
            } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
                videoElement.src = url;
            } else {
                art.notice.show("Unsupported playback format: m3u8");
            }
        }

        const art = new Artplayer({
            container: document.querySelector(".artplayer-app"),
            url: video,
            type: "m3u8",
            customType: {
                m3u8: playM3u8,
            },
            fullscreen: true,
            playbackRate: true,
            setting: true,
            screenshot: true,
            hotkey: true,
        });

        art.on("ready", () => console.info("HLS instance:", art.hls));
    </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
