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
