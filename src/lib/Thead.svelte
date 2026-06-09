<!--
  @component

  Table header group (`<thead>`). Use inside [[Table]] to wrap the header
  [[Tr]] row(s).

  ### Props

  - `children: Snippet`
    The header rows.
  - `...rest`
    Additional attributes spread onto the `<thead>` element.
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

<thead {...rest}>
  {@render children()}
</thead>
