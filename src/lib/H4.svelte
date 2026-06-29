<!--
  @component

  Fourth-level heading (`<h4>`, 1.25rem) in the design-system font, with a
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
  <H4>Methods</H4>
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
    ...(styleVars.fontSize ? { "--h4-font-size": styleVars.fontSize } : {}),
    ...(styleVars.color ? { "--h4-color": styleVars.color } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<h4
  class={`${color}`}
  style={inlineStyle}
>
  {@render children()}
</h4>

<style>
  h4 {
    --h4-font-size: 1.25rem;
    margin: 0;
    padding: 0;
    color: var(--h4-color);
    font-size: var(--h4-font-size);
    font-family: var(--font-sans);
  }
  .dark {
    --h4-color: var(--color-text);
  }
  .light {
    --h4-color: var(--color-bg);
  }
  .primary {
    --h4-color: var(--color-primary);
  }
  .secondary {
    --h4-color: var(--color-accent);
  }
</style>
