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

  ### Example

  ```svelte
  <Figure src="/img/scheme.svg" alt="Pathway scheme">
    {#snippet caption()}Figure 1. The Calvin–Benson cycle.{/snippet}
  </Figure>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    src,
    alt,
    caption,
  }: {
    src: string;
    alt: string;
    caption?: Snippet;
  } = $props();
</script>

<figure>
  <img {src} {alt} />
  {#if caption}
    <figcaption>{@render caption()}</figcaption>
  {/if}
</figure>

<style>
  figure {
    margin: var(--space-4, 16px) 0;
    width: 100%;
    text-align: center;
  }

  img {
    border-radius: var(--radius-md, 6px);
    max-width: 100%;
  }

  figcaption {
    margin-top: var(--space-2, 8px);
    color: var(--color-text-muted, #666);
    font-size: 0.875rem;
  }
</style>
