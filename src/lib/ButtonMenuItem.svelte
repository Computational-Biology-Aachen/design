<!--
  @component

  A single entry inside a [[ButtonMenu]]. Renders an `<a>` when `href` is given,
  otherwise a `<button>`. Link items highlight automatically when their route is
  active, and activating any item closes the parent menu via context.

  ### Props

  - `onclick?: () => void`
    Handler for the button variant (runs before the menu closes).
  - `active?: boolean`
    Force the active highlight for the button variant. Defaults to `false`.
  - `href?: string`
    When set, renders a navigation link with automatic active state.
  - `children: Snippet`
    The item label.

  ### Example

  ```svelte
  <ButtonMenuItem href="/settings">Settings</ButtonMenuItem>
  ```
-->
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
    white-space: nowrap;
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
