<!--
  @component

  Table row (`<tr>`) with a bottom border and a subtle hover highlight. Use
  inside [[Thead]] or [[Tbody]].

  ### Props

  - `children: Snippet`
    The [[Th]] / [[Td]] cells.
  - `styleVars?: {}`
    Reserved for future CSS custom property overrides.
  - `...rest`
    Additional attributes spread onto the `<tr>` element.
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
