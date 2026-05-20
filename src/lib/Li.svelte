<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    color = "inherit",
    children,
  }: {
    color?: "inherit" | "dark" | "light" | "primary" | "secondary";
    children: Snippet;
  } = $props();
</script>

<li class={`${color}`}>
  {@render children()}
</li>

<style>
  .inherit {
    color: inherit;
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
</style>
