<!--
  @component

  A vertical navigation sidebar that collapses to a hamburger-toggled panel below
  768px. Consumers pass `<a>` links as children; the component styles them
  (including `.active`/`aria-current="page"` states) via `:global`. See
  [[Sidebar2]] for a variant with built-in links and an audience toggle.

  ### Props

  - `children: Snippet`
    The navigation links (`<a>` elements).

  ### Example

  ```svelte
  <Sidebar>
    <a href="/docs" class="active">Docs</a>
    <a href="/api">API</a>
  </Sidebar>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  let open = $state(false);
</script>

<aside
  class="sidebar"
  class:open={open}
>
  <button
    class="hamburger"
    aria-label="Toggle navigation"
    aria-expanded={open}
    onclick={() => (open = !open)}
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
  <nav
    class="sidebar-nav"
    aria-label="Main navigation"
  >
    {@render children()}
  </nav>
</aside>

<style>
  .sidebar {
    flex-shrink: 0;
    border-right: var(--border);
    background-color: var(--color-surface);
    padding: var(--space-6) 0;
    width: var(--sidebar-width, 220px);
    min-height: calc(100vh - var(--nav-height));
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    border: none;
    background: none;
    padding: var(--space-3) var(--space-4);
  }

  .hamburger span {
    display: block;
    border-radius: 2px;
    background-color: var(--color-text);
    width: 22px;
    height: 2px;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
  }

  /* Consumer targets :global(a) inside .sidebar-nav */
  .sidebar-nav :global(a) {
    display: block;
    transition:
      color var(--transition),
      border-color var(--transition),
      background-color var(--transition);
    border-left: 3px solid transparent;
    padding: var(--space-2) var(--space-6);
    color: var(--color-text-muted);
    font-weight: 400;
    font-size: 0.9rem;
    text-decoration: none;
  }

  .sidebar-nav :global(a:hover) {
    background-color: var(--color-border);
    color: var(--color-text);
  }

  .sidebar-nav :global(a.active),
  .sidebar-nav :global(a[aria-current="page"]) {
    border-left-color: var(--color-primary);
    background-color: color-mix(in srgb, var(--color-primary) 7%, transparent);
    color: var(--color-primary);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .sidebar {
      border-right: none;
      border-bottom: var(--border);
      padding: 0;
      width: 100%;
      min-height: unset;
    }

    .hamburger {
      display: flex;
    }

    .sidebar-nav {
      display: none;
    }

    .sidebar.open .sidebar-nav {
      display: flex;
    }
  }
</style>
