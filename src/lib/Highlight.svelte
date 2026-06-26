<!--
  @component

  Highlights inline text by wrapping its children in a semantic `<mark>`
  element.

  ### Props

  - `children: Snippet`
    The inline content to highlight.
  - `styleVars?: {}`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <p>The <Highlight>key result</Highlight> of the study.</p>
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

{@render children()}
