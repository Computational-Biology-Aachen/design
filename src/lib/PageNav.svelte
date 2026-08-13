<!--
  @component

  Previous/next pager links shown at the bottom of a page (e.g. tutorial steps).
  Each link is optional; `base` is prefixed to both hrefs.

  ### Props

  - `prev?: { href: string; label: string }`
    The previous-page link (left, with a ← arrow).
  - `next?: { href: string; label: string }`
    The next-page link (right, with a → arrow).
  - `base?: string`
    Path prefix prepended to both hrefs. Defaults to `""`.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <PageNav
    prev={{ href: "/intro", label: "Introduction" }}
    next={{ href: "/setup", label: "Setup" }}
  />
  ```
-->
<script lang="ts">
  interface NavLink {
    href: string;
    label: string;
  }

  let {
    prev,
    next,
    base = "",
    styleVars = {},
  }: {
    prev?: NavLink;
    next?: NavLink;
    base?: string;
    styleVars?: { [key: string]: string };
  } = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<nav
  aria-label="Page navigation"
  style={inlineStyle}
>
  <div class="page-nav-prev">
    {#if prev}
      <a
        href="{base}{prev.href}"
        class="page-nav-btn"
      >
        <span
          class="arrow"
          aria-hidden="true">←</span
        >
        {prev.label}
      </a>
    {/if}
  </div>
  <div class="page-nav-next">
    {#if next}
      <a
        href="{base}{next.href}"
        class="page-nav-btn"
      >
        {next.label}
        <span
          class="arrow"
          aria-hidden="true">→</span
        >
      </a>
    {/if}
  </div>
</nav>

<style>
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: var(--space-6);
    width: 100%;
  }

  .page-nav-prev,
  .page-nav-next {
    display: flex;
  }

  .page-nav-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    transition:
      background-color var(--transition),
      border-color var(--transition);
    border: var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-4);
    color: var(--color-primary);
    font-weight: 500;
    font-size: 0.9rem;
    text-decoration: none;
  }

  .page-nav-btn:hover {
    border-color: var(--color-primary);
    background-color: var(--color-surface);
  }

  .arrow {
    font-size: 1rem;
  }
</style>
