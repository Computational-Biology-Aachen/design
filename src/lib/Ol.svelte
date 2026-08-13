<!--
  @component

  An ordered list (`<ol>`) that can lay its items out in one or two columns
  (two columns only above 800px). Pair with [[Li]] items.

  ### Props

  - `color?: "dark" | "light" | "primary" | "secondary"`
    Text colour. Defaults to `"dark"`.
  - `columns?: "one" | "two"`
    Column layout on wide viewports. Defaults to `"one"`.
  - `children: Snippet`
    The [[Li]] items.
  - `styleVars?: { paddingBottom?: string; paddingLeft?: string }`
    Override the default padding via CSS custom properties.

  ### Example

  ```svelte
  <Ol columns="two">
    <Li>Prepare sample</Li>
    <Li>Run measurement</Li>
  </Ol>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    color = "dark",
    columns = "one",
    children,
    styleVars = {},
  }: {
    color?: "dark" | "light" | "primary" | "secondary";
    columns?: "one" | "two";
    children: Snippet;
    styleVars?: { paddingBottom?: string; paddingLeft?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.paddingBottom
      ? { "--ol-padding-bottom": styleVars.paddingBottom }
      : {}),
    ...(styleVars.paddingLeft
      ? { "--ol-padding-left": styleVars.paddingLeft }
      : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<ol
  class={`${color} ${columns}`}
  style={inlineStyle}
>
  {@render children()}
</ol>

<style>
  ol {
    --ol-padding-bottom: var(--space-4);
    --ol-padding-left: 2rem;
    display: grid;
    padding-bottom: var(--ol-padding-bottom);
    padding-left: var(--ol-padding-left);
  }

  .one {
    grid-template-columns: 1fr;
  }
  .two {
    grid-template-columns: 1fr;
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

  @media screen and (min-width: 800px) {
    .two {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
