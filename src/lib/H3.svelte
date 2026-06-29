<!--
  @component

  Sub-section heading (`<h3>`, 1.5rem) in the design-system font, with a
  selectable palette colour. Margins/padding are reset.

  ### Props

  - `children: Snippet`
    The heading text.
  - `color?: "dark" | "light" | "primary" | "secondary"`
    Text colour. Defaults to `"dark"`.
  - `styleVars?: { fontSize?: string; color?: string }`
    Override the default font-size and color via CSS custom properties.

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
    styleVars = {},
  }: {
    children: Snippet;
    color?: "dark" | "light" | "primary" | "secondary";
    styleVars?: { fontSize?: string; color?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.fontSize ? { "--h3-font-size": styleVars.fontSize } : {}),
    ...(styleVars.color ? { "--h3-color": styleVars.color } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<h3
  class={`${color}`}
  style={inlineStyle}
>
  {@render children()}
</h3>

<style>
  h3 {
    --h3-font-size: 1.5rem;
    margin: 0;
    padding: 0;
    color: var(--h3-color);
    font-size: var(--h3-font-size);
    font-family: var(--font-sans);
  }
  .dark {
    --h3-color: var(--color-text);
  }
  .light {
    --h3-color: var(--color-bg);
  }
  .primary {
    --h3-color: var(--color-primary);
  }
  .secondary {
    --h3-color: var(--color-accent);
  }
</style>
