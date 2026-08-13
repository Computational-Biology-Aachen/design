<!--
  @component

  Renders inline underlined text by wrapping its children in a semantic `<u>`
  element.

  ### Props

  - `children: Snippet`
    The inline content to underline.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

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
    styleVars?: { [key: string]: string };
  } = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<u style={inlineStyle}>
  {@render children()}
</u>

<style>
</style>
