<!--
  @component

  A full-width hero banner (≥50vh) with a centred max-width content column. When
  `src` is given it shows that image under a petrol gradient overlay; otherwise
  it falls back to a solid primary background. See [[HeroGradient]] for the
  logo-overlaid variant.

  ### Props

  - `src?: string`
    Optional background image URL.
  - `styleVars?: { innerPadding?: string; innerMaxWidth?: string; innerMinHeight?: string }`
    Override CSS custom properties for the inner content area.
  - `children: Snippet`
    The hero content (heading, tagline, CTAs).

  ### Example

  ```svelte
  <Hero src="/img/lab.jpg">
    <H1 color="light">Computational and Plant Biology Lab</H1>
  </Hero>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    src,
    styleVars = {},
    children,
  }: {
    src?: string;
    styleVars?: {
      innerPadding?: string;
      innerMaxWidth?: string;
      innerMinHeight?: string;
    };
    children: Snippet;
  } = $props();

  let innerCssVars = $derived({
    ...(styleVars.innerPadding
      ? { "--hero-inner-padding": styleVars.innerPadding }
      : {}),
    ...(styleVars.innerMaxWidth
      ? { "--hero-inner-max-width": styleVars.innerMaxWidth }
      : {}),
    ...(styleVars.innerMinHeight
      ? { "--hero-inner-min-height": styleVars.innerMinHeight }
      : {}),
  });
</script>

<div
  class="hero"
  style:background-image={src
    ? `linear-gradient(
      to bottom,
      rgba(245,246,252,0.4),
      color-mix(in srgb, var(--color-primary) 75%, transparent)
      ), url(${src})`
    : undefined}
>
  <div
    class="inner"
    style={Object.entries(innerCssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";")}
  >
    {@render children()}
  </div>
</div>

<style>
  .hero {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: var(--color-primary);
    width: 100%;
  }

  .inner {
    --hero-inner-padding: var(--space-8) var(--space-4);
    --hero-inner-max-width: var(--max-width);
    --hero-inner-min-height: 50vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: var(--hero-inner-padding);
    max-width: var(--hero-inner-max-width);
    min-height: var(--hero-inner-min-height);
    max-height: 800px;
  }
</style>
