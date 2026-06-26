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
  - `styleVars?: { fontSize?: string; color?: string }`
    Override the default font-size and color via CSS custom properties.

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
    styleVars = {},
  }: {
    children: Snippet;
    color?: "dark" | "light" | "primary" | "secondary";
    styleVars?: { fontSize?: string; color?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.fontSize ? { "--h-font-size": styleVars.fontSize } : {}),
    ...(styleVars.color ? { "--h-color": styleVars.color } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<h1 class={`${color}`} style={inlineStyle}>
  {@render children()}
</h1>

<style>
  h1 {
    --h-font-size: 2rem;
    margin: 0;
    padding: 0;
    font-size: var(--h-font-size);
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
