<script lang="ts">
  import type { Snippet } from "svelte";
  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<pre>{@render children()}</pre>

<style>
  pre {
    margin: 0;
    border-radius: var(--radius-md);
    background-color: var(--color-text);
    padding: var(--space-4);
    width: 100%;
    overflow-x: auto;
    color: var(--color-text-inverse);
    font-size: 0.8125rem;
    font-family: var(--font-mono);
  }
</style>
