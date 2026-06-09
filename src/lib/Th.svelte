<!--
  @component

  Table header cell (`<th>`) with surface background and bold, left-aligned,
  non-wrapping text. Use inside a header [[Tr]].

  ### Props

  - `children: Snippet`
    The header label.
  - `...rest`
    Additional attributes (e.g. `colspan`, `scope`) spread onto the `<th>`.
-->
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

<th {...rest}>
  {@render children()}
</th>

<style>
  th {
    background: var(--color-surface);
    padding: 0.5rem 0.75rem;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
  }
</style>
