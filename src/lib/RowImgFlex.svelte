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
