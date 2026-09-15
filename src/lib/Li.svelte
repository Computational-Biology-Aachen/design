<!--
  @component

  A list item (`<li>`) with a selectable palette colour. Use inside [[Ul]] or
  [[Ol]].

  ### Props

  - `color?: "inherit" | "dark" | "light" | "on-primary" | "secondary"`
    Text colour. Defaults to `"inherit"`. `"on-primary"` is Paper White, for
    text sitting on a `Section`/`Card` with a `"primary"` (petrol) background.
  - `children: Snippet`
    The list-item content.
  - `styleVars?: { color?: string }`
    Override the text color via CSS custom property.

  ### Example

  ```svelte
  <Ul>
    <Li>First item</Li>
    <Li>Second item</Li>
  </Ul>
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  import type { Snippet } from "svelte";

  let {
    color = "inherit",
    children,
    styleVars = {},
  }: {
    color?: "inherit" | "dark" | "light" | "on-primary" | "secondary";
    children: Snippet;
    styleVars?: { color?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.color ? { "--li-color": styleVars.color } : {}),
  });
  let inlineStyle = $derived(toStyleString(cssVars));
</script>

<li
  class={`${color}`}
  style={inlineStyle}
>
  {@render children()}
</li>

<style>
  .inherit {
    color: inherit;
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
