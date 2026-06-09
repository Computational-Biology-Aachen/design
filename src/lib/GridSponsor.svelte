<!--
  @component

  A responsive grid for sponsor logos: one column on mobile, two from 768px, and
  auto-filled ~150px tracks from 1024px. Pair with [[CardSponsor]].

  ### Props

  - `children: Snippet`
    The [[CardSponsor]] tiles.

  ### Example

  ```svelte
  <GridSponsor>
    <CardSponsor href="…" img="/a.svg" name="A" />
    <CardSponsor href="…" img="/b.svg" name="B" />
  </GridSponsor>
  ```
-->
<script lang="ts">
  let { children } = $props();
</script>

<div>
  {@render children()}
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    grid-gap: 10px;
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
