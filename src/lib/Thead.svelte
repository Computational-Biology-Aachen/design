<!--
  @component

  Table header group (`<thead>`). Use inside [[Table]] to wrap the header
  [[Tr]] row(s).

  ### Props

  - `children: Snippet`
    The header rows.
  - `styleVars?: {}`
    Reserved for future CSS custom property overrides.
  - `...rest`
    Additional attributes spread onto the `<thead>` element.
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

<thead {...rest}>
  {@render children()}
</thead>

<style>
</style>
