<script lang="ts">
  interface NavLink {
    href: string;
    label: string;
  }

  let {
    prev,
    next,
    base = "",
  }: {
    prev?: NavLink;
    next?: NavLink;
    base?: string;
  } = $props();
</script>

<nav aria-label="Page navigation">
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
