<!--
  @component

  Table body group (`<tbody>`). Use inside [[Table]] to wrap the data [[Tr]]
  rows.

  ### Props

  - `children: Snippet`
    The body rows.
  - `styleVars?: {}`
    CSS custom property overrides (reserved for future use).
  - `...rest`
    Additional attributes spread onto the `<tbody>` element.
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    styleVars = {},
    ...rest
  }: {
    children: Snippet;
    styleVars?: {};
    [key: string]: unknown;
  } = $props();
</script>

<tbody {...rest}>
  {@render children()}
</tbody>

<style>
</style>
