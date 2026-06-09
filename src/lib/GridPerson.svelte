<!--
  @component

  A responsive grid for [[CardPerson]] tiles: single column on mobile, expanding
  to the requested column count at ≥1024px.

  ### Props

  - `columns?: number`
    Target columns on wide viewports (1–5). Defaults to `3`.
  - `gap?: string`
    CSS grid gap. Defaults to `"var(--gap)"`.
  - `children: Snippet`
    The [[CardPerson]] tiles.

  ### Example

  ```svelte
  <GridPerson columns={4}>
    <CardPerson title="Jane Doe" slug="jane-doe" />
    <CardPerson title="John Roe" slug="john-roe" />
  </GridPerson>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    columns = 3,
    gap = "var(--gap)",
    children,
  }: {
    gap?: string;
    columns?: number;
    children: Snippet;
  } = $props();
</script>

<div
  class="cols-{columns}"
  style:gap={gap}
>
  {@render children()}
</div>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    justify-content: center;
    align-items: center;
  }

  .cols-1 {
    grid-template-columns: 1fr;
  }
  .cols-2 {
    grid-template-columns: 1fr;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .cols-3 {
    grid-template-columns: 1fr;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .cols-4 {
    grid-template-columns: 1fr;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .cols-5 {
    grid-template-columns: 1fr;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>
