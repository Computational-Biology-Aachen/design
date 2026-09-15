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
  import { toStyleString } from "./utils";
  import type { Snippet } from "svelte";

  let {
    children,
    styleVars = {},
  }: {
    children: Snippet;
    styleVars?: { [key: string]: string };
  } = $props();

  let inlineStyle = $derived(toStyleString(styleVars));
</script>

<u style={inlineStyle}>
  {@render children()}
</u>

<style>
</style>
