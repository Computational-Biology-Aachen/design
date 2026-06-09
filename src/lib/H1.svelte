<!--
  @component

  Top-level page heading (`<h1>`, 2rem) in the design-system font, with a
  selectable palette colour. Margins/padding are reset so spacing is controlled
  by the surrounding layout.

  ### Props

  - `children: Snippet`
    The heading text.
  - `color?: "dark" | "light" | "primary" | "secondary"`
    Text colour. Defaults to `"dark"`. Use `"light"` on dark backgrounds.

  ### Example

  ```svelte
  <H1>Computational and Plant Biology Lab</H1>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    color = "dark",
  }: {
    children: Snippet;
    color?: "dark" | "light" | "primary" | "secondary";
  } = $props();
</script>

<h1 class={`${color}`}>
  {@render children()}
</h1>

<style>
  h1 {
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-family: var(--font-sans);
  }
  .dark {
    color: var(--color-text);
  }
  .light {
    color: var(--color-bg);
  }
  .primary {
    color: var(--color-primary);
  }
  .secondary {
    color: var(--color-accent);
  }
</style>
