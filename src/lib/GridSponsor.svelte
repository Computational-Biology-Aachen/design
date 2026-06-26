<!--
  @component

  A responsive grid for sponsor logos: one column on mobile, two from 768px, and
  auto-filled ~150px tracks from 1024px. Pair with [[CardSponsor]].

  ### Props

  - `children: Snippet`
    The [[CardSponsor]] tiles.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <GridSponsor>
    <CardSponsor href="…" img="/a.svg" name="A" />
    <CardSponsor href="…" img="/b.svg" name="B" />
  </GridSponsor>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    styleVars?: { [key: string]: string };
  }

  let { children, styleVars = {} }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<div style={inlineStyle}>
  {@render children()}
</div>

<style>
  div {
    --sponsor-gap: 10px;
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    gap: var(--sponsor-gap);
  }

  @media (min-width: 768px) {
    div {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 1024px) {
    div {
      grid-template-columns: repeat(auto-fill, minmax(min-content, 150px));
    }
  }
</style>
