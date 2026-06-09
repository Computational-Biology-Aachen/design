<!--
  @component

  Renders inline underlined text by wrapping its children in a semantic `<u>`
  element.

  ### Props

  - `children: Snippet`
    The inline content to underline.

  ### Example

  ```svelte
  <p>Please <Underline>read carefully</Underline>.</p>
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

<u>
  {@render children()}
</u>

<style>
</style>
