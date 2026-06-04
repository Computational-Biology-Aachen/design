<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    ...rest
  }: {
    children: Snippet;
    [key: string]: unknown;
  } = $props();
</script>

<tr {...rest}>
  {@render children()}
</tr>

<style>
  tr {
    border-bottom: 1px solid var(--color-border);
  }

  tr:hover {
    background-color: lch(from var(--color-surface) calc(l - 3) c h);
  }
</style>
