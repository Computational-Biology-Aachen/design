<!--
  @component

  Displays children in a responsive image gallery grid with an optional heading.

  ### Props

  - `title?: string`
    Optional heading rendered above the grid.
  - `children: Snippet`
    Required slot content, typically image cards or linked image tiles.

  ### Example

  ```svelte
  <GridGallery title="Model Gallery">
    <a href="/models/a"><img src="/img/a.png" alt="Model A" /></a>
    <a href="/models/b"><img src="/img/b.png" alt="Model B" /></a>
    <a href="/models/c"><img src="/img/c.png" alt="Model C" /></a>
    <a href="/models/d"><img src="/img/d.png" alt="Model D" /></a>
  </GridGallery>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    children,
  }: {
    title?: string;
    children: Snippet;
  } = $props();
</script>

<section>
  {#if title}
    <h3>{title}</h3>
  {/if}
  <div class="grid">
    {@render children()}
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-between;
    gap: var(--gap);

    @media (min-width: 500px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 800px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: 1100px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
</style>
