<!--
  @component

  Table data cell (`<td>`), left-aligned and vertically centred. Use inside a
  body [[Tr]].

  ### Props

  - `children: Snippet`
    The cell content.
  - `...rest`
    Additional attributes (e.g. `colspan`) spread onto the `<td>`.
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

<td {...rest}>
  {@render children()}
</td>

<style>
  td {
    vertical-align: middle;
    padding: 0.5rem 0.75rem;
    text-align: left;
  }
</style>
