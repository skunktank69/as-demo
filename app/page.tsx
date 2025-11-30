// "use client";
// import { useEffect } from "react";
// import Artplayer from "artplayer";
// import Hls from "hls.js";

// export default function Player() {
//   useEffect(() => {
//     function playM3u8(videoElement, url, art) {
//       if (Hls.isSupported()) {
//         if (art.hls) art.hls.destroy();
//         const hls = new Hls();
//         hls.loadSource(url);
//         hls.attachMedia(videoElement);
//         art.hls = hls;

//         art.on("destroy", () => hls.destroy());
//       } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
//         videoElement.src = url;
//       } else {
//         art.notice.show("Unsupported playback format: m3u8");
//       }
//     }
//     const player = new Artplayer({
//       container: ".artplayer-app", // the div container
//       type: "m3u8",
//       customType: {
//         m3u8: playM3u8,
//       },
//       url: decodeURIComponent(
//         "http%3A%2F%2Fvidapi.skunktank.me%3A30000%2Fplaylist%3Furl%3Dhttps%3A%2F%2Fvault-04.uwucdn.top%2Fstream%2F04%2F12%2Fbc23af48be3adbc82c977564d4cbf17b9643d0a356debb1ad87d95c48934b18b%2Fuwu.m3u8",
//       ),
//       autoplay: false,
//       autoSize: true,
//       // controls: true,
//       volume: 0.8,
//     });

//     return () => player.destroy(); // cleanup
//   }, []);

//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <div
//         className="artplayer-app"
//         style={{ width: "100%", height: "100%" }}
//       />
//     </div>
//   );
// }
