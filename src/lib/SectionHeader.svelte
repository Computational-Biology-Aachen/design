<!--
  @component

  A page header band on the primary colour with a centred, max-width inner
  column. Use at the top of a page for a title/intro. See [[SectionHeaderPerson]]
  for the team-member variant.

  ### Props

  - `variant?: "light" | "surface" | "dark" | "primary" | "accent"`
    Colour scheme. Defaults to `"light"`.
  - `width?: "full" | "narrow"`
    Inner column width. Defaults to `"full"`.
  - `gap?: "normal" | "large"`
    Vertical gap between children. Defaults to `"normal"`.
  - `children: Snippet`
    The header content.

  ### Example

  ```svelte
  <SectionHeader>
    <H1 color="light">Publications</H1>
  </SectionHeader>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    variant = "light",
    width = "full",
    gap = "normal",
    children,
  }: {
    variant?: "light" | "surface" | "dark" | "primary" | "accent";
    width?: "full" | "narrow";
    gap?: "normal" | "large";
    children: Snippet;
  } = $props();
</script>

<header>
  <div class="inner width-{width} gap-{gap}">
    {@render children()}
  </div>
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    background-color: var(--color-primary);
    padding: var(--space-8) var(--space-4);
    min-height: 12rem;
  }
  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    margin: 0 auto;
    width: 100%;
    max-width: var(--max-width);
  }

  .gap-normal {
    gap: var(--gap);
  }

  .gap-large {
    gap: var(--gap-lg);
  }

  .width-full {
    max-width: var(--max-width);
  }

  .width-narrow {
    max-width: 100ch;
  }
</style>
