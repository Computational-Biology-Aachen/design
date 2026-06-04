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

<td {...rest}>
  {@render children()}
</td>

<style>
  td {
    padding: 0.5rem 0.75rem;
    text-align: left;
    vertical-align: middle;
  }
</style>
