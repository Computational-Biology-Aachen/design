<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    brand,
    children,
  }: {
    brand?: Snippet;
    children: Snippet;
  } = $props();
</script>

<nav>
  <div class="inner">
    {#if brand}
      <div class="brand">
        {@render brand()}
      </div>
    {/if}
    {@render children()}
  </div>
</nav>

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: var(--border);
    background-color: var(--color-bg);
    height: var(--nav-height);
  }

  .inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: var(--gap);
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
    max-width: var(--max-width);
    height: 100%;
  }

  .brand {
    display: flex;
    align-items: center;
  }
</style>
