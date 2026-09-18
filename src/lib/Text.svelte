<!--
  @component

  A paragraph of body text (`<p>`) in the design-system font, justified with
  automatic hyphenation. Offers a broader colour set than the heading
  components.

  ### Props

  - `children: Snippet`
    The paragraph content.
  - `color?: "inherit" | "black" | "white" | "dark" | "light" | "on-primary" | "secondary"`
    Text colour. Defaults to `"inherit"`. `"on-primary"` is Paper White, for text
    sitting on a `Section`/`Card` with a `"primary"` (petrol) background.
  - `styleVars?: { fontSize?: string }`
    Override CSS custom properties for the paragraph.

  ### Example

  ```svelte
  <Text>We study photosynthesis using computational models.</Text>
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
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
      | "on-primary"
      | "secondary";
    styleVars?: { fontSize?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.fontSize ? { "--text-font-size": styleVars.fontSize } : {}),
  });
</script>

<p
  class={`${color}`}
  style={toStyleString(cssVars)}
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
    overflow-wrap: break-word;
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
  .on-primary {
    color: var(--color-surface);
  }
  .secondary {
    color: var(--color-accent);
  }
</style>
