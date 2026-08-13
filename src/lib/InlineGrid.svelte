<!--
  @component

  A fixed-column inline grid (does not collapse on mobile) for laying out small,
  evenly sized items such as icons or badges.

  ### Props

  - `cols?: 2 | 3 | 4`
    Number of equal-width columns. Defaults to `2`.
  - `children: Snippet`
    The grid items.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <InlineGrid cols={4}>
    <Icon name="github" />
    <Icon name="mail" />
    <Icon name="orcid" />
    <Icon name="scholar" />
  </InlineGrid>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    cols?: 2 | 3 | 4;
    styleVars?: { [key: string]: string };
  }

  let { children, cols = 2, styleVars = {} }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<div
  class="grid cols-{cols}"
  style={inlineStyle}
>
  {@render children()}
</div>

<style>
  .grid {
    --ig-gap: 0.5rem;
    display: inline-grid;
    align-items: center;
    gap: var(--ig-gap);
    width: 100%;
  }

  .cols-2 {
    grid-template-columns: 1fr 1fr;
  }

  .cols-3 {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .cols-4 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
</style>
