export type YoutubeURLResolvable = string | `http${"s" | ""}://www.youtube.com/${"watch" | "embed" | ""}/${"?v=" | ""}${string}` | `http${"s" | ""}://youtu.be/${string}`

export interface YoutubeSubtitle {
  startMs: number;
  durationMs: number;
  subtitle: string;
}

export interface YoutubeSubtitleInTiming extends YoutubeSubtitle {
  startTiming: string;
  endTiming: string;
}

interface NodeYoutubeSubtitles {
  getSubtitles(url: YoutubeURLResolvable, options: { lang?: string }): YoutubeSubtitle[];
  getSubtitles(url: YoutubeURLResolvable, options: { lang?: string, timingString: true }): YoutubeSubtitleInTiming[];
}

const nodeYoutubeSubtitles: NodeYoutubeSubtitles;

declare module "node-youtube-subtitles" {
  export = nodeYoutubeSubtitles;
}