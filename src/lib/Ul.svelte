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
  }: {
    color?: "dark" | "light" | "primary" | "secondary";
    columns?: "one" | "two";
    children: Snippet;
  } = $props();
</script>

<ul class={`${color} ${columns}`}>
  {@render children()}
</ul>

<style>
  ul {
    display: grid;
    padding-bottom: var(--space-4);
    padding-left: 2rem;
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
