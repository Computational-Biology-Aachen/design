<!--
  @component

  A centred `<figure>` pairing an image with an optional caption rendered in
  muted, smaller text.

  ### Props

  - `src: string`
    Image source URL.
  - `alt: string`
    Alternative text (required).
  - `caption?: Snippet`
    Optional caption content rendered in a `<figcaption>`.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Figure src="/img/scheme.svg" alt="Pathway scheme">
    {#snippet caption()}Figure 1. The Calvin–Benson cycle.{/snippet}
  </Figure>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    src: string;
    alt: string;
    caption?: Snippet;
    styleVars?: { [key: string]: string };
  }

  let { src, alt, caption, styleVars = {} }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<figure style={inlineStyle}>
  <img
    src={src}
    alt={alt}
  />
  {#if caption}
    <figcaption>{@render caption()}</figcaption>
  {/if}
</figure>

<style>
  figure {
    --figure-margin: var(--space-4, 16px) 0;
    --figure-img-radius: var(--radius-md, 6px);
    --figure-figcaption-gap: var(--space-2, 8px);
    --figure-figcaption-color: var(--color-text-muted, #666);
    --figure-figcaption-size: 0.875rem;
    margin: var(--figure-margin);
    width: 100%;
    text-align: center;
  }

  img {
    border-radius: var(--figure-img-radius);
    max-width: 100%;
  }

  figcaption {
    margin-top: var(--figure-figcaption-gap);
    color: var(--figure-figcaption-color);
    font-size: var(--figure-figcaption-size);
  }
</style>
