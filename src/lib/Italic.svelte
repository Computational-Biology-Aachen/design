<!--
  @component

  Renders inline italic text by wrapping its children in a semantic `<i>`
  element.

  ### Props

  - `children: Snippet`
    The inline content to italicize.
  - `styleVars?: { [key: string]: string }`
    No overrideable CSS properties. Present for API consistency.

  ### Example

  ```svelte
  <p>The <Italic>Arabidopsis</Italic> genome.</p>
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

<i style={inlineStyle}>
  {@render children()}
</i>

<style>
</style>
