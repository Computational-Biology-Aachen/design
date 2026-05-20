<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<kdb>
  {@render children()}
</kdb>

<style>
  kdb {
    vertical-align: baseline;
    padding: 0.375rem;
    font-size: 0.875em;
    font-family: monospace;
  }
</style>
