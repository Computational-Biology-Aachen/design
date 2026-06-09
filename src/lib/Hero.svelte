<!--
  @component

  A full-width hero banner (≥50vh) with a centred max-width content column. When
  `src` is given it shows that image under a petrol gradient overlay; otherwise
  it falls back to a solid primary background. See [[HeroGradient]] for the
  logo-overlaid variant.

  ### Props

  - `src?: string`
    Optional background image URL.
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

  interface Props {
    src?: string;
    children: Snippet;
  }

  let { src, children }: Props = $props();
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
  <div class="inner">
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: var(--space-8) var(--space-4);
    max-width: var(--max-width);
    min-height: 50vh;
    max-height: 800px;
  }
</style>
