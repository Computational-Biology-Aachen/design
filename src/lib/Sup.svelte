<!--
  @component

  Renders superscript text in a semantic `<sup>` element, e.g. for exponents or
  footnote markers.

  ### Props

  - `children: Snippet`
    The inline content to render as superscript.
  - `styleVars?: {}`
    CSS custom property overrides (reserved for future use).

  ### Example

  ```svelte
  <p>x<Sup>2</Sup> + 1</p>
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

<sup>
  {@render children()}
</sup>

<style>
</style>
