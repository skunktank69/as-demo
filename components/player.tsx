import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { Track } from "@vidstack/react";

export default function VideoPlayer(props: {
  title: string;
  m3u8: string;
  textTrack: string;
  thumb: string;
}) {
  return (
    <>
      <MediaPlayer title={props.title} src={props.m3u8}>
        <MediaProvider>
          <Track
            src={props.textTrack}
            kind="subtitles"
            label="English"
            lang="en-US"
            type="srt"
            default
          />
        </MediaProvider>
        <DefaultVideoLayout
          // thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
          icons={defaultLayoutIcons}
        />
      </MediaPlayer>
    </>
  );
}
