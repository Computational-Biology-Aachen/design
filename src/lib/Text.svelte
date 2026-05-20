<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    color = "inherit",
  }: {
    children: Snippet;
    color?:
      | "inherit"
      | "black"
      | "white"
      | "dark"
      | "light"
      | "primary"
      | "secondary";
  } = $props();
</script>

<p class={`${color}`}>
  {@render children()}
</p>

<style>
  p {
    font-size: 1rem;
    font-family: var(--font-sans);
    hyphens: auto;
    text-align: justify;
  }
  .inherit {
    color: inherit;
  }
  .black {
    color: var(--color-text);
  }
  .white {
    color: var(--color-bg);
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
