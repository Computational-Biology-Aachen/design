<!--
  @component

  A hero banner with a background image under a petrol gradient and a lab logo
  pinned to the top-right corner. See [[Hero]] for the simpler variant.

  ### Props

  - `src: string`
    Background image URL.
  - `cpblLogo: string`
    URL of the logo image overlaid in the corner.
  - `variant?: "light" | "surface" | "dark" | "primary" | "accent"`
    Colour scheme. Defaults to `"light"`.
  - `width?: "full" | "narrow"`
    Inner column width. Defaults to `"full"`.
  - `gap?: "normal" | "large"`
    Vertical gap between children. Defaults to `"normal"`.
  - `styleVars?: { padding?: string; height?: string; maxHeight?: string; contentMaxWidth?: string }`
    Override CSS custom properties. All optional.
  - `children: Snippet`
    The hero content.

  ### Example

  ```svelte
  <HeroGradient src="/img/plants.jpg" cpblLogo="/logo.svg">
    <H1 color="light">Welcome</H1>
  </HeroGradient>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    // public prop, not yet applied to styling
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    variant = "light",
    width = "full",
    gap = "normal",
    src,
    cpblLogo,
    styleVars = {},
    children,
  }: {
    src: string;
    cpblLogo: string;
    variant?: "light" | "surface" | "dark" | "primary" | "accent";
    width?: "full" | "narrow";
    gap?: "normal" | "large";
    styleVars?: {
      padding?: string;
      height?: string;
      maxHeight?: string;
      contentMaxWidth?: string;
    };
    children: Snippet;
  } = $props();

  let cssVars = $derived({
    ...(styleVars.padding
      ? { "--hero-gradient-padding": styleVars.padding }
      : {}),
    ...(styleVars.height ? { "--hero-gradient-height": styleVars.height } : {}),
    ...(styleVars.maxHeight
      ? { "--hero-gradient-max-height": styleVars.maxHeight }
      : {}),
    ...(styleVars.contentMaxWidth
      ? { "--hero-gradient-content-max-width": styleVars.contentMaxWidth }
      : {}),
  });
</script>

<div
  class="box"
  style:background-image={`linear-gradient(
			to bottom,
			rgba(245, 246, 252, 0.52),
			color-mix(in srgb, var(--color-primary) 73%, transparent)
		), url(${src})`}
>
  <img
    src={cpblLogo}
    alt="cpbl logo"
  />
  <div
    class="inner width-{width} gap-{gap}"
    style={Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";")}
  >
    {@render children()}
  </div>
</div>

<style>
  .box {
    position: relative;
    margin: 0 auto;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: var(--color-surface);
    width: 100%;
  }
  .inner {
    --hero-gradient-padding: 2rem 2rem;
    --hero-gradient-height: calc(100vh / 2);
    --hero-gradient-max-height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    margin: 0 auto;
    padding: var(--hero-gradient-padding);
    max-width: var(--hero-gradient-content-max-width, var(--max-width));
    height: var(--hero-gradient-height);
    max-height: var(--hero-gradient-max-height);
  }
  img {
    position: absolute;
    top: 1rem;
    right: 1rem;
    max-width: 30rem;
  }
  .gap-normal {
    gap: var(--gap);
  }

  .gap-large {
    gap: var(--gap-lg);
  }

  .width-full {
    --hero-gradient-content-max-width: var(--max-width);
    max-width: var(--hero-gradient-content-max-width);
  }

  .width-narrow {
    --hero-gradient-content-max-width: 100ch;
    max-width: var(--hero-gradient-content-max-width);
  }
</style>
