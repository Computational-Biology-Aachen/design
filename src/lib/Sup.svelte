<!--
  @component

  Renders superscript text in a semantic `<sup>` element, e.g. for exponents or
  footnote markers.

  ### Props

  - `children: Snippet`
    The inline content to render as superscript.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

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
    styleVars?: { [key: string]: string };
  } = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<sup style={inlineStyle}>
  {@render children()}
</sup>

<style>
</style>
