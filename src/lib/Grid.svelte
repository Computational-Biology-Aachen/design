<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    columns?: number;
    gap?: string;
    children: Snippet;
  }

  let { columns = 1, gap = "var(--space-4)", children }: Props = $props();
</script>

<div
  class="grid cols-{columns}"
  style:gap={gap}
>
  {@render children()}
</div>

<style>
  .grid {
    display: grid;
    align-items: start;
    width: 100%;
  }

  /* All variants are 1-column on mobile */
  .cols-1 {
    grid-template-columns: 1fr;
  }
  .cols-2 {
    grid-template-columns: 1fr;
  }
  .cols-3 {
    grid-template-columns: 1fr;
  }
  .cols-4 {
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 768px) {
    .cols-3 {
      grid-template-columns: repeat(3, 1fr);
    }
    .cols-4 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .cols-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
