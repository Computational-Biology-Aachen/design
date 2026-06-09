<!--
  @component

  A navigation link (`<li><a>`) for use inside [[Navbar]]. Highlights itself
  when the current route matches `href` (exactly, or as a path prefix for
  non-root links).

  ### Props

  - `href: string`
    Destination route; also drives the active-state highlight.
  - `children: Snippet`
    The link label.

  ### Example

  ```svelte
  <NavItem href="/team">Team</NavItem>
  ```
-->
<script lang="ts">
  import { page } from "$app/state";
  import type { Snippet } from "svelte";

  interface Props {
    href: string;
    children: Snippet;
  }

  let { href, children }: Props = $props();

  let active = $derived(
    page.url.pathname === href ||
      (href !== "/" && page.url.pathname.startsWith(href + "/")),
  );
</script>

<li>
  <a
    href={href}
    class:active={active}
  >
    {@render children()}
  </a>
</li>

<style>
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    display: block;
    transition: var(--transition);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3);
    color: var(--color-text);
    font-weight: 500;
    font-size: 0.9375rem;
    text-decoration: none;
    white-space: nowrap;
  }

  a:hover {
    background-color: var(--color-surface);
    color: var(--color-primary);
  }

  a.active {
    color: var(--color-primary);
    font-weight: 600;
  }
</style>
