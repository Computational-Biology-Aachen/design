<!--
  @component

  Sub-section heading (`<h3>`, 1.5rem) in the design-system font, with a
  selectable palette colour. Margins/padding are reset.

  ### Props

  - `children: Snippet`
    The heading text.
  - `color?: "dark" | "light" | "primary" | "secondary"`
    Text colour. Defaults to `"dark"`.

  ### Example

  ```svelte
  <H3>Publications</H3>
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

<h3 class={`${color}`}>
  {@render children()}
</h3>

<style>
  h3 {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
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
