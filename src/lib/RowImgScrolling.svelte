<!--
  @component

  A responsive logo bar that displays logos statically when they fit, and
  switches to an infinite marquee (paused on hover, edge-masked) when there are
  more than the per-breakpoint threshold. Uses a ResizeObserver to pick the
  threshold.

  ### Props

  - `logos: { src: string; href: string; alt: string; height?: string }[]`
    The logos to display.
  - `max?: number`
    Max static logos on wide viewports before scrolling. Defaults to `5`.
  - `maxMd?: number`
    Threshold below 1024px. Defaults to `3`.
  - `maxSm?: number`
    Threshold below 768px. Defaults to `2`.
  - `speed?: number`
    Marquee speed factor (higher is faster). Defaults to `40`.
  - `styleVars?: { barHeight?: string; trackGap?: string; logoHeight?: string }`
    Override CSS custom properties. All optional.

  ### Example

  ```svelte
  <RowImgScrolling logos={partnerLogos} max={6} />
  ```
-->
<script lang="ts">
  import { onMount } from "svelte";

  type Logo = { src: string; href: string; alt: string; height?: string };

  interface Props {
    logos: Logo[];
    max?: number;
    maxMd?: number;
    maxSm?: number;
    speed?: number;
    styleVars?: {
      barHeight?: string;
      trackGap?: string;
      logoHeight?: string;
    };
  }

  let {
    logos,
    max = 5,
    maxMd = 3,
    maxSm = 2,
    speed = 40,
    styleVars = {},
  }: Props = $props();

  let containerWidth = $state(1200);

  const threshold = $derived(
    containerWidth < 768 ? maxSm : containerWidth < 1024 ? maxMd : max,
  );
  const scrolling = $derived(logos.length > threshold);
  const duration = $derived((logos.length * 150) / speed);
  const doubled = $derived([...logos, ...logos]);

  let container: HTMLDivElement | undefined = $state();

  let cssVars = $derived({
    ...(styleVars.barHeight
      ? { "--row-img-scrolling-bar-height": styleVars.barHeight }
      : {}),
    ...(styleVars.trackGap
      ? { "--row-img-scrolling-track-gap": styleVars.trackGap }
      : {}),
    ...(styleVars.logoHeight
      ? { "--row-img-scrolling-logo-height": styleVars.logoHeight }
      : {}),
  });

  onMount(() => {
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      containerWidth = entry.contentRect.width;
    });
    observer.observe(container);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={container}
  class="logo-bar"
  class:scrolling={scrolling}
  style={Object.entries({
    ...cssVars,
    ...(scrolling ? { "--duration": `${duration}s` } : {}),
  })
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}
>
  {#if scrolling}
    <div class="track">
      {#each doubled as logo, i (i)}
        <a href={logo.href}>
          <img
            class="logo"
            src={logo.src}
            alt={logo.alt}
            style="height: {logo.height ??
              'var(--row-img-scrolling-logo-height, 5rem)'}"
          />
        </a>
      {/each}
    </div>
  {:else}
    {#each logos as logo, i (i)}
      <a href={logo.href}>
        <img
          class="logo"
          src={logo.src}
          alt={logo.alt}
          style="height: {logo.height ??
            'var(--row-img-scrolling-logo-height, 5rem)'}"
        />
      </a>
    {/each}
  {/if}
</div>

<style>
  .logo-bar {
    --row-img-scrolling-bar-height: 6rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: var(--max-width);
    height: var(--row-img-scrolling-bar-height);
  }

  .logo-bar.scrolling {
    position: relative;
    justify-content: flex-start;
    mask-image: linear-gradient(
      to right,
      transparent,
      black 10%,
      black 90%,
      transparent
    );
    overflow: hidden;
  }

  .track {
    --row-img-scrolling-track-gap: 3rem;
    display: flex;
    align-items: center;
    gap: var(--row-img-scrolling-track-gap);
    animation: marquee var(--duration, 20s) linear infinite;
    width: max-content;
  }

  .track:hover {
    animation-play-state: paused;
  }

  .logo-bar > a,
  .track > a {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  .logo {
    --row-img-scrolling-logo-height: 5rem;
    display: block;
    transition:
      transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
    width: auto;
    max-width: none;
    height: var(--row-img-scrolling-logo-height);
    object-fit: contain;
  }

  .logo:hover {
    transform: translateY(-3px);
  }
</style>
