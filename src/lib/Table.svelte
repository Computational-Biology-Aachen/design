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

<div class="table-wrap">
  <table {...rest}>
    {@render children()}
  </table>
</div>

<style>
  .table-wrap {
    margin-bottom: var(--space-4);
    overflow-x: auto;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    font-family: var(--font-sans);
    font-size: 0.9rem;
    text-align: left;
    text-indent: 0;
  }
</style>
