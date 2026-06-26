<!--
  @component

  A sticky in-page navigation sidebar for the showcase that scroll-spies the
  documented sections: it highlights the link whose [[ShowcaseSection]] is
  currently in view using an IntersectionObserver.

  ### Props

  - `links: { label: string; id: string }[]`
    The section links, each pointing at a [[ShowcaseSection]] `id`.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <ShowcaseSidebar links={[{ label: "Buttons", id: "buttons" }]} />
  ```
-->
<script lang="ts">
  import { onMount, untrack } from "svelte";

  interface Link {
    label: string;
    id: string;
  }
  let { links, styleVars = {} }: { links: Link[]; styleVars?: { [key: string]: string } } = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );

  let active = $state(untrack(() => links[0]?.id ?? ""));

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active = entry.target.id;
        }
      },
      { rootMargin: "-10% 0px -80% 0px" },
    );

    for (const { id } of links) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });
</script>

<nav class="sidebar" style={inlineStyle}>
  <ul>
    {#each links as link (link.id)}
      <li>
        <a
          href="#{link.id}"
          class:active={active === link.id}>{link.label}</a
        >
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
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    display: block;
    transition:
      color 0.15s,
      border-color 0.15s,
      background-color 0.15s;
    border-left: 2px solid transparent;
    padding: var(--space-2) var(--space-3);
    color: var(--color-text-muted);
    font-size: 0.875rem;
    text-decoration: none;
  }

  a:hover {
    background-color: var(--color-surface);
    color: var(--color-text);
  }

  a.active {
    border-left-color: var(--color-primary);
    color: var(--color-primary);
    font-weight: 500;
  }
</style>
