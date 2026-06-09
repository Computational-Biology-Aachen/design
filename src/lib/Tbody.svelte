<!--
  @component

  Table body group (`<tbody>`). Use inside [[Table]] to wrap the data [[Tr]]
  rows.

  ### Props

  - `children: Snippet`
    The body rows.
  - `...rest`
    Additional attributes spread onto the `<tbody>` element.
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

<tbody {...rest}>
  {@render children()}
</tbody>
