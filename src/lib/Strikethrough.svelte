<!--
  @component

  Renders struck-through text by wrapping its children in a semantic `<s>`
  element, indicating content that is no longer relevant.

  ### Props

  - `children: Snippet`
    The inline content to strike through.
  - `styleVars?: {}`
    CSS custom property overrides (reserved for future use).

  ### Example

  ```svelte
  <p><Strikethrough>Old price</Strikethrough> now free.</p>
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

<s>
  {@render children()}
</s>

<style>
</style>
