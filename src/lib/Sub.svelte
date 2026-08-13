<!--
  @component

  Renders subscript text in a semantic `<sub>` element, e.g. for chemical
  formulae.

  ### Props

  - `children: Snippet`
    The inline content to render as subscript.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <p>CO<Sub>2</Sub> assimilation.</p>
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

<sub style={inlineStyle}>
  {@render children()}
</sub>

<style>
</style>
