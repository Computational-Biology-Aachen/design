<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import type { Snippet } from "svelte";
  import ToggleAudience from "./ToggleAudience.svelte";

  type Audience = "4bio" | "4math";
  type AudienceStore = {
    audience: Audience;
    setAudience: (value: Audience) => void;
  };

  type AudienceOption = {
    value: Audience;
    label: string;
  };

  let {
    navLinks,
    audienceStore,
    audienceOptions,
    children,
  }: {
    navLinks: { href: string; label: string }[];
    audienceStore: AudienceStore;
    audienceOptions: AudienceOption[];
    children?: Snippet;
  } = $props();

  let menuOpen = $state(false);

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<aside
  class="sidebar"
  class:open={menuOpen}
>
  <button
    class="hamburger"
    aria-label="Toggle navigation"
    onclick={toggleMenu}
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
  <nav
    class="sidebar-nav"
    aria-label="Main navigation"
  >
    <ToggleAudience
      audienceStore={audienceStore}
      options={audienceOptions}
    />
    {@render children?.()}
    {#each navLinks as link (link.href)}
      {@const href = `${base}${link.href}`}
      {@const isActive =
        page.url.pathname === href ||
        (link.href !== "/" && page.url.pathname.startsWith(href))}
      <a
        href={href}
        class="nav-link"
        class:active={isActive}
        aria-current={isActive ? "page" : undefined}
        onclick={() => {
          menuOpen = false;
        }}
      >
        {link.label}
      </a>
    {/each}
  </nav>
</aside>

<style>
  aside {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    border-right: 1px solid var(--color-border);
    background-color: var(--color-surface);
    padding: var(--space-6) 0 var(--space-4);
    width: var(--sidebar-width);
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

  .nav-link {
    display: block;
    transition:
      color 0.15s,
      border-color 0.15s,
      background-color 0.15s;
    border-left: 3px solid transparent;
    padding: var(--space-2) var(--space-6);
    color: var(--color-text-muted);
    font-weight: 400;
    font-size: 0.9rem;
    text-decoration: none;
  }

  .nav-link:hover {
    background-color: var(--color-border);
    color: var(--color-text);
  }

  .nav-link.active {
    border-left-color: var(--color-primary);
    background-color: color-mix(in srgb, var(--color-primary) 7%, transparent);
    color: var(--color-primary);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .sidebar {
      border-right: none;
      border-bottom: 1px solid var(--color-border);
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
