<!--
  @component

  A responsive, privacy-friendly (youtube-nocookie) YouTube video embed that
  keeps a 16:9 aspect ratio and lazy-loads the iframe.

  ### Props

  - `videoId: string`
    The YouTube video id (the part after `v=`).
  - `title?: string`
    Accessible iframe title. Defaults to `"YouTube video"`.

  ### Style Overrides

  - `styleVars.borderRadius` → overrides `--youtube-border-radius`
  - `styleVars.aspectRatio` → overrides `--youtube-aspect-ratio` (a CSS ratio, e.g. `"4 / 3"`)

  ### Example

  ```svelte
  <YouTubeEmbed videoId="dQw4w9WgXcQ" title="Intro to photosynthesis" />
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  interface Props {
    videoId: string;
    title?: string;
    styleVars?: { borderRadius?: string; aspectRatio?: string };
  }

  let { videoId, title = "YouTube video", styleVars = {} }: Props = $props();

  let cssVars = $derived({
    ...(styleVars.borderRadius
      ? { "--youtube-border-radius": styleVars.borderRadius }
      : {}),
    ...(styleVars.aspectRatio
      ? { "--youtube-aspect-ratio": styleVars.aspectRatio }
      : {}),
  });
  let inlineStyle = $derived(toStyleString(cssVars));
</script>

<div
  class="youtube-container"
  style={inlineStyle}
>
  <iframe
    src="https://www.youtube-nocookie.com/embed/{videoId}"
    title={title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>

<style>
  .youtube-container {
    --youtube-border-radius: var(--radius-md);
    --youtube-aspect-ratio: 16 / 9;
    border-radius: var(--youtube-border-radius);
    background: #000;
    aspect-ratio: var(--youtube-aspect-ratio);
    width: 100%;
    overflow: hidden;
  }

  iframe {
    display: block;
    border: 0;
    width: 100%;
    height: 100%;
  }
</style>
