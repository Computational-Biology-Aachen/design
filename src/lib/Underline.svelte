<!--
  @component

  Renders inline underlined text by wrapping its children in a semantic `<u>`
  element.

  ### Props

  - `children: Snippet`
    The inline content to underline.
  - `styleVars?: {}`
    CSS custom property overrides (reserved for future use).

  ### Example

  ```svelte
  <p>Please <Underline>read carefully</Underline>.</p>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    styleVars = {},
  }: {
    children: Snippet;
    styleVars?: {};
  } = $props();
</script>

<u>
  {@render children()}
</u>

<style>
</style>
