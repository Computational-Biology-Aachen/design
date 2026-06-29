<!--
  @component

  Fifth-level heading (`<h5>`, 1.125rem) in the design-system font, with a
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
  <H5>Notes</H5>
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
    ...(styleVars.fontSize ? { "--h5-font-size": styleVars.fontSize } : {}),
    ...(styleVars.color ? { "--h5-color": styleVars.color } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<h5
  class={`${color}`}
  style={inlineStyle}
>
  {@render children()}
</h5>

<style>
  h5 {
    --h5-font-size: 1.125rem;
    margin: 0;
    padding: 0;
    color: var(--h5-color);
    font-size: var(--h5-font-size);
    font-family: var(--font-sans);
  }
  .dark {
    --h5-color: var(--color-text);
  }
  .light {
    --h5-color: var(--color-bg);
  }
  .primary {
    --h5-color: var(--color-primary);
  }
  .secondary {
    --h5-color: var(--color-accent);
  }
</style>
