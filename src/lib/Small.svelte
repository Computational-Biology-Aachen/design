<!--
  @component

  Renders smaller, secondary inline text (e.g. fine print or captions) in a
  semantic `<small>` element at `0.875rem`.

  ### Props

  - `children: Snippet`
    The inline content to render at reduced size.

  ### Example

  ```svelte
  <Small>Last updated June 2026.</Small>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<small>
  {@render children()}
</small>

<style>
  small {
    font-size: 0.875rem;
  }
</style>
