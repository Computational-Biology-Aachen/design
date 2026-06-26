<!--
  @component

  A paragraph of body text (`<p>`) in the design-system font, justified with
  automatic hyphenation. Offers a broader colour set than the heading
  components.

  ### Props

  - `children: Snippet`
    The paragraph content.
  - `color?: "inherit" | "black" | "white" | "dark" | "light" | "primary" | "secondary"`
    Text colour. Defaults to `"inherit"`.
  - `styleVars?: { fontSize?: string }`
    Override CSS custom properties for the paragraph.

  ### Example

  ```svelte
  <Text>We study photosynthesis using computational models.</Text>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    color = "inherit",
    styleVars = {},
  }: {
    children: Snippet;
    color?:
      | "inherit"
      | "black"
      | "white"
      | "dark"
      | "light"
      | "primary"
      | "secondary";
    styleVars?: { fontSize?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.fontSize ? { "--text-font-size": styleVars.fontSize } : {}),
  });
</script>

<p
  class={`${color}`}
  style={Object.entries(cssVars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}
>
  {@render children()}
</p>

<style>
  p {
    --text-font-size: 1rem;

    font-size: var(--text-font-size);
    font-family: var(--font-sans);
    hyphens: auto;
    text-align: justify;
  }
  .inherit {
    color: inherit;
  }
  .black {
    color: var(--color-text);
  }
  .white {
    color: var(--color-bg);
  }
  .dark {
    color: var(--color-text);
  }
  .light {
    color: var(--color-bg);
  }
  .primary {
    color: var(--color-surface);
  }
  .secondary {
    color: var(--color-accent);
  }
</style>
