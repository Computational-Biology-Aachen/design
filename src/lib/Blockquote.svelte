<!--
  @component

  A block quotation (`<blockquote>`) for citing longer passages.

  ### Props

  - `children: Snippet`
    The quoted content.

  ### Example

  ```svelte
  <Blockquote>Photosynthesis is the basis of life on Earth.</Blockquote>
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

<blockquote>
  {@render children()}
</blockquote>

<style>
</style>
