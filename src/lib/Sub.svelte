<!--
  @component

  Renders subscript text in a semantic `<sub>` element, e.g. for chemical
  formulae.

  ### Props

  - `children: Snippet`
    The inline content to render as subscript.

  ### Example

  ```svelte
  <p>CO<Sub>2</Sub> assimilation.</p>
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

<sub>
  {@render children()}
</sub>

<style>
</style>
