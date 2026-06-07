<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    justify = "start",
    wrap = "wrap",
  }: {
    children: Snippet;
    justify?: "start" | "end";
    wrap?: "wrap" | "nowrap";
  } = $props();
</script>

<div class="justify-{justify} wrap-{wrap}">
  {@render children()}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }
  .justify-start {
    justify-content: start;
  }
  .justify-end {
    justify-content: start;

    @media (min-width: 768px) {
      justify-content: end;
    }
  }

  .wrap-wrap {
    flex-wrap: wrap;
  }
  .wrap-nowrap {
    flex-wrap: nowrap;
  }
</style>
