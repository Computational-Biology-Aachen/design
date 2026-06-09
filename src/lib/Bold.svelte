<!--
  @component

  Renders inline bold text by wrapping its children in a semantic `<strong>`
  element.

  ### Props

  - `children: Snippet`
    The inline content to embolden.

  ### Example

  ```svelte
  <p>This is <Bold>important</Bold>.</p>
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

<strong>
  {@render children()}
</strong>

<style>
</style>
