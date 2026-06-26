<!--
  @component

  A sticky top navigation bar with an optional brand area on the left and nav
  content (typically [[NavItem]]s) on the right, laid out within a centred
  max-width container.

  ### Props

  - `brand?: Snippet`
    Optional brand/logo content shown at the start of the bar.
  - `children: Snippet`
    The navigation items, e.g. [[NavItem]] / [[NavGH]].
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Navbar>
    {#snippet brand()}<a href="/">CPBL</a>{/snippet}
    <NavItem href="/team">Team</NavItem>
    <NavItem href="/publications">Publications</NavItem>
    <NavGH href="https://github.com/Computational-Biology-Aachen" />
  </Navbar>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    brand,
    children,
    styleVars = {},
  }: {
    brand?: Snippet;
    children: Snippet;
    styleVars?: { [key: string]: string };
  } = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<nav style={inlineStyle}>
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
