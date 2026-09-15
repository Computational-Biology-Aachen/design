<!--
  @component

  Highlights inline text by wrapping its children in a semantic `<mark>`
  element.

  ### Props

  - `children: Snippet`
    The inline content to highlight.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <p>The <Highlight>key result</Highlight> of the study.</p>
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

<mark style={inlineStyle}>
  {@render children()}
</mark>

<style>
  mark {
    background-color: var(--color-primary);
    color: white;
  }
</style>
