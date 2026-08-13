<!--
  @component

  Renders inline bold text by wrapping its children in a semantic `<strong>`
  element.

  ### Props

  - `children: Snippet`
    The inline content to embolden.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <p>This is <Bold>important</Bold>.</p>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    styleVars?: { [key: string]: string };
  }

  let { children, styleVars = {} }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<strong
  style={Object.entries(inlineStyle)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}
>
  {@render children()}
</strong>

<style>
  strong {
    font-weight: 700;
  }
</style>
