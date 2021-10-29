# Node Youtube Subtitles  
This library allows you to obtain subtitles for a YouTube video through a link or ID without an API key.  
it returns Promise, you need to use `await` to get the return value.  
## getSubtitles()  
| PARAMETERS 	| TYPE 	| OPTIONAL 	| DESCRIPTION 	|
|---	|---	|---	|---	|
| url 	| YoutubeURLResolvable 	| `N` 	| Get subtitles for the video based on the URL or video ID. 	|
| options 	| Object 	| `Y` 	| You can set the subtitle language or have the timing string return.  	|    

If the video ID or URL is not valid, return an empty array.  

---
### Basics
```ts
const urls = [
  "https://www.youtube.com/watch?v=_GBw7lBfMkM",
  "https://youtu.be/_GBw7lBfMkM",
  "_GBw7lBfMkM",
];

for (const url of urls) {
  const sub = await getSubtitles(url);
  console.log(sub);
  // All return the SAME RESULT.
}
```
#### Return values 
```
[
  {
    startMs: 30520,
    durationMs: 2920,
    startTiming: '00:00:30.520',
    endTiming: '00:00:33.440',
    subtitle: 'At 2 AM at the train crossing,'
  },
  {
    startMs: 33440,
    durationMs: 2600,
    startTiming: '00:00:33.440',
    endTiming: '00:00:36.40',
    subtitle: 'I was carrying a telescope.'
  },
  ...
]
```
The above code returns the value below.  
---
### Designating a language
```ts
const url = "https://www.youtube.com/watch?v=DoDCr--yMNY";
const sub = await getSubtitles(url, { lang: "ko" });
// Return the Korean caption
}
```
If a language is not specified, the default value is "en".  
#### Return values 
```
[
  {
    startMs: 600,
    durationMs: 2800,
    subtitle: '달도 지구도 태양도'
  },
  {
    startMs: 3400,
    durationMs: 2100,
    subtitle: '빼앗아'
  },
  ...
]
```
---
### Getting the timing string
```ts
const url = "https://youtu.be/ESx_hy1n7HA";
const sub = await getSubtitles(url, { timingString: true });
}
```
#### Return values 
```
[
  ...
  {
    startMs: 125708,
    durationMs: 2953,
    startTiming: '00:02:25.708',
    endTiming: '00:02:28.661',
    subtitle: 'Challenging your god'
  },
  {
    startMs: 128661,
    durationMs: 2563,
    startTiming: '00:02:28.661',
    endTiming: '00:02:31.224',
    subtitle: 'You have made some'
  },
  ...
]
```
---
### Mix
```ts
const url = "DoDCr--yMNY";
const sub = await getSubtitles(url, { lang: "ko", timingString: true });
}
```
#### Return values 
```json
[
  {
    startMs: 600,
    startTiming: '00:00:00.600',
    endTiming: '00:00:03.400',
    durationMs: 2800,
    subtitle: '달도 지구도 태양도'
  },
  {
    startMs: 3400,
    startTiming: '00:00:03.400',
    endTiming: '00:00:05.500',
    durationMs: 2100,
    subtitle: '빼앗아'
  },
  ...
]
```