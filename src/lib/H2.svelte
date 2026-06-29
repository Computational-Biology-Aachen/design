<!--
  @component

  Section heading (`<h2>`, 1.75rem) in the design-system font, with a selectable
  palette colour. Margins/padding are reset.

  ### Props

  - `children: Snippet`
    The heading text.
  - `color?: "dark" | "light" | "primary" | "secondary"`
    Text colour. Defaults to `"dark"`.
  - `styleVars?: { fontSize?: string; color?: string }`
    Override the default font-size and color via CSS custom properties.

  ### Example

  ```svelte
  <H2>Research</H2>
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
    ...(styleVars.fontSize ? { "--h2-font-size": styleVars.fontSize } : {}),
    ...(styleVars.color ? { "--h2-color": styleVars.color } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<h2
  class={`${color}`}
  style={inlineStyle}
>
  {@render children()}
</h2>

<style>
  h2 {
    --h2-font-size: 1.75rem;
    margin: 0;
    padding: 0;
    color: var(--h2-color);
    font-size: var(--h2-font-size);
    font-family: var(--font-sans);
  }
  .dark {
    --h2-color: var(--color-text);
  }
  .light {
    --h2-color: var(--color-bg);
  }
  .primary {
    --h2-color: var(--color-primary);
  }
  .secondary {
    --h2-color: var(--color-accent);
  }
</style>
