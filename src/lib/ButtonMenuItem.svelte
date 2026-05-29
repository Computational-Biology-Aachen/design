<script lang="ts">
  import { page } from "$app/state";
  import type { Snippet } from "svelte";
  import { getContext } from "svelte";

  let {
    onclick,
    active = false,
    href,
    children,
  }: {
    onclick?: () => void;
    active?: boolean;
    href?: string;
    children: Snippet;
  } = $props();

  const menu = getContext<{ close: () => void } | undefined>("buttonMenu");

  function handleClick() {
    onclick?.();
    menu?.close();
  }

  let activeUrl = $derived(
    page.url.pathname === href ||
      (href !== "/" && page.url.pathname.startsWith(href + "/")),
  );
</script>

{#if href}
  <a
    href={href}
    class:active={activeUrl}
  >
    {@render children()}
  </a>
{:else}
  <button
    class:active={active}
    onclick={handleClick}
  >
    {@render children()}
  </button>
{/if}

<style>
  a,
  button {
    cursor: pointer;
    border: 0;
    border-radius: calc(var(--radius-lg) - 0.125rem);
    background: transparent;
    padding: 0.6rem 0.75rem;
    color: var(--text);
    font-size: 0.875rem;
    text-align: left;
  }
  a:hover,
  button:hover {
    background: color-mix(in srgb, var(--color-surface) 10%, transparent);
    color: var(--color-primary);
    text-decoration: none;
  }

  .active {
    color: var(--color-primary);
    font-weight: bold;
  }
</style>
