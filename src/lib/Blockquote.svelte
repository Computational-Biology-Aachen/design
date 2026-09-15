<!--
  @component

  A block quotation (`<blockquote>`) for citing longer passages.

  ### Props

  - `children: Snippet`
    The quoted content.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Blockquote>Photosynthesis is the basis of life on Earth.</Blockquote>
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    styleVars?: { [key: string]: string };
  }

  let { children, styleVars = {} }: Props = $props();

  let inlineStyle = $derived(toStyleString(styleVars));
</script>

<blockquote style={inlineStyle}>
  {@render children()}
</blockquote>

<style>
  blockquote {
    background-color: inherit;
  }
</style>
