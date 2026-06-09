<!--
  @component

  Renders superscript text in a semantic `<sup>` element, e.g. for exponents or
  footnote markers.

  ### Props

  - `children: Snippet`
    The inline content to render as superscript.

  ### Example

  ```svelte
  <p>x<Sup>2</Sup> + 1</p>
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

<sup>
  {@render children()}
</sup>

<style>
</style>
