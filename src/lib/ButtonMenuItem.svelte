<script lang="ts">
  import type { Snippet } from "svelte";
  import { getContext } from "svelte";

  interface Props {
    onclick?: () => void;
    children: Snippet;
  }

  let { onclick, children }: Props = $props();

  const menu = getContext<{ close: () => void } | undefined>("buttonMenu");

  function handleClick() {
    onclick?.();
    menu?.close();
  }
</script>

<button class="item" onclick={handleClick}>
  {@render children()}
</button>

<style>
  .item {
    cursor: pointer;
    border: 0;
    border-radius: calc(var(--radius-lg) - 0.125rem);
    background: transparent;
    padding: 0.6rem 0.75rem;
    color: var(--text);
    font-size: 0.875rem;
    text-align: left;
  }
  .item:hover {
    background: color-mix(in srgb, var(--color-surface) 10%, transparent);
    color: var(--color-primary);
  }
</style>
