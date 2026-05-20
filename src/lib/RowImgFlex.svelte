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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    /* display: grid; */
    /* grid-template-columns: 1fr 1fr 1fr 1fr; */
    gap: var(--gap);
  }
</style>
