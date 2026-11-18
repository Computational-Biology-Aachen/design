<!--
  @component

  A responsive logo bar that displays logos statically when they fit, and
  switches to an infinite marquee (edge-masked) when there are more than the
  per-breakpoint threshold. Uses a ResizeObserver to pick the threshold. The
  marquee pauses on hover/focus and has a Pause/Play button (WCAG 2.2.2); with
  `prefers-reduced-motion: reduce` it never animates and becomes a
  horizontally scrollable row instead.

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
  <LogoBar logos={partnerLogos} max={6} />
  ```
-->
<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  import { toStyleString } from "./utils";

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
  let paused = $state(false);

  const threshold = $derived(
    containerWidth < 768 ? maxSm : containerWidth < 1024 ? maxMd : max,
  );
  const scrolling = $derived(logos.length > threshold);
  const duration = $derived((logos.length * 150) / speed);

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

{#snippet logoLinks()}
  {#each logos as logo, i (i)}
    <a href={logo.href}>
      <img
        class="logo"
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        style:height={logo.height}
      />
    </a>
  {/each}
{/snippet}

<div
  bind:this={container}
  class="logo-bar"
  class:scrolling={scrolling}
  class:paused={paused}
  style={toStyleString({
    ...cssVars,
    ...(scrolling ? { "--duration": `${duration}s` } : {}),
  })}
>
  {#if scrolling}
    <div class="viewport">
      <div class="track">
        <div class="group">{@render logoLinks()}</div>
        <div
          class="group duplicate"
          aria-hidden="true"
          inert
        >
          {@render logoLinks()}
        </div>
      </div>
    </div>
    <button
      type="button"
      class="pause"
      aria-label={paused ? "Play logo animation" : "Pause logo animation"}
      onclick={() => (paused = !paused)}
    >
      <Icon
        color="inherit"
        fontSize="inherit">{paused ? "play_arrow" : "pause"}</Icon
      >
    </button>
  {:else}
    {@render logoLinks()}
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
  }

  .viewport {
    display: flex;
    flex: 1;
    align-items: center;
    align-self: stretch;
    min-width: 0;
    overflow-x: auto;

    @media (prefers-reduced-motion: no-preference) {
      mask-image: linear-gradient(
        to right,
        transparent,
        black 10%,
        black 90%,
        transparent
      );
      overflow: hidden;
    }
  }

  .track {
    display: flex;
    align-items: center;
    width: max-content;

    @media (prefers-reduced-motion: no-preference) {
      animation: marquee var(--duration, 20s) linear infinite;
    }
  }

  .logo-bar.paused .track,
  .viewport:hover .track,
  .viewport:focus-within .track {
    animation-play-state: paused;
  }

  .group {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--row-img-scrolling-track-gap, 3rem);
    /* Trailing gap so the two groups tile seamlessly at translateX(-50%). */
    padding-inline-end: var(--row-img-scrolling-track-gap, 3rem);
  }

  .duplicate {
    display: none;

    @media (prefers-reduced-motion: no-preference) {
      display: flex;
    }
  }

  .pause {
    display: none;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: var(--border);
    border-radius: var(--radius-full);
    background: var(--color-bg);
    width: 2rem;
    height: 2rem;
    color: var(--color-text-muted);
    font-size: 1.25rem;

    @media (prefers-reduced-motion: no-preference) {
      display: inline-flex;
    }
  }

  .pause:hover {
    color: var(--color-primary);
  }

  .logo-bar > a,
  .group > a {
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
    display: block;
    transition:
      transform var(--transition),
      box-shadow var(--transition);
    width: auto;
    max-width: none;
    height: var(--row-img-scrolling-logo-height, 5rem);
    object-fit: contain;
  }

  .logo:hover {
    @media (prefers-reduced-motion: no-preference) {
      transform: translateY(-3px);
    }
  }
</style>
