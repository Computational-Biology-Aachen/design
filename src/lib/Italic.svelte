<!--
  @component

  Renders inline italic text by wrapping its children in a semantic `<i>`
  element.

  ### Props

  - `children: Snippet`
    The inline content to italicize.

  ### Example

  ```svelte
  <p>The <Italic>Arabidopsis</Italic> genome.</p>
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

<i>
  {@render children()}
</i>

<style>
</style>
