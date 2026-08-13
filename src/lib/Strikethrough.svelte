<!--
  @component

  Renders struck-through text by wrapping its children in a semantic `<s>`
  element, indicating content that is no longer relevant.

  ### Props

  - `children: Snippet`
    The inline content to strike through.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

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
    styleVars?: { [key: string]: string };
  } = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<s style={inlineStyle}>
  {@render children()}
</s>

<style>
</style>
