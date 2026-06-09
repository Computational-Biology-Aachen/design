<!--
  @component

  An anchored documentation section for the showcase: a titled (and optionally
  subtitled) block with a scroll-margin offset for the sticky nav and a brief
  highlight flash when navigated to via its `id`. Pairs with [[ShowcaseSidebar]].

  ### Props

  - `id: string`
    Anchor id used for in-page navigation and the `:target` flash.
  - `title: string`
    Section heading.
  - `subtitle?: string`
    Optional uppercased sub-label.
  - `children: Snippet`
    The section content.

  ### Example

  ```svelte
  <ShowcaseSection id="tokens" title="Colour tokens" subtitle="Palette">
    …
  </ShowcaseSection>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    id,
    title,
    subtitle,
    children,
  }: {
    id: string;
    title: string;
    subtitle?: string;
    children: Snippet;
  } = $props();
</script>

<div
  id={id}
  class="section"
>
  <h2>{title}</h2>
  {#if subtitle}
    <h3>{subtitle}</h3>
  {/if}
  {@render children()}
</div>

<style>
  .section {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    border-radius: var(--radius-md);
    scroll-margin-top: calc(var(--nav-height) + var(--space-8));
  }

  @keyframes section-target-flash {
    from {
      background-color: color-mix(
        in srgb,
        var(--color-primary) 8%,
        transparent
      );
    }
    to {
      background-color: transparent;
    }
  }

  .section:target {
    animation: section-target-flash 1.4s ease-out;
  }

  h2 {
    margin-bottom: var(--space-6);
    border-bottom: var(--border);
    padding-bottom: var(--space-3);
    font-weight: 600;
    font-size: 1.5rem;
  }

  h3 {
    margin-bottom: var(--space-4);
    color: var(--color-text-muted);
    font-weight: 500;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
</style>
