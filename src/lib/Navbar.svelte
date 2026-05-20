<script lang="ts">
  import type { Snippet } from "svelte";
  import { MediaQuery } from "svelte/reactivity";

  interface Props {
    brand?: Snippet;
    children: Snippet;
  }

  let { brand, children }: Props = $props();

  const small = new MediaQuery("max-width: 768px");
</script>

<nav>
  <div class="inner">
    {#if brand}
      <div class="brand">
        {@render brand()}
      </div>
    {/if}

    {#if small.current}
      <details class="mobile">
        <summary aria-label="Toggle navigation">☰</summary>
        <ul class="dropdown">
          {@render children()}
        </ul>
      </details>
    {:else}
      <ul class="bar">
        {@render children()}
      </ul>
    {/if}
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

  .bar {
    display: flex;
    flex-direction: row;
    gap: var(--space-2);
    margin: 0;
    margin-left: auto;
    padding: 0;
    list-style: none;
  }

  details.mobile {
    position: relative;
    margin-left: auto;
  }

  summary {
    cursor: pointer;
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3);
    color: var(--color-text);
    font-size: 1.25rem;
    line-height: 1;
    list-style: none;
    user-select: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary:hover {
    background-color: var(--color-surface);
  }

  .dropdown {
    display: flex;
    position: absolute;
    top: calc(100% + var(--space-1));
    right: 0;
    flex-direction: column;
    margin: 0;
    box-shadow: var(--shadow-md);
    border: var(--border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg);
    padding: var(--space-2);
    min-width: 10rem;
    list-style: none;
  }
</style>
