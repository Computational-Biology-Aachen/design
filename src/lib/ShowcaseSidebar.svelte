<!--
  @component

  A sticky in-page navigation sidebar for the showcase that scroll-spies the
  documented sections: it highlights the link whose [[ShowcaseSection]] is
  currently in view using an IntersectionObserver.

  ### Props

  - `links: { label: string; id: string }[]`
    The section links, each pointing at a [[ShowcaseSection]] `id`.

  ### Example

  ```svelte
  <ShowcaseSidebar links={[{ label: "Buttons", id: "buttons" }]} />
  ```
-->
<script lang="ts">
  import { onMount, untrack } from 'svelte';

  interface Link { label: string; id: string; }
  let { links }: { links: Link[] } = $props();

  let active = $state(untrack(() => links[0]?.id ?? ''));

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active = entry.target.id;
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );

    for (const { id } of links) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });
</script>

<nav class="sidebar">
  <ul>
    {#each links as link}
      <li>
        <a href="#{link.id}" class:active={active === link.id}>{link.label}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .sidebar {
    position: sticky;
    top: calc(var(--nav-height) + var(--space-6));
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  a {
    display: block;
    padding: var(--space-2) var(--space-3);
    font-size: 0.875rem;
    color: var(--color-text-muted);
    text-decoration: none;
    border-left: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s, background-color 0.15s;
  }

  a:hover {
    color: var(--color-text);
    background-color: var(--color-surface);
  }

  a.active {
    color: var(--color-primary);
    border-left-color: var(--color-primary);
    font-weight: 500;
  }
</style>
