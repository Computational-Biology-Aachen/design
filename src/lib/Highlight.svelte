<!--
  @component

  Highlights inline text by wrapping its children in a semantic `<mark>`
  element.

  ### Props

  - `children: Snippet`
    The inline content to highlight.

  ### Example

  ```svelte
  <p>The <Highlight>key result</Highlight> of the study.</p>
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

<mark>
  {@render children()}
</mark>

<style>
</style>
