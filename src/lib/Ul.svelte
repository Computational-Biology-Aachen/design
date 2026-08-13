<!--
  @component

  An unordered list (`<ul>`) that can lay its items out in one or two columns
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
  <Ul columns="two">
    <Li>Genomics</Li>
    <Li>Metabolic modelling</Li>
  </Ul>
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
      ? { "--ul-padding-bottom": styleVars.paddingBottom }
      : {}),
    ...(styleVars.paddingLeft
      ? { "--ul-padding-left": styleVars.paddingLeft }
      : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<ul
  class={`${color} ${columns}`}
  style={inlineStyle}
>
  {@render children()}
</ul>

<style>
  ul {
    --ul-padding-bottom: var(--space-4);
    --ul-padding-left: 2rem;
    display: grid;
    padding-bottom: var(--ul-padding-bottom);
    padding-left: var(--ul-padding-left);
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
