const { default: axios } = require("axios");

const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

exports.getSubtitles = async (url, options) => {
  let id = url;

  const matchs = url.match(regExp);

  if (matchs && matchs[7])
    id = matchs[7];

  const data = await axios({
    method: "GET",
    responseType: "json",
    url: `https://video.google.com/timedtext?lang=${
      (options !== undefined && options.lang)
        ? options.lang
        : "en"
    }&v=${id}&fmt=json3`,
  })
    .then((d) => d.data.events)
    .catch(() => null);

  const result = [];

  if (!data)
    return result;

  if (
    options !== undefined &&
    options.timingString
  ) {
    for (const subs of data)
      result.push({
        startMs: subs.tStartMs,
        durationMs: subs.dDurationMs,
        startTiming: `${
          `0${Math.floor(subs.tStartMs / 36e5)}`.slice(-2)
        }:${
          `0${Math.floor(subs.tStartMs / 6e4)}`.slice(-2)
        }:${
          `0${Math.floor((subs.tStartMs / 1e3) % 60)}`.slice(-2)
        }.${
          Math.floor(subs.tStartMs % 1e3)
        }`,
        endTiming: `${
          `0${Math.floor((subs.tStartMs + subs.dDurationMs) / 36e5)}`.slice(-2)
        }:${
          `0${Math.floor((subs.tStartMs + subs.dDurationMs) / 6e4)}`.slice(-2)
        }:${
          `0${Math.floor(((subs.tStartMs + subs.dDurationMs) / 1e3) % 60)}`.slice(-2)
        }.${
          Math.floor((subs.tStartMs + subs.dDurationMs) % 1e3)
        }`,
        subtitle: subs.segs[0].utf8 ?? "",
      });
  } else {
    for (const subs of data)
      result.push({
        startMs: subs.tStartMs,
        durationMs: subs.dDurationMs,
        subtitle: subs.segs[0].utf8 ?? "",
      });
  }

  return result;
}