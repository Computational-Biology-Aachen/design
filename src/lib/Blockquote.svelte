<!--
  @component

  A block quotation (`<blockquote>`) for citing longer passages.

  ### Props

  - `children: Snippet`
    The quoted content.
  - `styleVars?: {}`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Blockquote>Photosynthesis is the basis of life on Earth.</Blockquote>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    styleVars?: {};
  }

  let { children, styleVars = {} }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<blockquote
  style={Object.entries(inlineStyle)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}
>
  {@render children()}
</blockquote>

<style>
  blockquote {
    background-color: inherit;
  }
</style>
