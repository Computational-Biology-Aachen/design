<!--
  @component

  Sixth-level heading (`<h6>`, 1rem) in the design-system font, with a
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
  <H6>Acknowledgements</H6>
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
    ...(styleVars.fontSize ? { "--h6-font-size": styleVars.fontSize } : {}),
    ...(styleVars.color ? { "--h6-color": styleVars.color } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<h6
  class={`${color}`}
  style={inlineStyle}
>
  {@render children()}
</h6>

<style>
  h6 {
    --h6-font-size: 1rem;
    margin: 0;
    padding: 0;
    color: var(--h6-color);
    font-size: var(--h6-font-size);
    font-family: var(--font-sans);
  }
  .dark {
    --h6-color: var(--color-text);
  }
  .light {
    --h6-color: var(--color-bg);
  }
  .primary {
    --h6-color: var(--color-primary);
  }
  .secondary {
    --h6-color: var(--color-accent);
  }
</style>
