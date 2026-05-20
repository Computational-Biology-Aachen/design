<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    id: string;
    title: string;
    children: Snippet;
  }

  let { id, title, children }: Props = $props();
</script>

<div {id} class="section">
  <h2>{title}</h2>
  {@render children()}
</div>

<style>
  .section {
    margin-bottom: var(--space-12);
    scroll-margin-top: calc(var(--nav-height) + var(--space-4));
    border-radius: var(--radius-md);
  }

  @keyframes section-target-flash {
    from { background-color: color-mix(in srgb, var(--color-primary) 8%, transparent); }
    to { background-color: transparent; }
  }

  .section:target {
    animation: section-target-flash 1.4s ease-out;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-3);
    border-bottom: var(--border);
  }

  .section :global(h3) {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-text-muted);
    margin-bottom: var(--space-4);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>
