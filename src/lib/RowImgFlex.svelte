<!--
  @component

  Lays children out in a flex row (wrapping, space-between) above 640px and a
  centred column on mobile, with an optional [[H3]] heading. Suited to a handful
  of logos or image tiles. See [[RowImgGrid]] for an equal-column grid and
  [[RowImgScrolling]] for a marquee.

  ### Props

  - `title?: string`
    Optional heading rendered above the row.
  - `children: Snippet`
    The image/content items.

  ### Example

  ```svelte
  <RowImgFlex title="Funded by">
    <img src="/a.svg" alt="A" />
    <img src="/b.svg" alt="B" />
  </RowImgFlex>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";
  import H3 from "./H3.svelte";

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
    <H3>{title}</H3>
  {/if}
  <div class="grid">
    {@render children()}
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
  }

  .grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap);

    @media (min-width: 640px) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
</style>
