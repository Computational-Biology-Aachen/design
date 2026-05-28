<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    color = "dark",
    columns = "one",
    children,
  }: {
    color?: "dark" | "light" | "primary" | "secondary";
    columns?: "one" | "two";
    children: Snippet;
  } = $props();
</script>

<ol class={`${color} ${columns}`}>
  {@render children()}
</ol>

<style>
  ol {
    display: grid;
    padding-bottom: var(--space-4);
    padding-left: 2rem;
  }

  .one {
    grid-template-columns: 1fr;
  }
  .two {
    grid-template-columns: 1fr;
  }

  .dark {
    color: var(--color-text);
  }
  .light {
    color: var(--color-bg);
  }
  .primary {
    color: var(--color-surface);
  }
  .secondary {
    color: var(--color-accent);
  }

  @media screen and (min-width: 800px) {
    .two {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
